/**
 * 归处 HERE — Brand Manual
 * Design Philosophy: Wabi-sabi meets Swiss Minimalism
 * - Deep Night (#0D1117) + Dawn Gold (#C4A265) + Warm White (#F5F5F0)
 * - Noto Serif SC (Chinese) + Cormorant Garamond (English display) + system-ui (body)
 * - Generous whitespace, slow fade-in animations, parallax scroll
 * - Breathing rhythm: every section has one idea, one breath
 * - Bilingual: zh/en with seamless language switching
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

/* ============================================================
   CDN Image URLs
   ============================================================ */
const IMAGES = {
  hero: "https://pub-d4cecf8f61c64a7c9a1f14b1d7e9b9b4.r2.dev/hero_cover.jpg",
  innerLight: "https://pub-d4cecf8f61c64a7c9a1f14b1d7e9b9b4.r2.dev/inner_light.jpg",
  waterReflection: "https://pub-d4cecf8f61c64a7c9a1f14b1d7e9b9b4.r2.dev/water_reflection.jpg",
  dawn: "https://pub-d4cecf8f61c64a7c9a1f14b1d7e9b9b4.r2.dev/dawn_awakening.jpg",
  starry: "https://pub-d4cecf8f61c64a7c9a1f14b1d7e9b9b4.r2.dev/starry_consciousness.jpg",
  ocean: "https://pub-d4cecf8f61c64a7c9a1f14b1d7e9b9b4.r2.dev/ocean_horizon.jpg",
  abstractFlow: "https://pub-d4cecf8f61c64a7c9a1f14b1d7e9b9b4.r2.dev/abstract_flow.jpg",
  handsLight: "https://pub-d4cecf8f61c64a7c9a1f14b1d7e9b9b4.r2.dev/hands_light.jpg",
};

/* ============================================================
   Shared Primitives
   ============================================================ */

