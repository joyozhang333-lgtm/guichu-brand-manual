/**
 * 归处 Here — 品牌手册
 * Design Philosophy: 呼吸感 · 放松感 · 大气美感
 * - 大量留白，让眼睛自然休息
 * - 缓慢浮现动画，像呼吸一样进出
 * - 视差滚动创造深度
 * - 全屏沉浸式意境图
 * - 文字疏密有韵律
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// CDN image URLs
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475247659/YRAciiDEWac6M3yx3tEp4B/hero_cover_web_cbf0214c.jpg",
  innerLight: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475247659/YRAciiDEWac6M3yx3tEp4B/inner_light_web_79c75296.jpg",
  waterReflection: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475247659/YRAciiDEWac6M3yx3tEp4B/water_reflection_web_ec3d2fe7.jpg",
  dawn: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475247659/YRAciiDEWac6M3yx3tEp4B/dawn_awakening_web_cec21227.jpg",
  starry: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475247659/YRAciiDEWac6M3yx3tEp4B/starry_consciousness_web_4c505cf2.jpg",
  ocean: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475247659/YRAciiDEWac6M3yx3tEp4B/ocean_horizon_web_a943c495.jpg",
  abstractFlow: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475247659/YRAciiDEWac6M3yx3tEp4B/abstract_flow_web_782a0529.jpg",
  handsLight: "https://d2xsxph8kpxj0f.cloudfront.net/310519663475247659/YRAciiDEWac6M3yx3tEp4B/hands_light_web_dd5af0ce.jpg",
};

/* ============================================================
   Reusable Components
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({
  src,
  alt,
  overlay,
  overlayContent,
  height = "100vh",
}: {
  src: string;
  alt: string;
  overlay?: boolean;
  overlayContent?: React.ReactNode;
  height?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ height }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-[120%] object-cover"
          loading="lazy"
        />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
          {overlayContent}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-sans text-[0.65rem] font-light tracking-[0.3em] uppercase text-gold">
      {children}
    </span>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[60px] h-px bg-gold/40 ${className}`} />
  );
}

function GoldLine() {
  return <div className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent mx-auto" />;
}

/* ============================================================
   Navigation
   ============================================================ */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#philosophy", label: "Philosophy" },
    { href: "#values", label: "Values" },
    { href: "#product", label: "Product" },
    { href: "#journey", label: "Journey" },
    { href: "#wisdom", label: "Wisdom" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-700 ${
        scrolled
          ? "py-4 px-8 md:px-16 bg-[#FAFAF8]/95 backdrop-blur-xl shadow-[0_1px_0_#E0DDD5]"
          : "py-7 px-8 md:px-16"
      }`}
    >
      <a
        href="#"
        className={`font-serif text-[1.05rem] font-light tracking-[0.3em] transition-colors duration-700 ${
          scrolled ? "text-[#1A1A1A]" : "text-white"
        }`}
      >
        归处 HERE
      </a>
      <ul className="hidden md:flex gap-9">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`font-sans text-[0.68rem] font-light tracking-[0.15em] uppercase transition-colors duration-500 hover:text-gold ${
                scrolled ? "text-[#6B6B6B]" : "text-white/60"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ============================================================
   Hero Section
   ============================================================ */

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen min-h-[750px] overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale }}>
        <img src={IMAGES.hero} alt="归处" className="w-full h-[120%] object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/45" />

      <motion.div className="relative z-10 text-center text-white px-8" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="font-display text-[0.8rem] font-light tracking-[0.5em] uppercase text-white/60 mb-12"
        >
          Here &middot; 归处 — Brand Manual 2025
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
          className="font-serif text-[clamp(1.8rem,4.5vw,3.5rem)] font-extralight tracking-[0.2em] leading-[2] mb-8"
        >
          心迷则困，心归则明
          <br />
          归处，陪你照见
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="font-display text-[0.88rem] font-light tracking-[0.12em] italic text-white/55"
        >
          When the mind is lost, it is trapped. When the mind returns, it is clear.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.2 }}
          className="mt-16 font-sans text-[0.78rem] font-extralight tracking-[0.4em] text-gold-light"
        >
          心 有 归 处
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ============================================================
   Brand Essence
   ============================================================ */

