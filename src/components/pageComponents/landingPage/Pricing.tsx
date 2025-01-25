import { pricingPlans } from "../../../lib/utils/LandingPageHelper";
import PricingPlanCard from "../../ui/PricingPlanCard";

export default function Pricing() {
  return (
    <section id="pricing" className="flex flex-col w-full lg:flex-row items-center justify-center lg:items-stretch gap-8 py-20 px-6">

      {pricingPlans.map((plan) => (
        <PricingPlanCard key={plan.plan_name} plan={plan} />
      ))}
    </section>
  );
}
