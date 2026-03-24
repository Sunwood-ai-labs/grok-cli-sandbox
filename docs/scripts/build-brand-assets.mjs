import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(docsDir, "..");
const assetsDir = path.join(repoRoot, "assets");
const publicDir = path.join(docsDir, "public");

const theme = {
  ink: "#10233f",
  slate: "#4d6079",
  sky: "#6fd2ff",
  mint: "#8af1c7",
  amber: "#ffcd6b",
  panel: "#ecf6ff",
  white: "#ffffff"
};

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(targetPath, contents) {
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, contents);
}

function copyFile(sourcePath, targetPath) {
  ensureDir(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
}

function renderPng(svg, width, outputPath) {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width
    }
  });
  writeFile(outputPath, resvg.render().asPng());
}

const markSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="80" y1="64" x2="432" y2="448" gradientUnits="userSpaceOnUse">
      <stop stop-color="${theme.sky}" />
      <stop offset="1" stop-color="${theme.mint}" />
    </linearGradient>
    <linearGradient id="glass" x1="164" y1="120" x2="364" y2="344" gradientUnits="userSpaceOnUse">
      <stop stop-color="${theme.white}" stop-opacity="0.96" />
      <stop offset="1" stop-color="${theme.panel}" stop-opacity="0.9" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="${theme.ink}" />
  <circle cx="392" cy="120" r="56" fill="${theme.amber}" opacity="0.95" />
  <rect x="88" y="104" width="240" height="304" rx="48" fill="url(#glass)" />
  <rect x="120" y="144" width="176" height="24" rx="12" fill="${theme.sky}" opacity="0.65" />
  <rect x="120" y="196" width="128" height="20" rx="10" fill="${theme.slate}" opacity="0.3" />
  <rect x="120" y="236" width="148" height="20" rx="10" fill="${theme.slate}" opacity="0.22" />
  <rect x="120" y="276" width="112" height="20" rx="10" fill="${theme.slate}" opacity="0.18" />
  <path d="M328 264C328 219.817 363.817 184 408 184H424V264C424 308.183 388.183 344 344 344H328V264Z" fill="url(#bg)" />
  <path d="M360 152L388 124" stroke="${theme.white}" stroke-width="18" stroke-linecap="round" />
  <path d="M404 180L444 148" stroke="${theme.white}" stroke-width="18" stroke-linecap="round" />
  <path d="M424 228H472" stroke="${theme.white}" stroke-width="18" stroke-linecap="round" />
  <circle cx="200" cy="360" r="28" fill="${theme.amber}" />
  <circle cx="252" cy="360" r="14" fill="${theme.slate}" opacity="0.28" />
