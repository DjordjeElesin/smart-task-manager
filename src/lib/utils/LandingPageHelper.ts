import {
  Handshake,
  Hourglass,
  LineSegments,
  ListChecks,
} from "@phosphor-icons/react";
import { FeatureType, PlanFeaturesType, PricingPlanType, TestimonyType } from "../types/LandingPageTypes";

export const testimonies: TestimonyType[] = [
  {
    person: {
      name: "Anna Johnson",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      job: "Project Manager",
    },
    quote:
      "SmartTask revolutionized how our team collaborates. It's like Trello, but with more focus and better organization for our projects!",
    rating: 5,
  },
  {
    person: {
      name: "Michael Green",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      job: "Software Engineer",
    },
    quote:
      "With SmartTask, our project timelines are clearer, and assigning tasks has never been easier. A must-have for any team!",
    rating: 4,
  },
  {
    person: {
      name: "Sophia Lee",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      job: "Marketing Specialist",
    },
    quote:
      "SmartTask has simplified our workflow and boosted productivity across all departments. It's a game-changer for team management.",
    rating: 5,
  },
  {
    person: {
      name: "James Carter",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      job: "Team Lead",
    },
    quote:
      "Using SmartTask feels intuitive and natural. Managing tasks and tracking progress in our team is now seamless and efficient.",
    rating: 4,
  },
  {
    person: {
      name: "Emily Brown",
      image: "https://randomuser.me/api/portraits/women/30.jpg",
      job: "HR Manager",
    },
    quote:
      "SmartTask combines simplicity and power perfectly. It's the ultimate tool for keeping our team on the same page!",
    rating: 5,
  },
];

export const features: FeatureType[] = [
  {
    title: "Organize Tasks Effortlessly",
    description: "Create, prioritize, and track tasks with ease.",
    icon: ListChecks,
  },
  {
    title: "Collaborate Seamlessly",
    description:
      "Assign tasks, share files, and leave comments—no more messy email threads!",
    icon: Handshake,
  },
  {
    title: "Hit Deadlines Every Time",
    description:
      "Set reminders and track due dates with our built-in calendar.",
    icon: Hourglass,
  },
  {
    title: "Custom Workflows",
    description:
      "Tailor task categories, statuses, and priorities to suit your needs.",
    icon: LineSegments,
  },
];

export const aboutMeTxt = `Hey, it's Djole 👋

In 2024, I believed I was a productivity guru, juggling tasks with apps, notebooks, and Post-its, only to realize I was just a professional procrastinator...

After countless missed deadlines, forgotten tasks, and overcomplicated systems, I decided to build something better: a tool that simplifies task management without overthinking it. That’s how **SmartTask** was born.

I built SmartTask for 3 reasons:

- **Save time and focus on meaningful work**—stop wasting hours organizing chaos.  
- **Eliminate the confusion and stress of scattered workflows**—keep everything in one place.  
- **Help teams achieve their goals effortlessly**—collaboration should be easy, not a headache.

Fast forward to now, and teams, students, freelancers, and growing startups are using SmartTask to stay on top of their projects and crush deadlines without breaking a sweat.

If you’re tired of messy to-do lists, endless email threads, and forgotten deadlines, **SmartTask** is your solution.

Join me on this journey to work smarter, not harder. Scroll down to see how **SmartTask** is changing the game for people just like you!
`;


const baseFeatures: PlanFeaturesType = {
  projects: "Unlimited",
  teamMembers: "Unlimited" as const,
  taskCommentsAttachments: true,
  customTaskLabels: true,
  remindersNotifications: true,
  roleManagement: "Advanced",
  integrations: true,
  timeTrackingReporting: true,
  prioritySupport: true,
  customBranding: true,
};

export const pricingPlans: PricingPlanType[] = [
  {
    plan_name: "Free",
    features: {
      ...baseFeatures,
      projects: 5,
      teamMembers: 10,
      customTaskLabels: false,
      roleManagement: "Basic",
      integrations: false,
      timeTrackingReporting: false,
      prioritySupport: false,
      customBranding: false,
    },
    price: 0,
    prev_price: null
  },
  {
    plan_name: "Pro",
    features: {
      ...baseFeatures,
      projects: 20,
      roleManagement: "Intermediate",
      prioritySupport: false,
      customBranding: false,
    },
    price: 9,
    prev_price: 12,
  },
  {
    plan_name: "Business",
    features: {
      ...baseFeatures,
    },
    price: 29,
    prev_price: 35,
  },
];


