import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/structure/DashboardNavbar";
import { CheckSquareOffset, House, Suitcase } from "@phosphor-icons/react";
import Footer from "../components/structure/Footer";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: House },
  { name: "Projects", path: "/projects", icon: Suitcase },
  { name: "Tasks", path: "/tasks", icon: CheckSquareOffset },
];

export default function DashboardLayout() {
  return (
    <div className="w-full h-screen relative flex flex-col bg-primary-50 pt-20">
      <DashboardNavbar navItems={navItems} />
      <main className="p-8 pb-28 bg-primary-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
