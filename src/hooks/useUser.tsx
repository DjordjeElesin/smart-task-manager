import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import useFirebase from "./useFirebase";

export default function useUser(userId: string) {
  const { firestoredb } = useFirebase();
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const docRef = doc(firestoredb, "users", userId);
      const userSnap = await getDoc(docRef);
      return userSnap.data();
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000, 
  });
}
