import JobCard from "@/components/shared/JobCard";
import { Button } from "@/components/ui/button";
import { getJobs } from "@/lib/services/api/jobs";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function JobPostsSection() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs()
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Failed to load jobs:", err);
        setJobs([]);
      });
  }, []);

  return (
    <section className="py-8">
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Recruiting Pipeline</p>
          <h2 className="mt-2">Current Job Postings</h2>
          <p className="mt-2 text-sm">Manage live roles and review candidate applications.</p>
        </div>
        <Button asChild>
          <Link to="/admin/job/create">
            <Plus size={16} />
            New Posting
          </Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {Array.isArray(jobs) && jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              type={job.type}
              location={job.location}
              _id={job._id}
              isAdmin={true}
            />
          );
        })}
        {jobs.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center md:col-span-2">
            <h3>No postings yet</h3>
            <p className="mt-2 text-sm">Create the first role to start collecting applications.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default JobPostsSection;
