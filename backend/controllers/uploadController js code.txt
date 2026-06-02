const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");


const uploadExcel = async (req, res) => {
console.log(req.file);
console.log("Upload endpoint hit");
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const filePath = req.file.path;

    const workbook = XLSX.readFile(filePath);

    const sheets = [];

    workbook.SheetNames.forEach((sheetName) => {

      const worksheet = workbook.Sheets[sheetName];

      const jsonData =
        XLSX.utils.sheet_to_json(
          worksheet,
          {
            defval: ""
          }
        );

      let columns = [];

      if (jsonData.length > 0) {
        columns = Object.keys(jsonData[0]);
      }

      sheets.push({
        sheetName,
        columns,
        rows: jsonData
      });

    });

    res.json({
      success: true,
      fileName: req.file.filename,
      sheets
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  uploadExcel
};