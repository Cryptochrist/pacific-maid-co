/* =============================================================================
   Pacific Maid Co. — Shared site behavior
   - Injects brand/config values into the DOM (data-cfg attributes)
   - Mobile nav toggle
   - Footer year
   ============================================================================= */
(function () {
  "use strict";
  var C = window.PMC;
  if (!C) return;

  /* ---- Resolve a dotted path like "brand.name" against the config ---- */
  function resolve(path) {
    return path.split(".").reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, C);
  }

  /* ---- Inject config values: <span data-cfg="brand.phone"></span> ----
     data-cfg-attr="href" sets an attribute instead of text content.        */
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var val = resolve(el.getAttribute("data-cfg"));
    if (val == null) return;
    var attr = el.getAttribute("data-cfg-attr");
    if (attr) el.setAttribute(attr, val);
    else el.innerHTML = val;
  });

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }
})();
