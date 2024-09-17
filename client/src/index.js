/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-unused-vars */
// import "quill/dist/quill.snow.css";
import "./style.css";
import { Spinner } from "./components/Spinner.js";
import { MainNav } from "./components/MainNav.js";
import { FlashMessage } from "./components/FlashMessage.js";

document.addEventListener("DOMContentLoaded", () => new MainNav());
document.addEventListener("DOMContentLoaded", () => new FlashMessage());

const spinner = new Spinner();

// DYNAMIC IMPORT CHUNKS
document.addEventListener("DOMContentLoaded", () => {
  const chunkLoaders = [
    {
      match: (path) => path === "/timetable",
      load: () => import("./components/TimetableSearchAndFilter.js"),
      componentNames: ["TimetableSearchAndFilter"],
    },
    {
      match: (path) => path === "/blog",
      load: () => import("./components/BlogSearchAndFilter.js"),
      componentNames: ["BlogSearchAndFilter"],
    },
    {
      match: (path) => path === "/auth/admin/manage-users",
      load: () => import("./components/UsersSearchAndFilter.js"),
      componentNames: ["UsersSearchAndFilter"],
    },
    {
      match: (path) => path === "/auth/account/manage-bookings",
      load: () => import("./components/AccbookingsSearchAndFilter.js"),
      componentNames: ["AccbookingsSearchAndFilter"],
    },
    {
      match: (path) => path === "/auth/account/manage-articles",
      load: () => import("./components/CommentsDialog.js"),
      componentNames: ["CommentsDialog"],
    },
    {
      match: (path) =>
        /^\/auth\/account\/timetable\/\d+\/bookingForm$/.test(path),
      load: () => import("./components/BookingForm.js"),
      componentNames: ["BookingForm"],
    },
    {
      match: (path) =>
        path === "/auth/admin/classForm/create" ||
        /^\/auth\/admin\/classForm\/\d+\/edit$/.test(path),
      load: () => import("./components/ClassForm.js"),
      componentNames: ["ClassForm"],
    },
    {
      match: (path) =>
        path === "/auth/account/articleForm/create" ||
        /^\/auth\/account\/articleForm\/\d+\/edit$/.test(path),
      load: () => import("./components/ArticleForm.js"),
      componentNames: ["ArticleForm"],
    },
    {
      match: (path) => /^\/auth\/(admin|account)(\/.*)?$/.test(path),
      load: () => import("./components/SideNav.js"),
      componentNames: ["SideNav"],
    },
  ];

  chunkLoaders.forEach(({ match, load, componentNames }) => {
    if (match(window.location.pathname)) {
      load()
        .then((module) => {
          componentNames.forEach((componentName) => {
            const Component = module[componentName];
            if (Component) {
              const component = new Component();
            } else {
              console.log(`Component ${componentName} not found in module.`);
            }
          });
        })
        .catch(console.error);
    }
  });
});
