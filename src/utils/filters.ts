import { eras } from "../data/eras";
import type { EngineFamily, HarleyModel, ModelFamily, MotorcycleType } from "../types/harley";
import { isCurrentlyProduced, modelOverlapsEra } from "./timeline";

export type Filters = {
  search: string;
  eraId?: string;
  decade?: string;
  modelFamily?: ModelFamily | "all";
  engineFamily?: EngineFamily | "all";
  motorcycleType?: MotorcycleType | "all";
  currentlyProducedOnly: boolean;
};

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function joinSearchableModelText(model: HarleyModel): string {
  const changeText = model.changeTimeline
    .flatMap((period) => [
      period.title,
      period.engine,
      period.engineFamily,
      period.displacement,
      period.frame,
      period.transmission,
      period.suspension,
      period.brakes,
      period.notes,
      ...period.notableChanges,
      ...period.characteristics,
    ])
    .filter(Boolean)
    .join(" ");

  return [
    model.name,
    ...(model.alternateNames ?? []),
    model.productionStartYear,
    model.productionEndYear,
    model.modelFamily,
    model.motorcycleType,
    ...model.engineFamilies,
    ...model.primaryEngines,
    model.overview,
    model.whyItMatters,
    ...model.keyCharacteristics,
    ...model.tags,
    changeText,
  ]
    .filter(Boolean)
    .join(" ");
}

export function modelMatchesSearch(model: HarleyModel, search: string): boolean {
  const query = normalize(search);

  if (!query) {
    return true;
  }

  const searchable = normalize(joinSearchableModelText(model));
  return query.split(/\s+/).every((term) => searchable.includes(term));
}

function modelOverlapsDecade(model: HarleyModel, decade?: string): boolean {
  if (!decade || decade === "all") {
    return true;
  }

  const start = Number(decade);
  const end = start + 9;
  return modelOverlapsEra(model, start, end);
}

export function modelMatchesFilters(model: HarleyModel, filters: Filters): boolean {
  const era = filters.eraId && filters.eraId !== "all" ? eras.find((item) => item.id === filters.eraId) : undefined;

  return (
    modelMatchesSearch(model, filters.search) &&
    (!era || modelOverlapsEra(model, era.startYear, era.endYear)) &&
    modelOverlapsDecade(model, filters.decade) &&
    (!filters.modelFamily || filters.modelFamily === "all" || model.modelFamily === filters.modelFamily) &&
    (!filters.engineFamily || filters.engineFamily === "all" || model.engineFamilies.includes(filters.engineFamily)) &&
    (!filters.motorcycleType || filters.motorcycleType === "all" || model.motorcycleType === filters.motorcycleType) &&
    (!filters.currentlyProducedOnly || isCurrentlyProduced(model))
  );
}

export function getAvailableDecades(models: HarleyModel[]): string[] {
  const earliest = Math.min(...models.map((model) => model.productionStartYear));
  const latest = new Date().getFullYear();
  const firstDecade = Math.floor(earliest / 10) * 10;
  const lastDecade = Math.floor(latest / 10) * 10;
  const decades: string[] = [];

  for (let decade = firstDecade; decade <= lastDecade; decade += 10) {
    decades.push(String(decade));
  }

  return decades;
}
