import { mapToDbSchemaFactory } from "./xmlHandler.js";

const timetableMappingConfig = {
  childElement: "timetable",
  fields: [
    { xmlElement: "timetableNo", dbField: "timetableNo", type: "integer" },
    { xmlElement: "classCode", dbField: "classCode", type: "integer" },
    { xmlElement: "trainerEmail", dbField: "trainerEmail", type: "string" },
    { xmlElement: "startDateTime", dbField: "startDateTime", type: "dateTime" },
    { xmlElement: "duration", dbField: "duration", type: "duration" },
    { xmlElement: "level", dbField: "level", type: "string" },
    { xmlElement: "capacity", dbField: "capacity", type: "integer" },
  ],
};

export const mapTimetableToDB = mapToDbSchemaFactory(timetableMappingConfig);
