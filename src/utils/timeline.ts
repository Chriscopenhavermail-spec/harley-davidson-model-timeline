import type { HarleyModel } from "../types/harley";

const PRESENT_YEAR = new Date().getFullYear();

export function getProductionYearsLabel(model: HarleyModel): string {
  const end = model.productionEndYear ?? "present";
  return `${model.productionStartYear}-${end === "present" ? "Present" : end}`;
}

export function isCurrentlyProduced(model: HarleyModel): boolean {
  return model.productionEndYear === "present";
}

export function getComparableEndYear(endYear?: number | "present"): number {
  if (!endYear || endYear === "present") {
    return PRESENT_YEAR;
  }

  return endYear;
}

export function modelOverlapsEra(
  model: HarleyModel,
  eraStart: number,
  eraEnd: number | "present",
): boolean {
  const modelEnd = getComparableEndYear(model.productionEndYear);
  const eraComparableEnd = getComparableEndYear(eraEnd);

  return model.productionStartYear <= eraComparableEnd && modelEnd >= eraStart;
}

export function getPeriodLabel(startYear: number, endYear?: number | "present"): string {
  if (!endYear) {
    return `${startYear}`;
  }

  return `${startYear}-${endYear === "present" ? "Present" : endYear}`;
}
