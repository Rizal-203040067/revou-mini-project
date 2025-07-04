const navbar = document.querySelector("nav");
const links = document.querySelectorAll("nav a[href^='#']");
const offset = navbar.offsetHeight + 10;

// Sticky scroll effect (shadow + bg change)
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add(
      "shadow-md",
      "backdrop-blur",
      "bg-white/80",
      "dark:bg-gray-900/80"
    );
  } else {
    navbar.classList.remove(
      "shadow-md",
      "backdrop-blur",
      "bg-white/80",
      "dark:bg-gray-900/80"
    );
  }
});

// Smooth scroll (native + fallback Safari)
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scrollspy: aktifkan link saat scroll
window.addEventListener("scroll", () => {
  const position = window.scrollY + offset;
  document.querySelectorAll("section[id]").forEach((section) => {
    if (
      position >= section.offsetTop &&
      position < section.offsetTop + section.offsetHeight
    ) {
      links.forEach((l) =>
        l.classList.remove(
          "md:text-blue-700",
          "md:dark:text-blue-500",
          "font-semibold"
        )
      );
      const active = document.querySelector(`nav a[href="#${section.id}"]`);
      if (active) {
        active.classList.add(
          "md:text-blue-700",
          "md:dark:text-blue-500",
          "font-semibold"
        );
      }
    }
  });
});
