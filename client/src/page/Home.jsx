// client/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import Featuredjobs from "../components/Featuredjobs";  // duplicate with job listing below
import Jobcard from "../components/Jobcard";
import Footer from "../components/Footer";
import { getJobs } from "../api/api";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [noMatch, setNoMatch] = useState(false); // track if search returned zero

  useEffect(() => {
    getJobs()
      .then((res) => {
        setJobs(res.data.data);
        setFilteredJobs(res.data.data);
        setNoMatch(false); // reset noMatch on initial load
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = ({ keyword, location }) => {
    const filtered = jobs.filter((job) => {
      const matchesKeyword = job.title
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchesLocation = job.location
        .toLowerCase()
        .includes(location.toLowerCase());
      return matchesKeyword && matchesLocation;
    });

    setFilteredJobs(filtered);
    setNoMatch(filtered.length === 0); // update noMatch only on search
  };

  return (
    <div>
      <Navbar />
      <Hero onSearch={handleSearch} />

      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Job Listings</h2>

        {noMatch ? (
          <p className="text-center py-4 text-gray-600">No jobs match your search.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Jobcard key={job._id} {...job} />
            ))}
          </div>
        )}
      </div>

      {/* <Featuredjobs /> */}  {/* duplicate jobs listing above, so hidden */}
      <Footer />
    </div>
  );
}