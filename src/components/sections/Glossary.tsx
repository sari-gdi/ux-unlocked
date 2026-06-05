import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TERMS = [
  {
    t: "Human-Centred Design (HCD)",
    d: "Iterativer Gestaltungsansatz nach ISO 9241-210, der Benutzer in den Mittelpunkt stellt.",
  },
  {
    t: "User Experience (UX)",
    d: "Alle Wahrnehmungen und Reaktionen einer Person vor, während und nach der Nutzung eines Produkts.",
  },
  {
    t: "Usability",
    d: "Ausmaß, in dem ein System effektiv, effizient und zufriedenstellend genutzt werden kann.",
  },
  {
    t: "Nutzungskontext",
    d: "Benutzer + Ziele + Aufgaben + Ressourcen + Umgebung. Die vollständige Situation der Nutzung.",
  },
  {
    t: "Persona",
    d: "Konkretes Modell einer typischen Benutzergruppe — mit Namen, Zielen, Verhaltensweisen.",
  },
  {
    t: "User Journey",
    d: "Schrittfolge, die eine Persona durchläuft, um ein Ziel zu erreichen — inkl. Touchpoints und Emotionen.",
  },
  {
    t: "Nutzungsanforderung",
    d: "„Der Benutzer muss X tun können, um Y zu erreichen.“ — Bedürfnis, keine Lösung.",
  },
  {
    t: "Prototyp",
    d: "Vorläufige Form einer Lösung — von Papier bis klickbar — zum Testen, bevor entwickelt wird.",
  },
  {
    t: "Usability-Test",
    d: "Echte Nutzer lösen reale Aufgaben mit dem Produkt — beobachtet, nicht befragt.",
  },
  {
    t: "Heuristische Evaluation",
    d: "Experten prüfen ein Interface gegen anerkannte Regeln (z.B. Nielsen-Heuristiken).",
  },
];

export function Glossary() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-border">
      {TERMS.map((term, i) => {
        const isOpen = open === i;
        return (
          <div key={term.t} className="border-b border-border">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-6 text-left group"
            >
              <span className="flex items-center gap-6">
                <span className="font-mono-label text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xl sm:text-2xl font-display group-hover:text-accent transition">
                  {term.t}
                </span>
              </span>
              <span
                className={`text-accent text-2xl transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pl-[4.5rem] pr-12 text-muted-foreground text-lg max-w-3xl">
                    {term.d}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
