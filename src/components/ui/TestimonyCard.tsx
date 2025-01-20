import { Quotes, Star } from "@phosphor-icons/react";
import { mergeClassNames } from "../../lib/utils/StyleHelper";

type PersonType = {
  name: string,
  image: string,
  job: string
}

export type TestimonyType = {
  person: PersonType
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

type TestimonyCardProps = {
  testimony: TestimonyType;
};

export default function TestimonyCard({ testimony }: TestimonyCardProps) {
  return (
    <div className="relative text-neutral-100 w-full md:w-4/5 flex flex-col gap-4 px-5 py-6 rounded-xl border-2 border-primary-200 bg-neutral-800">
      <div className="absolute right-4 top-3">
        <Quotes size={50} weight="fill" className="text-primary-600"/>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={25}
            weight="fill"
            className={mergeClassNames(
              index < testimony.rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-neutral-600"
            )}
          />
        ))}
      </div>
      <p>{testimony.quote}</p>
      <div className="flex gap-3 items-center ">
        <div className="rounded-full overflow-hidden w-10 aspect-square">
          <img src={testimony.person.image} className="w-full h-full object-cover"/>
        </div>
        <div className="flex flex-col ">
          <span className="font-semibold">{testimony.person.name}</span>
          <span className="text-sm">{testimony.person.job}</span>
        </div>
      </div>
    </div>
  );
}
