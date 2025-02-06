// import { readFile } from "node:fs/promises";
// import fs from "node:fs";
import asyncHandler from "express-async-handler";
// import { JSDOM } from "jsdom";
import { matchedData, validationResult } from "express-validator";
import { Readable } from "stream";
// eslint-disable-next-line import/no-extraneous-dependencies
import sax from "sax";

/**
 * Helper function that converts a simple tree node (built from SAX events)
 * into a plain JavaScript object.
 *
 * If a node has no children, its text content is returned.
 * Otherwise, children with the same tag name are grouped into an array.
 */
function nodeToObject(node) {
  if (!node.children.length) {
    // Return text content if present.
    return node.text || "";
  }
  const obj = {};
  node.children.forEach((child) => {
    const childObj = nodeToObject(child);
    if (obj[child.name]) {
      if (!Array.isArray(obj[child.name])) {
        obj[child.name] = [obj[child.name]];
      }
      obj[child.name].push(childObj);
    } else {
      obj[child.name] = childObj;
    }
  });
  return obj;
}

/**
 * Factory that creates middleware to stream the uploaded XML file,
 * parse it using sax, and validate each child element (e.g. each <timetable>).
 *
 * @param {Array} xmlValidationRules - Express-validator rules.
 * @param {Object} mappingConfig - Contains the childElement and field mapping.
 * @param {string} rootElName - Expected root element (e.g. "timetables").
 */
export const parseAndValidateXMLFactory = (
  xmlValidationRules,
  mappingConfig,
  // eslint-disable-next-line no-unused-vars
  rootElName,
) =>
  asyncHandler(async (req, res, next) => {
    if (!req.file) {
      return res.status(400).render("admin/data-import", {
        title: "Data Import Error",
        errorMsg: "No file uploaded or invalid file type.",
      });
    }

    // Create a readable stream from the file buffer.
    const stream = new Readable();
    stream.push(req.file.buffer);
    stream.push(null);

    // Create a SAX parser in strict mode with trimming and normalization.
    const parser = sax.createStream(true, { trim: true, normalize: true });

    // We'll use a stack to build a tree for each XML element.
    const nodeStack = [];
    // Hold validation promises for each processed target element.
    const validationPromises = [];
    const validData = [];
    const errors = [];

    // When a new tag is opened, create a new node.
    parser.on("opentag", (node) => {
      const newNode = {
        name: node.name,
        attributes: node.attributes,
        children: [],
        text: "",
      };
      // If there is a parent, add this new node as a child.
      if (nodeStack.length) {
        const parent = nodeStack[nodeStack.length - 1];
        parent.children.push(newNode);
      }
      // Push the new node onto the stack.
      nodeStack.push(newNode);
    });

    // Append text content to the current node.
    parser.on("text", (text) => {
      if (nodeStack.length) {
        const current = nodeStack[nodeStack.length - 1];
        current.text += text;
      }
    });

    // When a tag is closed, pop the node from the stack.
    // eslint-disable-next-line no-unused-vars
    parser.on("closetag", (tagName) => {
      const node = nodeStack.pop();
      // If this node is the target element (e.g. <timetable>), process it.
      if (node.name === mappingConfig.childElement) {
        // Convert the node tree to a plain object.
        const nodeObj = nodeToObject(node);
        // Wrap per-element processing in an async function.
        const promise = (async () => {
          const childData = {};
          // Map each XML field to the expected DB field.
          mappingConfig.fields.forEach(
            ({ xmlElement, dbField, type, itemElement }) => {
              const rawValue = nodeObj[xmlElement];
              if (type === "array" && itemElement) {
                const items =
                  // eslint-disable-next-line no-nested-ternary
                  rawValue && rawValue[itemElement]
                    ? // eslint-disable-next-line no-nested-ternary
                      Array.isArray(rawValue[itemElement])
                      ? rawValue[itemElement].map((item) =>
                          typeof item === "string"
                            ? item.trim().toLowerCase()
                            : item,
                        )
                      : typeof rawValue[itemElement] === "string"
                        ? [rawValue[itemElement].trim().toLowerCase()]
                        : []
                    : [];
                childData[dbField] = Array.from(new Set(items));
              } else {
                childData[dbField] =
                  typeof rawValue === "string"
                    ? rawValue.trim()
                    : rawValue || null;
              }
            },
          );

          // Validate the constructed childData using express-validator.
          const localReqBody = { body: childData };
          await Promise.all(
            xmlValidationRules.map((rule) => rule.run(localReqBody)),
          );
          const result = validationResult(localReqBody);
          if (result.isEmpty()) {
            validData.push(
              matchedData(localReqBody, { includeOptionals: true }),
            );
          } else {
            errors.push(result.array());
          }
        })();
        validationPromises.push(promise);
      }
    });

    parser.on("error", (err) => {
      next(err);
    });

    // When parsing is complete, wait for all validations then attach results to the request.
    parser.on("end", async () => {
      await Promise.all(validationPromises);
      req.validData = validData;
      req.errors = errors;
      next();
    });

    // Pipe the file stream into the SAX parser.
    stream.pipe(parser);
  });

/**
 * Given a mappingConfig, returns a function that maps validated XML data
 * to the target database schema.
 */
export const mapToDbSchemaFactory = (mappingConfig) => (validXmlDataArr) =>
  validXmlDataArr.map((validXmlData) =>
    mappingConfig.fields.reduce((mappedData, { dbField }) => {
      mappedData[dbField] = validXmlData[dbField];
      return mappedData;
    }, {}),
  );
