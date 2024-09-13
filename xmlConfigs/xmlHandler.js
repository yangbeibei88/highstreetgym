import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { AppError } from "../utils/AppError.js";
import { parseDateTime, parseDurationToSeconds } from "../utils/helpers.js";

// Initialize DOMPurify with a JSDOM window (this will be reused for sanitization)
const { window } = new JSDOM("");
const purify = DOMPurify(window);

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

export const mapToDbSchemaFactory = (mappingConfig) => (xmlDocument) => {
  const rowElements = xmlDocument.querySelectorAll(mappingConfig.childElement);

  const results = Array.from(rowElements).map((rowEl) => {
    const record = {};

    // INITIALIZE ROW IS VALID
    // let valid = true;

    mappingConfig.fields.forEach(
      ({ xmlElement, dbField, type, itemElement }) => {
        if (type === "array" && itemElement) {
          const items = rowEl.querySelectorAll(
            `${xmlElement} > ${itemElement}`,
          );
          let value = Array.from(items).map((item) =>
            purify.sanitize(item.textContent.trim()),
          );
          // MAKE SURES SET ENUM IS UNIQUE
          value = Array.from(new Set(value));

          record[dbField] = value;
        } else {
          const element = rowEl.querySelector(xmlElement);
          let value = element
            ? purify.sanitize(element.textContent.trim())
            : null;

          // if (!value && type !== "array") {
          //   valid = false;
          // }

          if (value !== null) {
            switch (type) {
              case "integer":
                value = parseInt(value, 10);
                break;
              case "decimal":
                value = parseFloat(value);
                break;
              case "duration":
                value = parseDurationToSeconds(value);
                break;
              case "dateTime":
                value = parseDateTime(value);
                break;
              default:
                break;
            }
          }
          record[dbField] = value;
        }
      },
    );
    // RETURN NULL IF THE ROW IS INVALID
    return record;
  });
  // REMOVE INVALID ROW
  return results;
};