</svg>
`;

const heroSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hero-bg" x1="120" y1="60" x2="1450" y2="820" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0E1F39" />
      <stop offset="0.55" stop-color="#183961" />
      <stop offset="1" stop-color="#0A152A" />
    </linearGradient>
    <linearGradient id="hero-glow" x1="960" y1="160" x2="1320" y2="560" gradientUnits="userSpaceOnUse">
      <stop stop-color="${theme.sky}" />
      <stop offset="1" stop-color="${theme.mint}" />
    </linearGradient>
  </defs>
  <rect width="1600" height="900" rx="56" fill="url(#hero-bg)" />
  <circle cx="1290" cy="160" r="72" fill="${theme.amber}" />
  <circle cx="1220" cy="660" r="220" fill="${theme.sky}" opacity="0.12" />
  <circle cx="1400" cy="300" r="180" fill="${theme.mint}" opacity="0.14" />
  <rect x="86" y="114" width="620" height="672" rx="48" fill="${theme.white}" fill-opacity="0.96" />
  <rect x="132" y="172" width="186" height="22" rx="11" fill="${theme.sky}" fill-opacity="0.65" />
  <rect x="132" y="230" width="420" height="22" rx="11" fill="${theme.slate}" fill-opacity="0.18" />
  <rect x="132" y="276" width="388" height="22" rx="11" fill="${theme.slate}" fill-opacity="0.16" />
  <rect x="132" y="322" width="320" height="22" rx="11" fill="${theme.slate}" fill-opacity="0.14" />
  <rect x="132" y="394" width="240" height="172" rx="28" fill="#F0F9FF" />
  <rect x="396" y="394" width="240" height="172" rx="28" fill="#F3FDF8" />
  <rect x="132" y="592" width="504" height="126" rx="28" fill="#F7FAFC" />
  <path d="M1058 336C1058 255.366 1123.37 190 1204 190H1230V336C1230 416.634 1164.63 482 1084 482H1058V336Z" fill="url(#hero-glow)" />
  <path d="M1122 132L1174 84" stroke="${theme.white}" stroke-width="24" stroke-linecap="round" />
  <path d="M1210 182L1280 126" stroke="${theme.white}" stroke-width="24" stroke-linecap="round" />
  <path d="M1242 268H1330" stroke="${theme.white}" stroke-width="24" stroke-linecap="round" />
  <g font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" fill="${theme.white}">
    <text x="820" y="412" font-size="88" font-weight="700">Grok Sandbox</text>
    <text x="820" y="480" font-size="34" font-weight="500" fill="#D7E9FF">Public wrapper repo for verified Grok CLI experiments</text>
    <text x="820" y="548" font-size="26" font-weight="500" fill="#B3CBE8">bilingual docs, Telegram helper notes, and a pinned submodule snapshot</text>
  </g>
</svg>
`;

const socialSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="social-glow" x1="712" y1="320" x2="934" y2="628" gradientUnits="userSpaceOnUse">
      <stop stop-color="${theme.sky}" />
      <stop offset="1" stop-color="${theme.mint}" />
    </linearGradient>
  </defs>
  <rect width="1600" height="900" rx="56" fill="#0C1B33" />
  <rect x="82" y="82" width="1436" height="736" rx="48" fill="#13294A" />
  <rect x="120" y="120" width="552" height="552" rx="52" fill="#F4FBFF" />
  <path d="M698 466C698 376.53 770.53 304 860 304H888V466C888 555.47 815.47 628 726 628H698V466Z" fill="url(#social-glow)" />
  <circle cx="940" cy="180" r="58" fill="${theme.amber}" />
  <path d="M774 228L820 184" stroke="${theme.white}" stroke-width="22" stroke-linecap="round" />
  <path d="M852 268L916 218" stroke="${theme.white}" stroke-width="22" stroke-linecap="round" />
  <path d="M888 346H970" stroke="${theme.white}" stroke-width="22" stroke-linecap="round" />
  <g font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" fill="${theme.white}">
    <text x="960" y="470" font-size="92" font-weight="700">Grok Sandbox</text>
    <text x="960" y="548" font-size="34" font-weight="500" fill="#D7E9FF">Verified notes, Telegram helper glue, and bilingual docs</text>
    <text x="960" y="612" font-size="28" font-weight="500" fill="#B8D1EC">Public wrapper repository around a pinned Grok CLI snapshot</text>
  </g>
</svg>
`;

const markPath = path.join(assetsDir, "grok-sandbox-mark.svg");
const heroPath = path.join(assetsDir, "grok-sandbox-hero.svg");
const socialSvgPath = path.join(assetsDir, "grok-sandbox-social.svg");

writeFile(markPath, markSvg);
writeFile(heroPath, heroSvg);
writeFile(socialSvgPath, socialSvg);
copyFile(markPath, path.join(publicDir, "grok-sandbox-mark.svg"));
copyFile(heroPath, path.join(publicDir, "grok-sandbox-hero.svg"));
copyFile(markPath, path.join(publicDir, "favicon.svg"));
copyFile(socialSvgPath, path.join(publicDir, "grok-sandbox-social.svg"));
renderPng(socialSvg, 1600, path.join(publicDir, "grok-sandbox-social.png"));
