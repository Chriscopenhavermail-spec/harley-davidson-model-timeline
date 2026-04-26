import type { Era } from "../data/eras";
import type { HarleyModel } from "../types/harley";
import ModelCard from "./ModelCard";

type EraSectionProps = {
  era: Era;
  models: HarleyModel[];
  comparedModels: HarleyModel[];
  onCompareToggle: (model: HarleyModel) => void;
  onViewDetails: (model: HarleyModel) => void;
};

export default function EraSection({ comparedModels, era, models, onCompareToggle, onViewDetails }: EraSectionProps) {
  if (models.length === 0) {
    return null;
  }

  const endYear = era.endYear === "present" ? "Present" : era.endYear;

  return (
    <section className="relative pl-6">
      <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-brass-400 via-brass-400/40 to-transparent" />
      <div className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border border-brass-300 bg-iron-950 shadow-[0_0_0_6px_rgba(209,154,69,0.12)]" />
      <div className="mb-6">
        <div className="text-sm font-bold uppercase text-brass-300">
          {era.startYear}-{endYear}
        </div>
        <h2 className="mt-2 font-display text-3xl text-parchment-100 sm:text-4xl">{era.name}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-parchment-200/70">{era.description}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {models.map((model) => {
          const isCompared = comparedModels.some((item) => item.id === model.id);

          return (
            <ModelCard
              compareDisabled={comparedModels.length >= 2}
              isCompared={isCompared}
              key={`${era.id}-${model.id}`}
              model={model}
              onCompareToggle={onCompareToggle}
              onViewDetails={onViewDetails}
            />
          );
        })}
      </div>
    </section>
  );
}
