// client/src/components/Hero.jsx
import React, { useState } from "react";

export default function Hero({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, location });
  };

  return (
    <div className="bg-blue-100 h-[80vh] flex items-center">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-gray-700 mb-8">Search jobs by title or location</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row justify-center gap-4"
        >
          <input
            type="text"
            placeholder="Job title, keyword..."
            className="p-4 rounded border w-full md:w-1/3"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location..."
            className="p-4 rounded border w-full md:w-1/3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}