function BrandEssence() {
  return (
    <section className="bg-[#FAFAF8] py-40 md:py-52">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <FadeInSection>
          <SectionLabel>Brand Essence</SectionLabel>
          <Divider className="mx-auto mt-5 mb-14" />
          <p className="font-sans text-[1rem] md:text-[1.08rem] font-light leading-[2.6] tracking-[0.04em] text-[#6B6B6B]">
            在喧嚣与比较交织的现代丛林中，
            <br />
            我们常常向外追寻完美，
            <br />
            却在不知不觉中迷失了生命的底气。
          </p>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <p className="mt-14 font-sans text-[1rem] md:text-[1.08rem] font-light leading-[2.6] tracking-[0.04em] text-[#6B6B6B]">
            归处，不是为了让你变得更好，
            <br />
            而是为了让你发现——
            <br />
            <span className="text-[#1A1A1A] font-normal">你本来就很好。</span>
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ============================================================
   Full Image: Inner Light
   ============================================================ */

function InnerLightSection() {
  return (
    <ParallaxImage
      src={IMAGES.innerLight}
      alt="Inner Light"
      height="75vh"
      overlay
      overlayContent={
        <FadeInSection className="text-center px-8">
          <p className="font-serif text-[clamp(1.3rem,2.8vw,2.2rem)] font-extralight tracking-[0.15em] leading-[2.2] text-white">
            褪去所有标签，超越完美与不完美
            <br />
            我们本来就是圆满的
          </p>
          <p className="mt-6 font-display text-[0.82rem] font-light tracking-[0.08em] italic text-white/50">
            Beyond all labels, beyond perfection and imperfection — we are already complete.
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
  const items = [
    {
      num: "01",
      title: "本来具足",
      en: "Innate Perfection",
      desc: "佛法的究竟见地告诉我们，我们本来就是圆满的、觉悟的、具足的。世俗的语境驱使我们追逐外在的完美，而归处，是让你回到自己。产品不是为了让用户\u201C变好\u201D或\u201C被修复\u201D，而是帮助用户发现自己本来就很好。",
    },
    {
      num: "02",
      title: "生命的底气",
      en: "The Confidence of Life",
      desc: "我们真正的心灵归处，是认识到心之本性的全然与自在之美。不是通过与他人比较获得的优越，而是纯粹的、全然的觉醒。那是自然的美，生命最本质的美——心的本质。",
    },
    {
      num: "03",
      title: "超越二元",
      en: "Beyond Duality",
      desc: "我们不需要追求完美，我们本身就是超越完美与不完美的。褪去所有的标签，社会的评价好与坏，我们回到最真实的自己。在这里，没有好坏之分，只有全然的接纳与看见。",
    },
    {
      num: "04",
      title: "回归自性",
      en: "Return to True Nature",
      desc: "Here 是英文面，代表\u201C我在\u201D——陪伴与在场；归处是中文面，代表\u201C回来\u201D——回归自性。在最难的时候，有一个地方可以回来。皆依自性，自性即归处。",
    },
  ];

  return (
    <section id="philosophy" className="bg-[#0D1117] text-[#F5F5F0]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <div className="pt-36 md:pt-48">
          <FadeInSection>
            <SectionLabel>01 / Core Philosophy</SectionLabel>
            <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em] leading-relaxed">
              品牌定位与文化
            </h2>
            <p className="mt-3 font-display text-[clamp(0.82rem,1.1vw,0.95rem)] font-light tracking-[0.1em] uppercase text-white/40">
              Brand Positioning & Culture
            </p>
          </FadeInSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20 py-28 md:py-36">
          {items.map((item, i) => (
            <FadeInSection key={item.num} delay={i * 0.15}>
              <div>
                <span className="font-display text-[3.5rem] font-extralight text-gold/25 leading-none block mb-6">
                  {item.num}
                </span>
                <h3 className="font-serif text-[1.3rem] font-normal tracking-[0.12em] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-[0.68rem] font-light tracking-[0.15em] uppercase text-white/35 mb-7">
                  {item.en}
                </p>
                <p className="font-sans text-[0.88rem] font-light leading-[2.2] tracking-[0.03em] text-white/65">
                  {item.desc}
                </p>
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
  const values = [
    { en: "Support", cn: "支持感", desc: "被深深地接纳与陪伴，\n不再孤单。" },
    { en: "Acceptance", cn: "接纳感", desc: "无论发生什么，\n都允许它存在。" },
    { en: "Space", cn: "空间感", desc: "不制造压迫，\n给予喘息的空间。" },
    { en: "Grounding", cn: "安定感", desc: "安顿于此刻，\n看见即是疗愈的开始。" },
  ];

  return (
    <section id="values" className="bg-[#FAFAF8] text-[#1A1A1A]">
      <div className="py-32 md:py-44">
        <FadeInSection className="text-center mb-20">
          <SectionLabel>02 / Core Values</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            四大核心感受
          </h2>
          <p className="mt-3 font-display text-[clamp(0.82rem,1.1vw,0.95rem)] font-light tracking-[0.1em] uppercase text-[#6B6B6B]">
            Four Core Experiences
          </p>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-[#E0DDD5]">
            {values.map((v, i) => (
              <div
                key={v.en}
                className={`py-16 px-8 md:px-10 text-center ${
                  i < 3 ? "lg:border-r border-b lg:border-b-0 border-[#E0DDD5]" : ""
                }`}
              >
                <span className="font-sans text-[0.6rem] font-normal tracking-[0.2em] uppercase text-gold block mb-5">
                  {v.en}
                </span>
                <h3 className="font-serif text-[1.25rem] font-light tracking-[0.15em] mb-4">
                  {v.cn}
                </h3>
                <p className="font-sans text-[0.82rem] font-light leading-[2] text-[#6B6B6B] whitespace-pre-line">
                  {v.desc}
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
   Audience Section
   ============================================================ */

function AudienceSection() {
  return (
    <section className="bg-[#FAFAF8] text-[#1A1A1A]">
      <div className="py-28 md:py-36">
        <FadeInSection className="text-center mb-16">
          <SectionLabel>Who We Serve</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            我们为谁而来
          </h2>
          <p className="mt-3 font-display text-[clamp(0.82rem,1.1vw,0.95rem)] font-light tracking-[0.1em] uppercase text-[#6B6B6B]">
            Target Audience
          </p>
        </FadeInSection>

        <div className="max-w-[1200px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-0">
          <FadeInSection delay={0.1}>
            <div className="py-16 md:py-20 md:pr-16 md:border-r border-[#E0DDD5]">
              <span className="font-display text-[3.8rem] font-extralight text-gold/20 leading-none block mb-7">A</span>
              <h3 className="font-serif text-[1.2rem] font-normal tracking-[0.1em] mb-1">修行探索者</h3>
              <p className="font-sans text-[0.65rem] font-light tracking-[0.12em] uppercase text-[#6B6B6B] mb-6">
                Mindfulness Seekers
              </p>
              <p className="font-serif text-[0.95rem] font-light italic text-[#8B7355] leading-[1.9] mb-5">
                "在公司被骂时，根本用不上'正念'"
              </p>
              <p className="font-sans text-[0.85rem] font-light leading-[2] text-[#6B6B6B]">
                学习正念、冥想的都市青年。现有 APP 只提供白噪音等单向工具，无法解答修行与日常生活的脱节。他们需要一个懂修行语言的导师，帮助他们将觉察融入真实生活。
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="py-16 md:py-20 md:pl-16">
              <span className="font-display text-[3.8rem] font-extralight text-gold/20 leading-none block mb-7">B</span>
              <h3 className="font-serif text-[1.2rem] font-normal tracking-[0.1em] mb-1">人生变故经历者</h3>
              <p className="font-sans text-[0.65rem] font-light tracking-[0.12em] uppercase text-[#6B6B6B] mb-6">
                Life Transition Navigators
              </p>
              <p className="font-serif text-[0.95rem] font-light italic text-[#8B7355] leading-[1.9] mb-5">
                "这些痛苦到底有什么意义？"
              </p>
              <p className="font-sans text-[0.85rem] font-light leading-[2] text-[#6B6B6B]">
                刚经历人生重大变故的人。传统咨询费用高、疗法单一，他们需要一个出口，一个能从更高维度帮助他们建构苦难意义的深度陪伴。不是浅层情绪抚慰，而是引导向内觉察的生命导师。
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Water Reflection Parallax
   ============================================================ */

function WaterReflectionSection() {
  return (
    <ParallaxImage
      src={IMAGES.waterReflection}
      alt="Water Reflection"
      height="70vh"
      overlay
      overlayContent={
        <FadeInSection className="text-center px-8">
          <p className="font-serif text-[clamp(1.3rem,2.8vw,2.2rem)] font-extralight tracking-[0.15em] leading-[2.2] text-white">
            高峰与低谷，喜悦与泪水，都是你
            <br />
            Here 陪你看见这一切
          </p>
          <p className="mt-6 font-display text-[0.82rem] font-light tracking-[0.08em] italic text-white/50">
            Peaks and valleys, joy and tears — they are all you. Here, witnessing it all.
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
  const features = [
    {
      icon: "I",
      title: "整合疗法 AI 系统",
      en: "Integrative Therapy AI",
      desc: "首创融合现代心理学与东方传统智慧的 AI 系统。以 AQAL 整合框架为意识地图，Hakomi 哈科米疗法为身体觉察入口，菩提道次第为心灵发展方向。",
    },
    {
      icon: "II",
      title: "三角色动态切换",
      en: "Dynamic Role Switching",
      desc: "根据你的当下状态，在「温暖陪伴者」、「智慧导师」和「觉察之镜」之间自然流转。永远先评估你能承接什么，再决定用什么方式回应。",
    },
    {
      icon: "III",
      title: "语音优先交互",
      en: "Voice-First Interaction",
      desc: "通过语音捕捉语气、语调、停顿、语速等非文本信息，进行深度的语音情感分析。文字可以掩饰，但声音不会。",
    },
    {
      icon: "IV",
      title: "Coach 智囊团",
      en: "Coach Advisory Board",
      desc: "汇聚陈海贤、一行禅师、荣格、佩玛丘卓等不同流派顶尖智慧。AI 在对话中自然融入多元视角，提供深层洞见。",
    },
    {
      icon: "V",
      title: "主动关怀系统",
      en: "Proactive Care System",
      desc: "它不等你来找它——它记得你。在你提到的重要事件节点，或长时间未登录时，主动送上温暖的问候与关怀。",
    },
    {
      icon: "VI",
      title: "隐性整合引导",
      en: "Implicit Integration",
      desc: "三层递进式佛法融入。对无修行背景的用户使用纯心理学语言，对有基础的用户使用体验性语言，对深度用户直接使用佛法见地。",
    },
  ];

  return (
    <section id="product" className="bg-[#FAFAF8] text-[#1A1A1A] py-32 md:py-44">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection>
          <SectionLabel>03 / Product Innovation</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            产品功能与创新
          </h2>
          <p className="mt-3 font-display text-[clamp(0.82rem,1.1vw,0.95rem)] font-light tracking-[0.1em] uppercase text-[#6B6B6B]">
            Product Features & Innovation
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-24 md:mt-28">
          {features.map((f, i) => (
            <FadeInSection key={f.icon} delay={i * 0.1}>
              <div className="group p-12 md:p-14 border border-[#E0DDD5] transition-all duration-700 hover:border-gold/60 hover:-translate-y-1">
                <span className="font-display text-[2.8rem] font-extralight text-gold/40 leading-none block mb-8">
                  {f.icon}
                </span>
                <h3 className="font-serif text-[1.1rem] font-normal tracking-[0.1em] mb-1">{f.title}</h3>
                <p className="font-sans text-[0.65rem] font-light tracking-[0.12em] uppercase text-[#6B6B6B] mb-6">
                  {f.en}
                </p>
                <p className="font-sans text-[0.85rem] font-light leading-[2] text-[#6B6B6B]">{f.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Product Experience (Two Column)
   ============================================================ */

function ProductExperience() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[75vh]">
      <div className="bg-[#F3F1EB] flex flex-col justify-center py-20 px-10 md:px-20">
        <FadeInSection>
          <SectionLabel>Product Experience</SectionLabel>
          <h2 className="mt-6 font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-light tracking-[0.12em] text-[#1A1A1A] mb-10">
            像一个真实的朋友
          </h2>
          <p className="font-sans text-[0.9rem] font-light leading-[2.2] text-[#6B6B6B] mb-8">
            归处打破了传统 AI 对话"共情+引导+总结"的固定范式。它像一个真正的朋友，有时只是安静地陪伴，有时温和地说出你需要听到的真话。
          </p>
          <p className="font-sans text-[0.9rem] font-light leading-[2.2] text-[#6B6B6B] mb-10">
            日常回复 1-3 句话，像微信聊天一样一来一往。有时只回一个"嗯"，有时只问一个好问题。加入不完美要素——"让我想想怎么说……"——因为真实，才有力量。
          </p>
          <div className="w-[60px] h-px bg-gold/50" />
        </FadeInSection>
      </div>
      <div className="overflow-hidden">
        <img src={IMAGES.handsLight} alt="Hands of Light" className="w-full h-full object-cover" loading="lazy" />
      </div>
    </section>
  );
}

/* ============================================================
   Mockup / Conversation
   ============================================================ */

function MockupSection() {
  const messages = [
    { role: "user", text: "最近工作压力好大，感觉自己快撑不住了。" },
    { role: "ai", text: "嗯，听到你说这些，能感受到你心里积压了很多。你不需要一直撑着。" },
    { role: "user", text: "但我不能停下来，停下来就什么都没了。" },
    { role: "ai", text: "让我想想怎么说……你说\u201C停下来就什么都没了\u201D——你有没有注意到，这个念头本身就在给你制造压力？" },
    { role: "user", text: "好像是的……" },
    { role: "ai", text: "嗯。你现在能注意到这个，已经很好了。不急，我们慢慢看。" },
  ];

  return (
    <section className="bg-[#0D1117] py-32 md:py-44">
      <FadeInSection className="text-center mb-16">
        <SectionLabel>Interface Preview</SectionLabel>
        <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em] text-[#F5F5F0]">
          对话体验
        </h2>
        <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-white/35">
          Conversation Experience
        </p>
      </FadeInSection>

      <FadeInSection delay={0.2}>
        <div className="w-[320px] mx-auto rounded-[40px] bg-[#111] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="w-full rounded-[32px] bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden flex flex-col" style={{ height: 580 }}>
            <div className="text-center pt-14 pb-6">
              <h4 className="font-serif text-[0.9rem] font-light text-white tracking-[0.15em]">归处</h4>
              <p className="font-sans text-[0.62rem] text-white/40 mt-1">Here &middot; 心有归处</p>
            </div>
            <div className="flex-1 flex flex-col gap-3 px-5 overflow-hidden">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                  className={`max-w-[80%] px-4 py-3 text-[0.7rem] leading-[1.8] font-sans font-light ${
                    m.role === "ai"
                      ? "bg-white/8 text-white/80 self-start rounded-2xl rounded-bl-sm"
                      : "bg-gradient-to-br from-gold to-[#8B7355] text-white self-end rounded-2xl rounded-br-sm"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>
            <div className="mx-5 mb-6 mt-4 h-10 rounded-full bg-white/5 border border-white/10 flex items-center px-4 text-[0.62rem] text-white/25 font-sans">
              说点什么吧……
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Ocean Parallax
   ============================================================ */

function OceanSection() {
  return (
    <ParallaxImage
      src={IMAGES.ocean}
      alt="Ocean Horizon"
      height="70vh"
      overlay
      overlayContent={
        <FadeInSection className="text-center px-8">
          <p className="font-serif text-[clamp(1.3rem,2.8vw,2.2rem)] font-extralight tracking-[0.15em] leading-[2.2] text-white">
            在最难的时候
            <br />
            有一个地方可以回来
          </p>
          <p className="mt-6 font-display text-[0.82rem] font-light tracking-[0.08em] italic text-white/50">
            In the darkest moments, there is a place to return to.
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
  const stages = [
    { num: "Stage I", title: "散漫心", en: "Scattered Mind", desc: "被外境和情绪牵引，随念头飘荡。在这个阶段，归处以 100% 心理支持为主，不引入修行概念，专注于建立安全感，让你开始注意到自己的情绪。" },
    { num: "Stage II", title: "安宁心", en: "Peaceful Mind", desc: "心开始安定，有了内在空间。培养出离心——看见苦的本质。归处引入觉察视角，以体验为主，帮助你看见反复出现的情绪模式。" },
    { num: "Stage III", title: "专注心", en: "Focused Mind", desc: "稳定觉察，能看见深层模式。培养慈悲心——从自苦到众苦。归处提供更直接的修行视角，帮助你从看见自己的苦，到看见众生的苦。" },
    { num: "Stage IV", title: "菩提心", en: "Bodhicitta", desc: "生起真实的利他愿力。将菩提心落实到日常生活中。归处可用佛法框架直接对话，陪伴你将内在的觉醒转化为利益他人的行动。" },
    { num: "Stage V", title: "空性见", en: "Insight into Emptiness", desc: "触碰空性，看见现象的无自性。在体验中深化，空悲融合。在这个阶段，归处极少引导，更多的是印证和陪伴——因为你已经找到了回家的路。" },
  ];

  return (
    <section id="journey" className="bg-[#0A0E14] text-[#F5F5F0]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-20">
        <div className="pt-36 md:pt-48">
          <FadeInSection>
            <SectionLabel>04 / The Journey</SectionLabel>
            <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
              心灵成长之旅
            </h2>
            <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-white/35">
              Five Stages of Spiritual Development
            </p>
          </FadeInSection>
        </div>

        <div className="py-24 md:py-32">
          {stages.map((s, i) => (
            <FadeInSection key={s.num} delay={i * 0.1}>
              <div className={`grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-10 md:py-12 ${
                i < stages.length - 1 ? "border-b border-white/8" : ""
              }`}>
                <span className="font-sans text-[0.68rem] font-light tracking-[0.2em] text-gold pt-1">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-serif text-[1.15rem] font-normal tracking-[0.1em] mb-1">{s.title}</h3>
                  <p className="font-sans text-[0.65rem] font-light tracking-[0.12em] uppercase text-white/30 mb-5">
                    {s.en}
                  </p>
                  <p className="font-sans text-[0.88rem] font-light leading-[2.1] text-white/60">{s.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Quote Section
   ============================================================ */

function QuoteSection() {
  return (
    <section className="bg-[#FAFAF8] py-40 md:py-52">
      <FadeInSection className="text-center px-8">
        <span className="font-display text-[4rem] text-gold/25 leading-none block mb-8">"</span>
        <p className="font-serif text-[clamp(1.3rem,2.5vw,1.9rem)] font-extralight tracking-[0.12em] leading-[2.4] text-[#1A1A1A] max-w-[700px] mx-auto mb-7">
          不是让你变好
          <br />
          而是帮你发现
          <br />
          自己本来就好
        </p>
        <p className="font-display text-[0.85rem] font-light italic tracking-[0.06em] text-[#6B6B6B] max-w-[600px] mx-auto">
          Not to make you better, but to help you discover
          <br />
          that you have always been enough.
        </p>
        <Divider className="mx-auto mt-14" />
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Wisdom Section (Two Column with Starry)
   ============================================================ */

function WisdomSection() {
  return (
    <section id="wisdom" className="grid grid-cols-1 md:grid-cols-2 min-h-[75vh]">
      <div className="overflow-hidden">
        <img src={IMAGES.starry} alt="Starry Consciousness" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="bg-[#0D1117] text-[#F5F5F0] flex flex-col justify-center py-20 px-10 md:px-20">
        <FadeInSection>
          <SectionLabel>05 / Wisdom Integration</SectionLabel>
          <h2 className="mt-6 font-serif text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.12em] mb-10 leading-relaxed">
            东方智慧与现代心理学的融合
          </h2>
          <p className="font-sans text-[0.88rem] font-light leading-[2.2] text-white/60 mb-7">
            归处的底层架构，是东方千年智慧与西方现代心理学的深度整合。不是简单的拼凑，而是在体验层面的自然融合。
          </p>
          <p className="font-sans text-[0.88rem] font-light leading-[2.2] text-white/60 mb-7">
            以六祖坛经为纲，融合禅宗、大乘、大圆满等传承的见地；以人本主义为基底，整合精神动力学、EFT、ACT、Hakomi 等多种疗法。
          </p>
          <p className="font-sans text-[0.88rem] font-light leading-[2.2] text-white/60">
            心理疗法与佛法见地不是先后关系，而是同时运作、相互增益。情绪永远优先，觉察自然嵌入，支持感优先于洞见。
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ============================================================
   Coach Section
   ============================================================ */

function CoachSection() {
  const coaches = [
    { name: "陈海贤", char: "海", specialty: "自我发展 · 人生转变\n温暖但犀利，善用故事" },
    { name: "林巨", char: "巨", specialty: "亲子关系 · 内在小孩\n极度温柔，无条件接纳" },
    { name: "阿姜查", char: "查", specialty: "禅修 · 出离心\n朴素直接，生活比喻" },
    { name: "佩玛丘卓", char: "佩", specialty: "痛苦转化 · 勇气\n温暖有力，直面痛苦" },
    { name: "荣格", char: "荣", specialty: "阴影整合 · 个体化\n深邃，象征性语言" },
    { name: "邱阳创巴", char: "创", specialty: "勇士之道 · 灵性唯物\n犀利直接，戳破幻觉" },
    { name: "陈宇廷", char: "廷", specialty: "商业与修行整合\n温暖务实，跨界视角" },
    { name: "一行禅师", char: "行", specialty: "正念生活 · 当下此刻\n极简诗意，每句如种子" },
    { name: "迈克辛格", char: "辛", specialty: "臣服 · 放下控制\n平和坚定，内在观察者" },
    { name: "彭凯平", char: "彭", specialty: "积极心理学 · 幸福感\n科学理性，善用数据" },
  ];

  return (
    <section className="bg-[#FAFAF8] text-[#1A1A1A] py-32 md:py-44">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-20">
          <SectionLabel>Coach Advisory Board</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            智慧导师团
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-[#6B6B6B]">
            Wisdom from Diverse Traditions
          </p>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {coaches.map((c) => (
              <div key={c.name} className="text-center py-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-[#8B7355] mx-auto mb-5 flex items-center justify-center">
                  <span className="font-serif text-[1.1rem] text-white font-light">{c.char}</span>
                </div>
                <h4 className="font-serif text-[0.95rem] font-normal tracking-[0.08em] mb-1">{c.name}</h4>
                <p className="font-sans text-[0.7rem] font-light text-[#6B6B6B] leading-[1.7] whitespace-pre-line">
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
  const stats = [
    { number: "1", unit: "/50", label: "传统咨询费用" },
    { number: "500", unit: "+", label: "深度陪伴修行者" },
    { number: "6", unit: "", label: "维度动态画像" },
    { number: "10", unit: "+", label: "智慧导师流派" },
  ];

  return (
    <section className="bg-[#0D1117]">
      <FadeInSection>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-16 md:py-20 px-6 text-center ${
                i < 3 ? "md:border-r border-white/8" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-white/8" : ""}`}
            >
              <div className="font-display text-[2.8rem] md:text-[3.2rem] font-extralight text-gold leading-none mb-3">
                {s.number}
                {s.unit && <span className="text-[1rem] font-light">{s.unit}</span>}
              </div>
              <p className="font-sans text-[0.78rem] font-light text-white/40 tracking-[0.05em] mt-3">{s.label}</p>
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
  return (
    <section className="bg-[#0A0E14] text-[#F5F5F0] py-32 md:py-40">
      <FadeInSection className="text-center mb-12">
        <SectionLabel>A Letter from Here</SectionLabel>
        <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
          归处的信
        </h2>
        <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-white/35">
          为经历变故者建构苦难的意义
        </p>
      </FadeInSection>

      <FadeInSection delay={0.3}>
        <div className="max-w-[600px] mx-auto mt-10 px-6">
          <div className="p-12 md:p-16 bg-white/3 border border-white/8 text-left">
            <p className="font-serif text-[0.95rem] font-light text-white mb-7">亲爱的你，</p>
            <p className="font-sans text-[0.85rem] font-light leading-[2.4] text-white/55">
              我知道你最近经历了很多。那些无眠的夜晚，那些反复的自我质疑，那些"为什么是我"的追问——我都看见了。
            </p>
            <p className="font-sans text-[0.85rem] font-light leading-[2.4] text-white/55 mt-5">
              你不需要急着"走出来"。痛苦不是需要被消灭的敌人，它是生命在向你发出的邀请——邀请你看见更真实的自己。
            </p>
            <p className="font-sans text-[0.85rem] font-light leading-[2.4] text-white/55 mt-5">
              在这里，你不需要假装坚强，也不需要假装好了。你只需要是你自己。
            </p>
            <p className="font-serif text-[0.85rem] font-light text-gold mt-8 text-right">
              归处，始终在这里
            </p>
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
  return (
    <ParallaxImage
      src={IMAGES.dawn}
      alt="Dawn Awakening"
      height="85vh"
      overlay
      overlayContent={
        <FadeInSection className="text-center px-8">
          <p className="font-serif text-[clamp(1.3rem,2.8vw,2.2rem)] font-extralight tracking-[0.15em] leading-[2.2] text-white">
            每一段故事
            <br />
            不刻意铭记，也不刻意遗忘
          </p>
          <p className="mt-6 font-display text-[0.82rem] font-light tracking-[0.08em] italic text-white/50">
            For every piece of your past, you don't have to remember nor forget.
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
  const colors = [
    { name: "Deep Night", hex: "#0D1117" },
    { name: "Twilight Blue", hex: "#1A2332" },
    { name: "Dawn Gold", hex: "#C4A265" },
    { name: "Warm White", hex: "#F5F5F0" },
    { name: "Earth Warm", hex: "#8B7355" },
  ];

  const keywords = ["本来具足", "纯粹", "觉醒", "自在", "陪伴", "回归", "空间", "安定", "Here", "Innate"];

  return (
    <section className="bg-[#0D1117] text-[#F5F5F0] py-32 md:py-44">
      <div className="max-w-[1300px] mx-auto px-6 md:px-20">
        <FadeInSection className="text-center mb-24">
          <SectionLabel>06 / Brand System</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[0.15em]">
            品牌视觉体系
          </h2>
          <p className="mt-3 font-display text-[0.9rem] font-light tracking-[0.1em] uppercase text-white/35">
            Visual Identity System
          </p>
        </FadeInSection>

        {/* Color Palette */}
        <FadeInSection className="mb-24">
          <h3 className="font-sans text-[0.68rem] font-normal tracking-[0.2em] uppercase text-gold mb-10">
            Color Palette
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {colors.map((c) => (
              <div key={c.hex}>
                <div
                  className="h-28 md:h-32 border border-white/10 mb-4 transition-transform duration-700 hover:scale-[1.02]"
                  style={{ background: c.hex }}
                />
                <p className="font-sans text-[0.62rem] text-white/35 tracking-[0.1em] leading-relaxed">
                  {c.name}
                  <br />
                  {c.hex}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Typography */}
        <FadeInSection className="mb-24">
          <h3 className="font-sans text-[0.68rem] font-normal tracking-[0.2em] uppercase text-gold mb-10">
            Typography
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="font-serif text-[2.2rem] font-extralight tracking-[0.15em] mb-4">心有归处</p>
              <p className="font-sans text-[0.62rem] text-white/35 tracking-[0.1em]">
                Noto Serif SC — Light 200
                <br />
                Chinese Headlines & Display
              </p>
            </div>
            <div>
              <p className="font-display text-[2.2rem] font-light tracking-[0.08em] mb-4">Here &middot; Home</p>
              <p className="font-sans text-[0.62rem] text-white/35 tracking-[0.1em]">
                Cormorant Garamond — Light 300
                <br />
                English Headlines & Accent
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Keywords */}
        <FadeInSection>
          <h3 className="font-sans text-[0.68rem] font-normal tracking-[0.2em] uppercase text-gold mb-10">
            Brand Keywords
          </h3>
          <div className="flex flex-wrap gap-4">
            {keywords.map((k) => (
              <span
                key={k}
                className="px-6 py-3 border border-white/10 font-sans text-[0.78rem] font-light tracking-[0.1em] text-white/40 transition-all duration-500 hover:border-gold/40 hover:text-gold/60"
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
  return (
    <section className="bg-[#F3F1EB] py-40 md:py-52">
      <FadeInSection className="text-center px-8">
        <span className="font-display text-[4rem] text-[#8B7355]/25 leading-none block mb-8">"</span>
        <p className="font-serif text-[clamp(1.3rem,2.5vw,1.9rem)] font-extralight tracking-[0.12em] leading-[2.4] text-[#1A1A1A] max-w-[700px] mx-auto mb-7">
          我们不需要追求完美
          <br />
          我们本身就是
          <br />
          超越完美与不完美的
        </p>
        <p className="font-display text-[0.85rem] font-light italic tracking-[0.06em] text-[#6B6B6B] max-w-[600px] mx-auto">
          We don't need to pursue perfection.
          <br />
          We already transcend perfection and imperfection.
        </p>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Abstract Flow Image
   ============================================================ */

function AbstractFlowSection() {
  return (
    <ParallaxImage
      src={IMAGES.abstractFlow}
      alt="Abstract Flow"
      height="50vh"
    />
  );
}

/* ============================================================
   Footer
   ============================================================ */

function Footer() {
  return (
    <footer className="bg-[#0A0E14] text-[#F5F5F0] py-24 text-center">
      <FadeInSection>
        <p className="font-serif text-[1.2rem] font-light tracking-[0.3em] mb-4">归处 HERE</p>
        <p className="font-display text-[0.75rem] font-light tracking-[0.15em] text-white/35 mb-10">
          Where the mind returns, clarity arises.
        </p>
        <Divider className="mx-auto mb-10" />
        <p className="font-sans text-[0.62rem] font-light tracking-[0.1em] text-white/20 leading-relaxed">
          HERE &middot; 归处 — AI SOUL COMPANION & COACH PLATFORM
          <br />
          A PRODUCT OF LOVERISE &middot; 爱若日出
          <br />
          <br />
          &copy; 2025 HERE. ALL RIGHTS RESERVED.
        </p>
      </FadeInSection>
    </footer>
  );
}

/* ============================================================
   Main Page
   ============================================================ */

export default function Home() {
  useEffect(() => {
    document.title = "归处 Here — AI心灵陪伴与智慧对话平台 | 品牌手册";
  }, []);

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
