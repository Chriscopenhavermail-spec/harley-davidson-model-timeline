import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import type { Spin360Asset } from "../types/harley";
import { useRefreshImage } from "../utils/images";

type Spin360ViewerProps = {
  modelName: string;
  imageUrl?: string;
  imageUrls?: string[];
  imageCredit?: string;
  imageLicense?: string;
  imageSourceUrl?: string;
  spin360?: Spin360Asset;
};

export default function Spin360Viewer({
  imageCredit,
  imageLicense,
  imageSourceUrl,
  imageUrl,
  imageUrls,
  modelName,
  spin360,
}: Spin360ViewerProps) {
  const frames = useMemo(() => (spin360?.available && spin360.frames?.length ? spin360.frames : []), [spin360]);
  const hasFrames = frames.length > 0;
  const [staticImageUrl, markStaticImageFailed] = useRefreshImage(imageUrls?.length ? imageUrls : imageUrl ? [imageUrl] : []);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [isAutoplaying, setIsAutoplaying] = useState(false);

  const activeImage = hasFrames ? frames[currentFrameIndex] : staticImageUrl;

  const step = (direction: 1 | -1) => {
    if (!hasFrames) {
      return;
    }

    setCurrentFrameIndex((current) => (current + direction + frames.length) % frames.length);
  };

  useEffect(() => {
    if (!isAutoplaying || !hasFrames) {
      return;
    }

    const timer = window.setInterval(() => step(1), 180);
    return () => window.clearInterval(timer);
  }, [hasFrames, isAutoplaying, frames.length]);

  const handlePointerMove = (clientX: number) => {
    if (!isDragging || startX === null || !hasFrames) {
      return;
    }

    const delta = clientX - startX;
    if (Math.abs(delta) < 14) {
      return;
    }

    step(delta > 0 ? 1 : -1);
    setStartX(clientX);
  };

  return (
    <figure className="overflow-hidden rounded-lg border border-brass-400/20 bg-iron-950 shadow-brass">
      <div
        className={`relative aspect-[4/3] select-none overflow-hidden ${hasFrames ? "cursor-grab touch-none active:cursor-grabbing" : ""}`}
        onMouseDown={(event) => {
          setIsDragging(true);
          setStartX(event.clientX);
        }}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={(event) => handlePointerMove(event.clientX)}
        onMouseUp={() => setIsDragging(false)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={(event) => handlePointerMove(event.touches[0]?.clientX ?? 0)}
        onTouchStart={(event) => {
          setIsDragging(true);
          setStartX(event.touches[0]?.clientX ?? null);
        }}
      >
        {activeImage ? (
          <img alt={modelName} className="h-full w-full object-cover" draggable={false} onError={markStaticImageFailed} src={activeImage} />
        ) : (
          <div className="motorcycle-placeholder h-full w-full">
            <span>Motorcycle image not yet added</span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-iron-950/85 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full border border-brass-400/30 bg-iron-950/85 px-3 py-1 text-xs font-bold text-brass-300">
          {hasFrames ? `360 view / frame ${currentFrameIndex + 1} of ${frames.length}` : "Static reference image"}
        </div>
      </div>

      <figcaption className="flex flex-col gap-3 border-t border-brass-400/15 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs leading-5 text-parchment-200/60">
          {hasFrames ? "Drag left or right to rotate." : spin360?.available ? "360 frames missing; using fallback image." : "360 assets can be added later."}
          {(imageCredit || imageLicense || imageSourceUrl) && (
            <span className="block">
              {imageCredit && `Credit: ${imageCredit}. `}
              {imageLicense && `License: ${imageLicense}. `}
              {imageSourceUrl && (
                <a className="text-brass-300 underline decoration-brass-300/40" href={imageSourceUrl} rel="noreferrer" target="_blank">
                  Source
                </a>
              )}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <IconButton disabled={!hasFrames} label="Previous frame" onClick={() => step(-1)}>
            <ChevronLeft size={18} />
          </IconButton>
          <IconButton disabled={!hasFrames} label={isAutoplaying ? "Pause spin" : "Autoplay spin"} onClick={() => setIsAutoplaying((value) => !value)}>
            {isAutoplaying ? <Pause size={18} /> : <Play size={18} />}
          </IconButton>
          <IconButton disabled={!hasFrames} label="Reset view" onClick={() => setCurrentFrameIndex(0)}>
            <RotateCcw size={18} />
          </IconButton>
          <IconButton disabled={!hasFrames} label="Next frame" onClick={() => step(1)}>
            <ChevronRight size={18} />
          </IconButton>
        </div>
      </figcaption>
    </figure>
  );
}

function IconButton({
  children,
  disabled,
  label,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-brass-400/30 text-brass-300 transition hover:bg-brass-400/10 disabled:cursor-not-allowed disabled:opacity-40"
      disabled={disabled}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}
