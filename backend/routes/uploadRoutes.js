import express from "express";
import path from "path";
import multer from "multer";
const router = express.Router();

// fileName-CurruntTime.(OriginalFileExtention) to ensure multible image types , and no image with the same name
//null is the error
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/; //acceptable file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // compaire the file extintion with filetypes (extname != extname())
  const mimetype = filetypes.test(file.mimetype); //same as above but for mimtype

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("images only");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
