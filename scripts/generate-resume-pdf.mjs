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
  text(x, y, value, 11.5, colors.ink, "F2");
  line(x, y - 8, page.width - page.margin, y - 8, 1.2, colors.accent);
  return y - 22;
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
    "AI Application Developer / AI Engineer focused on building AI-powered automation systems, data migration platforms, crawling and auditing tools, predictive workflows, and data-driven applications. Experienced in full-stack development, backend systems, AI-assisted workflows, database processing, and practical product implementation.",
  education: {
    school: "University of Mindanao Digos College",
    degree: "Bachelor of Science in Information Technology",
  },
  skills: [
    ["Languages", "TypeScript, JavaScript, Python, SQL, HTML/CSS"],
    ["Frontend", "React, Next.js, Vue 3, Tailwind CSS, Inertia.js"],
    ["Backend & APIs", "Laravel, FastAPI, Node.js, Hono, REST APIs, WebSockets, Webhooks"],
    ["AI & Automation", "AI agents, LLM integration, web scraping, Puppeteer, Browsershot"],
    ["Databases", "PostgreSQL, MySQL, SQLite, Supabase, SQLAlchemy, SQLGlot, Polars, pandas, Redis"],
    ["Testing & Debugging", "Postman, anomaly review, structured verification"],
    ["Cloud", "Azure, Docker, Nginx, Git, GitHub Actions, Cloudflare, DigitalOcean"],
  ],
  projects: [
    {
      title: "SQAuto — Industrial SQL Dump Data Migration Platform",
      stack: "Next.js, FastAPI, PostgreSQL, Polars, Redis, Gemini, SQLGlot",
      bullets: [
        "Built around a safe migration pipeline for restoring, profiling, cleaning, repairing, validating, and exporting legacy SQL dump data.",
        "Uses a read-only source principle, staging sandbox processing, deterministic validation, and AI-assisted guidance for schema explanations and anomaly detection.",
        "Supports schema comparison, relationship repair, validation reports, and export workflows for PostgreSQL, MySQL, SQLite, Excel, and clean SQL.",
      ],
    },
    {
      title: "CipherLens — AI-Powered Defensive Security Auditing Platform",
      stack: "React, TypeScript, NestJS, Python, FastAPI, PostgreSQL, Supabase, Redis, BullMQ, Docker",
      bullets: [
        "Enterprise-grade, AI-powered defensive security platform for automated auditing of websites and git repositories.",
        "Performs website security audits, SSL/TLS checks, secret scanning, and dependency vulnerability analysis.",
        "Integrates Gemini AI to generate structured findings, risk prioritization, and detailed remediation guidance.",
      ],
    },
  ],
  experience: [
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
    {
      title: "Full-Stack Automation & System Developer",
      company: "Infosoft (Mini Clean Business Solutions)",
      period: "2024 – 2026",
      bullets: [
        "Developed full-stack systems involving database workflows, backend APIs, frontend dashboards, and automated processing pipelines.",
        "Worked with SQL migration, browser automation, data extraction, validation, cloud storage, and deployment workflows.",
        "Used documentation-first planning and modular architecture to support safer implementation and maintainability.",
      ],
    },
  ],
};

let y = page.height - 58;

centeredText(y, resume.name, 22, colors.ink, "F2");
y -= 20;
centeredContactLine(y, resume.contactItems, 8.2);
y -= 18;
line(page.margin, y, page.width - page.margin, y, 1.15, colors.ink);
y -= 20;

y = sectionTitle(page.margin, y, "PROFESSIONAL SUMMARY");
y = paragraph(page.margin, y, resume.summary, { size: 10, lineHeight: 14, maxChars: 112 });
y -= 8;

y = sectionTitle(page.margin, y, "EDUCATION");
text(page.margin, y, resume.education.school, 10.8, colors.ink, "F2");
y -= 14;
text(page.margin, y, resume.education.degree, 9.6, colors.text, "F1");
y -= 20;

y = sectionTitle(page.margin, y, "TECHNICAL SKILLS");
for (const [label, value] of resume.skills) {
  text(page.margin, y, `${label}:`, 9.5, colors.ink, "F2");
  y = paragraph(page.margin + 112, y, value, { size: 9.2, lineHeight: 11.8, maxChars: 86 });
  y -= 1;
}

y -= 6;
y = sectionTitle(page.margin, y, "FEATURED PROJECTS");
for (const project of resume.projects) {
  text(page.margin, y, project.title, 10.5, colors.ink, "F2");
  y -= 13;
  text(page.margin, y, project.stack, 9.1, colors.accent, "F1");
  y -= 12;
  for (const bullet of project.bullets) {
    y = paragraph(page.margin, y, bullet, { size: 9.2, lineHeight: 12, maxChars: 109, bullet: true });
  }
  y -= 4;
}

y -= 2;
y = sectionTitle(page.margin, y, "RELEVANT EXPERIENCE");
for (const item of resume.experience) {
  text(page.margin, y, item.title, 10.5, colors.ink, "F2");
  text(470, y, item.period, 9.2, colors.muted, "F1");
  y -= 13;
  if (item.company) {
    text(page.margin, y, item.company, 9.1, colors.accent, "F1");
    y -= 12;
  }
  for (const bullet of item.bullets) {
    y = paragraph(page.margin, y, bullet, { size: 9.2, lineHeight: 12, maxChars: 109, bullet: true });
  }
  y -= 4;
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

