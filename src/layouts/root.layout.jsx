import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main className="container min-h-screen">
      <Outlet />
    </main>
  );
}

export default RootLayout;
