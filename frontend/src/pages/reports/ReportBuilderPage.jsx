import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

export default function ReportBuilderPage() {

  const [reportName, setReportName] =
    useState("BankReport");

  const [columns, setColumns] =
    useState([]);

  const [rows, setRows] =
    useState([]);

  const [previewRows, setPreviewRows] =
    useState([]);

  const [selectedColumns, setSelectedColumns] =
    useState([]);

  const [filters, setFilters] =
    useState([]);

  const [calculations, setCalculations] =
    useState([]);

  const [groupBy, setGroupBy] =
    useState({
      column: "",
      operation: "SUM",
      targetColumn: ""
    });

  /*
  ====================================
  UPLOAD EXCEL
  ====================================
  */

  const handleFileUpload =
    async (event) => {

      try {

        const file =
          event.target.files[0];

        if (!file) return;

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await axios.post(

            "http://localhost:5000/api/upload/excel",

            formData,

            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }

          );

        const firstSheet =
          response.data.sheets[0];

        setColumns(
          firstSheet.columns
        );

        setRows(
          firstSheet.rows
        );

        setPreviewRows(
          firstSheet.rows
        );

      } catch (error) {

        console.error(error);

        alert(
          "Excel upload failed"
        );

      }

    };

  /*
  ====================================
  COLUMN SELECTOR
  ====================================
  */

  const toggleColumn =
    (column) => {

      if (
        selectedColumns.includes(
          column
        )
      ) {

        setSelectedColumns(

          selectedColumns.filter(
            c => c !== column
          )

        );

      } else {

        setSelectedColumns([

          ...selectedColumns,

          column

        ]);

      }

    };

  /*
  ====================================
  FILTERS
  ====================================
  */

  const addFilter = () => {

    setFilters([

      ...filters,

      {
        column: "",
        operator: "equals",
        value: ""
      }

    ]);

  };

  const updateFilter =
    (
      index,
      field,
      value
    ) => {

      const temp =
        [...filters];

      temp[index][field] =
        value;

      setFilters(temp);

    };

  const applyFilters =
    () => {

      let filtered =
        [...rows];

      filters.forEach(
        filter => {

        filtered =
          filtered.filter(
            row => {

            const value =
              row[
                filter.column
              ];

            switch (
              filter.operator
            ) {

              case "equals":

                return (
                  String(value) ===
                  String(
                    filter.value
                  )
                );

              case "contains":

                return String(
                  value
                )
                  .toLowerCase()
                  .includes(
                    String(
                      filter.value
                    )
                    .toLowerCase()
                  );

              case "greaterThan":

                return (
                  Number(value) >
                  Number(
                    filter.value
                  )
                );

              case "lessThan":

                return (
                  Number(value) <
                  Number(
                    filter.value
                  )
                );

              default:

                return true;

            }

          });

      });

      setPreviewRows(
        filtered
      );

    };

  /*
  ====================================
  CALCULATIONS
  ====================================
  */

  const addCalculation =
    () => {

      setCalculations([

        ...calculations,

        {
          column: "",
          operation: "SUM"
        }

      ]);

    };

  const updateCalculation =
    (
      index,
      field,
      value
    ) => {

      const temp =
        [...calculations];

      temp[index][field] =
        value;

      setCalculations(
        temp
      );

    };

  /*
  ====================================
  REPORT GENERATION
  ====================================
  */

  const generateReport =
    async () => {

      try {

        const response =
          await axios.post(

            "http://localhost:5000/api/reports/generate",

            {

              reportName,

              columns:
                selectedColumns.length
                  ? selectedColumns
                  : columns,

              rows:
                previewRows,

              filters,

              calculations,

              groupBy

            },

            {
              responseType:
                "blob"
            }

          );

        saveAs(

          response.data,

          `${reportName}.xlsx`

        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Report generation failed"
        );

      }

    };

  return (

    <div className="p-8">

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-orange-600 mb-8">
          Advanced Banking Report Builder
        </h1>

        {/* FILE */}

        <input
          type="file"
          onChange={
            handleFileUpload
          }
          className="mb-6"
        />

        {/* REPORT NAME */}

        <input
          type="text"
          value={reportName}
          onChange={(e) =>
            setReportName(
              e.target.value
            )
          }
          placeholder="Report Name"
          className="border p-4 rounded-xl w-full mb-8"
        />

        {/* COLUMNS */}

        <h2 className="text-2xl font-bold mb-4">
          Column Selector
        </h2>

        <div className="grid grid-cols-4 gap-3 mb-10">

          {columns.map(
            column => (

            <label
              key={column}
              className="border rounded-xl p-3 flex gap-2"
            >

              <input
                type="checkbox"
                checked={
                  selectedColumns.includes(
                    column
                  )
                }
                onChange={() =>
                  toggleColumn(
                    column
                  )
                }
              />

              {column}

            </label>

          ))}

        </div>

        {/* FILTERS */}

        <div className="flex justify-between mb-4">

          <h2 className="text-2xl font-bold">
            Filters
          </h2>

          <button
            onClick={addFilter}
            className="bg-orange-500 text-white px-4 py-2 rounded-xl"
          >
            Add Filter
          </button>

        </div>

        {filters.map(
          (
            filter,
            index
          ) => (

          <div
            key={index}
            className="grid grid-cols-3 gap-3 mb-3"
          >

            <select
              className="border p-3 rounded-xl"
              onChange={(e) =>
                updateFilter(
                  index,
                  "column",
                  e.target.value
                )
              }
            >

              <option>
                Column
              </option>

              {columns.map(
                col => (

                <option
                  key={col}
                  value={col}
                >
                  {col}
                </option>

              ))}

            </select>

            <select
              className="border p-3 rounded-xl"
              onChange={(e) =>
                updateFilter(
                  index,
                  "operator",
                  e.target.value
                )
              }
            >

              <option value="equals">
                Equals
              </option>

              <option value="contains">
                Contains
              </option>

              <option value="greaterThan">
                Greater Than
              </option>

              <option value="lessThan">
                Less Than
              </option>

            </select>

            <input
              type="text"
              placeholder="Value"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                updateFilter(
                  index,
                  "value",
                  e.target.value
                )
              }
            />

          </div>

        ))}

        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl mb-10"
        >
          Apply Filters
        </button>

        {/* CALCULATIONS */}

        <div className="flex justify-between mb-4">

          <h2 className="text-2xl font-bold">
            Calculations
          </h2>

          <button
            onClick={
              addCalculation
            }
            className="bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Add Calculation
          </button>

        </div>

        {calculations.map(
          (
            calc,
            index
          ) => (

          <div
            key={index}
            className="grid grid-cols-2 gap-3 mb-3"
          >

            <select
              className="border p-3 rounded-xl"
              onChange={(e) =>
                updateCalculation(
                  index,
                  "column",
                  e.target.value
                )
              }
            >

              <option>
                Column
              </option>

              {columns.map(
                col => (

                <option
                  key={col}
                  value={col}
                >
                  {col}
                </option>

              ))}

            </select>

            <select
              className="border p-3 rounded-xl"
              onChange={(e) =>
                updateCalculation(
                  index,
                  "operation",
                  e.target.value
                )
              }
            >

              <option>SUM</option>
              <option>AVG</option>
              <option>COUNT</option>
              <option>MIN</option>
              <option>MAX</option>
              <option>MEDIAN</option>
              <option>STDDEV</option>

            </select>

          </div>

        ))}

        {/* GROUP BY */}

        <h2 className="text-2xl font-bold mt-10 mb-4">
          Group By
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-10">

          <select
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setGroupBy({

                ...groupBy,

                column:
                  e.target.value

              })
            }
          >

            <option>
              Group Column
            </option>

            {columns.map(
              col => (

              <option
                key={col}
                value={col}
              >
                {col}
              </option>

            ))}

          </select>

          <select
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setGroupBy({

                ...groupBy,

                operation:
                  e.target.value

              })
            }
          >

            <option>SUM</option>
            <option>AVG</option>
            <option>COUNT</option>
            <option>MIN</option>
            <option>MAX</option>

          </select>

          <select
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setGroupBy({

                ...groupBy,

                targetColumn:
                  e.target.value

              })
            }
          >

            <option>
              Target Column
            </option>

            {columns.map(
              col => (

              <option
                key={col}
                value={col}
              >
                {col}
              </option>

            ))}

          </select>

        </div>

        {/* PREVIEW */}

        <h2 className="text-2xl font-bold mb-4">
          Data Preview
        </h2>

        <div className="overflow-auto max-h-[500px] border">

          <table className="w-full">

            <thead>

              <tr>

                {columns.map(
                  col => (

                  <th
                    key={col}
                    className="border p-2 bg-gray-100"
                  >
                    {col}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {previewRows
                .slice(0, 50)
                .map(
                  (
                    row,
                    index
                  ) => (

                  <tr
                    key={index}
                  >

                    {columns.map(
                      col => (

                      <td
                        key={col}
                        className="border p-2"
                      >
                        {row[col]}
                      </td>

                    ))}

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

        {/* GENERATE */}

        <button
          onClick={
            generateReport
          }
          className="
            mt-10
            bg-orange-600
            text-white
            px-8
            py-4
            rounded-2xl
            text-xl
          "
        >
          Generate Excel Report
        </button>

      </div>

    </div>

  );

}