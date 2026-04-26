import type { HarleyModel } from "../types/harley";

type ImageGalleryProps = {
  model: HarleyModel;
};

export default function ImageGallery({ model }: ImageGalleryProps) {
  const periodImages = model.changeTimeline.filter((period) => period.imageUrl);

  if (!model.imageUrl && periodImages.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="font-display text-2xl text-parchment-100">Image Notes</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {model.imageUrl && (
          <img alt={model.name} className="aspect-[16/10] rounded-md border border-brass-400/20 object-cover" src={model.imageUrl} />
        )}
        {periodImages.map((period) => (
          <img
            alt={`${model.name} ${period.title}`}
            className="aspect-[16/10] rounded-md border border-brass-400/20 object-cover"
            key={period.id}
            src={period.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
