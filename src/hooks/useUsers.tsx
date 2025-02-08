import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useQuery } from "react-query";
import useFirebase from "./useFirebase";
import { User } from "../lib/types/Types";

export default function useUsers(userIds: string[] | undefined) {
  const { firestoredb } = useFirebase();
  return useQuery({
    queryKey: ["user", userIds],
    queryFn: async () => {
      const usersRef = collection(firestoredb, "users");
      const q = query(usersRef, where("userId", "in", userIds));
      const usersSnapshop = await getDocs(q);
      return usersSnapshop.docs.map((doc) => ({ ...doc.data() as User}));
    },
    enabled: !!userIds && userIds.length > 0 && Array.isArray(userIds),
  });
}
