import { CalendarDays, Eye, Plus, Scale, X } from "lucide-react";
import { motion } from "framer-motion";
import type { HarleyModel } from "../types/harley";
import { getModelImageCandidates, useRefreshImage } from "../utils/images";
import { getProductionYearsLabel } from "../utils/timeline";
import EngineBadge from "./EngineBadge";

type ModelCardProps = {
  model: HarleyModel;
  isCompared: boolean;
  compareDisabled: boolean;
  onCompareToggle: (model: HarleyModel) => void;
  onViewDetails: (model: HarleyModel) => void;
};

export default function ModelCard({
  compareDisabled,
  isCompared,
  model,
  onCompareToggle,
  onViewDetails,
}: ModelCardProps) {
  const canCompare = isCompared || !compareDisabled;
  const [imageUrl, markImageFailed] = useRefreshImage(getModelImageCandidates(model));

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-brass-400/18 bg-iron-850 shadow-museum transition hover:border-brass-400/45"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.28 }}
    >
      <button className="relative block aspect-[16/9] overflow-hidden text-left" onClick={() => onViewDetails(model)} type="button">
        {imageUrl ? (
          <img
            alt={model.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={markImageFailed}
            src={imageUrl}
          />
        ) : (
          <div className="motorcycle-placeholder h-full w-full">
            <span>{model.modelFamily}</span>
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full border border-brass-400/30 bg-iron-950/85 px-3 py-1 text-xs font-bold text-brass-300">
          {getProductionYearsLabel(model)}
        </div>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-parchment-100">{model.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-brass-300">
              <CalendarDays size={15} />
              {getProductionYearsLabel(model)}
            </p>
          </div>
          <Scale className="mt-1 flex-none text-parchment-200/35" size={18} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-brass-400/28 bg-brass-400/10 px-2.5 py-1 text-xs font-semibold text-brass-300">
            {model.modelFamily}
          </span>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-parchment-200">
            {model.motorcycleType}
          </span>
          {model.engineFamilies.map((engine) => (
            <EngineBadge engine={engine} key={engine} />
          ))}
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-parchment-200/72">{model.whyItMatters}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <button
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-brass-400 px-3 py-2 text-sm font-bold text-iron-950 transition hover:bg-brass-300"
            onClick={() => onViewDetails(model)}
            type="button"
          >
            <Eye size={16} />
            Details
          </button>
          <button
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-brass-400/35 px-3 py-2 text-sm font-bold text-brass-300 transition hover:bg-brass-400/10 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!canCompare}
            onClick={() => onCompareToggle(model)}
            type="button"
          >
            {isCompared ? <X size={16} /> : <Plus size={16} />}
            {isCompared ? "Remove" : "Compare"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
