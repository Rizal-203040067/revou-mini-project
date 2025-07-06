const orbit = document.getElementById("orbit");
const logos = orbit.children;
const count = logos.length;
const radius = 300; // jarak logo dari pusat (px)
const angleStep = 360 / count;

// Set posisi awal logo di sekitar pusat (diam)
for (let i = 0; i < count; i++) {
  const angle = i * angleStep;
  logos[i].style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
}

// Auto-rotate semua logo dalam orbit
let current = 0;
setInterval(() => {
  current += 0.3; // kecepatan
  orbit.style.transform = `rotateY(${current}deg)`;
}, 30);

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
