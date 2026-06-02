const ExcelJS =
  require("exceljs");

const {
  applyFilters
} = require(
  "../services/filterService"
);

const {
  aggregateData
} = require(
  "../services/aggregationService"
);

const {
  groupData
} = require(
  "../services/groupByService"
);

const generateReport =
  async (
    req,
    res
  ) => {

  try {

    const {

      reportName,

      rows,

      columns,

      filters,

      calculations,

      groupBy

    } = req.body;

    const filteredRows =
      applyFilters(
        rows,
        filters
      );

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        "Report"
      );

    worksheet.columns =
      columns.map(
        column => ({

          header: column,

          key: column,

          width: 25

        })
      );

    filteredRows.forEach(row => {

      const newRow = {};

      columns.forEach(col => {

        newRow[col] =
          row[col];

      });

      worksheet.addRow(
        newRow
      );

    });

    worksheet.addRow([]);

    worksheet.addRow([
      "CALCULATIONS"
    ]);

    calculations.forEach(
      calc => {

      const result =
        aggregateData(

          filteredRows,

          calc.operation,

          calc.column

        );

      worksheet.addRow([

        calc.column,

        calc.operation,

        result

      ]);

    });

    if (
      groupBy &&
      groupBy.column
    ) {

      worksheet.addRow([]);

      worksheet.addRow([
        "GROUPED RESULTS"
      ]);

      const grouped =
        groupData(

          filteredRows,

          groupBy.column,

          groupBy.operation,

          groupBy.targetColumn

        );

      grouped.forEach(
        row => {

        worksheet.addRow(
          Object.values(row)
        );

      });

    }

    res.setHeader(

      "Content-Type",

      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    );

    res.setHeader(

      "Content-Disposition",

      `attachment; filename=${reportName}.xlsx`

    );

    await workbook.xlsx
      .write(res);

    res.end();

  } catch (error) {

    console.error(
      error
    );

    res.status(500)
      .json({

      success: false,

      message:
        error.message

    });

  }

};

module.exports = {
  generateReport
};