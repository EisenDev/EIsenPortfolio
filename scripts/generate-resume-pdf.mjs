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
  return String(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
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

function estimateTextWidth(value, size) {
  return value.length * size * 0.46;
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

function centeredContactLine(y, items, size = 8.2) {
  const iconWidth = 8;
  const iconGap = 4;
  const itemGap = 14;
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
    size = 10,
    color = colors.text,
    lineHeight = 13,
    maxChars = 104,
    bullet = false,
  } = options;

  const lines = wrap(value, maxChars);
  let cursor = y;

  lines.forEach((lineText, index) => {
    if (bullet && index === 0) {
      text(x, cursor, "•", size, color);
      text(x + 12, cursor, lineText, size, color);
    } else {
      text(bullet ? x + 12 : x, cursor, lineText, size, color);
    }
    cursor -= lineHeight;
  });

  return cursor;
}

function centeredText(y, value, size, color = colors.ink, font = "F2") {
  const x = page.width / 2 - estimateTextWidth(value, size) / 2;
  text(x, y, value, size, color, font);
}

function sectionTitle(x, y, value) {
  text(x, y, value, 10.5, colors.ink, "F2");
  line(x, y - 6, page.width - page.margin, y - 6, 1.1, colors.accent);
  return y - 16;
}

const resume = {
  name: "ARJAY ESCABAS",
  contactItems: [
    { icon: "phone", text: "+63 956 948 3717" },
    { icon: "mail", text: "arjayescabas102@gmail.com" },
    { icon: "pin", text: "Philippines" },
    { icon: "link", text: "linkedin.com/in/arjay-esc" },
  ],
  summary:
    "Full-Stack Web Developer & Automation Builder with AI engineering experience. Proven expertise in building modern web applications, modular full-stack architectures, and responsive interfaces with Next.js, React, Node.js, Laravel, FastAPI, and PostgreSQL. Experienced in automated data pipelines, web scraping, and browser workflows, alongside integrating AI agents and LLMs into practical product logic. Dedicated to Docker containerization and clean software execution.",
  education: {
    school: "University of Mindanao Digos College",
    degree: "Bachelor of Science in Information Technology",
  },
  skills: [
    ["Languages", "TypeScript, JavaScript, Python, SQL, HTML/CSS"],
    ["Frontend", "React, Next.js, Vue 3, Tailwind CSS, Inertia.js"],
    ["Backend & APIs", "Laravel, Node.js, FastAPI, Hono, REST APIs, WebSockets, Webhooks"],
    ["Databases & ORM", "PostgreSQL, MySQL, SQLite, Supabase, Prisma, Redis, SQLAlchemy"],
    ["Automation & Tools", "Web scraping, Puppeteer, Browsershot, workflow automation, Polars"],
    ["AI Engineering", "Gemini API, LLM integration, AI agents, prompt engineering, structured review"],
    ["DevOps & Cloud", "Docker, Azure, Git, GitHub Actions, Nginx, Cloudflare R2, DigitalOcean"],
  ],
  projects: [
    {
      title: "Atelier — Philippine Creative Directory & Professional Service OS",
      stack: "Next.js 15, React 19, TypeScript, Prisma 7, PostgreSQL, Tailwind CSS, Cloudflare R2, PDF-Lib, Docker, Traefik",
      bullets: [
        "Engineered full-stack modular monolith featuring public creative discovery, canonical nickname routing (/[nickname]), and PDF invoicing.",
        "Implemented end-to-end booking workflows with deposit tracking, tokenized handoffs, Cloudflare R2 vaults, and Docker/Traefik deployment.",
      ],
    },
    {
      title: "SQAuto — Industrial SQL Dump Data Migration & Automation Platform",
      stack: "Next.js, FastAPI, PostgreSQL, Polars, Redis, SQLGlot, Gemini AI",
      bullets: [
        "Built automated data migration platform for restoring, profiling, cleaning, repairing, and exporting legacy SQL dump data.",
        "Uses read-only source staging sandbox, deterministic validation rules, schema repair, and AI-assisted anomaly detection.",
      ],
    },
    {
      title: "CipherLens — AI-Powered Defensive Security Auditing Platform",
      stack: "React, TypeScript, NestJS, Python, FastAPI, PostgreSQL, Supabase, Redis, BullMQ, Gemini AI, Docker",
      bullets: [
        "Architected defensive security platform automating website header checks, SSL/TLS inspections, and git secret scanning.",
        "Integrates Gemini AI to generate structured security findings, vulnerability risk prioritization, and actionable remediation guidance.",
      ],
    },
  ],
  experience: [
    {
      title: "Full-Stack Web & Automation Developer",
      company: "Infosoft (Mini Clean Business Solutions)",
      period: "2026",
      bullets: [
        "Developed full-stack web applications involving database workflows, backend REST APIs, frontend dashboards, and automated pipelines.",
        "Engineered SQL migration tooling, browser automation, data extraction, validation flows, and cloud storage deployments.",
        "Applied documentation-first planning, modular architecture, and Docker containerization for robust production maintainability.",
      ],
    },
    {
      title: "AI Application Developer / Automation Builder",
      company: "Freelancer",
      period: "2024 – 2026",
      bullets: [
        "Built AI-powered application concepts, automation workflows, crawling/auditing systems, and backend-driven data tools.",
        "Designed workflows where AI supports automation, prediction, analysis, validation, or decision support.",
        "Used AI-assisted development tools while maintaining responsibility for system design, debugging, code quality, and product functionality.",
      ],
    },
  ],
};

let y = page.height - 48;

centeredText(y, resume.name, 21, colors.ink, "F2");
y -= 18;
centeredContactLine(y, resume.contactItems, 8.2);
y -= 15;
line(page.margin, y, page.width - page.margin, y, 1.15, colors.ink);
y -= 17;

y = sectionTitle(page.margin, y, "PROFESSIONAL SUMMARY");
y = paragraph(page.margin, y, resume.summary, { size: 9.6, lineHeight: 13.2, maxChars: 112 });
y -= 7;

y = sectionTitle(page.margin, y, "EDUCATION");
text(page.margin, y, resume.education.school, 10.5, colors.ink, "F2");
y -= 13;
text(page.margin, y, resume.education.degree, 9.2, colors.text, "F1");
y -= 16;

y = sectionTitle(page.margin, y, "TECHNICAL SKILLS");
for (const [label, value] of resume.skills) {
  text(page.margin, y, `${label}:`, 9.2, colors.ink, "F2");
  y = paragraph(page.margin + 110, y, value, { size: 9.0, lineHeight: 11.6, maxChars: 88 });
  y -= 1;
}

y -= 5;
y = sectionTitle(page.margin, y, "FEATURED PROJECTS");
for (const project of resume.projects) {
  text(page.margin, y, project.title, 10.0, colors.ink, "F2");
  y -= 12;
  text(page.margin, y, project.stack, 8.8, colors.accent, "F1");
  y -= 11;
  for (const bullet of project.bullets) {
    y = paragraph(page.margin, y, bullet, { size: 9.0, lineHeight: 11.6, maxChars: 110, bullet: true });
  }
  y -= 3.5;
}

y -= 2;
y = sectionTitle(page.margin, y, "RELEVANT EXPERIENCE");
for (const item of resume.experience) {
  text(page.margin, y, item.title, 10.0, colors.ink, "F2");
  const periodX = page.width - page.margin - estimateTextWidth(item.period, 9.0);
  text(periodX, y, item.period, 9.0, colors.muted, "F1");
  y -= 12;
  if (item.company) {
    text(page.margin, y, item.company, 8.8, colors.accent, "F1");
    y -= 11;
  }
  for (const bullet of item.bullets) {
    y = paragraph(page.margin, y, bullet, { size: 9.0, lineHeight: 11.6, maxChars: 110, bullet: true });
  }
  y -= 3.5;
}

const stream = content.join("\n");
const pdfObjects = [];

pdfObjects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
pdfObjects[2] = `<< /Type /Pages /Count 1 /Kids [3 0 R] >>`;
pdfObjects[3] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`;
pdfObjects[4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;
pdfObjects[5] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
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

