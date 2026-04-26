import { SearchX } from "lucide-react";

type EmptyStateProps = {
  onClear: () => void;
};

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <section className="rounded-lg border border-brass-400/20 bg-iron-850/80 p-8 text-center shadow-brass">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brass-400/30 bg-brass-400/10 text-brass-300">
        <SearchX size={26} />
      </div>
      <h2 className="mt-5 font-display text-2xl text-parchment-100">No models found</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-parchment-200/70">
        Try broadening the search or clearing one of the filters. The dataset is a strong starter set and is built to grow.
      </p>
      <button
        className="mt-5 rounded-md border border-brass-400/40 bg-brass-400/10 px-4 py-2 text-sm font-semibold text-brass-300 transition hover:bg-brass-400/20"
        onClick={onClear}
        type="button"
      >
        Clear filters
      </button>
    </section>
  );
}
