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

    if (typeof window === "undefined") {
      return 0;
    }

    const storageKey = `harley-image-index:${hashCandidates(candidates)}`;
    const previousIndex = Number(window.localStorage.getItem(storageKey) ?? "-1");
    const nextIndex = Number.isFinite(previousIndex) ? (previousIndex + 1) % candidates.length : 0;
    window.localStorage.setItem(storageKey, String(nextIndex));

    return nextIndex;
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

function hashCandidates(candidates: string[]): string {
  const value = candidates.join("|");
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}
