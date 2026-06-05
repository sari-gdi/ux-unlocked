import { useEffect, useRef, useState } from "react";

type Props = {
  before: { title: string; lines: string[] };
  after: { title: string; lines: string[] };
};

export function BeforeAfter({ before, after }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const move = (clientX: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(4, Math.min(96, p)));
    };
    const onMove = (e: MouseEvent) => dragging.current && move(e.clientX);
    const onTouch = (e: TouchEvent) =>
      dragging.current && e.touches[0] && move(e.touches[0].clientX);
    const stop = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface select-none"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
      tabIndex={0}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-label="Vorher Nachher Vergleich"
    >
      {/* AFTER (background, right) */}
      <Panel
        title={after.title}
        lines={after.lines}
        variant="after"
        tag="MIT HCD"
      />
      {/* BEFORE (clipped, left) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Panel
          title={before.title}
          lines={before.lines}
          variant="before"
          tag="OHNE HCD"
        />
      </div>
      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-px bg-accent z-20 pointer-events-none"
        style={{ left: `${pos}%` }}
      />
      <button
        type="button"
        onMouseDown={() => (dragging.current = true)}
        onTouchStart={() => (dragging.current = true)}
        className="absolute z-30 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_0_30px_oklch(0.88_0.22_130/0.4)] top-1/2"
        style={{ left: `${pos}%` }}
        aria-label="Slider ziehen"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
        </svg>
      </button>
    </div>
  );
}

function Panel({
  title,
  lines,
  variant,
  tag,
}: {
  title: string;
  lines: string[];
  variant: "before" | "after";
  tag: string;
}) {
  const isBefore = variant === "before";
  return (
    <div
      className={`absolute inset-0 flex flex-col gap-4 p-6 sm:p-10 ${
        isBefore ? "bg-[oklch(0.22_0.02_30)]" : "bg-surface-2"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`font-mono-label rounded-full px-3 py-1 ${
            isBefore
              ? "bg-[oklch(0.65_0.22_25/0.15)] text-[oklch(0.78_0.18_30)]"
              : "bg-accent/15 text-accent"
          }`}
        >
          {tag}
        </span>
      </div>
      <h3 className="text-display-md text-foreground">{title}</h3>
      <ul className="mt-auto space-y-2 text-sm sm:text-base text-muted-foreground">
        {lines.map((l, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={isBefore ? "text-[oklch(0.78_0.18_30)]" : "text-accent"}>
              {isBefore ? "✕" : "✓"}
            </span>
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
