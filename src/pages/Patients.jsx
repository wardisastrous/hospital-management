import React, { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    disease: "",
    doctor: ""
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await API.get("/api/patients");
    setPatients(res.data);
  };

  const handleAdd = async () => {
    if (!form.name || !form.age) return alert("Fill all fields");

    await API.post("/api/patients", form);
    setForm({ name: "", age: "", disease: "", doctor: "" });
    fetchPatients();
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/patients/${id}`);
    fetchPatients();
  };

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Total Patients</h2>
          <p className="text-2xl font-bold">{patients.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Unique Diseases</h2>
          <p className="text-2xl font-bold">
            {[...new Set(patients.map(p => p.disease))].length}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Doctors</h2>
          <p className="text-2xl font-bold">
            {[...new Set(patients.map(p => p.doctor))].length}
          </p>
        </div>
      </div>

      {/* Search */}
      <input
        className="w-full p-3 mb-6 border rounded-lg shadow-sm"
        placeholder="🔍 Search patient..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Form */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6 grid grid-cols-4 gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <input
          className="border p-2 rounded"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({...form, age: e.target.value})}
        />
        <input
          className="border p-2 rounded"
          placeholder="Disease"
          value={form.disease}
          onChange={(e) => setForm({...form, disease: e.target.value})}
        />
        <input
          className="border p-2 rounded"
          placeholder="Doctor"
          value={form.doctor}
          onChange={(e) => setForm({...form, doctor: e.target.value})}
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mb-6"
      >
        ➕ Add Patient
      </button>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">Disease</th>
              <th className="p-3">Doctor</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.age}</td>
                <td className="p-3 text-red-500">{p.disease}</td>
                <td className="p-3">{p.doctor}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </Layout>
  );
}

export default Patients;