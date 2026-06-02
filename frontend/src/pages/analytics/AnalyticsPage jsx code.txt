import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

import {
  FileText,
  Upload,
  Users,
  FileSpreadsheet
} from 'lucide-react';

const monthlyReports = [
  { month: 'Jan', reports: 25 },
  { month: 'Feb', reports: 38 },
  { month: 'Mar', reports: 42 },
  { month: 'Apr', reports: 57 },
  { month: 'May', reports: 63 },
  { month: 'Jun', reports: 78 }
];

const departmentUsage = [
  { name: 'HR', value: 30 },
  { name: 'Finance', value: 45 },
  { name: 'Operations', value: 15 },
  { name: 'Audit', value: 10 }
];

const uploadTrend = [
  { day: 'Mon', uploads: 5 },
  { day: 'Tue', uploads: 8 },
  { day: 'Wed', uploads: 6 },
  { day: 'Thu', uploads: 12 },
  { day: 'Fri', uploads: 15 }
];

const COLORS = [
  '#ea580c',
  '#fb923c',
  '#fdba74',
  '#ffedd5'
];

export default function AnalyticsPage() {

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold text-orange-600 mb-8">
        Analytics Dashboard
      </h1>

      {/* KPI CARDS */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between">
            <div>
              <p>Total Reports</p>
              <h2 className="text-4xl font-bold text-orange-600">
                120
              </h2>
            </div>
            <FileText size={40}/>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between">
            <div>
              <p>Total Uploads</p>
              <h2 className="text-4xl font-bold text-orange-600">
                45
              </h2>
            </div>
            <Upload size={40}/>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between">
            <div>
              <p>Total Users</p>
              <h2 className="text-4xl font-bold text-orange-600">
                18
              </h2>
            </div>
            <Users size={40}/>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between">
            <div>
              <p>Templates</p>
              <h2 className="text-4xl font-bold text-orange-600">
                12
              </h2>
            </div>
            <FileSpreadsheet size={40}/>
          </div>
        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-8">

        {/* BAR CHART */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Monthly Reports
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={monthlyReports}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>

              <Bar
                dataKey="reports"
                fill="#ea580c"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* PIE CHART */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Department Usage
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={departmentUsage}
                dataKey="value"
                outerRadius={100}
                label
              >

                {
                  departmentUsage.map(
                    (entry,index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    )
                  )
                }

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* LINE CHART */}

      <div className="bg-white p-6 rounded-2xl shadow mt-8">

        <h2 className="text-xl font-bold mb-4">
          Upload Trend
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart data={uploadTrend}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="day"/>

            <YAxis/>

            <Tooltip/>

            <Line
              type="monotone"
              dataKey="uploads"
              stroke="#ea580c"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}