import { Link } from "react-router-dom";
import { mergeClassNames } from "../../lib/utils/StyleHelper";
import { motion } from "motion/react";
import Button from "../ui/Button";
import {
  BookOpenUser,
  CurrencyDollarSimple,
  House,
  IconProps,
  User,
} from "@phosphor-icons/react";
import { useScrollSpy } from "../../hooks/useScrollSpy";

type NavbarItemType = {
  name: string;
  id: string;
  icon: React.FC<IconProps>;
};

const navItems: NavbarItemType[] = [
  { name: "Home", id: "home", icon: House },
  { name: "Features", id: "features", icon: BookOpenUser },
  { name: "About", id: "about", icon: User },
  { name: "Pricing", id: "pricing", icon: CurrencyDollarSimple },
];

export default function Navbar() {
  const { activeId, scrollToElement } = useScrollSpy(
    navItems.map((item) => item.id)
  );

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-4">
      <div className="flex items-center gap-3 bg-primary-50 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        <Link to="/" className="h-9 md:h-10 w-9 md:w-10 md:mr-5">
          <img src="logos/logoCircle.svg" className="h-full w-full" />
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              onClick={() => scrollToElement(item.id)}
              className={mergeClassNames(
                "relative flex items-center gap-3 text-neutral-900 text-nowrap cursor-pointer text-md  font-semibold px-6 py-2 rounded-full transition-colors",
                "hover:bg-primary-100",
                activeId === item.id && "text-primary-600" 
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={25} />
              </span>
              {activeId === item.id && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary-50 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-t-full">
                    <div className="absolute z-10 w-8 h-6 bg-primary-200 rounded-full blur-md -top-1" />
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
        <Link to="/login" className="ml-10 md:ml-28">
          <Button className="h-9 md:h-10 text-sm">Sign In</Button>
        </Link>
      </div>
    </div>
  );
}
