import { Separator } from "@/components/ui/separator";
import { getJobApllicationsForJob } from "@/lib/services/api/jobApplications";
import { getJobById } from "@/lib/services/api/jobs";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText, MapPin, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobApplicationCard from "./components/JobApplicationCard";

function AdminJobPage() {
  const [job, setJob] = useState(null);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState(
    []
  );
  const [isJobApplicationsLoading, setIsJobApplicationsLoading] =
    useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    getJobById(id)
      .then((data) => {
        setJob(data);
        setIsJobLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsJobLoading(false);
      });

    getJobApllicationsForJob(id)
      .then((data) => {
        setJobApplications(data);
        setIsJobApplicationsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsJobApplicationsLoading(false);
      });
  }, [id, setJob, setJobApplications]);

  if (isJobLoading || isJobApplicationsLoading) {
    return <div className="py-8"><div className="skeleton h-36" /></div>;
  }

  return (
    <div className="py-8">
      <section className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Job Posting</p>
            <h2 className="mt-2">{job?.title}</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="gap-2 rounded-md px-3 py-1">
                <Briefcase size={14} />
            <span>{job?.type}</span>
              </Badge>
              <Badge variant="outline" className="gap-2 rounded-md px-3 py-1">
                <MapPin size={14} />
            <span>{job?.location}</span>
              </Badge>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-muted px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <UsersRound size={16} />
              {jobApplications.length} application{jobApplications.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-3 rounded-lg bg-muted p-4">
          <FileText className="mt-1 shrink-0 text-primary" size={18} />
        <p>{job?.description}</p>
      </div>
      </section>
      <Separator />
      <section className="py-8">
        <div className="flex items-end justify-between">
          <div>
            <h2>Applications</h2>
            <p className="mt-2 text-sm">Review candidate answers and AI assessment details.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4">
          {jobApplications.map((application) => (
            <JobApplicationCard
              key={application._id}
              fullName={application.fullName}
              _id={application._id}
              jobId={id}
            />
          ))}
          {jobApplications.length === 0 && (
            <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
              <h3>No applications yet</h3>
              <p className="mt-2 text-sm">Candidates will appear here after they submit the screening form.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminJobPage;
