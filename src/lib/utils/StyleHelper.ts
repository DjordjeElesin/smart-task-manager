import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Priority } from "../types/Types";

export const mergeClassNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getTaskPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "low":
      return { base: "#fcde40", background: "##FDE877" };
    case "medium":
      return { base: "#ff9e3d", background: "##FFC48A" };
    case "high":
      return { base: "#f43f5e", background: "#fecdd3" };
  }
};
