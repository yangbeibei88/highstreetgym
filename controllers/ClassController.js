import { getAllClasses, getClass } from "../models/ClassModel.js";

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
    console.log(course);
    res.status(200).render("class", {
      title: course[0].className,
      course,
    });
  } catch (error) {
    console.log(error);
  }
};
