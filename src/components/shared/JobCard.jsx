import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";

function JobCard(props) {
  return (
    <Link to={props.isAdmin ? `/admin/job/${props._id}` : `job/${props._id}`} className="block">
      <Card className="group h-full transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
        <CardHeader>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-primary">
            <Briefcase size={14} />
            {props.type}
          </div>
          <CardTitle className="text-xl">{props.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            <span>{props.location}</span>
          </div>
        </CardContent>
        <CardFooter className="justify-between border-t border-border pt-4 text-sm">
          <span className="font-medium text-foreground">
            {props.isAdmin ? "Manage posting" : "View details"}
          </span>
          <div className="flex items-center gap-x-2 text-primary transition group-hover:translate-x-1">
            <ArrowRight size={16} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default JobCard;
