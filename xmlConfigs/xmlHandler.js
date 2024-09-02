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

    mappingConfig.fields.forEach(({ xmlElement, dbField }) => {
      const element = rowEl.querySelector(xmlElement);
      record[dbField] = element ? element.textContent : null;
    });

    return record;
  });
  return results;
};
