/* eslint-disable import/no-extraneous-dependencies */
import "quill/dist/quill.snow.css";
import "./style.css";
import Quill from "quill";

// article editor

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
