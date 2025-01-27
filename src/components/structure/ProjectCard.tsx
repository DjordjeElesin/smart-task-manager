import { Project } from "../../lib/types/Types";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }: { project: Project }) {
  const bgGradient = { background: project.gradient };

  function formatTimestamp(timestamp: Timestamp) {
    const date = timestamp.toDate();
    return format(date, "MMM dd");
  }
  console.log(project);

  return (
    <div className="flex flex-col gap-3 h-64 rounded-xl bg-white p-4 text-neutral-700 shadow-lg border-2 border-neutral-100">
      <Link
        to={`/projects/${project.id}`}
        className="h-1/2 w-full rounded-xl"
        style={bgGradient}
      ></Link>
      <div className="flex flex-col">
        <Link to={`/projects/${project.id}`}>
          <h2 className="text-lg font-semibold">{project.title}</h2>
        </Link>
        <span className="text-sm text-neutral-500">{formatTimestamp(project.dueDate)}</span>
      </div>
    </div>
  );
}
