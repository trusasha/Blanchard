// HEADER

// Установка дроплистов в хэдере
function setDropLists() {
  function whenUse(el) {
    if (el.children('.nav-catalog__droplist').hasClass('nav-catalog__droplist_is-open')) {
      //  Если этот элемент уже был выбран
      el.children('.nav-catalog__droplist').removeClass('nav-catalog__droplist_is-open').slideUp(500);
      el.children('.nav-catalog__name').removeClass('nav-catalog__name_is-open');
    } else {
      //  Если этот элемент не был ранее выбран
      $('.nav-catalog__droplist').removeClass('nav-catalog__droplist_is-open').slideUp(100);
      $('.nav-catalog__name').removeClass('nav-catalog__name_is-open');
      el.children('.nav-catalog__droplist').addClass('nav-catalog__droplist_is-open').slideDown(500);
      el.children('.nav-catalog__name').addClass('nav-catalog__name_is-open');
    }
  }

  $('.nav-catalog__items').on('click', function () {
    whenUse($(this))
  });

  // Закрываем выбранный элемент по клику вне его
  $(document.body).on('click', function (click) {
    if (!click.target.classList.contains('nav-catalog__name')) {
      $('.nav-catalog__droplist').removeClass('nav-catalog__droplist_is-open').slideUp(100);
      $('.nav-catalog__name').removeClass('nav-catalog__name_is-open');
    }
  })

  // Устанавливаем на все дроплисты кастомные скроллы
  new SimpleBar($('.droplist__list')[0])
}
// ---
// Установка кнопки бургера
function setBurger() {
  $('.burger__button').on('click', function () {
    $('.burger__icon').toggleClass('burger__icon_is-open');
    $('.menu').slideToggle(300);
  })
}
// ---
// Установка выдвижного поиска для мобильный устройств
function setSearchOnMobile() {
  $('.search-button').on('click', function () {
    $('.search').fadeIn(200);
  });
  $('.search__back').on('click', function () {
    $('.search').fadeOut(200);
  })
}
// ---
setDropLists();
setBurger();
setSearchOnMobile()
// --HEADER

// OFFER
// Слайдер для фона оффера
new Swiper($('.offer-slider')[0], {
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 10000,
  },
  speed: 1500,
  simulateTouch: false,
  loop: true,
  slideClass: 'offer-slider__item',
  wrapperClass: 'offer-slider__list',
})
// --OFFER

