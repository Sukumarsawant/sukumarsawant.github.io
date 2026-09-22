document.addEventListener("DOMContentLoaded", () => {
  initOssSort();
  startTitleRotator();
  initNavScrollSpy();
});
  const scrollTopBtn = document.getElementById("scrollTopBtn");

function toggleMenu() {
  const navbarLinks = document.getElementById("navbarLinks");
  const hamburger = document.querySelector(".hamburger");
  const expanded = navbarLinks.classList.toggle("active");
  if (hamburger) {
    hamburger.setAttribute("aria-expanded", String(expanded));
  }
}

// Close mobile menu on link click
document.querySelectorAll(".pageLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarLinks = document.getElementById("navbarLinks");
    if (navbarLinks.classList.contains("active")) {
      navbarLinks.classList.remove("active");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn?.classList.add("visible");
    } else {
      scrollTopBtn?.classList.remove("visible");
    }
  });
});

let titleInterval;

function startTitleRotator() {
  const titles = [
    "a compiler & systems enthusiast.",
    "a gsoc '26 contributor at llvm.",
    "a software engineer.",
    "an open source developer.",
    "a competitive programmer.",
    "an ai/ml builder.",
    "a c++ & python developer."
  ];
  const el = document.querySelector(".fieldName");
  if (!el) return;
  if (titleInterval) clearInterval(titleInterval);
  let idx = 0;
  titleInterval = setInterval(() => {
    el.textContent = titles[idx];
    idx = (idx + 1) % titles.length;
  }, 2200);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden && titleInterval) clearInterval(titleInterval);
  else if (!document.hidden) startTitleRotator();
  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function initOssSort() {
  const root = document.getElementById("oss");
  const buttons = document.querySelectorAll("[data-oss-sort]");
  if (!root || !buttons.length) return;

  const original = root.innerHTML;
  let mode = "default";

  function setActive(next) {
    mode = next;
    buttons.forEach((btn) => {
      const on = btn.getAttribute("data-oss-sort") === next;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function renderSorted(key) {
    const items = Array.from(root.querySelectorAll(".ossItem"));
    if (!items.length) return;
    const other = key === "prs" ? "stars" : "prs";
    items.sort((a, b) => {
      const av = Number(a.getAttribute(`data-${key}`) || 0);
      const bv = Number(b.getAttribute(`data-${key}`) || 0);
      if (bv !== av) return bv - av;
      const a2 = Number(a.getAttribute(`data-${other}`) || 0);
      const b2 = Number(b.getAttribute(`data-${other}`) || 0);
      if (b2 !== a2) return b2 - a2;
      return (a.querySelector(".ossRepo")?.textContent || "").localeCompare(
        b.querySelector(".ossRepo")?.textContent || ""
      );
    });
    const label = key === "prs" ? "Sorted by Contributions / PRs" : "Sorted by GitHub Stars";
    const category = document.createElement("div");
    category.className = "ossCategory";
    category.innerHTML = `<div class="ossCategoryName">${label}</div><div class="ossList"></div>`;
    items.forEach((item) => category.querySelector(".ossList").appendChild(item));
    root.replaceChildren(category);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-oss-sort") || "default";
      if (next === mode) return;
      root.innerHTML = original;
      setActive(next);
      if (next !== "default") renderSorted(next);
    });
  });
}

function initNavScrollSpy() {
  const sections = document.querySelectorAll("main > div[id]");
  const navLinks = document.querySelectorAll(".pageLinks a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (current && link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

