import { Scale, X } from "lucide-react";
import type { HarleyModel } from "../types/harley";
import { getProductionYearsLabel } from "../utils/timeline";
import EngineBadge from "./EngineBadge";

type CompareDrawerProps = {
  models: HarleyModel[];
  onClear: () => void;
  onRemove: (modelId: string) => void;
  onViewDetails: (model: HarleyModel) => void;
};

export default function CompareDrawer({ models, onClear, onRemove, onViewDetails }: CompareDrawerProps) {
  if (models.length === 0) {
    return null;
  }

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-brass-400/25 bg-iron-950/95 shadow-[0_-24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-parchment-100">
            <Scale className="text-brass-300" size={20} />
            <h2 className="font-display text-xl">Compare Models</h2>
            <span className="rounded-full border border-brass-400/25 px-2 py-0.5 text-xs font-bold text-brass-300">{models.length}/2</span>
          </div>
          <button className="rounded-md border border-brass-400/30 px-3 py-1.5 text-sm font-semibold text-brass-300 hover:bg-brass-400/10" onClick={onClear} type="button">
            Clear
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {models.map((model) => (
            <div className="rounded-lg border border-brass-400/18 bg-iron-850 p-4" key={model.id}>
              <div className="flex items-start justify-between gap-3">
                <button className="text-left" onClick={() => onViewDetails(model)} type="button">
                  <h3 className="font-display text-2xl text-parchment-100">{model.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brass-300">{getProductionYearsLabel(model)}</p>
                </button>
                <button
                  aria-label={`Remove ${model.name} from compare`}
                  className="rounded-md border border-brass-400/25 p-2 text-brass-300 hover:bg-brass-400/10"
                  onClick={() => onRemove(model.id)}
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-parchment-200">
                  {model.modelFamily}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-parchment-200">
                  {model.motorcycleType}
                </span>
                {model.engineFamilies.map((engine) => (
                  <EngineBadge engine={engine} key={engine} />
                ))}
              </div>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold uppercase text-parchment-200/45">Primary engines</dt>
                  <dd className="mt-1 text-parchment-200/80">{model.primaryEngines.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase text-parchment-200/45">Why it matters</dt>
                  <dd className="mt-1 text-parchment-200/80">{model.whyItMatters}</dd>
                </div>
              </dl>

              <ul className="mt-3 flex flex-wrap gap-2">
                {model.keyCharacteristics.slice(0, 4).map((item) => (
                  <li className="rounded-md bg-black/20 px-2 py-1 text-xs text-parchment-200/70" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {models.length === 1 && (
            <div className="flex min-h-44 items-center justify-center rounded-lg border border-dashed border-brass-400/25 bg-iron-850/70 p-4 text-center text-sm leading-6 text-parchment-200/55">
              Add one more model to compare production years, family, engines, and defining traits.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
