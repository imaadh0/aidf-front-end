import JobCard from "@/components/shared/JobCard";
import { getJobs } from "@/lib/services/api/jobs"; 
import { useEffect, useState } from "react";

function JobSection() {
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(false);
  const [isJobsError, setIsJobsError] = useState(false);

  useEffect(() => {
    //Always runs the code when the component comes to the screen
    setIsJobsLoading(true);
    getJobs()
      .then((data) => {
      setJobs(data);
      })
      .catch(() =>{
        setIsJobsError(true);
      }).finally( ()=>{
        setIsJobsLoading(false);  
      }); 
  }, []);

  if (isJobsLoading) {
    return (
    <section id="jobs" className="py-12">
      <h2>Open Roles</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="skeleton h-32" />
        <div className="skeleton h-32" />
      </div>
    </section>
    );
  }

  if (isJobsError) {
    return (
    <section id="jobs" className="py-12">
      <h2>Open Roles</h2>
      <div className="mt-6 rounded-lg border border-destructive/20 bg-destructive/5 p-5">
        <p className="text-sm text-destructive">We could not load jobs right now. Check that the backend is running on port 8000.</p>
      </div>
    </section>
    );
  }

  return (
    <section id="jobs" className="py-12">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2>Open Roles</h2>
          <p className="mt-2 text-sm">Choose a role and answer the screening questions to apply.</p>
        </div>
        <span className="text-sm font-medium text-muted-foreground">{jobs.length} active posting{jobs.length === 1 ? "" : "s"}</span>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              _id={job._id}
              type={job.type}
              location={job.location}
            />
          );
        })}
        {jobs.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center md:col-span-2">
            <h3>No open roles yet</h3>
            <p className="mt-2 text-sm">New opportunities will appear here when the hiring team publishes them.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default JobSection;
