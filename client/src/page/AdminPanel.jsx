import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getJobs, createJob, deleteJob, updateJob } from "../api/api";

export default function AdminPanel() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: ""
  });
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double-submit
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      console.log("submitting job with token", token, "data", formData);
      if (editingJob) {
        // update existing job
        const res = await updateJob(editingJob._id, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("update response", res);
        setMessage("Job updated successfully!");
      } else {
        // create new job
        const res = await createJob(formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("create response", res);
        setMessage("Job posted successfully!");
      }

      setFormData({
        title: "",
        company: "",
        location: "",
        category: "",
        description: ""
      });
      setEditingJob(null);
      fetchJobs(); // Refresh job list
    } catch (err) {
      setError(err.response?.data?.message || (editingJob ? "Error updating job" : "Error posting job"));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await deleteJob(jobId, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Job deleted successfully!");
      fetchJobs(); // Refresh job list
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

          {message && (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-6 flex justify-between items-center">
              {message}
              <button onClick={() => setMessage("")} className="text-green-700 font-bold">✕</button>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-6 flex justify-between items-center">
              {error}
              <button onClick={() => setError("")} className="text-red-700 font-bold">✕</button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {/* Post New Job Form */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-6">
                  {editingJob ? "Edit Job" : "Post a Job"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="e.g., Senior Developer"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="e.g., Tech Corp"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="e.g., New York, NY"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="e.g., IT"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Job description..."
                      rows="4"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    {loading
                      ? editingJob
                        ? "Updating..."
                        : "Posting..."
                      : editingJob
                      ? "Update Job"
                      : "Post Job"}
                  </button>
                  {editingJob && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingJob(null);
                        setFormData({
                          title: "",
                          company: "",
                          location: "",
                          category: "",
                          description: ""
                        });
                        setError("");
                        setMessage("");
                      }}
                      className="w-full mt-2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Jobs List */}
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-6">
                  All Jobs ({jobs.length})
                </h2>

                {jobs.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    No jobs posted yet.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {jobs.map((job) => (
                      <div
                        key={job._id}
                        className="border p-4 rounded hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-blue-600">
                              {job.title}
                            </h3>
                            <p className="text-gray-700 font-semibold">
                              {job.company}
                            </p>
                            <p className="text-gray-600 text-sm">
                              📍 {job.location} • {job.category}
                            </p>
                            <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                              {job.description}
                            </p>
                            <p className="text-gray-500 text-xs mt-2">
                              Posted:{" "}
                              {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                setEditingJob(job);
                                setFormData({
                                  title: job.title,
                                  company: job.company,
                                  location: job.location,
                                  category: job.category,
                                  description: job.description
                                });
                                setMessage("");
                                setError("");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}