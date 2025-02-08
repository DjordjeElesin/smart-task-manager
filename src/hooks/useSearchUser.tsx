import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import useFirebase from "./useFirebase";
import { User } from "../lib/types/Types";

export default function useSearchUser(searchTerm: string) {
  const { firestoredb } = useFirebase();
  return useQuery({
    queryKey: ["searchUsers", searchTerm],
    queryFn: async () => {
      const usersRef = collection(firestoredb, "users");

      const emailQuery = query(
        usersRef,
        where("email", ">=", searchTerm),
        where("email", "<=", searchTerm + "\uf8ff")
      );

      const emailSnapshot = await getDocs(emailQuery);
      const mappedUsersData = emailSnapshot.docs.map((doc) => doc.data() as User);
      
      return mappedUsersData
    },
    enabled: !!searchTerm,
  });
}