// GALLERY
// Слайдер для галереи
new Swiper($('.gallery-slider')[0], {
  loop: false,
  slideClass: 'gallery-slider__item',
  wrapperClass: 'gallery-slider__list',
  speed: 600,
  autoHeight: false,
  nextSlideMessage: 'Следующий слайд',
  prevSlideMessage: 'Предыдущий слайд',
  firstSlideMessage: 'Первый слайд',
  lastSlideMessage: 'Последний слайд',

  pagination: {
    el: document.querySelector('.gallery-slider__fractions'),
    type: 'fraction',
  },

  navigation: {
    nextEl: document.querySelector('.gallery-slider__button-next'),
    prevEl: document.querySelector('.gallery-slider__button-prev'),
  },

  breakpoints: {
    1800: {
      spaceBetween: 50,
      slidesPerColumn: 2,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },

    1200: {
      spaceBetween: 60,
      slidesPerColumn: 2,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },

    650: {
      spaceBetween: 34,
      slidesPerColumn: 2,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },

    440: {
      spaceBetween: 1,
      slidesPerColumn: 1,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    1: {
      spaceBetween: 1,
      slidesPerColumn: 1,
      slidesPerView: 1,
      slidesPerGroup: 1,
    }
  }
})
// ---
// Кастомный селектор для секции галереи
new Choices($('.filter-selector')[0], {
  searchEnabled: false,
  itemSelectText: '',
  classNames: {
    containerOuter: 'filter-select',
    containerInner: 'filter-select__inner',
    placeholder: 'filter-select__placeholder',
    list: 'filter-select__list',
    item: 'filter-select__item',
    listDropdown: 'filter-select__list--dropdown',
    itemChoice: 'filter-select__item--choice',
  },
})
// ---
// Установка карточки при нажатии на картины из галереи
function setCardsOnGallery() {
  $('.gallery-slider__item').on('click', function () {
    const thisDataGallery = $(this)[0].dataset.gallery;
    if (thisDataGallery !== undefined) {
      $(`[data-gallery="${thisDataGallery + '-content'}"]`).addClass('more_is-active');
      $('body').addClass('dark');
    }
  })

  // Закрывает карточку с описанием
  function closeWindow() {
    $('.more').removeClass('more_is-active');
    $('.dark').removeClass('dark');
  }

  // Закрываем окно по клику на крестик
  $('.more__back').on('click', function () {
    closeWindow();
  })

  // Закрываем окно при клике вне карточки с описанием
  $('body').on('click', function (click) {
    if ($(this).hasClass('dark') && click.target.classList.contains('dark')) {
      closeWindow();
    }
  })
}
// ---
setCardsOnGallery();
// --GALLERY

// CATALOG
// Аккордеон для секции каталога
$(function () {
  $(".choice__list").accordion({
    active: 0,
    collapsible: true,
    heightStyle: "content",
  });
});
// ---
// Функционал табов и стилистические изменения в секции
function setTabsCatalog() {
  // Табы для выбора страны в каталоге
  $('.tabs__button').on('click', function () {
    $('.tabs__button').removeClass('tabs__button_is-active');
    $(this).addClass('tabs__button_is-active');
    $('.catalog__main').removeClass('catalog__main_is-active');
    $(`[data-path="${$(this)[0].dataset.path}-content"]`).addClass('catalog__main_is-active');
  })

  //  Табы для выбора художника из каталога
  $('.choice__authors-button').on('click', function () {
    const author = $(this)[0].dataset.author;
    if (author !== undefined) {
      $('.catalog__main_is-active').find('.choice__authors-button').removeClass('choice__authors-button_is-active');
      $(this).addClass('choice__authors-button_is-active');
      $('.catalog__main_is-active').find('.card').removeClass('card_is-active');
      $(`[data-author="${author}-content"]`).addClass('card_is-active');
    }
  })

  // Изменение стилей при открытии аккордеона
  $('.choice__button').on('click', function () {
    $(this).toggleClass('choice__button_is-open');
  })
}
// ---
setTabsCatalog();
// --CATALOG

// EVENTS
// Показываем все карточки событий при нажатии на кнопку
function setEventsBtn() {
  $('.events__all').on('click', function () {
    $(this).css('display', 'none');
    $('.events__item').addClass('events__item_is-open');
  });
}
// ---
// Устанавливает свайпер для событий на мобильные устройства
function setSliderEvents() {
  const eventsSlider = $('.events__container')[0];
  let mySwiperEvents;

  function mobileSlider() {
    if (window.innerWidth <= 650 && eventsSlider.dataset.mobile === 'false') {
      mySwiperEvents = new Swiper(eventsSlider, {
        slideClass: 'events__item',
        wrapperClass: 'events__list',
        speed: 600,
        loop: false,
        simulateTouch: true,
        spaceBetween: 20,
        slidesPerColumn: 1,
        slidesPerView: 1,
        slidesPerGroup: 1,

        pagination: {
          el: $('.events__pagination')[0],
          type: 'bullets',
          bulletClass: 'events__paginator',
          bulletActiveClass: 'events__paginator_is-active',
          clickable: true,
        }
      });
      eventsSlider.dataset.mobile = 'true';
    }

    if (window.innerWidth > 650) {
      eventsSlider.dataset.mobile = 'false';
      if ($('.events__container').hasClass('swiper-container-initialized')) {
        mySwiperEvents.destroy();
      }
    }
  }

  mobileSlider();
  window.addEventListener('resize', () => {
    mobileSlider();
  });
}
// ---
setEventsBtn();
setSliderEvents();
// --EVENTS

// PUBLICATIONS
// Установка свайпера
const mySwiperPublications = new Swiper($('.publications__slider-container')[0], {
  loop: false,
  slideClass: 'publications__item',
  wrapperClass: 'publications__list',
  speed: 600,
  autoHeight: false,

  pagination: {
    el: $('.publications__fractions')[0],
    type: 'fraction',
  },

  navigation: {
    nextEl: $('.publications__button-next')[0],
    prevEl: $('.publications__button-prev')[0],
  },

  breakpoints: {
    1800: {
      spaceBetween: 50,
      slidesPerColumn: 1,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1200: {
      spaceBetween: 50,
      slidesPerColumn: 1,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    960: {
      spaceBetween: 49,
      slidesPerColumn: 1,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    650: {
      spaceBetween: -18,
      slidesPerColumn: 1,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  }
})
// ---
// Удаление/добавление элементов управления свайпером
function toolbarCheck() {
  const numOfCards = $('.publications__item_is-visible').length;
  if (numOfCards <= 3 && window.innerWidth >= 1800) {
    $('.publications__controls').css('display', 'none');
  } else if (numOfCards <= 2 && window.innerWidth >= 960) {
    $('.publications__controls').css('display', 'none');
  } else if (window.innerWidth <= 650) {
    $('.publications__controls').css('display', 'none');
  } else {
    $('.publications__controls').css('display', 'flex');
  }
}
// ---
// Показ книг в соответствии с фильтрами при взаимодействии
function onChangePublications() {
  // Проверка элемента на соответствие указанным пользователем жанрам
  function genresCheck(el) {
    // Принимает в аргументе книгу
    const currentGanre = Object.values(el.dataset)[0];
    let neededGanres = [];

    for (let i = 0; i < $('.publications__checkbox').length; i++) {
      let checkbox = $('.publications__checkbox')[i];
      if (checkbox.checked === true) {
        neededGanres.push($('.publications__checkbox')[i].id);
      }
    }

    if (neededGanres.length === 0) {
      return true;
    }

    return neededGanres.includes(currentGanre);
  }

  // Проверка элемента на соответствие указанным пользователем ценам
  function priceCheck(el) {
    // принимает в аргументе элемент списка
    const minInput = $('#publications__cost-min')[0];
    const maxInput = $('#publications__cost-max')[0];

    let min;
    let max;
    if (minInput.value.match(/\d/g) !== null) {
      min = Number(minInput.value.match(/\d/g).join(''));
    } else {
      min = 0;
    }
    if (maxInput.value.match(/\d/g) !== null) {
      max = Number(maxInput.value.match(/\d/g).join(''));
    } else {
      max = 99999;
    }

    const price = Number(el.children[0].children[1].children[0].children[1].textContent.match(/\d/g).join(''))

    if (price >= min && price <= max) {
      return true
    }
    return false;
  }

  $('.publications__item').removeClass('publications__item_is-visible');

  for (let i = 0; i < $('.publications__item').length; i++) {
    let el = $('.publications__item')[i];
    if (genresCheck(el) && priceCheck(el)) {
      el.classList.add('publications__item_is-visible')
    }
  }
  toolbarCheck()
  mySwiperPublications.update();
}
// ---
// Форматирование ввода в инпуты
function onEnterPublications(key, el) {
  if (key.key === 'Enter' || key.key === 'Enter') return;

  if ((key.key.match(/\d/) === null || el.value.length === 6) && key.key !== 'Backspace') {
    key.preventDefault()
  }

  if (key.key.match(/\d/) !== null) {
    if (el.value.length === 3) {
      key.preventDefault();
      el.value = el.value[0] + ' ' + el.value[1] + el.value[2] + key.key;
    } else if (el.value.length === 5) {
      key.preventDefault();
      el.value = el.value[0] + el.value[2] + el.value[3] + el.value[4] + key.key;
      el.value = el.value[0] + el.value[1] + ' ' + el.value[2] + el.value[3] + key.key;
    }
  }

  if (key.key === 'Backspace') {
    if (el.value.length === 6) {
      key.preventDefault();
      el.value = el.value[0] + ' ' + el.value[1] + el.value[3] + el.value[4];
    } else if (el.value.length === 5) {
      key.preventDefault();
      el.value = el.value[0] + el.value[2] + el.value[3]
    }
  }
}
// ---
$('.publications__cost-input, .publications__checkbox').on('change', function (event) {
  event.preventDefault();
  onChangePublications()
})

$('.publications__cost-input').on('keydown', function (key) {
  onEnterPublications(key, $(this)[0]);
})

// Зависимости от ширины страницы (аккордеон, свайпер)
function mobileAccordion() {
  const categories = document.querySelector('.publications__accordion');
  if (window.innerWidth <= 650 && categories.dataset.mobile === 'false') {
    $(function () {
      $(categories).accordion({
        active: false,
        collapsible: true,
        heightStyle: "content",
      });
    });
    categories.dataset.mobile = 'true';

    // Автоматический перенос уже выделенных жанров вниз при ресайзинге
    document.querySelectorAll('.publications__categories-item').forEach((el) => {
      if (el.children[0].checked === true && !el.classList.contains('publications__categories-item_is-selected')) {
        el.classList.toggle('publications__categories-item_is-selected');
        document.querySelector('.publications__active-filters').append(el);
      }
    })

    // Удаление свайпера
    if (document.querySelector('.publications__slider-container').classList.contains('swiper-container-initialized')) {
      mySwiperPublications.destroy();
    }
    toolbarCheck();
  }

  if (window.innerWidth > 650) {
    // Удаление аккордеона при расайзинге
    categories.dataset.mobile = 'false';
    if (categories.classList.contains('ui-accordion')) {
      $(categories).accordion("destroy");
    }

    toolbarCheck();

    // Перемещение жанров в основной список при ресайзинге
    document.querySelectorAll('.publications__categories-item_is-selected').forEach(el => {
      el.classList.remove('publications__categories-item_is-selected');
      document.querySelector('.publications__categories-list').prepend(el);
    })
  }
}

mobileAccordion()
window.addEventListener('resize', () => {
  mobileAccordion()
})

// Перемещение жанра под список после клика
function ganresOnClickMobile(el) {
  if (window.innerWidth <= 650) {
    const activFilters = document.querySelector('.publications__active-filters');
    if (el.classList.contains('publications__categories-item_is-selected')) {
      el.classList.remove('publications__categories-item_is-selected');
      el.children[0].checked = false;
      document.querySelector('.publications__categories-list').prepend(el);
    } else {
      el.classList.add('publications__categories-item_is-selected');
      el.children[0].checked = true;
      activFilters.append(el);
    }
  }
}

$('.publications__categories-item').on('click', function (click) {
  if (window.innerWidth <= 650) {
    click.preventDefault()
    ganresOnClickMobile($(this)[0]);
  }
})

function onClickArrowForAccordion() {
  $('.publications__subtitle').on ('click', function () {
    if (window.innerWidth <= 650) $(this).toggleClass('publications__subtitle_is-open');
  })
}

onClickArrowForAccordion();
// --PUBLICATIONS

// PROJECTS

const projectsSlider = new Swiper('.projects__slider', {
  loop: false,
  slideClass: 'projects__slide',
  wrapperClass: 'projects__wrapper',
  speed: 600,

  navigation: {
    nextEl: document.querySelector('.projects__button_next'),
    prevEl: document.querySelector('.projects__button_prev'),
  },

  breakpoints: {
    1800: {
      spaceBetween: 50,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1200: {
      spaceBetween: 50,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    960: {
      spaceBetween: 50,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    650: {
      spaceBetween: 34,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    0: {
      spaceBetween: 10,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  }
})
// --PROJECTS

// CONTACTS

ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("contacts__map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.758939, 37.602821],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 14
  });

  myPlacemark = new ymaps.Placemark([55.758939, 37.602821], {}, {
    iconLayout: 'default#image',
    iconImageHref: './image/icons/pin.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-10, -10]
  }),
    myMap.geoObjects.add(myPlacemark);
  myMap.controls.remove('zoomControl',);
  myMap.controls.remove('geolocationControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('routeButtonControl');
  myMap.controls.remove('searchControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');

  let myLocation = ymaps.templateLayoutFactory.createClass(
    '<button id=\"location\" class=\"map__location\">' +
    '<svg class=\"map__icon\" width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M9 17L17 0.5L0 8.5C1.33333 8.83333 4.4 9.8 6 11C7.6 12.2 8.66667 15.5 9 17Z"/>' +
    '</svg>' +
    '</button>', {
    build: function () {
      myLocation.superclass.build.call(this);
      this.locationCallback = ymaps.util.bind(this.location, this);
      $('#location').bind('click', this.locationCallback);
    },

    clear: function () {
      $('#location').unbind('click', this.locationCallback);
      myLocation.superclass.clear.call(this);
    },

    location: function () {
      var geolocation = ymaps.geolocation,
        myMap = new ymaps.Map('map', {
          center: [55, 34],
          zoom: 10
        }, {
          searchControlProvider: 'yandex#search'
        });

      // Сравним положение, вычисленное по ip пользователя и
      // положение, вычисленное средствами браузера.
      geolocation.get({
        provider: 'yandex',
        mapStateAutoApply: true
      }).then(function (result) {
        // Красным цветом пометим положение, вычисленное через ip.
        result.geoObjects.options.set('preset', 'islands#redCircleIcon');
        result.geoObjects.get(0).properties.set({
          balloonContentBody: 'Мое местоположение'
        });
        myMap.geoObjects.add(result.geoObjects);
      });

      geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
      }).then(function (result) {
        // Синим цветом пометим положение, полученное через браузер.
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        myMap.geoObjects.add(result.geoObjects);
      });
    }
  })
  let myLocationControl;
  if (window.innerWidth > 1024) {
    myLocationControl = new ymaps.control.GeolocationControl({
      options: {
        layout: myLocation,
        position: {
          right: 12,
          top: 353
        }
      }
    })
  }

  let myZoomLayout = ymaps.templateLayoutFactory.createClass(
    '<div class=\"map__zoom-control\">' +
    '<button id=\"zoom-in\" class=\"map__zoom-button map__zoom-button_in\">+</button>' +
    '<button id=\"zoom-out\" class=\"map__zoom-button map__zoom-button_out\">_</button>' +
    '</div>', {
    build: function () {
      myZoomLayout.superclass.build.call(this);
      this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
      this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
      $('#zoom-in').bind('click', this.zoomInCallback);
      $('#zoom-out').bind('click', this.zoomOutCallback);
    },

    clear: function () {
      $('#zoom-in').unbind('click', this.zoomInCallback);
      $('#zoom-out').unbind('click', this.zoomOutCallback);
      myZoomLayout.superclass.clear.call(this);
    },

    zoomIn: function () {
      var map = this.getData().control.getMap();
      map.setZoom(map.getZoom() + 1, {
        checkZoomRange: true
      });
    },

    zoomOut: function () {
      var map = this.getData().control.getMap();
      map.setZoom(map.getZoom() - 1, {
        checkZoomRange: true
      });
    }
  });
  let myZoomControl;
  if (window.innerWidth > 1024) {
    myZoomControl = new ymaps.control.ZoomControl({
      options: {
        layout: myZoomLayout,
        position: {
          right: 12,
          top: 260,
        }
      }
    });
  }

  myMap.controls.add(myZoomControl);
  myMap.controls.add(myLocationControl);
}
// --CONTACTS

// Плавный скролл

const $page = $('html, body');
$('a[href*="#"]').click(function () {
  $page.animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 400);
  return false;
});
