#!/usr/bin/env node
/* =============================================================================
   Pacific Maid Co. — Neighborhood SEO page generator
   -----------------------------------------------------------------------------
   Reads neighborhoods.json and writes:
     - site/areas/<slug>.html        (one SEO landing page per neighborhood)
     - site/areas.html               (the service-area index)
     - site/sitemap.xml              (all pages, for Search Console)

   Run from anywhere:   node site/build/generate.js
   Re-run any time you edit neighborhoods.json or the templates below.

   SEO notes (from RESEARCH.md): each page gets a unique <title>, H1
   "House Cleaning in <Neighborhood>", the neighborhood name woven in 3–4x,
   LocalBusiness + Service schema, and internal links to 3 adjacent areas.
   ============================================================================= */
const fs = require("fs");
const path = require("path");

const SITE = path.resolve(__dirname, "..");                  // .../site
const AREAS_DIR = path.join(SITE, "areas");
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "neighborhoods.json"), "utf8"));
const HOODS = DATA.neighborhoods;
const DOMAIN = "https://pacificmaidco.com";

// --- shared bits -----------------------------------------------------------
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />`;

// Pages in /areas/ need ../ to reach root assets & pages.
function neighborhoodPage(h, adjacents) {
  const title = `House Cleaning in ${h.name}, San Diego | Pacific Maid Co.`;
  const desc = `Professional house cleaning in ${h.name}, San Diego — ${h.blurb}. Flat-rate pricing, book online in 60 seconds, insured & background-checked cleaners. 72-hour re-clean guarantee.`;
  const url = `${DOMAIN}/areas/${h.slug}.html`;
  const adjLinks = adjacents.map(a => `<a class="chip" href="${a.slug}.html">${a.name}</a>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  ${FONTS}
  <link rel="stylesheet" href="../assets/css/styles.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HouseCleaningService",
    "name": "Pacific Maid Co. — ${h.name}",
    "url": "${url}",
    "telephone": "+1-619-555-0142",
    "priceRange": "$$",
    "areaServed": { "@type": "Place", "name": "${h.name}, San Diego, CA" },
    "address": { "@type": "PostalAddress", "addressLocality": "San Diego", "addressRegion": "CA", "addressCountry": "US" },
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": "House cleaning in ${h.name}", "serviceType": "House Cleaning" }
    }
  }
  </script>
</head>
<body data-active="areas" data-base="../">
  <div data-include="header"></div>

  <section class="page-hero">
    <div class="container">
      <p class="breadcrumb"><a href="../index.html">Home</a> / <a href="../areas.html">Areas</a> / ${h.name}</p>
      <span class="pill">${h.region} • San Diego</span>
      <h1 style="margin-top:12px">House Cleaning in ${h.name}</h1>
      <p class="lead">Trusted, insured house cleaning for ${h.name} — ${h.blurb}. See your flat-rate price and book online in 60 seconds.</p>
      <div style="margin-top:18px"><a class="btn btn-primary btn-lg" href="../book.html">Get my ${h.name} price →</a></div>
    </div>
  </section>

  <section>
    <div class="container prose">
      <p>Looking for reliable house cleaning in <strong>${h.name}</strong>? Pacific Maid Co. brings the same trusted, background-checked cleaner to your ${h.name} home every visit — on time, every time. Whether you’re in ${h.blurb}, we make booking effortless: pick your home size, see a transparent flat rate, choose a slot, and you’re done. No “request a quote,” no waiting for a callback.</p>

      <h2>Cleaning services we offer in ${h.name}</h2>
      <ul>
        <li><strong>Standard cleaning</strong> — recurring upkeep to keep your ${h.name} home fresh.</li>
        <li><strong>Deep cleaning</strong> — a top-to-bottom reset, perfect for first visits.</li>
        <li><strong>Move-in / move-out cleaning</strong> — get deposits back and listings show-ready.</li>
        <li><strong>Airbnb &amp; short-term rental turnovers</strong> — fast, reliable resets between guests.</li>
      </ul>

      <h2>Why ${h.name} homeowners choose Pacific Maid Co.</h2>
      <p>Our ${h.name} clients stay with us because of the things that actually matter: cleaners who show up on time, the same friendly pro each visit, honest flat-rate pricing with no hidden fees, and a 72-hour re-clean guarantee. Every cleaner is W-2 employed, background-checked, insured, and bonded — so you can feel completely at ease leaving them in your ${h.name} home.</p>
    </div>
  </section>

  <section class="section-soft">
    <div class="container center">
      <h2>Also serving nearby</h2>
      <div class="seg" style="justify-content:center;margin-top:18px">${adjLinks}</div>
      <div style="margin-top:28px"><a class="btn btn-primary btn-lg" href="../book.html">Book a cleaning in ${h.name} →</a></div>
    </div>
  </section>

  <div data-include="footer"></div>
  <script src="../assets/js/config.js"></script>
  <script src="../assets/js/partials.js"></script>
  <script src="../assets/js/main.js"></script>
