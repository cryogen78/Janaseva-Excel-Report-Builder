const ExcelJS = require('exceljs');
const path = require('path');

exports.uploadExcel = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: 'No file uploaded'
      });

    }

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(req.file.path);

    const sheets = [];

    workbook.eachSheet((worksheet) => {

      const columns = [];

      const firstRow = worksheet.getRow(1);

      firstRow.eachCell((cell) => {
        columns.push(cell.value);
      });

      const rows = [];

      worksheet.eachRow((row, rowNumber) => {

        if (rowNumber !== 1) {

          rows.push(row.values.slice(1));

        }

      });

      sheets.push({
        sheetName: worksheet.name,
        columns,
        rows,
      });

    });

    res.json({

      message: 'File uploaded successfully',

      file: {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        path: req.file.path,
      },

      sheets,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error processing Excel file'
    });

  }

};