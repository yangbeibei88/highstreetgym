import { getAllTimetables } from "../models/TimetableModel.js";
import { getAllClasses } from "../models/ClassModel.js";

export const timetableListAction = async (req, res) => {
  const [timetables] = await getAllTimetables();
  const [classes] = await getAllClasses();
  try {
    res.status(200).render("timetable", {
      title: "Timetable",
      classes,
      timetables,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
