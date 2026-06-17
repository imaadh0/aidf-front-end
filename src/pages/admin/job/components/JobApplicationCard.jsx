import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

function JobApplicationCard({ _id, jobId, fullName }) {
  return (
    <Link to={`/admin/job/${jobId}/application/${_id}`} className="block">
      <Card className="transition hover:border-primary/40 hover:shadow-md">
        <CardHeader className="flex-row items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
              <UserRound size={18} />
            </span>
            <CardTitle className="truncate text-lg">{fullName}</CardTitle>
          </div>
          <Button variant="outline" size="sm">
            View
            <ArrowRight size={14} />
          </Button>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default JobApplicationCard;
