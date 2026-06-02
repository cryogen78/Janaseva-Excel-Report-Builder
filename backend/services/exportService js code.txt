const ExcelJS =
require("exceljs");

async function exportExcel(
  rows,
  headers,
  outputFile
) {

  const workbook =
    new ExcelJS.Workbook();

  const sheet =
    workbook.addWorksheet(
      "Report"
    );

  sheet.addRow(headers);

  rows.forEach((row) => {
    sheet.addRow(row);
  });

  await workbook.xlsx.writeFile(
    outputFile
  );

  return outputFile;

}

module.exports =
  exportExcel;