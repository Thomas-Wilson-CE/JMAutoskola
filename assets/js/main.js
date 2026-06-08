/* JM Autoškola — demo interactions */
(function () {
  "use strict";

  /* ---- sticky header shadow on scroll ---- */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const scrim = document.getElementById("scrim");
  const closeBtn = document.getElementById("mmClose");

  const open = () => {
    menu.classList.add("open");
    scrim.classList.add("open");
    burger.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    menu.classList.remove("open");
    scrim.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  burger.addEventListener("click", () => (menu.classList.contains("open") ? close() : open()));
  closeBtn.addEventListener("click", close);
  scrim.addEventListener("click", close);
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  /* ---- mobile menu accordion (expand sub-menus, mirroring desktop dropdowns) ---- */
  menu.querySelectorAll(".mm-parent").forEach((btn) => {
    btn.addEventListener("click", () => {
      const li = btn.closest(".mm-has-sub");
      const isOpen = li.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  /* ---- desktop dropdowns on touch / no-hover devices ----
     Mouse users open these purely on hover (CSS). Touch screens have no hover,
     so the first tap on a parent toggles its submenu instead of firing the
     link; a tap anywhere outside closes it. */
  const noHover = window.matchMedia("(hover: none)");
  document.querySelectorAll(".menu .has-sub > a").forEach((a) => {
    a.addEventListener("click", (e) => {
      if (!noHover.matches) return;
      e.preventDefault();
      const li = a.parentElement;
      const isOpen = li.classList.contains("open");
      document.querySelectorAll(".menu .has-sub.open").forEach((o) => o.classList.remove("open"));
      if (!isOpen) li.classList.add("open");
    });
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest(".menu .has-sub")) return;
    document.querySelectorAll(".menu .has-sub.open").forEach((o) => o.classList.remove("open"));
  });

  /* ---- scroll reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- smooth-scroll offset for sticky header on anchor clicks ---- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
})();
