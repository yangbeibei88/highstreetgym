import { mapToDbSchemaFactory } from "./xmlHandler.js";

const classMappingConfig = {
  childElement: "class",
  fields: [
    { xmlElement: "classId", dbField: "classId" },
    { xmlElement: "className", dbField: "className" },
    { xmlElement: "shortDesc", dbField: "shortDesc" },
    { xmlElement: "longDesc", dbField: "longDesc" },
    { xmlElement: "imageCover", dbField: "imageCover" },
    { xmlElement: "durationRange", dbField: "durationRange" },
    { xmlElement: "days", dbField: "days" },
  ],
};

export const mapClassToDB = mapToDbSchemaFactory(classMappingConfig);
