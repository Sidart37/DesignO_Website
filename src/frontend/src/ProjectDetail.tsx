import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { portfolioProjects } from "./portfolioData";

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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref as React.RefObject<T>;
}

// ─── Render carousel ─────────────────────────────────────────────────────────
function RenderCarousel({
  images,
  title,
}: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <section className="relative w-full" aria-label={`${title} render images`}>
      {/* Main image */}
      <div
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: "16/10", borderRadius: "2px" }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${title} render ${i + 1}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Prev/Next */}
        <button
          type="button"
          data-ocid="project.render.pagination_prev"
          onClick={prev}
          aria-label="Previous render"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 transition-all duration-200"
          style={{
            background: "oklch(0.07 0.004 271 / 0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid oklch(0.748 0.093 197 / 0.3)",
            color: "oklch(0.748 0.093 197)",
          }}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          data-ocid="project.render.pagination_next"
          onClick={next}
          aria-label="Next render"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 transition-all duration-200"
          style={{
            background: "oklch(0.07 0.004 271 / 0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid oklch(0.748 0.093 197 / 0.3)",
            color: "oklch(0.748 0.093 197)",
          }}
        >
          <ChevronRight size={16} />
        </button>

        {/* Counter */}
        <span
          className="absolute bottom-3 right-4 font-body text-[0.62rem] tracking-[0.2em]"
          style={{
            color: "oklch(0.748 0.093 197)",
            background: "oklch(0.07 0.004 271 / 0.65)",
            backdropFilter: "blur(6px)",
            padding: "3px 10px",
            borderRadius: "2px",
          }}
        >
          {active + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            data-ocid={`project.render.item.${i + 1}`}
            onClick={() => setActive(i)}
            aria-label={`View render ${i + 1}`}
            className="flex-1 overflow-hidden transition-all duration-300"
            style={{
              aspectRatio: "16/10",
              borderRadius: "2px",
              border: `1px solid ${i === active ? "oklch(0.748 0.093 197 / 0.7)" : "oklch(1 0 0 / 0.08)"}`,
              opacity: i === active ? 1 : 0.5,
            }}
          >
            <img
              src={src}
              alt={`Render ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Detail section card ──────────────────────────────────────────────────────
function DetailCard({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useReveal();
  return (
    <article
      ref={ref}
      className="reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        className="p-7 md:p-9 h-full transition-all duration-400"
        style={{
          borderRadius: "2px",
          background: "oklch(0.09 0.018 205 / 0.72)",
          backdropFilter: "blur(24px) saturate(1.4)",
          border: "1px solid oklch(0.748 0.093 197 / 0.10)",
        }}
      >
        <p
          className="font-body text-[0.6rem] font-semibold tracking-[0.28em] uppercase mb-4"
          style={{ color: "oklch(0.748 0.093 197 / 0.85)" }}
        >
          {label}
        </p>
        <div
          className="h-px w-10 mb-5"
          style={{
            background:
              "linear-gradient(to right, oklch(0.748 0.093 197 / 0.45), transparent)",
          }}
        />
        {children}
      </div>
    </article>
  );
}

// ─── Project Detail Page ──────────────────────────────────────────────────────
export function ProjectDetail() {
  const { id } = useParams({ from: "/project/$id" });
  const navigate = useNavigate();
  const numId = Number.parseInt(id, 10);
  const project = portfolioProjects.find((p) => p.id === numId);

  // SEO meta tags
  useEffect(() => {
    if (project) {
      document.title = `${project.title} — DesignO Studio | ${project.category}`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", project.description);

      // OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle)
        ogTitle.setAttribute("content", `${project.title} — DesignO Studio`);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", project.description);
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute("content", project.image);
    }
    return () => {
      document.title =
        "DesignO Studio | Luxury Retail Design & Brand Experience | New Delhi";
    };
  }, [project]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const heroRef = useReveal();
  const rendersRef = useReveal();
  const photosRef = useReveal();

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <div className="page-bg" aria-hidden="true" />
        <p className="font-display text-2xl font-light text-foreground/60">
          Project not found.
        </p>
        <button
          type="button"
          data-ocid="project.back.button"
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-2 font-body text-sm text-teal-light hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
      </div>
    );
  }

  const prevProject = portfolioProjects.find((p) => p.id === numId - 1);
  const nextProject = portfolioProjects.find((p) => p.id === numId + 1);

  return (
    <>
      <div className="page-bg" aria-hidden="true" />

      <div className="min-h-screen">
        {/* ── Sticky mini nav ── */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 h-16"
          style={{
            background: "oklch(0.07 0.004 271 / 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid oklch(1 0 0 / 0.06)",
          }}
        >
          <button
            type="button"
            data-ocid="project.back.button"
            onClick={() => navigate({ to: "/" })}
            className="group flex items-center gap-2.5 font-body text-[0.72rem] tracking-[0.15em] uppercase text-foreground/60 hover:text-teal-light transition-colors duration-300"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Projects
          </button>

          {/* Logo */}
          <button
            type="button"
            data-ocid="project.home.link"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center"
          >
            <img
              src="/assets/generated/designo-wordmark-transparent.dim_800x200.png"
              alt="DesignO"
              className="h-5 w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </button>

          {/* Project nav pills */}
          <div className="hidden md:flex items-center gap-3">
            {prevProject && (
              <button
                type="button"
                data-ocid="project.prev.button"
                onClick={() =>
                  navigate({
                    to: "/project/$id",
                    params: { id: String(prevProject.id) },
                  })
                }
                className="flex items-center gap-1.5 font-body text-[0.62rem] tracking-[0.15em] uppercase text-foreground/40 hover:text-teal-light transition-colors"
              >
                <ChevronLeft size={12} />
                {prevProject.title}
              </button>
            )}
            {prevProject && nextProject && (
              <div
                className="w-px h-4"
                style={{ background: "oklch(1 0 0 / 0.1)" }}
              />
            )}
            {nextProject && (
              <button
                type="button"
                data-ocid="project.next.button"
                onClick={() =>
                  navigate({
                    to: "/project/$id",
                    params: { id: String(nextProject.id) },
                  })
                }
                className="flex items-center gap-1.5 font-body text-[0.62rem] tracking-[0.15em] uppercase text-foreground/40 hover:text-teal-light transition-colors"
              >
                {nextProject.title}
                <ChevronRight size={12} />
              </button>
            )}
          </div>
        </nav>

        <main className="pt-16">
          {/* ── Hero ── */}
          <section
            ref={heroRef}
            className="reveal relative pt-24 pb-20 px-6 overflow-hidden"
          >
            {/* Multi-layer background */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.565 0.095 191 / 0.14), transparent)",
              }}
            />
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, oklch(0.748 0.093 197 / 0.025) 1px, transparent 1px),
                  linear-gradient(to bottom, oklch(0.748 0.093 197 / 0.025) 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
              {/* Category + year */}
              <div className="flex items-center justify-center gap-4 mb-10">
                <span
                  className="font-body text-[0.6rem] tracking-[0.22em] uppercase px-4 py-1.5"
                  style={{
                    background: "oklch(0.748 0.093 197 / 0.10)",
                    border: "1px solid oklch(0.748 0.093 197 / 0.22)",
                    color: "oklch(0.748 0.093 197)",
                    borderRadius: "2px",
                  }}
                >
                  {project.category}
                </span>
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: "oklch(0.748 0.093 197 / 0.35)" }}
                />
                <span className="font-body text-[0.62rem] tracking-[0.18em] text-foreground/30">
                  {project.year}
                </span>
              </div>

              {/* Title — large, editorial */}
              <h1
                className="font-display text-[clamp(3.2rem,9vw,7rem)] font-light text-foreground leading-[1.03] tracking-wide mb-6"
                style={{
                  textShadow: "0 4px 60px oklch(0.748 0.093 197 / 0.10)",
                }}
              >
                {project.title}
              </h1>

              {/* Client */}
              <p
                className="font-body text-[0.72rem] tracking-[0.25em] uppercase mb-10"
                style={{ color: "oklch(0.748 0.093 197 / 0.60)" }}
              >
                Client — {project.client}
              </p>

              {/* Divider with dots */}
              <div className="flex items-center justify-center gap-3 mb-10">
                <div
                  className="h-px w-20"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, oklch(0.748 0.093 197 / 0.3))",
                  }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "oklch(0.748 0.093 197 / 0.5)" }}
                />
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: "oklch(0.748 0.093 197 / 0.3)" }}
                />
                <div
                  className="h-px w-20"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, oklch(0.748 0.093 197 / 0.3))",
                  }}
                />
              </div>

              {/* Description */}
              <p className="font-body text-[0.88rem] text-foreground/50 leading-[1.90] max-w-2xl mx-auto">
                {project.description}
              </p>
            </div>
          </section>

          {/* ── 3 Renders at top ── */}
          <section
            ref={rendersRef}
            className="reveal px-6 pb-16 max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <p
                className="font-body text-[0.62rem] font-medium tracking-[0.25em] uppercase"
                style={{ color: "oklch(0.748 0.093 197)" }}
              >
                Design Renders
              </p>
              <div
                className="h-px flex-1"
                style={{ background: "oklch(0.748 0.093 197 / 0.15)" }}
              />
            </div>

            {/* 3-up grid desktop, carousel on mobile */}
            <div className="hidden md:grid md:grid-cols-3 gap-4">
              {project.renders.map((src, i) => (
                <div
                  key={src}
                  data-ocid={`project.render.item.${i + 1}`}
                  className="relative overflow-hidden group"
                  style={{ aspectRatio: "16/10", borderRadius: "2px" }}
                >
                  <img
                    src={src}
                    alt={`${project.title} render ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: "oklch(0.565 0.095 191 / 0.12)" }}
                  />
                  <span
                    className="absolute bottom-2 right-2 font-body text-[0.58rem] tracking-[0.15em] px-2 py-0.5"
                    style={{
                      background: "oklch(0.07 0.004 271 / 0.7)",
                      color: "oklch(0.748 0.093 197)",
                      borderRadius: "2px",
                    }}
                  >
                    Render 0{i + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile carousel */}
            <div className="md:hidden">
              <RenderCarousel images={project.renders} title={project.title} />
            </div>
          </section>

          {/* ── Detail Cards ── */}
          <section className="px-6 pb-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <DetailCard label="About the Brand" delay={0}>
                <p className="font-body text-[0.82rem] text-foreground/60 leading-[1.85]">
                  {project.aboutBrand}
                </p>
              </DetailCard>

              <DetailCard label="Project Objective" delay={0.1}>
                <p className="font-body text-[0.82rem] text-foreground/60 leading-[1.85]">
                  {project.objective}
                </p>
              </DetailCard>

              <DetailCard label="DesignO's Approach" delay={0.15}>
                <p className="font-body text-[0.82rem] text-foreground/60 leading-[1.85]">
                  {project.approach}
                </p>
              </DetailCard>

              <DetailCard label="Key Design Elements" delay={0.2}>
                <ul className="space-y-3">
                  {project.keyElements.map((el) => (
                    <li key={el} className="flex items-start gap-3">
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "oklch(0.748 0.093 197)" }}
                        strokeWidth={1.5}
                      />
                      <span className="font-body text-[0.82rem] text-foreground/60 leading-[1.7]">
                        {el}
                      </span>
                    </li>
                  ))}
                </ul>
              </DetailCard>

              <div className="md:col-span-2">
                <DetailCard label="Outcome / Experience" delay={0.25}>
                  <p className="font-body text-[0.82rem] text-foreground/60 leading-[1.85]">
                    {project.outcome}
                  </p>
                </DetailCard>
              </div>
            </div>
          </section>

          {/* ── 2 Real Photos at bottom ── */}
          <section
            ref={photosRef}
            className="reveal px-6 pb-20 max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <p
                className="font-body text-[0.62rem] font-medium tracking-[0.25em] uppercase"
                style={{ color: "oklch(0.748 0.093 197)" }}
              >
                Project Photography
              </p>
              <div
                className="h-px flex-1"
                style={{ background: "oklch(0.748 0.093 197 / 0.15)" }}
              />
              <span className="font-body text-[0.58rem] text-foreground/25 tracking-wide">
                As Built
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.realImages.map((src, i) => (
                <div
                  key={src}
                  data-ocid={`project.photo.item.${i + 1}`}
                  className="relative overflow-hidden group"
                  style={{
                    aspectRatio: "4/3",
                    borderRadius: "2px",
                    border: "1px solid oklch(1 0 0 / 0.08)",
                  }}
                >
                  <img
                    src={src}
                    alt={`${project.title} as-built view ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-103"
                  />
                  {/* Glass hover overlay */}
                  <div
                    className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.07 0.004 271 / 0.65), transparent)",
                    }}
                  >
                    <span
                      className="font-body text-[0.65rem] tracking-[0.2em] uppercase"
                      style={{
                        color: "oklch(0.748 0.093 197)",
                        background: "oklch(0.07 0.004 271 / 0.6)",
                        backdropFilter: "blur(8px)",
                        padding: "4px 12px",
                        borderRadius: "2px",
                      }}
                    >
                      {project.title} — Photo {i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Project Navigation ── */}
          <section className="px-6 pb-20 max-w-6xl mx-auto">
            <div
              className="h-px w-full mb-10"
              style={{ background: "oklch(1 0 0 / 0.06)" }}
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              {prevProject ? (
                <button
                  type="button"
                  data-ocid="project.prev.button"
                  onClick={() =>
                    navigate({
                      to: "/project/$id",
                      params: { id: String(prevProject.id) },
                    })
                  }
                  className="group flex items-center gap-4 text-left"
                >
                  <div
                    className="w-11 h-11 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:border-teal-light"
                    style={{
                      border: "1px solid oklch(1 0 0 / 0.12)",
                      borderRadius: "2px",
                      color: "oklch(0.748 0.093 197)",
                    }}
                  >
                    <ArrowLeft size={16} />
                  </div>
                  <div>
                    <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-foreground/30 mb-0.5">
                      Previous
                    </p>
                    <p className="font-display text-[1.1rem] font-light text-foreground group-hover:text-teal-light transition-colors">
                      {prevProject.title}
                    </p>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextProject && (
                <button
                  type="button"
                  data-ocid="project.next.button"
                  onClick={() =>
                    navigate({
                      to: "/project/$id",
                      params: { id: String(nextProject.id) },
                    })
                  }
                  className="group flex items-center gap-4 text-right sm:flex-row-reverse"
                >
                  <div
                    className="w-11 h-11 shrink-0 flex items-center justify-center transition-all duration-300"
                    style={{
                      border: "1px solid oklch(1 0 0 / 0.12)",
                      borderRadius: "2px",
                      color: "oklch(0.748 0.093 197)",
                    }}
                  >
                    <ArrowRight size={16} />
                  </div>
                  <div>
                    <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-foreground/30 mb-0.5">
                      Next
                    </p>
                    <p className="font-display text-[1.1rem] font-light text-foreground group-hover:text-teal-light transition-colors">
                      {nextProject.title}
                    </p>
                  </div>
                </button>
              )}
            </div>
          </section>

          {/* ── Back to all projects CTA ── */}
          <div className="text-center pb-20 px-6">
            <button
              type="button"
              data-ocid="project.all_projects.button"
              onClick={() => {
                navigate({ to: "/" }).then(() => {
                  setTimeout(() => {
                    document
                      .getElementById("portfolio")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                });
              }}
              className="group inline-flex items-center gap-3 px-10 py-3.5 font-body text-[0.68rem] tracking-[0.25em] uppercase transition-all duration-300"
              style={{
                border: "1px solid oklch(0.748 0.093 197 / 0.4)",
                background: "oklch(0.748 0.093 197 / 0.06)",
                backdropFilter: "blur(8px)",
                color: "oklch(0.748 0.093 197)",
              }}
            >
              View All Projects
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer
          className="px-6 py-8 text-center"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 0.05)",
            background: "oklch(0.06 0.01 265 / 0.5)",
          }}
        >
          <p className="font-body text-xs text-foreground/25 tracking-wide">
            © {new Date().getFullYear()}{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground/50 transition-colors"
            >
              Built with ♥ using caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
