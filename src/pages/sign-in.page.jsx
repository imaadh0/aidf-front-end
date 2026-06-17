import { SignIn } from "@clerk/clerk-react";
import { BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";

function SignInPage() {
  return (
    <div className="grid min-h-screen gap-8 py-8 lg:grid-cols-[1fr_480px] lg:items-center">
      <section className="hidden rounded-lg border border-border bg-card p-10 lg:block">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BriefcaseBusiness size={20} />
          </span>
          <span className="text-2xl font-semibold text-underlay-1">HirelyAI</span>
        </Link>
        <h1 className="mt-12 max-w-lg">Return to your hiring workspace</h1>
        <p className="mt-4 max-w-md">
          Review roles, manage applications, and use AI feedback to make candidate screening more specific.
        </p>
      </section>
      <section className="flex items-center justify-center">
        <SignIn />
      </section>
    </div>
  );
}

export default SignInPage;
