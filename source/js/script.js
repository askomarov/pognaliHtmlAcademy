let menuButton = document.querySelector('.header-menu__toggle');
let mainMenu = document.querySelector('.header-menu__wrapper');

window.addEventListener("resize", function () {
  if (window.innerWidth > 1439.98) {
    mainMenu.classList.remove("header-menu__wrapper--shown");
    navToggle.setAttribute("aria-expanded", "false");
  }
}
);

function toggleMenu() {
  mainMenu.classList.remove('header-menu__wrapper--no-js');
  menuButton.classList.remove('header-menu__toggle--no-js');

  menuButton.addEventListener('click', function () {
    if (mainMenu.classList.contains("header-menu__wrapper--shown")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "открыть меню");
      mainMenu.classList.remove("header-menu__wrapper--shown");
    } else {
      mainMenu.classList.add("header-menu__wrapper--shown");
      menuButton.setAttribute("aria-label", "закрыть меню");
      menuButton.setAttribute("aria-expanded", "true");
    }
  });
};
document.addEventListener('DOMContentLoaded', function () {
  toggleMenu();
});

// document.addEventListener('DOMContentLoaded', function () {
//   navToggle.addEventListener("click", function () {
//     console.log('нажал');

//   });
// });
