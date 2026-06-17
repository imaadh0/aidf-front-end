import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

function RouteError() {
  const error = useRouteError();
  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong while loading this page.";

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <Card className="max-w-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <AlertTriangle size={22} />
            </span>
            <div>
              <h1 className="text-2xl font-semibold">This page hit a problem</h1>
              <p className="mt-3 text-sm">{message}</p>
              <Button className="mt-6" asChild>
                <Link to="/">
                  <Home size={16} />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RouteError;
