import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="hero mt-8 overflow-hidden rounded-lg border border-border">
      <div className="flex min-h-[420px] flex-col justify-end px-6 py-10 md:px-10 lg:px-14">
        <div className="max-w-3xl text-white">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-2 text-sm font-medium text-white backdrop-blur">
            <Sparkles size={16} />
            AI-assisted hiring for faster shortlists
          </div>
          <h1 className="max-w-2xl text-white">Find the right role with clearer signals</h1>
          <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">
            Browse open roles, answer focused screening questions, and help hiring teams understand your fit beyond a resume.
          </p>
          <Button className="mt-8 bg-white text-slate-950 hover:bg-white/90" asChild>
            <a href="#jobs">
              View open roles
              <ArrowRight size={18} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
