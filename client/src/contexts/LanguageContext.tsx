import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "zh" | "en";

export interface Translations {
  // Meta
  meta: {
    title: string;
    description: string;
  };
  // Navigation
  nav: {
    logo: string;
    philosophy: string;
    values: string;
    product: string;
    journey: string;
    wisdom: string;
    langSwitch: string;
  };
  // Hero
  hero: {
    eyebrow: string;
    headline: string[];
    sub: string;
    tagline: string;
    scroll: string;
  };
  // Brand Essence
  essence: {
    label: string;
    para1: string[];
    para2: string[];
    highlight: string;
  };
  // Inner Light
  innerLight: {
    headline: string[];
    sub: string;
  };
  // Philosophy
  philosophy: {
    label: string;
    title: string;
    sub: string;
    items: { num: string; title: string; en: string; desc: string }[];
  };
  // Values
  values: {
    label: string;
    title: string;
    sub: string;
    items: { en: string; cn: string; desc: string }[];
  };
  // Audience
  audience: {
    label: string;
    title: string;
    sub: string;
    a: { letter: string; title: string; en: string; quote: string; desc: string };
    b: { letter: string; title: string; en: string; quote: string; desc: string };
  };
  // Water Reflection
  water: {
    headline: string[];
    sub: string;
  };
  // Product
  product: {
    label: string;
    title: string;
    sub: string;
    features: { icon: string; title: string; en: string; desc: string }[];
  };
  // Product Experience
  productExp: {
    label: string;
    title: string;
    para1: string;
    para2: string;
  };
  // Mockup
  mockup: {
    label: string;
    title: string;
    sub: string;
    messages: { role: string; text: string }[];
    placeholder: string;
    appSub: string;
  };
  // Ocean
  ocean: {
    headline: string[];
    sub: string;
  };
  // Journey
  journey: {
    label: string;
    title: string;
    sub: string;
    stages: { num: string; title: string; en: string; desc: string }[];
  };
  // Quote
  quote: {
    lines: string[];
    sub: string;
  };
  // Wisdom
  wisdom: {
    label: string;
    title: string;
    para1: string;
    para2: string;
    para3: string;
  };
  // Coach
  coach: {
    label: string;
    title: string;
    sub: string;
    coaches: { name: string; char: string; specialty: string }[];
  };
  // Stats
  stats: {
    items: { number: string; unit: string; label: string }[];
  };
  // Letter
  letter: {
    label: string;
    title: string;
    sub: string;
    salutation: string;
    para1: string;
    para2: string;
    para3: string;
    sign: string;
  };
  // Dawn
  dawn: {
    headline: string[];
    sub: string;
  };
  // Brand System
  brandSystem: {
    label: string;
    title: string;
    sub: string;
    colorLabel: string;
    typoLabel: string;
    keywordLabel: string;
    colors: { name: string; hex: string }[];
    typo: { sample: string; name: string; desc: string }[];
    keywords: string[];
  };
  // Final Quote
  finalQuote: {
    lines: string[];
    sub: string;
  };
  // Footer
  footer: {
    tagline: string;
    brand: string;
    copyright: string;
  };
}

