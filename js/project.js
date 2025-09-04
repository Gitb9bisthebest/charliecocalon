import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

// Project data object containing all your projects
const projectsData = {
  "nf-fabric": {
    title: "NF Fabric",
    category: "Traditional Suit",
    secondaryCategory: "Shopify Store",
    description:
      "A sophisticated exploration of traditional tailoring meets modern minimalism. NF Fabric represents the perfect balance between heritage craftsmanship and contemporary design sensibilities, creating timeless pieces that speak to both history and future.",
    projectNumber: "Project 0001",
    liveUrl: "https://www.nffabric.com/",
    clientName: "Mayra Lacson",
    clientTitle: "Entreprenuer, NF Fabric",
    clientFeedback:
      "Charlie transformed our vision into something we never knew we needed. Every stitch, every fold felt intentional. The final collection wasn't just clothing—it was storytelling through fabric. Pure artistry.",
    clientImage: "/images/project/client-portrait-female.webp",
    heroImage: "/images/work-items/work-item-1.webp",
    snapshotImages: [
      "/images/work-items/work-item-4.webp",
      "/images/work-items/work-item-2.webp",
      "/images/work-items/work-item-3.webp",
    ],
  },

  "cebu-web-expert": {
    title: "Cebu Web Expert",
    category: "Web Development Agency",
    secondaryCategory: "Digital Agency",
    description:
      "Bold color experiments with edgy aesthetics. Cebu Web Expert pushes the boundaries of chromatic expression, blending gothic imagery with vibrant palettes to create something both haunting and beautiful.",
    projectNumber: "Project 0002",
    liveUrl: "https://cebuwebexpert.com",
    clientName: "Cebu Web Expert",
    clientTitle: "Cebu Web Expert | Owner",
    clientFeedback:
      "We asked for bold, and Charlie delivered nuclear. This project redefined our entire brand language. The colors don't just pop—they explode with personality. It's art that refuses to be ignored.",
    clientImage: "/images/project/client-portrait-male.webp",
    heroImage: "/images/work-items/work-item-2.webp",
    snapshotImages: [
      "/images/work-items/work-item-1.webp",
      "/images/work-items/work-item-4.webp",
      "/images/work-items/work-item-6.webp",
    ],
  },

  "funky-monkey-craft": {
    title: "Funky Monkey Craft",
    category: "T-shirt Printing Design",
    secondaryCategory: "Mug Printing Design",
    description:
      "A whimsical exploration of playful imagery and vibrant colors. Funky Monkey Craft captures the essence of whimsy and adventure, creating designs that bring joy and excitement to our lives.",
    projectNumber: "Project 0003",
    clientName: "Juno Merrick",
    clientTitle: "Owner, Funky Monkey Craft",
    clientFeedback:
      "Charlie's artistry is a fusion of whimsy and adventure. Their designs are both whimsical and playful, making them a joy to look at and wear. They bring joy and excitement to our lives.",
    clientImage: "/images/project/client-portrait-male.webp",
    heroImage: "/images/work-items/work-item-3.webp",
    snapshotImages: [
      "/images/work-items/work-item-6.webp",
      "/images/work-items/work-item-8.webp",
      "/images/work-items/work-item-10.webp",
    ],
  },

  "panaderos-bakery": {
    title: "Panaderos Bakery",
    category: "Eyes to Mouth Design",
    secondaryCategory: "Happy eyes, happy tummy",
    description:
      "A whimsical exploration of playful imagery and vibrant colors. Panaderos Bakery captures the essence of whimsy and adventure, creating designs that bring joy and excitement to our lives.",
    projectNumber: "Project 0004",
    liveUrl: "https://www.panaderosbakerykw.com/",
    clientName: "Olimar Gauilab Seradnor",
    clientTitle: "Owner, Panaderos Bakery",
    clientFeedback:
      "Charlie's artistry is a fusion of whimsy and adventure. Their designs are both whimsical and playful, making them a joy to look at and wear. They bring joy and excitement to our lives.",
    clientImage: "/images/project/client-portrait-male.webp",
    heroImage: "/images/work-items/work-item-4.webp",
    snapshotImages: [
      "/images/work-items/work-item-3.webp",
      "/images/work-items/work-item-7.webp",
      "/images/work-items/work-item-9.webp",
    ],
  },

  "beauty-lab": {
    title: "Beauty Lab",
    category: "Skin care and beauty products",
    secondaryCategory: "Shopify store",
    description:
      "Our gentle, targeted formulas are made for your skin — to calm, hydrate, and reveal the glow you’ve been looking for.",
    projectNumber: "Project 0005",
    liveUrl: "https://www.beautylabonlinestore.com/",
    clientName: "Su Gil Heu",
    clientTitle: "Owner, Beauty Lab",
    clientFeedback:
      "Charlie's artistry is a fusion of whimsy and adventure. Their designs are both whimsical and playful, making them a joy to look at and wear. They bring joy and excitement to our lives.",
    clientImage: "/images/project/client-portrait-female.webp",
    heroImage: "/images/work-items/work-item-5.webp",
    snapshotImages: [
      "/images/work-items/work-item-6.webp",
      "/images/work-items/work-item-1.webp",
      "/images/work-items/work-item-8.webp",
    ],
  },

  "livegood-by-amirkh": {
    title: "LiveGood by Amirkh",
    category: "LiveGood Produts",
    secondaryCategory: "Shopify store",
    description:
      "A simple yet stunning landing page of LiveGood products, showcasing their exceptional quality and dedication to customer satisfaction.",
    projectNumber: "Project 0006",
    liveUrl: "https://w6yzu4-yr.myshopify.com/",
    clientName: "Amirkh Hussain",
    clientTitle: "Owner, LiveGood by Amirkh",
    clientFeedback:
      "Charlie's artistry is a fusion of whimsy and adventure. Their designs are both whimsical and playful, making them a joy to look at and wear. They bring joy and excitement to our lives.",
    clientImage: "/images/project/client-portrait-male.webp",
    heroImage: "/images/work-items/work-item-6.webp",
    snapshotImages: [
      "/images/work-items/work-item-1.webp",
      "/images/work-items/work-item-3.webp",
      "/images/work-items/work-item-10.webp",
    ],
  },
};

