import { signOut } from "firebase/auth";
import Button from "../components/ui/Button";
import useFirebase from "../hooks/useFirebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { auth } = useFirebase();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (error) {}
  };

  const isEmailVerified = auth?.currentUser?.emailVerified

  return (
    <div>
      <Button onClick={handleLogOut}>Log out</Button>
      <p>Your email {isEmailVerified ? "is verified" : "has not been verified"}</p>
    </div>
  );
}
