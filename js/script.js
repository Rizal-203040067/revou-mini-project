const orbit = document.getElementById("orbit");
const logos = orbit.children;
const n = logos.length;
const base = [];
let radius = 360; // akan ditentukan ulang di updateRadius()

// Inisialisasi posisi awal
for (let i = 0; i < n; i++) {
  base[i] = (i * 360) / n;
  logos[i].classList.add("transition-all", "duration-300", "ease-in-out");
}

// Fungsi untuk memperbarui radius berdasarkan ukuran layar
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
updateRadius(); // panggil saat pertama kali load
window.addEventListener("resize", updateRadius); // panggil saat ukuran layar berubah

let rot = 0;
function animate() {
  rot += 0.3; // rotasi berkelanjutan

  for (let i = 0; i < n; i++) {
    const theta = base[i] + rot;

    logos[
      i
    ].style.transform = `rotateY(${theta}deg) translateZ(${radius}px) rotateY(${-theta}deg)`;

    const rel = ((theta % 360) + 360) % 360;
    const isBack = rel > 120 && rel < 270;

    logos[i].style.filter = isBack ? "blur(2px) brightness(80%)" : "none";
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
