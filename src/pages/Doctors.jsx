import Layout from "../components/Layout";
import { useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: ""
  });

  const handleAdd = () => {
    if (!form.name || !form.specialization) {
      return alert("Fill all fields");
    }

    const newDoctor = {
      id: Date.now(),
      ...form
    };

    setDoctors([...doctors, newDoctor]);
    setForm({ name: "", specialization: "", experience: "" });
  };

  const handleDelete = (id) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  return (
    <Layout>

      {/* 🔥 Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl shadow mb-6">
        <h1 className="text-3xl font-bold">👨‍⚕️ Doctors Management</h1>
        <p className="mt-2 text-sm opacity-90">
          Manage hospital doctors & specialists
        </p>
      </div>

      {/* 🔥 Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Doctors</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {doctors.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Specializations</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {[...new Set(doctors.map(d => d.specialization))].length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Experienced (5+ yrs)</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {doctors.filter(d => d.experience >= 5).length}
          </p>
        </div>
      </div>

      {/* 🔥 Add Doctor Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-3 gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Doctor Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <input
          className="border p-2 rounded"
          placeholder="Specialization"
          value={form.specialization}
          onChange={(e) => setForm({...form, specialization: e.target.value})}
        />
        <input
          className="border p-2 rounded"
          placeholder="Experience (years)"
          value={form.experience}
          onChange={(e) => setForm({...form, experience: e.target.value})}
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg mb-6"
      >
        ➕ Add Doctor
      </button>

      {/* 🔥 Doctors List */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Doctor List</h2>

        <div className="grid grid-cols-3 gap-4">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">{doc.name}</h3>
              <p className="text-gray-500">{doc.specialization}</p>
              <p className="text-sm mt-1">
                Experience: {doc.experience} years
              </p>

              <button
                onClick={() => handleDelete(doc.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}

          {doctors.length === 0 && (
            <p className="text-gray-500">No doctors added yet</p>
          )}
        </div>
      </div>

    </Layout>
  );
}

export default Doctors;