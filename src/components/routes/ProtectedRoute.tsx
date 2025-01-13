import { PropsWithChildren, useEffect } from "react";
import useFirebase from "../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { auth } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/", { replace: true });
    }
  }, [navigate, auth.currentUser]);
  return children;
}
