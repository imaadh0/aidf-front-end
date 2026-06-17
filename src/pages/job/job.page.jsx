import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Briefcase, CheckCircle2, MapPin, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "@/lib/config.js";

const getJob = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch job details");
  }

  const job = await res.json();
  return job;
};

const createJob = async (jobApplication, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobApplications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobApplication),
    });

    if (!response.ok) {
      throw new Error("Failed to create job application");
    }

    toast.success("Job application submitted successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    toast.error("Error submitting job application. Please try again.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

function JobPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();

  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const data = await getJob(params.id, token);
        setJob(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch job details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      fetchJob();
    }
  }, [params.id, isLoaded, getToken]);

  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const token = await getToken();
      await createJob(
        {
          fullName: formData.fullName,
          answers: [formData.a1, formData.a2, formData.a3],
          job: params.id,
          userId: user.id,
        },
        token
      );
      setFormData({
        fullName: "",
        a1: "",
        a2: "",
        a3: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return <div className="py-8"><div className="skeleton h-32" /></div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  if (loading) {
    return <div className="py-8"><div className="skeleton h-32" /></div>;
  }

  if (error) {
    return <div className="mt-8 rounded-lg border border-destructive/20 bg-destructive/5 p-5 text-destructive">{error}</div>;
  }

  return (
    <div className="py-8">
      <section className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm font-semibold uppercase text-primary">Application</p>
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
        <div className="mt-6 rounded-lg bg-muted p-4">
        <p>{job?.description}</p>
      </div>
      </section>

      <Separator />

      <form className="grid gap-6 py-8 lg:grid-cols-[1fr_320px]" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <section className="rounded-lg border border-border bg-card p-6">
            <h3>Your Details</h3>
            <p className="mt-1 text-sm">Use the same name your recruiter or hiring manager will recognize.</p>
            <div className="mt-5 flex flex-col gap-y-3">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            required
            value={formData.fullName}
            onChange={(event) =>
              setFormData({ ...formData, fullName: event.target.value })
            }
          />
            </div>
          </section>

          {(job?.questions || []).map((question, index) => (
            <section className="rounded-lg border border-border bg-card p-6" key={question || index}>
              <div className="mb-4 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-semibold text-secondary-foreground">
                  {index + 1}
                </span>
                <div>
                  <Label htmlFor={`a${index + 1}`} className="text-base">
                    {question}
                  </Label>
                  <p className="mt-1 text-sm">Give a specific example, outcome, and your role in the work.</p>
                </div>
              </div>
              <Textarea
                id={`a${index + 1}`}
                required
                value={formData[`a${index + 1}`]}
                onChange={(event) =>
                  setFormData({ ...formData, [`a${index + 1}`]: event.target.value })
                }
              />
            </section>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <h3 className="text-lg">Before submitting</h3>
              <p className="mt-1 text-sm">Strong answers are concrete.</p>
            </div>
          </div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>Mention tools, scope, and impact when relevant.</li>
            <li>Explain tradeoffs and decisions you made.</li>
            <li>Keep each answer focused and evidence-based.</li>
          </ul>
          <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
            <Send size={16} />
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
          <Button
            type="button"
            onClick={() =>
              setFormData({
                fullName: "",
                a1: "",
                a2: "",
                a3: "",
              })
            }
            className="mt-3 w-full"
            variant="outline"
          >
            Clear
          </Button>
        </aside>
      </form>
      <ToastContainer />
    </div>
  );
}

export default JobPage;
