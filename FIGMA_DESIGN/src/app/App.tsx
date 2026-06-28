import { useState, useEffect } from "react"
import { ArrowUpRight, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"

// ─── typography shorthand styles ────────────────────────────────────────────
const D: React.CSSProperties = { fontFamily: "'Barlow Condensed', sans-serif" }
const M: React.CSSProperties = { fontFamily: "'DM Mono', monospace" }

// ─── grid overlay helper ─────────────────────────────────────────────────────
const GRID_BG: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(240,235,227,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,227,0.025) 1px, transparent 1px)",
  backgroundSize: "80px 80px",
}

// ─── data ────────────────────────────────────────────────────────────────────
const STATS = [
  { val: "340+", label: "Projects Delivered" },
  { val: "28", label: "Years of Excellence" },
  { val: "$4.2B", label: "Assets Constructed" },
  { val: "94%", label: "On-Time Completion" },
]

const SERVICES = [
  {
    num: "01",
    title: "Building Construction",
    sub: "Residential · Commercial · Industrial",
    desc: "From foundation to final finish — we execute complex builds with precision engineering, rigorous quality controls, and deep structural expertise across residential, commercial, and industrial typologies.",
    tags: ["Residential", "Commercial", "High-Rise", "Industrial", "Mixed-Use"],
  },
  {
    num: "02",
    title: "Land Development",
    sub: "Acquisition · Master Planning · Infrastructure",
    desc: "Strategic land acquisition, feasibility analysis, and master planning that transforms raw parcels into high-value developments. We navigate zoning, environmental compliance, and full infrastructure design.",
    tags: ["Site Analysis", "Master Planning", "Infrastructure", "Zoning & Permits"],
  },
  {
    num: "03",
    title: "Architecture",
    sub: "Design · Documentation · Interiors",
    desc: "Design that balances aesthetic ambition with functional precision. Our architectural practice operates at the intersection of form, material, and human experience — producing buildings that endure.",
    tags: ["Concept Design", "Schematic", "Construction Docs", "Interior Architecture"],
  },
  {
    num: "04",
    title: "Project Management",
    sub: "Scheduling · Cost Control · Oversight",
    desc: "End-to-end program management that keeps complex, multi-stakeholder projects on schedule and on budget. Real-time reporting, proactive risk management, and decisive leadership at every milestone.",
    tags: ["Scheduling", "Cost Control", "Risk Management", "Stakeholder Reporting"],
  },
  {
    num: "05",
    title: "Engineering Consultation",
    sub: "Structural · Civil · MEP",
    desc: "Deep engineering expertise available as standalone consultation or fully integrated within project delivery. We solve the hard problems early — before they become costly delays on site.",
    tags: ["Structural Engineering", "Civil Works", "MEP Systems", "Geotechnical"],
  },
]

const PROJECTS = [
  {
    id: "001",
    title: "Meridian Tower",
    location: "Dubai, UAE",
    year: "2024",
    type: "Commercial High-Rise",
    area: "84,000 m²",
    img: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=900&h=1200&fit=crop&auto=format",
  },
  {
    id: "002",
    title: "Harlow Quarter",
    location: "London, UK",
    year: "2023",
    type: "Mixed-Use Development",
    area: "32,000 m²",
    img: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=700&h=500&fit=crop&auto=format",
  },
  {
    id: "003",
    title: "Vantage Residences",
    location: "Sydney, AU",
    year: "2023",
    type: "Luxury Residential",
    area: "18,500 m²",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&h=500&fit=crop&auto=format",
  },
  {
    id: "004",
    title: "Sorell Industrial Park",
    location: "Amsterdam, NL",
    year: "2022",
    type: "Industrial Campus",
    area: "62,000 m²",
    img: "https://images.unsplash.com/photo-1567943183748-3a7542120c90?w=1400&h=700&fit=crop&auto=format",
  },
]

