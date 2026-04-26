import { useMemo, useState } from "react";
import type { HarleyModel } from "../types/harley";

export function getModelImageCandidates(model: Pick<HarleyModel, "imageUrl" | "imageUrls">): string[] {
  return Array.from(new Set([...(model.imageUrls ?? []), model.imageUrl].filter(Boolean) as string[]));
}

export function useRefreshImage(candidates: string[]): [string | undefined, () => void] {
  const initialIndex = useMemo(() => {
    if (candidates.length === 0) {
      return 0;
    }

    return Math.floor(Math.random() * candidates.length);
  }, [candidates.join("|")]);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const availableCandidates = candidates.filter((candidate) => !failedImages.has(candidate));
  const image = availableCandidates.length ? availableCandidates[initialIndex % availableCandidates.length] : undefined;

  const markFailed = () => {
    if (!image) {
      return;
    }

    setFailedImages((current) => new Set(current).add(image));
  };

  return [image, markFailed];
}