</body>
</html>
`;
}

function areasIndex() {
  // Group by region for a scannable index.
  const byRegion = {};
  HOODS.forEach(h => { (byRegion[h.region] = byRegion[h.region] || []).push(h); });
  const groups = Object.keys(byRegion).sort().map(region => {
    const items = byRegion[region].map(h => `<a class="chip" href="areas/${h.slug}.html">${h.name}</a>`).join("");
    return `<div style="margin-bottom:26px"><h3>${region}</h3><div class="seg" style="margin-top:10px">${items}</div></div>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>San Diego Areas We Serve | Pacific Maid Co. House Cleaning</title>
  <meta name="description" content="Pacific Maid Co. provides house cleaning across ${HOODS.length}+ San Diego neighborhoods — La Jolla, North Park, Chula Vista, Coronado and more. Find your area and book online." />
  <link rel="canonical" href="${DOMAIN}/areas.html" />
  ${FONTS}
  <link rel="stylesheet" href="assets/css/styles.css" />
</head>
<body data-active="areas">
  <div data-include="header"></div>
  <section class="page-hero">
    <div class="container">
      <p class="breadcrumb"><a href="index.html">Home</a> / Areas</p>
      <h1>Serving homes across San Diego County</h1>
      <p class="lead">We clean in ${HOODS.length}+ San Diego neighborhoods. Find yours below — or just book online and enter your address.</p>
    </div>
  </section>
  <section>
    <div class="container">${groups}
      <div class="center" style="margin-top:20px"><a class="btn btn-primary btn-lg" href="book.html">Get my price →</a></div>
    </div>
  </section>
  <div data-include="footer"></div>
  <script src="assets/js/config.js"></script>
  <script src="assets/js/partials.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
`;
}

function sitemap() {
  const core = ["", "services.html", "pricing.html", "areas.html", "about.html", "book.html"];
  const urls = core.map(p => `  <url><loc>${DOMAIN}/${p}</loc></url>`)
    .concat(HOODS.map(h => `  <url><loc>${DOMAIN}/areas/${h.slug}.html</loc></url>`));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

// --- run -------------------------------------------------------------------
if (!fs.existsSync(AREAS_DIR)) fs.mkdirSync(AREAS_DIR, { recursive: true });

HOODS.forEach((h, i) => {
  // pick 3 adjacents: same region first, then wrap around the list
  const sameRegion = HOODS.filter(x => x.region === h.region && x.slug !== h.slug);
  const others = HOODS.filter(x => x.slug !== h.slug && x.region !== h.region);
  const adj = sameRegion.concat(others).slice(0, 3);
  fs.writeFileSync(path.join(AREAS_DIR, `${h.slug}.html`), neighborhoodPage(h, adj));
});
fs.writeFileSync(path.join(SITE, "areas.html"), areasIndex());
fs.writeFileSync(path.join(SITE, "sitemap.xml"), sitemap());

console.log(`✓ Generated ${HOODS.length} neighborhood pages in /areas`);
console.log(`✓ Wrote areas.html and sitemap.xml`);
