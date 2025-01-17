import { Link, NavLink, useLocation } from "react-router-dom";
import { mergeClassNames } from "../../utils/StyleHelper";
import { motion } from "motion/react";
import Button from "../ui/Button";

type NavbarItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

type NavbarProps = {
  items: NavbarItem[];

  className?: string;
};

export default function Navbar({ items, className }: NavbarProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={mergeClassNames(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          return (
            <NavLink
              key={item.name}
              to={item.url}
              className={mergeClassNames(
                "relative flex items-center gap-3 text-nowrap cursor-pointer text-md  font-semibold px-6 py-2 rounded-full transition-colors",
                "hover:bg-neutral-100",
                isActive(item.url) && "text-primary-800 hover:bg-primary-200/50"
              )}
            >
              <span className="hidden md:inline text-neutral-700">{item.name}</span>
              <span className="md:hidden">{item.icon}</span>
              {isActive(item.url) && (
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
                    <div className="absolute w-12 h-6 bg-primary-200 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary-200 rounded-full blur-md -top-1" />
                  </div>
                </motion.div>
              )}
            </NavLink>
          );
        })}
        <Link to="/login" className="ml-10">
          <Button className="h-9 md:h-10 text-sm">Sign In/Up</Button>
        </Link>
      </div>
    </div>
  );
}

