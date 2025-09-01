// js/components.js

// Navigation
export const navigationContent = `
<nav>
    <div class="logo">
        <div class="logo-container">
            <p class="mn"><a href="/">Charlie ✦ Cocalon</a></p>
        </div>
    </div>
    <div class="menu-toggle-btn">
        <div class="menu-toggle-btn-wrapper">
            <p class="mn open-label">Menu</p>
            <p class="mn close-label">Close</p>
        </div>
    </div>
</nav>
<div class="nav-overlay">
     <div class="nav-items">
        <div class="nav-item" data-page="/">
            <p><a href="/">Index</a></p>
        </div>
        <div class="nav-item" data-page="/work">
            <p><a href="/work">The Good Stuff</a></p>
        </div>
        <div class="nav-item" data-page="/about">
            <p><a href="/about">Meet Charlie</a></p>
        </div>
        <div class="nav-item" data-page="/contact">
            <p><a href="/contact">Slide In</a></p>
        </div>
    </div>
    <div class="nav-footer">
        <div class="nav-footer-item">
            <div class="nav-footer-item-header">
                <p class="mn">Find Me</p>
            </div>
            <div class="nav-footer-item-copy">
                <p class="mn"><a
                  href="https://www.facebook.com/cocaloncharlie"
                  target="_blank"
                  >Facebook</a
                ></p>
                <p class="mn"><a
                  href="https://www.linkedin.com/in/cocaloncharlie/"
                  target="_blank"
                  >LinkedIn</a
                ></p>
            </div>
        </div>
        <div class="nav-footer-item">
            <div class="nav-footer-item-copy">
                <p class="mn">MWT — May 2025 / Web Dev</p>
            </div>
        </div>
        <div class="nav-footer-item">
            <div class="nav-footer-item-header">
                <p class="mn">Say Hi</p>
            </div>
            <div class="nav-footer-item-copy">
                <p class="mn">
                    <a href="mailto:charliecocalon.moo@gmail.com" target="_blank"
                        >charliecocalon.moo@gmail.com</a
                    >
                </p>
            </div>
        </div>
    </div>
</div>
`;

// Footer
export const footerContent = `
<footer>
    <div class="footer-container">
        <div class="footer-symbols footer-symbols-1">
            <img src="/images/global/s6.png" alt="" />
            <img src="/images/global/s6.png" alt="" />
        </div>
        <div class="footer-symbols footer-symbols-2">
            <img src="/images/global/s6.png" alt="" />
            <img src="/images/global/s6.png" alt="" />
        </div>
        <div class="footer-header">
            <h1>Charlie Cocalon</h1>
        </div>
        <div class="footer-row">
            <div class="footer-col">
                <p>Quick Jumps</p>
                <p><a href="/work">Portfolio</a></p>
                <p><a href="/about">About</a></p>
                <p><a href="/contact">Contact</a></p>
            </div>
            <div class="footer-col">
                <p>Side Streets</p>
                <p>Roll the Showreel</p>
                <p>Weird Shop</p>
                <p>Buy Me a Coffee</p>
            </div>
            <div class="footer-col">
                <p>Social Signals</p>
                <p>
                    <a href="https://www.youtube.com/@CharlieCocalon" target="_blank">YouTube</a>
                </p>
                <p>
                    <a href="https://www.facebook.com/cocaloncharlie" target="_blank">Facebook</a>
                </p>
                <p>
                    <a href="https://www.instagram.com/bobbycocalon/" target="_blank">Instagram</a>
                </p>
            </div>
            <div class="footer-col">
                <p>Alt Dimensions</p>
                <p>Logo Dump</p>
                <p>Freelance Top 100</p>
            </div>
        </div>
        <div class="copyright-info">
            <p class="mn">MWT — MAY 2025</p>
            <p class="mn">//</p>
            <p class="mn">
                Built by
                <a href="https://www.facebook.com/cocaloncharlie" target="_blank">Charlie</a>
            </p>
        </div>
        <div class="explosion-container"></div>
    </div>
</footer>
`;

export function initFooterEffects() {
  const footer = document.querySelector("footer");
  const explosionContainer = document.querySelector(".explosion-container");

  if (!footer || !explosionContainer) {
    console.warn("Footer elements not found for initialization");
    return;
  }

  let hasExploded = false;

  const config = {
    gravity: 0.25,
    friction: 0.99,
    imageSize: 150,
    horizontalForce: 20,
    verticalForce: 15,
    rotationSpeed: 10,
    resetDelay: 500,
  };

  const imageParticleCount = 10;
  const imagePaths = Array.from(
    { length: imageParticleCount },
    (_, i) => `/images/work-items/work-item-${i + 1}.jpg`
  );

  // Preload images
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });

  const createParticles = () => {
    explosionContainer.innerHTML = "";

    imagePaths.forEach((path) => {
      const particle = document.createElement("img");
      particle.src = path;
      particle.classList.add("explosion-particle-img");
      particle.style.width = `${config.imageSize}px`;
      explosionContainer.appendChild(particle);
    });
  };

  class Particle {
    constructor(element) {
      this.element = element;
      this.x = 0;
      this.y = 0;
      this.vx = (Math.random() - 0.5) * config.horizontalForce;
      this.vy = -config.verticalForce - Math.random() * 10;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
    }

    update() {
      this.vy += config.gravity;
      this.vx *= config.friction;
      this.vy *= config.friction;
      this.rotationSpeed *= config.friction;

      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }
  }

  const explode = () => {
    if (hasExploded) return;
    hasExploded = true;

    createParticles();

    const particleElements = document.querySelectorAll(
      ".explosion-particle-img"
    );
    const particles = Array.from(particleElements).map(
      (element) => new Particle(element)
    );

    let animationId;

    const animate = () => {
      particles.forEach((particle) => particle.update());
      animationId = requestAnimationFrame(animate);

      if (
        particles.every(
          (particle) => particle.y > explosionContainer.offsetHeight / 2
        )
      ) {
        cancelAnimationFrame(animationId);
      }
    };

    animate();
  };

  const checkFooterPosition = () => {
    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (footerRect.top > viewportHeight + 100) {
      hasExploded = false;
    }

    if (!hasExploded && footerRect.top <= viewportHeight + 250) {
      explode();
    }
  };

  let checkTimeout;
  const handleScroll = () => {
    clearTimeout(checkTimeout);
    checkTimeout = setTimeout(checkFooterPosition, 5);
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", () => {
    hasExploded = false;
  });

  // Initial setup
  createParticles();
  setTimeout(checkFooterPosition, 500);
}
