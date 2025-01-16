import {
  BookOpenUser,
  CurrencyDollarSimple,
  House,
} from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/structure/Navbar";

const navItems = [
  { name: "Home", url: "/", icon: <House size={20} /> },
  { name: "Pricing", url: "/pricing", icon: <CurrencyDollarSimple size={20} /> },
  { name: "About Us", url: "/about", icon: <BookOpenUser size={20} /> },
];

export default function DeafultLayout() {
  return (
    <div className="w-full h-screen relative flex flex-col">
      <Navbar items={navItems}/>
      <Outlet />
    </div>
  );
}
