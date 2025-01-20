import { useRef } from "react";
import About from "../components/landingPage/About";
import Features from "../components/landingPage/Features";
import Header from "../components/landingPage/Header";
import Testimonials from "../components/landingPage/Testimonials";
import Pricing from "../components/landingPage/Pricing";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Crown } from "@phosphor-icons/react";

export default function LandingPage() {
  const featuresRef = useRef<HTMLElement>(null);
  return (
    <section className="bg-primary-50">
      <Header elementRef={featuresRef} />
      <section className="w-full p-6 flex items-center justify-center">
        <img
          src="landingPage/visual-data2.svg"
          className="object-contain w-full md:w-2/3 lg:w-1/2"
        />
      </section>
      <Features featureRef={featuresRef} />
      <About />
      <Testimonials />
      <Pricing />
      <section className="text-neutral-800 py-20 w-full flex flex-col gap-4 items-center ">
        <h1 className="relative text-5xl font-bold">
          <span className="absolute -top-10 -right-10 rotate-45">
            <Crown size={60} weight="fill" className="text-primary-600"/>
          </span>
          <span>Your Tasks, Simplified. Your Goals, Achieved.</span>
        </h1>
        <p className="text-lg">
          Start your journey to better organization and team collaboration with
          SmartTask.
        </p>
        <Link to="/signup" className="mt-10">
          <Button>Get started</Button>
        </Link>
      </section>
    </section>
  );
}
