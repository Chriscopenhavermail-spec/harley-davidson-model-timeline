import type { EngineFamily } from "../types/harley";

type EngineBadgeProps = {
  engine: EngineFamily | string;
};

const toneByEngine: Partial<Record<EngineFamily, string>> = {
  "Atmospheric Inlet Single": "border-parchment-300/30 bg-parchment-300/10 text-parchment-100",
  "F-Head": "border-parchment-300/30 bg-parchment-300/10 text-parchment-100",
  Flathead: "border-stone-300/30 bg-stone-300/10 text-stone-100",
  Knucklehead: "border-brass-400/40 bg-brass-400/10 text-brass-300",
  Panhead: "border-amber-300/35 bg-amber-300/10 text-amber-100",
  Shovelhead: "border-orange-300/35 bg-orange-300/10 text-orange-100",
  Ironhead: "border-zinc-300/35 bg-zinc-300/10 text-zinc-100",
  Evolution: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  "Twin Cam": "border-sky-300/30 bg-sky-300/10 text-sky-100",
  Revolution: "border-red-300/35 bg-red-300/10 text-red-100",
  "Milwaukee-Eight": "border-ember-400/45 bg-ember-500/15 text-ember-400",
  "Revolution Max": "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  Electric: "border-violet-300/35 bg-violet-300/10 text-violet-100",
  Other: "border-white/20 bg-white/10 text-white/80",
};

export default function EngineBadge({ engine }: EngineBadgeProps) {
  const tone = toneByEngine[engine as EngineFamily] ?? "border-white/20 bg-white/10 text-white/80";

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {engine}
    </span>
  );
}
