import { Link, useLocation, useNavigate } from "react-router-dom";
import { mergeClassNames } from "../../lib/utils/StyleHelper";
import { motion } from "motion/react";
import { IconProps, SignOut } from "@phosphor-icons/react";
import useFirebase from "../../hooks/useFirebase";
import useUsers from "../../hooks/useUsers";
import { signOut } from "firebase/auth";

type NavbarItemType = {
  name: string;
  path: string;
  icon: React.FC<IconProps>;
};

export default function DashboardSidebar({
  navItems,
}: {
  navItems: NavbarItemType[];
}) {
  const { auth } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => path === location.pathname;

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed flex flex-col bg-white p-4  h-screen shadow-[10px_0_10px_-5px_rgba(0,0,0,0.05)] rounded-tr-xl rounded-br-xl">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 py-6 justify-center md:justify-start"
      >
        <img
          src="/logos/logoCircle.svg"
          className="h-14 w-14 md:h-12 md:w-12"
        />
        <span className="hidden md:inline font-semibold">SmartTask</span>
      </Link>
      <div className="flex-1 flex flex-col pt-6 border-t border-b border-neutral-200/50">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={mergeClassNames(
                "flex items-center justify-center md:justify-start gap-3 text-neutral-800 text-nowrap cursor-pointer  px-3 py-3 rounded-xl transition-colors",
                "hover:bg-primary-50",
                isActive(item.path) &&
                  "text-primary-700 bg-primary-100 hover:bg-primary-100"
              )}
            >
              <span>
                <Icon size={25} />
              </span>
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="pt-11 pb-5">
        <div
          className="flex items-center gap-2 transition-colors px-3 py-3 rounded-xl hover:bg-primary-50 cursor-pointer"
          onClick={handleLogOut}
        >
          <SignOut size={25} />
          <span className="text-sm hidden md:inline">Sign Out</span>
        </div>
      </div>
    </nav>
  );
}

{
  /* <nav className="z-50 pt-4">
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
                  layoutId="active-nav-item"
                  className="absolute inset-0 w-full bg-primary-50 rounded-full -z-10"
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
            src={user?.photoURL}
            alt="user account"
            className="rounded-full object-cover"
          />
        </Link>
      </div>
    </nav> */
}
