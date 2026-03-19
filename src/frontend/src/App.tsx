import { useNavigate } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Globe,
  LayoutGrid,
  Lightbulb,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";
import { useActor } from "./hooks/useActor";
import { type PortfolioProject, portfolioProjects } from "./portfolioData";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref as React.RefObject<T>;
}

// ─── Services Data ────────────────────────────────────────────────────────────
const services: ServiceItem[] = [
  {
    icon: <LayoutGrid size={22} strokeWidth={1.5} />,
    title: "Retail Space Planning & Design",
    description:
      "We craft luxury retail environments through precise spatial planning, bespoke fixtures, curated lighting, and premium materials that command the senses.",
  },
  {
    icon: <Sparkles size={22} strokeWidth={1.5} />,
    title: "Brand Experience Development",
    description:
      "From brand storytelling to sensory branding, we engineer immersive experiences that fuse physical and digital touchpoints into unforgettable journeys.",
  },
  {
    icon: <Eye size={22} strokeWidth={1.5} />,
    title: "Visual Merchandising",
    description:
      "Display systems, window concepts, and seasonal transformations that command attention, inspire desire, and convert footfall into lasting loyalty.",
  },
  {
    icon: <Lightbulb size={22} strokeWidth={1.5} />,
    title: "Store Concept Creation",
    description:
      "R&D-led concept design that anticipates emerging retail trends and builds distinctive, ownable store identities rooted in cultural intelligence.",
  },
  {
    icon: <Globe size={22} strokeWidth={1.5} />,
    title: "Global Retail Rollout",
    description:
      "End-to-end international expansion management: global design guidelines, local cultural adaptation, and precision vendor coordination at scale.",
  },
  {
    icon: <Monitor size={22} strokeWidth={1.5} />,
    title: "Innovative Kiosk Solutions",
    description:
      "Compact retail formats powered by interactive technology and modular design — maximum brand impact delivered within minimal architectural footprint.",
  },
];

// ─── Retail slider images ────────────────────────────────────────────────────
const retailSliderImages = [
  {
    src: "/assets/generated/retail-cosmetics.dim_800x600.jpg",
    label: "Cosmetics & Skincare",
  },
  {
    src: "/assets/generated/retail-drinks.dim_800x600.jpg",
    label: "Premium Beverages",
  },
  {
    src: "/assets/generated/retail-handbags.dim_800x600.jpg",
    label: "Luxury Handbags",
  },
  {
    src: "/assets/generated/retail-dryfruits.dim_800x600.jpg",
    label: "Artisan Dry Fruits",
  },
  {
    src: "/assets/generated/retail-jewellery.dim_800x600.jpg",
    label: "Fine Jewellery",
  },
  {
    src: "/assets/generated/retail-interior.dim_800x600.jpg",
    label: "Retail Interiors",
  },
  {
    src: "/assets/generated/retail-ayurveda.dim_800x600.jpg",
    label: "Ayurvedic Beauty",
  },
  {
    src: "/assets/generated/retail-hemp.dim_800x600.jpg",
    label: "Hemp & Wellness",
  },
];

// ─── Hero background image collage data ──────────────────────────────────────
const heroBackgroundImages = [
  "/assets/generated/retail-cosmetics.dim_800x600.jpg",
  "/assets/generated/retail-drinks.dim_800x600.jpg",
  "/assets/generated/retail-handbags.dim_800x600.jpg",
  "/assets/generated/retail-dryfruits.dim_800x600.jpg",
  "/assets/generated/retail-jewellery.dim_800x600.jpg",
  "/assets/generated/retail-interior.dim_800x600.jpg",
  "/assets/generated/retail-ayurveda.dim_800x600.jpg",
  "/assets/generated/retail-hemp.dim_800x600.jpg",
];

// ─── Hero slideshow hook ──────────────────────────────────────────────────────
function useHeroSlideshow(images: string[], intervalMs = 4000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  // Preload all images eagerly before starting slideshow
  useEffect(() => {
    let loaded = 0;
    const total = images.length;
    for (const src of images) {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded >= total) setAllLoaded(true);
      };
      img.src = src;
    }
  }, [images]);

  useEffect(() => {
    if (!allLoaded) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, allLoaded]);

  return activeIndex;
}

