import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, Search } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const navStyle = (path) =>
    `flex items-center gap-2 px-7 py-2 rounded-xl transition ${
      location.pathname === path
        ? "bg-indigo-100 text-indigo-700 font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); 
  };

  return (
    <div className="bg-white shadow-sm p-4 flex justify-around items-center">
      <h1 className="text-xl font-bold text-indigo-600">UserHobbyApp</h1>

      {isLoggedIn && (
        <div className="flex gap-4 items-center">
          <Link to="/users" className={navStyle("/users")}>
            <Users size={20} />
            <span>All Users</span>
          </Link>
          <Link to="/filter" className={navStyle("/filter")}>
            <Search size={20} />
            <span>Filter</span>
          </Link>
          {/* <button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 text-sm font-semibold bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
          >
            Logout
          </button> */}
        </div>
      )}
    </div>
  );
}
