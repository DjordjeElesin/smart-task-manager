import {
  CheckSquareOffset,
  House,
  IconProps,
  Suitcase,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import useUsers from "../../hooks/useUsers";

type IconComponent = React.FC<IconProps>;

export default function DashboardNavbar() {
  const location = useLocation();
  const { auth } = useFirebase();
  const userIds = auth?.currentUser?.uid ? [auth.currentUser.uid] : [];
  const { data: userData, isLoading } = useUsers(userIds);
  const user = userData ? userData[0] : null;

  const getIcon = (path: string): IconComponent | undefined => {
    switch (path) {
      case "/dashboard":
        return House;
      case "/projects":
        return Suitcase;
      case "/tasks":
        return CheckSquareOffset;
      default:
        return undefined;
    }
  };

  const getTitleByPath = (path: string) => {
    const mainSegment = path.split("/")[1];
    return mainSegment[0].toUpperCase() + mainSegment.slice(1);
  };

  const Icon = getIcon(location.pathname);

  return (
    <header className="sticky mt-3 top-2 z-10 w-full rounded-full flex items-center shadow-xl gap-6 py-3 px-6 bg-primary-500 text-white">
      {Icon && <Icon size={30} />}
      <span className="font-semibold flex-1">
        {getTitleByPath(location.pathname)}
      </span>
      <Link
        to={`/account/${user?.userId}`}
        className="overflow-hidden flex gap-2 items-center cursor-pointer rounded-xl "
      >
        <img
          src={isLoading ? "/empty-profile.png" : user?.photoURL}
          alt="user account"
          className="rounded-full object-cover h-7 w-7"
        />
        <span className="hidden md:inline text-sm">{user?.name}</span>
      </Link>
    </header>
  );
}
