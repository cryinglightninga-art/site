/* ============================================================================
   AirTrip — project case study.
   Hero, meta table, research/design write-up, a walkthrough video and two
   gallery stills.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      typeLabel: 'Проект',
      title: 'AirTrip',
      meta: [
        { label: 'Роль', value: 'Product Designer' },
        { label: 'Год', value: '2024' },
        { label: 'Команда', value: 'Концептуальный проект' },
        { label: 'Задача', value: 'Упростить планирование путешествий' }
      ],
      process: [
        { heading: 'Исследование', text: 'Я провела качественное исследование, чтобы понять, как пользователи планируют путешествия: где ищут билеты, отели и места, как сохраняют варианты и собирают маршрут. На основе этого выделила ключевой сценарий и разбила сложный ввод данных на пошаговый wizard, чтобы снизить когнитивную нагрузку.' },
        { heading: 'Дизайн', text: 'Спроектировала основной task flow: ввод данных о поездке, настройку перелёта, выбор отеля, планирование маршрута и детальные страницы мест. Также собрала дизайн-систему, подготовила ключевые компоненты и прототип для проверки основного сценария. Визуально сервис получился лёгким и минималистичным: с природными цветами, чистой структурой, flat-графикой и 3D-акцентами.' }
      ],
      galleryLabel: 'Галерея',
      failedLabel: 'не загрузилось'
    },
    en: {
      typeLabel: 'Project',
      title: 'AirTrip',
      meta: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Year', value: '2024' },
        { label: 'Team', value: 'Concept project' },
        { label: 'Task', value: 'Simplify travel planning' }
      ],
      process: [
        { heading: 'Research', text: 'I conducted qualitative research to understand how users plan trips: where they search for flights, hotels, and places, how they save options, and how they build routes. Based on the findings, I defined the core scenario and turned the input-heavy setup stage into a step-by-step wizard to reduce cognitive load.' },
        { heading: 'Design', text: 'I designed the main task flow: trip setup, flight configuration, hotel selection, route planning, and detailed place pages. I also created a design system, prepared key components, and built a prototype to test the main scenario. The visual direction is light and minimal, combining natural colors, clean structure, flat graphics, and 3D accents.' }
      ],
      galleryLabel: 'Gallery',
      failedLabel: 'failed to load'
    }
  };

  // Hosted with the design; swap for a local file if the link ever expires.
  var WALKTHROUGH = 'https://dl.dropboxusercontent.com/scl/fi/3nihtv54t73h0y7eo5qrl/AllTrip.mp4?rlkey=4b0m4jx8s3b9zr6vx8et6v1bv&st=9t7vbi28&dl=0';

  var content = document.querySelector('[data-content]');

  function buildGallery(failedLabel) {
    var frag = document.createDocumentFragment();

    var video = el('video', 'clip', {
      autoplay: '', loop: '', muted: '', playsinline: '', preload: 'auto', src: WALKTHROUGH
    });
    frag.appendChild(ui.videoFrame(video, failedLabel, 'walkthrough'));

    var grid = el('div', 'gallery-grid');
    // Sized up front so the block does not grow under the reader as the files
    // arrive; both stills are 1024x728.
    ['assets/airtrip-1.webp', 'assets/airtrip-2.webp'].forEach(function (src) {
      grid.appendChild(el('img', 'gallery-img', {
        src: src, alt: '', loading: 'lazy', width: '1024', height: '728'
      }));
    });
    frag.appendChild(grid);

    return frag;
  }

  var SCREENS = [
    'assets/airtrip-screen-1.webp',
    'assets/airtrip-screen-2.webp',
    'assets/airtrip-screen-3.webp'
  ];

  // Three screens in a row on the project's own blue, rising into place when
  // the page opens — the same stage MUJO uses.
  function buildStage() {
    var hero = el('div', 'hero is-stage');
    hero.style.setProperty('--stage', '#01b6cf');
    SCREENS.forEach(function (src, i) {
      // The opening screen is the one a phone can do without; the date picker
      // and the hotel list carry the story there.
      var img = el('img', 'stage-shot' + (i === 0 ? ' is-wide-only' : ''), {
        src: src, alt: '', width: '984', height: '700',
        fetchpriority: i === 1 ? 'high' : 'auto'
      });
      // Each one starts a beat after the last.
      img.style.setProperty('--i', String(i));
      hero.appendChild(img);
    });
    return hero;
  }

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    content.appendChild(buildStage());
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(ui.metaGrid(t.meta));

    t.process.forEach(function (p) {
      content.appendChild(ui.block(p.heading, p.text));
    });

    content.appendChild(ui.sectionHeading(t.galleryLabel));
    content.appendChild(buildGallery(t.failedLabel));
  }

  function init() {
    PF.init('sub');
    render();
    PF.onChange(function (reason) { if (reason === 'lang') render(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
