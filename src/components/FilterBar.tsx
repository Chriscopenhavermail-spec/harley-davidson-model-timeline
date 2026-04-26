import { RotateCcw, Search } from "lucide-react";
import type { ReactNode } from "react";
import { eras } from "../data/eras";
import { engineFamilies, modelFamilies, motorcycleTypes } from "../data/engineFamilies";
import type { Filters } from "../utils/filters";

type FilterBarProps = {
  filters: Filters;
  decades: string[];
  resultCount: number;
  onChange: (filters: Filters) => void;
  onClear: () => void;
};

export default function FilterBar({ filters, decades, resultCount, onChange, onClear }: FilterBarProps) {
  const update = <Key extends keyof Filters>(key: Key, value: Filters[Key]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="sticky top-0 z-30 border-b border-brass-400/20 bg-iron-950/92 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 lg:grid-cols-[minmax(260px,1.4fr)_repeat(5,minmax(130px,1fr))_auto]">
          <label className="relative block">
            <span className="sr-only">Search models</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brass-300" size={18} />
            <input
              className="h-11 w-full rounded-md border border-brass-400/25 bg-iron-850 pl-10 pr-3 text-sm text-parchment-100 outline-none ring-brass-400/30 transition placeholder:text-parchment-200/40 focus:border-brass-400/60 focus:ring-4"
              onChange={(event) => update("search", event.target.value)}
              placeholder="Search model, year, engine, family..."
              value={filters.search}
            />
          </label>

          <Select label="Era" value={filters.eraId ?? "all"} onChange={(value) => update("eraId", value)}>
            <option value="all">All eras</option>
            {eras.map((era) => (
              <option key={era.id} value={era.id}>
                {era.name}
              </option>
            ))}
          </Select>

          <Select label="Decade" value={filters.decade ?? "all"} onChange={(value) => update("decade", value)}>
            <option value="all">All decades</option>
            {decades.map((decade) => (
              <option key={decade} value={decade}>
                {decade}s
              </option>
            ))}
          </Select>

          <Select label="Family" value={filters.modelFamily ?? "all"} onChange={(value) => update("modelFamily", value as Filters["modelFamily"])}>
            <option value="all">All families</option>
            {modelFamilies.map((family) => (
              <option key={family} value={family}>
                {family}
              </option>
            ))}
          </Select>

          <Select
            label="Engine"
            value={filters.engineFamily ?? "all"}
            onChange={(value) => update("engineFamily", value as Filters["engineFamily"])}
          >
            <option value="all">All engines</option>
            {engineFamilies.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
          </Select>

          <Select
            label="Type"
            value={filters.motorcycleType ?? "all"}
            onChange={(value) => update("motorcycleType", value as Filters["motorcycleType"])}
          >
            <option value="all">All types</option>
            {motorcycleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>

          <div className="flex items-center gap-3">
            <label className="flex h-11 items-center gap-2 rounded-md border border-brass-400/25 bg-iron-850 px-3 text-sm font-semibold text-parchment-100">
              <input
                checked={filters.currentlyProducedOnly}
                className="h-4 w-4 accent-brass-400"
                onChange={(event) => update("currentlyProducedOnly", event.target.checked)}
                type="checkbox"
              />
              Current
            </label>
            <button
              className="flex h-11 items-center gap-2 rounded-md border border-brass-400/35 px-3 text-sm font-semibold text-brass-300 transition hover:bg-brass-400/10"
              onClick={onClear}
              type="button"
            >
              <RotateCcw size={16} />
              Clear
            </button>
          </div>
        </div>
        <div className="mt-3 text-xs font-semibold uppercase text-parchment-200/55">{resultCount} matching models</div>
      </div>
    </section>
  );
}

function Select({
  children,
  label,
  onChange,
  value,
}: {
  children: ReactNode;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        className="h-11 w-full rounded-md border border-brass-400/25 bg-iron-850 px-3 text-sm font-semibold text-parchment-100 outline-none ring-brass-400/30 transition focus:border-brass-400/60 focus:ring-4"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {children}
      </select>
    </label>
  );
}
