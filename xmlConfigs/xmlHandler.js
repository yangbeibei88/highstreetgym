import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import asyncHandler from "express-async-handler";
import { matchedData, validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

export const parseXmlFile = async (filePath, rootElName) => {
  try {
    const data = await readFile(filePath, "utf8");
    const dom = new JSDOM(data, { contentType: "application/xml" });
    const { document } = dom.window;
    const rootElement = document.querySelector(rootElName);
    if (!rootElement) {
      throw new AppError(
        `Invalid XML, root element <${rootElName}> is missing`,
        400,
      );
    }
    return rootElement;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const parseAndValidateXMLFactory = (
  xmlvalidationRules,
  mappingConfig,
  rootElName,
) =>
  asyncHandler(async (req, res, next) => {
    // 1) ENSURE FILE EXISTS
    if (!req.file) {
      return res.status(400).render("admin/data-import", {
        title: "Data Import Error",
        errorMsg: "No file uploaded or invalid file type.",
      });
    }

    // 2) READ XML FILE
    const data = await readFile(req.file.path, "utf8");
    console.log("original xml data", data);

    const dom = new JSDOM(data, { contentType: "application/xml" });
    const { document } = dom.window;
    const rootElement = document.querySelector(rootElName);

    if (!rootElement) {
      return res.status(400).render("admin/data-import", {
        title: "Data Import Error",
        errorMsg: `Invalid XML, root element <${rootElName}> is missing`,
      });
    }

    // 3) MAP XML TO req.body on mappingConfig
    const childElements = rootElement.querySelectorAll(
      mappingConfig.childElement,
    );
    // console.log("childElements: ", JSON.stringify(childElements));

    const validDataArray = await Promise.all(
      Array.from(childElements).map(async (childEl) => {
        const childData = {};
        mappingConfig.fields.forEach(
          ({ xmlElement, dbField, type, itemElement }) => {
            if (type === "array" && itemElement) {
              const items = childEl.querySelectorAll(
                `${xmlElement} > ${itemElement}`,
              );
              let valueArr = Array.from(items).map((item) =>
                item.textContent.trim().toLowerCase(),
              );
              // MAKE ARRAY ELEMENT UNIQUE EARLY
              valueArr = Array.from(new Set(valueArr));
              childData[dbField] = valueArr;
            } else {
              childData[dbField] =
                childEl.querySelector(xmlElement)?.textContent.trim() || null;
            }
          },
        );

        const localReqBody = { body: childData };

        await Promise.all(
          xmlvalidationRules.map((rule) => rule.run(localReqBody)),
        );
        const errors = validationResult(localReqBody);
        console.log(errors);
        if (!errors.isEmpty()) {
          return null;
        }
        const validData = matchedData(localReqBody, { includeOptionals: true });
        // const sanitizedData = {};
        // Object.keys(validData).forEach((key) => {
        //   sanitizedData[key] = purify.sanitize(validData[key]);
        // });

        // return sanitizedData;
        return validData;
      }),
    );

    console.log("validDataArray: ", validDataArray);

    req.validData = validDataArray.filter((rowObj) => rowObj !== null);
    req.invalidData = validDataArray.filter((rowObj) => rowObj === null);

    console.log("req.validData: ", req.validData);

    next();
  });

export const mapToDbSchemaFactory = (mappingConfig) => (validXmlDataArr) =>
  validXmlDataArr.map((validXmlData) =>
    mappingConfig.fields.reduce((mappedData, { dbField }) => {
      mappedData[dbField] = validXmlData[dbField];
      return mappedData;
    }, {}),
  );

// export const mapToDbSchemaFactory = (mappingConfig) => (xmlDocument) => {
//   const rowElements = xmlDocument.querySelectorAll(mappingConfig.childElement);

//   const results = Array.from(rowElements).map((rowEl) => {
//     const record = {};

//     // INITIALIZE ROW IS VALID
//     // let valid = true;

//     mappingConfig.fields.forEach(
//       ({ xmlElement, dbField, type, itemElement }) => {
//         if (type === "array" && itemElement) {
//           const items = rowEl.querySelectorAll(
//             `${xmlElement} > ${itemElement}`,
//           );
//           let value = Array.from(items).map((item) =>
//             purify.sanitize(item.textContent.trim()),
//           );
//           // MAKE SURES SET ENUM IS UNIQUE
//           value = Array.from(new Set(value));

//           record[dbField] = value;
//         } else {
//           const element = rowEl.querySelector(xmlElement);
//           let value = element
//             ? purify.sanitize(element.textContent.trim())
//             : null;

//           // if (!value && type !== "array") {
//           //   valid = false;
//           // }

//           if (value !== null) {
//             switch (type) {
//               case "integer":
//                 value = parseInt(value, 10);
//                 break;
//               case "decimal":
//                 value = parseFloat(value);
//                 break;
//               case "duration":
//                 value = parseDurationToSeconds(value);
//                 break;
//               case "dateTime":
//                 value = parseDateTime(value);
//                 break;
//               default:
//                 break;
//             }
//           }
//           record[dbField] = value;
//         }
//       },
//     );
//     // RETURN NULL IF THE ROW IS INVALID
//     return record;
//   });
//   // REMOVE INVALID ROW
//   return results;
// };
