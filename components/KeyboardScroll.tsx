"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValue, useTransform, motion } from "framer-motion";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 192;
const FRAME_PATH = (i: number) => `/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

// Fog background — eyedropped from frame sequence
const BG_COLOR = "#E8E8E8";

// ─── STORY BEATS ───────────────────────────────────────────────────────────────
const storyBeats = [
  {
    scrollStart: 0,
    scrollEnd: 0.18,
    headline: "WpDev Keyboard.",
    subtext: "Engineered clarity.",
    align: "center" as const,
  },
  {
    scrollStart: 0.2,
    scrollEnd: 0.42,
    headline: "Built for Precision.",
    subtext: "Every detail, measured.",
    align: "left" as const,
  },
  {
    scrollStart: 0.52,
    scrollEnd: 0.72,
    headline: "Layered Engineering.",
    subtext: "See what's inside.",
    align: "right" as const,
  },
  {
    scrollStart: 0.84,
    scrollEnd: 1.0,
    headline: "Assembled. Ready.",
    subtext: "Scroll back to replay.",
    align: "center" as const,
  },
];

// ─── TYPES ─────────────────────────────────────────────────────────────────────
interface Beat {
  scrollStart: number;
  scrollEnd: number;
  headline: string;
  subtext: string;
  align: "left" | "center" | "right";
}

function computeOpacity(progress: number, beat: Beat): number {
  const fw = 0.07;
  const { scrollStart: s, scrollEnd: e } = beat;
  if (progress < s || progress > e) return 0;
  if (progress < s + fw) return (progress - s) / fw;
  if (progress > e - fw) return (e - progress) / fw;
  return 1;
}

function computeTranslateY(progress: number, beat: Beat): number {
  const fw = 0.07;
  const { scrollStart: s } = beat;
  if (progress < s) return 14;
  if (progress < s + fw) return 14 - 14 * ((progress - s) / fw);
  return 0;
}

// ─── LOADING SCREEN ────────────────────────────────────────────────────────────
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: BG_COLOR }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-black/10" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-black/60 animate-spin"
            style={{ animationDuration: "0.9s" }}
          />
        </div>
        <div className="text-center">
          <p
            className="text-sm tracking-[0.3em] uppercase font-bold text-black/60 mb-2"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            WPDEV
          </p>
          <p
            className="text-[10px] uppercase tracking-widest text-black/30 font-medium"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            INITIALIZING
          </p>
        </div>
        <div className="w-44 h-px bg-black/10 overflow-hidden">
          <div
            className="h-full bg-[#D4E815]"
            style={{
              width: `${Math.round(progress * 100)}%`,
              transition: "width 0.2s ease-out",
            }}
          />
        </div>
        <p
          className="text-xs text-black/40 tabular-nums font-bold tracking-widest"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {Math.round(progress * 100)}%
        </p>
      </div>
    </div>
  );
}

// ─── TEXT OVERLAY (Framer Motion–driven, no React re-renders) ──────────────────
function TextOverlay({
  beat,
  scrollProgress,
}: {
  beat: Beat;
  scrollProgress: ReturnType<typeof useMotionValue<number>>;
}) {
  const opacity = useTransform(scrollProgress, (v) => computeOpacity(v, beat));
  const y = useTransform(scrollProgress, (v) => computeTranslateY(v, beat));

  const alignClass =
    beat.align === "left"
      ? "items-start text-left"
      : beat.align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  const positionStyle: React.CSSProperties =
    beat.align === "left"
      ? { left: "clamp(1rem, 6vw, 6rem)", right: "auto", maxWidth: "90vw" }
      : beat.align === "right"
        ? { right: "clamp(1rem, 6vw, 6rem)", left: "auto", maxWidth: "90vw" }
        : { left: 0, right: 0, margin: "0 auto", width: "100%", padding: "0 1rem" };

  return (
    <motion.div
      className={`absolute bottom-[12%] flex flex-col pointer-events-none ${alignClass}`}
      style={{
        ...positionStyle,
        opacity,
        y,
        willChange: "opacity, transform",
      }}
    >
      <h2
        className="text-[clamp(2.5rem,10vw,7rem)] font-bold tracking-normal uppercase leading-[0.85] text-black/90 drop-shadow-sm break-words"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {beat.headline}
      </h2>
      <p
        className="text-[clamp(1rem,1.5vw,1.2rem)] text-black/60 font-semibold tracking-[0.1em] uppercase mt-2 drop-shadow-sm flex items-center gap-3"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span className="w-4 h-px bg-[#D4E815] inline-block" />
        {beat.subtext}
      </p>
    </motion.div>
  );
}

// ─── CANVAS RENDERER (pure imperative, outside React render) ──────────────────
function drawFrameAt(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  frames: HTMLImageElement[],
  displayFrame: number // float, e.g. 47.3
) {
  // PERFORMANCE: Cap DPR at 1.25. On 4K/Retina screens (DPR 2 or 3), rendering
  // full-screen image sequences destroys GPU fill-rate. Capping it keeps it lightweight.
  const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;

  if (cw === 0 || ch === 0) return;

  // Resize backing store if dimensions changed
  const targetW = Math.round(cw * dpr);
  const targetH = Math.round(ch * dpr);
  if (canvas.width !== targetW || canvas.height !== targetH) {
    canvas.width = targetW;
    canvas.height = targetH;
    // Disable image smoothing for faster rendering if needed, but usually default is fine
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "low"; // PERFORMANCE: Fast interpolation
  }

  const baseFrame = Math.floor(displayFrame);
  const fraction = displayFrame - baseFrame;
  const nextFrame = Math.min(baseFrame + 1, TOTAL_FRAMES - 1);

  const img1 = frames[Math.max(0, Math.min(baseFrame, TOTAL_FRAMES - 1))];
  const img2 = frames[Math.max(0, Math.min(nextFrame, TOTAL_FRAMES - 1))];

  if (!img1?.complete || img1.naturalWidth === 0) return;

  // Cover-fit geometry (fills the entire screen, eliminates black bars)
  const imgW = img1.naturalWidth;
  const imgH = img1.naturalHeight;
  const scale = Math.max(cw / imgW, ch / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const dx = (cw - drawW) / 2;
  const dy = (ch - drawH) / 2;

  // Reset transform to identity before drawing (DPR scale applied via CSS only)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  // PERFORMANCE: We removed ctx.fillRect() here. Because cover-fit guarantees the 
  // image fills the entire canvas, clearing the background is a wasted full-screen paint.

  // Draw base frame
  ctx.globalAlpha = 1;
  ctx.drawImage(img1, dx, dy, drawW, drawH);

  // Crossfade next frame for buttery-smooth interpolation
  // PERFORMANCE: Only blend if the fraction is visually significant (> 5%)
  if (fraction > 0.05 && img2?.complete && img2.naturalWidth !== 0) {
    ctx.globalAlpha = fraction;
    ctx.drawImage(img2, dx, dy, drawW, drawH);
  }
}

// ─── KEYBOARD SCROLL COMPONENT ─────────────────────────────────────────────────
export default function KeyboardScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);

  // Refs keep scroll-driven drawing outside React renders.
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const drawRequestRef = useRef<(() => void) | null>(null);
  const isLoadedRef = useRef(false);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // MotionValue for text overlays — no React re-render on change
  const scrollMV = useMotionValue(0);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── Image Preloading ───────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    let lastReportedProgress = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    framesRef.current = images;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        loaded++;
        const p = loaded / TOTAL_FRAMES;
        if (p === 1 || p - lastReportedProgress >= 0.05) {
          lastReportedProgress = p;
          setLoadProgress(p);
        }
        if (loaded === TOTAL_FRAMES) {
          isLoadedRef.current = true;
          setIsLoaded(true);
        }
      };
      images[i] = img;
      img.src = FRAME_PATH(i + 1);
    }

    return () => {
      framesRef.current.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // ─── Sync scroll → targetFrame ─────────────────────────────────────────────
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const clamped = Math.max(0, Math.min(1, v));
      targetFrameRef.current = clamped * (TOTAL_FRAMES - 1);
      scrollMV.set(clamped);
      drawRequestRef.current?.();
    });
  }, [scrollYProgress, scrollMV]);

  // ─── Draw only when the scroll position or canvas size changes ──────────────
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const draw = () => {
      rafRef.current = null;
      if (isLoadedRef.current) {
        drawFrameAt(ctx, canvas, framesRef.current, targetFrameRef.current);
      }
    };

    const scheduleDraw = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    drawRequestRef.current = scheduleDraw;
    const resizeObserver = new ResizeObserver(scheduleDraw);
    resizeObserver.observe(canvas);
    scheduleDraw();

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      drawRequestRef.current = null;
    };
  }, [isLoaded]);

  // ─── Scroll hint visibility ─────────────────────────────────────────────────
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  return (
    <>
      {/* Loading screen */}
      {!isLoaded && <LoadingScreen progress={loadProgress} />}

      {/* Scroll container */}
      <div
        ref={containerRef}
        style={{ height: "800vh", position: "relative" }}
      >
        {/* Sticky canvas viewport */}
        <div
          className="sticky top-0 w-full h-screen overflow-hidden"
          style={{ backgroundColor: BG_COLOR }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: "block" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[15%] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, ${BG_COLOR})`,
            }}
          />

          {/* Story text overlays — MotionValue–driven (zero React re-renders) */}
          {storyBeats.map((beat, i) => (
            <TextOverlay key={i} beat={beat} scrollProgress={scrollMV} />
          ))}

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: hintOpacity }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase text-black/30"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Scroll
            </p>
            <motion.div
              className="w-[1px] h-6 bg-black/20 rounded-full origin-top"
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Top nav */}
          <nav className="absolute top-8 left-8 right-8 md:top-12 md:left-16 md:right-16 flex items-center justify-between z-10 pointer-events-none">
            <span
              className="text-lg font-bold tracking-[0.1em] uppercase text-black/80"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              WPDEV
            </span>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#D4E815]" />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase text-black/40"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                MECHANICAL KEYBOARDS
              </span>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
