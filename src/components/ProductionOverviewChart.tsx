import { CalendarRange, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { HarleyModel, ModelFamily } from "../types/harley";
import { getComparableEndYear, getProductionYearsLabel } from "../utils/timeline";

type ProductionOverviewChartProps = {
  models: HarleyModel[];
  onViewDetails: (model: HarleyModel) => void;
};

const START_YEAR = 1903;
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_WIDTH = 14;
const LABEL_WIDTH = 190;
const ROW_HEIGHT = 38;

const familyOrder: ModelFamily[] = [
  "Early Models",
  "Military",
  "Big Twin",
  "Sportster",
  "Dyna",
  "Softail",
  "Touring",
  "V-Rod",
  "Adventure Touring",
  "Electric",
  "Trike",
  "CVO",
  "Street",
  "Racing",
  "Other",
];

const familyColors: Record<ModelFamily, string> = {
  "Early Models": "#cfb58d",
  "Big Twin": "#d19a45",
  Sportster: "#e7b35b",
  Dyna: "#c46b39",
  Softail: "#d0632a",
  Touring: "#8fb0a2",
  CVO: "#b67ad8",
  "V-Rod": "#d45454",
  Street: "#9ca3af",
  "Adventure Touring": "#65b6a6",
  Trike: "#d7a85f",
  Electric: "#9f8cff",
  Racing: "#ef8261",
  Military: "#8f9b67",
  Other: "#a8a29e",
};

export default function ProductionOverviewChart({ models, onViewDetails }: ProductionOverviewChartProps) {
  const [collapsedFamilies, setCollapsedFamilies] = useState<Set<ModelFamily>>(new Set());
  const endYear = Math.max(CURRENT_YEAR, ...models.map((model) => getComparableEndYear(model.productionEndYear)));
  const chartWidth = (endYear - START_YEAR + 1) * YEAR_WIDTH;
  const totalWidth = LABEL_WIDTH + chartWidth;
  const decadeTicks = getDecadeTicks(endYear);
  const groupedModels = familyOrder
    .map((family) => ({
      family,
      models: models
        .filter((model) => model.modelFamily === family)
        .sort((a, b) => a.productionStartYear - b.productionStartYear || a.name.localeCompare(b.name)),
    }))
    .filter((group) => group.models.length > 0);
  const toggleFamily = (family: ModelFamily) => {
    setCollapsedFamilies((current) => {
      const next = new Set(current);

      if (next.has(family)) {
        next.delete(family);
      } else {
        next.add(family);
      }

      return next;
    });
  };

  return (
    <section className="mb-10 overflow-hidden rounded-lg border border-brass-400/20 bg-iron-850/88 shadow-brass">
      <div className="border-b border-brass-400/15 p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase text-brass-300">
              <CalendarRange size={18} />
              Production Overview
            </div>
            <h2 className="mt-2 font-display text-3xl text-parchment-100">Historical Production Map</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment-200/68">
              A year-based overview of filtered models. Bars show production span; hover for quick details and click a bar to open the model.
            </p>
          </div>
          <ChartLegend families={groupedModels.map((group) => group.family)} />
        </div>
      </div>

      {models.length === 0 ? (
        <div className="p-5 text-sm text-parchment-200/60">No matching models to chart.</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="relative" style={{ minWidth: totalWidth }}>
            <div className="sticky top-0 z-20 flex h-12 border-b border-brass-400/15 bg-iron-950/96">
              <div
                className="sticky left-0 z-30 flex items-center border-r border-brass-400/15 bg-iron-950 px-4 text-xs font-bold uppercase text-parchment-200/55"
                style={{ width: LABEL_WIDTH }}
              >
                Model
              </div>
              <div className="relative h-full" style={{ width: chartWidth }}>
                {decadeTicks.map((year) => (
                  <div
                    className="absolute top-0 flex h-full items-center border-l border-brass-400/18 pl-2 text-xs font-bold text-brass-300"
                    key={year}
                    style={{ left: (year - START_YEAR) * YEAR_WIDTH }}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>

            <div>
              {groupedModels.map((group) => (
                <div key={group.family}>
                  <div className="flex h-10 border-b border-brass-400/12 bg-black/18">
                    <button
                      aria-expanded={!collapsedFamilies.has(group.family)}
                      className="sticky left-0 z-10 flex items-center gap-2 border-r border-brass-400/12 bg-iron-900 px-4 text-left text-xs font-bold uppercase text-parchment-100 transition hover:bg-brass-400/10 hover:text-brass-300"
                      onClick={() => toggleFamily(group.family)}
                      style={{ width: LABEL_WIDTH }}
                      type="button"
                    >
                      <ChevronDown
                        className={`flex-none transition ${collapsedFamilies.has(group.family) ? "-rotate-90" : ""}`}
                        size={15}
                      />
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: familyColors[group.family] }} />
                      <span className="truncate">{group.family}</span>
                      <span className="ml-auto text-[10px] text-parchment-200/45">{group.models.length}</span>
                    </button>
                    <div className="relative" style={{ width: chartWidth }}>
                      <GridLines ticks={decadeTicks} />
                    </div>
                  </div>

                  {!collapsedFamilies.has(group.family) &&
                    group.models.map((model) => (
                      <ChartRow
                        chartWidth={chartWidth}
                        decadeTicks={decadeTicks}
                        key={model.id}
                        model={model}
                        onViewDetails={onViewDetails}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ChartRow({
  chartWidth,
  decadeTicks,
  model,
  onViewDetails,
}: {
  chartWidth: number;
  decadeTicks: number[];
  model: HarleyModel;
  onViewDetails: (model: HarleyModel) => void;
}) {
  const color = familyColors[model.modelFamily];
  const startOffset = Math.max(0, model.productionStartYear - START_YEAR) * YEAR_WIDTH;
  const end = getComparableEndYear(model.productionEndYear);
  const barWidth = Math.max(YEAR_WIDTH, (end - model.productionStartYear + 1) * YEAR_WIDTH);

  return (
    <div className="group/row flex border-b border-brass-400/10 hover:bg-brass-400/[0.045]" style={{ height: ROW_HEIGHT }}>
      <div
        className="sticky left-0 z-10 flex items-center border-r border-brass-400/12 bg-iron-850 px-4 text-sm font-semibold text-parchment-100"
        style={{ width: LABEL_WIDTH }}
      >
        <button className="truncate text-left transition hover:text-brass-300" onClick={() => onViewDetails(model)} type="button">
          {model.name}
        </button>
      </div>
      <div className="relative" style={{ width: chartWidth }}>
        <GridLines ticks={decadeTicks} />
        <button
          className="group/bar absolute top-1/2 h-7 -translate-y-1/2 text-left outline-none ring-brass-300/35 transition focus:ring-4"
          onClick={() => onViewDetails(model)}
          style={{
            left: startOffset,
            width: Math.max(barWidth, 150),
          }}
          title={`${model.name} / ${getProductionYearsLabel(model)} / ${model.modelFamily} / ${model.motorcycleType}`}
          type="button"
        >
          <span className="sr-only">Open {model.name}</span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-full border border-white/20 shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition group-hover/bar:brightness-125"
            style={{
              width: barWidth,
              background: `linear-gradient(90deg, ${color}, ${color}bb)`,
            }}
          />
          <span className="pointer-events-none absolute bottom-7 left-0 z-30 hidden w-60 rounded-md border border-brass-400/30 bg-iron-950 p-3 text-xs leading-5 text-parchment-100 shadow-museum group-hover/bar:block">
            <strong className="block font-display text-base text-brass-300">{model.name}</strong>
            <span className="block">{getProductionYearsLabel(model)}</span>
            <span className="block">{model.modelFamily}</span>
            <span className="block text-parchment-200/70">{model.motorcycleType}</span>
          </span>
        </button>
      </div>
    </div>
  );
}

function GridLines({ ticks }: { ticks: number[] }) {
  return (
    <>
      {ticks.map((year) => (
        <span
          aria-hidden="true"
          className="absolute bottom-0 top-0 border-l border-brass-400/10"
          key={year}
          style={{ left: (year - START_YEAR) * YEAR_WIDTH }}
        />
      ))}
    </>
  );
}

function ChartLegend({ families }: { families: ModelFamily[] }) {
  return (
    <div className="flex max-w-xl flex-wrap gap-2">
      {families.map((family) => (
        <span
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-parchment-200"
          key={family}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: familyColors[family] }} />
          {family}
        </span>
      ))}
    </div>
  );
}

function getDecadeTicks(endYear: number): number[] {
  const ticks = [START_YEAR];
  const firstDecade = Math.ceil(START_YEAR / 10) * 10;

  for (let year = firstDecade; year <= endYear; year += 10) {
    ticks.push(year);
  }

  if (!ticks.includes(endYear)) {
    ticks.push(endYear);
  }

  return ticks;
}
