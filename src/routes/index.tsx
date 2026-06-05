import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Quiz } from "@/components/sections/Quiz";
import { HcdCycle } from "@/components/sections/HcdCycle";
import { PersonaBuilder } from "@/components/sections/PersonaBuilder";
import { EmpathyMap } from "@/components/sections/EmpathyMap";
import { Glossary } from "@/components/sections/Glossary";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Was zur Hölle ist HCD? — Ein 10-Minuten-Crashkurs" },
      {
        name: "description",
        content:
          "Human-Centred Design verständlich erklärt für alle im Team. Mit Quiz, Persona-Generator und Vorher/Nachher-Vergleich.",
      },
    ],
  }),
  component: HcdLanding,
});

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "aha", label: "Aha" },
  { id: "venn", label: "UX vs HCD" },
  { id: "quiz", label: "Quiz" },
  { id: "cycle", label: "Kreislauf" },
  { id: "methods", label: "Methoden" },
  { id: "why", label: "Warum" },
  { id: "glossar", label: "Glossar" },
  { id: "outro", label: "Outro" },
];

function HcdLanding() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // keyboard nav: arrow right/down -> next section
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowDown" && e.key !== "ArrowLeft" && e.key !== "ArrowUp") return;
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      const i = SECTIONS.findIndex((s) => s.id === active);
      const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
      const next = SECTIONS[i + dir];
      if (next) {
        e.preventDefault();
        document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <main className="relative">
      {/* Side rail */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`group flex items-center gap-3 font-mono-label transition ${
              active === s.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className={`h-px transition-all ${
                active === s.id ? "w-10 bg-accent" : "w-4 bg-border group-hover:w-6"
              }`}
            />
            <span className={active === s.id ? "" : "opacity-0 group-hover:opacity-100 transition"}>
              {s.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-background/60 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between font-mono-label">
          <span className="text-foreground">HCD · 10 min</span>
          <span className="text-muted-foreground hidden sm:block">
            Press <kbd className="rounded border border-border px-1.5 py-0.5">→</kbd> to advance
          </span>
        </div>
      </header>

      <Hero />
      <Aha />
      <Venn />
      <SectionShell id="quiz" kicker="03 · Test dich selbst" title="Bist du sicher, dass du's weißt?">
        <Quiz />
      </SectionShell>
      <SectionShell
        id="cycle"
        kicker="04 · ISO 9241-210"
        title="HCD ist ein Kreislauf — kein Wasserfall."
      >
        <HcdCycle />
      </SectionShell>
      <Methods />
      <Why />
      <SectionShell
        id="glossar"
        kicker="07 · Cheat-Sheet"
        title="10 Begriffe, die ab jetzt sitzen."
      >
        <Glossary />
      </SectionShell>
      <Outro />
    </main>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="intro"
      ref={ref}
      className="relative min-h-screen flex items-center px-6 pt-20 grain-bg overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono-label text-accent mb-8"
        >
          ◍ Ein 10-Minuten-Crashkurs für alle, die nicht Designer sind
        </motion.div>

        <h1 className="text-display-xl">
          <span className="block">​Was zur</span>
          <span className="block">
            Hölle ist{" "}
            <span className="text-accent italic font-light">HCD</span>?
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 max-w-2xl text-xl sm:text-2xl text-muted-foreground leading-relaxed"
        >
          UX kennen alle. HCD klingt nach Zertifikatslehrgang.
          Ist es auch — aber{" "}
          <span className="text-foreground">in 10 Minuten</span> wissen wir, was
          dahinter steckt, warum das Team davon profitiert und wie sich
          UX, Usability und HCD voneinander unterscheiden.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 flex items-center gap-6 flex-wrap"
        >
          <a
            href="#aha"
            className="font-mono-label rounded-full bg-accent text-accent-foreground px-6 py-4 hover:scale-105 transition"
          >
            Los geht's ↓
          </a>
          <div className="font-mono-label text-muted-foreground">
            Scrollen · oder Pfeiltasten benutzen
          </div>
        </motion.div>
      </motion.div>

      {/* Big background type */}
      <div
        aria-hidden
        className="absolute -bottom-20 -right-10 text-[20rem] font-display text-accent/[0.04] leading-none pointer-events-none select-none"
      >
        HCD
      </div>
    </section>
  );
}

function Aha() {
  return (
    <SectionShell
      id="aha"
      kicker="01 · Der Aha-Moment"
      title="Erst gestalten wir für uns. Dann für die Anderen."
    >
      <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        Ohne HCD bauen Teams das, was sie selbst gut finden. Mit HCD bauen sie
        das, was die Leute da draußen wirklich brauchen. Zieh den Slider.
      </p>
      <BeforeAfter
        before={{
          title: "Formular für „uns Profis“",
          lines: [
            "Fachjargon ohne Erklärung",
            "12 Pflichtfelder ohne Priorisierung",
            "Fehlermeldungen wie „Error 422“",
            "Kein Hinweis, wie lange es dauert",
          ],
        }}
        after={{
          title: "Formular für echte Menschen",
          lines: [
            "Klare Sprache, ein Schritt pro Bildschirm",
            "Inline-Validierung mit Tipp",
            "„Noch 2 Schritte — ca. 1 Minute“",
            "Speichert automatisch zwischen",
          ],
        }}
      />
    </SectionShell>
  );
}

function Venn() {
  return (
    <SectionShell
      id="venn"
      kicker="02 · Begriffsklärung"
      title="UX, Usability, HCD — was ist was?"
    >
      <div className="grid gap-6 md:grid-cols-3">
        <ConceptCard
          tag="Das Erlebnis"
          title="UX"
          body="Alle Wahrnehmungen und Reaktionen vor, während und nach der Nutzung. Schließt Marke, Erwartung, Emotion ein."
          example="„Ich hab mich gefreut, als die Bestätigungsmail kam — das war freundlich formuliert.“"
        />
        <ConceptCard
          tag="Die Eigenschaft"
          title="Usability"
          body="Wie effektiv, effizient und zufriedenstellend ein konkretes System für eine bestimmte Aufgabe nutzbar ist."
          example="„Ich hab den Termin in 30 Sekunden gebucht, ohne nachdenken zu müssen.“"
          highlight
        />
        <ConceptCard
          tag="Das Vorgehen"
          title="HCD"
          body="Der iterative Prozess, der Usability und UX produziert. Verstehen → Anfordern → Gestalten → Evaluieren."
          example="„Wir haben 5 Nutzer beobachtet, das Konzept dreimal überarbeitet — dann ging's live.“"
        />
      </div>
      <div className="mt-10 rounded-2xl bg-surface border border-border p-6 font-mono text-sm text-muted-foreground">
        <span className="text-accent">tldr;</span> UX ist das Ergebnis. Usability
        ist eine messbare Eigenschaft davon. HCD ist die Methode, mit der wir es
        bauen.
      </div>
    </SectionShell>
  );
}

function ConceptCard({
  tag,
  title,
  body,
  example,
  highlight,
}: {
  tag: string;
  title: string;
  body: string;
  example: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border p-8 ${
        highlight
          ? "border-accent/40 bg-accent/[0.04]"
          : "border-border bg-surface"
      }`}
    >
      <div className="font-mono-label text-accent mb-3">{tag}</div>
      <div className="text-display-md mb-4">{title}</div>
      <p className="text-muted-foreground mb-6 leading-relaxed">{body}</p>
      <div className="text-sm text-foreground/80 italic border-l-2 border-accent/40 pl-4">
        {example}
      </div>
    </motion.div>
  );
}

