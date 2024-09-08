/* eslint-disable no-unused-vars */
import "quill/dist/quill.snow.css";
import "./style.css";
import { ArticleForm } from "./components/ArticleForm.js";
// import { QuillEditor } from "./components/QuillEditor.js";
import { BookingForm } from "./components/BookingForm.js";
import { ClassForm } from "./components/ClassForm.js";
import { Spinner } from "./components/Spinner.js";

const bookingForm = new BookingForm();
// const quillEditor = new QuillEditor();
const articleForm = new ArticleForm();

const classForm = new ClassForm();
const spinner = new Spinner();
