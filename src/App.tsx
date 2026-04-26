import { useMemo, useState } from "react";
import AppHeader from "./components/AppHeader";
import CompareDrawer from "./components/CompareDrawer";
import FilterBar from "./components/FilterBar";
import ModelDetailModal from "./components/ModelDetailModal";
import ProductionOverviewChart from "./components/ProductionOverviewChart";
import Timeline from "./components/Timeline";
import { harleyModels } from "./data/harleyModels";
import type { HarleyModel } from "./types/harley";
import type { Filters } from "./utils/filters";
import { getAvailableDecades, modelMatchesFilters } from "./utils/filters";

const defaultFilters: Filters = {
  search: "",
  eraId: "all",
  decade: "all",
  modelFamily: "all",
  engineFamily: "all",
  motorcycleType: "all",
  currentlyProducedOnly: false,
};

export default function App() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [selectedModel, setSelectedModel] = useState<HarleyModel | null>(null);
  const [comparedModels, setComparedModels] = useState<HarleyModel[]>([]);

  const decades = useMemo(() => getAvailableDecades(harleyModels), []);
  const filteredModels = useMemo(
    () => harleyModels.filter((model) => modelMatchesFilters(model, filters)),
    [filters],
  );

  const handleCompareToggle = (model: HarleyModel) => {
    setComparedModels((current) => {
      if (current.some((item) => item.id === model.id)) {
        return current.filter((item) => item.id !== model.id);
      }

      if (current.length >= 2) {
        return current;
      }

      return [...current, model];
    });
  };

  const clearFilters = () => setFilters(defaultFilters);

  return (
    <div className="min-h-screen bg-iron-950 text-parchment-100">
      <AppHeader />

      <FilterBar
        decades={decades}
        filters={filters}
        onChange={setFilters}
        onClear={clearFilters}
        resultCount={filteredModels.length}
      />

      <main className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${comparedModels.length ? "pb-96" : "pb-16"}`}>
        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <Metric label="Starter models" value={harleyModels.length} />
          <Metric label="Current models" value={harleyModels.filter((model) => model.productionEndYear === "present").length} />
          <Metric label="Evolution periods" value={harleyModels.reduce((total, model) => total + model.changeTimeline.length, 0)} />
        </section>

        <ProductionOverviewChart models={filteredModels} onViewDetails={setSelectedModel} />

        <Timeline
          comparedModels={comparedModels}
          eraId={filters.eraId}
          models={filteredModels}
          onClearFilters={clearFilters}
          onCompareToggle={handleCompareToggle}
          onViewDetails={setSelectedModel}
        />
      </main>

      <CompareDrawer
        models={comparedModels}
        onClear={() => setComparedModels([])}
        onRemove={(modelId) => setComparedModels((current) => current.filter((model) => model.id !== modelId))}
        onViewDetails={setSelectedModel}
      />

      <ModelDetailModal
        allModels={harleyModels}
        model={selectedModel}
        onClose={() => setSelectedModel(null)}
        onOpenRelated={setSelectedModel}
      />

      <footer className="border-t border-brass-400/18 bg-iron-950 px-4 py-8 text-center text-sm text-parchment-200/58">
        Built as a historical reference timeline. Harley-Davidson names and trademarks belong to Harley-Davidson.
      </footer>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-brass-400/18 bg-iron-850/80 p-4 shadow-brass">
      <div className="font-display text-3xl text-brass-300">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase text-parchment-200/55">{label}</div>
    </div>
  );
}
