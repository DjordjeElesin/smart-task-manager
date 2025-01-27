import { IconProps } from "@phosphor-icons/react";
import { Timestamp } from "firebase/firestore";

type FeatureType = {
  title: string;
  description: string;
  icon: React.FC<IconProps>;
};

type PersonType = {
  name: string;
  image: string;
  job: string;
};

type TestimonyType = {
  person: PersonType;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

type PlanFeaturesType = {
  projects: number | "Unlimited";
  teamMembers: number | "Unlimited";
  taskCommentsAttachments: boolean;
  customTaskLabels: boolean;
  remindersNotifications: boolean;
  roleManagement: "Basic" | "Advanced" | "Intermediate";
  integrations: boolean;
  timeTrackingReporting: boolean;
  prioritySupport: boolean;
  customBranding: boolean;
};

type PricingPlanType = {
  plan_name: string;
  features: PlanFeaturesType;
  price: number;
  prev_price: number | null;
};

type PieDataType = {
  id: string;
  label: string;
  value: number;
};

type Role = "admin" | "editor" | "viewer";

type Member = {
  userId: string;
  name: string;
  role: Role;
};

type Project = {
  projectId: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  dueDate: Timestamp;
  id: string;
  members: Member[];
  lastModified: Timestamp;
  gradient: string;
  status: "active" | "completed" | "on hold";
};

type Priority = "Low" | "Medium" | "High";

type Comment = {
  commentId: string;
  content: string;
  timestamp: Timestamp;
  userId: string;
};

type Task = {
  assignedTo?: string[];
  createdAt: Timestamp;
  createdBy: string;
  description: string;
  dueDate: Timestamp;
  priority: Priority;
  projectId?: string;
  status: "To do" | "In Progress" | "Done";
  title: string;
  comments?: Comment[];
};

interface User {
  userId: string;
  email: string;
  name: string;
  photoURL: string;
  createdAt: Timestamp;
  projectIds?: string[];
}

export type {
  FeatureType,
  TestimonyType,
  PricingPlanType,
  PlanFeaturesType,
  User,
  Project,
  Task,
  PieDataType,
};
