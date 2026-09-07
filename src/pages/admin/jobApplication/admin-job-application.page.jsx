import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateJobApplicationFeedback, getJobApplicationById } from "@/lib/services/api/jobApplications";
import { cn } from "@/lib/utils";
import { ArrowLeft, BarChart3, CheckCircle2, Lightbulb, MessageSquareText, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ratingClassName = (rating) =>
  cn("rounded-md px-3 py-1 text-xs font-semibold", {
    "bg-emerald-100 text-emerald-800": ["excellent", "good", "strong"].includes(rating?.toLowerCase()),
    "bg-amber-100 text-amber-800": ["average", "moderate", "adequate", "below average"].includes(rating?.toLowerCase()),
    "bg-red-100 text-red-800": ["poor", "bad", "weak"].includes(rating?.toLowerCase()),
    "bg-muted text-muted-foreground": !rating,
  });

function AdminJobApplicationPage() {
  const [jobApplication, setJobApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { applicationId } = useParams();

  const loadApplication = useCallback(() => {
    if (!applicationId) return;
    setIsLoading(true);
    setError("");
    getJobApplicationById(applicationId)
      .then((data) => {
        setJobApplication(data);
      })
      .catch((err) => {
        console.log(err);
        setJobApplication(null);
        setError("We could not load this application. It may have been deleted, or your admin session may have expired.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [applicationId]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  const handleGenerateFeedback = async () => {
    if (!applicationId) return;
    setIsGenerating(true);
    setError("");
    try {
      const updatedApplication = await generateJobApplicationFeedback(applicationId);
      setJobApplication(updatedApplication);
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : "AI feedback could not be generated.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="skeleton h-40" />
      </div>
    );
  }

  if (error && !jobApplication) {
    return (
      <div className="py-8">
        <Card className="border-destructive/30">
          <CardContent className="p-6">
            <h2 className="text-xl">Application unavailable</h2>
            <p className="mt-2 text-sm">{error}</p>
            <div className="mt-5 flex gap-3">
              <Button onClick={loadApplication}>Retry</Button>
              <Button variant="outline" asChild>
                <Link to="/admin/jobs">Back to jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!jobApplication) {
    return (
      <div className="py-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl">Application not found</h2>
            <p className="mt-2 text-sm">This application could not be loaded.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const feedback = jobApplication?.aiFeedback;
  const answers = Array.isArray(jobApplication.answers) ? jobApplication.answers : [];

  return (
    <div className="py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to={`/admin/job/${jobApplication?.job?._id || ""}`}>
            <ArrowLeft size={16} />
            Back to applications
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Candidate Review</p>
            <CardTitle className="mt-2">{jobApplication?.fullName}</CardTitle>
            <p className="mt-2 text-sm">{jobApplication?.job?.title}</p>
          </div>
        </CardHeader>
        {feedback && (
          <CardContent className="grid gap-4 border-t border-border pt-6 md:grid-cols-[180px_1fr]">
            <div className="rounded-lg bg-primary p-5 text-primary-foreground">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BarChart3 size={16} />
                AI Score
              </div>
              <div className="mt-3 text-4xl font-semibold">{feedback.score}/10</div>
            </div>
            <div className="rounded-lg bg-muted p-5">
              <div className="flex items-center gap-2 font-semibold">
                <MessageSquareText size={17} />
                Summary
              </div>
              <p className="mt-3 text-sm">{feedback.summary}</p>
            </div>
          </CardContent>
        )}
      </Card>

      {feedback ? (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 size={18} />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {(feedback.strengths || []).map((strength, index) => (
                  <li className="rounded-md bg-muted p-3" key={index}>{strength}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="mt-6 border-dashed">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
            <Lightbulb className="mt-1 text-primary" size={18} />
            <p className="text-sm">
                Detailed AI feedback is not available yet. Generate it now to get a score, summary, strengths, and per-answer notes.
            </p>
            </div>
            <Button onClick={handleGenerateFeedback} disabled={isGenerating}>
              <RefreshCw className={cn("h-4 w-4", { "animate-spin": isGenerating })} />
              {isGenerating ? "Generating..." : "Generate AI Feedback"}
            </Button>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="mt-6 border-destructive/30">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Application Responses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {answers.map((answer, i) => {
            const answerFeedback = feedback?.answerFeedback?.find((item) => item.questionIndex === i);
            return (
              <div key={i} className="rounded-lg border border-border p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h4 className="font-semibold">Question {i + 1}</h4>
                    <p className="mt-1 text-sm">
                      {jobApplication.job?.questions?.[i] || `Question ${i + 1}`}
                    </p>
                  </div>
                  {answerFeedback && (
                    <Badge className={ratingClassName(answerFeedback.rating)}>
                      {answerFeedback.rating}
                    </Badge>
                  )}
                </div>
                <div className="mt-4 rounded-md bg-muted p-4">
                  <p className="text-sm text-foreground">{answer}</p>
                </div>
                {answerFeedback && (
                  <div className="mt-4 rounded-md bg-secondary p-4">
                    <p className="text-sm text-secondary-foreground">{answerFeedback.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminJobApplicationPage;