function Methods() {
  return (
    <SectionShell
      id="methods"
      kicker="05 · Methoden zum Anfassen"
      title="Zwei Klassiker, die jeder kennen sollte."
    >
      <div className="space-y-20">
        <div>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono-label text-accent">A · Persona</span>
            <span className="text-muted-foreground text-sm">
              Verdichtetes Nutzerwissen in eine konkrete Figur.
            </span>
          </div>
          <PersonaBuilder />
        </div>

        <div>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono-label text-accent">B · Empathy Map</span>
            <span className="text-muted-foreground text-sm">
              Was sagt, denkt, tut und fühlt unsere Persona im konkreten Moment?
            </span>
          </div>
          <EmpathyMap />
        </div>
      </div>
    </SectionShell>
  );
}

const STATS = [
  {
    n: "100×",
    title: "Bug-Kosten",
    body: "Ein UX-Problem, das im Konzept gefunden wird, ist bis zu 100× günstiger zu beheben als nach Launch.",
  },
  {
    n: "5",
    title: "Nutzer",
    body: "Reichen bei einem Usability-Test schon aus, um die wichtigsten 80% der Probleme zu finden.",
  },
  {
    n: "1×",
    title: "Wahrheit",
    body: "Personas und User Journeys schaffen eine gemeinsame Sprache — Projektmanagement, Dev und Design reden plötzlich vom selben Menschen.",
  },
];

function Why() {
  return (
    <SectionShell
      id="why"
      kicker="06 · Warum tun wir uns das an?"
      title="Drei Zahlen, drei Gründe."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-surface p-8"
          >
            <div className="text-display-lg text-accent leading-none">{s.n}</div>
            <div className="font-mono-label text-muted-foreground mt-6">
              {s.title}
            </div>
            <p className="mt-3 text-foreground/90 leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function Outro() {
  const [copied, setCopied] = useState(false);
  return (
    <section
      id="outro"
      className="relative min-h-screen flex items-center px-6 py-32 grain-bg"
    >
      <div className="mx-auto max-w-5xl w-full text-center">
        <div className="font-mono-label text-accent mb-8">08 · Schluss</div>
        <h2 className="text-display-xl">
          Jetzt weißt du, was{" "}
          <span className="text-accent italic font-light">HCD</span> ist.
        </h2>
        <p className="mt-10 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Beim nächsten Projekt-Kickoff musst du nicht mehr Bingo spielen, wenn
          jemand „User Journey“ sagt. Und wenn du tiefer einsteigen willst:
          das offizielle CPUX-F Curriculum gibt's frei auf{" "}
          <a
            href="https://uxqb.org"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline underline-offset-4"
          >
            uxqb.org
          </a>
          .
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="font-mono-label rounded-full border border-border px-6 py-4 hover:border-accent hover:text-accent transition"
          >
            {copied ? "✓ Link kopiert" : "Link teilen"}
          </button>
          <a
            href="#intro"
            className="font-mono-label rounded-full bg-accent text-accent-foreground px-6 py-4 hover:scale-105 transition"
          >
            Nochmal von vorne ↑
          </a>
        </div>

        <div className="mt-24 pt-10 border-t border-border font-mono text-xs text-muted-foreground flex justify-between flex-wrap gap-4">
          <span>Quellen: UXQB CPUX-F Curriculum v4.01 · ISO 9241-210</span>
          <span>Made with care, not with magic.</span>
        </div>
      </div>
    </section>
  );
}

function SectionShell({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative px-6 py-32 sm:py-40 scroll-mt-24 border-t border-border/50"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="font-mono-label text-accent mb-6">{kicker}</div>
          <h2 className="text-display-lg max-w-4xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
