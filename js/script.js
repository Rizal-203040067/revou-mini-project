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

const navbar = document.querySelector("nav");
const links = document.querySelectorAll("nav a[href^='#']");
const offset = navbar.offsetHeight + 50;

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

// Smooth scroll
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });

      // Close mobile menu after clicking
      const menu = document.getElementById("navbar-default");
      if (window.innerWidth < 768) {
        menu.classList.add("hidden");
      }
    }
  });
});

// Scrollspy for light + dark mode
window.addEventListener("scroll", () => {
  const position = window.scrollY + offset;

  document.querySelectorAll("section[id]").forEach((section) => {
    if (
      position >= section.offsetTop &&
      position < section.offsetTop + section.offsetHeight
    ) {
      links.forEach((l) => {
        // Remove active classes
        l.classList.remove("text-orange-400", "font-semibold");
        l.classList.remove("dark:text-orange-400"); // remove old active dark color
        // Reset to default dark mode color
        l.classList.add("dark:text-white");
      });

      const active = document.querySelector(`nav a[href="#${section.id}"]`);
      if (active) {
        // Add active classes
        active.classList.add("text-orange-400", "font-semibold");
        active.classList.remove("dark:text-white"); // remove default dark color
        active.classList.add("dark:text-orange-400"); // add active dark color
      }
    }
  });
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

// const sections = document.querySelectorAll("section");
// const navLinks = document.querySelectorAll("nav ul li a");

// window.addEventListener("scroll", () => {
//   let current = "";

//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop - 100;
//     const sectionHeight = section.clientHeight;
//     if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
//       current = section.getAttribute("id");
//     }
//   });

//   navLinks.forEach((link) => {
//     link.classList.remove("text-orange-400", "dark:text-blue-500");
//     if (link.getAttribute("href") === `#${current}`) {
//       link.classList.add("text-orange-400", "dark:text-blue-500");
//     }
//   });
// });
