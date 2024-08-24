import { getAllClasses, getClass } from "../models/ClassModel.js";
import { getClassTimetable } from "../models/TimetableModel.js";

export const classListAction = async (req, res) => {
  try {
    const [classes] = await getAllClasses();
    console.log(classes);
    res.status(200).render("classes", {
      title: "All classes",
      classes,
    });
  } catch (error) {
    // res.status(500).json({ error: "Failed to fetch classes" });
    console.log(error);
  }
};

export const classShowAction = async (req, res) => {
  try {
    const [course] = await getClass(+req.params.classId);
    const [timetables] = await getClassTimetable(+req.params.classId);
    console.log(course);
    res.status(200).render("class", {
      title: course[0].className,
      course,
      timetables,
    });
  } catch (error) {
    console.log(error);
  }
};
