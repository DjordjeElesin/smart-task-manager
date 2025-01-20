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

  const isEmailVerified = auth?.currentUser?.emailVerified;
  console.log(auth?.currentUser);

  return (
    <div>
      <Button onClick={handleLogOut}>Log out</Button>
      <p>
        Your email {isEmailVerified ? "is verified" : "has not been verified"}
      </p>
      {auth?.currentUser && (
        <img
          src={
            auth.currentUser.photoURL ||
            "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
          }
          alt="Profile Picture"
        />
      )}
    </div>
  );
}
