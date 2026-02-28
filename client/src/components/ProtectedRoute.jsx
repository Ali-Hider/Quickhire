import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");

    // Check if user is logged in and is admin
    if (!token || role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  return children;
}
