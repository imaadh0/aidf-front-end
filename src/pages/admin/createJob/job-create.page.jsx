import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/lib/services/api/jobs";
import { Briefcase, FileQuestion, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminJobCreatePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    q1: "",
    q2: "",
    q3: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createJob({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        location: formData.location,
        questions: [formData.q1, formData.q2, formData.q3].filter(Boolean),
      });

      toast.success("Job posting created successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setFormData({
        title: "",
        description: "",
        type: "",
        location: "",
        q1: "",
        q2: "",
        q3: "",
      });
      
    } catch (error) {

      console.error("Error creating job:", error);
      toast.error("Error creating job posting. Please try again.", {
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

  return (
    <div className="py-8">
      <ToastContainer />
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Admin</p>
          <h2 className="mt-2">Create Job Posting</h2>
          <p className="mt-2 max-w-2xl text-sm">
            Publish a role with screening questions that give the AI enough context to evaluate applicants meaningfully.
          </p>
        </div>
      </div>

      <form className="grid gap-6 py-8 lg:grid-cols-[1fr_360px]" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <Briefcase size={18} />
              </span>
              <div>
                <h3>Role Details</h3>
                <p className="mt-1 text-sm">Use plain language candidates can scan quickly.</p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium">Job title</span>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="Senior Frontend Engineer" required />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Work type</span>
                <Input name="type" value={formData.type} onChange={handleChange} placeholder="Full-time" required />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Location</span>
                <Input name="location" value={formData.location} onChange={handleChange} placeholder="Remote, Colombo, Hybrid" required />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium">Description</span>
                <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the team, responsibilities, requirements, and hiring priorities." required />
              </label>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <FileQuestion size={18} />
              </span>
              <div>
                <h3>Screening Questions</h3>
                <p className="mt-1 text-sm">Ask for evidence, examples, and constraints so feedback is specific.</p>
              </div>
            </div>
            <div className="space-y-5">
              {["q1", "q2", "q3"].map((field, index) => (
                <label className="block space-y-2" key={field}>
                  <span className="text-sm font-medium">Question {index + 1}</span>
                  <Textarea
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder="Example: Tell us about a project where you solved a similar problem. What tradeoffs did you make?"
                    required
                  />
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <MapPin size={18} />
            </span>
            <div>
              <h3 className="text-lg">Publishing Checklist</h3>
              <p className="mt-1 text-sm">Before you submit</p>
            </div>
          </div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>Clear title, location, and work type</li>
            <li>Concrete responsibilities and hiring criteria</li>
            <li>Questions that request specific examples</li>
          </ul>
          <Button type="submit" className="mt-6 w-full">
            <Send size={16} />
            Publish Job
          </Button>
        </aside>
      </form>
    </div>
  );
}

export default AdminJobCreatePage;
