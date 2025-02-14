import { useQuery } from 'react-query'
import useFirebase from './useFirebase'
import { doc, getDoc } from 'firebase/firestore'
import { Project } from '../lib/types/Types'

export default function useSingleProject(projectId: string | undefined) {
  const {firestoredb} = useFirebase()
  return useQuery({
    queryKey: ["singleProject", projectId],    
    queryFn: async () => {
      if(projectId) {
        const docRef = doc(firestoredb, "projects", projectId)
        const projectDoc = await getDoc(docRef);
        if(projectDoc.exists()){
          return projectDoc.data() as Project
        }else{
          throw new Error("Project not found")
        }
      }
    },
    enabled: !!projectId
  })
}
