import { check } from "express-validator";
// import { mapToDbSchemaFactory } from "./xmlHandler.js";
import { getClassByCode } from "../models/ClassModel.js";
import { getTrainerByEmail } from "../models/UserModel.js";
import { parseDateTime, parseDurationToSeconds } from "../utils/helpers.js";
import { getLevels } from "../models/TimetableModel.js";

export const timetableMappingConfig = {
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

export const timetableXmlValidationRules = [
  check("timetableNo")
    .toInt()
    .isInt({ min: 1, max: 9999999999 })
    .withMessage(
      "timetableNo must be a valid integer between 1 and 9999999999.",
    )
    .bail(),
  check("classCode")
    .toInt()
    .isInt({ min: 1, max: 9999999999 })
    .withMessage("classCode must be a valid integer between 1 and 9999999999.")
    .bail()
    .custom(async (v) => {
      const course = await getClassByCode(v);
      if (!course || !course.length) {
        throw new Error(`classCode#${v} does not exist.`);
      }
    })
    .bail(),
  check("trainerEmail")
    .isEmail()
    .withMessage("invalid email address")
    .bail()
    .custom(async (v) => {
      const trainerEmailAdd = await getTrainerByEmail(v);
      if (!trainerEmailAdd || !trainerEmailAdd.length) {
        throw new Error(`trainer emailaddress ${v} does not exist.`);
      }
    })
    .bail(),
  check("startDateTime").customSanitizer((v) => {
    const datetime = parseDateTime(v);
    if (!Number.isNaN(Date.parse(datetime))) {
      // mysql timestamp is utc time (start from 1970-01-01 00:00:01), if set fallback to 1970-01-01 00:00:01, db will get error.
      // so add 10 hours to compensate utc
      return datetime;
    }
    return "1970-01-01 10:00:01";
  }),
  check("duration").customSanitizer((v) => {
    const durationMins = parseInt(parseDurationToSeconds(v) / 60, 10);
    if (Number.isNaN(durationMins) || !durationMins) {
      return 30;
    }
    // eslint-disable-next-line no-nested-ternary
    return durationMins < 30 ? 30 : durationMins > 999 ? 999 : durationMins;
  }),
  check("level").customSanitizer(async (v) => {
    const levelOptions = await getLevels();
    return levelOptions.includes(v) ? v : "beginner";
  }),
  check("capacity")
    .toInt()
    .customSanitizer((v) => {
      if (!v || Number.isNaN(v)) {
        return 1;
      }
      // eslint-disable-next-line no-nested-ternary
      return v < 1 ? 1 : v > 999 ? 999 : v;
    }),
];

// export const mapTimetableToDB = mapToDbSchemaFactory(timetableMappingConfig);
