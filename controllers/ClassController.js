import { getAllClasses } from "../models/ClassModel.js";

export const classListAction = async (req, res) => {
  try {
    const [classes] = await getAllClasses();
    console.log(classes);
    res.status(200).json({ classes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};
