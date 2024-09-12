import nodePath from "node:path";
import fsPromise from "fs/promises";
// eslint-disable-next-line import/no-extraneous-dependencies
import multer from "multer";

const imageFilter = (req, file, cb) => {
  const imageTypes = ["image/png", "image/jpeg", "image/webp"];
  console.log(file.mimetype);
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
  console.log(file.mimetype);
  const valueTypes = ["application/xml", "text/xml"];
  if (valueTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    req.fileValidationError = "File type must be text/xml";
  }
};

// export const checkFileUploadErrors = (req, res, next) => {
//   if (req.fileValidationError) {

//   }
// }

const getAvailableFilename = async (destpath, basename, ext, index = 0) => {
  const filename =
    index === 0 ? `${basename}.${ext}` : `${basename}-${index}.${ext}`;
  const filePath = nodePath.join(destpath, filename);

  try {
    await fsPromise.access(filePath);
    return getAvailableFilename(destpath, basename, ext, index + 1);
  } catch (error) {
    return filename;
  }
};

const uploadStorage = (destPath) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destPath);
    },
    filename: async (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      const basename = file.originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9_-]+/g, "_");

      try {
        const availableFilename = await getAvailableFilename(
          destPath,
          basename,
          ext,
        );
        cb(null, availableFilename);
      } catch (error) {
        cb(error);
      }
    },
  });

export const imageUpload = (path) =>
  multer({
    storage: uploadStorage(path),
    fileFilter: imageFilter,
    limits: { fileSize: 5000000 },
  });

export const xmlUpload = (path) =>
  multer({ storage: uploadStorage(path), fileFilter: xmlFilter });
