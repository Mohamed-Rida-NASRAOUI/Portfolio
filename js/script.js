document.documentElement.classList.add('js');
const mainEl=document.querySelector('main');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const EN = {
 skip:"Skip to content","nav.about":"About","nav.exp":"Experience","nav.proj":"Projects","nav.skills":"Skills","nav.engage":"Community","nav.contact":"Contact",
 "hero.role":"Computer Science student · Systems, networks and infrastructure",
 "hero.intro":"Second-year student at ECE Bordeaux (AI Developer track). I am looking for a 2.5-month internship starting late May 2027 to contribute to an IT team’s missions.",
 "hero.cta1":"See my projects","hero.cta2":"Contact me",
 "about.title":"About",
 "about.p1":"I have been studying for a Bachelor’s degree in Computer Science at ECE Bordeaux since 2025. My track focuses on artificial intelligence, but I am most interested in how systems, networks and infrastructure work.",
 "about.p2":"My systems engineer internship at Orange Business introduced me to running a critical service. I want to deepen these topics, with rigour and as part of a team.",
 "exp.title":"Experience","exp.role":"Systems engineer intern · Orange Business","exp.meta":"Pessac · June – September 2026 · hybrid",
 "exp.b1":"Monitoring of operations activities on a critical payment scope",
 "exp.b2":"Participation in ticket review meetings via OSM and ServiceNow",
 "exp.b3":"Follow-up of production deployments",
 "exp.b4":"Informing L1 support at the start and end of operations",
 "exp.b5":"Log searches and investigations using Grafana",
 "exp.b6":"Discovery of CAV, Azure, HAProxy, web servers and databases",
 "exp.b7":"Understanding of service continuity, redundancy, rollback and BCP/DRP",
 "proj.title":"Projects","proj.note":"Projects completed as part of my studies. Links will be added once the repositories can be made public.",
 "p1.t":"Cinema database (MongoDB)","p1.d":"Workshop on modelling and querying a film database with MongoDB Compass: films, people, comments and users collections.",
 "p2.t":"School management (Java)","p2.d":"Object-oriented programming assignment in Java: a console application organised into packages, built with IntelliJ.",
 "skills.title":"Skills","s1":"Programming","s2":"Systems","s3":"Networks","s4":"Operations","s5":"Infrastructure","s6":"Tools",
 "lvl.i":"intermediate","lvl.n":"basics","lvl.d":"discovered during internship",
 "lang.note":"Languages: French (fluent), English (intermediate), Arabic (native).",
 "engage.title":"Community","engage.p":"Volunteer at Linkee. Description to be completed before publication.",
 "contact.title":"Contact","contact.p":"I am available for an internship starting late May 2027.","contact.cv":"Download my CV"
};
const els = document.querySelectorAll("[data-i18n]");
els.forEach(e => e.dataset.fr = e.textContent);
const btn = document.getElementById("lang");
function applyLang(l){
  document.documentElement.lang = l;
  els.forEach(e => e.textContent = l === "en" ? (EN[e.dataset.i18n] ?? e.dataset.fr) : e.dataset.fr);
  btn.textContent = l === "en" ? "FR" : "EN";
  document.querySelector(".portrait img").alt = l === "en" ? "Portrait of Mohamed-Rida Nasraoui" : "Portrait de Mohamed-Rida Nasraoui";
  btn.setAttribute("aria-label", l === "en" ? "Passer en français" : "Switch to English");
  try { localStorage.setItem("lang", l); } catch (_) {}
}
function setLang(l){
  if (reduce) return applyLang(l);
  mainEl.classList.add("fade");
  setTimeout(() => { applyLang(l); mainEl.classList.remove("fade"); }, 180);
}
btn.addEventListener("click", () => setLang(document.documentElement.lang === "fr" ? "en" : "fr"));
let saved = null;
try { saved = localStorage.getItem("lang"); } catch (_) {}
if ((saved || navigator.language.slice(0,2)) === "en") setLang("en");

const burger = document.getElementById("burger"), nav = document.getElementById("nav");
function toggle(open){ nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); }
burger.addEventListener("click", () => toggle(!nav.classList.contains("open")));
nav.addEventListener("click", e => { if (e.target.tagName === "A") toggle(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { toggle(false); burger.focus(); } });

// Barre de progression
const bar = document.createElement("div");
bar.className = "progress"; bar.setAttribute("aria-hidden", "true");
document.body.prepend(bar);
addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
}, { passive: true });

// Apparition au défilement
const items = document.querySelectorAll("section:not(.hero) h2, section:not(.hero) > p, .card, .skills > div, .actions");
items.forEach((el, i) => { el.classList.add("reveal"); el.style.setProperty("--d", `${(i % 3) * 0.08}s`); });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 });
items.forEach(el => io.observe(el));

// Lien actif dans le menu
const links = [...nav.querySelectorAll("a")];
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => so.observe(s));

// Lumière qui suit le pointeur (héros et cartes)
if (!reduce) {
  const hero = document.querySelector(".hero");
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", e.clientX - r.left + "px");
    hero.style.setProperty("--my", e.clientY - r.top + "px");
  });
  document.querySelectorAll(".card").forEach(c => c.addEventListener("pointermove", e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--x", e.clientX - r.left + "px");
    c.style.setProperty("--y", e.clientY - r.top + "px");
  }));
}
