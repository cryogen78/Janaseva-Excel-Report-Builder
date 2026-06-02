import { useNavigate } from "react-router-dom";
import { ArrowLeft, LayoutTemplate } from "lucide-react";

export default function TemplatesPage() {

  const navigate = useNavigate();

  const templates = [
    "Monthly Deposit Report",
    "Loan Portfolio Report",
    "Branch Performance Report",
    "Audit Report Template"
  ];

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex items-center gap-4 mb-8">

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-orange-500 text-white p-2 rounded-lg"
        >
          <ArrowLeft />
        </button>

        <h1 className="text-4xl font-bold text-orange-600">
          Templates
        </h1>

      </div>

      <div className="grid grid-cols-2 gap-6">

        {templates.map((template, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <LayoutTemplate
              size={40}
              className="text-orange-600"
            />

            <h2 className="font-semibold text-xl mt-4">
              {template}
            </h2>

          </div>

        ))}

      </div>

    </div>

  );

}