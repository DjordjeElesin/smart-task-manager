import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import useFirebase from "./useFirebase";
import { Priority, Task } from "../lib/types/Types";

export default function useTasks(userId: string | undefined, priority?: Priority) {
  const { firestoredb } = useFirebase();
  return useQuery({
    queryKey: ["user-tasks", userId, priority],
    queryFn: async () => {
      const tasksRef = collection(firestoredb, "tasks");

      let q = query(tasksRef, where(`assignedTo.${userId}`, "!=", null));
      if (priority) {
        q = query(q, where("priority", "==", priority));
      }
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Task),
      }));
    },
    enabled: !!userId,
  });
}
