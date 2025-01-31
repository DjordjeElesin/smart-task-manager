import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import useFirebase from "./useFirebase";
import { Project } from "../lib/types/Types";

export default function useProjects(userId: string) {
  const { firestoredb } = useFirebase();
  return useQuery<Project[]>({
    queryKey: ["userProjects", userId],
    queryFn: async () => {
      const projectsRef = collection(firestoredb, "projects");

      const q = query(projectsRef, where(`members.${userId}`, "!=", null));
      const querySnapshop = await getDocs(q);
      return querySnapshop.docs.map(doc => ({
        ...doc.data() as Project,
        id: doc.id
      }));
    },
    enabled: !!userId,
  });
}
