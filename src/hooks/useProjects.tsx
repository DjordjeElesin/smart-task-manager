import { collection, onSnapshot, query, where } from "firebase/firestore";
import useFirebase from "./useFirebase";
import { Project } from "../lib/types/Types";
import { useEffect, useState } from "react";

export default function useProjects(userId: string | undefined) {
  const { firestoredb } = useFirebase();
  const [projectsData, setProjectsData] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    if (!userId) {
      setProjectsData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const projectsRef = collection(firestoredb, "projects");
      const q = query(projectsRef, where(`members.${userId}`, "!=", null));
      
      const unsub = onSnapshot(q, 
        (querySnapshot) => {
          const newProjectsData = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as Project),
          }));
          setProjectsData(newProjectsData);
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        }
      );

      return () => unsub();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [userId, firestoredb]);

  return { data: projectsData, loading, error };
}