// ─── PDF Download ─────────────────────────────────────────────────────────────
function downloadProjectsPDF() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>DesignO — Project Portfolio</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, serif; color: #1a1a1a; background: #fff; padding: 48px; }
  .header { border-bottom: 2px solid #208e8f; padding-bottom: 20px; margin-bottom: 36px; }
  .header h1 { font-size: 2.2rem; font-weight: 300; letter-spacing: 0.15em; color: #208e8f; }
  .header p { font-family: sans-serif; font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: #666; margin-top: 6px; }
  table { width: 100%; border-collapse: collapse; }
  thead th { font-family: sans-serif; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.2em; color: #208e8f; padding: 10px 12px; border-bottom: 1px solid #208e8f; text-align: left; }
  tbody tr { border-bottom: 1px solid #e8e8e8; }
  tbody tr:nth-child(even) { background: #f7fafa; }
  td { padding: 14px 12px; vertical-align: top; }
  .num { font-family: sans-serif; font-size: 0.7rem; color: #208e8f; font-weight: 600; }
  .title { font-size: 1rem; font-weight: 400; color: #1a1a1a; }
  .category { font-family: sans-serif; font-size: 0.72rem; color: #208e8f; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }
  .client { font-family: sans-serif; font-size: 0.78rem; color: #555; }
  .desc { font-family: sans-serif; font-size: 0.8rem; color: #444; line-height: 1.6; max-width: 320px; }
  .year { font-family: sans-serif; font-size: 0.82rem; color: #666; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #ddd; font-family: sans-serif; font-size: 0.72rem; color: #999; }
</style>
</head>
<body>
<div class="header">
  <h1>DESIGNO</h1>
  <p>Selected Project Portfolio — Luxury Retail Design Studio | New Delhi, India</p>
</div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Project</th>
      <th>Client</th>
      <th>Description</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    ${portfolioProjects
      .map(
        (p) => `<tr>
      <td><span class="num">${String(p.id).padStart(2, "0")}</span></td>
      <td>
        <div class="title">${p.title}</div>
        <div class="category">${p.category}</div>
      </td>
      <td><span class="client">${p.client}</span></td>
      <td><span class="desc">${p.description}</span></td>
      <td><span class="year">${p.year}</span></td>
    </tr>`,
      )
      .join("")}
  </tbody>
</table>
<div class="footer">© ${new Date().getFullYear()} DesignO Studio. All rights reserved. &nbsp;|&nbsp; Info@designo.studio &nbsp;|&nbsp; +91 9319322675</div>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 400);
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const navItems = [
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "About Us", id: "philosophy" },
    { label: "Our Team", id: "team" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "border-b" : "bg-transparent",
      ].join(" ")}
      style={
        scrolled
          ? {
              backdropFilter: "blur(24px) saturate(1.5)",
              WebkitBackdropFilter: "blur(24px) saturate(1.5)",
              background: "oklch(0.065 0.012 240 / 0.88)",
              borderColor: "oklch(0.748 0.093 197 / 0.10)",
            }
          : {}
      }
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo — full "DesignO" at top, compact "DO" when scrolled */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center group relative"
          aria-label="DesignO — Back to top"
          style={{
            width: scrolled ? "44px" : "clamp(120px,18vw,180px)",
            transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* Full wordmark — visible at top */}
          <img
            src="/assets/generated/designo-logo-full-transparent.dim_400x100.png"
            alt="DesignO"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-7 md:h-8 w-auto object-contain group-hover:opacity-80"
            style={{
              filter: "drop-shadow(0 0 8px oklch(0.748 0.093 197 / 0.15))",
              opacity: scrolled ? 0 : 1,
              transform: `translateY(-50%) scale(${scrolled ? 0.85 : 1})`,
              transition: "opacity 0.4s ease, transform 0.4s ease",
              pointerEvents: "none",
            }}
          />
          {/* Compact "DO" monogram — visible when scrolled */}
          <img
            src="/assets/generated/designo-logo-compact-transparent.dim_100x100.png"
            alt="DO"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-8 md:h-10 w-auto object-contain"
            style={{
              filter: "drop-shadow(0 0 14px oklch(0.748 0.093 197 / 0.4))",
              opacity: scrolled ? 1 : 0,
              transform: `translateY(-50%) scale(${scrolled ? 1 : 1.1})`,
              transition: "opacity 0.4s ease, transform 0.4s ease",
              pointerEvents: "none",
            }}
          />
          {/* Invisible spacer so button has layout height */}
          <span className="invisible font-display text-xl md:text-2xl font-light tracking-[0.2em]">
            DO
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map(({ label, id }) => (
            <li key={id} className="relative">
              <button
                type="button"
                data-ocid={`nav.${id}.link`}
                onClick={() => scrollTo(id)}
                className="group label-overline text-foreground/55 hover:text-foreground transition-colors duration-300 cursor-pointer pb-0.5"
              >
                {label}
                <span
                  className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "oklch(0.748 0.093 197 / 0.6)" }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 py-8 flex flex-col gap-5"
          style={{
            background: "oklch(0.065 0.012 240 / 0.96)",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid oklch(0.748 0.093 197 / 0.08)",
          }}
        >
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              type="button"
              data-ocid={`nav.${id}.link`}
              onClick={() => scrollTo(id)}
              className="label-overline text-foreground/65 hover:text-teal-light transition-colors duration-300 text-left"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = useHeroSlideshow(heroBackgroundImages, 4000);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* ── Hero Background: slideshow of 8 images with ribbed glass effect ── */}
      {/* Layer 1: Sliding images — each fades in/out */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {heroBackgroundImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              filter: "saturate(0.85) brightness(0.72)",
              transition:
                i === activeIndex
                  ? "opacity 2.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "opacity 2.4s cubic-bezier(0.4, 0, 0.2, 1) 0s",
              willChange: "opacity",
              zIndex: i === activeIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Layer 2: Dark gradient overlay — ensures text legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.055 0.008 255 / 0.62) 0%, oklch(0.06 0.006 271 / 0.72) 50%, oklch(0.055 0.008 255 / 0.80) 100%)",
        }}
      />

      {/* Layer 3: Ribbed/reeded glass effect — vertical glass ridges */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        aria-hidden="true"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.025) 0px,
            rgba(255,255,255,0.055) 1px,
            transparent 1px,
            transparent 8px,
            rgba(0,0,0,0.03) 8px,
            rgba(0,0,0,0.03) 9px,
            transparent 9px,
            transparent 16px
          )`,
          backdropFilter: "blur(0.8px)",
          WebkitBackdropFilter: "blur(0.8px)",
        }}
      />

      {/* Layer 4: Multi-layer atmospheric shimmer on top */}
      <div
        className="absolute inset-0 z-[3] hero-shimmer opacity-55 pointer-events-none"
        aria-hidden="true"
      />

      {/* Architectural grid */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.022] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.748 0.093 197) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.748 0.093 197) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Primary glow orb — large, centered */}
      <div
        className="absolute top-1/2 left-1/2 z-[3] pointer-events-none"
        aria-hidden="true"
        style={{
          width: "900px",
          height: "700px",
          transform: "translate(-50%, -55%)",
          background:
            "radial-gradient(ellipse, oklch(0.565 0.095 191 / 0.14) 0%, oklch(0.748 0.093 197 / 0.03) 45%, transparent 70%)",
          filter: "blur(50px)",
          animation: "pulse-bg 8s ease-in-out infinite",
        }}
      />

      {/* Secondary accent orb — offset */}
      <div
        className="absolute z-[3] pointer-events-none"
        aria-hidden="true"
        style={{
          top: "30%",
          right: "15%",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, oklch(0.678 0.083 179 / 0.07) 0%, transparent 70%)",
          filter: "blur(35px)",
          animation: "pulse-bg 11s ease-in-out 2s infinite",
        }}
      />

      {/* Tertiary orb — bottom left */}
      <div
        className="absolute z-[3] pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "20%",
          left: "10%",
          width: "280px",
          height: "280px",
          background:
            "radial-gradient(circle, oklch(0.565 0.095 191 / 0.06) 0%, transparent 70%)",
          filter: "blur(30px)",
          animation: "pulse-bg 9s ease-in-out 4s infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-[10] flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        {/* Main wordmark */}
        <div
          className="w-full max-w-[520px] mb-2"
          style={{
            animation: "heroFadeUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both",
            filter: "drop-shadow(0 0 40px oklch(0.748 0.093 197 / 0.15))",
          }}
        >
          <img
            src="/assets/generated/designo-logo-full-transparent.dim_400x100.png"
            alt="DesignO"
            className="w-full h-auto object-contain"
            style={{ animation: "hero-float 7s ease-in-out 1.5s infinite" }}
          />
          <h1
            className="font-display text-[clamp(4.5rem,14vw,10rem)] font-light tracking-[0.3em] text-foreground hidden text-glow-pulse"
            style={{ display: "none" }}
          >
            DESIGNO
          </h1>
        </div>

        {/* Divider line with dots */}
        <div
          className="flex items-center gap-3 my-10"
          style={{ animation: "heroFadeIn 1s ease 0.55s both" }}
        >
          <div
            className="h-px w-16 md:w-28"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.748 0.093 197 / 0.45))",
            }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "oklch(0.748 0.093 197 / 0.6)" }}
          />
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "oklch(0.748 0.093 197 / 0.35)" }}
          />
          <div
            className="h-px w-16 md:w-28"
            style={{
              background:
                "linear-gradient(to left, transparent, oklch(0.748 0.093 197 / 0.45))",
            }}
          />
        </div>

        {/* Tagline — dramatic and editorial */}
        <h2
          className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light italic text-foreground mb-6 leading-[1.12] tracking-wide"
          style={{
            animation: "heroFadeUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.55s both",
            textShadow: "0 0 60px oklch(0.748 0.093 197 / 0.08)",
          }}
        >
          Retail{" "}
          <span className="text-teal-gradient not-italic font-semibold">
            Beyond
          </span>{" "}
          <em className="italic">Reality</em>
        </h2>

        {/* Sub-tagline */}
        <p
          className="font-body text-[0.74rem] text-foreground/40 tracking-[0.28em] uppercase mb-14 max-w-md leading-[2]"
          style={{
            animation: "heroFadeUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.7s both",
          }}
        >
          Crafting immersive environments for the world's most discerning brands
        </p>

        {/* CTA pair */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{
            animation: "heroFadeUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.85s both",
          }}
        >
          {/* Primary CTA */}
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={scrollToContact}
            className="group relative overflow-hidden btn-magnetic"
            style={{
              padding: "14px 40px",
              background:
                "linear-gradient(135deg, oklch(0.748 0.093 197), oklch(0.565 0.095 191))",
              color: "oklch(0.06 0.006 271)",
              fontSize: "0.68rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            {/* Shimmer overlay */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.748 0.093 197 / 0.9), oklch(0.678 0.083 179 / 0.95))",
              }}
            />
            <span className="relative z-10 flex items-center gap-3">
              Start a Project
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={scrollToPortfolio}
            className="group relative overflow-hidden btn-magnetic"
            style={{
              padding: "13px 40px",
              background: "oklch(1 0 0 / 0.04)",
              backdropFilter: "blur(12px)",
              border: "1px solid oklch(1 0 0 / 0.14)",
              color: "oklch(0.97 0.005 197 / 0.75)",
              fontSize: "0.68rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.748 0.093 197 / 0.4)";
              (e.currentTarget as HTMLElement).style.color =
                "oklch(0.97 0.005 197)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(1 0 0 / 0.14)";
              (e.currentTarget as HTMLElement).style.color =
                "oklch(0.97 0.005 197 / 0.75)";
            }}
          >
            <span className="flex items-center gap-3">
              View Work
              <Eye
                size={13}
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </span>
          </button>
        </div>

        {/* Stats row — adds credibility */}
        <div
          className="flex items-center gap-8 md:gap-14 mt-20 pt-8"
          style={{
            animation: "heroFadeIn 1s ease 1.2s both",
            borderTop: "1px solid oklch(1 0 0 / 0.06)",
          }}
        >
          {[
            { num: "15+", label: "Landmark Projects" },
            { num: "2023", label: "Est. New Delhi" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-[1.8rem] md:text-[2.2rem] font-light leading-none mb-1.5 text-teal-gradient">
                {stat.num}
              </p>
              <p className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-foreground/35">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[10]"
        style={{
          animation: "heroFadeIn 1s ease 2.2s both",
          opacity: 0,
        }}
      >
        <div
          className="w-px h-12 animate-pulse-teal"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.748 0.093 197 / 0.6), transparent)",
          }}
        />
        <ChevronDown
          size={14}
          style={{ color: "oklch(0.748 0.093 197 / 0.5)" }}
          className="animate-bounce"
        />
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-bg {
          0%, 100% { opacity: 0.85; transform: translate(-50%, -55%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -55%) scale(1.06); }
        }
      `}</style>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
// Icon background color palette — each card gets a distinct visual character
const serviceCardAccents = [
  { from: "oklch(0.208 0.07 191)", to: "oklch(0.748 0.093 197)" }, // teal deep → teal light
  { from: "oklch(0.28 0.09 225)", to: "oklch(0.565 0.095 191)" }, // indigo → teal mid
  { from: "oklch(0.18 0.06 255)", to: "oklch(0.54 0.12 195)" }, // navy → aqua
  { from: "oklch(0.22 0.07 180)", to: "oklch(0.678 0.083 179)" }, // dark teal → bright teal
  { from: "oklch(0.30 0.09 205)", to: "oklch(0.748 0.093 197)" }, // blue-teal → teal
  { from: "oklch(0.20 0.08 215)", to: "oklch(0.565 0.095 191)" }, // deep blue → teal mid
];

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const ref = useReveal();
  const delayClass = `reveal-delay-${Math.min(index + 1, 6)}`;
  const pad = String(index + 1).padStart(2, "0");
  const accent = serviceCardAccents[index % serviceCardAccents.length];

  return (
    <article
      ref={ref}
      data-ocid={`services.item.${index + 1}`}
      className={`reveal ${delayClass} group relative overflow-hidden cursor-default`}
      style={{
        borderRadius: "6px",
        border: "1px solid oklch(0.88 0.008 220 / 0.8)",
        minHeight: "320px",
        background: "#f4f5f7",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition:
          "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-5px)";
        el.style.boxShadow = `0 12px 36px rgba(0,0,0,0.12), 0 0 0 1px ${accent.to}40`;
        el.style.borderColor = `${accent.to}50`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        el.style.borderColor = "oklch(0.88 0.008 220 / 0.8)";
      }}
    >
      {/* ── Subtle teal tint gradient on hover ── */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `linear-gradient(145deg, ${accent.from}0d 0%, ${accent.to}0a 100%)`,
        }}
      />

      {/* ── Large decorative number — background texture ── */}
      <span
        className="absolute -bottom-4 -right-3 font-display font-bold select-none pointer-events-none z-[1] transition-all duration-500 group-hover:opacity-[0.10] group-hover:scale-110"
        aria-hidden="true"
        style={{
          fontSize: "clamp(6rem, 14vw, 9rem)",
          lineHeight: 1,
          color: `${accent.to}`,
          opacity: 0.05,
          filter: "blur(0.5px)",
          transformOrigin: "bottom right",
        }}
      >
        {pad}
      </span>

      {/* ── Card content — always fully visible ── */}
      <div
        className="relative z-10 p-8 lg:p-10 flex flex-col h-full"
        style={{ minHeight: "320px" }}
      >
        {/* Icon tile */}
        <div
          className="flex items-center justify-center w-14 h-14 mb-7 transition-all duration-400 group-hover:scale-105 group-hover:shadow-[0_0_24px_oklch(0.565_0.095_191/0.30)]"
          style={{
            background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.to} 100%)`,
            borderRadius: "4px",
            color: "#ffffff",
            boxShadow: `0 4px 16px ${accent.to.replace(")", " / 0.18)")}`,
          }}
        >
          {service.icon}
        </div>

        {/* Title */}
        <h3
          className="font-display text-[1.2rem] font-semibold mb-4 leading-snug transition-colors duration-300 group-hover:text-teal-mid"
          style={{ color: "oklch(0.18 0.02 220)" }}
        >
          {service.title}
        </h3>

        {/* Hairline — expands on hover */}
        <div
          className="h-px mb-5 transition-all duration-500 group-hover:w-16"
          style={{
            background: `linear-gradient(to right, ${accent.to}, transparent)`,
            width: "32px",
          }}
        />

        {/* Description — always visible, always readable */}
        <p
          className="font-body text-[0.80rem] leading-[1.85] flex-1"
          style={{ color: "oklch(0.42 0.012 220)" }}
        >
          {service.description}
        </p>
      </div>

      {/* ── Top border highlight — teal accent line on hover ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${accent.from}, ${accent.to}, transparent)`,
        }}
      />
    </article>
  );
}

function Services() {
  const headingRef = useReveal();

  return (
    <section
      id="services"
      data-ocid="services.section"
      className="py-28 md:py-40 px-6 relative overflow-hidden"
      style={{
        background: "#ffffff",
      }}
    >
      {/* Background accent glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 10%, oklch(0.748 0.093 197 / 0.04), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headingRef} className="reveal mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-7">
            <p
              className="label-overline"
              style={{ color: "oklch(0.565 0.095 191)" }}
            >
              Core Capabilities
            </p>
            <div
              className="h-px flex-1 max-w-xs"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.565 0.095 191 / 0.4), transparent)",
              }}
            />
          </div>
          <h2
            className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.08] max-w-3xl tracking-wide"
            style={{ color: "oklch(0.18 0.02 220)" }}
          >
            Crafted for the World's Most{" "}
            <em
              className="italic font-normal"
              style={{ color: "oklch(0.565 0.095 191)" }}
            >
              Discerning
            </em>{" "}
            Brands
          </h2>
          <p
            className="font-body text-[0.82rem] mt-5 max-w-lg leading-[1.85]"
            style={{ color: "oklch(0.42 0.012 220)" }}
          >
            Six core capabilities. One unified vision: transforming retail
            spaces into brand stories that endure.
          </p>
        </div>

        {/* Services grid — dark glass cards with hover-reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Retail Slider ────────────────────────────────────────────────────────────
function RetailSlider() {
  // Duplicate images for seamless loop
  const doubled = [...retailSliderImages, ...retailSliderImages];

  return (
    <section
      aria-label="Retail product showcase"
      className="py-8 overflow-hidden relative"
      style={{
        borderTop: "1px solid oklch(0.748 0.093 197 / 0.10)",
        borderBottom: "1px solid oklch(0.748 0.093 197 / 0.10)",
        background: "oklch(0.065 0.010 240 / 0.60)",
      }}
    >
      {/* Teal edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, oklch(0.065 0.010 240), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, oklch(0.065 0.010 240), transparent)",
        }}
      />

      <div
        className="flex retail-scroll-track"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="group relative mx-2.5 shrink-0 overflow-hidden"
            style={{
              width: "340px",
              height: "220px",
              border: "1px solid oklch(0.748 0.093 197 / 0.12)",
            }}
          >
            <img
              src={item.src}
              alt={item.label}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              style={{ filter: "saturate(1.1) brightness(0.95)" }}
            />

            {/* Permanent subtle teal overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.07 0.008 240 / 0.5) 0%, transparent 50%)",
              }}
            />

            {/* Glass hover label */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-end pb-5 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-350"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.07 0.004 271 / 0.80) 0%, transparent 60%)",
              }}
            >
              <div
                className="w-8 h-px mb-1"
                style={{ background: "oklch(0.748 0.093 197 / 0.7)" }}
              />
              <span
                className="font-body text-[0.62rem] tracking-[0.22em] uppercase text-center px-4"
                style={{ color: "oklch(0.748 0.093 197)" }}
              >
                {item.label}
              </span>
            </div>

            {/* Corner teal accent */}
            <div
              className="absolute top-0 left-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                borderTop: "2px solid oklch(0.748 0.093 197 / 0.7)",
                borderLeft: "2px solid oklch(0.748 0.093 197 / 0.7)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                borderBottom: "2px solid oklch(0.748 0.093 197 / 0.7)",
                borderRight: "2px solid oklch(0.748 0.093 197 / 0.7)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Brand Logos ─────────────────────────────────────────────────────────────
const brandLogos = [
  {
    src: "/assets/generated/brand-logo-luxora-transparent.dim_300x120.png",
    name: "Luxora",
  },
  {
    src: "/assets/generated/brand-logo-maison-transparent.dim_300x120.png",
    name: "Maison",
  },
  {
    src: "/assets/generated/brand-logo-velour-transparent.dim_300x120.png",
    name: "Velour",
  },
  {
    src: "/assets/generated/brand-logo-aurora-transparent.dim_300x120.png",
    name: "Aurora",
  },
  {
    src: "/assets/generated/brand-logo-celeste-transparent.dim_300x120.png",
    name: "Celeste",
  },
  {
    src: "/assets/generated/brand-logo-noire-transparent.dim_300x120.png",
    name: "Noire",
  },
  {
    src: "/assets/generated/brand-logo-orion-transparent.dim_300x120.png",
    name: "Orion",
  },
  {
    src: "/assets/generated/brand-logo-soleil-transparent.dim_300x120.png",
    name: "Soleil",
  },
];

function BrandLogos() {
  const headingRef = useReveal();
  const doubled = [...brandLogos, ...brandLogos];

  return (
    <section
      aria-label="Brands we've worked with"
      className="py-16 overflow-hidden relative"
      style={{
        borderTop: "1px solid oklch(0.748 0.093 197 / 0.10)",
        borderBottom: "1px solid oklch(0.748 0.093 197 / 0.10)",
        background: "oklch(0.068 0.012 240 / 0.5)",
      }}
    >
      {/* Section heading */}
      <div ref={headingRef} className="reveal text-center mb-10 px-6">
        <p className="label-overline mb-4">Trusted By</p>
        <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-light text-foreground tracking-wide">
          Brands We've{" "}
          <em className="italic text-teal-light font-light">Worked With</em>
        </h2>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, oklch(0.068 0.012 240), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, oklch(0.068 0.012 240), transparent)",
          }}
        />

        <div
          className="flex brand-scroll-track"
          style={{ width: "max-content" }}
        >
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="group mx-3 shrink-0 flex items-center justify-center transition-all duration-400"
              style={{
                width: "180px",
                height: "72px",
                background: "oklch(0.09 0.015 220 / 0.70)",
                backdropFilter: "blur(16px) saturate(1.3)",
                WebkitBackdropFilter: "blur(16px) saturate(1.3)",
                border: "1px solid oklch(0.748 0.093 197 / 0.10)",
                padding: "16px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.748 0.093 197 / 0.30)";
                (e.currentTarget as HTMLElement).style.background =
                  "oklch(0.748 0.093 197 / 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.748 0.093 197 / 0.10)";
                (e.currentTarget as HTMLElement).style.background =
                  "oklch(0.09 0.015 220 / 0.70)";
              }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className="max-w-full max-h-full object-contain transition-all duration-400 group-hover:brightness-125"
                style={{ opacity: 0.45, filter: "grayscale(20%)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.9";
                  (e.currentTarget as HTMLImageElement).style.filter =
                    "grayscale(0%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.45";
                  (e.currentTarget as HTMLImageElement).style.filter =
                    "grayscale(20%)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio Card ───────────────────────────────────────────────────────────
function PortfolioCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const navigate = useNavigate();
  const num = String(project.id).padStart(2, "0");

  const handleClick = () => {
    navigate({ to: "/project/$id", params: { id: String(project.id) } });
  };

  return (
    <button
      type="button"
      data-ocid={`portfolio.item.${index + 1}`}
      className="group relative overflow-hidden cursor-pointer glass-card-hover card-shimmer w-full text-left"
      onClick={handleClick}
      aria-label={`View ${project.title} project`}
      style={{
        background: "oklch(0.09 0.015 220 / 0.75)",
        backdropFilter: "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: "blur(20px) saturate(1.3)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        borderRadius: "2px",
        display: "block",
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/10" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          loading="lazy"
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.012_255/0.7)] via-transparent to-transparent" />

        {/* "View Project" overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "oklch(0.07 0.004 271 / 0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          <span
            className="flex items-center gap-2 font-body text-[0.65rem] tracking-[0.25em] uppercase px-5 py-2.5"
            style={{
              border: "1px solid oklch(0.748 0.093 197 / 0.6)",
              background: "oklch(0.748 0.093 197 / 0.12)",
              backdropFilter: "blur(8px)",
              color: "oklch(0.748 0.093 197)",
            }}
          >
            View Project
            <ArrowRight size={11} />
          </span>
        </div>

        {/* Year badge on image */}
        <span
          className="absolute top-3 right-3 font-body text-[0.65rem] tracking-[0.2em] px-2.5 py-1"
          style={{
            background: "oklch(0.748 0.093 197 / 0.2)",
            backdropFilter: "blur(8px)",
            border: "1px solid oklch(0.748 0.093 197 / 0.3)",
            color: "oklch(0.748 0.093 197)",
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Info panel — glass */}
      <div
        className="p-5 lg:p-6"
        style={{
          borderTop: "1px solid oklch(1 0 0 / 0.07)",
        }}
      >
        {/* Number + category row */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-[0.65rem] font-semibold tracking-[0.2em] text-teal-light/40">
            {num}
          </span>
          <span
            className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-2 py-0.5"
            style={{
              background: "oklch(0.748 0.093 197 / 0.12)",
              border: "1px solid oklch(0.748 0.093 197 / 0.2)",
              color: "oklch(0.748 0.093 197)",
              borderRadius: "2px",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-[1.2rem] font-light text-foreground mb-1.5 leading-snug group-hover:text-teal-light transition-colors duration-300">
          {project.title}
        </h3>

        {/* Client */}
        <p className="font-body text-[0.7rem] text-teal-light/50 tracking-wide mb-3">
          {project.client}
        </p>

        {/* Hairline */}
        <div className="h-px w-6 bg-teal-light/20 mb-3 transition-all duration-500 group-hover:w-12 group-hover:bg-teal-light/40" />

        {/* Description */}
        <p className="font-body text-[0.78rem] text-foreground/50 leading-[1.7] line-clamp-2">
          {project.description}
        </p>

        {/* View more link */}
        <div className="flex items-center gap-1.5 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className="font-body text-[0.62rem] tracking-[0.18em] uppercase"
            style={{ color: "oklch(0.748 0.093 197)" }}
          >
            View Details
          </span>
          <ArrowRight size={10} style={{ color: "oklch(0.748 0.093 197)" }} />
        </div>
      </div>
    </button>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
function Portfolio() {
  const headingRef = useReveal();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();
    return () => {
      emblaApi.off("select", update);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="portfolio"
      data-ocid="portfolio.section"
      className="py-28 md:py-36 px-6 relative overflow-hidden"
    >
      {/* Section accent glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, oklch(0.565 0.095 191 / 0.06), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={headingRef}
          className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 md:mb-16"
        >
          <div>
            <p className="label-overline mb-5">Our Work</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light text-foreground leading-[1.1] tracking-wide">
              Selected{" "}
              <em className="italic text-teal-light font-light">Projects</em>
            </h2>
            <p className="font-body text-[0.8rem] text-foreground/40 mt-4 max-w-sm leading-[1.8]">
              15+ landmark projects across hemp wellness, Ayurvedic beauty,
              salon interiors, packaging, jewellery, and artisan kiosks.
            </p>
          </div>

          {/* Download button */}
          <button
            type="button"
            data-ocid="portfolio.download.button"
            onClick={downloadProjectsPDF}
            className="group flex-shrink-0 flex items-center gap-2.5 px-6 py-3 font-body text-[0.68rem] tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              border: "1px solid oklch(0.748 0.093 197 / 0.4)",
              background: "oklch(0.748 0.093 197 / 0.06)",
              backdropFilter: "blur(8px)",
              color: "oklch(0.748 0.093 197)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(0.748 0.093 197 / 0.14)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.748 0.093 197 / 0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(0.748 0.093 197 / 0.06)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.748 0.093 197 / 0.4)";
            }}
          >
            <Download
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Download Project List
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex -ml-5">
              {portfolioProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="pl-5 min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3"
                  data-index={index}
                >
                  <PortfolioCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {portfolioProjects.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="transition-all duration-300"
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === activeIndex ? "24px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background:
                      i === activeIndex
                        ? "oklch(0.748 0.093 197)"
                        : "oklch(1 0 0 / 0.2)",
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-ocid="portfolio.pagination_prev"
                onClick={scrollPrev}
                disabled={!canPrev}
                className="flex items-center justify-center w-11 h-11 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  border: "1px solid oklch(0.748 0.093 197 / 0.35)",
                  background: "oklch(0.748 0.093 197 / 0.06)",
                  backdropFilter: "blur(8px)",
                  color: "oklch(0.748 0.093 197)",
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(0.748 0.093 197 / 0.14)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.748 0.093 197 / 0.65)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.748 0.093 197 / 0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.748 0.093 197 / 0.35)";
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                data-ocid="portfolio.pagination_next"
                onClick={scrollNext}
                disabled={!canNext}
                className="flex items-center justify-center w-11 h-11 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  border: "1px solid oklch(0.748 0.093 197 / 0.35)",
                  background: "oklch(0.748 0.093 197 / 0.06)",
                  backdropFilter: "blur(8px)",
                  color: "oklch(0.748 0.093 197)",
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(0.748 0.093 197 / 0.14)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.748 0.093 197 / 0.65)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.748 0.093 197 / 0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.748 0.093 197 / 0.35)";
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Us (formerly Philosophy) ──────────────────────────────────────────
const aboutFaqs = [
  {
    q: "What makes designO different?",
    a: "At DesignO, retail is more than architecture — it's narrative. We transform physical spaces into immersive brand stories that captivate, inspire, and connect. Our strength lies in blending design thinking, brand understanding, and retail strategy to create environments that not only look exceptional but also drive engagement and sales. Every detail, material, and interaction is carefully curated to elevate the brand experience.",
  },
  {
    q: "Who do we work with?",
    a: "We collaborate with global luxury brands, beauty leaders, and emerging innovators who believe retail should be more than just a store. From flagship boutiques and department store spaces to kiosks, pop-ups, and display systems, we partner with brands that value design excellence, storytelling, and impactful customer experiences.",
  },
  {
    q: "How do we approach each project?",
    a: "Every project begins with understanding the brand's DNA. We study the brand identity, customer journey, and retail objectives to craft spaces that feel authentic and memorable. Our process combines creative exploration, strategic planning, and meticulous execution to ensure every environment reflects the brand's personality while optimizing function and cost. From concept to completion, we design with clarity, precision, and purpose.",
  },
  {
    q: "What is our mission?",
    a: "Our mission is to shape retail spaces that inspire emotion, strengthen brand identity, and create lasting impressions. We strive to deliver design solutions that balance creativity, practicality, and commercial impact, helping brands transform their retail presence into meaningful experiences.",
  },
];

function Philosophy() {
  const quoteRef = useReveal<HTMLQuoteElement>();
  const col1Ref = useReveal();
  const col2Ref = useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (i: number) => {
    setOpenFaq((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="philosophy"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Glass panel background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.565 0.095 191 / 0.07), transparent)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top architectural rule */}
        <div className="h-px w-full bg-white/[0.06] mb-16" />

        {/* Overline */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div
            className="h-px w-12"
            style={{ background: "oklch(0.748 0.093 197 / 0.25)" }}
          />
          <p className="label-overline">About Us</p>
          <div
            className="h-px w-12"
            style={{ background: "oklch(0.748 0.093 197 / 0.25)" }}
          />
        </div>

        {/* Main quote */}
        <blockquote
          ref={quoteRef}
          className="reveal text-center mb-20 md:mb-28 relative"
        >
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 font-display leading-none select-none pointer-events-none"
            aria-hidden="true"
            style={{
              fontSize: "clamp(8rem, 20vw, 16rem)",
              color: "oklch(0.748 0.093 197 / 0.06)",
              fontStyle: "normal",
              lineHeight: 1,
            }}
          >
            &ldquo;
          </span>
          <p
            className="relative font-display text-[clamp(1.7rem,3.5vw,2.9rem)] font-light italic text-foreground/85 leading-[1.42] max-w-4xl mx-auto tracking-wide"
            style={{ textShadow: "0 2px 40px oklch(0.748 0.093 197 / 0.06)" }}
          >
            We believe retail space is the ultimate expression of a brand's
            identity. Every fixture, every surface, every threshold is an
            opportunity to tell a story — and we live to tell{" "}
            <span className="text-teal-gradient not-italic font-semibold">
              extraordinary
            </span>{" "}
            ones.
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.748 0.093 197 / 0.35))",
              }}
            />
            <span className="label-overline text-[0.6rem] text-foreground/28">
              Studio Philosophy
            </span>
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, oklch(0.748 0.093 197 / 0.35))",
              }}
            />
          </div>
        </blockquote>

        {/* Two-column editorial copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-4xl mx-auto">
          {/* Card 1 — Our Values */}
          <div
            ref={col1Ref}
            className="reveal reveal-delay-1 p-8"
            style={{
              borderRadius: "2px",
              background: "oklch(0.09 0.018 205 / 0.70)",
              backdropFilter: "blur(24px) saturate(1.4)",
              border: "1px solid oklch(0.748 0.093 197 / 0.12)",
            }}
          >
            <p
              className="font-body text-[0.62rem] font-medium tracking-[0.25em] uppercase mb-3"
              style={{ color: "oklch(0.748 0.093 197)" }}
            >
              Our Values
            </p>
            <h3 className="font-display text-[1.25rem] font-light text-foreground mb-5 tracking-wide">
              The Core Company Values
            </h3>
            <div className="h-px w-8 bg-teal-light/35 mb-6" />
            <p className="font-body text-[0.82rem] text-foreground/55 leading-[1.85] mb-5">
              Founded in 2023, designO is an independent retail design
              consultancy built on the belief that retail is storytelling in
              motion. We transform physical spaces into immersive brand
              experiences that blend creativity with commercial strategy.
            </p>
            <p className="font-body text-[0.82rem] text-foreground/55 leading-[1.85]">
              From global luxury flagships to pop-ups and kiosks, our work spans
              markets and categories, always driven by purpose and precision.
              Through collaboration, craftsmanship, and innovation, we create
              retail environments that engage customers, strengthen brand
              identity, and deliver lasting impact.
            </p>
          </div>

          {/* Card 2 — About Company (Accordion) */}
          <div
            ref={col2Ref}
            className="reveal reveal-delay-2 p-8"
            style={{
              borderRadius: "2px",
              background: "oklch(0.09 0.018 205 / 0.70)",
              backdropFilter: "blur(24px) saturate(1.4)",
              border: "1px solid oklch(0.748 0.093 197 / 0.12)",
            }}
          >
            <p
              className="font-body text-[0.62rem] font-medium tracking-[0.25em] uppercase mb-3"
              style={{ color: "oklch(0.748 0.093 197)" }}
            >
              About Company
            </p>
            <h3 className="font-display text-[1.25rem] font-light text-foreground mb-5 tracking-wide">
              From Vision to Reality
            </h3>
            <div className="h-px w-8 bg-teal-light/35 mb-6" />

            {/* FAQ accordion */}
            <div className="flex flex-col gap-0">
              {aboutFaqs.map((faq, i) => (
                <div
                  key={faq.q}
                  style={{
                    borderBottom:
                      i < aboutFaqs.length - 1
                        ? "1px solid oklch(0.748 0.093 197 / 0.12)"
                        : "none",
                  }}
                >
                  <button
                    type="button"
                    data-ocid={
                      `about.faq.toggle.${i + 1}` as `about.faq.toggle.${number}`
                    }
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                  >
                    <span className="font-body text-[0.82rem] font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-200 pr-4 leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={15}
                      className="shrink-0 transition-transform duration-300"
                      style={{
                        color: "oklch(0.748 0.093 197)",
                        transform:
                          openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="pb-4">
                      <p className="font-body text-[0.79rem] text-foreground/50 leading-[1.85]">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom architectural rule */}
        <div className="h-px w-full bg-white/[0.06] mt-16" />
      </div>
    </section>
  );
}

// ─── Meet Our Team ────────────────────────────────────────────────────────────
const teamMembers = [
  {
    name: "Deepak Jayant",
    title: "Founder & Creative Director",
    bio: "With 15+ years in retail across GCC and India, our CEO has shaped impactful brand experiences with global names like Bvlgari, Prada, L'Oréal and more.",
    image: "/assets/generated/team-deepak.dim_600x800.jpg",
  },
  {
    name: "Ashley K. Mncube",
    title: "Experience Director",
    bio: "With 15+ years in experiential design, creating immersive spaces for brands like Lexus, Aldar, and Emirates NBD, positioning designO as a leader in experiential retail.",
    image: "/assets/generated/team-ashley.dim_600x800.jpg",
  },
  {
    name: "Ishu Kandpal",
    title: "Design Director",
    bio: "3D Designer with 8+ years of experience in visualization, retail, and gaming, delivering high-quality 3D rendering solutions with precision and creativity.",
    image: "/assets/generated/team-ishu.dim_600x800.jpg",
  },
];

function MeetOurTeam() {
  const headingRef = useReveal();

  return (
    <section
      id="team"
      data-ocid="team.section"
      className="py-28 md:py-40 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, oklch(0.06 0.012 240 / 0.5) 50%, transparent 100%)",
      }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.565 0.095 191 / 0.07), transparent)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={headingRef} className="reveal text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.748 0.093 197 / 0.25)" }}
            />
            <p className="label-overline">Our People</p>
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.748 0.093 197 / 0.25)" }}
            />
          </div>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-light text-foreground leading-[1.08] tracking-wide">
            Meet Our <em className="italic text-teal-light font-light">Team</em>
          </h2>
          <p className="font-body text-[0.82rem] text-foreground/40 mt-5 max-w-md mx-auto leading-[1.85]">
            The creative minds behind every space we design.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const ref = useReveal();
  const delayClass = `reveal-delay-${Math.min(index + 1, 3)}`;

  return (
    <article
      ref={ref}
      data-ocid={`team.item.${index + 1}`}
      className={`reveal ${delayClass} group relative overflow-hidden cursor-default`}
      style={{
        borderRadius: "2px",
        border: "1px solid oklch(0.748 0.093 197 / 0.12)",
      }}
    >
      {/* Portrait image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "saturate(0.9)" }}
        />

        {/* Permanent subtle gradient at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.06 0.008 240 / 0.85) 0%, oklch(0.06 0.008 240 / 0.2) 45%, transparent 70%)",
          }}
        />

        {/* Name + title — always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-0 group-hover:translate-y-[-8px] transition-transform duration-500">
          <p
            className="font-body text-[0.6rem] tracking-[0.22em] uppercase mb-1.5"
            style={{ color: "oklch(0.748 0.093 197)" }}
          >
            {member.title}
          </p>
          <h3 className="font-display text-[1.25rem] font-light text-foreground leading-snug">
            {member.name}
          </h3>
        </div>

        {/* Bio overlay — slides in on hover */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            background:
              "linear-gradient(to top, oklch(0.565 0.095 191 / 0.92) 0%, oklch(0.07 0.004 271 / 0.80) 60%, transparent 100%)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p
              className="font-body text-[0.58rem] tracking-[0.22em] uppercase mb-1"
              style={{ color: "oklch(0.748 0.093 197 / 0.8)" }}
            >
              {member.title}
            </p>
            <h3 className="font-display text-[1.2rem] font-semibold text-foreground mb-3 leading-snug">
              {member.name}
            </h3>
            <div
              className="h-px w-8 mb-3"
              style={{ background: "oklch(0.748 0.093 197 / 0.6)" }}
            />
            <p className="font-body text-[0.79rem] text-foreground/80 leading-[1.75]">
              {member.bio}
            </p>
          </div>
        </div>

        {/* Corner accent lines */}
        <div
          className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            borderTop: "2px solid oklch(0.748 0.093 197 / 0.7)",
            borderLeft: "2px solid oklch(0.748 0.093 197 / 0.7)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            borderTop: "2px solid oklch(0.748 0.093 197 / 0.7)",
            borderRight: "2px solid oklch(0.748 0.093 197 / 0.7)",
          }}
        />
      </div>
    </article>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { actor } = useActor();
  const formRef = useReveal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      if (actor) {
        await actor.submitInquiry(name.trim(), email.trim(), message.trim());
      }
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-28 md:py-36 px-6"
      style={{ background: "#f8fafa" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="label-overline mb-5"
            style={{ color: "oklch(0.565 0.095 191)" }}
          >
            Contact Us
          </p>
          <h2
            className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light tracking-wide leading-[1.1]"
            style={{ color: "oklch(0.18 0.02 220)" }}
          >
            Begin Your{" "}
            <em
              className="italic font-light"
              style={{ color: "oklch(0.565 0.095 191)" }}
            >
              Project
            </em>
          </h2>
          <p
            className="font-body text-[0.82rem] mt-5 max-w-sm mx-auto leading-[1.85] tracking-wide"
            style={{ color: "oklch(0.42 0.012 220)" }}
          >
            Tell us about your vision. We'll respond within 48 hours with our
            initial thoughts.
          </p>
        </div>

        {/* Form */}
        <div ref={formRef} className="reveal">
          {submitted ? (
            <div
              data-ocid="contact.success_state"
              className="text-center py-20 flex flex-col items-center gap-6"
              style={{
                background: "oklch(0.09 0.018 205 / 0.70)",
                backdropFilter: "blur(24px)",
                border: "1px solid oklch(0.748 0.093 197 / 0.20)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.748 0.093 197 / 0.12)",
                  border: "1px solid oklch(0.748 0.093 197 / 0.30)",
                }}
              >
                <CheckCircle2
                  size={30}
                  strokeWidth={1.5}
                  style={{ color: "oklch(0.748 0.093 197)" }}
                />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-light text-foreground">
                Thank you.
              </h3>
              <p className="font-body text-sm text-foreground/45 tracking-wide">
                We'll be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 p-8 md:p-12"
              style={{
                background: "#ffffff",
                border: "1px solid oklch(0.748 0.093 197 / 0.25)",
                borderRadius: "4px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              {/* Name */}
              <div className="flex flex-col gap-2.5 form-input-line relative">
                <label
                  htmlFor="contact-name"
                  className="label-overline text-[0.62rem]"
                  style={{ color: "oklch(0.45 0.012 220)" }}
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  data-ocid="contact.input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="bg-transparent outline-none py-3 px-0 font-body text-[0.92rem] transition-colors duration-300"
                  style={{
                    borderBottom: "1px solid oklch(0.748 0.093 197 / 0.25)",
                    color: "oklch(0.18 0.02 220)",
                  }}
                  onFocus={(e) => {
                    (
                      e.currentTarget as HTMLInputElement
                    ).style.borderBottomColor = "oklch(0.565 0.095 191 / 0.7)";
                  }}
                  onBlur={(e) => {
                    (
                      e.currentTarget as HTMLInputElement
                    ).style.borderBottomColor = "oklch(0.748 0.093 197 / 0.25)";
                  }}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2.5 form-input-line relative">
                <label
                  htmlFor="contact-email"
                  className="label-overline text-[0.62rem]"
                  style={{ color: "oklch(0.45 0.012 220)" }}
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  data-ocid="contact.email.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="bg-transparent outline-none py-3 px-0 font-body text-[0.92rem] transition-colors duration-300"
                  style={{
                    borderBottom: "1px solid oklch(0.748 0.093 197 / 0.25)",
                    color: "oklch(0.18 0.02 220)",
                  }}
                  onFocus={(e) => {
                    (
                      e.currentTarget as HTMLInputElement
                    ).style.borderBottomColor = "oklch(0.565 0.095 191 / 0.7)";
                  }}
                  onBlur={(e) => {
                    (
                      e.currentTarget as HTMLInputElement
                    ).style.borderBottomColor = "oklch(0.748 0.093 197 / 0.25)";
                  }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2.5 form-input-line relative">
                <label
                  htmlFor="contact-message"
                  className="label-overline text-[0.62rem]"
                  style={{ color: "oklch(0.45 0.012 220)" }}
                >
                  Your Vision
                </label>
                <textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project, brand, and ambitions..."
                  required
                  rows={5}
                  className="bg-transparent outline-none py-3 px-0 font-body text-[0.92rem] transition-colors duration-300 resize-none"
                  style={{
                    borderBottom: "1px solid oklch(0.748 0.093 197 / 0.25)",
                    color: "oklch(0.18 0.02 220)",
                  }}
                  onFocus={(e) => {
                    (
                      e.currentTarget as HTMLTextAreaElement
                    ).style.borderBottomColor = "oklch(0.565 0.095 191 / 0.7)";
                  }}
                  onBlur={(e) => {
                    (
                      e.currentTarget as HTMLTextAreaElement
                    ).style.borderBottomColor = "oklch(0.748 0.093 197 / 0.25)";
                  }}
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  data-ocid="contact.error_state"
                  className="font-body text-xs text-red-400/80 tracking-wide"
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button
                  data-ocid="contact.submit_button"
                  type="submit"
                  disabled={submitting}
                  className="group relative overflow-hidden w-full flex items-center justify-center gap-3 py-4 font-body text-[0.68rem] tracking-[0.25em] uppercase font-semibold transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed btn-magnetic"
                  style={{
                    background: submitting
                      ? "oklch(0.748 0.093 197 / 0.5)"
                      : "linear-gradient(135deg, oklch(0.748 0.093 197), oklch(0.565 0.095 191))",
                    color: "oklch(0.06 0.006 271)",
                    boxShadow: "0 8px 32px oklch(0.748 0.093 197 / 0.25)",
                  }}
                >
                  {/* Shimmer */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.678 0.083 179), oklch(0.748 0.093 197 / 0.95))",
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const caffeineLinkHref = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const importantLinks = [
    { label: "About Us", id: "philosophy" },
    { label: "Our Services", id: "services" },
    { label: "Our Portfolio", id: "portfolio" },
    { label: "Contact Us", id: "contact" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Retail background image — dull/muted */}
      <img
        src="/assets/generated/footer-retail-bg.dim_1920x600.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ filter: "saturate(0.25) brightness(0.22)", opacity: 0.9 }}
      />
      {/* Teal gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(
              160deg,
              oklch(0.16 0.04 191 / 0.92) 0%,
              oklch(0.12 0.038 197 / 0.92) 35%,
              oklch(0.14 0.042 185 / 0.92) 65%,
              oklch(0.10 0.03 200 / 0.92) 100%
            )
          `,
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.748 0.093 197) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.748 0.093 197) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.748 0.093 197 / 0.08), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Main 3-column content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Left — Contacts */}
          <div>
            <h3
              className="font-display text-[1.35rem] font-semibold tracking-wide mb-8"
              style={{ color: "oklch(0.748 0.093 197)" }}
            >
              Contacts
            </h3>
            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <MapPin
                  size={15}
                  strokeWidth={1.5}
                  className="shrink-0 mt-0.5"
                  style={{ color: "oklch(0.748 0.093 197 / 0.7)" }}
                />
                <div>
                  <p className="font-body text-[0.82rem] font-light text-foreground/70 leading-[1.75]">
                    India A-73 Dallupura,
                    <br />
                    New Delhi 110096
                    <br />
                    <span
                      className="text-[0.75rem]"
                      style={{ color: "oklch(0.748 0.093 197 / 0.7)" }}
                    >
                      Nearest Metro: New Ashok Nagar
                    </span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5">
                <Mail
                  size={15}
                  strokeWidth={1.5}
                  className="shrink-0"
                  style={{ color: "oklch(0.748 0.093 197 / 0.7)" }}
                />
                <a
                  href="mailto:Info@designo.studio"
                  data-ocid="footer.email.link"
                  className="font-body text-[0.82rem] font-light text-foreground/70 hover:text-teal-light transition-colors duration-300"
                >
                  Info@designo.studio
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3.5">
                <Phone
                  size={15}
                  strokeWidth={1.5}
                  className="shrink-0"
                  style={{ color: "oklch(0.748 0.093 197 / 0.7)" }}
                />
                <a
                  href="tel:+919319322675"
                  data-ocid="footer.phone.link"
                  className="font-body text-[0.82rem] font-light text-foreground/70 hover:text-teal-light transition-colors duration-300"
                >
                  +91 9319322675
                </a>
              </div>
            </div>
          </div>

          {/* Center — Brand */}
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="mb-5">
              <img
                src="/assets/generated/designo-wordmark-transparent.dim_800x200.png"
                alt="DesignO"
                className="h-8 w-auto object-contain mx-auto"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  const sibling = img.nextElementSibling as HTMLElement;
                  if (sibling) sibling.style.display = "block";
                }}
              />
              <span
                className="font-display text-2xl font-light tracking-[0.2em] text-foreground hidden"
                style={{ display: "none" }}
              >
                DESIGNO
              </span>
            </div>

            {/* Tagline */}
            <p
              className="font-display text-[1.05rem] italic font-medium mb-4 tracking-wide"
              style={{ color: "oklch(0.748 0.093 197)" }}
            >
              Retail Beyond Reality
            </p>

            {/* Description */}
            <p className="font-body text-[0.78rem] font-light text-foreground/55 leading-[1.8] max-w-[220px] mb-7">
              Creating exceptional retail experiences for the world's most
              prestigious luxury brands.
            </p>

            {/* Hairline */}
            <div
              className="w-12 h-px mb-6"
              style={{ background: "oklch(0.748 0.093 197 / 0.3)" }}
            />

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.facebook.link"
                aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: "oklch(0.07 0.004 271 / 0.7)",
                  border: "1px solid oklch(0.748 0.093 197 / 0.2)",
                  color: "oklch(0.748 0.093 197 / 0.7)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.748 0.093 197 / 0.15)";
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.748 0.093 197)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.07 0.004 271 / 0.7)";
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.748 0.093 197 / 0.7)";
                }}
              >
                <SiFacebook size={14} />
              </a>
              <a
                href="https://linkedin.com/company/designo-studio"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.linkedin.link"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: "oklch(0.07 0.004 271 / 0.7)",
                  border: "1px solid oklch(0.748 0.093 197 / 0.2)",
                  color: "oklch(0.748 0.093 197 / 0.7)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.748 0.093 197 / 0.15)";
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.748 0.093 197)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.07 0.004 271 / 0.7)";
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.748 0.093 197 / 0.7)";
                }}
              >
                <SiLinkedin size={14} />
              </a>
              <a
                href="https://instagram.com/designo.studio"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.instagram.link"
                aria-label="Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: "oklch(0.07 0.004 271 / 0.7)",
                  border: "1px solid oklch(0.748 0.093 197 / 0.2)",
                  color: "oklch(0.748 0.093 197 / 0.7)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.748 0.093 197 / 0.15)";
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.748 0.093 197)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.07 0.004 271 / 0.7)";
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.748 0.093 197 / 0.7)";
                }}
              >
                <SiInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Right — Important Links */}
          <div className="md:text-right">
            <h3
              className="font-display text-[1.35rem] font-semibold tracking-wide mb-8"
              style={{ color: "oklch(0.748 0.093 197)" }}
            >
              Important Links
            </h3>
            <ul className="space-y-4">
              {importantLinks.map(({ label, id }) => (
                <li key={id} className="md:flex md:justify-end">
                  <button
                    type="button"
                    data-ocid={`footer.${id}.link`}
                    onClick={() => scrollTo(id)}
                    className="group flex items-center gap-2 font-body text-[0.85rem] font-light text-foreground/65 hover:text-teal-light transition-colors duration-300"
                  >
                    <ChevronRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: "oklch(0.748 0.093 197)" }}
                    />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-10"
        style={{
          borderTop: "1px solid oklch(0.748 0.093 197 / 0.12)",
          background: "oklch(0.06 0.01 265 / 0.8)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright */}
          <p className="font-body text-xs text-foreground/35 tracking-wide text-center sm:text-left">
            Copyright © {year}{" "}
            <span className="text-foreground/60 font-medium">DesignO</span>. All
            Rights Reserved.
          </p>

          {/* Caffeine attribution */}
          <a
            href={caffeineLinkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-foreground/25 hover:text-foreground/50 transition-colors duration-300 tracking-wide"
          >
            Built with ♥ using caffeine.ai
          </a>

          {/* Back to top */}
          <button
            type="button"
            data-ocid="footer.back_to_top.button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center justify-center w-9 h-9 transition-all duration-300 hover:scale-105"
            style={{
              background: "oklch(0.748 0.093 197)",
              color: "oklch(0.07 0.004 271)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(0.678 0.083 179)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(0.748 0.093 197)";
            }}
          >
            <ArrowUp size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </footer>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ fadeOut }: { fadeOut: boolean }) {
  return (
    <div
      aria-label="Loading DesignO"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "oklch(0.055 0.008 255)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition:
          "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "scale(1.06)" : "scale(1)",
        pointerEvents: fadeOut ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, oklch(0.748 0.093 197 / 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.748 0.093 197 / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Large atmospheric orbs */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: "700px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, oklch(0.565 0.095 191 / 0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
          animation: "loaderOrb 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.748 0.093 197 / 0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "loaderOrb 6s ease-in-out 1s infinite",
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
          zIndex: 10,
        }}
      >
        {/* Phase 1 — Expanding pair of lines with dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "36px",
            animation: "loaderLinePair 0.8s cubic-bezier(0.16,1,0.3,1) 0s both",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "1px",
              background:
                "linear-gradient(to left, oklch(0.748 0.093 197), transparent)",
            }}
          />
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "oklch(0.748 0.093 197)",
              boxShadow: "0 0 12px oklch(0.748 0.093 197 / 0.8)",
            }}
          />
          <div
            style={{
              width: "80px",
              height: "1px",
              background:
                "linear-gradient(to right, oklch(0.748 0.093 197), transparent)",
            }}
          />
        </div>

        {/* Phase 2 — Logo emerges from darkness */}
        <div
          style={{
            animation:
              "loaderLogoReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both",
            filter: "drop-shadow(0 0 30px oklch(0.748 0.093 197 / 0.25))",
          }}
        >
          <img
            src="/assets/generated/designo-wordmark-transparent.dim_800x200.png"
            alt="DesignO"
            style={{
              width: "clamp(180px, 32vw, 260px)",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const sibling = img.nextElementSibling as HTMLElement;
              if (sibling) sibling.style.display = "block";
            }}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 8vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.35em",
              color: "oklch(0.97 0.006 197)",
              display: "none",
            }}
          >
            DESIGNO
          </span>
        </div>

        {/* Phase 3 — Tagline with italic flair */}
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            color: "oklch(0.748 0.093 197 / 0.85)",
            letterSpacing: "0.15em",
            marginTop: "20px",
            animation:
              "loaderTagline 0.7s cubic-bezier(0.16,1,0.3,1) 0.9s both",
          }}
        >
          Retail Beyond Reality
        </p>

        {/* Phase 4 — Subtle loading dots */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginTop: "32px",
            animation: "loaderTagline 0.5s ease 1.3s both",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "oklch(0.748 0.093 197 / 0.5)",
                animation: `loaderDotBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress bar — glowing gradient */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          height: "2px",
          background: "oklch(0.748 0.093 197 / 0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background:
              "linear-gradient(to right, oklch(0.565 0.095 191), oklch(0.748 0.093 197), oklch(0.678 0.083 197))",
            boxShadow: "0 0 8px oklch(0.748 0.093 197 / 0.6)",
            animation:
              "loaderProgress 1.2s cubic-bezier(0.4,0,0.2,1) 1.3s both",
          }}
        />
      </div>

      <style>{`
        @keyframes loaderLinePair {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }
        @keyframes loaderLogoReveal {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes loaderTagline {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes loaderOrb {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.12); }
        }
        @keyframes loaderDotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const doneTimer = setTimeout(() => setLoading(false), 2700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {/* Loading screen */}
      {loading && <LoadingScreen fadeOut={fadeOut} />}

      {/* Full-page theme gradient background */}
      <div className="page-bg" aria-hidden="true" />

      <div className="min-h-screen">
        <Nav />
        <main>
          <Hero />
          <Services />
          <RetailSlider />
          <BrandLogos />
          <Portfolio />
          <Philosophy />
          <MeetOurTeam />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
