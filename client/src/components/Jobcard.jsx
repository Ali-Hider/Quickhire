// client/src/components/Jobcard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Jobcard({ _id, title, company, location }) {
  return (
    <Link
      to={`/job/${_id}`}
      className="border p-4 rounded shadow hover:shadow-lg transition block hover:bg-blue-50"
    >
      <h2 className="font-bold text-lg text-blue-600">{title}</h2>
      <p className="text-gray-600">{company}</p>
      <p className="text-gray-600">📍 {location}</p>
    </Link>
  );
}