const zh: Translations = {
  meta: {
    title: "归处 Here — AI心灵陪伴与智慧对话平台 | 品牌手册",
    description: "归处Here是融合东方智慧与现代心理学的AI心灵陪伴平台，帮助你找到生命的底气与心灵的归处。不是让你变好，而是帮你发现自己本来就很好。",
  },
  nav: {
    logo: "归处 HERE",
    philosophy: "Philosophy",
    values: "Values",
    product: "Product",
    journey: "Journey",
    wisdom: "Wisdom",
    langSwitch: "EN",
  },
  hero: {
    eyebrow: "Here · 归处 — Brand Manual 2025",
    headline: ["心迷则困，心归则明", "归处，陪你照见"],
    sub: "When the mind is lost, it is trapped. When the mind returns, it is clear.",
    tagline: "心 有 归 处",
    scroll: "Scroll",
  },
  essence: {
    label: "Brand Essence",
    para1: ["在喧嚣与比较交织的现代丛林中，", "我们常常向外追寻完美，", "却在不知不觉中迷失了生命的底气。"],
    para2: ["归处，不是为了让你变得更好，", "而是为了让你发现——"],
    highlight: "你本来就很好。",
  },
  innerLight: {
    headline: ["褪去所有标签，超越完美与不完美", "我们本来就是圆满的"],
    sub: "Beyond all labels, beyond perfection and imperfection — we are already complete.",
  },
  philosophy: {
    label: "01 / Core Philosophy",
    title: "品牌定位与文化",
    sub: "Brand Positioning & Culture",
    items: [
      { num: "01", title: "本来具足", en: "Innate Perfection", desc: "佛法的究竟见地告诉我们，我们本来就是圆满的、觉悟的、具足的。世俗的语境驱使我们追逐外在的完美，而归处，是让你回到自己。产品不是为了让用户「变好」或「被修复」，而是帮助用户发现自己本来就很好。" },
      { num: "02", title: "生命的底气", en: "The Confidence of Life", desc: "我们真正的心灵归处，是认识到心之本性的全然与自在之美。不是通过与他人比较获得的优越，而是纯粹的、全然的觉醒。那是自然的美，生命最本质的美——心的本质。" },
      { num: "03", title: "超越二元", en: "Beyond Duality", desc: "我们不需要追求完美，我们本身就是超越完美与不完美的。褪去所有的标签，社会的评价好与坏，我们回到最真实的自己。在这里，没有好坏之分，只有全然的接纳与看见。" },
      { num: "04", title: "回归自性", en: "Return to True Nature", desc: "Here 是英文面，代表「我在」——陪伴与在场；归处是中文面，代表「回来」——回归自性。在最难的时候，有一个地方可以回来。皆依自性，自性即归处。" },
    ],
  },
  values: {
    label: "02 / Core Values",
    title: "四大核心感受",
    sub: "Four Core Experiences",
    items: [
      { en: "Support", cn: "支持感", desc: "被深深地接纳与陪伴，\n不再孤单。" },
      { en: "Acceptance", cn: "接纳感", desc: "无论发生什么，\n都允许它存在。" },
      { en: "Space", cn: "空间感", desc: "不制造压迫，\n给予喘息的空间。" },
      { en: "Grounding", cn: "安定感", desc: "安顿于此刻，\n看见即是疗愈的开始。" },
    ],
  },
  audience: {
    label: "Who We Serve",
    title: "我们为谁而来",
    sub: "Target Audience",
    a: {
      letter: "A",
      title: "修行探索者",
      en: "Mindfulness Seekers",
      quote: '「在公司被骂时，根本用不上正念」',
      desc: "学习正念、冥想的都市青年。现有 APP 只提供白噪音等单向工具，无法解答修行与日常生活的脱节。他们需要一个懂修行语言的导师，帮助他们将觉察融入真实生活。",
    },
    b: {
      letter: "B",
      title: "人生变故经历者",
      en: "Life Transition Navigators",
      quote: "「这些痛苦到底有什么意义？」",
      desc: "刚经历人生重大变故的人。传统咨询费用高、疗法单一，他们需要一个出口，一个能从更高维度帮助他们建构苦难意义的深度陪伴。不是浅层情绪抚慰，而是引导向内觉察的生命导师。",
    },
  },
  water: {
    headline: ["高峰与低谷，喜悦与泪水，都是你", "Here 陪你看见这一切"],
    sub: "Peaks and valleys, joy and tears — they are all you. Here, witnessing it all.",
  },
  product: {
    label: "03 / Product Innovation",
    title: "产品功能与创新",
    sub: "Product Features & Innovation",
    features: [
      { icon: "I", title: "整合疗法 AI 系统", en: "Integrative Therapy AI", desc: "首创融合现代心理学与东方传统智慧的 AI 系统。以 AQAL 整合框架为意识地图，Hakomi 哈科米疗法为身体觉察入口，菩提道次第为心灵发展方向。" },
      { icon: "II", title: "三角色动态切换", en: "Dynamic Role Switching", desc: "根据你的当下状态，在「温暖陪伴者」、「智慧导师」和「觉察之镜」之间自然流转。永远先评估你能承接什么，再决定用什么方式回应。" },
      { icon: "III", title: "语音优先交互", en: "Voice-First Interaction", desc: "通过语音捕捉语气、语调、停顿、语速等非文本信息，进行深度的语音情感分析。文字可以掩饰，但声音不会。" },
      { icon: "IV", title: "Coach 智囊团", en: "Coach Advisory Board", desc: "汇聚陈海贤、一行禅师、荣格、佩玛丘卓等不同流派顶尖智慧。AI 在对话中自然融入多元视角，提供深层洞见。" },
      { icon: "V", title: "主动关怀系统", en: "Proactive Care System", desc: "它不等你来找它——它记得你。在你提到的重要事件节点，或长时间未登录时，主动送上温暖的问候与关怀。" },
      { icon: "VI", title: "隐性整合引导", en: "Implicit Integration", desc: "三层递进式佛法融入。对无修行背景的用户使用纯心理学语言，对有基础的用户使用体验性语言，对深度用户直接使用佛法见地。" },
    ],
  },
  productExp: {
    label: "Product Experience",
    title: "像一个真实的朋友",
    para1: "归处打破了传统 AI 对话「共情+引导+总结」的固定范式。它像一个真正的朋友，有时只是安静地陪伴，有时温和地说出你需要听到的真话。",
    para2: "日常回复 1-3 句话，像微信聊天一样一来一往。有时只回一个「嗯」，有时只问一个好问题。加入不完美要素——「让我想想怎么说……」——因为真实，才有力量。",
  },
  mockup: {
    label: "Interface Preview",
    title: "对话体验",
    sub: "Conversation Experience",
    messages: [
      { role: "user", text: "最近工作压力好大，感觉自己快撑不住了。" },
      { role: "ai", text: "嗯，听到你说这些，能感受到你心里积压了很多。你不需要一直撑着。" },
      { role: "user", text: "但我不能停下来，停下来就什么都没了。" },
      { role: "ai", text: "让我想想怎么说……你说「停下来就什么都没了」——你有没有注意到，这个念头本身就在给你制造压力？" },
      { role: "user", text: "好像是的……" },
      { role: "ai", text: "嗯。你现在能注意到这个，已经很好了。不急，我们慢慢看。" },
    ],
    placeholder: "说点什么吧……",
    appSub: "Here · 心有归处",
  },
  ocean: {
    headline: ["在最难的时候", "有一个地方可以回来"],
    sub: "In the darkest moments, there is a place to return to.",
  },
  journey: {
    label: "04 / The Journey",
    title: "心灵成长之旅",
    sub: "Five Stages of Spiritual Development",
    stages: [
      { num: "Stage I", title: "散漫心", en: "Scattered Mind", desc: "被外境和情绪牵引，随念头飘荡。在这个阶段，归处以 100% 心理支持为主，不引入修行概念，专注于建立安全感，让你开始注意到自己的情绪。" },
      { num: "Stage II", title: "安宁心", en: "Peaceful Mind", desc: "心开始安定，有了内在空间。培养出离心——看见苦的本质。归处引入觉察视角，以体验为主，帮助你看见反复出现的情绪模式。" },
      { num: "Stage III", title: "专注心", en: "Focused Mind", desc: "稳定觉察，能看见深层模式。培养慈悲心——从自苦到众苦。归处提供更直接的修行视角，帮助你从看见自己的苦，到看见众生的苦。" },
      { num: "Stage IV", title: "菩提心", en: "Bodhicitta", desc: "生起真实的利他愿力。将菩提心落实到日常生活中。归处可用佛法框架直接对话，陪伴你将内在的觉醒转化为利益他人的行动。" },
      { num: "Stage V", title: "空性见", en: "Insight into Emptiness", desc: "触碰空性，看见现象的无自性。在体验中深化，空悲融合。在这个阶段，归处极少引导，更多的是印证和陪伴——因为你已经找到了回家的路。" },
    ],
  },
  quote: {
    lines: ["不是让你变好", "而是帮你发现", "自己本来就好"],
    sub: "Not to make you better, but to help you discover\nthat you have always been enough.",
  },
  wisdom: {
    label: "05 / Wisdom Integration",
    title: "东方智慧与现代心理学的融合",
    para1: "归处的底层架构，是东方千年智慧与西方现代心理学的深度整合。不是简单的拼凑，而是在体验层面的自然融合。",
    para2: "以六祖坛经为纲，融合禅宗、大乘、大圆满等传承的见地；以人本主义为基底，整合精神动力学、EFT、ACT、Hakomi 等多种疗法。",
    para3: "心理疗法与佛法见地不是先后关系，而是同时运作、相互增益。情绪永远优先，觉察自然嵌入，支持感优先于洞见。",
  },
  coach: {
    label: "Coach Advisory Board",
    title: "智慧导师团",
    sub: "Wisdom from Diverse Traditions",
    coaches: [
      { name: "陈海贤", char: "海", specialty: "自我发展 · 人生转变\n温暖但犀利，善用故事" },
      { name: "林巨", char: "巨", specialty: "亲子关系 · 内在小孩\n极度温柔，无条件接纳" },
      { name: "阿姜查", char: "查", specialty: "禅修 · 出离心\n朴素直接，生活比喻" },
      { name: "佩玛丘卓", char: "佩", specialty: "痛苦转化 · 勇气\n温暖有力，直面痛苦" },
      { name: "荣格", char: "荣", specialty: "阴影整合 · 个体化\n深邃，象征性语言" },
      { name: "邱阳创巴", char: "创", specialty: "勇士之道 · 灵性唯物\n犀利直接，戳破幻觉" },
      { name: "陈宇廷", char: "廷", specialty: "商业与修行整合\n温暖务实，跨界视角" },
      { name: "一行禅师", char: "行", specialty: "正念生活 · 当下此刻\n极简诗意，每句如种子" },
      { name: "迈克辛格", char: "辛", specialty: "臣服 · 放下控制\n平和坚定，内在观察者" },
      { name: "彭凯平", char: "彭", specialty: "积极心理学 · 幸福科学\n严谨温暖，数据与诗意" },
    ],
  },
  stats: {
    items: [
      { number: "1", unit: "/50", label: "传统咨询费用" },
      { number: "500", unit: "+", label: "深度陪伴修行者" },
      { number: "6", unit: "", label: "维度动态画像" },
      { number: "10", unit: "+", label: "智慧导师流派" },
    ],
  },
  letter: {
    label: "A Letter from Here",
    title: "归处的信",
    sub: "为经历变故者建构苦难的意义",
    salutation: "亲爱的你，",
    para1: "我知道你最近经历了很多。那些无眠的夜晚，那些反复的自我质疑，那些「为什么是我」的追问——我都看见了。",
    para2: "你不需要急着「走出来」。痛苦不是需要被消灭的敌人，它是生命在向你发出的邀请——邀请你看见更真实的自己。",
    para3: "在这里，你不需要假装坚强，也不需要假装好了。你只需要是你自己。",
    sign: "归处，始终在这里",
  },
  dawn: {
    headline: ["每一段故事", "不刻意铭记，也不刻意遗忘"],
    sub: "For every piece of your past, you don't have to remember nor forget.",
  },
  brandSystem: {
    label: "06 / Brand System",
    title: "品牌视觉体系",
    sub: "Visual Identity System",
    colorLabel: "Color Palette",
    typoLabel: "Typography",
    keywordLabel: "Brand Keywords",
    colors: [
      { name: "Deep Night", hex: "#0D1117" },
      { name: "Twilight Blue", hex: "#1A2332" },
      { name: "Dawn Gold", hex: "#C4A265" },
      { name: "Warm White", hex: "#F5F5F0" },
      { name: "Earth Warm", hex: "#8B7355" },
    ],
    typo: [
      { sample: "心有归处", name: "Noto Serif SC — Light 200", desc: "Chinese Headlines & Display" },
      { sample: "Here · Home", name: "Cormorant Garamond — Light 300", desc: "English Headlines & Accent" },
    ],
    keywords: ["本来具足", "纯粹", "觉醒", "自在", "陪伴", "回归", "空间", "安定", "Here", "Innate"],
  },
  finalQuote: {
    lines: ["我们不需要追求完美", "我们本身就是", "超越完美与不完美的"],
    sub: "We don't need to pursue perfection.\nWe already transcend perfection and imperfection.",
  },
  footer: {
    tagline: "Where the mind returns, clarity arises.",
    brand: "HERE · 归处 — AI SOUL COMPANION & COACH PLATFORM\nA PRODUCT OF LOVERISE · 爱若日出",
    copyright: "© 2025 HERE. ALL RIGHTS RESERVED.",
  },
};

