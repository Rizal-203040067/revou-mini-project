function updateNavbarPadding() {
  const topNavbar = document.getElementById("top-navbar");
  if (topNavbar) {
    document.documentElement.style.setProperty(
      "--navbar-height",
      topNavbar.offsetHeight + "px"
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
  const topNavbar = document.getElementById("top-navbar");
  const bottomNavbar = document.getElementById("bottom-navbar");

  const links = document.querySelectorAll(
    "#top-navbar a[href^='#'], #bottom-navbar a[href^='#']"
  );

  const sections = document.querySelectorAll("section[id], header[id]"); // <- include header

  // Smooth scroll (fix for Safari & offset)
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      const offset = (topNavbar ? topNavbar.offsetHeight : 0) + 10;

      const top = target.offsetTop - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });

  // Scrollspy (dynamic offset)
  const activateLink = () => {
    const navbarHeight = topNavbar ? topNavbar.offsetHeight : 0;

    const offset = navbarHeight + 80;

    const position = window.scrollY + offset;

    sections.forEach((section) => {
      if (
        position >= section.offsetTop &&
        position < section.offsetTop + section.offsetHeight
      ) {
        links.forEach((l) => {
          l.classList.remove(
            "text-orange-400",
            "dark:text-orange-500",
            "md:text-orange-400",
            "md:dark:text-orange-500",
            "font-semibold"
          );
          l.classList.add("text-gray-900", "dark:text-white");
        });

        const activeLinks = document.querySelectorAll(
          `#top-navbar a[href="#${section.id}"], #bottom-navbar a[href="#${section.id}"]`
        );

        activeLinks.forEach((active) => {
          active.classList.remove("dark:text-white", "text-gray-900");
          active.classList.add(
            "text-orange-400",
            "dark:text-orange-500",
            "md:text-orange-400",
            "md:dark:text-orange-500",
            "font-semibold"
          );
        });
      }
    });
  };

  window.addEventListener("scroll", activateLink);
  activateLink(); // run on load
});

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  root.classList.add("dark");
} else {
  root.classList.remove("dark");
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark");

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Navbar menu toggle for mobile
//

// const menuToggle = document.querySelector("[data-collapse-toggle]");
// const menu = document.getElementById("navbar-default");

// if (menuToggle && menu) {
//   menuToggle.addEventListener("click", () => {
//     menu.classList.toggle("hidden");
//     const expanded =
//       menuToggle.getAttribute("aria-expanded") === "true" || false;
//     menuToggle.setAttribute("aria-expanded", !expanded);
//   });
// }
