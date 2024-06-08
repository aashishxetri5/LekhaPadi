const menuButton = document.getElementById("menu-button");
const dropdownMenu = document.querySelector(".dropdown-menu");

menuButton.addEventListener("click", function () {
  const expanded = this.getAttribute("aria-expanded") === "true" || false;
  this.setAttribute("aria-expanded", !expanded);
  dropdownMenu.classList.toggle("show-menu");
});

// Close the dropdown if the user clicks outside of it
window.addEventListener("click", function (event) {
  if (!event.target.closest(".relative")) {
    dropdownMenu.classList.remove("show-menu");
    menuButton.setAttribute("aria-expanded", false);
  }
});
