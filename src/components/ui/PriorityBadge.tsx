import { Priority } from "../../lib/types/Types";
import { getTaskPriorityColor } from "../../lib/utils/StyleHelper";

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const { base, background } = getTaskPriorityColor(priority);
  return (
    <span
      className="px-2 py-1 rounded-xl border-2 h-fit text-sm"
      style={{ color: base, borderColor: base, backgroundColor: background }}
    >
      {priority[0].toUpperCase()+priority.slice(1)}
    </span>
  );
}
