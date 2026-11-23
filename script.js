const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const notice = document.querySelector("#site-notice");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isExpanded);
});

navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

let noticeTimeout;

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add("visible");
  window.clearTimeout(noticeTimeout);
  noticeTimeout = window.setTimeout(() => notice.classList.remove("visible"), 3500);
}

document.querySelectorAll(".placeholder-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showNotice(`${link.dataset.placeholder} will be added when available.`);
  });
});

document.querySelector("#resume-download").addEventListener("click", () => {
  const resume = [
    "AKSHATA PATIL",
    "Aspiring Software Developer",
    "",
    "EDUCATION",
    "Diploma in Computer Engineering",
    "Government Polytechnic Mumbai",
    "",
    "TECHNICAL SKILLS",
    "Python, Java, C, C++, HTML, CSS, JavaScript, Flutter, Firebase, SQL, Git, GitHub",
    "",
    "PROJECTS",
    "Smart Society Operations and Transparency System — Flutter, Firebase",
    "MindfulAI — Flutter, Firebase",
    "SmartSpam — Python, Machine Learning, Tkinter",
    "Student Record Management System — Python, Tkinter, SQLite",
    "",
    "CERTIFICATIONS",
    "Python Fundamentals — Infosys",
    "Programming Using C++ — Infosys",
    "",
    "Contact links can be added when available."
  ].join("\n");
  const file = new Blob([resume], { type: "text/plain;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(file);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = "Akshata-Patil-Resume.txt";
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
