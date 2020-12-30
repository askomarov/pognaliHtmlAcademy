let menuButton = document.querySelector('.header-menu__toggle');
let mainMenu = document.querySelector('.header-menu__wrapper');
let headerLogo = document.querySelector(".header__logo")
// отнимаем класс у главного меню на десктопе
window.addEventListener("resize", function () {
  if (window.innerWidth > 1439.98) {
    mainMenu.classList.remove("header-menu__wrapper--shown");
    menuButton.setAttribute("aria-expanded", "false");
  }
}
);

// главное меню
function toggleMenu() {
  mainMenu.classList.remove('header-menu__wrapper--no-js');
  menuButton.classList.remove('header-menu__toggle--no-js');

  menuButton.addEventListener('click', function () {
    if (mainMenu.classList.contains("header-menu__wrapper--shown")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "открыть меню");
      mainMenu.classList.remove("header-menu__wrapper--shown");
      headerLogo.classList.remove("header__logo--blue");
    } else {
      mainMenu.classList.add("header-menu__wrapper--shown");
      menuButton.setAttribute("aria-label", "закрыть меню");
      menuButton.setAttribute("aria-expanded", "true");
      headerLogo.classList.add("header__logo--blue");
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



let pageCatalog = document.querySelector('.page-catalog');
let btnToggleFilterCountry = document.querySelector('.btn-filter-country');
let filterCountry = document.querySelector('.filter-country');
let btnCloseFilterContry = document.querySelector('.filter-country__btn-close-countrylist')


function showSettings() {
  let settingRows = document.querySelectorAll(".sets-row");
  for (let i = 0; i < settingRows.length; i++) {
    settingRows[i].onclick = function () {
      this.classList.toggle("sets-row--active");
    }
    // settingRows[i].onmouseover = function () {
    //   this.classList.add("sets-row--active");
    // }
    // settingRows[i].onmouseout = function () {
    //   this.classList.remove("sets-row--active");
    // }
  }
};



document.addEventListener('DOMContentLoaded', function () {
  // главное меню
  toggleMenu();

  // попап с бизнес-тарифом
  if (tarifPopupSection) {
    showPopup(showTarifPopupBtn, tarifPopupSection, 'business-tarif--show-popup');
    closePopup(closetarifPopupBtn, tarifPopupSection, 'business-tarif--show-popup');
  };

  if (pageCatalog) {
    // открыть закрыть меню фильтра стран
    btnToggleFilterCountry.addEventListener("click", function () {
      if (filterCountry.classList.contains("filter-country--open")) {
        btnToggleFilterCountry.setAttribute("aria-expanded", "false");
        btnToggleFilterCountry.setAttribute("aria-label", "открыть меню");
        filterCountry.classList.remove("filter-country--open");
      } else {
        filterCountry.classList.add("filter-country--open");
        btnToggleFilterCountry.setAttribute("aria-label", "закрыть меню");
        btnToggleFilterCountry.setAttribute("aria-expanded", "true");
      }
    })
    closePopup(btnCloseFilterContry, filterCountry, 'filter-country--open');
    // при нажатии на большую кнопку внизу списка фильтра стран
    let closeFilterContry = function () {
      btnCloseFilterContry.addEventListener('click', function (e) {
        e.preventDefault();
        filterCountry.classList.remove("filter-country--open");
        btnToggleFilterCountry.setAttribute("aria-expanded", "false");
        btnToggleFilterCountry.setAttribute("aria-label", "открыть меню");
      });
      document.addEventListener('keyup', function () {
        if (keyCode = 27) {
          filterCountry.classList.remove("filter-country--open");
          btnToggleFilterCountry.setAttribute("aria-expanded", "false");
          btnToggleFilterCountry.setAttribute("aria-label", "открыть меню");
        }
      });
    };
    closeFilterContry();
    showSettings();
  }
});
