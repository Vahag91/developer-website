/* Fills placeholders from assets/site.config.js, marks the active nav link,
   enables copy-to-clipboard buttons, and tracks the table of contents. */
(function () {
  var S = window.SITE || {};

  // Text fields: <span data-site="name"></span>
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = S[el.getAttribute("data-site")];
    if (v) el.textContent = v;
  });
  // Links: <a data-site-href="supportEmail" data-scheme="mailto">
  document.querySelectorAll("[data-site-href]").forEach(function (el) {
    var v = S[el.getAttribute("data-site-href")];
    if (!v) return;
    var scheme = el.getAttribute("data-scheme");
    el.setAttribute("href", scheme ? scheme + ":" + v : v);
  });
  // Hide blocks whose config value is empty (e.g. phone)
  document.querySelectorAll("[data-site-if]").forEach(function (el) {
    if (!S[el.getAttribute("data-site-if")]) el.hidden = true;
  });

  // Title: replace "Your Studio" in the document title if the name was changed
  if (S.name && document.title.indexOf("Diana Zohrabyan") !== -1 && S.name !== "Diana Zohrabyan") {
    document.title = document.title.replace("Diana Zohrabyan", S.name);
  }

  // Copyright year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Active nav
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var raw = (a.getAttribute("href") || "").toLowerCase();
    if (raw.indexOf("#") !== -1) return; // anchor links never count as the current page
    if (raw && raw === page) a.setAttribute("aria-current", "page");
  });

  // Copy buttons
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.textContent.trim();
      var done = function () { var old = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = old; }, 1600); };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents(target);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        try { document.execCommand("copy"); done(); } catch (e) {}
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
    });
  });

  // Table of contents highlighting
  var tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("active"); });
          var a = map[e.target.id]; if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) obs.observe(el); });
  }
})();
