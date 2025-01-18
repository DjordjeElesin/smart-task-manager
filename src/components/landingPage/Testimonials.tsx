import TestimonyCard from "../ui/TestimonyCard";
import { testimonies } from "../../lib/utils/LandingPageHelper";

export default function Testimonials() {
  const randomTestimony = Math.floor(Math.random() * testimonies.length);
  return (
    <section className="py-8 px-6 flex items-center justify-center w-full">
      <TestimonyCard testimony={testimonies[randomTestimony]} />
    </section>
  );
}
