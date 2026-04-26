import { Wrench } from "lucide-react";
import type { ModelChangePeriod } from "../types/harley";
import { getPeriodLabel } from "../utils/timeline";
import EngineBadge from "./EngineBadge";

type ModelChangeTimelineProps = {
  periods: ModelChangePeriod[];
};

export default function ModelChangeTimeline({ periods }: ModelChangeTimelineProps) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brass-400/30 bg-brass-400/10 text-brass-300">
          <Wrench size={20} />
        </div>
        <div>
          <h3 className="font-display text-2xl text-parchment-100">Model Evolution Timeline</h3>
          <p className="text-sm text-parchment-200/60">Engine, platform, styling, and equipment changes by period.</p>
        </div>
      </div>

      <ol className="relative space-y-5 border-l border-brass-400/25 pl-5">
        {periods.map((period) => (
          <li className="relative rounded-lg border border-brass-400/18 bg-iron-850/85 p-4" key={period.id}>
            <div className="absolute -left-[27px] top-5 h-3 w-3 rounded-full border border-brass-300 bg-iron-950" />
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-xs font-bold uppercase text-brass-300">{getPeriodLabel(period.startYear, period.endYear)}</div>
                <h4 className="mt-1 font-display text-xl text-parchment-100">{period.title}</h4>
              </div>
              {period.engineFamily && <EngineBadge engine={period.engineFamily} />}
            </div>

            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <Spec label="Engine" value={period.engine} />
              <Spec label="Displacement" value={period.displacement} />
              <Spec label="Frame" value={period.frame} />
              <Spec label="Transmission" value={period.transmission} />
              <Spec label="Suspension" value={period.suspension} />
              <Spec label="Brakes" value={period.brakes} />
            </dl>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <ListBlock items={period.notableChanges} title="Notable changes" />
              <ListBlock items={period.characteristics} title="Characteristics" />
            </div>

            {period.notes && <p className="mt-4 rounded-md bg-black/20 p-3 text-sm leading-6 text-parchment-200/65">{period.notes}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Spec({ label, value }: { label: string; value?: string }) {
  if (!value) {
    return null;
  }

  return (
    <div>
      <dt className="text-xs font-bold uppercase text-parchment-200/45">{label}</dt>
      <dd className="mt-1 text-parchment-100">{value}</dd>
    </div>
  );
}

function ListBlock({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <h5 className="text-xs font-bold uppercase text-brass-300">{title}</h5>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-parchment-200/72">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brass-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
