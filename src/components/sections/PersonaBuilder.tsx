import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const NAMES = ["Anna", "Jonas", "Pia", "Marco", "Lina", "Tobias", "Selma", "Ben"];
const ROLES_TECH = [
  ["Digital Native", "lebt im Browser", "Hat 3 Side-Projects"],
  ["Solider Office-User", "Slack, Office, Notion", "Klickt sich durch"],
  ["Tech-skeptisch", "ruft die Tochter an", "Hasst Updates"],
];
const GOALS = [
  {
    label: "Zeit sparen",
    needs: ["Schnellstmöglich zum Ergebnis", "Keine Klick-Orgien", "Smart defaults"],
    pain: ["Onboarding mit 12 Schritten", "Tooltips, die nichts erklären"],
  },
  {
    label: "Sicher entscheiden",
    needs: ["Transparente Optionen", "Vergleichbarkeit", "Vertrauen aufbauen"],
    pain: ["Versteckte Kosten", "Fachjargon", "Keine Belege"],
  },
  {
    label: "Inspiration finden",
    needs: ["Stöbern können", "Schöne Übersicht", "Empfehlungen"],
    pain: ["Sucht ohne Filter", "Unendliches Scrollen ohne Anker"],
  },
];

export function PersonaBuilder() {
  const [age, setAge] = useState(34);
  const [tech, setTech] = useState(1);
  const [goal, setGoal] = useState(0);

  const persona = useMemo(() => {
    const name = NAMES[(age + tech * 3 + goal) % NAMES.length];
    const techProfile = ROLES_TECH[tech];
    const g = GOALS[goal];
    return { name, age, techProfile, goal: g };
  }, [age, tech, goal]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Controls */}
      <div className="rounded-3xl border border-border bg-surface p-8">
        <div className="font-mono-label text-accent mb-6">Stellschrauben</div>

        <Field label="Alter" value={`${age} Jahre`}>
          <input
            type="range"
            min={18}
            max={75}
            value={age}
            onChange={(e) => setAge(+e.target.value)}
            className="w-full accent-[oklch(0.88_0.22_130)]"
          />
        </Field>

        <Field label="Tech-Affinität" value={ROLES_TECH[tech][0]}>
          <input
            type="range"
            min={0}
            max={2}
            value={tech}
            onChange={(e) => setTech(+e.target.value)}
            className="w-full accent-[oklch(0.88_0.22_130)]"
          />
        </Field>

        <div className="mt-6">
          <div className="font-mono-label text-muted-foreground mb-3">Primäres Ziel</div>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((g, i) => (
              <button
                key={g.label}
                onClick={() => setGoal(i)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  goal === i
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Persona card */}
      <motion.div
        key={`${persona.name}-${tech}-${goal}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl border border-accent/40 bg-[linear-gradient(135deg,oklch(0.22_0.014_260)_0%,oklch(0.18_0.012_260)_100%)] p-8 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="grid place-items-center h-16 w-16 rounded-full bg-accent text-accent-foreground font-display text-2xl">
              {persona.name[0]}
            </div>
            <div>
              <div className="font-mono-label text-muted-foreground">Persona</div>
              <div className="text-display-md leading-none mt-1">
                {persona.name}, {persona.age}
              </div>
            </div>
          </div>

          <div className="grid gap-4 text-sm">
            <Row title="Profil">
              <ul className="space-y-1">
                {persona.techProfile.map((t) => (
                  <li key={t} className="text-muted-foreground">— {t}</li>
                ))}
              </ul>
            </Row>
            <Row title="Möchte">
              <ul className="space-y-1">
                {persona.goal.needs.map((n) => (
                  <li key={n} className="text-foreground">✓ {n}</li>
                ))}
              </ul>
            </Row>
            <Row title="Frustriert sich über">
              <ul className="space-y-1">
                {persona.goal.pain.map((n) => (
                  <li key={n} className="text-[oklch(0.78_0.18_30)]">✕ {n}</li>
                ))}
              </ul>
            </Row>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-end justify-between mb-2">
        <span className="font-mono-label text-muted-foreground">{label}</span>
        <span className="font-display text-lg">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="font-mono-label text-accent mb-2">{title}</div>
      {children}
    </div>
  );
}
