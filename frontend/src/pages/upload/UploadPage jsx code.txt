import { useState } from 'react';

import axios from 'axios';

import { Upload } from 'lucide-react';

export default function UploadPage() {

  const [file, setFile] = useState(null);

  const [response, setResponse] = useState(null);

  const handleUpload = async () => {

    if (!file) {

      return alert('Select a file first');

    }

    const formData = new FormData();

    formData.append('file', file);

    try {

      const res = await axios.post(
  'http://localhost:5000/api/upload/excel',
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
);

      setResponse(res.data);

    } catch (error) {

      console.log(error);

      alert('Upload failed');

    }

  };

  return (

    <div className='p-10'>

      <div className='bg-white rounded-3xl shadow-2xl p-10'>

        <h1 className='text-4xl font-bold text-primary mb-8'>
          Upload Excel File
        </h1>

        <div className='border-2 border-dashed border-primary rounded-3xl p-20 text-center'>

          <Upload
            size={80}
            className='mx-auto text-primary mb-6'
          />

          <input
            type='file'
            accept='.xlsx,.xls,.csv'
            onChange={(e) => setFile(e.target.files[0])}
            className='mb-6'
          />

          <br />

          <button
            onClick={handleUpload}
            className='bg-primary text-white px-8 py-4 rounded-2xl text-lg'
          >
            Upload File
          </button>

        </div>

      </div>

      {/* Preview */}

      {
        response && (

          <div className='mt-10 bg-white rounded-3xl shadow-2xl p-10'>

            <h2 className='text-3xl font-bold text-primary mb-8'>
              Excel Preview
            </h2>

            {
              response.sheets.map((sheet, index) => (

                <div
                  key={index}
                  className='mb-12'
                >

                  <h3 className='text-2xl font-bold mb-4'>
                    {sheet.sheetName}
                  </h3>

                  <div className='overflow-auto border rounded-2xl'>

                    <table className='w-full'>

                      <thead className='bg-orange-100'>

                        <tr>

                          {
                            sheet.columns.map((col, i) => (

                              <th
                                key={i}
                                className='p-4 text-left'
                              >
                                {col}
                              </th>

                            ))
                          }

                        </tr>

                      </thead>

<tbody>

  {
    sheet.rows.slice(0, 10).map((row, rowIndex) => (

      <tr
        key={rowIndex}
        className="border-t"
      >

        {
          sheet.columns.map((column, columnIndex) => (

            <td
              key={columnIndex}
              className="p-4"
            >
              {row[column]}
            </td>

          ))
        }

      </tr>

    ))
  }

</tbody>

                    </table>

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  );

}