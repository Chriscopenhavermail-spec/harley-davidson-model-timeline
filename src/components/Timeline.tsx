import { eras } from "../data/eras";
import type { HarleyModel } from "../types/harley";
import { modelOverlapsEra } from "../utils/timeline";
import EmptyState from "./EmptyState";
import EraSection from "./EraSection";

type TimelineProps = {
  models: HarleyModel[];
  comparedModels: HarleyModel[];
  eraId?: string;
  onClearFilters: () => void;
  onCompareToggle: (model: HarleyModel) => void;
  onViewDetails: (model: HarleyModel) => void;
};

export default function Timeline({
  comparedModels,
  eraId,
  models,
  onClearFilters,
  onCompareToggle,
  onViewDetails,
}: TimelineProps) {
  if (models.length === 0) {
    return <EmptyState onClear={onClearFilters} />;
  }

  const visibleEras = eraId && eraId !== "all" ? eras.filter((era) => era.id === eraId) : eras;

  return (
    <div className="space-y-12">
      {visibleEras.map((era) => {
        const eraModels = models
          .filter((model) => modelOverlapsEra(model, era.startYear, era.endYear))
          .sort((a, b) => a.productionStartYear - b.productionStartYear);

        return (
          <EraSection
            comparedModels={comparedModels}
            era={era}
            key={era.id}
            models={eraModels}
            onCompareToggle={onCompareToggle}
            onViewDetails={onViewDetails}
          />
        );
      })}
    </div>
  );
}
