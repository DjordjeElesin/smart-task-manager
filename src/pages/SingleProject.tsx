import { useParams } from "react-router-dom";
import useSingleProject from "../hooks/useSingleProject";
import useProjectTasks from "../hooks/useProjectTasks";
import Members from "../components/ui/Members";
import { doc, setDoc } from "firebase/firestore";
import useFirebase from "../hooks/useFirebase";
import { useState, useEffect } from "react";
import { Project } from "../lib/types/Types";
import { LoadingDots } from "../components/ui/LoadingDots";
import TaskCard from "../components/ui/TaskCard";

export default function SingleProject() {
  const { firestoredb } = useFirebase();
  const { projectId } = useParams();
  const { data: projectData, isLoading: isProjectLoading } = useSingleProject(
    projectId || undefined
  );
  const { data: tasksData } = useProjectTasks(projectId || undefined);
  const [localeMembers, setLocaleMembers] = useState<string[]>([]);

  useEffect(() => {
    if (projectData) {
      setLocaleMembers(Object.keys(projectData.members));
    }
  }, [projectData]);

  const onMembersChange = async (userId: string) => {
    if (!projectData?.projectId) {
      return;
    }
    const docRef = doc(firestoredb, "projects", projectData?.projectId);
    try {
      if (projectData.members.hasOwnProperty(userId)) {
        const updatedMembers = { ...projectData.members };
        delete updatedMembers[userId];
        await setDoc(docRef, {
          ...projectData,
          members: updatedMembers,
        });
        setLocaleMembers((prev) => prev.filter((id) => id !== userId));
      } else {
        await setDoc(docRef, {
          ...projectData,
          members: { ...projectData.members, [userId]: true },
        });
        setLocaleMembers((prev) => [...prev, userId]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const statuses = ["To do", "In Progress", "Done"];

  return (
    <section className="flex flex-col gap-4 pt-6 w-full">
      {isProjectLoading ? (
        <div className="flex w-full justify-center items-center h-[400px]">
          <LoadingDots color="text-primary-500" size="8" />
        </div>
      ) : (
        <ProjectHeader projectData={projectData} />
      )}
      <section className="w-full flex gap-6">
        {statuses.map((status) => (
          <div
            className="flex flex-col gap-3 px-4 py-6 rounded-xl shadow-lg bg-primary-500 w-full"
            key={status}
          >
            <h2 className="text-neutral-700 text-sm font-semibold">{status}</h2>
            <div className="flex flex-col gap-2">
              {tasksData
                ?.filter((task) => {
                  return task.status === status;
                })
                .map((task) => (
                  <TaskCard task={task} />
                ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  );

  function ProjectHeader({
    projectData,
  }: {
    projectData: Project | undefined;
  }) {
    return (
      <section
        className="rounded-xl px-4 pt-4 pb-7  text-white flex items-start justify-between"
        style={{ background: projectData?.gradient }}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">{projectData?.title}</h2>
          <p>{projectData?.description}</p>
        </div>
        {projectData && (
          <Members
            members={localeMembers}
            onMembersChange={onMembersChange}
            modalLeft
          />
        )}
      </section>
    );
  }
}
