import { readFile } from "node:fs/promises";
// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from "jsdom";
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

export const mapToDbSchemaFactory = (mappingConfig) => (xmlDocument) => {
  const rowElements = xmlDocument.querySelectorAll(mappingConfig.childElement);

  const results = Array.from(rowElements).map((rowEl) => {
    const record = {};

    mappingConfig.fields.forEach(
      ({ xmlElement, dbField, type, itemElement }) => {
        if (type === "array" && itemElement) {
          const items = rowEl.querySelectorAll(
            `${xmlElement} > ${itemElement}`,
          );
          let value = Array.from(items).map((item) => item.textContent.trim());
          // MAKE SURES SET ENUM IS UNIQUE
          value = Array.from(new Set(value));

          record[dbField] = value;
        } else {
          const element = rowEl.querySelector(xmlElement);
          let value = element ? element.textContent.trim() : null;

          if (value !== null) {
            switch (type) {
              case "integer":
                value = parseInt(value, 10);
                break;
              case "decimal":
                value = parseFloat(value);
                break;

              default:
                break;
            }
          }
          record[dbField] = value;
        }
      },
    );
    return record;
  });
  return results;
};
