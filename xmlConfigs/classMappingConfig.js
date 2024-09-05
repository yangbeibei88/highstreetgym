import { mapToDbSchemaFactory } from "./xmlHandler.js";

const classMappingConfig = {
  childElement: "class",
  fields: [
    { xmlElement: "classCode", dbField: "classCode", type: "integer" },
    { xmlElement: "className", dbField: "className", type: "string" },
    { xmlElement: "shortDesc", dbField: "shortDesc", type: "string" },
    { xmlElement: "longDesc", dbField: "longDesc", type: "string" },
    { xmlElement: "imageCover", dbField: "imageCover", type: "string" },
    { xmlElement: "minDuration", dbField: "minDuration", type: "duration" },
    { xmlElement: "maxDuration", dbField: "maxDuration", type: "duration" },
    {
      xmlElement: "days",
      dbField: "days",
      type: "array",
      itemElement: "day",
      itemType: "dayType",
    },
  ],
};

export const mapClassToDB = mapToDbSchemaFactory(classMappingConfig);
