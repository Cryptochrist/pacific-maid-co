# Pacific Maid Co. — Prototype Website

Static marketing + booking-prototype site for a San Diego house cleaning company.
Built to be deployed free on **GitHub Pages** to share the beta with founders.

> **Status:** Prototype / beta. Brand name "Pacific Maid Co." is a working name — verify
> domain availability before committing. Pricing, policies, and legal pages are drafts
> pending market test + attorney/insurance review (see `../RESEARCH.md`).

---

## What's here

```
site/
├── index.html              Home — hero, instant price estimator, services, reviews, CTA
├── services.html           Services + the 3 supply tiers
├── pricing.html            Flat-rate table + tier/frequency cards (rendered from config)
├── book.html               Booking flow: estimator + details form + safety/ToS consent
├── about.html              About / trust page
├── areas.html              Service-area index (generated)
├── areas/<slug>.html       38 neighborhood SEO landing pages (generated)
├── terms.html              Terms of Service (DRAFT — needs attorney review)
├── policies.html           Cancellation / lockout / safety policies (DRAFT)
├── privacy.html            Privacy policy (DRAFT)
├── 404.html                Friendly not-found page
├── sitemap.xml             All URLs (generated)
├── robots.txt              Crawl rules
├── .nojekyll               Tells GitHub Pages to serve files as-is
├── assets/
│   ├── css/styles.css      Design system (trustworthy & clean: blues + whites)
│   └── js/
│       ├── config.js       ⭐ ONE place for brand, phone, pricing, policies
│       ├── partials.js     Shared header/footer injection (base-aware)
│       ├── main.js         Config binding + mobile nav
│       └── estimator.js    Instant flat-rate price estimator
└── build/
    ├── neighborhoods.json  The 38 neighborhoods (edit this to add/remove)
    └── generate.js         Regenerates area pages + areas.html + sitemap.xml
```

### Changing the brand, phone, or prices
Edit **`assets/js/config.js`** — it's the single source of truth. The brand name, phone,
email, review count, the full pricing model (home sizes, service types, supply tiers,
recurring discounts), and policy text all live there and propagate everywhere.

### Adding / editing neighborhoods (SEO pages)
1. Edit `build/neighborhoods.json`.
2. Run `node site/build/generate.js`.
   This regenerates every `areas/*.html`, `areas.html`, and `sitemap.xml`.

---

## Run locally

It's static — any static server works. From the repo root:

```bash
# Python
python -m http.server 8080 --directory site
# or Node (npx)
npx serve site
```

Then open http://localhost:8080. (Opening files directly with `file://` mostly works,
but a server is recommended so the shared header/footer fetch and paths behave.)

---

## Deploy to GitHub Pages (free beta hosting)

1. Create a repo and push this project.
2. **Settings → Pages →** Source: *Deploy from a branch*. Pick your branch and set the
   folder to **`/site`** (or move `site/`'s contents to repo root and pick `/root`).
3. Save. Your beta is live at `https://<user>.github.io/<repo>/`.
4. (Optional) Add a custom domain (`PacificMaidCo.com`) under **Pages → Custom domain**;
   create a `CNAME` file and point DNS per GitHub's instructions.

`.nojekyll` is included so Pages serves the `build/` and `assets/` folders untouched.

> **Path note:** the site uses relative links and works under a `/<repo>/` subpath, **except**
> `404.html` uses absolute (`/...`) paths (GitHub serves it from the domain root). If you
> deploy under a subpath and want a perfect 404, swap its `/assets`→`assets` etc., or use a
> custom domain at the root.

---

## What's a prototype stub vs. real (production roadmap)

This beta demonstrates the **funnel and UX**. These pieces are intentionally stubbed and
need wiring before taking real money or bookings:

| Area | Prototype now | Production target |
|---|---|---|
| **Booking calendar** | Static form, fake confirmation | Real-time availability + slot selection (Launch27/Jobber/BookingKoala or custom) |
| **Payments** | None | **Stripe** Checkout / Payment Element; deposit-at-booking flow |
| **Price engine** | Client-side estimate from config | Server-validated quote, taxes, add-ons |
| **AI support agent** | — | Chat widget (Claude/Tidio/Intercom) answering price/availability + dropping a booking link |
| **AI calling agent** | — | Synthflow/Vapi inbound calls reading the live calendar |
| **Reminders** | — | Confirmation + appointment reminders (SMS/email) |
| **Reviews** | Sample testimonials | Post-clean review-request automation + incentive program |
| **Retention** | Policy copy only | 6-month re-engagement + "we miss you" at 2 weeks (per business plan) |
| **Forms backend** | Console only | Form handler (Formspree/Netlify/serverless) → CRM |

---

## ⚠️ Before launch — blocking items (from research)

- **Worker classification:** plan is **W-2 employees** (an agency can't legitimately use
  1099 cleaners in CA under AB5). Budget payroll tax + **mandatory workers' comp**.
- **Cross-border workers:** only lawful if each worker **already holds US work
  authorization**; I-9 every hire. Confirm with an immigration attorney.
- **Pricing:** $100/hr is above SD market — site uses **flat tiers by home size** (the
  internal $100/hr premium rate is in config, not the customer default). Run a local
  price test before locking the rate card.
- **Legal pages** (`terms`, `policies`, `privacy`) are **drafts** — CA limits liability
  waivers (Civ. Code §§1668, 3342; *City of Santa Barbara*). Have an attorney finalize.
- **Insurance/bonding:** general liability + janitorial bond + workers' comp + (commercial
  auto if vehicles). Google LSA "Google Guaranteed" requires proof of insurance.

See `../RESEARCH.md` for the full, cited findings and `../NOTES.md` for the parsed brief.