// Function to get project ID from URL parameters
function getProjectIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id") || "room-404";
}

// Function to update page title
function updatePageTitle(projectTitle) {
  document.title = `Charlie Cocalon | ${projectTitle}`;
}

// Function to set up project navigation
function setupProjectNavigation(projectId) {
  // Get ordered list of project IDs
  const projectIds = Object.keys(projectsData).sort((a, b) => {
    const numA = parseInt(
      projectsData[a].projectNumber.replace("Project ", "")
    );
    const numB = parseInt(
      projectsData[b].projectNumber.replace("Project ", "")
    );
    return numA - numB;
  });

  const currentIndex = projectIds.indexOf(projectId);
  const prevBtn = document.querySelector(".prev-project");
  const nextBtn = document.querySelector(".next-project");

  if (prevBtn) {
    if (currentIndex > 0) {
      const prevId = projectIds[currentIndex - 1];
      prevBtn.onclick = () => {
        window.location.href = `project.html?id=${prevId}`;
      };
      prevBtn.style.display = "inline-block";
    } else {
      prevBtn.style.display = "none"; // hide if first project
    }
  }

  if (nextBtn) {
    if (currentIndex < projectIds.length - 1) {
      const nextId = projectIds[currentIndex + 1];
      nextBtn.onclick = () => {
        window.location.href = `project.html?id=${nextId}`;
      };
      nextBtn.style.display = "inline-block";
    } else {
      nextBtn.style.display = "none"; // hide if last project
    }
  }
}

// Function to update preview gallery images (before animations start)
function updatePreviewGallery(project) {
  // Update the main center image first (most important)
  const mainPreviewImg = document.querySelector(
    ".preview-img.main-preview-img img"
  );
  if (mainPreviewImg) {
    mainPreviewImg.src = project.heroImage;
  }

  // Update all other preview images
  const allPreviewImages = document.querySelectorAll(
    ".preview-img:not(.main-preview-img) img"
  );
  const projectImages = [project.heroImage, ...project.snapshotImages];

  // Fill other preview slots by cycling through project images
  allPreviewImages.forEach((img, index) => {
    const imageIndex = index % projectImages.length;
    img.src = projectImages[imageIndex];
  });
}

// Function to update content that's not part of the hero animations
function updateStaticContent(project) {
  // Update page title
  updatePageTitle(project.title);

  // Update project number
  const projectNumberElement = document.querySelector(
    ".project-hero-footer-tags .mn"
  );
  if (projectNumberElement) {
    projectNumberElement.textContent = project.projectNumber;
  }

  // Update client feedback section
  const clientFeedbackElement = document.querySelector(
    ".project-client-feedback-copy p"
  );
  const clientNameElement = document.querySelector(
    ".project-client-bio p:first-child"
  );
  const clientTitleElement = document.querySelector(".project-client-bio p.mn");
  const clientImageElement = document.querySelector(".project-client-icon img");

  if (clientFeedbackElement)
    clientFeedbackElement.textContent = project.clientFeedback;
  if (clientNameElement) clientNameElement.textContent = project.clientName;
  if (clientTitleElement) clientTitleElement.textContent = project.clientTitle;
  if (clientImageElement) clientImageElement.src = project.clientImage;

  // Update snapshot images
  const snapshotElements = document.querySelectorAll(".project-snapshot img");
  snapshotElements.forEach((img, index) => {
    if (project.snapshotImages[index]) {
      img.src = project.snapshotImages[index];
    }
  });
}

