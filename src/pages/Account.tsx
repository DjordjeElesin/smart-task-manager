import { useNavigate, useParams } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { signOut } from "firebase/auth";
import Button from "../components/ui/Button";
import { CheckCircle } from "@phosphor-icons/react";
import useFirebase from "../hooks/useFirebase";

export default function Account() {
  const { auth } = useFirebase();
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    data: userData,
    isLoading,
    error,
  } = userId ? useUsers([userId]) : { data: null, isLoading: false, error: null };

  const [user] = userData || [];

  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  if (!userData) return <div>

  </div>;

 

  return (
    <div>
      <h1>Account: {user.name}</h1>
      <div className="flex items-center gap-4">
        <span>Email:</span>
        {auth?.currentUser?.emailVerified ? (
          <span className="text-blue-500 p-1 bg-blue-200 rounded-lg">
            <CheckCircle size={20} />

          </span>
        ) : (
          <span >
            Not verified
          </span>
        )}
        <span>{user.email}</span>
      </div>

      <img src={user.photoURL} alt="Profile" />
    </div>
  );
}
