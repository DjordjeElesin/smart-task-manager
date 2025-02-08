import { Plus } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { Project } from "../../../lib/types/Types";
import ProjectCard from "../../structure/ProjectCard";
import { Clock } from "@phosphor-icons/react/dist/ssr";

export default function RecentProjects({
  projectsData,
  handleModal,
}: {
  projectsData: Project[] | null | undefined;
  handleModal: (event: any) => void;
}) {
  const sortedProjectsByTimestamp = projectsData?.sort((a, b) => {
    return b.lastModified.toMillis() - a.lastModified.toMillis();
  });

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border-2 border-primary-100/70">
      <div className="flex items-center w-full justify-between ">
        <div className=" text-neutral-700 flex gap-2 items-center">
          <Clock size={25} weight="bold" />
          <h1 className="text-xl font-semibold ">Recent Projects</h1>
        </div>
        <Link to="/projects">
          <Button
            variant="link"
            className="underline text-primary-500/70"
            size="sm"
          >
            See all
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 w-full px-4 py-6 rounded-xl">
        {sortedProjectsByTimestamp ? (
          sortedProjectsByTimestamp
            .slice(0, 3)
            .map((project) => (
              <ProjectCard project={project} key={project.title} />
            ))
        ) : (
          <div className="h-72 rounded-lg bg-primary-100 text-primary-700 "></div>
        )}
        <div
          className="h-72 rounded-lg bg-primary-50 text-primary-700 flex flex-col gap-2 items-center justify-center hover:cursor-pointer border-2 border-primary-200/70"
          onClick={() => handleModal("project")}
        >
          <span>
            <Plus size={30} weight="bold" />
          </span>
          <span className="font-semibold">Create a new project</span>
        </div>
      </div>
    </div>
  );
}
