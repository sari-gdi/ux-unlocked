## Ziel

Eine scrollbare One-Pager-Landingpage im Grand-Digital-Look, die deinen 10-Minuten-Vortrag trägt **und** als Blog-Beitrag auf der Agentur-Website lebt. Inhaltlich destilliert aus dem CPUX-F Curriculum + Schulungsunterlagen – Essenz + 4 spielbare Methoden-Demos.

## Design-Sprache (an grand-digital.de angelehnt)

- Hintergrund: tiefes Schwarz `oklch(0.14 0.01 260)`, Sektionen wechseln zu Off-Black für Rhythmus
- Akzent: knalliges Lime/Elektrisch-Grün `oklch(0.88 0.22 130)` (eigener Twist statt 1:1 Kopie)
- Typografie: Display sehr groß (clamp 64–160px), tight tracking, Mix aus Sans-Serif Display + Mono für Labels/Kicker
- Viel Whitespace, große Sektions-Cuts, subtile Scroll-Reveals (Framer Motion), Cursor-Glow, sticky Section-Labels links
- Keine Stock-Bilder; stattdessen typografische Hero-Treatments, animierte SVG-Diagramme, große Zahlen

## Seitenstruktur (scrollytelling)

```
1. Hero
   "Was zur Hölle ist HCD?" – riesige animierte Type, Untertitel, Scroll-Hint

2. Der Aha-Moment (Vorher/Nachher-Slider)
   Ein konkretes Interface-Beispiel: links "designed für uns selbst",
   rechts "designed für Nutzer". Draggable Split-Slider.

3. UX vs. Usability vs. HCD – das Venn
   Animierte SVG-Diagramme, die beim Scrollen ineinanderfließen.
   Klarstellung: UX = Erlebnis, Usability = Eigenschaft, HCD = Vorgehen.

4. Mini-Quiz "Bist du sicher, dass du's weißt?"
   3-4 Fragen ("Ist 'schönes Design' UX?"). Klick → Auflösung mit Mikro-Erklärung.
   Score am Ende. Eisbrecher für Live-Vortrag.

5. Der HCD-Kreislauf (ISO 9241-210)
   Interaktive Kreis-Visualisierung der 4 Aktivitäten:
   Kontext verstehen → Anforderungen → Designlösungen → Evaluation.
   Klick auf jedes Segment → Detail-Panel mit Beispiel.

6. Methoden-Spielwiese
   a) Persona-Generator: 3 Slider (Alter, Tech-Skill, Ziel) → erzeugt live eine Persona-Karte
   b) Empathy-Map: 4 Quadranten, Klick fügt Beispiel-Items hinzu

7. Warum sich das für uns lohnt
   3-4 Statements mit großen Zahlen (ROI, Fehlervermeidung, Team-Alignment).

8. Cheat-Sheet / Glossar
   Akkordeon mit den 10 wichtigsten CPUX-F-Begriffen – als Take-Away.

9. Outro / CTA
   "Lust auf mehr? Sprich mit [Name]." + Social-Share für Blogpost-Variante.
```

## Interaktionen im Detail

- **Vorher/Nachher-Slider**: draggable Divider, Touch + Maus, mit Tastatur-Support
- **Quiz**: Single-Choice, Antwort-Reveal mit Begründung, persistenter Score in `useState`
- **HCD-Kreislauf**: SVG mit 4 Segmenten, Hover-Glow, Klick öffnet inline Panel (kein Modal)
- **Persona-Generator**: 3 `<Slider>` → deterministische Persona aus Lookup-Table, animierter Übergang
- **Empathy-Map**: 2×2 Grid, jeder Quadrant ist droppable Liste mit "+ hinzufügen" Beispiel-Pool

## Vortrags-Tauglichkeit

- Tastatur-Shortcut `→` scrollt zur nächsten Sektion (snap-to-section optional)
- "Presenter Mode" via `?present` Query: versteckt Header/Footer, vergrößert Type nochmal
- Sektionen mit `scroll-margin-top` für saubere Sprünge
- Funktioniert ohne JS-Heavy-Setup – die Page selbst ist die Präsentation

## Technische Umsetzung

- Single Route `src/routes/index.tsx` (One-Pager) – Sektionen als eigenständige Komponenten in `src/components/sections/`
- Framer Motion für Scroll-Reveals + `useScroll`/`useTransform` für Parallax
- Design-Tokens in `src/styles.css` (`@theme` für `--color-bg`, `--color-accent`, `--font-display`, `--font-mono`)
- Fonts via Google Fonts: **Space Grotesk** (Display) + **JetBrains Mono** (Labels) – nah am Grand-Digital-Vibe
- SEO: ausführliche `head()` mit Title, Description, og:image (für Blog-Share)
- Keine Backend-Anbindung nötig (kein Cloud aktivieren)

## Inhalte (aus den PDFs)

Ich extrahiere konkret:
- HCD-Definition + 6 Prinzipien (ISO 9241-210)
- 4 HCD-Aktivitäten als Kreislauf
- Abgrenzungen UX/Usability/Accessibility/UI
- 10 Glossar-Kernbegriffe (Persona, User Journey, Usability-Test, Heuristik, …)
- 1-2 prägnante Zitate/Zahlen für Hero & Stats

## Was NICHT drin ist

- Kein klassischer Präsentations-Editor (Slides), kein Fullscreen-Reveal-Framework
- Keine zweite Route für Blog – die Landingpage IST der Blog
- Keine Bilder-Generierung im ersten Wurf (rein typo/SVG-getrieben, schneller & konsistenter)

## Lieferumfang Phase 1

Komplette Landingpage mit allen 9 Sektionen, allen 4 Interaktionen, polished Motion, vortragsfertig.
