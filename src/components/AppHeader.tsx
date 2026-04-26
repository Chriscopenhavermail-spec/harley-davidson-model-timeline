import { Gauge, ShieldCheck, Sparkles } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="relative overflow-hidden border-b border-brass-400/20 bg-iron-950">
      <div className="absolute inset-0 opacity-30 blueprint-grid" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase text-brass-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-brass-400/30 bg-brass-400/10 px-3 py-1">
                <Gauge size={16} />
                1903 to Present
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-parchment-200/80">
                <Sparkles size={16} />
                Version 1 reference
              </span>
            </div>
            <h1 className="mt-6 font-display text-4xl text-parchment-100 sm:text-6xl">
              Harley-Davidson Model Timeline
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-parchment-200/80 sm:text-lg">
              Explore the major Harley-Davidson models, engines, platforms, and design changes across more than a century of
              motorcycle history.
            </p>
          </div>
          <aside className="max-w-md rounded-lg border border-brass-400/25 bg-iron-850/80 p-4 text-sm leading-6 text-parchment-200/75 shadow-brass">
            <div className="mb-2 flex items-center gap-2 font-semibold text-brass-300">
              <ShieldCheck size={18} />
              Historical reference note
            </div>
            This is a historical reference project. Harley-Davidson names and trademarks belong to Harley-Davidson. Images should
            be licensed, user-provided, public-domain, or properly credited.
          </aside>
        </div>
      </div>
    </header>
  );
}
