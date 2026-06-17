import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { BriefcaseBusiness } from "lucide-react";

function Navigation() {
  return (
    <nav className="sticky top-0 z-20 -mx-4 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
      <Link to={"/"} className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <BriefcaseBusiness size={20} />
        </span>
        <span className="text-2xl font-semibold text-underlay-1">
          HirelyAI
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <Link className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline" to={"/"}>
          Jobs
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to={"/sign-in"}>Sign In</Link>
            </Button>
            <Button asChild>
              <Link to={"/sign-up"}>Sign Up</Link>
            </Button>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navigation;
