import { Outlet } from "react-router-dom";
import Navbar from "../components/structure/Navbar";
import Footer from "../components/structure/Footer";

export default function DeafultLayout() {
  return (
    <div className="w-full h-screen relative flex flex-col bg-primary-50">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
