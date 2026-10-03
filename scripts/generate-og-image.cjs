// One-shot script: composes public/og-image.png (1200x630) from brand assets.
const sharp = require("sharp");
const path = require("path");

const W = 1200;
const H = 630;

const bg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fffbf3"/>
      <stop offset="1" stop-color="#f6edf6"/>
    </linearGradient>
    <radialGradient id="violet" cx="0.18" cy="0.22" r="0.55">
      <stop offset="0" stop-color="#833af0" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#833af0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="magenta" cx="0.85" cy="0.28" r="0.55">
      <stop offset="0" stop-color="#dd47d6" stop-opacity="0.38"/>
      <stop offset="1" stop-color="#dd47d6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orange" cx="0.5" cy="1.05" r="0.6">
      <stop offset="0" stop-color="#ff7527" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#ff7527" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#base)"/>
  <rect width="${W}" height="${H}" fill="url(#violet)"/>
  <rect width="${W}" height="${H}" fill="url(#magenta)"/>
  <rect width="${W}" height="${H}" fill="url(#orange)"/>
</svg>`);

(async () => {
  const logoPath = path.join(__dirname, "..", "src", "assets", "brandlux-logo-transparent.png");
  const logoW = 560;
  const logo = await sharp(logoPath).resize(logoW).toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const logoTop = Math.round((H - logoMeta.height) / 2) - 40;
  const logoLeft = Math.round((W - logoW) / 2);

  const tagline = Buffer.from(`
<svg width="${W}" height="80" xmlns="http://www.w3.org/2000/svg">
  <text x="600" y="40" text-anchor="middle" font-family="DejaVu Sans, Verdana, sans-serif"
        font-size="34" font-weight="bold" letter-spacing="8" fill="#5d5673">
    YOUR BRAND, RADIANT.
  </text>
</svg>`);

  await sharp(bg)
    .composite([
      { input: logo, top: logoTop, left: logoLeft },
      { input: tagline, top: H - 110, left: 0 },
    ])
    .png({ quality: 90 })
    .toFile(path.join(__dirname, "..", "public", "og-image.png"));

  console.log("og-image.png written:", W + "x" + H);
})();
