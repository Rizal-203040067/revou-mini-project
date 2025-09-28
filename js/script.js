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
    logos[i].style.transform = `rotateY(${theta}deg) translateZ(${radius}px) rotateY(${-theta}deg)`;

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
          "md:text-orange-400",
          "md:dark:text-orange-500",
          "font-semibold"
        )
      );
      const active = document.querySelector(`nav a[href="#${section.id}"]`);
      if (active) {
        active.classList.add(
          "md:text-orange-400",
          "md:dark:text-orange-500",
          "font-semibold"
        );
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


// const carousel = document.getElementById("carousel3d");
//   const items = carousel.children;
//   const itemCount = items.length;
//   const angle = 360 / itemCount;

//   // Atur posisi item mengelilingi lingkaran
//   for (let i = 0; i < itemCount; i++) {
//     items[i].style.transform = `rotateY(${i * angle}deg) translateZ(200px)`;
//   }

//   // Animasi rotasi otomatis
//   let currentAngle = 0;
//   setInterval(() => {
//     currentAngle += 0.5;
//     carousel.style.transform = `rotateY(${currentAngle}deg)`;
//   }, 30);
