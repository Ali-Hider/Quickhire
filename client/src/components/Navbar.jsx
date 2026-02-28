import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-blue-600">
          QuickHire
        </Link>

        <div className="space-x-4 flex items-center">
          {userRole === "admin" && (
            <Link
              to="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Admin Panel
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}