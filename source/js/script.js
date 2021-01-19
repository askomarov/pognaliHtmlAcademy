let header = document.querySelector(".header")
let menuButton = header.querySelector('.header-menu__toggle');
let mainMenu = header.querySelector('.header-menu__wrapper');
let headerLogo = header.querySelector(".header__logo")
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
  menuButton.addEventListener('click', function () {
    if (mainMenu.classList.contains("header-menu__wrapper--shown")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "открыть меню");
      mainMenu.classList.remove("header-menu__wrapper--shown");
      if (header.classList.contains("header--fixed")) {
      } else {
        headerLogo.classList.remove("header__logo--blue");
      }
    } else {
      mainMenu.classList.add("header-menu__wrapper--shown");
      menuButton.setAttribute("aria-label", "закрыть меню");
      menuButton.setAttribute("aria-expanded", "true");
      headerLogo.classList.add("header__logo--blue");
    }
  });
};

// фиксируем главное меню при скролле
window.onscroll = function () {            /*функция при прокручивании*/
  if (mainMenu.classList.contains("header-menu__wrapper--shown")) {

  } else {
    if (window.pageYOffset > 100) {				/* если прокрутил больше чем на 200px*/
      header.classList.add("header--fixed");		/*добавялется класс нашему меню и оно затемняется*/
      headerLogo.classList.add("header__logo--blue");
    } else {
      header.classList.remove("header--fixed"); /* если меньше то класс удаляется*/
      headerLogo.classList.remove("header__logo--blue");
    }
  }
};
//

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


function showSettings() {
  let settingsGroups = document.querySelectorAll(".sets-row")
  let btnOpenSetting = document.querySelectorAll(".sets-row__name");
  for (let j = 0; j < settingsGroups.length; j++) {
    settingsGroups[0].classList.remove("sets-row--active")
    settingsGroups[2].classList.remove("sets-row--active")
  }
  for (let i = 0; i < btnOpenSetting.length; i++) {
    btnOpenSetting[i].onclick = function () {
      settingsGroups[i].classList.toggle("sets-row--active");
    }
  }
};

let pageForm = document.querySelector('.page-form');

document.addEventListener('DOMContentLoaded', function () {
  // если JS работает удалим класс
  header.classList.remove('header--no-js');
  // главное меню
  toggleMenu();

  // попап с бизнес-тарифом
  if (tarifPopupSection) {
    showPopup(showTarifPopupBtn, tarifPopupSection, 'business-tarif--show-popup');
    closePopup(closetarifPopupBtn, tarifPopupSection, 'business-tarif--show-popup');
  };

  if (pageCatalog) {
    let filterCountryWrap = document.querySelector(".filter");
    filterCountryWrap.classList.remove("filter--no-js");
    let btnToggleFilterCountry = filterCountryWrap.querySelector('.filter-country__btn');
    let filterCountry = filterCountryWrap.querySelector('.filter-country');
    let btnCloseFilterContry = filterCountryWrap.querySelector('.filter-country__btn-close-countrylist');
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

  if (pageForm) {
    // ошибка если пустая textarea
    let addplanForm = document.querySelector(".addplan__form");
    let planDesc1 = addplanForm.querySelector("#actions-in-1-country");
    let planDesc2 = addplanForm.querySelector("#actions-in-2-country");

    planDesc1.addEventListener("focus", function () {
      if (!planDesc1.value) {
        planDesc1.classList.remove("action-desc-list__textarea--error");
      }
    });
    planDesc2.addEventListener("focus", function () {
      if (!planDesc2.value) {
        planDesc2.classList.remove("action-desc-list__textarea--error");
      }
    });

    addplanForm.addEventListener("submit", function (evt) {
      if (!planDesc1.value) {
        evt.preventDefault();
        planDesc1.classList.add("action-desc-list__textarea--error");
      } else {
        planDesc1.classList.remove("action-desc-list__textarea--error");
      }
      if (!planDesc2.value) {
        evt.preventDefault();
        planDesc2.classList.add("action-desc-list__textarea--error");
      } else {
        planDesc2.classList.remove("action-desc-list__textarea--error");
      }
    });

    // выпадающий список стран
    let dropdownWrapper = document.querySelector(".choose-country__item--current");
    let dropdownMenu = dropdownWrapper.querySelector(".choose-country__submenu");
    let dropdownMenuToggle = dropdownWrapper.querySelector(".choose-country__drop-arrow");

    let dropdownToggle = function () {
      dropdownMenuToggle.addEventListener("click", function () {
        dropdownWrapper.classList.toggle("show-menu");
        dropdownMenu.classList.toggle("choose-country__submenu--open");
      })
    }
    dropdownToggle();
  }
});
