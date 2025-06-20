import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Tooltip from "../components/Tooltip";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Users</h2>

        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="w-full bg-white p-4 rounded-xl shadow hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex flex-col group transition">
                  <Tooltip text={`Full Name`}>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition duration-200 cursor-pointer">
                      {user.fullName}
                    </h3>
                  </Tooltip>
                  <Tooltip text={`Email`}>
                    <p className="text-sm text-gray-500 group-hover:text-indigo-500 transition duration-200 cursor-pointer">
                      {user.email}
                    </p>
                  </Tooltip>
                </div>

                <div className="flex flex-wrap gap-2 sm:justify-end max-w-full ">
                  {user.hobbies && user.hobbies.length > 0 ? (
                    user.hobbies.map((hobby) => (
                      <Tooltip key={hobby._id} text={`Hobby`}>
                        <span
                          className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 hover:text-indigo-900 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap transition cursor-pointer"
                        >
                          {user.hobbies.length > 1 ? `${hobby.name} ` : hobby.name}
                        </span>
                      </Tooltip>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">No hobbies</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
