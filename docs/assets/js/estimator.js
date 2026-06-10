/* =============================================================================
   Pacific Maid Co. — Instant Price Estimator
   Renders the flat-rate-by-home-size estimator from PMC.pricing and computes a
   live price. This is the conversion centerpiece (research: customers prefer
   flat-rate; instant pricing is the booking-UX differentiator vs the boutique
   tier that hides prices behind callback forms).

   Price model:
     subtotal = homeSize.base * serviceType.mult
     subtotal += supplyTier.adj           (Essentials -$15 / Signature 0 / Luxury +$35)
     total    = round( subtotal * (1 - frequency.discount) )
   Shown as an estimate; final price confirmed at booking.
   ============================================================================= */
(function () {
  "use strict";
  var C = window.PMC;
  var root = document.getElementById("estimator");
  if (!C || !root) return;
  var P = C.pricing;

  // --- State (defaults: most popular path) ---
  var state = {
    size: P.homeSizes[3].id,      // 2BR/2BA
    type: P.serviceTypes[0].id,   // Standard
    tier: "t2",                   // Signature
    freq: "once",
  };

  // --- Helpers ---
  function find(arr, id) { return arr.filter(function (x) { return x.id === id; })[0]; }
  function money(n) { return P.currency + Math.round(n).toLocaleString(); }

  function compute() {
    var size = find(P.homeSizes, state.size);
    var type = find(P.serviceTypes, state.type);
    var tier = find(P.tiers, state.tier);
    var freq = find(P.frequencies, state.freq);
    var subtotal = size.base * type.mult + tier.adj;
    var total = subtotal * (1 - freq.discount);
    return { total: total, saved: subtotal - total, freq: freq };
  }

  // --- Build a segmented control ---
  function segment(label, items, key, useLabelField) {
    var lf = useLabelField || "label";
    var wrap = document.createElement("div");
    wrap.className = "field";
    var lab = document.createElement("label");
    lab.textContent = label;
    wrap.appendChild(lab);
    var seg = document.createElement("div");
    seg.className = "seg";
    items.forEach(function (it) {
      var b = document.createElement("button");
      b.type = "button";
      b.innerHTML = it[lf];
      b.setAttribute("aria-pressed", state[key] === it.id ? "true" : "false");
      b.addEventListener("click", function () {
        state[key] = it.id;
        seg.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        render();
      });
      seg.appendChild(b);
    });
    wrap.appendChild(seg);
    return wrap;
  }

  // --- Home size as a <select> (7 options is a lot of chips) ---
  function sizeSelect() {
    var wrap = document.createElement("div");
    wrap.className = "field";
    var lab = document.createElement("label");
    lab.textContent = "Home size";
    var sel = document.createElement("select");
    sel.className = "field-select";
    P.homeSizes.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.id; o.textContent = s.label;
      if (s.id === state.size) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () { state.size = sel.value; render(); });
    wrap.appendChild(lab); wrap.appendChild(sel);
    return wrap;
  }

  // --- Result panel (updated in place) ---
  var resultEl;
  function buildResult() {
    resultEl = document.createElement("div");
    resultEl.className = "est-result";
    resultEl.setAttribute("aria-live", "polite");
    return resultEl;
  }
  function renderResult() {
    var r = compute();
    var savedLine = r.saved > 0
      ? '<div class="est-note">You save ' + money(r.saved) + ' with ' + r.freq.label.toLowerCase() + ' service</div>'
      : '<div class="est-note">Switch to recurring service and save up to 20%</div>';
    resultEl.innerHTML =
      '<div class="est-price">' + money(r.total) + ' <small>est.</small></div>' +
      savedLine +
      '<a class="btn btn-accent btn-block" style="margin-top:14px" href="book.html">Book this clean →</a>' +
      '<div class="est-note">Final price confirmed at checkout. 2-hour minimum.</div>';
  }

  // --- Full (re)render of controls only happens once; result re-renders on change ---
  var built = false;
  function render() {
    if (!built) {
      root.innerHTML =
        '<h3>💧 Instant price estimate</h3>' +
        '<p class="est-sub">No “we’ll call you.” See your price, then book in 60 seconds.</p>';
      root.appendChild(sizeSelect());
      root.appendChild(segment("Cleaning type", P.serviceTypes, "type"));
      root.appendChild(segment("Supplies tier", P.tiers, "tier"));
      root.appendChild(segment("How often", P.frequencies, "freq"));
      root.appendChild(buildResult());
      built = true;
    }
    renderResult();
  }

  render();
})();
