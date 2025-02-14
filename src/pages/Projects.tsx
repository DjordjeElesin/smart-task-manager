import ProjectCard from "../components/structure/ProjectCard";
import useFirebase from "../hooks/useFirebase";
import useProjects from "../hooks/useProjects";

export default function Projects() {
  const { auth } = useFirebase();
  const userId = auth?.currentUser?.uid || undefined;
  const { data: projectsData } = useProjects(userId);

  return (
    <section className="p-6 text-neutral-700 flex flex-col rounded-xl bg-white mt-5">
      <h1 className="text-xl font-bold">My Projects</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 w-full px-4 py-6 rounded-xl">
        {projectsData?.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </section>
  );
}