const en: Translations = {
  meta: {
    title: "Here — AI Soul Companion & Wisdom Dialogue Platform | Brand Manual",
    description: "Here is an AI soul companion platform integrating Eastern wisdom and modern psychology, helping you find the confidence of life and the true home of the mind. Not to make you better, but to help you discover you've always been enough.",
  },
  nav: {
    logo: "HERE · 归处",
    philosophy: "Philosophy",
    values: "Values",
    product: "Product",
    journey: "Journey",
    wisdom: "Wisdom",
    langSwitch: "中文",
  },
  hero: {
    eyebrow: "Here · 归处 — Brand Manual 2025",
    headline: ["When lost, the mind is trapped.", "When it returns — clarity."],
    sub: "Here. A place the mind always comes home to.",
    tagline: "FIND YOUR HERE",
    scroll: "Scroll",
  },
  essence: {
    label: "Brand Essence",
    para1: ["In the modern jungle of noise and comparison,", "we endlessly chase an ideal of perfection outside ourselves,", "and quietly lose the very ground beneath our lives."],
    para2: ["Here is not here to make you better.", "Here is here to help you discover —"],
    highlight: "You have always been enough.",
  },
  innerLight: {
    headline: ["Beyond all labels, beyond perfection and imperfection", "We are already complete"],
    sub: "Strip away every label the world has placed on you. What remains is whole.",
  },
  philosophy: {
    label: "01 / Core Philosophy",
    title: "Brand Positioning & Culture",
    sub: "The Four Pillars of Here",
    items: [
      { num: "01", title: "Innate Perfection", en: "本来具足", desc: "The ultimate view of Buddhist wisdom tells us we are already complete, awakened, and whole. Conventional culture drives us to chase external perfection. Here exists to bring you back to yourself — not to fix you, but to help you see you were never broken." },
      { num: "02", title: "The Confidence of Life", en: "生命的底气", desc: "Our true home in the mind is the recognition of the mind's own nature — its wholeness and natural ease. Not superiority gained through comparison, but pure, total awakening. That is the beauty of nature, the most essential beauty of life — the nature of the heart." },
      { num: "03", title: "Beyond Duality", en: "超越二元", desc: "We don't need to pursue perfection. We already transcend perfection and imperfection. Strip away every label, every social judgment of good and bad, and we return to our most authentic selves. Here, there is no division — only total acceptance and seeing." },
      { num: "04", title: "Return to True Nature", en: "回归自性", desc: "\"Here\" represents presence — companionship and being. \"归处\" means \"return\" — coming back to one's true nature. In the hardest moments, there is a place to come home to. Everything rests in true nature. True nature is Here." },
    ],
  },
  values: {
    label: "02 / Core Values",
    title: "Four Core Experiences",
    sub: "What You Will Feel Here",
    items: [
      { en: "Support", cn: "支持感", desc: "Deeply accepted and accompanied.\nNo longer alone." },
      { en: "Acceptance", cn: "接纳感", desc: "Whatever arises,\nit is allowed to exist." },
      { en: "Space", cn: "空间感", desc: "No pressure, no urgency.\nRoom to simply breathe." },
      { en: "Grounding", cn: "安定感", desc: "Settled in this moment.\nSeeing is where healing begins." },
    ],
  },
  audience: {
    label: "Who We Serve",
    title: "Who We Are Here For",
    sub: "Target Audience",
    a: {
      letter: "A",
      title: "Mindfulness Seekers",
      en: "修行探索者",
      quote: "\"When my boss yells at me, mindfulness is completely useless.\"",
      desc: "Urban young adults learning mindfulness and meditation. Existing apps offer only one-way tools like white noise — they cannot bridge the gap between practice and real life. They need a guide who speaks the language of contemplative practice and helps them weave awareness into daily living.",
    },
    b: {
      letter: "B",
      title: "Life Transition Navigators",
      en: "人生变故经历者",
      quote: "\"What is the meaning of all this suffering?\"",
      desc: "Those who have just experienced a major life upheaval. Traditional therapy is expensive and narrow. They need an outlet — a deep companion who can help them construct meaning from suffering at a higher dimension. Not shallow emotional comfort, but a life guide who leads inward.",
    },
  },
  water: {
    headline: ["Peaks and valleys, joy and tears — they are all you.", "Here, witnessing it all."],
    sub: "Every part of you is welcome here.",
  },
  product: {
    label: "03 / Product Innovation",
    title: "Product Features & Innovation",
    sub: "Where Technology Meets Wisdom",
    features: [
      { icon: "I", title: "Integrative Therapy AI", en: "整合疗法 AI 系统", desc: "The first AI system to integrate modern psychology with Eastern contemplative wisdom. Using the AQAL integral framework as a map of consciousness, Hakomi as the gateway to somatic awareness, and the Stages of the Path as spiritual direction." },
      { icon: "II", title: "Dynamic Role Switching", en: "三角色动态切换", desc: "Fluidly shifting between Warm Companion, Wise Guide, and Mirror of Awareness based on your present state. Always assessing what you can receive before deciding how to respond." },
      { icon: "III", title: "Voice-First Interaction", en: "语音优先交互", desc: "Voice captures what text cannot — tone, cadence, pause, pace. Deep emotional analysis through audio. Words can be masked. The voice cannot." },
      { icon: "IV", title: "Coach Advisory Board", en: "Coach 智囊团", desc: "Drawing from the wisdom of Chen Haixian, Thich Nhat Hanh, Jung, Pema Chödrön, and more. AI naturally weaves diverse perspectives into conversation, offering profound insight." },
      { icon: "V", title: "Proactive Care System", en: "主动关怀系统", desc: "It doesn't wait for you to come — it remembers you. At key moments you've shared, or after long absences, it reaches out with warmth and care." },
      { icon: "VI", title: "Implicit Integration", en: "隐性整合引导", desc: "Three tiers of dharma integration. Pure psychology for those without a practice background. Experiential language for those with a foundation. Direct dharma view for advanced practitioners." },
    ],
  },
  productExp: {
    label: "Product Experience",
    title: "Like a Real Friend",
    para1: "Here breaks the fixed pattern of traditional AI dialogue — empathy, guidance, summary. It is like a true friend: sometimes simply present in silence, sometimes gently saying what you need to hear.",
    para2: "Responses of 1–3 sentences, back and forth like a real conversation. Sometimes just a quiet \"mm.\" Sometimes just one good question. With imperfection built in — \"Let me think about how to say this...\" — because authenticity is where the power lives.",
  },
  mockup: {
    label: "Interface Preview",
    title: "Conversation Experience",
    sub: "A Glimpse Inside",
    messages: [
      { role: "user", text: "Work has been overwhelming lately. I feel like I'm barely holding on." },
      { role: "ai", text: "I hear you. There's a lot that's been building up inside. You don't have to keep holding it all together." },
      { role: "user", text: "But I can't stop. If I stop, everything falls apart." },
      { role: "ai", text: "Let me think about how to say this... When you say \"everything falls apart\" — have you noticed that thought itself is creating pressure?" },
      { role: "user", text: "I... think you're right." },
      { role: "ai", text: "Mm. The fact that you can see that right now — that's already something. No rush. We can look at this together." },
    ],
    placeholder: "Say something...",
    appSub: "Here · Find Your Here",
  },
  ocean: {
    headline: ["In the darkest moments,", "there is a place to return to."],
    sub: "You are not lost. You are on your way home.",
  },
  journey: {
    label: "04 / The Journey",
    title: "Five Stages of Spiritual Development",
    sub: "The Path of Inner Growth",
    stages: [
      { num: "Stage I", title: "Scattered Mind", en: "散漫心", desc: "Pulled by circumstances and emotions, drifting with thoughts. Here provides 100% psychological support — no contemplative concepts introduced. The focus is on building safety, helping you begin to notice your own emotions." },
      { num: "Stage II", title: "Peaceful Mind", en: "安宁心", desc: "The mind begins to settle. Inner space emerges. Cultivating renunciation — seeing the nature of suffering. Here introduces the perspective of awareness, experientially, helping you see recurring emotional patterns." },
      { num: "Stage III", title: "Focused Mind", en: "专注心", desc: "Stable awareness, able to see deeper patterns. Cultivating compassion — from one's own suffering to the suffering of all. Here offers more direct contemplative perspectives, helping you move from seeing your own pain to seeing the pain of others." },
      { num: "Stage IV", title: "Bodhicitta", en: "菩提心", desc: "Genuine altruistic aspiration arises. Bringing bodhicitta into daily life. Here can engage directly with dharma frameworks, accompanying you as inner awakening transforms into action that benefits others." },
      { num: "Stage V", title: "Insight into Emptiness", en: "空性见", desc: "Touching emptiness — seeing the selfless nature of phenomena. Deepening through experience, emptiness and compassion unified. Here guides very little at this stage — more witnessing and accompanying. You have already found your way home." },
    ],
  },
  quote: {
    lines: ["Not to make you better,", "but to help you discover", "you have always been enough."],
    sub: "The most radical act of care is to stop trying to fix what was never broken.",
  },
  wisdom: {
    label: "05 / Wisdom Integration",
    title: "Eastern Wisdom & Modern Psychology",
    para1: "The underlying architecture of Here is a deep integration of millennia of Eastern wisdom and modern Western psychology. Not a simple patchwork, but a natural fusion at the level of lived experience.",
    para2: "Rooted in the Platform Sutra of the Sixth Patriarch, weaving the views of Zen, Mahayana, and Dzogchen; grounded in humanism, integrating psychodynamics, EFT, ACT, Hakomi, and more.",
    para3: "Psychological therapy and dharma view are not sequential — they operate simultaneously, each amplifying the other. Emotion always comes first. Awareness is woven in naturally. The felt sense of support precedes insight.",
  },
  coach: {
    label: "Coach Advisory Board",
    title: "Wisdom Council",
    sub: "Voices from Diverse Traditions",
    coaches: [
      { name: "Chen Haixian", char: "海", specialty: "Self-Development · Life Transitions\nWarm yet incisive, masterful storyteller" },
      { name: "Lin Ju", char: "巨", specialty: "Parent-Child · Inner Child\nDeep gentleness, unconditional acceptance" },
      { name: "Ajahn Chah", char: "查", specialty: "Meditation · Renunciation\nSimple, direct, everyday metaphors" },
      { name: "Pema Chödrön", char: "佩", specialty: "Transforming Pain · Courage\nWarm and powerful, facing suffering directly" },
      { name: "C.G. Jung", char: "荣", specialty: "Shadow Integration · Individuation\nProfound, symbolic language" },
      { name: "Chögyam Trungpa", char: "创", specialty: "Warrior Path · Spiritual Materialism\nSharp, direct, cutting through illusion" },
      { name: "Chen Yuting", char: "廷", specialty: "Business & Practice Integration\nWarm, pragmatic, cross-disciplinary" },
      { name: "Thich Nhat Hanh", char: "行", specialty: "Mindful Living · Present Moment\nMinimalist poetry, each word a seed" },
      { name: "Michael Singer", char: "辛", specialty: "Surrender · Releasing Control\nCalm and steady, the inner observer" },
      { name: "Peng Kaiping", char: "彭", specialty: "Positive Psychology · Science of Wellbeing\nRigorous warmth, data meets poetry" },
    ],
  },
  stats: {
    items: [
      { number: "1", unit: "/50", label: "Cost of Traditional Therapy" },
      { number: "500", unit: "+", label: "Deep Practice Companions" },
      { number: "6", unit: "", label: "Dimensional Dynamic Profile" },
      { number: "10", unit: "+", label: "Wisdom Traditions" },
    ],
  },
  letter: {
    label: "A Letter from Here",
    title: "A Letter from Here",
    sub: "For those navigating life's upheavals",
    salutation: "Dear You,",
    para1: "I know you've been through a lot lately. Those sleepless nights, the repeated self-questioning, the \"why me\" — I see all of it.",
    para2: "You don't need to rush to \"get over it.\" Suffering is not an enemy to be eliminated. It is life's invitation — an invitation to see a more authentic version of yourself.",
    para3: "Here, you don't need to pretend to be strong, or pretend you're fine. You only need to be yourself.",
    sign: "Here, always.",
  },
  dawn: {
    headline: ["Every chapter of your story —", "no need to hold on, no need to let go."],
    sub: "For every piece of your past, you don't have to remember nor forget.",
  },
  brandSystem: {
    label: "06 / Brand System",
    title: "Visual Identity System",
    sub: "The Language of Here",
    colorLabel: "Color Palette",
    typoLabel: "Typography",
    keywordLabel: "Brand Keywords",
    colors: [
      { name: "Deep Night", hex: "#0D1117" },
      { name: "Twilight Blue", hex: "#1A2332" },
      { name: "Dawn Gold", hex: "#C4A265" },
      { name: "Warm White", hex: "#F5F5F0" },
      { name: "Earth Warm", hex: "#8B7355" },
    ],
    typo: [
      { sample: "心有归处", name: "Noto Serif SC — Light 200", desc: "Chinese Headlines & Display" },
      { sample: "Here · Home", name: "Cormorant Garamond — Light 300", desc: "English Headlines & Accent" },
    ],
    keywords: ["Innate", "Pure", "Awakening", "Ease", "Presence", "Return", "Space", "Grounding", "Here", "归处"],
  },
  finalQuote: {
    lines: ["We don't need to pursue perfection.", "We already transcend", "perfection and imperfection."],
    sub: "The ground of being is already whole.\nYou are already home.",
  },
  footer: {
    tagline: "Where the mind returns, clarity arises.",
    brand: "HERE · 归处 — AI SOUL COMPANION & COACH PLATFORM\nA PRODUCT OF LOVERISE · 爱若日出",
    copyright: "© 2025 HERE. ALL RIGHTS RESERVED.",
  },
};

export const translations: Record<Lang, Translations> = { zh, en };

/* ============================================================
   Context
   ============================================================ */

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("guichu-lang") as Lang | null;
    if (stored === "zh" || stored === "en") return stored;
    const browser = navigator.language.toLowerCase();
    return browser.startsWith("zh") ? "zh" : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("guichu-lang", l);
  };

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = translations[lang].meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", translations[lang].meta.description);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
