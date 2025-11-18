function updateNavbarPadding() {
  const navbar = document.querySelector("nav");
  if (navbar) {
    document.documentElement.style.setProperty(
      "--navbar-height",
      navbar.offsetHeight + "px"
    );
  }
}

window.addEventListener("load", updateNavbarPadding);
window.addEventListener("resize", updateNavbarPadding);

const orbit = document.getElementById("orbit");
const logos = orbit.children;
const n = logos.length;
const base = [];
let radius = 360; // akan disesuaikan saat updateRadius()

// Inisialisasi posisi awal
for (let i = 0; i < n; i++) {
  base[i] = (i * 360) / n;
  logos[i].classList.add("transition-all", "duration-300", "ease-in-out");
}

// Fungsi untuk menyesuaikan radius berdasarkan ukuran layar
function updateRadius() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) {
    radius = 360;
  } else if (screenWidth >= 768) {
    radius = 300;
  } else {
    radius = 240;
  }
}
updateRadius();
window.addEventListener("resize", updateRadius);

// Set rotasi awal supaya langsung terlihat berputar
let rot = 30; // mulai sedikit miring agar tidak diam di depan

function animate() {
  rot += 0.3; // kecepatan rotasi

  for (let i = 0; i < n; i++) {
    const theta = base[i] + rot;

    // Orbit 3D + selalu menghadap depan
    logos[
      i
    ].style.transform = `rotateY(${theta}deg) translateZ(${radius}px) rotateY(${-theta}deg)`;

    // Tambahkan blur jika di belakang
    const rel = ((theta % 360) + 360) % 360;
    const isBack = rel > 120 && rel < 270;
    logos[i].style.transition = "filter 0.4s ease-in-out";
    logos[i].style.filter = isBack ? "blur(50px) brightness(70%)" : "none";
    logos[i].style.zIndex = isBack ? "0" : "1";
  }

  requestAnimationFrame(animate);
}

animate();

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("nav");
  const links = document.querySelectorAll("nav a[href^='#']");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scroll (fix for Safari & offset)
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      const offset = navbar.offsetHeight;
      const top = target.offsetTop - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });

  // Scrollspy (dynamic offset)
  const activateLink = () => {
    const navbarHeight = navbar.offsetHeight;

    const offset =
      window.innerWidth < 768 ? navbarHeight - 5 : navbarHeight + 10;

    const position = window.scrollY + offset;

    sections.forEach((section) => {
      if (
        position >= section.offsetTop &&
        position < section.offsetTop + section.offsetHeight
      ) {
        // Reset all links to their default (inactive) state:
        links.forEach((l) => {
          // Remove any active classes
          l.classList.remove(
            "text-orange-400",
            "dark:text-orange-500",
            "md:text-orange-400",
            "md:dark:text-orange-500",
            "font-semibold"
          );

          // Ensure default inactive classes are present (adjust if your markup differs)
          // e.g., your HTML uses `text-gray-900` and `dark:text-white` by default
          l.classList.add("text-gray-900");
          l.classList.add("dark:text-white");
        });

        // Add active classes for the matched section
        const active = document.querySelector(`nav a[href="#${section.id}"]`);
        if (active) {
          // Remove default dark color so active dark color can show
          active.classList.remove("dark:text-white");

          // Remove default light color if you want active color to fully replace it
          active.classList.remove("text-gray-900");

          // Add active colors for mobile and md+ plus bold
          active.classList.add("text-orange-400"); // mobile/light active
          active.classList.add("dark:text-orange-500"); // mobile/dark active
          active.classList.add("md:text-orange-400"); // md+ light active
          active.classList.add("md:dark:text-orange-500"); // md+ dark active
          active.classList.add("font-semibold");
        }
      }
    });
  };

  window.addEventListener("scroll", activateLink);
  activateLink(); // run on load
});

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");

// Load saved theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  // Save user preference
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

// Update icon based on current theme on load
if (document.documentElement.classList.contains("dark")) {
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

// Navbar menu toggle for mobile
//

const menuToggle = document.querySelector("[data-collapse-toggle]");
const menu = document.getElementById("navbar-default");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    const expanded =
      menuToggle.getAttribute("aria-expanded") === "true" || false;
    menuToggle.setAttribute("aria-expanded", !expanded);
  });
}
