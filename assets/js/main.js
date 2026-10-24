(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  /* mobile drawer (breakpoint 768px, same as CSS) */
  var toggle = document.querySelector(".menu-toggle");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.querySelector(".mob-overlay");
  var closeBtn = document.querySelector(".mob-close");
  var lastFocus = null;

  function setDrawer(open) {
    if (!drawer || !toggle) { return; }
    drawer.classList.toggle("open", open);
    if (overlay) { overlay.classList.toggle("open", open); }
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    root.style.overflow = open ? "hidden" : "";
    if (open) {
      lastFocus = document.activeElement;
      if (closeBtn) { closeBtn.focus(); }
    } else if (lastFocus) {
      lastFocus.focus();
    }
  }
  if (toggle && drawer) {
    drawer.setAttribute("aria-hidden", "true");
    toggle.addEventListener("click", function () { setDrawer(!drawer.classList.contains("open")); });
    if (closeBtn) { closeBtn.addEventListener("click", function () { setDrawer(false); }); }
    if (overlay) { overlay.addEventListener("click", function () { setDrawer(false); }); }
    drawer.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { setDrawer(false); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) { setDrawer(false); }
    });
    var mq = window.matchMedia("(min-width: 769px)");
    var onMq = function () { if (mq.matches && drawer.classList.contains("open")) { setDrawer(false); } };
    if (mq.addEventListener) { mq.addEventListener("change", onMq); } else if (mq.addListener) { mq.addListener(onMq); }
  }

  /* desktop dropdown: Escape closes by blurring */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var f = document.activeElement;
      if (f && f.closest && f.closest(".has-drop") && f.blur) { f.blur(); }
    }
  });

  /* FAQ accordion: max-height toggle, content stays in the DOM */
  var items = document.querySelectorAll(".faq-item");
  Array.prototype.forEach.call(items, function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    if (!btn || !panel) { return; }
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".faq-q[aria-expanded='true']"), function (b) {
      var p = b.parentNode.querySelector(".faq-a");
      if (p) { p.style.maxHeight = p.scrollHeight + "px"; }
    });
  });
})();
