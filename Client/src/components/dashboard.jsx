import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const chartRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    // Fetch patient data from the mock API
    axios
      .get("http://localhost:5000/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: patients.map((p) => p.name),
    datasets: [
      {
        label: "LH Levels",
        data: patients.map((p) => p.LH_level),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Patient List */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Patients</h2>
          <ul>
            {patients.map((patient) => (
              <li key={patient.id} className="mb-2">
                <strong>{patient.name}</strong> ({patient.condition})
                <p>
                  LH: {patient.LH_level} mIU/mL, FSH: {patient.FSH_level} mIU/mL
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">LH Levels Over Time</h2>
          <Line
            key={patients.length} // Force re-render when data changes
            ref={chartRef}
            data={chartData}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
