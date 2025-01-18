import { FeatureCard } from "./FeatureCard";
import { features } from "../../lib/utils/LandingPageHelper";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function Features({
  featureRef,
}: {
  featureRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section 
      id="features"
      ref={featureRef}
      className="flex flex-col items-center gap-12 p-7 py-14 bg-primary-800"
    >
      <h1 className="text-3xl font-bold text-primary-50">
        Why choose SmartTask?
      </h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full">
        {features.map((feature, idx) => (
          <FeatureCard feature={feature} key={idx} />
        ))}
      </div>
      <Link to="/signup">
        <Button>Get Started</Button>
      </Link>
    </section>
  );
}