function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function ParallaxImage({
  src,
  alt,
  height = "80vh",
  overlay = false,
  overlayContent,
}: {
  src: string;
  alt: string;
  height?: string;
  overlay?: boolean;
  overlayContent?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <motion.div className="absolute inset-0 w-full" style={{ y, height: "124%" }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          {overlayContent}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[0.62rem] font-normal tracking-[0.28em] uppercase text-gold/70 mb-3">
      {children}
    </p>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return <div className={`w-12 h-px bg-gold/40 ${className}`} />;
}

/* ============================================================
   Navigation with Language Switcher + Mobile Hamburger
   ============================================================ */

function Navigation() {
  const { t, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { label: t.nav.philosophy, href: "#philosophy" },
    { label: t.nav.values, href: "#values" },
    { label: t.nav.product, href: "#product" },
    { label: t.nav.journey, href: "#journey" },
    { label: t.nav.wisdom, href: "#wisdom" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-[#0A0E14]/92 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1300px] mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-serif text-[0.95rem] font-light tracking-[0.3em] text-white/90 hover:text-gold transition-colors duration-500">
            {t.nav.logo}
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[0.65rem] font-normal tracking-[0.2em] uppercase text-white/45 hover:text-white/90 transition-colors duration-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Lang Switch + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="font-sans text-[0.62rem] font-normal tracking-[0.2em] uppercase text-gold/70 hover:text-gold border border-gold/30 hover:border-gold/60 px-3 py-1.5 transition-all duration-400"
            >
              {t.nav.langSwitch}
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0E14]/97 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  className="font-serif text-[1.4rem] font-extralight tracking-[0.2em] text-white/80 hover:text-gold transition-colors duration-400"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => { toggleLang(); setMenuOpen(false); }}
                className="mt-4 font-sans text-[0.7rem] tracking-[0.25em] uppercase text-gold/70 border border-gold/30 px-5 py-2"
              >
                {t.nav.langSwitch}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   Hero Section
   ============================================================ */

function HeroSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen min-h-[600px] overflow-hidden bg-[#0A0E14]">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={IMAGES.hero} alt="Here — Find Your Here" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E14]/30 via-transparent to-[#0A0E14]/80" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <FadeInSection>
          <p className="font-sans text-[0.58rem] md:text-[0.65rem] font-normal tracking-[0.35em] uppercase text-gold/60 mb-8">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(1.8rem,5vw,4rem)] font-extralight tracking-[0.12em] leading-[1.6] text-white mb-6">
            {t.hero.headline[0]}
            <br />
            <span className="text-gold/90">{t.hero.headline[1]}</span>
          </h1>
          <Divider className="mx-auto mb-6" />
          <p className="font-display text-[clamp(0.75rem,1.5vw,0.95rem)] font-light italic tracking-[0.06em] text-white/40 max-w-[480px]">
            {t.hero.sub}
          </p>
        </FadeInSection>

        <FadeInSection delay={0.6} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-white/25">{t.hero.scroll}</p>
          <div className="w-px h-12 bg-gradient-to-b from-white/25 to-transparent" />
        </FadeInSection>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-16 md:pb-20">
        <FadeInSection delay={0.4}>
          <p className="font-serif text-[clamp(3rem,8vw,7rem)] font-extralight tracking-[0.5em] text-white/6 select-none">
            {t.hero.tagline}
          </p>
        </FadeInSection>
      </div>
    </div>
  );
}

/* ============================================================
   Brand Essence
   ============================================================ */

function BrandEssence() {
  const { t } = useLang();
  return (
    <section className="bg-[#F5F5F0] py-32 md:py-52">
      <div className="max-w-[780px] mx-auto px-6 md:px-10 text-center">
        <FadeInSection>
          <SectionLabel>{t.essence.label}</SectionLabel>
          <Divider className="mx-auto mb-14" />
        </FadeInSection>
        <FadeInSection delay={0.15}>
          <p className="font-serif text-[clamp(1.1rem,2.2vw,1.5rem)] font-extralight tracking-[0.08em] leading-[2.6] text-[#1A1A1A]/70">
            {t.essence.para1.map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>
        </FadeInSection>
        <FadeInSection delay={0.3} className="mt-12">
          <p className="font-serif text-[clamp(1.1rem,2.2vw,1.5rem)] font-extralight tracking-[0.08em] leading-[2.6] text-[#1A1A1A]/70">
            {t.essence.para2.map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>
          <p className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] font-light tracking-[0.1em] text-[#1A1A1A] mt-4">
            {t.essence.highlight}
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ============================================================
   Inner Light Parallax
   ============================================================ */

function InnerLightSection() {
  const { t } = useLang();
  return (
    <ParallaxImage
      src={IMAGES.innerLight}
      alt="Inner Light"
      height="90vh"
      overlay
      overlayContent={
        <FadeInSection className="text-center px-6 md:px-8">
          <p className="font-serif text-[clamp(1.3rem,3vw,2.4rem)] font-extralight tracking-[0.12em] leading-[2.0] text-white">
            {t.innerLight.headline[0]}
            <br />
            <span className="text-gold/90">{t.innerLight.headline[1]}</span>
          </p>
          <p className="mt-6 font-display text-[clamp(0.75rem,1.4vw,0.9rem)] font-light italic tracking-[0.06em] text-white/45 max-w-[500px] mx-auto">
            {t.innerLight.sub}
          </p>
        </FadeInSection>
      }
    />
  );
}

/* ============================================================
   Philosophy Section
   ============================================================ */

function PhilosophySection() {
  const { t } = useLang();
  return (
    <section id="philosophy" className="bg-[#0D1117] text-[#F5F5F0] py-32 md:py-52">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-24 md:mb-32">
          <SectionLabel>{t.philosophy.label}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            {t.philosophy.title}
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-white/35">
            {t.philosophy.sub}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {t.philosophy.items.map((item, i) => (
            <FadeInSection key={item.num} delay={i * 0.1}>
              <div className={`p-10 md:p-14 border-white/6 ${i % 2 === 0 ? "md:border-r" : ""} ${i < 2 ? "border-b" : ""}`}>
                <p className="font-display text-[0.65rem] font-light tracking-[0.25em] uppercase text-gold/50 mb-6">{item.num}</p>
                <h3 className="font-serif text-[1.3rem] md:text-[1.5rem] font-light tracking-[0.1em] mb-2">{item.title}</h3>
                <p className="font-display text-[0.75rem] font-light tracking-[0.08em] italic text-white/30 mb-6">{item.en}</p>
                <Divider className="mb-6" />
                <p className="font-sans text-[0.82rem] font-light leading-[2.2] text-white/50">{item.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Values Section
   ============================================================ */

function ValuesSection() {
  const { t } = useLang();
  return (
    <section id="values" className="bg-[#FAFAF8] text-[#1A1A1A] py-32 md:py-52">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-24">
          <SectionLabel>{t.values.label}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            {t.values.title}
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-[#6B6B6B]">
            {t.values.sub}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
          {t.values.items.map((v, i) => (
            <FadeInSection key={v.en} delay={i * 0.1}>
              <div className={`py-14 md:py-16 px-8 md:px-10 text-center ${i < 3 ? "md:border-r border-[#1A1A1A]/6" : ""} ${i < 2 ? "sm:border-b md:border-b-0 border-[#1A1A1A]/6" : ""}`}>
                <p className="font-display text-[0.65rem] font-light tracking-[0.25em] uppercase text-gold mb-5">{v.en}</p>
                <h3 className="font-serif text-[1.5rem] font-light tracking-[0.1em] mb-6">{v.cn}</h3>
                <Divider className="mx-auto mb-6" />
                <p className="font-sans text-[0.78rem] font-light leading-[2.2] text-[#6B6B6B] whitespace-pre-line">{v.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Audience Section
   ============================================================ */

function AudienceSection() {
  const { t } = useLang();
  const { a, b } = t.audience;
  return (
    <section className="bg-[#0A0E14] text-[#F5F5F0] py-32 md:py-52">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-24">
          <SectionLabel>{t.audience.label}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            {t.audience.title}
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-white/35">
            {t.audience.sub}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {[a, b].map((person, i) => (
            <FadeInSection key={person.letter} delay={i * 0.15}>
              <div className={`p-10 md:p-14 ${i === 0 ? "md:border-r border-white/6" : ""}`}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/20 flex items-center justify-center mb-8">
                  <span className="font-serif text-[1.1rem] text-gold font-light">{person.letter}</span>
                </div>
                <h3 className="font-serif text-[1.3rem] font-light tracking-[0.08em] mb-1">{person.title}</h3>
                <p className="font-display text-[0.72rem] font-light italic text-white/30 tracking-[0.06em] mb-6">{person.en}</p>
                <blockquote className="font-serif text-[0.95rem] font-light italic text-gold/70 leading-[1.9] border-l border-gold/20 pl-5 mb-6">
                  {person.quote}
                </blockquote>
                <p className="font-sans text-[0.8rem] font-light leading-[2.2] text-white/45">{person.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Water Reflection Parallax
   ============================================================ */

function WaterReflectionSection() {
  const { t } = useLang();
  return (
    <ParallaxImage
      src={IMAGES.waterReflection}
      alt="Water Reflection"
      height="85vh"
      overlay
      overlayContent={
        <FadeInSection className="text-center px-6 md:px-8">
          <p className="font-serif text-[clamp(1.2rem,2.8vw,2.1rem)] font-extralight tracking-[0.12em] leading-[2.2] text-white">
            {t.water.headline[0]}
            <br />
            <span className="text-gold/80">{t.water.headline[1]}</span>
          </p>
          <p className="mt-6 font-display text-[0.82rem] font-light italic tracking-[0.06em] text-white/45">
            {t.water.sub}
          </p>
        </FadeInSection>
      }
    />
  );
}

/* ============================================================
   Product Section
   ============================================================ */

function ProductSection() {
  const { t } = useLang();
  return (
    <section id="product" className="bg-[#FAFAF8] text-[#1A1A1A] py-32 md:py-52">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-24">
          <SectionLabel>{t.product.label}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            {t.product.title}
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-[#6B6B6B]">
            {t.product.sub}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#1A1A1A]/6">
          {t.product.features.map((f, i) => (
            <FadeInSection key={f.icon} delay={i * 0.08}>
              <div className="bg-[#FAFAF8] p-10 md:p-12 hover:bg-white transition-colors duration-500 group">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-8 group-hover:border-gold/60 transition-colors duration-500">
                  <span className="font-display text-[0.65rem] font-light tracking-[0.1em] text-gold/60">{f.icon}</span>
                </div>
                <h3 className="font-serif text-[1.05rem] font-normal tracking-[0.06em] mb-1">{f.title}</h3>
                <p className="font-display text-[0.68rem] font-light italic text-[#6B6B6B] tracking-[0.06em] mb-5">{f.en}</p>
                <Divider className="mb-5" />
                <p className="font-sans text-[0.78rem] font-light leading-[2.2] text-[#6B6B6B]">{f.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Product Experience
   ============================================================ */

function ProductExperience() {
  const { t } = useLang();
  return (
    <section className="bg-[#0D1117] text-[#F5F5F0] py-32 md:py-52">
      <div className="max-w-[900px] mx-auto px-6 md:px-20">
        <FadeInSection className="mb-16">
          <SectionLabel>{t.productExp.label}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            {t.productExp.title}
          </h2>
        </FadeInSection>
        <FadeInSection delay={0.15}>
          <p className="font-sans text-[0.88rem] md:text-[0.95rem] font-light leading-[2.5] text-white/55">
            {t.productExp.para1}
          </p>
        </FadeInSection>
        <FadeInSection delay={0.25} className="mt-8">
          <p className="font-sans text-[0.88rem] md:text-[0.95rem] font-light leading-[2.5] text-white/55">
            {t.productExp.para2}
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ============================================================
   Mockup / Conversation Preview
   ============================================================ */

function MockupSection() {
  const { t } = useLang();
  return (
    <section className="bg-[#0A0E14] text-[#F5F5F0] py-32 md:py-44">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-20">
          <SectionLabel>{t.mockup.label}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            {t.mockup.title}
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-white/35">
            {t.mockup.sub}
          </p>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="max-w-[360px] mx-auto">
            {/* Phone Frame */}
            <div className="relative bg-[#111827] border border-white/8 rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* Status Bar */}
              <div className="flex items-center justify-between px-6 pt-4 pb-2">
                <span className="font-sans text-[0.6rem] text-white/30">9:41</span>
                <div className="w-20 h-5 bg-[#0A0E14] rounded-full" />
                <span className="font-sans text-[0.6rem] text-white/30">●●●</span>
              </div>
              {/* App Header */}
              <div className="px-5 py-3 border-b border-white/5 text-center">
                <p className="font-serif text-[0.85rem] font-light tracking-[0.15em] text-white/80">归处 HERE</p>
                <p className="font-sans text-[0.55rem] text-white/30 tracking-[0.1em]">{t.mockup.appSub}</p>
              </div>
              {/* Messages */}
              <div className="px-4 py-6 space-y-4 min-h-[360px]">
                {t.mockup.messages.map((msg, i) => (
                  <FadeInSection key={i} delay={i * 0.12}>
                    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[78%] px-4 py-3 rounded-2xl ${
                          msg.role === "user"
                            ? "bg-gold/20 text-white/80 rounded-br-sm"
                            : "bg-white/5 text-white/60 rounded-bl-sm"
                        }`}
                      >
                        <p className="font-sans text-[0.72rem] font-light leading-[1.8]">{msg.text}</p>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
              {/* Input */}
              <div className="px-4 pb-8 pt-2 border-t border-white/5">
                <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-3">
                  <p className="font-sans text-[0.65rem] text-white/20 flex-1">{t.mockup.placeholder}</p>
                  <div className="w-6 h-6 rounded-full bg-gold/30 flex items-center justify-center">
                    <span className="text-gold text-[0.6rem]">↑</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ============================================================
   Ocean Parallax
   ============================================================ */

function OceanSection() {
  const { t } = useLang();
  return (
    <ParallaxImage
      src={IMAGES.ocean}
      alt="Ocean Horizon"
      height="85vh"
      overlay
      overlayContent={
        <FadeInSection className="text-center px-6 md:px-8">
          <p className="font-serif text-[clamp(1.3rem,2.8vw,2.2rem)] font-extralight tracking-[0.15em] leading-[2.2] text-white">
            {t.ocean.headline[0]}
            <br />
            <span className="text-gold/90">{t.ocean.headline[1]}</span>
          </p>
          <p className="mt-6 font-display text-[0.82rem] font-light italic tracking-[0.06em] text-white/50">
            {t.ocean.sub}
          </p>
        </FadeInSection>
      }
    />
  );
}

/* ============================================================
   Journey Section
   ============================================================ */

function JourneySection() {
  const { t } = useLang();
  return (
    <section id="journey" className="bg-[#FAFAF8] text-[#1A1A1A] py-32 md:py-52">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-24">
          <SectionLabel>{t.journey.label}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            {t.journey.title}
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-[#6B6B6B]">
            {t.journey.sub}
          </p>
        </FadeInSection>

        <div className="relative">
          {/* Vertical line on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#1A1A1A]/8 -translate-x-1/2" />

          <div className="space-y-0">
            {t.journey.stages.map((stage, i) => (
              <FadeInSection key={stage.num} delay={i * 0.1}>
                <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-0 ${i < t.journey.stages.length - 1 ? "border-b border-[#1A1A1A]/6" : ""}`}>
                  <div className={`py-12 md:py-16 px-8 md:px-14 ${i % 2 === 0 ? "md:text-right md:pr-20" : "md:order-2 md:pl-20"}`}>
                    <p className="font-display text-[0.62rem] tracking-[0.25em] uppercase text-gold mb-3">{stage.num}</p>
                    <h3 className="font-serif text-[1.3rem] font-light tracking-[0.1em] mb-1">{stage.title}</h3>
                    <p className="font-display text-[0.72rem] font-light italic text-[#6B6B6B] tracking-[0.06em]">{stage.en}</p>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold/40 border border-gold/60 z-10" />
                  <div className={`py-12 md:py-16 px-8 md:px-14 ${i % 2 === 0 ? "md:pl-20" : "md:order-1 md:pr-20 md:text-right"}`}>
                    <p className="font-sans text-[0.8rem] font-light leading-[2.3] text-[#6B6B6B]">{stage.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Quote Section
   ============================================================ */

function QuoteSection() {
  const { t } = useLang();
  return (
    <section className="bg-[#0D1117] text-[#F5F5F0] py-40 md:py-56">
      <FadeInSection className="text-center px-6 md:px-8">
        <span className="font-display text-[5rem] text-white/8 leading-none block mb-6">"</span>
        <p className="font-serif text-[clamp(1.3rem,2.8vw,2.1rem)] font-extralight tracking-[0.12em] leading-[2.4] max-w-[680px] mx-auto mb-8">
          {t.quote.lines.map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
        <p className="font-display text-[0.82rem] font-light italic tracking-[0.06em] text-white/35 max-w-[520px] mx-auto whitespace-pre-line">
          {t.quote.sub}
        </p>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Wisdom Section
   ============================================================ */

function WisdomSection() {
  const { t } = useLang();
  return (
    <section id="wisdom" className="bg-[#F5F5F0] text-[#1A1A1A] py-32 md:py-52">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24 items-start">
          <FadeInSection>
            <SectionLabel>{t.wisdom.label}</SectionLabel>
            <h2 className="mt-4 font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[0.12em] leading-[1.7]">
              {t.wisdom.title}
            </h2>
            <Divider className="mt-8" />
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="font-sans text-[0.85rem] font-light leading-[2.5] text-[#4A4A4A] mb-7">{t.wisdom.para1}</p>
            <p className="font-sans text-[0.85rem] font-light leading-[2.5] text-[#4A4A4A] mb-7">{t.wisdom.para2}</p>
            <p className="font-serif text-[1rem] font-light leading-[2.3] text-[#1A1A1A]/70 italic border-l-2 border-gold/40 pl-6">{t.wisdom.para3}</p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Coach Section
   ============================================================ */

function CoachSection() {
  const { t } = useLang();
  return (
    <section className="bg-[#FAFAF8] text-[#1A1A1A] py-32 md:py-44">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-20">
          <SectionLabel>{t.coach.label}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            {t.coach.title}
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-[#6B6B6B]">
            {t.coach.sub}
          </p>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
            {t.coach.coaches.map((c) => (
              <div key={c.name} className="text-center py-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gold to-[#8B7355] mx-auto mb-4 flex items-center justify-center">
                  <span className="font-serif text-[1rem] md:text-[1.1rem] text-white font-light">{c.char}</span>
                </div>
                <h4 className="font-serif text-[0.85rem] md:text-[0.95rem] font-normal tracking-[0.08em] mb-1">{c.name}</h4>
                <p className="font-sans text-[0.65rem] md:text-[0.7rem] font-light text-[#6B6B6B] leading-[1.7] whitespace-pre-line">
                  {c.specialty}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ============================================================
   Stats Section
   ============================================================ */

function StatsSection() {
  const { t } = useLang();
  return (
    <section className="bg-[#0D1117]">
      <FadeInSection>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {t.stats.items.map((s, i) => (
            <div
              key={s.label}
              className={`py-14 md:py-20 px-6 text-center ${i < 3 ? "md:border-r border-white/8" : ""} ${i < 2 ? "border-b md:border-b-0 border-white/8" : ""}`}
            >
              <div className="font-display text-[2.5rem] md:text-[3.2rem] font-extralight text-gold leading-none mb-3">
                {s.number}
                {s.unit && <span className="text-[0.9rem] md:text-[1rem] font-light">{s.unit}</span>}
              </div>
              <p className="font-sans text-[0.7rem] md:text-[0.78rem] font-light text-white/40 tracking-[0.05em] mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Letter Section
   ============================================================ */

function LetterSection() {
  const { t } = useLang();
  return (
    <section className="bg-[#0A0E14] text-[#F5F5F0] py-32 md:py-40">
      <FadeInSection className="text-center mb-12">
        <SectionLabel>{t.letter.label}</SectionLabel>
        <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
          {t.letter.title}
        </h2>
        <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-white/35">
          {t.letter.sub}
        </p>
      </FadeInSection>

      <FadeInSection delay={0.3}>
        <div className="max-w-[580px] mx-auto mt-10 px-6">
          <div className="p-10 md:p-14 bg-white/3 border border-white/8 text-left">
            <p className="font-serif text-[0.95rem] font-light text-white mb-7">{t.letter.salutation}</p>
            <p className="font-sans text-[0.83rem] font-light leading-[2.4] text-white/55">{t.letter.para1}</p>
            <p className="font-sans text-[0.83rem] font-light leading-[2.4] text-white/55 mt-5">{t.letter.para2}</p>
            <p className="font-sans text-[0.83rem] font-light leading-[2.4] text-white/55 mt-5">{t.letter.para3}</p>
            <p className="font-serif text-[0.85rem] font-light text-gold mt-8 text-right">{t.letter.sign}</p>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Dawn Parallax
   ============================================================ */

function DawnSection() {
  const { t } = useLang();
  return (
    <ParallaxImage
      src={IMAGES.dawn}
      alt="Dawn Awakening"
      height="85vh"
      overlay
      overlayContent={
        <FadeInSection className="text-center px-6 md:px-8">
          <p className="font-serif text-[clamp(1.3rem,2.8vw,2.2rem)] font-extralight tracking-[0.15em] leading-[2.2] text-white">
            {t.dawn.headline[0]}
            <br />
            <span className="text-gold/80">{t.dawn.headline[1]}</span>
          </p>
          <p className="mt-6 font-display text-[0.82rem] font-light italic tracking-[0.08em] text-white/50">
            {t.dawn.sub}
          </p>
        </FadeInSection>
      }
    />
  );
}

/* ============================================================
   Brand System Section
   ============================================================ */

function BrandSystemSection() {
  const { t } = useLang();
  return (
    <section className="bg-[#0D1117] text-[#F5F5F0] py-32 md:py-44">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-24">
          <SectionLabel>{t.brandSystem.label}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            {t.brandSystem.title}
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-white/35">
            {t.brandSystem.sub}
          </p>
        </FadeInSection>

        {/* Color Palette */}
        <FadeInSection className="mb-24">
          <h3 className="font-sans text-[0.68rem] font-normal tracking-[0.2em] uppercase text-gold mb-10">
            {t.brandSystem.colorLabel}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {t.brandSystem.colors.map((c) => (
              <div key={c.hex}>
                <div
                  className="h-24 md:h-32 border border-white/10 mb-4 transition-transform duration-700 hover:scale-[1.02]"
                  style={{ background: c.hex }}
                />
                <p className="font-sans text-[0.62rem] text-white/35 tracking-[0.1em] leading-relaxed">
                  {c.name}<br />{c.hex}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Typography */}
        <FadeInSection className="mb-24">
          <h3 className="font-sans text-[0.68rem] font-normal tracking-[0.2em] uppercase text-gold mb-10">
            {t.brandSystem.typoLabel}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {t.brandSystem.typo.map((ty) => (
              <div key={ty.name}>
                <p className="font-serif text-[1.8rem] md:text-[2.2rem] font-extralight tracking-[0.15em] mb-4">{ty.sample}</p>
                <p className="font-sans text-[0.62rem] text-white/35 tracking-[0.1em]">
                  {ty.name}<br />{ty.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Keywords */}
        <FadeInSection>
          <h3 className="font-sans text-[0.68rem] font-normal tracking-[0.2em] uppercase text-gold mb-10">
            {t.brandSystem.keywordLabel}
          </h3>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {t.brandSystem.keywords.map((k) => (
              <span
                key={k}
                className="px-4 md:px-6 py-2.5 md:py-3 border border-white/10 font-sans text-[0.72rem] md:text-[0.78rem] font-light tracking-[0.1em] text-white/40 transition-all duration-500 hover:border-gold/40 hover:text-gold/60"
              >
                {k}
              </span>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ============================================================
   Final Quote
   ============================================================ */

function FinalQuote() {
  const { t } = useLang();
  return (
    <section className="bg-[#F3F1EB] py-40 md:py-52">
      <FadeInSection className="text-center px-6 md:px-8">
        <span className="font-display text-[4rem] text-[#8B7355]/25 leading-none block mb-8">"</span>
        <p className="font-serif text-[clamp(1.3rem,2.5vw,1.9rem)] font-extralight tracking-[0.12em] leading-[2.4] text-[#1A1A1A] max-w-[700px] mx-auto mb-7">
          {t.finalQuote.lines.map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
        <p className="font-display text-[0.82rem] md:text-[0.85rem] font-light italic tracking-[0.06em] text-[#6B6B6B] max-w-[600px] mx-auto whitespace-pre-line">
          {t.finalQuote.sub}
        </p>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Abstract Flow
   ============================================================ */

function AbstractFlowSection() {
  return <ParallaxImage src={IMAGES.abstractFlow} alt="Abstract Flow" height="50vh" />;
}

/* ============================================================
   Footer
   ============================================================ */

function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-[#0A0E14] text-[#F5F5F0] py-20 md:py-24 text-center">
      <FadeInSection>
        <p className="font-serif text-[1.1rem] md:text-[1.2rem] font-light tracking-[0.3em] mb-4">{t.nav.logo}</p>
        <p className="font-display text-[0.72rem] md:text-[0.75rem] font-light tracking-[0.15em] text-white/35 mb-10">
          {t.footer.tagline}
        </p>
        <Divider className="mx-auto mb-10" />
        <p className="font-sans text-[0.6rem] md:text-[0.62rem] font-light tracking-[0.1em] text-white/20 leading-relaxed whitespace-pre-line">
          {t.footer.brand}
        </p>
        <p className="font-sans text-[0.6rem] md:text-[0.62rem] font-light tracking-[0.1em] text-white/20 mt-4">
          {t.footer.copyright}
        </p>
      </FadeInSection>
    </footer>
  );
}

/* ============================================================
   Main Page
   ============================================================ */

export default function Home() {
  const { t } = useLang();

  useEffect(() => {
    document.title = t.meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", t.meta.description);
  }, [t]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <BrandEssence />
      <InnerLightSection />
      <PhilosophySection />
      <ValuesSection />
      <AudienceSection />
      <WaterReflectionSection />
      <ProductSection />
      <ProductExperience />
      <MockupSection />
      <OceanSection />
      <JourneySection />
      <QuoteSection />
      <WisdomSection />
      <CoachSection />
      <StatsSection />
      <LetterSection />
      <DawnSection />
      <BrandSystemSection />
      <FinalQuote />
      <AbstractFlowSection />
      <Footer />
    </div>
  );
}
