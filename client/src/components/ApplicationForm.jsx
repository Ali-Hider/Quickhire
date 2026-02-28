import React, { useState } from "react";
import { submitApplication } from "../api/api";

export default function ApplicationForm({ jobId, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = { ...formData, jobId };
      await submitApplication(data);
      setSuccess(true);
      setFormData({ name: "", email: "", resumeLink: "", coverNote: "" });
      setTimeout(() => {
        setSuccess(false);
        onClose && onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4">Apply for this Job</h3>

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          Application submitted successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Resume Link</label>
          <input
            type="url"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="https://example.com/resume.pdf"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Cover Note</label>
          <textarea
            name="coverNote"
            value={formData.coverNote}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Tell us why you're a great fit..."
            rows="4"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
