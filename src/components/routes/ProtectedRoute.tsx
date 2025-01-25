import { PropsWithChildren, useEffect, useState } from "react";
import useFirebase from "../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";
import { LoadingDots } from "../ui/LoadingDots";

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { auth } = useFirebase();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/", { replace: true });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, auth]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-primary-50">
        <LoadingDots color="text-primary-500" size="8" />
      </div>
    );
  }

  return children;
}
