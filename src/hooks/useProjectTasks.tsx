import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import useFirebase from "./useFirebase";
import { Task } from "../lib/types/Types";

export default function useProjectTasks(projectId: string | undefined) {
  const { firestoredb } = useFirebase();
  return useQuery({
    queryKey: ["projectTasks", projectId],
    queryFn: async () => {
      const tasksCollection = collection(firestoredb, "tasks");
      const q = query(tasksCollection, where("projectId", "==", projectId));
      const tasksSnapshot = await getDocs(q);

      return tasksSnapshot.docs.map((doc) => ({
        ...(doc.data() as Task),
      }));
    },
    enabled: !!projectId,
  });
}
