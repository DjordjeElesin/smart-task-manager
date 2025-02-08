import { Briefcase } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { Project } from "../../../lib/types/Types";

export default function ActiveProjects({
  projectsData,
}: {
  projectsData: Project[] | null | undefined;
}) {
  return (
    <div className="bg-white rounded-xl  p-4 w-full text-neutral-700 flex flex-col gap-12 border-2 border-primary-100/70">
      <div className="flex items-center gap-4">
        <span className="rounded-full p-2 bg-primary-200 text-primary-700">
          <Briefcase size={20} />
        </span>
        <span className="text-md  font-semibold">Active Projects</span>
      </div>
      <div className="flex items-end w-full justify-between px-2">
        {projectsData ? (
          <span className="text-5xl font-bold ">
            {projectsData.length}{" "}
            <span className="text-sm font-normal text-neutral-500">
              projects
            </span>
          </span>
        ) : (
          <span></span>
        )}
        <Link to="/projects">
          <Button
            variant="link"
            className="underline text-sm py-1 px-2 text-primary-500/70"
          >
            See all
          </Button>
        </Link>
      </div>
    </div>
  );
}
