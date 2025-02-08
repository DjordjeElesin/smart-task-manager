import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/structure/DashboardSidebar";
import { CheckSquareOffset, House, Suitcase } from "@phosphor-icons/react";
import Footer from "../components/structure/Footer";
import DashboardNavbar from "../components/structure/DashboardNavbar";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: House },
  { name: "Projects", path: "/projects", icon: Suitcase },
  { name: "Tasks", path: "/tasks", icon: CheckSquareOffset },
];

export default function DashboardLayout() {
  return (
    <div className="w-full min-h-screen relative flex bg-primary-50">
      <DashboardSidebar navItems={navItems} />
      <article className="flex flex-col w-full pl-24 md:pl-52 bg-primary-50">
        <main className="p-8 pt-3 pb-28 bg-primary-50 flex flex-col relative">
          <DashboardNavbar />
          <Outlet />
        </main>
        <Footer />
      </article>
    </div>
  );
}
