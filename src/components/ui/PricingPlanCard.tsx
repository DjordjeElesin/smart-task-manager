import { Check, X } from "@phosphor-icons/react";
import { PricingPlanType } from "../../lib/types/LandingPageTypes";
import Button from "./Button";
import { Link } from "react-router-dom";
import { mergeClassNames } from "../../lib/utils/StyleHelper";

export default function PricingPlanCard({ plan }: { plan: PricingPlanType }) {
  return (
    <div className="h-full relative flex flex-col gap-5 lg:gap-8 z-10 p-8 rounded-lg bg-primary-200 text-neutral-800 font-semibold">
      <div className="flex items-center gap-4">
        <p className="text-xl font-bold">{plan.plan_name}</p>
      </div>
      <div className="flex gap-3 items-end justify-center">
        {plan.prev_price && (
          <span className="text-xl font-semibold line-through mb-[3px]">
            ${plan.prev_price}
          </span>
        )}
        <span className="text-4xl tracking-tight font-bold">${plan.price}</span>
        <span className="text-md font-semibold mb-1">USD</span>
      </div>
      <ul>
        {Object.entries(plan.features).map(([key, value]) => (
          <li
            className={mergeClassNames(
              "flex items-center gap-2 space-y-2.5",
              !value && "text-neutral-900/50"
            )}
            key={key}
          >
            <span className="w-5 h-5">
              {value ? <Check size={20} /> : <X />}
            </span>
            <span>
              {key[0].toUpperCase() +
                key
                  .slice(1, key.length)
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}
              {typeof value === "string" || typeof value === "number"
                ? `: ${value.toString()}`
                : ""}
            </span>
          </li>
        ))}
      </ul>
      {plan.price > 0 ? (
        <Button variant="secondary">Get SmartTask</Button>
      ) : (
        <Link to="/singup">
          <Button variant="secondary" className="w-full">
            Get SmartTask
          </Button>
        </Link>
      )}
    </div>
  );
}
