"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── FADE IN HELPER ───────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── LABEL CHIP (Symmetrical) ─────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-16">
      <div className="w-12 h-[2px] bg-[#D4E815]" />
      <span
        className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-[#D4E815]"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {children}
      </span>
      <div className="w-12 h-[2px] bg-[#D4E815]" />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — MANIFESTO
// ══════════════════════════════════════════════════════════════════════════════
function ManifestoSection() {
  return (
    <section 
      className="relative px-6 md:px-12 bg-[#050505] overflow-hidden border-t border-white/10 text-center flex flex-col items-center"
      style={{ paddingTop: "clamp(8rem, 12vw, 12rem)", paddingBottom: "clamp(8rem, 12vw, 12rem)" }}
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] overflow-hidden">
        <span
          className="text-[40vw] font-bold leading-none text-white whitespace-nowrap"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          WPDEV
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-col items-center w-full">
        <FadeIn delay={0}>
          <Label>THE ORIGIN</Label>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12 mb-32">
          <h2
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase leading-[1.1] text-white"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            BUILT FOR THOSE
            <br />
            <span className="text-white/30">WHO THINK IN</span>
            <br />
            KEYSTROKES.
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 max-w-3xl mb-40">
          <FadeIn delay={0.2}>
            <p
              className="text-xl md:text-2xl text-white/60 leading-relaxed font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              WpDev lahir dari satu pertanyaan sederhana: mengapa keyboard
              harus terasa seperti alat, bukan seperti instrumen presisi
              tinggi?
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              className="text-xl md:text-2xl text-white/60 leading-relaxed font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Selama dua tahun, tim kami merancang, membongkar, dan merakit
              ulang lebih dari 40 prototipe — mencari keseimbangan ekstrem
              antara akustik, aktuasi, dan agresi visual.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-20 md:gap-40 border-t border-white/10 pt-24">
            {[
              { val: "40+", label: "PROTOTYPES" },
              { val: "2 YR", label: "DEVELOPMENT" },
              { val: "47", label: "CHECKPOINTS" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-6">
                <span
                  className="text-6xl md:text-7xl font-bold text-white"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {s.val}
                </span>
                <span
                  className="text-xs md:text-sm text-[#D4E815] tracking-[0.3em] font-bold uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — ENGINEERING PILLARS
// ══════════════════════════════════════════════════════════════════════════════
const features = [
  {
    icon: "01",
    title: "SOUND ENGINEERING",
    subtitle: "ACOUSTICALLY TUNED",
    body: "Setiap lapisan — dari gasket mount hingga foam PCB — dirancang untuk menghasilkan resonansi berat, dalam, dan konsisten. Murni tanpa getaran liar.",
    tags: ["THOCKY", "LOW-PITCHED"],
  },
  {
    icon: "02",
    title: "MATERIAL INTEGRITY",
    subtitle: "BUILT TO OUTLAST",
    body: "Casing aluminium CNC 6063 aerospace-grade dengan finishing matte sandblast. Keycap PBT double-shot. Dibuat bukan untuk sekadar pamer, tapi bertahan.",
    tags: ["6063 ALUM", "PBT D-SHOT"],
  },
  {
    icon: "03",
    title: "SWITCH PRECISION",
    subtitle: "EVERY GRAM INTENTIONAL",
    body: "Linear switch custom 45g dengan pre-travel agresif 2.0mm. Factory pre-lubed. Aktuasi instan untuk mereka yang tidak punya waktu menunggu.",
    tags: ["45G", "PRE-LUBED"],
  },
];

function FeaturesSection() {
  return (
    <section 
      className="px-6 md:px-12 bg-[#000000] text-center flex flex-col items-center border-t border-white/5"
      style={{ paddingTop: "clamp(8rem, 12vw, 12rem)", paddingBottom: "clamp(8rem, 12vw, 12rem)" }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div style={{ marginBottom: "clamp(4rem, 6vw, 6rem)" }}>
            <Label>ENGINEERING PILLARS</Label>
            <h2
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase text-white leading-none mt-8"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              CORE <span className="text-[#D4E815]">DISCIPLINES</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-center">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.1} className="h-full">
              <div className="group flex flex-col items-center justify-start h-full border border-white/10 bg-[#050505] p-12 lg:p-16 hover:border-[#D4E815]/50 transition-colors duration-500 relative overflow-hidden">
                {/* Accent Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4E815] translate-x-10 -translate-y-10 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Number */}
                <div className="mb-16 flex items-center justify-center">
                  <span
                    className="text-[6rem] leading-none font-bold text-white/10"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {f.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 items-center mb-12">
                  <h3
                    className="text-2xl lg:text-3xl font-bold text-white uppercase mb-4"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {f.title}
                  </h3>
                  <span
                    className="text-sm text-[#D4E815] tracking-[0.2em] font-bold uppercase mb-10"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {f.subtitle}
                  </span>
                  <p
                    className="text-base md:text-lg text-white/50 leading-relaxed font-medium"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {f.body}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-4 mt-auto pt-8 border-t border-white/5 w-full">
                  {f.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/60 border border-white/20 px-4 py-2 uppercase"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — QUOTE
// ══════════════════════════════════════════════════════════════════════════════
function QuoteSection() {
  return (
    <section 
      className="px-6 md:px-12 bg-[#050505] border-y border-white/10 flex justify-center text-center"
      style={{ paddingTop: "clamp(10rem, 15vw, 15rem)", paddingBottom: "clamp(10rem, 15vw, 15rem)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn>
          <div 
            className="w-16 h-16 md:w-20 md:h-20 border-2 border-[#D4E815] rotate-45 flex items-center justify-center"
            style={{ marginBottom: "clamp(4rem, 6vw, 6rem)" }}
          >
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#D4E815]" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <blockquote
            className="text-[clamp(1.8rem,5vw,5rem)] font-bold uppercase leading-[1.2] text-white tracking-wide"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            "KEYBOARD YANG BAIK TIDAK TERLIHAT. <br />
            <br />
            <span className="text-white/30">
              YANG KAMU RASAKAN HANYA ALIRAN PIKIRAN YANG MENEMUKAN JALANNYA."
            </span>
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-32">
          <div className="flex items-center justify-center gap-8">
            <div className="w-16 h-[2px] bg-[#D4E815]/50" />
            <p
              className="text-base md:text-lg text-[#D4E815] font-bold tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              WPDEV DESIGN TEAM, 2024
            </p>
            <div className="w-16 h-[2px] bg-[#D4E815]/50" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — SPECS TABLE
// ══════════════════════════════════════════════════════════════════════════════
const specs = [
  { label: "LAYOUT", value: "75% TENKEYLESS" },
  { label: "CASING", value: "CNC ALUM 6063, SANDBLASTED" },
  { label: "MOUNT", value: "TOP GASKET MOUNT" },
  { label: "SWITCHES", value: "WPDEV LINEAR 45G" },
  { label: "KEYCAPS", value: "PBT DOUBLE-SHOT" },
  { label: "PCB", value: "HOT-SWAP · QMK/VIA" },
  { label: "CONN.", value: "USB-C · 2.4GHZ" },
  { label: "WEIGHT", value: "~1.8 KG" },
];

function SpecSection() {
  return (
    <section
      className="flex flex-col items-center bg-[#000000] px-4 text-center sm:px-6 md:px-12"
      style={{ paddingTop: "clamp(8rem, 12vw, 12rem)", paddingBottom: "clamp(8rem, 12vw, 12rem)" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 sm:gap-12">
        <FadeIn className="flex flex-col items-center text-center w-full">
          <Label>SPECIFICATIONS</Label>
          <h2
            className="mb-6 mt-4 max-w-full text-[clamp(2.25rem,8vw,6rem)] font-bold uppercase leading-[1.05] text-white sm:mb-8 sm:mt-6 md:mb-12 md:mt-8"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            <span className="block">EVERY NUMBER,</span>
            <span className="block text-[#D4E815]">EARNED.</span>
          </h2>
          <p
            className="mx-auto mb-10 max-w-2xl text-base font-medium leading-relaxed text-white/60 sm:mb-12 sm:text-lg md:mb-16 md:text-xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Tidak ada angka acak di sini. Setiap spesifikasi dipilih setelah
            pengujian ekstrem — buktikan sendiri performanya.
          </p>

          <div className="w-full py-2">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10 md:gap-x-12">
              <div className="flex gap-3 sm:gap-4">
                <div className="h-10 w-10 border border-white/20 bg-[#E05C30] sm:h-12 sm:w-12" title="Sunset Orange" />
                <div className="h-10 w-10 border border-white/20 bg-[#E8E8E8] sm:h-12 sm:w-12" title="Fog White" />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 sm:text-sm sm:tracking-[0.3em] md:text-base"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                2 COLORWAYS
              </span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="w-full max-w-3xl mx-auto">
          <div className="border-t-2 border-white/20 text-left">
            {specs.map((s, i) => (
              <div
                key={i}
                className="group grid grid-cols-1 justify-items-center gap-1 border-b border-white/10 px-4 py-4 text-center transition-colors hover:bg-white/[0.03] sm:grid-cols-[minmax(5.5rem,0.65fr)_minmax(0,1.35fr)] sm:justify-items-stretch sm:items-center sm:gap-x-5 sm:px-5 sm:py-5 sm:text-left md:flex md:gap-6 md:px-6 md:py-7 lg:py-8"
              >
                <span
                  className="min-w-0 break-words text-[11px] font-bold uppercase tracking-[0.16em] text-white/50 sm:text-sm sm:tracking-[0.18em] md:w-40 md:shrink-0 md:text-lg md:tracking-[0.2em] lg:w-48 lg:text-xl"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {s.label}
                </span>
                <div aria-hidden="true" className="hidden min-w-4 flex-1 border-b-2 border-dotted border-white/20 md:block" />
                <span
                  className="min-w-0 break-words text-center text-sm font-bold uppercase leading-snug tracking-[0.04em] text-white [overflow-wrap:anywhere] sm:text-right sm:text-base sm:tracking-wider md:shrink-0 md:text-xl md:tracking-widest lg:text-2xl"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — PROCESS
// ══════════════════════════════════════════════════════════════════════════════
const process = [
  {
    phase: "01",
    title: "IDEATION & RESEARCH",
    desc: "Kami menghabiskan 6 bulan mendengarkan pro-gamers & kreatif. Kebutuhan dicatat tanpa kompromi.",
  },
  {
    phase: "02",
    title: "PROTOTYPING",
    desc: "43 iterasi prototipe. Setiap perubahan 0.1mm dievaluasi untuk dampak akustik & feel.",
  },
  {
    phase: "03",
    title: "ACOUSTIC TUNING",
    desc: "Menganalisis 120+ kombinasi foam & gasket untuk mencapai resonansi frekuensi presisi.",
  },
  {
    phase: "04",
    title: "PRODUCTION & QC",
    desc: "Melewati 47 titik QC. Tidak ada kerataan keycap atau konsistensi switch yang terlewat.",
  },
];

function ProcessSection() {
  return (
    <section 
      className="px-6 md:px-12 bg-[#050505] border-t border-white/10 text-center flex flex-col items-center"
      style={{ paddingTop: "clamp(8rem, 12vw, 12rem)", paddingBottom: "clamp(8rem, 12vw, 12rem)" }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <FadeIn className="flex flex-col items-center text-center w-full" style={{ marginBottom: "clamp(4rem, 6vw, 6rem)" }}>
          <Label>THE PROCESS</Label>
          <h2
            className="text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase text-white mt-8 leading-[1.1]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            FROM IDEA TO <span className="text-[#D4E815]">KEYSTROKE</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20">
          {process.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1} className="h-full">
              <div className="flex flex-col items-center justify-start h-full border-t-[3px] border-white/10 hover:border-[#D4E815] transition-colors duration-300 pt-12 text-center">
                <span
                  className="text-[5rem] font-bold text-[#D4E815] mb-10 leading-none"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {p.phase}
                </span>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white uppercase mb-6"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-base md:text-lg text-white/50 leading-relaxed font-medium"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — SOCIAL PROOF
// ══════════════════════════════════════════════════════════════════════════════
const proofPoints = [
  { value: "40+", label: "PROTOTYPES BUILT" },
  { value: "2 YR", label: "IN DEVELOPMENT" },
  { value: "47", label: "QUALITY CHECKS" },
];

function SocialProofSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/10 bg-[#080808] px-6 text-center md:px-12"
      style={{
        paddingTop: "clamp(7rem, 10vw, 10rem)",
        paddingBottom: "clamp(7rem, 10vw, 10rem)",
      }}
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center">
        <FadeIn className="w-full">
          <Label>PROVEN BY THE PROCESS</Label>
          <h2
            className="mx-auto max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[1.05] text-white"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            MADE WITH
            <span className="text-[#D4E815]"> INTENTION.</span>
            <br />
            CHECKED AT EVERY LAYER.
          </h2>
          <p
            className="mx-auto mt-8 max-w-2xl text-base font-medium leading-relaxed text-white/50 md:text-lg"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Bukan sekadar spesifikasi di atas kertas. Setiap detail melewati
            proses pengembangan dan pemeriksaan kualitas yang terukur.
          </p>
        </FadeIn>

        <div className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:mt-20">
          {proofPoints.map((point, index) => (
            <FadeIn key={point.label} delay={index * 0.1} className="h-full">
              <div className="flex h-full flex-col items-center justify-center border border-white/10 bg-white/[0.02] px-6 py-10 transition-colors duration-300 hover:border-[#D4E815]/50 md:py-14">
                <span
                  className="text-6xl font-bold leading-none text-[#D4E815] md:text-7xl"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {point.value}
                </span>
                <span
                  className="mt-5 text-xs font-bold tracking-[0.25em] text-white/50 md:text-sm"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {point.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — CTA + FOOTER
// ══════════════════════════════════════════════════════════════════════════════
function CtaSection() {
  return (
    <section 
      className="relative px-6 text-center bg-[#000000] overflow-hidden border-t border-white/10 flex flex-col items-center"
      style={{ paddingTop: "clamp(10rem, 15vw, 15rem)", paddingBottom: "clamp(10rem, 15vw, 15rem)" }}
    >
      {/* Background Watermark */}
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-bold text-white/[0.02] select-none pointer-events-none"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        READY
      </span>

      <div className="relative max-w-3xl mx-auto flex flex-col items-center">
        <FadeIn>
          <div className="w-24 h-[2px] bg-[#D4E815] mb-12" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase leading-[1] text-white mb-10"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            PRECISION, <br />
            LAYER BY <span className="text-[#D4E815]">LAYER.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p
            className="text-xl md:text-2xl text-white/50 mb-20"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Setiap tombol adalah hasil keputusan desain yang ekstrem. Rasakan
            sendiri perbedaannya.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
            <button
              onClick={() => alert("Mengarahkan ke halaman Order...")}
              className="group flex items-center justify-center gap-4 w-full sm:w-auto px-12 py-6 bg-[#D4E815] text-black font-bold text-xl tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              ORDER NOW
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                className="group-hover:translate-x-2 transition-transform"
              >
                <path
                  d="M1 7h12M8 2l6 5-6 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </button>
            <button
              onClick={() => alert("Terima kasih! Anda telah bergabung ke dalam Waiting List.")}
              className="flex items-center justify-center w-full sm:w-auto px-12 py-6 border border-white/20 text-white font-bold text-xl tracking-[0.2em] uppercase hover:border-[#D4E815] hover:text-[#D4E815] transition-colors duration-300"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              JOIN WAITLIST
            </button>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.4} className="relative w-full mt-64">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
          {["INSTAGRAM", "TWITTER", "DISCORD", "YOUTUBE"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-bold tracking-[0.3em] text-white/40 hover:text-[#D4E815] transition-colors uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="w-full max-w-2xl mx-auto h-[2px] bg-white/10 mb-12" />
        <p
          className="text-sm font-bold tracking-[0.4em] uppercase text-white/30"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          © {new Date().getFullYear()} WPDEV. ALL RIGHTS RESERVED.
        </p>
      </FadeIn>
    </section>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function BrandStory() {
  return (
    <>
      <ManifestoSection />
      <FeaturesSection />
      <QuoteSection />
      <SpecSection />
      <ProcessSection />
      <SocialProofSection />
      <CtaSection />
    </>
  );
}
