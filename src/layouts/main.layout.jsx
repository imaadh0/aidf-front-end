import Navigation from "@/components/shared/Navigation";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="pb-16">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default MainLayout;
