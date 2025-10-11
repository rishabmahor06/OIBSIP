// --- STATE MANAGEMENT ---
let currentFilter = "all";

// --- PROJECTS DATA ---
const projects = [
  {
    id: 1,
    title: "E-commerce Plant Store",
    description:
      "A fully functional e-commerce website for a plant store, built with vanilla JavaScript.",
    image:
      "https://res.cloudinary.com/dbfqvsrls/image/upload/v1759681265/ChatGPT_Image_Oct_5_2025_09_50_43_PM_hyra3n.png",
    tags: ["js", "uidesign"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "React Dashboard App",
    description:
      "A data visualization dashboard with charts, tables, and various interactive widgets.",
    image:
      "https://res.cloudinary.com/dbfqvsrls/image/upload/v1759681451/Skillset_-_Course_Dashboard_fglokf.jpg",
    tags: ["react", "js"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "UI Kit & Design System",
    description:
      "A comprehensive UI kit developed in Figma, focusing on consistency and scalability.",
    image:
      "https://res.cloudinary.com/dbfqvsrls/image/upload/v1759681511/Ultimate_Football_Manager_Ui_Kit_Dashboard_q5mjzr.jpg",
    tags: ["uidesign"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 4,
    title: "Task Management App",
    description:
      "A Kanban-style task manager built with React for seamless state management.",
    image:
      "https://res.cloudinary.com/dbfqvsrls/image/upload/v1759681589/download_txpq7w.jpg",
    tags: ["react", "js"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 5,
    title: "Interactive JS Quiz",
    description:
      "A fun, interactive quiz application built with vanilla JavaScript and dynamic DOM manipulation.",
    image:
      "https://res.cloudinary.com/dbfqvsrls/image/upload/v1759681658/Edit_Profile_UI_-_Sergei_Grid_f7lxsf.jpg",
    tags: ["js"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 6,
    title: "Travel Agency Landing Page",
    description:
      "A beautiful and responsive landing page designed to attract and convert customers.",
    image:
      "https://res.cloudinary.com/dbfqvsrls/image/upload/v1759681712/Explore-Travel_Agency_landing_page_hihyp8.jpg",
    tags: ["uidesign"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

// --- DOM ELEMENTS ---
const projectsGrid = document.getElementById("projectsGrid");

// --- RENDER & DISPLAY FUNCTIONS ---

// Render Projects on the Page
function renderProjects(projectsToRender = projects) {
  projectsGrid.innerHTML = "";

  projectsToRender.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    // Create tags HTML
    let tagsHTML = project.tags
      .map((tag) => `<span>${tag.toUpperCase()}</span>`)
      .join("");

    card.innerHTML = `
                    <div class="project-image-container">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p class="description">${project.description}</p>
                        <div class="project-tags">
                            ${tagsHTML}
                        </div>
                        <div class="project-links">
                            <a href="${project.liveUrl}" target="_blank" class="live-btn">View Live</a>
                            <a href="${project.codeUrl}" target="_blank" class="code-btn">View Code</a>
                        </div>
                    </div>
                `;
    projectsGrid.appendChild(card);
  });
}

// Filter Projects
function filterProjects(tag, event) {
  currentFilter = tag;

  // Update active state on filter buttons
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  const filtered =
    tag === "all" ? projects : projects.filter((p) => p.tags.includes(tag));

  renderProjects(filtered);
}

// --- UI & OTHERS ---

// Mobile Menu Toggle
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// Handle Contact Form Submission
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("contactName").value;
  showNotification(`Thank you, ${name}! Your message has been sent.`);

  // Clear the form
  document.getElementById("contactName").value = "";
  document.getElementById("contactEmail").value = "";
  document.getElementById("contactMessage").value = "";
}

// Show Notification
function showNotification(message) {
  // Remove any existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// --- INITIALIZATION ---
window.onload = function () {
  renderProjects();
};
