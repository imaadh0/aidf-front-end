import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, Plus } from "lucide-react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminMainLayout() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      return navigate("/sign-in");
    }

    if (user?.publicMetadata?.role !== "admin") {
      return navigate("/");
    }
  }, [isLoaded, isSignedIn, navigate, user]);

  return (
    <div className="pb-12">
      <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
        <Link to="/admin/jobs" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BriefcaseBusiness size={20} />
          </span>
          <span>
            <span className="block text-lg font-semibold">HirelyAI Admin</span>
            <span className="text-xs text-muted-foreground">Recruiting workspace</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/admin/jobs">Jobs</Link>
          </Button>
        <Button asChild>
            <Link to="/admin/job/create">
              <Plus size={16} />
              Post Job
            </Link>
        </Button>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default AdminMainLayout;
