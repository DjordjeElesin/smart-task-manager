import { IconProps } from "@phosphor-icons/react";

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
  price: number,
  prev_price: number | null
};

export type { FeatureType, TestimonyType, PricingPlanType, PlanFeaturesType };