// Function to update hero content that will be animated
function updateHeroContent(project) {
  // Update the actual content BEFORE SplitText processes it
  const titleElement = document.querySelector(".project-hero-header-h1 h1");
  if (titleElement) titleElement.textContent = project.title;

  const tagElements = document.querySelectorAll(".project-tags .mn");
  if (tagElements.length >= 3) {
    tagElements[0].textContent = project.category;
    tagElements[2].textContent = project.secondaryCategory;
  }

  const descriptionElement = document.querySelector(
    ".project-hero-description p"
  );
  if (descriptionElement) descriptionElement.textContent = project.description;

  // Update project live link
  // Handle project live link
  const linkContainer = document.querySelector(".project-live-link");
  const projectLinkElement = document.querySelector(".project-live-link a");

  if (project.liveUrl) {
    // If liveUrl exists → show button
    if (projectLinkElement) projectLinkElement.href = project.liveUrl;
    if (linkContainer) linkContainer.style.display = "block";
  } else {
    // If liveUrl is missing → hide button
    if (linkContainer) linkContainer.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isProjectPage = document.querySelector(".page.project-page");
  if (!isProjectPage) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Get project data and update content BEFORE animations
  const projectId = getProjectIdFromUrl();
  const project = projectsData[projectId];

  if (project) {
    // Update preview gallery first (for the scroll transition)
    updatePreviewGallery(project);

    // Update static content that doesn't need animation
    updateStaticContent(project);

    // Update hero content that will be animated
    updateHeroContent(project);

    setupProjectNavigation(projectId);
  }

  // Your original animation functions - with project link animation added
  const initHeroAnimations = () => {
    const heroTitle = SplitText.create(".project-hero-header-h1 h1", {
      type: "lines",
      mask: "lines",
    });
    const projectTags = SplitText.create(".project-tags p", {
      type: "lines",
      mask: "lines",
    });
    const heroDescription = SplitText.create(".project-hero-description p", {
      type: "lines",
      mask: "lines",
    });

    gsap.set([heroTitle.lines, projectTags.lines, heroDescription.lines], {
      position: "relative",
      y: "120%",
      willChange: "transform",
    });

    gsap.set(".project-hero-header-h1 img", {
      scale: 0,
      willChange: "transform",
    });

    // Set initial state for project link
    gsap.set(".project-live-link", {
      opacity: 0,
      y: 20,
      willChange: "transform",
    });

    const heroTl = gsap.timeline({ delay: 0.85 });

    heroTl.to(heroTitle.lines, {
      y: "0%",
      duration: 1,
      ease: "power4.out",
    });

    heroTl.to(
      ".project-hero-header-h1 img",
      {
        scale: 1,
        duration: 1,
        ease: "power4.out",
      },
      "-=1"
    );

    heroTl.to(
      projectTags.lines,
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      },
      "-=0.9"
    );

    heroTl.to(
      heroDescription.lines,
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      },
      "-=0.9"
    );

    // Animate project link last
    heroTl.to(
      ".project-live-link",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
      },
      "-=0.5"
    );
  };

  initHeroAnimations();

  // Your original scroll trigger - unchanged!
  ScrollTrigger.create({
    trigger: ".project-page-whitespace",
    start: "top bottom",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: (self) => {
      const projectPreviewWrapper = document.querySelector(
        ".project-preview-wrapper"
      );
      const previewCols = document.querySelectorAll(
        ".preview-col:not(.main-preview-col)"
      );
      const mainPreviewImg = document.querySelector(
        ".preview-img.main-preview-img img"
      );
      const previewScreenWidth = window.innerWidth;
      const previewMaxScale = previewScreenWidth < 900 ? 4 : 2.65;
      const scale = 1 + self.progress * previewMaxScale;
      const yPreviewColTranslate = self.progress * 300;
      const mainPreviewImgScale = 2 - self.progress * 0.85;

      projectPreviewWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
      previewCols.forEach((previewCol) => {
        previewCol.style.transform = `translateY(${yPreviewColTranslate}px)`;
      });
      mainPreviewImg.style.transform = `scale(${mainPreviewImgScale})`;
    },
  });
});
