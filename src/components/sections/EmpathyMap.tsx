import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUADRANTS = [
  {
    key: "says",
    title: "Sagt",
    hint: "Zitate, O-Töne",
    pool: [
      "„Das hab ich noch nie gemacht.“",
      "„Wo ist hier der Login?“",
      "„Macht meine Kollegin sonst.“",
      "„Geht das auch schneller?“",
    ],
  },
  {
    key: "thinks",
    title: "Denkt",
    hint: "Annahmen, Vorbehalte",
    pool: [
      "Ich darf nichts kaputt machen.",
      "Das wird sicher kompliziert.",
      "Hoffentlich fragt mich keiner.",
      "Bin ich zu doof dafür?",
    ],
  },
  {
    key: "does",
    title: "Tut",
    hint: "Beobachtbares Verhalten",
    pool: [
      "Öffnet 5 Tabs parallel.",
      "Sucht via Google statt im Menü.",
      "Macht Screenshots zur Sicherheit.",
      "Klickt mehrmals auf denselben Button.",
    ],
  },
  {
    key: "feels",
    title: "Fühlt",
    hint: "Emotionen, Stress",
    pool: [
      "Frustration bei langen Formularen.",
      "Erleichterung bei klarem Feedback.",
      "Unsicherheit ohne 'Zurück'.",
      "Stolz beim ersten Erfolg.",
    ],
  },
];

export function EmpathyMap() {
  const [items, setItems] = useState<Record<string, string[]>>({
    says: [],
    thinks: [],
    does: [],
    feels: [],
  });

  const add = (key: string, pool: string[]) => {
    const used = items[key];
    const available = pool.filter((p) => !used.includes(p));
    if (available.length === 0) return;
    const next = available[Math.floor(Math.random() * available.length)];
    setItems({ ...items, [key]: [...used, next] });
  };

  const reset = () =>
    setItems({ says: [], thinks: [], does: [], feels: [] });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
        {QUADRANTS.map((q) => (
          <div
            key={q.key}
            className="rounded-2xl border border-border bg-surface p-6 min-h-[220px] flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-mono-label text-accent">{q.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{q.hint}</div>
              </div>
              <button
                onClick={() => add(q.key, q.pool)}
                className="h-8 w-8 grid place-items-center rounded-full border border-border text-accent hover:bg-accent hover:text-accent-foreground transition"
                aria-label={`In ${q.title} hinzufügen`}
              >
                +
              </button>
            </div>
            <ul className="space-y-2 text-sm">
              <AnimatePresence>
                {items[q.key].map((t) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg bg-surface-2 px-3 py-2 text-foreground"
                  >
                    {t}
                  </motion.li>
                ))}
              </AnimatePresence>
              {items[q.key].length === 0 && (
                <li className="text-muted-foreground/60 italic text-xs">
                  Klick + um ein Beispiel hinzuzufügen
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={reset}
          className="font-mono-label text-muted-foreground hover:text-accent transition"
        >
          ↺ Zurücksetzen
        </button>
      </div>
    </div>
  );
}
