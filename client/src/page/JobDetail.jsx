import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ApplicationForm from "../components/ApplicationForm";
import { getJobById } from "../api/api";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const res = await getJobById(id);
      setJob(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching job details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-24 px-4">
          <div className="container mx-auto">
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              {error}
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-24 px-4">
          <div className="container mx-auto">
            <p className="text-gray-600">Job not found</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline mb-6"
          >
            ← Back to Jobs
          </button>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white p-8 rounded shadow-lg">
                <h1 className="text-4xl font-bold text-blue-600 mb-2">
                  {job.title}
                </h1>
                <p className="text-xl text-gray-700 font-semibold mb-1">
                  {job.company}
                </p>
                <p className="text-gray-600 mb-6">
                  📍 {job.location} • 🏷️ {job.category}
                </p>

                <div className="border-t pt-6">
                  <h2 className="text-2xl font-bold mb-4">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>

                <div className="border-t mt-6 pt-6">
                  <p className="text-gray-500 text-sm">
                    Posted on:{" "}
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded shadow-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4">Interested?</h3>
                {showApplicationForm ? (
                  <ApplicationForm
                    jobId={job._id}
                    onClose={() => setShowApplicationForm(false)}
                  />
                ) : (
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}