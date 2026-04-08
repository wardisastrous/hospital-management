import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await API.get("/api/patients");
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      
      {/* 🔥 Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow mb-6">
        <h1 className="text-3xl font-bold">🏥 CityCare Hospital</h1>
        <p className="mt-2 text-sm opacity-90">
          Smart Patient Management System
        </p>
      </div>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Patients</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {patients.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Unique Diseases</h2>
          <p className="text-3xl font-bold text-red-500 mt-2">
            {[...new Set(patients.map(p => p.disease))].length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Doctors</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {[...new Set(patients.map(p => p.doctor))].length}
          </p>
        </div>

      </div>

      {/* 🔥 Recent Patients */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>

        <div className="space-y-3">
          {patients.slice(0, 5).map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">
                  {p.disease} • {p.doctor}
                </p>
              </div>

              <span className="text-sm text-gray-400">Age: {p.age}</span>
            </div>
          ))}

          {patients.length === 0 && (
            <p className="text-gray-500">No patients yet</p>
          )}
        </div>
      </div>

    </Layout>
  );
}

export default Dashboard;