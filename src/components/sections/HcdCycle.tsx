import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    key: "context",
    num: "01",
    title: "Nutzungskontext verstehen",
    short: "Wer? Was? Wo? Womit?",
    body:
      "Echte Nutzer in echten Situationen beobachten. Aufgaben, Ziele, Geräte, Umgebung, Stress. Methoden: Kontextinterview, Beobachtung, Master-Apprentice.",
    out: "Nutzungskontextbeschreibung, Personas, User Journeys",
  },
  {
    key: "req",
    num: "02",
    title: "Nutzungsanforderungen festlegen",
    short: "Was muss das System können?",
    body:
      "Aus dem Kontext werden konkrete Anforderungen: 'Der Benutzer muss X tun können, um Y zu erreichen.' Keine Lösungen, sondern Bedürfnisse.",
    out: "Erfordernisse, Nutzungsanforderungen, Nutzungsszenarien",
  },
  {
    key: "design",
    num: "03",
    title: "Gestaltungslösungen entwickeln",
    short: "Wie sieht die Lösung aus?",
    body:
      "Skizzen, Wireframes, Prototypen — vom Groben ins Feine. Mehrere Varianten parallel. Regeln: 7 Dialogprinzipien, Heuristiken, Konsistenz.",
    out: "Konzepte, Wireframes, Klick-Prototypen, finales UI",
  },
  {
    key: "eval",
    num: "04",
    title: "Evaluieren",
    short: "Funktioniert es wirklich?",
    body:
      "Mit echten Nutzern testen — schon ab dem ersten Papier-Prototyp. Findings fließen zurück. Methoden: Usability-Test, Inspektion, Befragung.",
    out: "Findings, To-dos für die nächste Iteration",
  },
];

export function HcdCycle() {
  const [active, setActive] = useState(0);
  const a = STEPS[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
      {/* Circle */}
      <div className="relative aspect-square w-full max-w-[460px] mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          {STEPS.map((_, i) => {
            const total = STEPS.length;
            const gap = 0.04;
            const seg = (Math.PI * 2) / total - gap;
            const start = i * ((Math.PI * 2) / total) + gap / 2;
            const end = start + seg;
            const r = 80;
            const cx = 100, cy = 100;
            const x1 = cx + Math.cos(start) * r;
            const y1 = cy + Math.sin(start) * r;
            const x2 = cx + Math.cos(end) * r;
            const y2 = cy + Math.sin(end) * r;
            const large = seg > Math.PI ? 1 : 0;
            const isActive = i === active;
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
                stroke={isActive ? "oklch(0.88 0.22 130)" : "oklch(0.4 0.02 260)"}
                strokeWidth={isActive ? 14 : 10}
                strokeLinecap="round"
                fill="none"
                onClick={() => setActive(i)}
                className="cursor-pointer transition-all"
                style={{
                  filter: isActive ? "drop-shadow(0 0 12px oklch(0.88 0.22 130 / 0.6))" : undefined,
                }}
              />
            );
          })}
          {/* arrow heads to imply flow */}
          {STEPS.map((_, i) => {
            const total = STEPS.length;
            const angle = (i + 1) * ((Math.PI * 2) / total) - 0.05;
            const r = 80;
            const x = 100 + Math.cos(angle) * r;
            const y = 100 + Math.sin(angle) * r;
            return (
              <circle key={i} cx={x} cy={y} r={3} fill="oklch(0.88 0.22 130)" opacity={i === active ? 1 : 0.3} />
            );
          })}
        </svg>
        {/* Center */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-center">
            <div className="font-mono-label text-muted-foreground">ISO 9241-210</div>
            <div className="font-display text-2xl mt-1">HCD-Kreislauf</div>
            <div className="text-xs text-muted-foreground mt-2">iterativ, bis es passt</div>
          </div>
        </div>
        {/* Step labels around */}
        {STEPS.map((s, i) => {
          const total = STEPS.length;
          const angle = i * ((Math.PI * 2) / total) + Math.PI / total - Math.PI / 2;
          const r = 52;
          const x = 50 + (Math.cos(angle) * r) / 2;
          const y = 50 + (Math.sin(angle) * r) / 2;
          return (
            <button
              key={s.key}
              onClick={() => setActive(i)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 font-mono-label transition ${
                i === active ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {s.num}
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div>
        <div className="flex gap-2 mb-6 flex-wrap">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setActive(i)}
              className={`font-mono-label rounded-full border px-3 py-2 transition ${
                i === active
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              {s.num} · {s.short}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={a.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-display-md mb-4">{a.title}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{a.body}</p>
            <div className="mt-6 rounded-xl border border-border bg-surface p-5">
              <div className="font-mono-label text-accent mb-2">Ergebnisse</div>
              <div className="text-sm text-foreground">{a.out}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
