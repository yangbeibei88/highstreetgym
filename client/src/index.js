/* eslint-disable import/no-extraneous-dependencies */
import "quill/dist/quill.snow.css";
import "./style.css";
import Quill from "quill";
import { BookingForm } from "./components/BookingForm.js";

// eslint-disable-next-line no-unused-vars
const bookingForm = new BookingForm();

// article editor
const articleEditorEl = document.getElementById("article-editor");

if (articleEditorEl) {
  // eslint-disable-next-line no-unused-vars
  const articleEditor = new Quill("#article-editor", {
    modules: {
      toolbar: [
        ["bold", "italic"],
        ["link", "blockquote", "code-block", "image"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
    placeholder: "Compose an epic...",
    theme: "snow",
  });
}
