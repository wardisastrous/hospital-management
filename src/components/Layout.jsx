import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">🏥 Hospital</h2>

        <ul className="space-y-4">

          <li>
            <Link
              to="/"
              className={`block p-2 rounded ${
                location.pathname === "/" ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/patients"
              className={`block p-2 rounded ${
                location.pathname === "/patients" ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              Patients
            </Link>
          </li>

          <li>
            <Link
              to="/doctors"
              className={`block p-2 rounded ${
                location.pathname === "/doctors" ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              Doctors
            </Link>
          </li>

        </ul>
      </div>

      {/* 🔥 MAIN */}
      <div className="flex-1 bg-gray-100 min-h-screen p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {children}

      </div>
    </div>
  );
}

export default Layout;