const PROCESS_STEPS = [
  { num: "01", phase: "Discovery", time: "Weeks 1–3", desc: "Site analysis, feasibility study, stakeholder alignment, scope definition, and initial risk assessment." },
  { num: "02", phase: "Design", time: "Weeks 4–16", desc: "Concept development, schematic design, engineering coordination, and full permit documentation." },
  { num: "03", phase: "Pre-Construction", time: "Weeks 17–24", desc: "Procurement strategy, contractor selection, value engineering, and detailed scheduling." },
  { num: "04", phase: "Construction", time: "Phase-Dependent", desc: "Site mobilization, phased execution, quality control inspections, and live progress reporting." },
  { num: "05", phase: "Delivery", time: "Final Phase", desc: "Commissioning, handover documentation, defect management, and post-occupancy review." },
]

const TESTIMONIALS = [
  {
    quote: "Structura didn't just build our headquarters — they built confidence. Every deadline met, every detail considered. The result is a building our people are genuinely proud to work in.",
    name: "Marcus Holt",
    role: "CEO, Vektor Capital",
    initials: "MH",
  },
  {
    quote: "When we hit a challenging soil condition mid-project, their engineering team had a solution on paper within 48 hours and implemented it without a single day of delay. That's the caliber we needed.",
    name: "Dr. Sarah Brennan",
    role: "Director of Estates, Northfield University",
    initials: "SB",
  },
  {
    quote: "A rare combination: architectural vision and construction muscle under one roof. Our mixed-use development came in 12% under budget and three weeks ahead of schedule.",
    name: "James Okubo",
    role: "Managing Partner, Ashfield Property Group",
    initials: "JO",
  },
]

