import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Q = {
  q: string;
  options: { label: string; correct: boolean }[];
  explain: string;
};

const QUESTIONS: Q[] = [
  {
    q: "Ein Button sieht wunderschön aus, aber niemand findet ihn. Das ist ein Problem von…",
    options: [
      { label: "UI Design", correct: false },
      { label: "Usability", correct: true },
      { label: "Branding", correct: false },
    ],
    explain:
      "Usability ist die Eigenschaft 'effektiv, effizient und zufriedenstellend nutzbar'. Schönheit ohne Auffindbarkeit ist ein Usability-Fail.",
  },
  {
    q: "User Experience ist…",
    options: [
      { label: "Nur das visuelle Design", correct: false },
      {
        label: "Alle Wahrnehmungen & Reaktionen vor, während und nach der Nutzung",
        correct: true,
      },
      { label: "Synonym für Usability", correct: false },
    ],
    explain:
      "UX umfasst Erwartungen, Emotionen, körperliche und mentale Reaktionen — vor, während UND nach der Nutzung. Usability ist nur ein Teil davon.",
  },
  {
    q: "HCD ist…",
    options: [
      { label: "Ein Tool wie Figma", correct: false },
      { label: "Ein iterativer Prozess (ISO 9241-210)", correct: true },
      { label: "Ein Job-Titel", correct: false },
    ],
    explain:
      "Human-Centred Design ist ein Vorgehen: verstehen → anfordern → gestalten → evaluieren, so lange bis es passt. Standardisiert in ISO 9241-210.",
  },
  {
    q: "Was passiert, wenn man im Projekt 'die Nutzer einbezieht'?",
    options: [
      { label: "Man fragt sie nach ihrer Lieblingsfarbe", correct: false },
      {
        label: "Man beobachtet sie bei realen Aufgaben in ihrem Kontext",
        correct: true,
      },
      { label: "Man schickt ein Newsletter-Formular", correct: false },
    ],
    explain:
      "HCD heißt: echte Nutzer bei echten Aufgaben in ihrem echten Kontext verstehen — Beobachtung schlägt Befragung.",
  },
];

export function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = QUESTIONS[i];

  const next = () => {
    if (i + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setI(i + 1);
      setPicked(null);
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8 sm:p-14 text-center">
        <div className="font-mono-label text-accent">Ergebnis</div>
        <div className="text-display-lg mt-4">
          {score} / {QUESTIONS.length}
        </div>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">
          {score === QUESTIONS.length
            ? "Volle Punktzahl. Du darfst jetzt jedem im Office HCD erklären."
            : score >= QUESTIONS.length / 2
            ? "Solide. Der Rest kommt gleich in den nächsten Sektionen."
            : "Kein Problem — genau dafür ist dieser Vortrag da."}
        </p>
        <button
          onClick={() => {
            setI(0);
            setPicked(null);
            setScore(0);
            setDone(false);
          }}
          className="mt-8 font-mono-label rounded-full border border-border px-5 py-3 hover:border-accent hover:text-accent transition"
        >
          Nochmal spielen
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-14">
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono-label text-muted-foreground">
          Frage {i + 1} / {QUESTIONS.length}
        </span>
        <div className="flex gap-1">
          {QUESTIONS.map((_, k) => (
            <span
              key={k}
              className={`h-1 w-8 rounded-full ${k <= i ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-display-md mb-8">{current.q}</h3>
          <div className="grid gap-3">
            {current.options.map((opt, k) => {
              const isPicked = picked === k;
              const reveal = picked !== null;
              const state = !reveal
                ? "idle"
                : opt.correct
                ? "correct"
                : isPicked
                ? "wrong"
                : "muted";
              return (
                <button
                  key={k}
                  disabled={reveal}
                  onClick={() => {
                    setPicked(k);
                    if (opt.correct) setScore((s) => s + 1);
                  }}
                  className={`text-left rounded-xl border px-5 py-4 transition flex items-center justify-between gap-4
                  ${state === "idle" ? "border-border hover:border-accent hover:bg-surface-2" : ""}
                  ${state === "correct" ? "border-accent bg-accent/10 text-foreground" : ""}
                  ${state === "wrong" ? "border-[oklch(0.65_0.22_25)] bg-[oklch(0.65_0.22_25/0.1)]" : ""}
                  ${state === "muted" ? "border-border opacity-40" : ""}`}
                >
                  <span>{opt.label}</span>
                  {state === "correct" && <span className="text-accent">✓</span>}
                  {state === "wrong" && <span className="text-[oklch(0.78_0.18_30)]">✕</span>}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 rounded-xl bg-surface-2 p-5 text-muted-foreground"
            >
              {current.explain}
              <div className="mt-4">
                <button
                  onClick={next}
                  className="font-mono-label rounded-full bg-accent px-5 py-3 text-accent-foreground hover:opacity-90 transition"
                >
                  {i + 1 >= QUESTIONS.length ? "Ergebnis →" : "Nächste Frage →"}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
