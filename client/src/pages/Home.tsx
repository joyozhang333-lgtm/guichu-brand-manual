/**
 * 归处 HERE — 品牌手册升级版
 * 设计哲学：「墨韵流光」— 新东方主义 × 数字侘寂
 *
 * 色彩系统：
 *   墨夜 #080B10 → 宣纸白 #F3F0E8（从暗到明的叙事线）
 *   晨曦金 #C4A265 为唯一暖色强调
 *
 * 字体系统：
 *   Noto Serif SC 200-400（中文标题，超宽字距）
 *   Cormorant Garamond 300i-400（英文展示，斜体）
 *   system-ui（正文）
 *
 * 动效：毛笔书写节奏渐入（先快后慢），水墨晕染扩展
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   CDN Images
   ───────────────────────────────────────────── */
const IMG = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475366298/3ZAvdrakXiVUhug6Wc5ns2/hero-ink-night-PcSjEHxYW2YWPvQUCQ2s7k.webp",
  innerLight: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475366298/3ZAvdrakXiVUhug6Wc5ns2/inner-light-meditation-bCkGCA4AQYaeKne3oEZPkz.webp",
  water: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475366298/3ZAvdrakXiVUhug6Wc5ns2/water-ink-reflection-NxnofBRHFjLRmk8do3gvgT.webp",
  dawn: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475366298/3ZAvdrakXiVUhug6Wc5ns2/dawn-awakening-gold-TwR4ceHMNXPzkvoHbnWEej.webp",
  inkFlow: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475366298/3ZAvdrakXiVUhug6Wc5ns2/abstract-ink-flow-LUwYbUCbWsG7Xfd9KG6H6o.webp",
};

/* ─────────────────────────────────────────────
   Shared Primitives
   ───────────────────────────────────────────── */

function FadeIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Parallax({ src, alt, height = "85vh", children }: { src: string; alt: string; height?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <motion.div className="absolute inset-0 w-full" style={{ y, height: "120%" }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </motion.div>
      {children && (
        <div className="absolute inset-0 bg-ink-deep/50 flex items-center justify-center">{children}</div>
      )}
    </div>
  );
}

function GoldLine({ className = "" }: { className?: string }) {
  return <div className={`w-10 h-px bg-gold/40 ${className}`} />;
}

function Label({ children }: { children: ReactNode }) {
  return <p className="font-sans text-[0.58rem] font-normal tracking-[0.32em] uppercase text-gold-muted/70 mb-3">{children}</p>;
}

/* ─────────────────────────────────────────────
   Navigation
   ───────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"zh" | "en">("zh");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: lang === "zh" ? "理念" : "Philosophy", href: "#philosophy" },
    { label: lang === "zh" ? "价值" : "Values", href: "#values" },
    { label: lang === "zh" ? "产品" : "Product", href: "#product" },
    { label: lang === "zh" ? "旅程" : "Journey", href: "#journey" },
    { label: lang === "zh" ? "智慧" : "Wisdom", href: "#wisdom" },
    { label: lang === "zh" ? "品牌" : "Brand", href: "#brand" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-ink-deep/95 backdrop-blur-md border-b border-white/[0.04]" : "bg-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 h-16 md:h-20 flex items-center justify-between">
          <a href="#" className="font-serif text-[0.9rem] font-light tracking-[0.35em] text-parchment/90 hover:text-gold transition-colors duration-500">
            {lang === "zh" ? "归处 HERE" : "HERE 归处"}
          </a>
          <div className="hidden md:flex items-center gap-9">
            {links.map(l => (
              <a key={l.href} href={l.href} className="font-sans text-[0.6rem] font-normal tracking-[0.22em] uppercase text-parchment/35 hover:text-parchment/80 transition-colors duration-500">{l.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === "zh" ? "en" : "zh")} className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-gold-muted/60 hover:text-gold border border-gold/20 hover:border-gold/50 px-3 py-1.5 transition-all duration-500">
              {lang === "zh" ? "EN" : "中"}
            </button>
            <button className="md:hidden flex flex-col gap-1.5 w-7 h-7 justify-center items-center" onClick={() => setOpen(!open)}>
              <span className={`block w-5 h-px bg-parchment/60 transition-all duration-300 ${open ? "rotate-45 translate-y-[4px]" : ""}`} />
              <span className={`block w-5 h-px bg-parchment/60 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-parchment/60 transition-all duration-300 ${open ? "-rotate-45 -translate-y-[4px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-ink-deep/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 + 0.1 }}
                className="font-serif text-[1.3rem] font-extralight tracking-[0.25em] text-parchment/70 hover:text-gold transition-colors" onClick={() => setOpen(false)}>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const op = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen min-h-[650px] overflow-hidden bg-ink-deep">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={IMG.hero} alt="归处" className="w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/20 via-transparent to-ink-deep/85" />
      </motion.div>

      <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ opacity: op }}>
        <FadeIn>
          <p className="font-sans text-[0.55rem] md:text-[0.6rem] tracking-[0.4em] uppercase text-gold-muted/50 mb-10">
            Brand Manual · 品牌手册
          </p>
          <h1 className="font-serif text-[clamp(2rem,5.5vw,4.5rem)] font-extralight tracking-[0.15em] leading-[1.5] text-parchment mb-5">
            在黑暗中找到光
            <br />
            <span className="text-gold/85">在喧嚣中找到静</span>
          </h1>
          <GoldLine className="mx-auto mb-7" />
          <p className="font-display text-[clamp(0.75rem,1.4vw,0.95rem)] font-light italic tracking-[0.08em] text-parchment/35 max-w-[500px]">
            Finding light in darkness, stillness in noise.
          </p>
        </FadeIn>
      </motion.div>

      <FadeIn delay={0.8} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <p className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-parchment/20">Scroll</p>
        <div className="w-px h-14 bg-gradient-to-b from-parchment/20 to-transparent" />
      </FadeIn>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-16 md:pb-20">
        <FadeIn delay={0.5}>
          <p className="font-serif text-[clamp(3rem,9vw,8rem)] font-extralight tracking-[0.6em] text-parchment/[0.04] select-none">
            归处
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Brand Essence
   ───────────────────────────────────────────── */

function BrandEssence() {
  return (
    <section className="bg-parchment py-32 md:py-48">
      <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
        <FadeIn>
          <Label>品牌本质 · Brand Essence</Label>
          <GoldLine className="mx-auto mb-16" />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="font-serif text-[clamp(1.05rem,2vw,1.4rem)] font-extralight tracking-[0.1em] leading-[2.8] text-ink/60">
            归处不是一个地方，
            <br />而是一种状态——
            <br />当你不再向外寻找，
            <br />而是向内回归的那一刻，
            <br />你就已经到了。
          </p>
        </FadeIn>
        <FadeIn delay={0.3} className="mt-14">
          <p className="font-serif text-[clamp(1.3rem,2.8vw,2rem)] font-light tracking-[0.12em] text-ink/80">
            心安即是归处
          </p>
          <p className="font-display text-[0.8rem] font-light italic tracking-[0.08em] text-ink/30 mt-3">
            Where the heart rests, there is home.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Inner Light Parallax
   ───────────────────────────────────────────── */

function InnerLight() {
  return (
    <Parallax src={IMG.innerLight} alt="内在之光" height="90vh">
      <FadeIn className="text-center px-6">
        <p className="font-serif text-[clamp(1.2rem,2.8vw,2.2rem)] font-extralight tracking-[0.14em] leading-[2.2] text-parchment">
          每个人心中都有一盏灯
          <br />
          <span className="text-gold/85">归处只是帮你点亮它</span>
        </p>
        <p className="mt-7 font-display text-[clamp(0.72rem,1.2vw,0.88rem)] font-light italic tracking-[0.06em] text-parchment/40 max-w-[480px] mx-auto">
          Everyone carries a light within. We simply help you find the match.
        </p>
      </FadeIn>
    </Parallax>
  );
}

/* ─────────────────────────────────────────────
   Philosophy Section
   ───────────────────────────────────────────── */

function Philosophy() {
  const items = [
    { num: "01", title: "向内回归", en: "Inward Return", desc: "真正的答案不在远方，而在你心中。归处引导你停下脚步，倾听内在的声音，在自我对话中找到方向。" },
    { num: "02", title: "温柔陪伴", en: "Gentle Presence", desc: "不评判、不催促、不说教。像一位老友，在你需要时静静陪在身边，用温暖的沉默代替喧嚣的建议。" },
    { num: "03", title: "东方智慧", en: "Eastern Wisdom", desc: "融合禅宗、道家、儒学的千年智慧，以现代心理学为桥梁，让古老的洞见在当下生活中自然流淌。" },
    { num: "04", title: "呼吸节奏", en: "Breathing Rhythm", desc: "每一次交互都遵循呼吸的节奏——吸气是接收，呼气是释放。在快与慢之间，找到属于你的频率。" },
  ];

  return (
    <section id="philosophy" className="bg-ink text-parchment py-32 md:py-48">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <FadeIn className="text-center mb-24 md:mb-32">
          <Label>设计哲学 · Design Philosophy</Label>
          <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.18em]">
            四维哲学体系
          </h2>
          <p className="mt-3 font-display text-[0.85rem] font-light tracking-[0.12em] italic text-parchment/30">
            Four Pillars of Our Philosophy
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {items.map((item, i) => (
            <FadeIn key={item.num} delay={i * 0.1}>
              <div className={`p-10 md:p-14 border-parchment/[0.05] ${i % 2 === 0 ? "md:border-r" : ""} ${i < 2 ? "border-b" : ""}`}>
                <p className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-gold-muted/40 mb-7">{item.num}</p>
                <h3 className="font-serif text-[1.25rem] md:text-[1.4rem] font-light tracking-[0.12em] mb-2">{item.title}</h3>
                <p className="font-display text-[0.72rem] font-light italic tracking-[0.08em] text-parchment/25 mb-7">{item.en}</p>
                <GoldLine className="mb-7" />
                <p className="font-sans text-[0.8rem] font-light leading-[2.3] text-parchment/45">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Values Section
   ───────────────────────────────────────────── */

function Values() {
  const items = [
    { cn: "真实", en: "Authenticity", desc: "不伪装、不迎合\n做最真实的自己\n是一切疗愈的起点" },
    { cn: "温暖", en: "Warmth", desc: "如冬日暖阳\n不灼热、不刺眼\n却能融化心中的冰" },
    { cn: "智慧", en: "Wisdom", desc: "不是知道所有答案\n而是学会与问题共处\n在不确定中找到安宁" },
    { cn: "归属", en: "Belonging", desc: "不是被某处接纳\n而是接纳自己\n心安之处即是归处" },
  ];

  return (
    <section id="values" className="bg-parchment text-ink py-32 md:py-48">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <FadeIn className="text-center mb-24">
          <Label>核心价值 · Core Values</Label>
          <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.18em]">
            四个信念
          </h2>
          <p className="mt-3 font-display text-[0.85rem] font-light tracking-[0.12em] italic text-ink/30">
            The Beliefs That Guide Us
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
          {items.map((v, i) => (
            <FadeIn key={v.en} delay={i * 0.1}>
              <div className={`py-14 md:py-16 px-8 md:px-10 text-center ${i < 3 ? "md:border-r border-ink/[0.06]" : ""}`}>
                <p className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-gold-muted mb-5">{v.en}</p>
                <h3 className="font-serif text-[1.5rem] font-light tracking-[0.12em] mb-7">{v.cn}</h3>
                <GoldLine className="mx-auto mb-7" />
                <p className="font-sans text-[0.76rem] font-light leading-[2.3] text-ink/45 whitespace-pre-line">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Water Reflection Parallax
   ───────────────────────────────────────────── */

function WaterReflection() {
  return (
    <Parallax src={IMG.water} alt="水面倒影" height="80vh">
      <FadeIn className="text-center px-6">
        <p className="font-serif text-[clamp(1.1rem,2.5vw,2rem)] font-extralight tracking-[0.14em] leading-[2.4] text-parchment">
          水面映照的不是风景
          <br />
          <span className="text-gold/80">而是你内心的模样</span>
        </p>
        <p className="mt-7 font-display text-[0.8rem] font-light italic tracking-[0.06em] text-parchment/40">
          The water reflects not the landscape, but the shape of your inner world.
        </p>
      </FadeIn>
    </Parallax>
  );
}

/* ─────────────────────────────────────────────
   Audience Section
   ───────────────────────────────────────────── */

function Audience() {
  return (
    <section className="bg-ink text-parchment py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <FadeIn className="text-center mb-28 md:mb-36">
          <Label>目标用户 · Target Audience</Label>
          <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.18em]">
            我们为谁而来
          </h2>
          <p className="mt-3 font-display text-[0.85rem] font-light tracking-[0.12em] italic text-parchment/30">
            Who We Serve
          </p>
        </FadeIn>

        {/* Persona A: Full-width immersive narrative */}
        <FadeIn>
          <div className="relative mb-32 md:mb-40">
            {/* Background decorative character */}
            <span className="absolute -top-16 -right-8 md:right-0 font-serif text-[12rem] md:text-[18rem] font-extralight leading-none text-parchment/[0.02] select-none pointer-events-none">
              倦
            </span>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-px h-12 bg-gold/30" />
                  <p className="font-display text-[0.58rem] tracking-[0.3em] uppercase text-gold-muted/60">Persona A</p>
                </div>
                <h3 className="font-serif text-[clamp(1.6rem,3vw,2.6rem)] font-extralight tracking-[0.15em] leading-[1.6] mb-4">
                  都市倦旅人
                </h3>
                <p className="font-display text-[0.85rem] font-light italic text-parchment/20 tracking-[0.08em] mb-10">
                  The Weary Urban Soul
                </p>
                <blockquote className="font-serif text-[clamp(1.1rem,2vw,1.5rem)] font-extralight italic text-gold/50 leading-[2.2] mb-10">
                  「我拥有了一切，<br />却感觉什么都没有。」
                </blockquote>
                <div className="w-10 h-px bg-gold/25 mb-10" />
                <p className="font-sans text-[0.82rem] font-light leading-[2.6] text-parchment/40 max-w-[480px]">
                  25-35岁的都市白领，在高速运转的生活中感到疲惫与空虚。他们不缺物质，缺的是一个可以卸下面具、真实呼吸的空间。
                </p>
              </div>
              <div className="flex flex-col gap-6 md:pt-16">
                {["早上九点，第三杯美式咖啡。手机屏幕上满是未读消息。", "深夜加班后回到家，对着空荡荡的房间发呆。", "朋友圈里都是精心修饰的生活，只有自己知道内心的空洞。"].map((scene, i) => (
                  <div key={i} className="pl-6 border-l border-parchment/[0.06] py-2">
                    <p className="font-sans text-[0.72rem] font-light leading-[2.2] text-parchment/25 italic">{scene}</p>
                  </div>
                ))}
                <p className="font-serif text-[0.82rem] font-light text-gold/40 mt-4 pl-6">
                  —— 归处，是他们在深夜打开的那个安静角落
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Divider */}
        <FadeIn>
          <div className="flex items-center gap-6 mb-32 md:mb-40">
            <div className="flex-1 h-px bg-parchment/[0.04]" />
            <span className="font-display text-[0.55rem] tracking-[0.3em] uppercase text-parchment/15">&</span>
            <div className="flex-1 h-px bg-parchment/[0.04]" />
          </div>
        </FadeIn>

        {/* Persona B: Reversed layout */}
        <FadeIn>
          <div className="relative">
            <span className="absolute -top-16 -left-8 md:left-0 font-serif text-[12rem] md:text-[18rem] font-extralight leading-none text-parchment/[0.02] select-none pointer-events-none">
              探
            </span>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
              <div className="flex flex-col gap-6 md:pt-16 md:order-1 order-2">
                {["书架上摆满了心理学与哲学的书，却找不到一个可以对话的人。", "尝试过冥想 App，但总觉得缺少什么——一个真正理解你的回应。", "渴望深度的自我对话，而不是千篇一律的心灵鸡汤。"].map((scene, i) => (
                  <div key={i} className="pl-6 border-l border-parchment/[0.06] py-2">
                    <p className="font-sans text-[0.72rem] font-light leading-[2.2] text-parchment/25 italic">{scene}</p>
                  </div>
                ))}
                <p className="font-serif text-[0.82rem] font-light text-gold/40 mt-4 pl-6">
                  —— 归处，是他们探索内心的第一步
                </p>
              </div>
              <div className="md:order-2 order-1">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-px h-12 bg-gold/30" />
                  <p className="font-display text-[0.58rem] tracking-[0.3em] uppercase text-gold-muted/60">Persona B</p>
                </div>
                <h3 className="font-serif text-[clamp(1.6rem,3vw,2.6rem)] font-extralight tracking-[0.15em] leading-[1.6] mb-4">
                  内在探索者
                </h3>
                <p className="font-display text-[0.85rem] font-light italic text-parchment/20 tracking-[0.08em] mb-10">
                  The Inner Explorer
                </p>
                <blockquote className="font-serif text-[clamp(1.1rem,2vw,1.5rem)] font-extralight italic text-gold/50 leading-[2.2] mb-10">
                  「我想了解自己，<br />但不知道从哪里开始。」
                </blockquote>
                <div className="w-10 h-px bg-gold/25 mb-10" />
                <p className="font-sans text-[0.82rem] font-light leading-[2.6] text-parchment/40 max-w-[480px]">
                  对心理学、冥想、东方哲学有兴趣的求知者。他们渴望深度的自我对话，而非浅层的心灵鸡汤。归处为他们提供了一个安全的探索入口。
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Product Section
   ───────────────────────────────────────────── */

function Product() {
  const features = [
    { icon: "心", title: "AI 心理陪伴", en: "AI Companion", desc: "基于认知行为疗法与东方智慧的AI对话伙伴，温柔而有深度地陪你走过每一个情绪波动。" },
    { icon: "禅", title: "冥想引导", en: "Meditation Guide", desc: "结合MiniMax语音合成的沉浸式冥想体验，从呼吸觉察到身体扫描，每一次练习都是回归。" },
    { icon: "书", title: "智慧信箱", en: "Wisdom Letters", desc: "来自东方哲学的每日智慧，以书信的形式送达。不是鸡汤，而是能在心中生根的种子。" },
    { icon: "月", title: "情绪签到", en: "Mood Check-in", desc: "用简单的方式记录每天的情绪色彩，在时间的维度上看见自己的内在变化轨迹。" },
    { icon: "灯", title: "回响卡片", en: "Echo Cards", desc: "将对话中的深刻洞见凝结为精美卡片，随时回顾那些触动心灵的瞬间。" },
    { icon: "山", title: "成长旅程", en: "Growth Journey", desc: "不是线性的进步，而是螺旋式的深入。每一次回到原点，你都比上一次更深一层。" },
  ];

  return (
    <section id="product" className="bg-parchment text-ink py-32 md:py-48">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <FadeIn className="text-center mb-24">
          <Label>产品功能 · Product Features</Label>
          <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.18em]">
            六个维度的陪伴
          </h2>
          <p className="mt-3 font-display text-[0.85rem] font-light tracking-[0.12em] italic text-ink/30">
            Six Dimensions of Companionship
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-ink/[0.06]">
          {features.map((f, i) => (
            <FadeIn key={f.icon} delay={i * 0.08}>
              <div className="bg-parchment p-10 md:p-12 hover:bg-parchment-warm transition-colors duration-700 group">
                <div className="w-10 h-10 border border-gold/25 flex items-center justify-center mb-9 group-hover:border-gold/50 transition-colors duration-700">
                  <span className="font-serif text-[0.85rem] text-gold-muted/60">{f.icon}</span>
                </div>
                <h3 className="font-serif text-[1.02rem] font-normal tracking-[0.08em] mb-1">{f.title}</h3>
                <p className="font-display text-[0.65rem] font-light italic text-ink/30 tracking-[0.06em] mb-6">{f.en}</p>
                <GoldLine className="mb-6" />
                <p className="font-sans text-[0.76rem] font-light leading-[2.3] text-ink/45">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Mockup Section
   ───────────────────────────────────────────── */

function Mockup() {
  const messages = [
    { role: "ai", text: "你好，欢迎回来。今天感觉怎么样？" },
    { role: "user", text: "有点累，工作压力很大，感觉喘不过气来。" },
    { role: "ai", text: "嗯，我听到了。压力像一块石头压在胸口的感觉，对吗？先深呼吸一下……你不需要马上解决任何事情。" },
    { role: "user", text: "谢谢。有时候觉得自己什么都做不好。" },
    { role: "ai", text: "这种感觉很常见，但它不是事实。你现在愿意来到这里，愿意说出来，本身就是一种勇气。我们慢慢来，好吗？" },
  ];

  return (
    <section className="bg-ink text-parchment py-32 md:py-44">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <FadeIn className="text-center mb-20">
          <Label>对话体验 · Conversation Preview</Label>
          <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.18em]">
            一次真实的对话
          </h2>
          <p className="mt-3 font-display text-[0.85rem] font-light tracking-[0.12em] italic text-parchment/30">
            A Real Conversation
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-[380px] mx-auto">
            <div className="relative bg-[#111827] border border-parchment/[0.06] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between px-6 pt-4 pb-2">
                <span className="font-sans text-[0.55rem] text-parchment/25">9:41</span>
                <div className="w-20 h-5 bg-ink-deep rounded-full" />
                <span className="font-sans text-[0.55rem] text-parchment/25">●●●</span>
              </div>
              <div className="px-5 py-3 border-b border-parchment/[0.04] text-center">
                <p className="font-serif text-[0.82rem] font-light tracking-[0.18em] text-parchment/75">归处 HERE</p>
                <p className="font-sans text-[0.5rem] text-parchment/25 tracking-[0.12em]">你的内在陪伴</p>
              </div>
              <div className="px-4 py-6 space-y-4 min-h-[380px]">
                {messages.map((msg, i) => (
                  <FadeIn key={i} delay={i * 0.12}>
                    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === "user" ? "bg-gold/15 text-parchment/75 rounded-br-sm" : "bg-parchment/[0.04] text-parchment/55 rounded-bl-sm"}`}>
                        <p className="font-sans text-[0.7rem] font-light leading-[1.9]">{msg.text}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <div className="px-4 pb-8 pt-2 border-t border-parchment/[0.04]">
                <div className="flex items-center gap-3 bg-parchment/[0.04] rounded-full px-4 py-3">
                  <p className="font-sans text-[0.62rem] text-parchment/15 flex-1">说说你的感受…</p>
                  <div className="w-6 h-6 rounded-full bg-gold/25 flex items-center justify-center">
                    <span className="text-gold text-[0.55rem]">↑</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Dawn Parallax
   ───────────────────────────────────────────── */

function Dawn() {
  return (
    <Parallax src={IMG.dawn} alt="晨曦觉醒" height="85vh">
      <FadeIn className="text-center px-6">
        <p className="font-serif text-[clamp(1.2rem,2.8vw,2.2rem)] font-extralight tracking-[0.15em] leading-[2.2] text-parchment">
          黎明不是突然到来的
          <br />
          <span className="text-gold/80">它是一点一点亮起来的</span>
        </p>
        <p className="mt-7 font-display text-[0.8rem] font-light italic tracking-[0.08em] text-parchment/45">
          Dawn doesn't arrive suddenly — it brightens, one shade at a time.
        </p>
      </FadeIn>
    </Parallax>
  );
}

/* ─────────────────────────────────────────────
   Journey Section
   ───────────────────────────────────────────── */

function Journey() {
  const stages = [
    { num: "Phase 01", title: "觉察", en: "Awareness", desc: "停下来，感受此刻。不评判，不分析，只是看见——看见自己的情绪、念头、身体的感受。这是所有改变的起点。" },
    { num: "Phase 02", title: "接纳", en: "Acceptance", desc: "允许一切如其所是。悲伤可以存在，焦虑可以存在，迷茫也可以存在。接纳不是放弃，而是给自己一个喘息的空间。" },
    { num: "Phase 03", title: "转化", en: "Transformation", desc: "在觉察与接纳的基础上，改变自然发生。不是用力推动，而是像水一样，找到自己的流向。" },
    { num: "Phase 04", title: "归处", en: "Homecoming", desc: "回到自己。不是变成另一个人，而是更深地成为自己。心安之处，即是归处。" },
  ];

  return (
    <section id="journey" className="bg-parchment text-ink py-32 md:py-48">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <FadeIn className="text-center mb-24">
          <Label>用户旅程 · User Journey</Label>
          <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.18em]">
            四个阶段的回归
          </h2>
          <p className="mt-3 font-display text-[0.85rem] font-light tracking-[0.12em] italic text-ink/30">
            Four Stages of Homecoming
          </p>
        </FadeIn>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-ink/[0.06] -translate-x-1/2" />
          <div className="space-y-0">
            {stages.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-0 ${i < stages.length - 1 ? "border-b border-ink/[0.06]" : ""}`}>
                  <div className={`py-12 md:py-16 px-8 md:px-14 ${i % 2 === 0 ? "md:text-right md:pr-20" : "md:order-2 md:pl-20"}`}>
                    <p className="font-display text-[0.58rem] tracking-[0.3em] uppercase text-gold-muted mb-4">{s.num}</p>
                    <h3 className="font-serif text-[1.25rem] font-light tracking-[0.12em] mb-1">{s.title}</h3>
                    <p className="font-display text-[0.7rem] font-light italic text-ink/30 tracking-[0.06em]">{s.en}</p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold/35 border border-gold/50 z-10" />
                  <div className={`py-12 md:py-16 px-8 md:px-14 ${i % 2 === 0 ? "md:pl-20" : "md:order-1 md:pr-20 md:text-right"}`}>
                    <p className="font-sans text-[0.78rem] font-light leading-[2.4] text-ink/45">{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Quote Section
   ───────────────────────────────────────────── */

function Quote() {
  return (
    <section className="bg-ink text-parchment py-40 md:py-56">
      <FadeIn className="text-center px-6">
        <span className="font-display text-[5rem] text-parchment/[0.06] leading-none block mb-6">"</span>
        <p className="font-serif text-[clamp(1.2rem,2.5vw,2rem)] font-extralight tracking-[0.14em] leading-[2.5] max-w-[700px] mx-auto mb-8">
          你不需要去任何地方，
          <br />你已经在路上了。
          <br />你不需要成为任何人，
          <br />你已经是了。
        </p>
        <p className="font-display text-[0.8rem] font-light italic tracking-[0.06em] text-parchment/30 max-w-[550px] mx-auto">
          You don't need to go anywhere — you're already on the way.
          <br />You don't need to become anyone — you already are.
        </p>
      </FadeIn>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Wisdom Section
   ───────────────────────────────────────────── */

function Wisdom() {
  return (
    <section id="wisdom" className="bg-parchment text-ink py-32 md:py-48">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24 items-start">
          <FadeIn>
            <Label>智慧传承 · Wisdom Heritage</Label>
            <h2 className="mt-5 font-serif text-[clamp(1.3rem,2.2vw,1.9rem)] font-light tracking-[0.14em] leading-[1.8]">
              千年智慧
              <br />当代表达
            </h2>
            <GoldLine className="mt-9" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans text-[0.82rem] font-light leading-[2.6] text-ink/45 mb-8">
              归处的智慧根基扎根于东方哲学的千年传统。禅宗的"直指人心"、道家的"无为而治"、儒学的"修身养性"——这些古老的洞见在归处的AI对话中以现代的语言重新绽放。
            </p>
            <p className="font-sans text-[0.82rem] font-light leading-[2.6] text-ink/45 mb-8">
              我们不是在复制传统，而是在传承智慧。每一次对话都是古今的桥梁，每一个建议都融合了心理学的严谨与哲学的深邃。
            </p>
            <p className="font-serif text-[0.95rem] font-light leading-[2.4] text-ink/60 italic border-l-2 border-gold/35 pl-6">
              "知人者智，自知者明。胜人者有力，自胜者强。知足者富，强行者有志。不失其所者久，死而不亡者寿。"
              <br />
              <span className="text-[0.78rem] text-ink/35 not-italic">——《道德经》第三十三章</span>
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Coach Section
   ───────────────────────────────────────────── */

function Coach() {
  const coaches = [
    { char: "静", name: "静心", en: "Jìng Xīn", role: "正念冥想导师", roleEn: "Mindfulness Guide", philosophy: "万物静观皆自得", desc: "引导你回到呼吸的原点，在每一次吸与呼之间，找到身体与心灵的对话。" },
    { char: "慧", name: "慧语", en: "Huì Yǔ", role: "认知重构导师", roleEn: "Cognitive Guide", philosophy: "转念即转境", desc: "帮助你看见思维的惯性模式，用温柔的方式重新理解自己与世界的关系。" },
    { char: "悟", name: "悟道", en: "Wù Dào", role: "东方哲学导师", roleEn: "Philosophy Guide", philosophy: "道法自然", desc: "融合禅宗、道家与儒学的千年智慧，为当代困惑提供古老而鲜活的洞见。" },
    { char: "安", name: "安然", en: "Ān Rán", role: "身心放松导师", roleEn: "Relaxation Guide", philosophy: "身安则心安", desc: "从身体的紧张开始松解，用渐进式放松与呼吸法，让你重新感受轻盈。" },
    { char: "明", name: "明心", en: "Míng Xīn", role: "内在成长导师", roleEn: "Growth Guide", philosophy: "明心见性", desc: "陪你走进内心深处，探索那些未曾被看见的自己，在黑暗中点亮觉知之灯。" },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const active = coaches[activeIdx];

  return (
    <section className="bg-parchment text-ink py-32 md:py-48">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <FadeIn className="mb-20 md:mb-28">
          <Label>AI 导师 · AI Coaches</Label>
          <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.18em] text-center">
            五位内在向导
          </h2>
          <p className="mt-3 font-display text-[0.85rem] font-light tracking-[0.12em] italic text-ink/30 text-center">
            Five Inner Guides
          </p>
        </FadeIn>

        {/* Desktop: Editorial magazine layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[1fr_auto_1.4fr] gap-0 items-stretch min-h-[420px]">
            {/* Left: Large character + name */}
            <FadeIn className="flex flex-col justify-center pr-16">
              <div className="relative">
                <span className="font-serif text-[10rem] font-extralight leading-none text-ink/[0.06] absolute -top-12 -left-4 select-none">
                  {active.char}
                </span>
                <div className="relative z-10">
                  <p className="font-display text-[0.58rem] tracking-[0.3em] uppercase text-gold-muted mb-6">{active.roleEn}</p>
                  <h3 className="font-serif text-[2.8rem] font-extralight tracking-[0.2em] mb-2">{active.name}</h3>
                  <p className="font-display text-[0.9rem] font-light italic text-ink/25 tracking-[0.08em] mb-8">{active.en}</p>
                  <div className="w-10 h-px bg-gold/40 mb-8" />
                  <p className="font-serif text-[1.05rem] font-light text-gold-muted/80 tracking-[0.1em] italic">
                    「{active.philosophy}」
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Center: Vertical divider with character tabs */}
            <div className="flex flex-col items-center gap-0 px-8">
              <div className="w-px flex-1 bg-ink/[0.06]" />
              {coaches.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setActiveIdx(i)}
                  className={`w-12 h-12 flex items-center justify-center transition-all duration-700 border ${
                    i === activeIdx
                      ? "border-gold/50 bg-gold/[0.06] text-ink"
                      : "border-transparent text-ink/20 hover:text-ink/50 hover:border-ink/[0.08]"
                  }`}
                >
                  <span className="font-serif text-[0.95rem] font-light">{c.char}</span>
                </button>
              ))}
              <div className="w-px flex-1 bg-ink/[0.06]" />
            </div>

            {/* Right: Description + role */}
            <FadeIn className="flex flex-col justify-center pl-16 border-l border-ink/[0.04]">
              <p className="font-sans text-[0.62rem] tracking-[0.2em] uppercase text-gold-muted/60 mb-4">{active.role}</p>
              <p className="font-sans text-[0.88rem] font-light leading-[2.6] text-ink/50 max-w-[440px]">
                {active.desc}
              </p>
              <div className="mt-12 flex items-center gap-6">
                <span className="font-display text-[0.58rem] tracking-[0.2em] uppercase text-ink/20">
                  {String(activeIdx + 1).padStart(2, "0")} / {String(coaches.length).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-ink/[0.06] relative">
                  <div className="absolute top-0 left-0 h-px bg-gold/40 transition-all duration-700" style={{ width: `${((activeIdx + 1) / coaches.length) * 100}%` }} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Mobile: Stacked editorial cards */}
        <div className="md:hidden space-y-0">
          {coaches.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.08}>
              <div className={`py-10 px-2 ${i < coaches.length - 1 ? "border-b border-ink/[0.06]" : ""}`}>
                <div className="flex items-baseline gap-5 mb-5">
                  <span className="font-serif text-[3rem] font-extralight text-ink/[0.08] leading-none">{c.char}</span>
                  <div>
                    <h4 className="font-serif text-[1.15rem] font-light tracking-[0.12em]">{c.name}</h4>
                    <p className="font-display text-[0.68rem] font-light italic text-ink/25">{c.en} · {c.role}</p>
                  </div>
                </div>
                <p className="font-sans text-[0.78rem] font-light leading-[2.3] text-ink/45 pl-1">{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Stats Section
   ───────────────────────────────────────────── */

function Stats() {
  const items = [
    { number: "5", unit: "位", label: "AI 心理导师" },
    { number: "∞", unit: "", label: "无限次对话" },
    { number: "7", unit: "种", label: "冥想模式" },
    { number: "365", unit: "天", label: "每日智慧" },
  ];

  return (
    <section className="bg-ink">
      <FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((s, i) => (
            <div key={s.label} className={`py-14 md:py-20 px-6 text-center ${i < 3 ? "md:border-r border-parchment/[0.06]" : ""} ${i < 2 ? "border-b md:border-b-0 border-parchment/[0.06]" : ""}`}>
              <div className="font-display text-[2.5rem] md:text-[3.2rem] font-extralight text-gold leading-none mb-3">
                {s.number}
                {s.unit && <span className="text-[0.85rem] md:text-[0.95rem] font-light">{s.unit}</span>}
              </div>
              <p className="font-sans text-[0.68rem] md:text-[0.75rem] font-light text-parchment/35 tracking-[0.06em] mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Letter Section
   ───────────────────────────────────────────── */

function Letter() {
  return (
    <section className="bg-ink text-parchment py-32 md:py-40">
      <FadeIn className="text-center mb-12">
        <Label>创始人信 · Founder's Letter</Label>
        <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.18em]">
          致每一个正在寻找的你
        </h2>
        <p className="mt-3 font-display text-[0.85rem] font-light tracking-[0.12em] italic text-parchment/30">
          To Everyone Still Searching
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="max-w-[600px] mx-auto mt-10 px-6">
          <div className="p-10 md:p-14 bg-parchment/[0.02] border border-parchment/[0.06] text-left">
            <p className="font-serif text-[0.92rem] font-light text-parchment/70 mb-8">亲爱的朋友：</p>
            <p className="font-sans text-[0.8rem] font-light leading-[2.5] text-parchment/45">
              做归处这件事，源于一个很简单的念头：在这个越来越快的世界里，我们是否还能找到一个可以慢下来的地方？
            </p>
            <p className="font-sans text-[0.8rem] font-light leading-[2.5] text-parchment/45 mt-5">
              我们不想做又一个效率工具，不想做又一个社交平台。我们只想做一个安静的角落——当你累了，可以来这里坐坐；当你迷茫了，可以来这里聊聊；当你找不到方向，可以来这里听听内心的声音。
            </p>
            <p className="font-sans text-[0.8rem] font-light leading-[2.5] text-parchment/45 mt-5">
              归处不会给你标准答案，因为每个人的路都不同。但我们相信，当你愿意停下来，向内看的那一刻，答案就已经在那里了。
            </p>
            <p className="font-serif text-[0.82rem] font-light text-gold/60 mt-9 text-right">
              心安即是归处
              <br />
              <span className="text-[0.72rem] text-parchment/30">归处团队</span>
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Brand System Section
   ───────────────────────────────────────────── */

function BrandSystem() {
  const colors = [
    { name: "墨夜 Ink Night", hex: "#080B10" },
    { name: "深墨 Deep Ink", hex: "#0D1117" },
    { name: "晨曦金 Dawn Gold", hex: "#C4A265" },
    { name: "宣纸白 Parchment", hex: "#F5F2EB" },
    { name: "暖白 Warm White", hex: "#F3F0E8" },
  ];

  const keywords = ["侘寂", "Wabi-sabi", "向内", "Inward", "温暖", "Warmth", "呼吸", "Breath", "静谧", "Stillness", "智慧", "Wisdom", "归属", "Belonging", "东方", "Eastern"];

  return (
    <section id="brand" className="bg-ink text-parchment py-32 md:py-44">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <FadeIn className="text-center mb-24">
          <Label>品牌系统 · Brand System</Label>
          <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.18em]">
            视觉识别
          </h2>
          <p className="mt-3 font-display text-[0.85rem] font-light tracking-[0.12em] italic text-parchment/30">
            Visual Identity
          </p>
        </FadeIn>

        {/* Color Palette */}
        <FadeIn className="mb-24">
          <h3 className="font-sans text-[0.62rem] tracking-[0.25em] uppercase text-gold-muted mb-10">Color Palette · 色彩</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {colors.map(c => (
              <div key={c.hex}>
                <div className="h-24 md:h-32 border border-parchment/[0.08] mb-4 transition-transform duration-700 hover:scale-[1.02]" style={{ background: c.hex }} />
                <p className="font-sans text-[0.58rem] text-parchment/30 tracking-[0.1em] leading-relaxed">{c.name}<br />{c.hex}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Typography */}
        <FadeIn className="mb-24">
          <h3 className="font-sans text-[0.62rem] tracking-[0.25em] uppercase text-gold-muted mb-10">Typography · 字体</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="font-serif text-[2rem] md:text-[2.4rem] font-extralight tracking-[0.18em] mb-4">归处 心安</p>
              <p className="font-sans text-[0.58rem] text-parchment/30 tracking-[0.1em]">Noto Serif SC · ExtraLight 200<br />中文标题 · 超宽字距 · 碑帖感</p>
            </div>
            <div>
              <p className="font-display text-[2rem] md:text-[2.4rem] font-light italic tracking-[0.15em] mb-4">Here & Now</p>
              <p className="font-sans text-[0.58rem] text-parchment/30 tracking-[0.1em]">Cormorant Garamond · Light Italic<br />英文展示 · 古典优雅 · 呼吸感</p>
            </div>
          </div>
        </FadeIn>

        {/* Keywords */}
        <FadeIn>
          <h3 className="font-sans text-[0.62rem] tracking-[0.25em] uppercase text-gold-muted mb-10">Brand Keywords · 关键词</h3>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {keywords.map(k => (
              <span key={k} className="px-5 md:px-6 py-2.5 md:py-3 border border-parchment/[0.08] font-sans text-[0.7rem] md:text-[0.76rem] font-light tracking-[0.12em] text-parchment/35 transition-all duration-500 hover:border-gold/35 hover:text-gold/55">
                {k}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Final Quote
   ───────────────────────────────────────────── */

function FinalQuote() {
  return (
    <section className="bg-parchment py-40 md:py-52">
      <FadeIn className="text-center px-6">
        <span className="font-display text-[4rem] text-gold-muted/20 leading-none block mb-8">"</span>
        <p className="font-serif text-[clamp(1.2rem,2.2vw,1.8rem)] font-extralight tracking-[0.14em] leading-[2.5] text-ink/70 max-w-[720px] mx-auto mb-8">
          当你读完这份手册，
          <br />请闭上眼睛，深呼吸三次。
          <br />感受此刻的自己——
          <br />这就是归处。
        </p>
        <p className="font-display text-[0.8rem] font-light italic tracking-[0.06em] text-ink/30 max-w-[600px] mx-auto">
          When you finish reading, close your eyes and take three deep breaths.
          <br />Feel yourself in this moment — this is home.
        </p>
      </FadeIn>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Ink Flow Parallax
   ───────────────────────────────────────────── */

function InkFlow() {
  return <Parallax src={IMG.inkFlow} alt="水墨流动" height="50vh" />;
}

/* ─────────────────────────────────────────────
   Footer
   ───────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-ink-deep text-parchment py-20 md:py-24 text-center">
      <FadeIn>
        <p className="font-serif text-[1.05rem] md:text-[1.15rem] font-light tracking-[0.35em] mb-4">归处 HERE</p>
        <p className="font-display text-[0.7rem] md:text-[0.72rem] font-light tracking-[0.18em] text-parchment/30 mb-10">
          Where the heart rests, there is home.
        </p>
        <GoldLine className="mx-auto mb-10" />
        <p className="font-sans text-[0.55rem] md:text-[0.58rem] font-light tracking-[0.12em] text-parchment/15 leading-relaxed">
          归处 HERE · 品牌手册
          <br />
          在黑暗中找到光，在喧嚣中找到静
        </p>
        <p className="font-sans text-[0.55rem] md:text-[0.58rem] font-light tracking-[0.12em] text-parchment/15 mt-4">
          © 2024-2026 归处 HERE. All rights reserved.
        </p>
      </FadeIn>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */

export default function Home() {
  useEffect(() => {
    document.title = "归处 HERE — 品牌手册";
  }, []);

  return (
    <div className="min-h-screen bg-parchment overflow-x-hidden grain">
      <Nav />
      <Hero />
      <BrandEssence />
      <InnerLight />
      <Philosophy />
      <Values />
      <Audience />
      <WaterReflection />
      <Product />
      <Mockup />
      <Dawn />
      <Journey />
      <Quote />
      <Wisdom />
      <Coach />
      <Stats />
      <Letter />
      <BrandSystem />
      <FinalQuote />
      <InkFlow />
      <Footer />
    </div>
  );
}
