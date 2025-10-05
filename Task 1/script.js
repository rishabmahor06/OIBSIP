const menuToggle = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");
  // Toggle icon between bars and times (close)
  const icon = menuToggle.querySelector("i");
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
    menuToggle.classList.add("close-icon");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    menuToggle.classList.remove("close-icon");
  }
});
