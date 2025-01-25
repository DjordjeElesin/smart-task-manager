import { Plus } from "@phosphor-icons/react";
import Button from "../components/ui/Button";
import useFirebase from "../hooks/useFirebase";
import useUserProjects from "../hooks/useUserProjects";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Modal from "../components/structure/Modal";
import CreateProjectModal from "../components/modals/CreateProjectModal";
import CreateTaskModal from "../components/modals/CreateTaskModal";
import { Link } from "react-router-dom";
import TaskPieChart from "../components/pageComponents/dashboard/TaskPieChart";


export default function Dashboard() {
  const { auth } = useFirebase();
  const { data: projectData } = auth.currentUser
    ? useUserProjects(auth.currentUser.uid)
    : { data: null };
  const [modalType, setModalType] = useState<string | null>(null);

  const handleModal = (type: string | null) => {
    setModalType(type);
  };

  return (
    <>
      <section className="flex gap-2 w-full p-4">
       <TaskPieChart/>

        <div className="flex flex-col gap-4 bg-white p-4 rounded-xl">
          <div className="flex items-center w-full justify-between ">
            <h1 className="text-xl text-neutral-700 font-semibold flex gap-2 items-center">
              Projects
            </h1>
            <Link to="/projects">
              <Button variant="link" className="underline" size="sm">
                See all
              </Button>
            </Link>
          </div>

          <div className="flex gap-2 w-full pt-3">
            {projectData &&
              projectData.map((project) => (
                <div key={project.projectId}>{project.title}</div>
              ))}
            <div
              className="h-52 w-[200px] rounded-lg bg-primary-100 text-primary-700 flex flex-col items-center justify-center hover:cursor-pointer"
              onClick={() => handleModal("project")}
            >
              <span>
                <Plus size={30} weight="bold" />
              </span>
              <span className="font-semibold">Create a new project</span>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {modalType && (
            <Modal toggleModal={() => handleModal(null)}>
              {modalType === "project" ? (
                <CreateProjectModal />
              ) : (
                <CreateTaskModal />
              )}
            </Modal>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
