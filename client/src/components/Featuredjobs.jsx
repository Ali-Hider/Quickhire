// client/src/components/Featuredjobs.jsx
import React, { useEffect, useState } from "react";
import Jobcard from "./Jobcard";
import { getJobs } from "../api/api";

export default function Featuredjobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await getJobs();
        setJobs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) return <p className="text-center py-8">Loading jobs...</p>;
  if (jobs.length === 0)
    return <p className="text-center py-8">No featured jobs available.</p>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Featured Jobs</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Jobcard key={job._id} {...job} />
        ))}
      </div>
    </div>
  );
}