const TEAM = [
  { name: "Adrian Cole", role: "Founder & CEO", exp: "32 yrs", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=640&fit=crop&auto=format" },
  { name: "Miriam Osei", role: "Chief Architect", exp: "19 yrs", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=640&fit=crop&auto=format" },
  { name: "Tomas Brandt", role: "Head of Engineering", exp: "24 yrs", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=640&fit=crop&auto=format" },
  { name: "Lena Park", role: "Project Director", exp: "17 yrs", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=640&fit=crop&auto=format" },
]

const CLIENTS = [
  "Vektor Capital", "Northfield University", "Ashfield Property Group", "Meridian Holdings",
  "Port Authority", "Harlow Estates", "Sorell Industries", "Nordic Infrastructure",
  "Pacific Crown", "Veritas Development",
]

// ─── section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs tracking-[0.3em] uppercase text-primary" style={M}>{children}</span>
      <div className="h-px w-16 bg-border" />
    </div>
  )
}

// ─── main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSvc, setActiveSvc] = useState<number | null>(null)
  const [activeTesti, setActiveTesti] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const toggleSvc = (i: number) => setActiveSvc(prev => (prev === i ? null : i))

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-inner { animation: marquee 30s linear infinite; display: flex; }
        .marquee-inner:hover { animation-play-state: paused; }
        .svc-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.38s cubic-bezier(0.4,0,0.2,1); }
        .svc-body.open { grid-template-rows: 1fr; }
        .svc-body > div { overflow: hidden; }
        .proj-img { transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); }
        .proj-wrap:hover .proj-img { transform: scale(1.055); }
        .team-overlay { opacity: 0; transition: opacity 0.3s ease; }
        .team-card:hover .team-overlay { opacity: 1; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3A3A36; }
      `}</style>

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/96 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-14 h-16 lg:h-[72px]">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-end gap-0.5">
              <div className="w-1.5 h-7 bg-primary" />
              <div className="w-1.5 h-4 bg-primary/50" />
            </div>
            <span className="text-base font-black tracking-[0.22em] uppercase text-foreground" style={D}>
              STRUCTURA
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {["Services", "Projects", "Process", "Team"].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
                style={M}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-primary text-background text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
              style={M}
            >
              Start a Project <ArrowUpRight size={13} />
            </a>
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-card border-t border-border px-6 py-8">
            <nav className="flex flex-col gap-6">
              {["Services", "Projects", "Process", "Team", "Contact"].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-2xl font-black tracking-widest uppercase text-foreground hover:text-primary transition-colors"
                  style={D}
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section id="top" className="relative flex flex-col" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0" style={GRID_BG} />

        <div className="flex flex-1 relative">
          {/* Left dark panel */}
          <div className="relative z-10 flex flex-col justify-between pt-28 lg:pt-32 pb-0 px-6 lg:px-14 w-full lg:w-[44%]">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-10 lg:mb-14">
                <div className="w-8 h-px bg-primary" />
                <span className="text-[10px] tracking-[0.32em] uppercase text-primary" style={M}>
                  Est. 1996 · Dubai · London · Sydney
                </span>
              </div>

              {/* Headline */}
              <h1
                className="uppercase text-foreground mb-8"
                style={{
                  ...D,
                  fontWeight: 900,
                  fontSize: "clamp(76px, 9.5vw, 158px)",
                  letterSpacing: "-0.02em",
                  lineHeight: "0.91",
                }}
              >
                BUILDING
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(240,235,227,0.28)",
                    color: "transparent",
                  }}
                >
                  THE
                </span>
                <br />
                FUTURE
              </h1>

              <p className="text-[15px] text-muted-foreground max-w-sm leading-relaxed font-light mb-10">
                Premium construction, land development, and architectural design for projects that define skylines and stand the test of time.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="#projects"
                  className="flex items-center gap-2 px-5 py-3 bg-primary text-background text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
                  style={M}
                >
                  View Projects <ArrowUpRight size={13} />
                </a>
                <a
                  href="#about"
                  className="flex items-center gap-2 px-5 py-3 border border-border text-foreground text-[11px] font-medium tracking-[0.2em] uppercase hover:border-foreground/25 transition-colors"
                  style={M}
                >
                  Our Story
                </a>
              </div>
            </div>

            {/* Scroll cue */}
            <div className="hidden lg:flex items-center gap-3 pb-8 mt-16">
              <div className="w-5 h-9 border border-border/35 flex items-start justify-center pt-1.5">
                <div className="w-px h-2.5 bg-primary animate-bounce" />
              </div>
              <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground" style={M}>
                Scroll to explore
              </span>
            </div>
          </div>

          {/* Right image panel */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[58%] overflow-hidden bg-card">
            <img
              src="https://images.unsplash.com/photo-1551711974-faf378be34b2?w=1400&h=1000&fit=crop&auto=format"
              alt="Construction crane against dramatic sunset sky"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #0A0A08 0%, rgba(10,10,8,0.45) 32%, transparent 62%)" }}
            />
            <div className="absolute inset-0" style={{ background: "rgba(10,10,8,0.2)" }} />
            {/* Orange accent stripe */}
            <div className="absolute top-0 right-0 bottom-0 w-[3px] bg-primary/50" />

            {/* Floating badge */}
            <div
              className="absolute bottom-14 right-10 p-5 backdrop-blur-md border border-border/25"
              style={{ background: "rgba(10,10,8,0.72)" }}
            >
              <div className="text-[10px] tracking-[0.28em] uppercase text-primary mb-1.5" style={M}>
                Latest Project
              </div>
              <div className="text-xl font-black uppercase text-foreground" style={D}>
                Meridian Tower
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[11px] text-muted-foreground" style={M}>Dubai, UAE</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-[11px] text-muted-foreground" style={M}>2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-border grid grid-cols-2 lg:grid-cols-4 bg-card/60 backdrop-blur-sm">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`px-6 lg:px-10 py-5 lg:py-7 ${i < STATS.length - 1 ? "border-r border-border" : ""}`}
            >
              <div
                className="text-3xl lg:text-4xl font-black mb-1"
                style={{ ...D, color: i === 0 ? "#E8620A" : "#F0EBE3" }}
              >
                {s.val}
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground" style={M}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MARQUEE ══════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden bg-primary py-3">
        <div className="marquee-inner whitespace-nowrap">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-5">
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-background" style={M}>
                {c}
              </span>
              <span className="text-background/40 text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ COMPANY INTRO ════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 lg:py-44 px-6 lg:px-14">
        <div className="max-w-[1380px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1px_1fr] items-start gap-0">
            {/* Left: display statement */}
            <div className="lg:pr-16 xl:pr-24 mb-14 lg:mb-0">
              <SectionLabel>00 / About</SectionLabel>
              <h2
                className="uppercase text-foreground mb-8"
                style={{
                  ...D,
                  fontWeight: 900,
                  fontSize: "clamp(44px, 5.5vw, 88px)",
                  letterSpacing: "-0.015em",
                  lineHeight: "0.89",
                }}
              >
                WE DON&apos;T
                <br />
                BUILD
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(240,235,227,0.28)",
                    color: "transparent",
                  }}
                >
                  BUILDINGS.
                </span>
                <br />
                WE BUILD
                <br />
                LEGACIES.
              </h2>
              <div className="flex items-center gap-4 mt-10">
                <div className="w-10 h-px bg-primary" />
                <span className="text-[11px] text-muted-foreground tracking-widest uppercase" style={M}>
                  STRUCTURA GROUP · Since 1996
                </span>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block self-stretch bg-border" />

            {/* Right: body + image */}
            <div className="lg:pl-16 xl:pl-24">
              <p className="text-[15px] lg:text-base text-foreground/75 leading-relaxed font-light mb-5">
                Founded in Dubai in 1996, Structura has grown from a regional construction firm into a globally respected integrated development group — with operations spanning the Middle East, Europe, and Asia Pacific.
              </p>
              <p className="text-[15px] lg:text-base text-foreground/75 leading-relaxed font-light mb-5">
                What sets us apart is integration. Architecture, engineering, construction, and project management unified under one roof, operating as one team. No silos. No coordination gaps. Seamless delivery from concept to completion.
              </p>
              <p className="text-[15px] lg:text-base text-foreground/75 leading-relaxed font-light mb-12">
                Our projects range from landmark towers and master-planned communities to precision industrial facilities. The common thread is an uncompromising standard of craft and a deep respect for what we are building — and for whom.
              </p>

              {/* Inset image */}
              <div className="relative overflow-hidden h-56 lg:h-72 bg-card">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=960&h=600&fit=crop&auto=format"
                  alt="Structura team on site"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "rgba(10,10,8,0.38)" }} />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="text-[10px] tracking-widest uppercase text-foreground/60" style={M}>
                    On-Site · Meridian Tower · Dubai, UAE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════════════════════════ */}
      <section
        id="services"
        className="border-t border-border py-24 lg:py-36"
        style={{ background: "linear-gradient(to bottom, #0E0E0C, #0A0A08)" }}
      >
        <div className="px-6 lg:px-14 max-w-[1380px] mx-auto mb-14 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <SectionLabel>01 / Services</SectionLabel>
              <h2
                className="uppercase text-foreground"
                style={{ ...D, fontWeight: 900, fontSize: "clamp(38px, 4.8vw, 76px)", letterSpacing: "-0.015em", lineHeight: "0.9" }}
              >
                WHAT<br />WE DO
              </h2>
            </div>
            <p className="hidden lg:block text-[12px] text-muted-foreground max-w-[200px] text-right leading-relaxed" style={M}>
              Five integrated<br />capabilities. One<br />coherent delivery.
            </p>
          </div>
        </div>

        {/* Accordion strips */}
        <div className="border-t border-border">
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              className={`border-b border-border cursor-pointer group transition-colors duration-300 ${
                activeSvc === i ? "bg-[rgba(232,98,16,0.04)]" : "hover:bg-[rgba(240,235,227,0.015)]"
              }`}
              onClick={() => toggleSvc(i)}
            >
              <div className="max-w-[1380px] mx-auto px-6 lg:px-14">
                {/* Row header */}
                <div className="flex items-center justify-between py-5 lg:py-7 gap-4">
                  <div className="flex items-center gap-5 lg:gap-10 flex-1 min-w-0">
                    <span className="text-[11px] text-primary shrink-0 w-6" style={M}>{svc.num}</span>
                    <h3
                      className={`font-black uppercase text-xl lg:text-3xl xl:text-[2.1rem] tracking-tight transition-colors duration-200 leading-none ${
                        activeSvc === i ? "text-primary" : "text-foreground group-hover:text-primary"
                      }`}
                      style={D}
                    >
                      {svc.title}
                    </h3>
                    <span className="hidden lg:block text-[11px] text-muted-foreground truncate" style={M}>
                      {svc.sub}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${
                      activeSvc === i ? "bg-primary border-primary" : "border-border group-hover:border-foreground/20"
                    }`}
                  >
                    <span
                      className="text-base leading-none select-none"
                      style={{ ...M, color: activeSvc === i ? "#0A0A08" : "#F0EBE3" }}
                    >
                      {activeSvc === i ? "−" : "+"}
                    </span>
                  </div>
                </div>

                {/* Expandable body */}
                <div className={`svc-body ${activeSvc === i ? "open" : ""}`}>
                  <div>
                    <div className="pb-8 lg:pb-12 pl-0 lg:pl-[calc(1.5rem+2.5rem+2.5rem)] grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-start">
                      <p className="text-[14px] text-foreground/65 leading-relaxed font-light max-w-2xl">
                        {svc.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {svc.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 border border-primary/30 text-primary text-[10px] tracking-[0.2em] uppercase"
                            style={M}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PROJECTS ═════════════════════════════════════════════════════════ */}
      <section id="projects" className="py-24 lg:py-44 px-6 lg:px-14">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex items-end justify-between mb-14 lg:mb-16">
            <div>
              <SectionLabel>02 / Projects</SectionLabel>
              <h2
                className="uppercase text-foreground"
                style={{ ...D, fontWeight: 900, fontSize: "clamp(38px, 4.8vw, 76px)", letterSpacing: "-0.015em", lineHeight: "0.9" }}
              >
                FEATURED<br />PROJECTS
              </h2>
            </div>
            <a
              href="#"
              className="hidden lg:flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors group"
              style={M}
            >
              View All Projects
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>

          {/* Editorial grid */}
          <div className="grid lg:grid-cols-[1.45fr_1fr] gap-3 mb-3">
            {/* Large portrait */}
            <div className="proj-wrap relative overflow-hidden bg-card cursor-pointer group h-[420px] lg:h-[680px]">
              <img
                src={PROJECTS[0].img}
                alt={PROJECTS[0].title}
                className="proj-img w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/92 via-background/15 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 lg:p-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] text-primary tracking-[0.28em] uppercase" style={M}>{PROJECTS[0].id}</span>
                  <div className="h-px w-6 bg-primary/50" />
                  <span className="text-[10px] text-muted-foreground tracking-widest uppercase" style={M}>{PROJECTS[0].type}</span>
                </div>
                <h3
                  className="text-3xl lg:text-5xl font-black uppercase text-foreground mb-3 group-hover:text-primary transition-colors"
                  style={D}
                >
                  {PROJECTS[0].title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <span className="text-[12px] text-muted-foreground" style={M}>{PROJECTS[0].location}</span>
                    <span className="text-[12px] text-muted-foreground" style={M}>{PROJECTS[0].area}</span>
                  </div>
                  <div className="w-9 h-9 border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowUpRight size={14} className="text-foreground group-hover:text-background transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right stacked 2 */}
            <div className="flex flex-col gap-3">
              {PROJECTS.slice(1, 3).map((proj, i) => (
                <div
                  key={i}
                  className="proj-wrap relative overflow-hidden flex-1 bg-card cursor-pointer group h-52 lg:h-auto"
                >
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="proj-img w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-7">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] text-primary tracking-widest uppercase" style={M}>{proj.id}</span>
                      <span className="text-[10px] text-muted-foreground" style={M}>· {proj.type}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <h3
                        className="text-xl lg:text-2xl font-black uppercase text-foreground group-hover:text-primary transition-colors"
                        style={D}
                      >
                        {proj.title}
                      </h3>
                      <span className="text-[11px] text-muted-foreground" style={M}>{proj.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wide landscape strip */}
          <div className="proj-wrap relative overflow-hidden bg-card cursor-pointer group h-44 lg:h-60">
            <img
              src={PROJECTS[3].img}
              alt={PROJECTS[3].title}
              className="proj-img w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(10,10,8,0.88) 0%, rgba(10,10,8,0.4) 45%, transparent 80%)" }}
            />
            <div className="absolute inset-0 flex items-center px-7 lg:px-10">
              <div className="flex items-center gap-6 lg:gap-12 flex-1 min-w-0">
                <span className="text-[11px] text-primary shrink-0" style={M}>{PROJECTS[3].id}</span>
                <h3
                  className="text-2xl lg:text-4xl font-black uppercase text-foreground group-hover:text-primary transition-colors truncate"
                  style={D}
                >
                  {PROJECTS[3].title}
                </h3>
                <div className="hidden lg:flex items-center gap-7 text-[12px] text-muted-foreground shrink-0" style={M}>
                  <span>{PROJECTS[3].location}</span>
                  <span className="text-muted-foreground/30">·</span>
                  <span>{PROJECTS[3].type}</span>
                  <span className="text-muted-foreground/30">·</span>
                  <span>{PROJECTS[3].area}</span>
                </div>
              </div>
              <div className="ml-6 w-9 h-9 border border-border flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all">
                <ArrowUpRight size={14} className="text-foreground group-hover:text-background transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══════════════════════════════════════════════════════════ */}
      <section id="process" className="py-24 lg:py-44 border-t border-border" style={{ background: "#0D0D0B" }}>
        <div className="px-6 lg:px-14 max-w-[1380px] mx-auto">
          <div className="flex items-end justify-between mb-20 lg:mb-24">
            <div>
              <SectionLabel>03 / Process</SectionLabel>
              <h2
                className="uppercase text-foreground"
                style={{ ...D, fontWeight: 900, fontSize: "clamp(38px, 4.8vw, 76px)", letterSpacing: "-0.015em", lineHeight: "0.9" }}
              >
                HOW WE<br />DELIVER
              </h2>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-8 right-8 h-px bg-border" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="relative">
                  <div className="relative w-16 h-16 flex items-center justify-center mb-6 z-10 border"
                    style={{
                      background: i === 0 ? "#E8620A" : "#131310",
                      borderColor: i === 0 ? "#E8620A" : "rgba(240,235,227,0.08)",
                    }}
                  >
                    <span
                      className="text-base font-bold"
                      style={{ ...M, color: i === 0 ? "#0A0A08" : "#E8620A" }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <div className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2" style={M}>
                    {step.time}
                  </div>
                  <h3
                    className="text-xl lg:text-2xl font-black uppercase text-foreground mb-3"
                    style={D}
                  >
                    {step.phase}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Blueprint image */}
          <div className="mt-20 lg:mt-24 relative overflow-hidden h-56 lg:h-64 bg-card">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&h=500&fit=crop&auto=format"
              alt="Architectural blueprints and technical drawings"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "rgba(10,10,8,0.72)" }} />
            <div className="absolute inset-0 flex items-center px-8 lg:px-14">
              <div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-primary mb-3" style={M}>
                  Precision From Day One
                </div>
                <p
                  className="text-xl lg:text-3xl font-black uppercase text-foreground max-w-2xl"
                  style={D}
                >
                  Every project begins with a document — and ends with a landmark.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 lg:py-44 px-6 lg:px-14 border-t border-border">
        <div className="max-w-[1380px] mx-auto">
          <SectionLabel>04 / Testimonials</SectionLabel>

          <div className="grid lg:grid-cols-[auto_1fr] gap-0 lg:gap-10 items-start mt-4">
            {/* Giant quotation mark */}
            <div className="hidden lg:block select-none" aria-hidden>
              <span
                style={{
                  ...D,
                  fontSize: "280px",
                  fontWeight: 900,
                  color: "rgba(232,98,16,0.07)",
                  lineHeight: "0.72",
                  display: "block",
                }}
              >
                &ldquo;
              </span>
            </div>

            {/* Quote + controls */}
            <div>
              <blockquote className="mb-10">
                <p
                  className="font-black uppercase text-foreground mb-10 leading-[1.03]"
                  style={{
                    ...D,
                    fontSize: "clamp(26px, 3.8vw, 56px)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  &ldquo;{TESTIMONIALS[activeTesti].quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center shrink-0">
                    <span className="text-background text-[11px] font-bold" style={M}>
                      {TESTIMONIALS[activeTesti].initials}
                    </span>
                  </div>
                  <div>
                    <div className="text-foreground font-semibold text-[14px]">
                      {TESTIMONIALS[activeTesti].name}
                    </div>
                    <div className="text-muted-foreground text-[11px] mt-0.5" style={M}>
                      {TESTIMONIALS[activeTesti].role}
                    </div>
                  </div>
                </div>
              </blockquote>

              <div className="flex items-center gap-5">
                <button
                  onClick={() => setActiveTesti(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="w-9 h-9 border border-border flex items-center justify-center hover:bg-card hover:border-foreground/20 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={15} />
                </button>
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTesti(i)}
                      className={`h-1 transition-all duration-300 ${i === activeTesti ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"}`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveTesti(p => (p + 1) % TESTIMONIALS.length)}
                  className="w-9 h-9 border border-border flex items-center justify-center hover:bg-card hover:border-foreground/20 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={15} />
                </button>
                <span className="text-[11px] text-muted-foreground ml-1" style={M}>
                  {activeTesti + 1} / {TESTIMONIALS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ═════════════════════════════════════════════════════════════ */}
      <section id="team" className="py-24 lg:py-44 border-t border-border" style={{ background: "#0D0D0B" }}>
        <div className="px-6 lg:px-14 max-w-[1380px] mx-auto">
          <div className="flex items-end justify-between mb-14 lg:mb-16">
            <div>
              <SectionLabel>05 / Team</SectionLabel>
              <h2
                className="uppercase text-foreground"
                style={{ ...D, fontWeight: 900, fontSize: "clamp(38px, 4.8vw, 76px)", letterSpacing: "-0.015em", lineHeight: "0.9" }}
              >
                THE PEOPLE<br />BEHIND THE WORK
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="team-card relative overflow-hidden cursor-pointer bg-card"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/88 via-transparent to-transparent" />
                {/* Normal info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-base lg:text-lg font-black uppercase text-foreground leading-tight" style={D}>
                    {member.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1 tracking-widest uppercase" style={M}>
                    {member.role}
                  </div>
                </div>
                {/* Hover overlay */}
                <div
                  className="team-overlay absolute inset-0 flex flex-col justify-end p-5"
                  style={{ background: "rgba(232,98,16,0.88)" }}
                >
                  <div className="text-[10px] tracking-[0.25em] uppercase text-background/65 mb-1" style={M}>
                    {member.exp} Experience
                  </div>
                  <div className="text-xl font-black uppercase text-background leading-tight" style={D}>
                    {member.name}
                  </div>
                  <div className="text-[12px] text-background/75 mt-1" style={M}>{member.role}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <ArrowUpRight size={13} className="text-background" />
                    <span className="text-[10px] text-background tracking-widest uppercase" style={M}>
                      View Profile
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative py-24 lg:py-44 border-t border-border overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1600&h=900&fit=crop&auto=format"
            alt="Modern architecture exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(10,10,8,0.9)" }} />
          <div className="absolute inset-0" style={GRID_BG} />
        </div>

        <div className="relative z-10 px-6 lg:px-14 max-w-[1380px] mx-auto">
          <SectionLabel>06 / Contact</SectionLabel>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-8">
            {/* Left */}
            <div>
              <h2
                className="uppercase text-foreground mb-8 leading-none"
                style={{ ...D, fontWeight: 900, fontSize: "clamp(52px, 6.5vw, 108px)", letterSpacing: "-0.025em" }}
              >
                START YOUR<br />
                <span style={{ color: "#E8620A" }}>PROJECT</span>
                <br />WITH US.
              </h2>
              <p className="text-[15px] text-foreground/55 max-w-sm leading-relaxed font-light mb-10">
                Whether you have a detailed brief or just a vision — we want to hear about it. Our team responds within 24 hours.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Email", val: "dubai@structura.build" },
                  { label: "Phone", val: "+971 4 330 0000" },
                  { label: "Offices", val: "Dubai · London · Sydney" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-1 h-1 bg-primary shrink-0" />
                    <span className="text-[11px] text-muted-foreground" style={M}>
                      <span className="text-primary">{label} — </span>{val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div
              className="border border-border p-7 lg:p-10 backdrop-blur-sm"
              style={{ background: "rgba(19,19,16,0.8)" }}
            >
              <div
                className="text-lg font-black uppercase text-foreground mb-7"
                style={D}
              >
                New Project Enquiry
              </div>
              <div className="flex flex-col gap-3.5">
                {["Full Name", "Company / Organisation", "Email Address"].map(ph => (
                  <input
                    key={ph}
                    type="text"
                    placeholder={ph}
                    className="w-full bg-background/50 border border-border px-4 py-3.5 text-[13px] text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:border-primary transition-colors"
                    style={M}
                  />
                ))}
                <select
                  className="w-full bg-background/50 border border-border px-4 py-3.5 text-[13px] text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  style={M}
                  defaultValue=""
                >
                  <option value="" disabled>Service Required</option>
                  {SERVICES.map(s => (
                    <option key={s.num} value={s.title}>{s.title}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="w-full bg-background/50 border border-border px-4 py-3.5 text-[13px] text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:border-primary transition-colors resize-none"
                  style={M}
                />
                <button
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-primary text-background text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
                  style={M}
                >
                  Send Enquiry <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-border bg-card px-6 lg:px-14 pt-14 lg:pt-16 pb-8">
        <div className="max-w-[1380px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-14">
            {/* Brand column */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="flex items-end gap-0.5">
                  <div className="w-1.5 h-7 bg-primary" />
                  <div className="w-1.5 h-4 bg-primary/50" />
                </div>
                <span className="text-base font-black tracking-[0.22em] uppercase" style={D}>STRUCTURA</span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs mb-7 font-light">
                Engineering excellence and architectural vision — delivering landmark projects across four continents since 1996.
              </p>
              <div className="flex items-center gap-2">
                {["LI", "TW", "IG"].map(s => (
                  <div
                    key={s}
                    className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="text-[10px]" style={M}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-5 font-medium" style={M}>
                Services
              </div>
              <div className="flex flex-col gap-3">
                {["Building Construction", "Land Development", "Architecture", "Project Management", "Engineering"].map(s => (
                  <a
                    key={s}
                    href="#services"
                    className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-5 font-medium" style={M}>
                Company
              </div>
              <div className="flex flex-col gap-3">
                {["About Us", "Projects", "Process", "Our Team", "Careers", "News"].map(s => (
                  <a key={s} href="#" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-5 font-medium" style={M}>
                Contact
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { label: "Dubai HQ", val: "One Central Tower, Level 22\nDubai, UAE 00000" },
                  { label: "Email", val: "dubai@structura.build" },
                  { label: "Phone", val: "+971 4 330 0000" },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="text-[10px] text-primary mb-1 tracking-widest uppercase" style={M}>{label}</div>
                    <div
                      className="text-[13px] text-muted-foreground font-light"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-7 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-[11px] text-muted-foreground" style={M}>
              © 2024 Structura Group LLC. All rights reserved.
            </span>
            <div className="flex items-center gap-5 flex-wrap">
              {["Privacy Policy", "Terms of Use", "ISO 9001:2015 Certified"].map(s => (
                <a
                  key={s}
                  href="#"
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  style={M}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
