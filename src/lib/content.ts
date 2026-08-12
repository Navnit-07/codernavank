// All real content lives here. One source of truth for the whole OS.

export const IDENTITY = {
  name: "Navnit Kumar",
  handle: "codernavank",
  tagline: "Software Engineer. I turn unreasonable ideas into working systems.",
  location: "India",
  school: "Vellore Institute of Technology — B.Tech CSE, Aug 2023 – May 2027",
  links: {
    github: "https://github.com/Navnit-07",
    linkedin: "https://www.linkedin.com/in/navnit-kumar-35969729b",
    leetcode: "https://leetcode.com/codernavank",
  },
};


export const ABOUT_LINES = [
  "root@codernavank:~$ cat about.txt",
  "",
  "I build backend systems the way I play chess: slow when it matters,",
  "fast when the position is winning, and I'd rather understand the",
  "engine than trust the library.",
  "",
  "Currently a CS undergrad at VIT (2023–2027), but the resume reads",
  "like someone who skipped the 'aspiring' phase — production APIs,",
  "10,000+ daily calls, real users, real uptime numbers.",
  "",
  "When I'm not shipping, I'm three moves deep into a Sicilian and",
  "still convinced I'm winning.",
];

export const SKILLS = [
  { label: "JavaScript / TypeScript", value: 96 },
  { label: "Node.js / Express", value: 95 },
  { label: "React.js / Next.js", value: 90 },
  { label: "MongoDB / Redis", value: 92 },
  { label: "System Design", value: 87 },
  { label: "REST APIs / WebSocket", value: 93 },
  { label: "Docker / AWS / CI-CD", value: 82 },
  { label: "C++ / SQL", value: 85 },
  { label: "Chess (blitz, unrated ego)", value: 78 },
  { label: "Sleep schedule", value: 9 },
];

export const PROJECTS = [
  {
    id: "rate-limit-gateway",
    name: "Rate Limit Gateway",
    stack: "Node.js, Redis",
    period: "Jun 2026 – Jul 2026",
    url: "https://github.com/Navnit-07",
    blurb:
      "An API gateway built from scratch to implement rate limiting natively — token buckets, distributed throttling — instead of importing someone else's understanding of the problem.",
  },
  {
    id: "topvit",
    name: "topVIT — Academic Resource Platform",
    stack: "React.js, Node.js, MongoDB",
    period: "Mar 2025 – May 2025",
    url: "https://github.com/Navnit-07",
    blurb:
      "Full-stack platform serving 500+ students. Query optimization cut retrieval time 40%, code splitting cut bundle size 35%, 98% cross-browser compatibility.",
  },
  {
    id: "petconnect",
    name: "PetConnect — Pet Social Network",
    stack: "React.js, Node.js, MongoDB, Socket.io, Redis",
    period: "Feb 2026 – May 2026",
    url: "https://github.com/Navnit-07",
    blurb:
      "Full-stack social platform for pet owners — JWT auth, Redis-cached feed, real-time Socket.io chat with authenticated handshakes, Gemini-powered AI advice with local fallback, Dockerized with Nginx.",
  },
];

export const EXPERIENCE = [
  {
    id: "scalepbg",
    role: "Full Stack Developer Intern",
    org: "ScalePBG",
    period: "Jan 2026 – Apr 2026 · Remote",
    bullets: [
      "Developed a Generative AI-powered screen assistance feature that analyzes users' shared screens and provides contextual, step-by-step guidance based on their current task and progress",
      "Engineered and optimized LLM prompts and context pipelines to improve response quality while reducing AI response latency from ~5s to ~2s",
      "Implemented streaming AI responses and optimized model context to reduce unnecessary processing, delivering responses incrementally and improving perceived response time",
      "Integrated multimodal AI support across Gemini, OpenAI, and Claude models, enabling flexible model selection for screen-based reasoning and contextual assistance",
      "Implemented Redis-based queuing for asynchronous AI processing and contributed to the React.js UI — screen-sharing workflows, step completion, contextual guidance, and off-screen detection",
    ],
  },
  {
    id: "osdag",
    role: "Software Development Engineer Intern",
    org: "Osdag (Open Source Design and Analysis Group)",
    period: "Oct 2025 – Dec 2025 · Remote",
    bullets: [
      "Developed 8+ production-ready structural engineering modules integrating React.js frontend with Python backend APIs",
      "Optimized database queries and caching strategies, reducing API response time by 25% and improving throughput by 40%",
      "Refactored legacy codebase following clean code principles, reducing technical debt by 30%, enabling faster feature development, and actively participating in code reviews and documentation",
    ],
  },
];

export const ACHIEVEMENTS = [
  "2nd Place — InnovMinds Hackathon",
  "National Finalist — CineAI Hackathon",
  "Global Finalist — Health Hackathon",
  "First author, peer-reviewed publication — \"AI Revolution in Business Decision-Making\"",
  "Co-Lead, VITKULT Technical Domain — ran technical ops/infra for 150+ members",
  "AWS Certified Cloud Practitioner (CLF-C02) — Jul 2026",
];

export const COMMIT_LOG = [
  { hash: "a1f9c2e", msg: "feat(osdag): shipped 8 structural engineering modules, React + Python APIs" },
  { hash: "7d0e831", msg: "feat(scalepbg): built GenAI screen assistance feature — step-by-step contextual guidance" },
  { hash: "44bb210", msg: "perf(scalepbg): optimized LLM prompts + context pipelines — latency ~5s → ~2s" },
  { hash: "c3aa9f5", msg: "feat(scalepbg): streaming AI responses + Redis-based async processing queue" },
  { hash: "d2f91ba", msg: "feat(scalepbg): multimodal AI — Gemini, OpenAI, Claude for screen-based reasoning" },
  { hash: "0f2d17b", msg: "feat(research): published first-author paper on AI in business decisions" },
  { hash: "9e4a002", msg: "feat(leadership): co-lead, VITKULT — 150+ members, zero downtime" },
  { hash: "5c1b78d", msg: "fix(hackathons): placed 2nd @ InnovMinds, finals @ CineAI + Health Hackathon" },
  { hash: "2a90ffc", msg: "cert(aws): AWS Certified Cloud Practitioner" },
  { hash: "0000001", msg: "init: born, immediately started debugging life" },
];

export const BOT_NAME = "Industry Standard";

export const BOOT_LOG = [
  "codernavankOS boot sequence v2.7",
  "[OK] loading kernel modules...",
  "[OK] mounting /dev/navank...",
  "[OK] initializing backend_systems.sys...",
  "[OK] initializing chess_engine.sys...",
  "[WARN] learn.sys running at 140% capacity",
  "[OK] calibrating rate_limiter.dll...",
  "[OK] starting window manager...",
  "[OK] linking github, leetcode, linkedin...",
  "[ ready ] welcome, root.",
];
