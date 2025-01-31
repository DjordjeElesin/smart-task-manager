//hooks
import useFirebase from "../hooks/useFirebase";
import useProjects from "../hooks/useProjects";
import { useState } from "react";
//components
import CreateProjectModal from "../components/modals/CreateProjectModal";
import CreateTaskModal from "../components/modals/CreateTaskModal";
import Modal from "../components/structure/Modal";
import ActiveProjects from "../components/pageComponents/dashboard/ActiveProjects";
import RecentProjects from "../components/pageComponents/dashboard/RecentProjects";
import TaskPieChart from "../components/pageComponents/dashboard/TaskPieChart";
import TasksToComplete from "../components/pageComponents/dashboard/TasksToComplete";
import { AnimatePresence } from "motion/react";
import useUserTasks from "../hooks/useUserTasks";

export default function Dashboard() {
  const { auth } = useFirebase();
  //data
  const { data: projectsData } = auth.currentUser
    ? useProjects(auth.currentUser.uid)
    : { data: null };
  const { data: tasksData } = auth.currentUser
    ? useUserTasks(auth.currentUser.uid)
    : { data: null };
  //state
  const [modalType, setModalType] = useState<string | null>(null);

  const handleModal = (type: string | null) => {
    setModalType(type);
  };

  return (
    <section className="flex flex-col gap-4 ">
      <section className="grid grid-cols-2 grid-rows-2 gap-2 w-full">
        <TaskPieChart />
        <ActiveProjects projectsData={projectsData} />
        <TasksToComplete tasks={tasksData} />
      </section>
      <section>
        <RecentProjects projectsData={projectsData} handleModal={handleModal} />
      </section>
      <AnimatePresence>
        {modalType && (
          <Modal toggleModal={() => handleModal(null)}>
            {modalType === "project" ? (
              <CreateProjectModal toggleModal={() => handleModal(null)}/>
            ) : (
              <CreateTaskModal />
            )}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
