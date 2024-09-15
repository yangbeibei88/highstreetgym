/* eslint-disable no-unused-vars */
import "quill/dist/quill.snow.css";
import "./style.css";
import { ArticleForm } from "./components/ArticleForm.js";
import { BookingForm } from "./components/BookingForm.js";
import { ClassForm } from "./components/ClassForm.js";
import { Spinner } from "./components/Spinner.js";
import { TimetableSearchAndFilter } from "./components/TimetableSearchAndFilter.js";
import { BlogSearchAndFilter } from "./components/BlogSearchAndFilter.js";
import { MainNav } from "./components/MainNav.js";
import { SideNav } from "./components/SideNav.js";
import { FlashMessage } from "./components/FlashMessage.js";
import { CommentsDialog } from "./components/CommentsDialog.js";
import { AccbookingsSearchAndFilter } from "./components/AccbookingsSearchAndFilter.js";

document.addEventListener("DOMContentLoaded", () => new MainNav());
document.addEventListener("DOMContentLoaded", () => new SideNav());
document.addEventListener("DOMContentLoaded", () => new FlashMessage());

const bookingForm = new BookingForm();
// const quillEditor = new QuillEditor();
const articleForm = new ArticleForm();

const classForm = new ClassForm();
const spinner = new Spinner();

document.addEventListener(
  "DOMContentLoaded",
  () => new TimetableSearchAndFilter(),
);

document.addEventListener("DOMContentLoaded", () => new BlogSearchAndFilter());
document.addEventListener("DOMContentLoaded", () => new CommentsDialog());

document.addEventListener(
  "DOMContentLoaded",
  () => new AccbookingsSearchAndFilter(),
);
