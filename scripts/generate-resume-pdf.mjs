import fs from "node:fs";
import path from "node:path";

const page = {
  width: 595,
  height: 842,
  margin: 34,
};

const colors = {
  ink: "0.09 0.13 0.20",
  text: "0.17 0.20 0.24",
  muted: "0.33 0.38 0.45",
  accent: "0.72 0.61 0.37",
};

const content = [];

function esc(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/•/g, "\\225")
    .replace(/–/g, "\\226")
    .replace(/—/g, "\\227");
}

function text(x, y, value, size = 11, color = colors.text, font = "F1") {
  content.push(
    `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${esc(value)}) Tj ET`
  );
}

function line(x1, y1, x2, y2, width = 1, color = colors.accent) {
  content.push(
    `${color} RG ${width} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`
  );
}

function rect(x, y, width, height, strokeWidth = 1, color = colors.muted) {
  content.push(
    `${color} RG ${strokeWidth} w ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re S`
  );
}

function circle(cx, cy, radius, strokeWidth = 1, color = colors.muted) {
  const c = 0.5522847498 * radius;
  const x0 = cx - radius;
  const y0 = cy;

  content.push(
    `${color} RG ${strokeWidth} w ${x0.toFixed(2)} ${y0.toFixed(2)} m ` +
      `${x0.toFixed(2)} ${(cy + c).toFixed(2)} ${(cx - c).toFixed(2)} ${(cy + radius).toFixed(2)} ${cx.toFixed(2)} ${(cy + radius).toFixed(2)} c ` +
      `${(cx + c).toFixed(2)} ${(cy + radius).toFixed(2)} ${(cx + radius).toFixed(2)} ${(cy + c).toFixed(2)} ${(cx + radius).toFixed(2)} ${cy.toFixed(2)} c ` +
      `${(cx + radius).toFixed(2)} ${(cy - c).toFixed(2)} ${(cx + c).toFixed(2)} ${(cy - radius).toFixed(2)} ${cx.toFixed(2)} ${(cy - radius).toFixed(2)} c ` +
      `${(cx - c).toFixed(2)} ${(cy - radius).toFixed(2)} ${x0.toFixed(2)} ${(cy - c).toFixed(2)} ${x0.toFixed(2)} ${y0.toFixed(2)} c S`
  );
}

function estimateTextWidth(value, size, bold = false) {
  let units = 0;
  for (const ch of String(value)) {
    if ("il.,:;|!I' ".includes(ch)) units += 0.28;
    else if ("ftrj()-/".includes(ch)) units += 0.34;
    else if ("mwMW@%&—".includes(ch)) units += 0.82;
    else if (ch >= "A" && ch <= "Z") units += 0.68;
    else units += 0.54;
  }
  return units * size * (bold ? 1.05 : 1.0);
}

function drawPhoneIcon(x, y) {
  line(x + 1, y + 2, x + 3, y + 6, 0.9, colors.muted);
  line(x + 3, y + 6, x + 6, y + 3, 0.9, colors.muted);
  line(x + 6, y + 3, x + 8, y + 5, 0.9, colors.muted);
  line(x + 1, y + 2, x + 3, y, 0.9, colors.muted);
}

function drawMailIcon(x, y) {
  rect(x, y, 8, 6, 0.8, colors.muted);
  line(x, y + 6, x + 4, y + 3, 0.8, colors.muted);
  line(x + 8, y + 6, x + 4, y + 3, 0.8, colors.muted);
}

function drawPinIcon(x, y) {
  circle(x + 4, y + 5, 2, 0.8, colors.muted);
  line(x + 4, y + 3, x + 4, y, 0.8, colors.muted);
}

function drawLinkIcon(x, y) {
  rect(x, y + 1, 4.5, 4, 0.8, colors.muted);
  rect(x + 3.5, y + 1, 4.5, 4, 0.8, colors.muted);
}

function drawIcon(kind, x, y) {
  if (kind === "phone") drawPhoneIcon(x, y);
  if (kind === "mail") drawMailIcon(x, y);
  if (kind === "pin") drawPinIcon(x, y);
  if (kind === "link") drawLinkIcon(x, y);
}

