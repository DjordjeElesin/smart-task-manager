import { Link, useLocation } from "react-router-dom";
import { mergeClassNames } from "../../lib/utils/StyleHelper";
import { motion } from "motion/react";
import { IconProps } from "@phosphor-icons/react";
import useFirebase from "../../hooks/useFirebase";
import useUser from "../../hooks/useUser";

type NavbarItemType = {
  name: string;
  path: string;
  icon: React.FC<IconProps>;
};

export default function DashboardNavbar({
  navItems,
}: {
  navItems: NavbarItemType[];
}) {
  const { auth } = useFirebase();
  const { data: userData } = auth?.currentUser
    ? useUser(auth.currentUser.uid)
    : { data: null };
  const location = useLocation();
  const isActive = (path: string) => path === location.pathname;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-4">
      <div className="flex items-center gap-3 bg-white border-2 border-neutral-100/80 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        <Link to="/dashboard" className="h-9 md:h-10 w-9 md:w-10 md:mr-5">
          <img src="/logos/logoCircle.svg" className="h-full w-full" />
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={mergeClassNames(
                "relative flex items-center gap-3 text-neutral-900 text-nowrap cursor-pointer text-md  font-semibold px-6 py-2 rounded-full transition-colors",
                "hover:bg-primary-100",
                isActive(item.path) && "text-primary-600"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={25} />
              </span>
              {isActive(item.path) && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full  rounded-full -z-10"
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
            </Link>
          );
        })}
        <Link
          to={`/account/${auth?.currentUser?.uid}`}
          className="h-9 md:h-10 w-9 md:w-10 md:ml-5 overflow-hidden"
        >
          <img
            src={userData?.photoURL}
            alt="user account"
            className="rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
