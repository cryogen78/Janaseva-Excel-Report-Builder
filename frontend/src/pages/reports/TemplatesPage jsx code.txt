import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Save,
  Trash2,
  FolderOpen,
  FileSpreadsheet,
  ArrowLeft,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function TemplatesPage() {

  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);

  const [templateName, setTemplateName] =
    useState('');

  const [createdBy, setCreatedBy] =
    useState('Administrator');

  const [columns, setColumns] =
    useState([]);

  const [filters, setFilters] =
    useState([]);

  useEffect(() => {

    loadTemplates();

  }, []);

  const loadTemplates = async () => {

    try {

      const response = await axios.get(
        'http://localhost:5000/api/templates'
      );

      setTemplates(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const saveTemplate = async () => {

    if (!templateName.trim()) {

      alert('Please enter template name');

      return;

    }

    try {

      await axios.post(
        'http://localhost:5000/api/templates/save',
        {
          templateName,
          columns,
          filters,
          createdBy,
        }
      );

      alert('Template Saved Successfully');

      setTemplateName('');

      loadTemplates();

    } catch (error) {

      console.log(error);

      alert('Failed to save template');

    }

  };

  const deleteTemplate = async (id) => {

    const confirmDelete =
      window.confirm(
        'Delete this template?'
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/templates/${id}`
      );

      loadTemplates();

    } catch (error) {

      console.log(error);

    }

  };

  const loadTemplateData = (template) => {

    try {

      setColumns(
        JSON.parse(template.columns_json)
      );

      setFilters(
        JSON.parse(template.filters_json)
      );

      alert(
        `Template "${template.template_name}" loaded`
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-orange-600">
            Report Templates
          </h1>

          <p className="text-gray-500 mt-2">
            Save and manage reusable report configurations
          </p>

        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-xl"
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

      </div>

      {/* Save Template Card */}

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

        <h2 className="text-2xl font-bold text-orange-600 mb-6">
          Save New Template
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-medium">
              Template Name
            </label>

            <input
              type="text"
              value={templateName}
              onChange={(e) =>
                setTemplateName(e.target.value)
              }
              placeholder="Monthly Salary Report"
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Created By
            </label>

            <input
              type="text"
              value={createdBy}
              onChange={(e) =>
                setCreatedBy(e.target.value)
              }
              className="w-full border rounded-xl p-3"
            />

          </div>

        </div>

        <button
          onClick={saveTemplate}
          className="mt-6 flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl"
        >
          <Save size={18} />
          Save Template
        </button>

      </div>

      {/* Templates Grid */}

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex items-center gap-3 mb-8">

          <FileSpreadsheet
            size={28}
            className="text-orange-600"
          />

          <h2 className="text-2xl font-bold text-orange-600">
            Saved Templates
          </h2>

        </div>

        {

          templates.length === 0 ? (

            <div className="text-center py-20 text-gray-500">

              No Templates Found

            </div>

          ) : (

            <div className="grid grid-cols-3 gap-6">

              {

                templates.map((template) => (

                  <div
                    key={template.id}
                    className="border rounded-2xl p-6 hover:shadow-lg transition"
                  >

                    <h3 className="text-xl font-bold text-orange-600 mb-2">
                      {template.template_name}
                    </h3>

                    <p className="text-gray-500 mb-1">
                      Created By:
                    </p>

                    <p className="font-medium mb-3">
                      {template.created_by}
                    </p>

                    <p className="text-gray-500 mb-4">
                      Created:
                    </p>

                    <p className="mb-6">
                      {template.created_at}
                    </p>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          loadTemplateData(
                            template
                          )
                        }
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl"
                      >
                        <FolderOpen size={16} />
                        Load
                      </button>

                      <button
                        onClick={() =>
                          deleteTemplate(
                            template.id
                          )
                        }
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-xl"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

    </div>

  );

}