function centeredContactLine(y, items, size = 8.0) {
  const iconWidth = 8;
  const iconGap = 4;
  const itemGap = 9;
  const separatorWidth = estimateTextWidth("|", size);
  let totalWidth = 0;

  items.forEach((item, index) => {
    totalWidth += iconWidth + iconGap + estimateTextWidth(item.text, size);
    if (index < items.length - 1) {
      totalWidth += itemGap + separatorWidth + itemGap;
    }
  });

  let cursorX = page.width / 2 - totalWidth / 2;

  items.forEach((item, index) => {
    drawIcon(item.icon, cursorX, y - 2);
    cursorX += iconWidth + iconGap;
    text(cursorX, y, item.text, size, colors.muted, "F1");
    cursorX += estimateTextWidth(item.text, size);

    if (index < items.length - 1) {
      cursorX += itemGap;
      text(cursorX, y, "|", size, colors.accent, "F1");
      cursorX += separatorWidth + itemGap;
    }
  });
}

function wrap(value, maxChars) {
  const words = value.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function paragraph(x, y, value, options = {}) {
  const {
    size = 9.5,
    color = colors.text,
    lineHeight = 12,
    maxChars = 108,
    bullet = false,
  } = options;

  const lines = wrap(value, maxChars);
  let cursor = y;

  lines.forEach((lineText, index) => {
    if (bullet && index === 0) {
      text(x, cursor, "•", size, colors.accent, "F2");
      text(x + 10, cursor, lineText, size, color);
    } else {
      text(bullet ? x + 10 : x, cursor, lineText, size, color);
    }
    cursor -= lineHeight;
  });

  return cursor;
}

function centeredText(y, value, size, color = colors.ink, font = "F2") {
  const x = page.width / 2 - estimateTextWidth(value, size, font === "F2") / 2;
  text(x, y, value, size, color, font);
}

function sectionTitle(x, y, value) {
  text(x, y, value, 10.2, colors.ink, "F2");
  line(x, y - 5, page.width - page.margin, y - 5, 1.1, colors.accent);
  return y - 14.5;
}

const resume = {
  name: "ARJAY ESCABAS",
  headline: "SENIOR FULL-STACK DEVELOPER  |  AI ENGINEER  |  QA & TEST AUTOMATION",
  contactItems: [
    { icon: "phone", text: "+63 956 948 3717" },
    { icon: "mail", text: "arjayescabas102@gmail.com" },
    { icon: "pin", text: "Philippines (Remote)" },
    { icon: "link", text: "arjayescabas.me" },
    { icon: "link", text: "linkedin.com/in/arjay-esc" },
  ],
  summary:
    "Senior Full-Stack Developer, AI Engineer & QA Automation Specialist. Founding engineer for Utah-based enterprises (OWSI & Gemstone Development LLC), architecting production platforms that reduced company operational workload by 60%. Proven expertise in LLM/agent orchestration (Anthropic Claude SDK, Gemini API, Onorca), modern web systems (Next.js 16, React 19, TypeScript, Python, FastAPI, PostgreSQL, Supabase), and rigorous software quality engineering (Playwright E2E browser suites, Vitest, SQL RLS security testing, API validation, and CI/CD quality gates).",
  skills: [
    ["AI Engineering & LLMs", "Anthropic Claude SDK, Gemini API, OpenAI, Onorca Workflows, AI Agents, Prompt Engineering, PDF/Document AI Parsing"],
    ["QA & Test Automation", "Playwright (E2E Browser Suites), Vitest, Regression Testing, API & Webhook Validation, SQL/RLS Security Testing, TDD, Sentry"],
    ["Frontend & Web", "TypeScript, JavaScript, React 19, Next.js 16 (App Router), Vue 3, Tailwind CSS 4, Zustand, TanStack Query, PWA"],
    ["Backend & APIs", "Node.js, Python, FastAPI, Laravel, REST APIs, Server Actions, SSE / WebSockets, Meta Graph & RingCentral APIs"],
    ["Data, Cloud & DevOps", "PostgreSQL, Supabase (Auth, RLS, Storage), Prisma, Redis, AWS S3, Cloudflare R2, Docker, GitHub Actions CI/CD, Vercel"],
  ],
  experience: [
    {
      title: "Senior Developer — AI, Full-Stack & QA Lead (Founding Developer)",
      company: "Old World Stone Imports USA (OWSI) & Gemstone Development LLC — Utah, USA (Remote)",
      period: "2026 – Present",
      bullets: [
        "Founding engineer (1 of 2 developers) directing architecture, AI integration, and QA across 3 production web platforms (gemstone-construction.owsiusa.com, giveaways.owsiusa.com, notebook.owsiusa.com), reducing company operational workload by 60%.",
        "Engineered embedded AI workflows (Anthropic Claude PDF bid/plan verification, AI Visual Studio tools, Onorca agent orchestration) alongside deterministic financial and campaign systems.",
        "Built comprehensive Playwright E2E test suites, Vitest unit tests, hydration verifiers, and PostgreSQL/Supabase RLS security tests validating live draw rooms, OTP auth flows, and multi-viewport responsiveness pre-release.",
      ],
    },
    {
      title: "Full-Stack Web, QA & Automation Developer",
      company: "Infosoft (Mini Clean Business Solutions)",
      period: "2026",
      bullets: [
        "Developed full-stack web applications, REST APIs, and automated SQL migration pipelines with staging-first data validation and browser automation (Puppeteer).",
        "Designed deterministic verification rules, automated data integrity checks, and export auditing flows to eliminate migration defects before production deployment.",
      ],
    },
    {
      title: "AI Application & Software Testing Developer",
      company: "Freelancer",
      period: "2024 – 2026",
      bullets: [
        "Engineered AI-powered applications, automated web crawling/auditing platforms (CipherLens, SQAuto), and defensive security/QA scanners evaluating SSL/TLS, HTTP headers, exposed endpoints, and repository hygiene.",
        "Integrated multi-provider LLM pipelines (Gemini, OpenAI, Anthropic) for automated risk scoring, anomaly detection, and remediation reporting.",
      ],
    },
  ],
  projects: [
    {
      title: "Gemstone Construction — Operations & Financial Workspace (Sole Developer)",
      url: "gemstone-construction.owsiusa.com",
      stack: "Next.js 16, React 19, TypeScript, PostgreSQL, Supabase, Anthropic Claude AI, Leaflet, RingCentral SMS, Playwright, Vitest",
      bullets: [
        "Personally architected full-stack construction PWA covering decimal-safe project budgets, Claude AI PDF bid intake & leveling, AP invoice ledgers, bank draw requests, Leaflet maps, and multi-crew SMS scheduling.",
        "Implemented automated Playwright E2E verification, site hydration checks, and Vitest test suites enforcing zero-regression releases across phone, tablet, and desktop viewports.",
      ],
    },
    {
      title: "OWSI Giveaways — Verified Campaign & Live Raffle Engine (Sole Developer)",
      url: "giveaways.owsiusa.com",
      stack: "Next.js 16, React 19, TypeScript, Supabase RLS, Tailwind CSS 4, Anthropic AI, Meta Graph API, Resend, Playwright",
      bullets: [
        "Engineered custom Gleam replacement featuring hybrid Meta Graph API comment verification, admin screenshot review queues, passwordless 6-digit OTP portals, and synchronized live raffle wheel draw rooms.",
        "Authored 12+ automated Playwright E2E test suites (entry-flow, review-flow, draw-flow, shared-live-room, meta-flow) and PostgreSQL RLS security tests validating campaign integrity.",
      ],
    },
    {
      title: "OWSI Notebook — Collaborative Interior Design Canvas & Client OS (Core Contributor)",
      url: "notebook.owsiusa.com",
      stack: "Next.js 16, React 19, TypeScript, Tailwind CSS 4, Zustand, TanStack Query, Supabase, Yjs, AWS S3, Sentry, Playwright",
      bullets: [
        "Co-developed OneNote-inspired workspace supporting free-form canvases, Standard/Full House design boards, slab worksheets, AI Visual Studio tools, and scoped client-sharing portals.",
        "Maintained automated browser/HTTP test suites, offline asset verification scripts, and Sentry error telemetry across real-time SSE and Yjs collaborative workflows.",
      ],
    },
  ],
  education: {
    school: "University of Mindanao Digos College",
    degree: "Bachelor of Science in Information Technology",
  },
};

let y = page.height - 36;

centeredText(y, resume.name, 20, colors.ink, "F2");
y -= 13.5;
centeredText(y, resume.headline, 8.8, colors.accent, "F2");
y -= 13.5;
centeredContactLine(y, resume.contactItems, 7.9);
y -= 11;
line(page.margin, y, page.width - page.margin, y, 1.15, colors.ink);
y -= 14;

y = sectionTitle(page.margin, y, "PROFESSIONAL SUMMARY");
y = paragraph(page.margin, y, resume.summary, { size: 8.9, lineHeight: 11.8, maxChars: 120 });
y -= 5;

y = sectionTitle(page.margin, y, "TECHNICAL SKILLS");
for (const [label, value] of resume.skills) {
  text(page.margin, y, `${label}:`, 8.8, colors.ink, "F2");
  y = paragraph(page.margin + 114, y, value, { size: 8.6, lineHeight: 11.0, maxChars: 92 });
  y -= 1.2;
}

y -= 4;
y = sectionTitle(page.margin, y, "WORK EXPERIENCE");
for (const item of resume.experience) {
  text(page.margin, y, item.title, 9.5, colors.ink, "F2");
  const periodX = page.width - page.margin - estimateTextWidth(item.period, 8.6, true);
  text(periodX, y, item.period, 8.6, colors.muted, "F2");
  y -= 11;
  if (item.company) {
    text(page.margin, y, item.company, 8.5, colors.accent, "F2");
    y -= 10;
  }
  for (const bullet of item.bullets) {
    y = paragraph(page.margin, y, bullet, { size: 8.6, lineHeight: 11.0, maxChars: 114, bullet: true });
  }
  y -= 3.5;
}

y -= 2.5;
y = sectionTitle(page.margin, y, "FEATURED PRODUCTION PROJECTS");
for (const project of resume.projects) {
  text(page.margin, y, project.title, 9.5, colors.ink, "F2");
  if (project.url) {
    const urlX = page.width - page.margin - estimateTextWidth(project.url, 8.4, true);
    text(urlX, y, project.url, 8.4, colors.accent, "F2");
  }
  y -= 11;
  text(page.margin, y, project.stack, 8.3, colors.muted, "F1");
  y -= 10;
  for (const bullet of project.bullets) {
    y = paragraph(page.margin, y, bullet, { size: 8.6, lineHeight: 11.0, maxChars: 114, bullet: true });
  }
  y -= 3.5;
}

y -= 2.5;
y = sectionTitle(page.margin, y, "EDUCATION");
text(page.margin, y, `${resume.education.school} — ${resume.education.degree}`, 9.1, colors.ink, "F2");
y -= 10;

const stream = content.join("\n");
const pdfObjects = [];

pdfObjects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
pdfObjects[2] = `<< /Type /Pages /Count 1 /Kids [3 0 R] >>`;
pdfObjects[3] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`;
pdfObjects[4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`;
pdfObjects[5] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`;
pdfObjects[6] = `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`;

let output = "%PDF-1.4\n";
const offsets = [0];

for (let index = 1; index < pdfObjects.length; index += 1) {
  offsets[index] = Buffer.byteLength(output, "utf8");
  output += `${index} 0 obj\n${pdfObjects[index]}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(output, "utf8");
output += `xref\n0 ${pdfObjects.length}\n`;
output += "0000000000 65535 f \n";

for (let index = 1; index < pdfObjects.length; index += 1) {
  output += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
}

output += `trailer\n<< /Size ${pdfObjects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

const outputPath = path.join(process.cwd(), "public", "Arjay-Escabas-Resume.pdf");
fs.writeFileSync(outputPath, output, "binary");
console.log(`Wrote ${outputPath}. Final y: ${y}`);
