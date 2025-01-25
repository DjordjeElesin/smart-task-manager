import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import useFirebase from "./useFirebase";
import { Project } from "../lib/types/Types";

export default function useUserProjects(userId: string) {
  const { firestoredb } = useFirebase();
  return useQuery<Project[]>({
    queryKey: ["userProjects", userId],
    queryFn: async () => {
      const projectRef = collection(firestoredb, "projects");

      const q = query(projectRef, where(`members.${userId}`, "!=", null));
      const querySnapshop = await getDocs(q);
      return querySnapshop.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Project
      }));
    },
    enabled: !!userId,
  });
}
