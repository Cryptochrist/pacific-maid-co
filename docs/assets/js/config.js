/* =============================================================================
   Pacific Maid Co. — Central Brand & Business Config
   -----------------------------------------------------------------------------
   ONE place to change brand, phone, pricing, and review numbers site-wide.
   Pages read these values via the small render helper in main.js (data-cfg="...")
   and the price estimator reads PRICING directly.
   Prototype values — verify domain availability, set the real phone/email, and
   confirm pricing with the market test before launch.
   ============================================================================= */
window.PMC = {
  brand: {
    name: "Pacific Maid Co.",
    shortName: "Pacific Maid",
    tagline: "San Diego’s trusted house cleaning — booked online in 60 seconds.",
    domain: "PacificMaidCo.com",
    // Prototype contact details — REPLACE before any real launch.
    phone: "(619) 555-0142",
    phoneHref: "tel:+16195550142",
    email: "hello@pacificmaidco.com",
    // Social proof — set to your real numbers as they accrue.
    reviewCount: "New",          // e.g. "120+" once you have them; "New" pre-launch
    reviewStars: "5.0",
    serviceArea: "San Diego County, CA",
  },

  // --- Trust signals (the #1 driver of 5-star reviews per research) ---
  trust: [
    "Insured &amp; bonded",
    "Background-checked cleaners",
    "Same cleaner every visit",
    "72-hour re-clean guarantee",
  ],

  /* ---------------------------------------------------------------------------
     PRICING — shown to customers as FLAT TIERS BY HOME SIZE (research: converts
     better than hourly and is competitive vs the SD market). Hourly is reserved
     internally for deep/move-out/estate scope.

     Three SERVICE TIERS map to the voice-note tiers:
       t1 "Essentials"  = customer provides chemicals + equipment (small discount)
       t2 "Signature"   = we provide all supplies & equipment (the default)
       t3 "Luxury"      = Signature + premium scents / finishing touches

     Prototype numbers below are calibrated to the SD benchmarks in RESEARCH.md
     (e.g. Bravo Maids: 1BR ~$170 std, 2BR2BA ~$250, 3BR2BA ~$280; deep ≈ 1.5x).
     The Tier-1 discount is intentionally SMALL (~$15) because supplies are a
     minor share of cost. CONFIRM all numbers with the local pricing test.
  --------------------------------------------------------------------------- */
  pricing: {
    currency: "$",
    // Base = Tier 2 "Signature" STANDARD clean, flat by home size.
    homeSizes: [
      { id: "studio", label: "Studio / 1 Bath", base: 170 },
      { id: "1br",    label: "1 Bed / 1 Bath",  base: 180 },
      { id: "2br1ba", label: "2 Bed / 1 Bath",  base: 200 },
      { id: "2br2ba", label: "2 Bed / 2 Bath",  base: 250 },
      { id: "3br2ba", label: "3 Bed / 2 Bath",  base: 290 },
      { id: "3br3ba", label: "3 Bed / 3 Bath",  base: 330 },
      { id: "4br",    label: "4 Bed / 3+ Bath", base: 390 },
    ],
    // Service type multipliers applied to the base flat rate.
    serviceTypes: [
      { id: "standard", label: "Standard Clean",  mult: 1.0,  desc: "Recurring upkeep for a maintained home." },
      { id: "deep",     label: "Deep Clean",      mult: 1.5,  desc: "Top-to-bottom reset. Recommended for first visits." },
      { id: "movein",   label: "Move In / Out",   mult: 1.6,  desc: "Empty-home detail for leases &amp; sales." },
      { id: "airbnb",   label: "Airbnb Turnover", mult: 0.95, desc: "Fast, checklist-driven STR resets." },
    ],
    // The three supply tiers (voice-note model). Adjustments are added to subtotal.
    tiers: [
      { id: "t1", label: "Essentials", adj: -15, desc: "You provide cleaning products &amp; equipment. A little lighter on price." },
      { id: "t2", label: "Signature",  adj: 0,   desc: "We bring all professional products &amp; equipment. Our most popular." , recommended: true },
      { id: "t3", label: "Luxury",     adj: 35,  desc: "Signature plus premium scents &amp; finishing touches for a fresh, welcoming home." },
    ],
    // Recurring discounts (research: weekly ~20%, biweekly ~15%, monthly ~10%).
    frequencies: [
      { id: "once",     label: "One-time",   discount: 0.0  },
      { id: "monthly",  label: "Monthly",    discount: 0.10 },
      { id: "biweekly", label: "Every 2 wks",discount: 0.15 },
      { id: "weekly",   label: "Weekly",     discount: 0.20 },
    ],
    // Internal-only premium hourly rate (NOT the customer default). For deep/estate quoting.
    hourlyPremium: 100,
    minHours: 2,
  },

  // --- Policies (from voice notes) — surfaced on Book + Terms pages ---
  policies: {
    cancellation: "Free to reschedule or cancel up to 24 hours before your appointment. Inside 24 hours a cancellation fee applies.",
    noRefund: "Payments are non-refundable, but we stand behind our work with a 72-hour re-clean guarantee — if something’s not right, we come back and make it right.",
    lockout: "If our cleaner can’t access your home within 30 minutes of arrival, the visit is treated as a same-day cancellation. We’ll offer 50% off to rebook.",
    safety: "For your cleaner’s safety, our booking terms ask you to confirm there are no unsecured animals or hazards in the home during the visit.",
    reEngage: "We’ll check in every 6 months with a reminder, and returning clients get a “we miss you” offer if it’s been a while.",
  },
};
