// eslint-disable-next-line import/no-extraneous-dependencies
import multer from "multer";

const imageFilter = (req, file, cb) => {
  const imageTypes = ["image/png", "image/jpeg", "image/webp"];
  if (imageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // console.error(new Error());
    cb(null, false);
    // cb(new AppError("Image types must be jpg, jpeg, png or webp.", 400), false);
    req.fileValidationError = "Image types must be jpg, jpeg, png, or webp.";
  }
};

const xmlFilter = (req, file, cb) => {
  if (file.mimetype === "application/xml") {
    cb(null, true);
  } else {
    cb(null, false);
    req.fileValidationError = "File type must be application/xml";
  }
};

const uploadStorage = (suffix, path) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${suffix}-${Date.now()}`;
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.originalname.split(".")[0]}-${uniqueSuffix}.${ext}`);
    },
  });

export const articleImageUpload = (suffix, path) =>
  multer({
    storage: uploadStorage(suffix, path),
    fileFilter: imageFilter,
  });

export const xmlUpload = () =>
  multer({ dest: "public/uploads", fileFilter: xmlFilter });
