/* =============================================================================
   Pacific Maid Co. — Shared header & footer injection
   Static-site approach (no build step): each page has
     <div data-include="header"></div> ... <div data-include="footer"></div>
   and this script fills them, so the nav/footer live in ONE place.
   Loaded BEFORE main.js so data-cfg/data-year bindings apply to injected markup.
   `data-active="services"` on the page <body> highlights the current nav item.
   ============================================================================= */
(function () {
  "use strict";

  // BASE makes links work from both root pages and /areas/<slug>.html.
  // Pages in a subfolder set <body data-base="../">; root pages omit it.
  var BASE = document.body.getAttribute('data-base') || '';

  var HEADER = ''
    + '<header class="site-header"><div class="container nav">'
    + '<a href="{B}index.html" class="brand">'
    +   '<svg class="logo-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    +     '<rect width="40" height="40" rx="10" fill="#0a6cba"/>'
    +     '<path d="M11 23c4-7 14-7 18 0" stroke="#16b8a6" stroke-width="2.5" stroke-linecap="round"/>'
    +     '<circle cx="20" cy="15" r="4" fill="#fff"/>'
    +     '<path d="M13 28c2 2 12 2 14 0" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>'
    +   '</svg><span data-cfg="brand.name">Pacific Maid Co.</span></a>'
    + '<nav><ul class="nav-links">'
    +   '<li><a href="{B}services.html" data-nav="services">Services</a></li>'
    +   '<li><a href="{B}pricing.html" data-nav="pricing">Pricing</a></li>'
    +   '<li><a href="{B}areas.html" data-nav="areas">Areas</a></li>'
    +   '<li><a href="{B}about.html" data-nav="about">About</a></li>'
    +   '<li><a href="{B}book.html" data-nav="book">Book</a></li>'
    + '</ul></nav>'
    + '<div class="nav-cta">'
    +   '<a class="nav-phone" data-cfg="brand.phone" data-cfg-attr="" href="#">Call</a>'
    +   '<a class="btn btn-primary" href="{B}book.html">Book now</a>'
    +   '<button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>'
    + '</div></div></header>';

  var FOOTER = ''
    + '<footer class="site-footer"><div class="container">'
    + '<div class="footer-grid">'
    +   '<div class="footer-brand"><div class="brand"><span data-cfg="brand.name">Pacific Maid Co.</span></div>'
    +     '<p>Trustworthy house cleaning across <span data-cfg="brand.serviceArea">San Diego County</span>. Insured, bonded, and background-checked.</p>'
    +     '<p><a data-cfg="brand.phone" data-cfg-attr="" href="#">Call us</a><br/>'
    +     '<a data-cfg="brand.email" data-cfg-attr="" href="#">hello@pacificmaidco.com</a></p></div>'
    +   '<div><h4>Services</h4>'
    +     '<a href="{B}services.html">Standard Clean</a><a href="{B}services.html">Deep Clean</a>'
    +     '<a href="{B}services.html">Move In / Out</a><a href="{B}services.html">Airbnb Turnover</a></div>'
    +   '<div><h4>Company</h4>'
    +     '<a href="{B}about.html">About us</a><a href="{B}pricing.html">Pricing</a>'
    +     '<a href="{B}areas.html">Service areas</a><a href="{B}book.html">Book online</a></div>'
    +   '<div><h4>Legal</h4>'
    +     '<a href="{B}terms.html">Terms of Service</a><a href="{B}policies.html">Cancellation policy</a>'
    +     '<a href="{B}privacy.html">Privacy</a></div>'
    + '</div>'
    + '<div class="footer-bottom">'
    +   '<span>&copy; <span data-year>2026</span> <span data-cfg="brand.name">Pacific Maid Co.</span> — Prototype. All rights reserved.</span>'
    +   '<span>Made in San Diego, CA</span>'
    + '</div></div></footer>';

  function withBase(html) { return html.split('{B}').join(BASE); }

  document.querySelectorAll('[data-include]').forEach(function (el) {
    var which = el.getAttribute('data-include');
    el.outerHTML = which === 'header' ? withBase(HEADER)
                 : which === 'footer' ? withBase(FOOTER)
                 : el.outerHTML;
  });

  // Highlight active nav item
  var active = document.body.getAttribute('data-active');
  if (active) {
    var link = document.querySelector('.nav-links [data-nav="' + active + '"]');
    if (link) link.style.color = 'var(--c-primary)';
  }
})();
