import { FeatureType } from "../../lib/types/LandingPageTypes";

type FeaturePropType = {
  feature: FeatureType;
};

export const FeatureCard = ({ feature }: FeaturePropType) => {
  const Icon = feature.icon;

  return (
    <div className="drop-shadow-lg bg-primary-600 rounded-xl flex flex-col p-4 gap-3 w-full">
      <div className="flex items-center justify-between w-full gap-2 text-neutral-100">
        <h4 className="text-lg font-bold ">{feature.title}</h4>
        <Icon weight="bold" size={40} />
      </div>
      <p className="text-sm text-neutral-100">{feature.description}</p>
    </div>
  );
};
