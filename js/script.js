document.documentElement.classList.add("js");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const mainEl = $("main"), btn = $("#lang"), nav = $("#nav"), burger = $("#burger");

const EN = {
 skip:"Skip to content","nav.about":"About","nav.exp":"Experience","nav.edu":"Education","nav.proj":"Projects","nav.skills":"Skills","nav.contact":"Contact",
 "hero.role":"Computer Science student · Systems, networks and infrastructure",
 "hero.intro":"Second-year student at ECE Bordeaux (AI Developer track). I am looking for a 2.5-month internship starting late May 2027 to contribute to an IT team’s missions.",
 "hero.cta1":"See my projects","hero.cv":"Download my CV",
 st1:"certifications",st2:"months of internship",st3:"spoken languages",st4:"course projects",
 "about.h":"About <em>me</em>",
 "about.p1":"I have been studying for a Bachelor’s degree in Computer Science at ECE Bordeaux since 2025. My track focuses on artificial intelligence, but I am most interested in how systems, networks and infrastructure work.",
 "about.p2":"My systems engineer internship at Orange Business introduced me to running a critical service. I want to deepen these topics, with rigour and as part of a team.",
 "kv.track":"AI Developer","kv.avail":"internship from late May 2027",
 "exp.h":"My <em>experience</em>","exp.role":"Systems engineer intern · Orange Business","exp.meta":"Pessac · June – September 2026 · hybrid",
 "exp.b1":"Monitoring of operations activities on a critical payment scope",
 "exp.b2":"Participation in ticket review meetings via OSM and ServiceNow",
 "exp.b3":"Follow-up of production deployments",
 "exp.b4":"Informing L1 support at the start and end of operations",
 "exp.b5":"Log searches and investigations using Grafana",
 "exp.b6":"Discovery of CAV, Azure, HAProxy, web servers and databases",
 "exp.b7":"Understanding of service continuity, redundancy, rollback and BCP/DRP",
 "edu.h":"My <em>education</em>","edu.t1":"Bachelor in Computer Science · AI Developer track","edu.m1":"ECE Bordeaux · 2025 – 2028",
 "edu.t2":"Baccalauréat in Physical Sciences","edu.m2":"Lycée Phosphate, Morocco · 2024 – 2025",
 "cert.h":"Certifications",c1m:"Liora · May 2026",c2m:"Liora · February 2026",c3m:"Liora · November 2025",
 "proj.h":"My <em>projects</em>","proj.note":"Projects completed as part of my studies. Links will be added once the repositories can be made public.",
 "p1.t":"Cinema database (MongoDB)","p1.d":"Workshop on modelling and querying a film database with MongoDB Compass: films, people, comments and users collections.",
 "p2.t":"School management (Java)","p2.d":"Object-oriented programming assignment in Java: a console application organised into packages, built with IntelliJ.",
 "skills.h":"My <em>skills</em>",s1:"Programming",s2:"Systems",s3:"Networks",s4:"Operations",s5:"Infrastructure",s6:"Tools",
 "lvl.i":"intermediate","lvl.n":"basics","lvl.d":"discovered during internship",
 "lang.note":"Languages: French (fluent), English (intermediate), Arabic (native).",
 "engage.h":"My <em>community work</em>","engage.p":"Volunteer at Linkee. Description to be completed before publication.",
 "contact.h":"Get in <em>touch</em>","contact.p":"I am available for an internship starting late May 2027. Feel free to write to me.","contact.cv":"Download my CV",
 up:"Back to top ↑"
};
const els = $$("[data-i18n]");
els.forEach(e => e.dataset.fr = e.innerHTML);
function applyLang(l){
  document.documentElement.lang = l;
  els.forEach(e => e.innerHTML = l === "en" ? (EN[e.dataset.i18n] ?? e.dataset.fr) : e.dataset.fr);
  btn.textContent = l === "en" ? "FR" : "EN";
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
if ((saved || navigator.language.slice(0, 2)) === "en") applyLang("en");

// Menu mobile
function toggle(open){ nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); }
burger.addEventListener("click", () => toggle(!nav.classList.contains("open")));
nav.addEventListener("click", e => { if (e.target.tagName === "A") toggle(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { toggle(false); burger.focus(); } });

// Barre de progression + en-tête compact
const bar = document.createElement("div");
bar.className = "progress"; bar.setAttribute("aria-hidden", "true");
document.body.prepend(bar);
const header = $("#top");
addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
  header.classList.toggle("scrolled", h.scrollTop > 20);
}, { passive: true });

// Défilement infini des technologies
const track = $(".track");
track.innerHTML += track.innerHTML;

// Compteurs
function countUp(el){
  const end = +el.dataset.count;
  if (reduce) return;
  const t0 = performance.now();
  (function step(t){
    const p = Math.min((t - t0) / 1200, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

// Apparition au défilement
const items = $$("section:not(.hero) .num, section:not(.hero) h2, section:not(.hero) > p, .card, .stats li, .sub, .actions");
items.forEach((el, i) => { el.classList.add("reveal"); el.style.setProperty("--d", `${(i % 3) * 0.08}s`); });
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  const c = $("[data-count]", e.target); if (c) countUp(c);
  io.unobserve(e.target);
}), { threshold: 0.15 });
items.forEach(el => io.observe(el));

// Lien actif
const links = $$("a", nav);
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => so.observe(s));

// Effets au pointeur : halo, cartes, boutons magnétiques, inclinaison de la photo
if (!reduce && matchMedia("(pointer:fine)").matches) {
  const glow = document.createElement("div");
  glow.className = "glow"; glow.setAttribute("aria-hidden", "true");
  document.body.append(glow);
  let x = 0, y = 0, gx = 0, gy = 0;
  addEventListener("pointermove", e => { x = e.clientX; y = e.clientY; });
  (function loop(){ gx += (x - gx) * .12; gy += (y - gy) * .12; glow.style.transform = `translate(${gx}px,${gy}px)`; requestAnimationFrame(loop); })();
  $$(".card").forEach(c => c.addEventListener("pointermove", e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--x", e.clientX - r.left + "px");
    c.style.setProperty("--y", e.clientY - r.top + "px");
  }));
  $$(".btn").forEach(b => {
    b.addEventListener("pointermove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .3}px)`;
    });
    b.addEventListener("pointerleave", () => b.style.transform = "");
  });
}
