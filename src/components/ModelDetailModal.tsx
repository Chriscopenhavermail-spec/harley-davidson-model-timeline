import { AnimatePresence, motion } from "framer-motion";
import { BadgeInfo, BookOpen, ChevronDown, Tags, X } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import type { HarleyModel } from "../types/harley";
import { getModelImageCandidates, useRefreshImage } from "../utils/images";
import { getProductionYearsLabel } from "../utils/timeline";
import EngineBadge from "./EngineBadge";
import ImageGallery from "./ImageGallery";
import ModelChangeTimeline from "./ModelChangeTimeline";
import Spin360Viewer from "./Spin360Viewer";

type ModelDetailModalProps = {
  model: HarleyModel | null;
  allModels: HarleyModel[];
  onClose: () => void;
  onOpenRelated: (model: HarleyModel) => void;
};

export default function ModelDetailModal({ allModels, model, onClose, onOpenRelated }: ModelDetailModalProps) {
  const detailImageCandidates = useMemo(() => (model ? getModelImageCandidates(model) : []), [model]);
  const [detailImageUrl] = useRefreshImage(detailImageCandidates);
  const relatedModels = model?.relatedModels
    ?.map((id) => allModels.find((item) => item.id === id))
    .filter((item): item is HarleyModel => Boolean(item));

  return (
    <AnimatePresence>
      {model && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-brass-400/25 bg-iron-900 shadow-museum"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
          >
            <div className="flex items-center justify-between border-b border-brass-400/18 bg-iron-950 px-4 py-3 sm:px-6">
              <div className="text-xs font-bold uppercase text-brass-300">Model Detail</div>
              <button
                aria-label="Close model detail"
                className="rounded-md border border-brass-400/30 p-2 text-brass-300 transition hover:bg-brass-400/10"
                onClick={onClose}
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Spin360Viewer
                imageCredit={model.imageCredit}
                imageLicense={model.imageLicense}
                imageSourceUrl={model.imageSourceUrl}
                imageUrl={detailImageUrl}
                imageUrls={detailImageCandidates}
                modelName={model.name}
                spin360={model.spin360}
              />

              <section>
                <div className="text-sm font-bold uppercase text-brass-300">{getProductionYearsLabel(model)}</div>
                <h2 className="mt-2 font-display text-4xl text-parchment-100 sm:text-5xl">{model.name}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-parchment-200">
                    {model.modelFamily}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-parchment-200">
                    {model.motorcycleType}
                  </span>
                  {model.engineFamilies.map((engine) => (
                    <EngineBadge engine={engine} key={engine} />
                  ))}
                </div>

                <div className="mt-6 space-y-5">
                  <InfoBlock icon={<BookOpen size={18} />} title="Overview" text={model.overview} />
                  <InfoBlock icon={<BadgeInfo size={18} />} title="Why it matters" text={model.whyItMatters} />
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-brass-300">
                      <Tags size={18} />
                      Key characteristics
                    </div>
                    <CharacteristicList model={model} />
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8 border-t border-brass-400/18 p-4 sm:p-6">
              <ModelChangeTimeline periods={model.changeTimeline} />
              <ImageGallery model={model} />

              {!!relatedModels?.length && (
                <section>
                  <h3 className="font-display text-2xl text-parchment-100">Related Models</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {relatedModels.map((related) => (
                      <button
                        className="rounded-md border border-brass-400/30 px-3 py-2 text-sm font-semibold text-brass-300 transition hover:bg-brass-400/10"
                        key={related.id}
                        onClick={() => onOpenRelated(related)}
                        type="button"
                      >
                        {related.name}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section className="rounded-lg border border-brass-400/18 bg-black/18 p-4">
                <h3 className="font-display text-xl text-parchment-100">Sources and Notes</h3>
                {model.sources?.length ? (
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-parchment-200/70">
                    {model.sources.map((source) => (
                      <li key={source}>{source}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-parchment-200/65">No formal sources attached yet.</p>
                )}
                <p className="mt-3 text-sm leading-6 text-parchment-200/65">
                  Confidence: <span className="font-semibold text-brass-300">{model.confidence ?? "medium"}</span>
                  {model.notes ? ` / ${model.notes}` : ""}
                </p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoBlock({ icon, text, title }: { icon: ReactNode; text: string; title: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-brass-300">
        {icon}
        {title}
      </div>
      <p className="text-sm leading-7 text-parchment-200/78">{text}</p>
    </div>
  );
}

function CharacteristicList({ model }: { model: HarleyModel }) {
  const [openCharacteristic, setOpenCharacteristic] = useState<string | null>(model.keyCharacteristics[0] ?? null);

  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {model.keyCharacteristics.map((item) => {
        const isOpen = openCharacteristic === item;
        const details = model.characteristicDetails?.[item] ?? getFallbackCharacteristicDetails(item, model);

        return (
          <li className="rounded-md border border-brass-400/12 bg-black/18 text-sm text-parchment-200/78" key={item}>
            <button
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left font-semibold transition hover:text-brass-300"
              onClick={() => setOpenCharacteristic(isOpen ? null : item)}
              type="button"
            >
              <span>{item}</span>
              <ChevronDown className={`flex-none transition ${isOpen ? "rotate-180 text-brass-300" : "text-parchment-200/45"}`} size={16} />
            </button>
            {isOpen && (
              <p className="border-t border-brass-400/12 px-3 pb-3 pt-2 text-sm leading-6 text-parchment-200/68">
                {details}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function getFallbackCharacteristicDetails(characteristic: string, model: HarleyModel): string {
  return `${characteristic} is one of the traits that shapes the ${model.name}'s identity within the ${model.modelFamily} family. In this starter dataset, it marks what a rider or collector would notice when comparing this model with related Harley-Davidson motorcycles from nearby eras.`;
}
