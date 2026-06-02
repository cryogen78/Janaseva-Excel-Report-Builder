const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  uploadExcel
} = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      "uploads/"
    );

  },

  filename: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      Date.now() +
      "-" +
      file.originalname
    );

  }

});

const upload =
  multer({
    storage
  });

router.post(
  "/excel",
  upload.single("file"),
  uploadExcel
);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Upload route working"
  });
});

module.exports = router;