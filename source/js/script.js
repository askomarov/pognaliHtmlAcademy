let menuButton = document.querySelector('.header-menu__toggle');
let mainMenu = document.querySelector('.header-menu__wrapper');

window.addEventListener("resize", function () {
  if (window.innerWidth > 1439.98) {
    mainMenu.classList.remove("header-menu__wrapper--shown");
    menuButton.setAttribute("aria-expanded", "false");
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


let tarifPopupSection = document.querySelector('.business-tarif');
let showTarifPopupBtn = document.querySelector('.pricing__link-business-tarif');
let closetarifPopupBtn = document.querySelector('.business-tarif__close-popup');

function showPopup(btn, section, classToShow) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    section.classList.add(classToShow);
  })
};
function closePopup(btn, section, classToShow) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    section.classList.remove(classToShow);
  });
  document.addEventListener('keyup', function () {
    if (keyCode = 27) {
      section.classList.remove(classToShow);
    }
  });
};


document.addEventListener('DOMContentLoaded', function () {
  toggleMenu();
  showPopup(showTarifPopupBtn, tarifPopupSection, 'business-tarif--show-popup');
  closePopup(closetarifPopupBtn, tarifPopupSection, 'business-tarif--show-popup');
});


// document.addEventListener('keyup', function (event) {
//   console.log('Key: ', event.key);
//   console.log('keyCode: ', event.keyCode);
// });
