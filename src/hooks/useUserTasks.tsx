import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import useFirebase from "./useFirebase";
import { Task } from "../lib/types/Types";

export default function useUserTasks(userId: string) {
  const { firestoredb } = useFirebase();
  return useQuery({
    queryKey: ["user-tasks", userId],
    queryFn: async () => {
      const tasksRef = collection(firestoredb, "tasks");

      const q = query(tasksRef, where("assignedTo", "array-contains", userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Task),
      }));
    },
    enabled: !!userId,
  });
}
