//hooks
import useFirebase from "../hooks/useFirebase";
import useProjects from "../hooks/useProjects";
import { useState } from "react";
import useTasks from "../hooks/useTasks";
//components
import CreateProjectModal from "../components/modals/CreateProjectModal";
import Modal from "../components/structure/Modal";
import ActiveProjects from "../components/pageComponents/dashboard/ActiveProjects";
import RecentProjects from "../components/pageComponents/dashboard/RecentProjects";
import TaskPieChart from "../components/pageComponents/dashboard/TaskPieChart";
import TasksToComplete from "../components/pageComponents/dashboard/TasksToComplete";
import PriorityTasks from "../components/pageComponents/dashboard/PriorityTasks";
import { AnimatePresence } from "motion/react";

export default function Dashboard() {
  const { auth } = useFirebase();
  const userId = auth.currentUser?.uid;
  //data
  const { data: projectsData } = useProjects(userId);
  const { data: tasksData } = useTasks(userId);
  //state
  const [modal, setModal] = useState<string | null>(null);

  const handleModal = (type: string | null) => {
    setModal(type);
  };

  return (
    <section className="flex flex-col gap-4 pt-5">
      <section className="grid grid-cols-2 grid-rows-2 gap-2 w-full">
        <TaskPieChart />
        <ActiveProjects projectsData={projectsData} />
        <TasksToComplete tasks={tasksData} />
      </section>
      <section>
        <RecentProjects projectsData={projectsData} handleModal={handleModal} />
      </section>
      <section>
        <PriorityTasks />
      </section>
      <AnimatePresence>
        {modal && (
          <Modal toggleModal={() => handleModal(null)}>
            {modal && <CreateProjectModal toggleModal={handleModal} />}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
