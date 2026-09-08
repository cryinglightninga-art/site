/* ============================================================================
   MUJO AI — project case study.
   Hero, meta table, research/design write-up, an auto-advancing slideshow and
   a six-shot gallery.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      typeLabel: 'Проект',
      title: 'MUJO AI',
      meta: [
        { label: 'Роль', value: 'Product Designer' },
        { label: 'Год', value: '2023–2024' },
        { label: 'Команда', value: '1 дизайнер, 3 разработчика' },
        { label: 'Задача', value: 'Упростить создание визуального контента для маркетплейсов' }
      ],
      process: [
        { heading: 'Исследование', text: 'Я изучила, как селлеры и команды e-commerce готовят карточки товаров: подбирают фото, убирают фон, собирают инфографику, пишут описания и адаптируют контент под разные площадки. На основе этого выделила ключевой сценарий — от загрузки товара и генерации описания до редактирования визуала и управления проектами.' },
        { heading: 'Дизайн', text: 'Спроектировала платформу MUJO AI: квиз для онбординга и сбора данных о товаре, онлайн-редактор для создания инфографики, дашборд, личный кабинет, настройки оплаты и таблицу управления проектами. Также собрала дизайн-систему, продумала состояния интерфейса и подготовила макеты для разработки.' }
      ],
      galleryLabel: 'Галерея'
    },
    en: {
      typeLabel: 'Project',
      title: 'MUJO AI',
      meta: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Year', value: '2023–2024' },
        { label: 'Team', value: '1 designer, 3 developers' },
        { label: 'Task', value: 'Simplify marketplace content creation' }
      ],
      process: [
        { heading: 'Research', text: 'I explored how sellers and e-commerce teams prepare product content: choosing photos, removing backgrounds, creating infographics, writing descriptions, and adapting visuals for different marketplaces. Based on this, I defined the core scenario — from product upload and description generation to visual editing and project management.' },
        { heading: 'Design', text: 'I designed the MUJO AI platform: onboarding quiz for collecting product details, an online editor for marketplace infographics, dashboard, personal account, payment settings, and a project management table. I also created the design system, worked through interface states, and prepared layouts for development.' }
      ],
      galleryLabel: 'Gallery'
    }
  };

  var SLIDES = Array.from({ length: 10 }, function (_, i) {
    return 'assets/mujo-slide-' + (i + 1) + '.webp';
  });

  var content = document.querySelector('[data-content]');
  var track = null;
  var slideIndex = 0;

  /* ── Slideshow ────────────────────────────────────────────────────────── */

  function buildSlideshow() {
    var wrap = el('div', 'slideshow');
    track = el('div', 'slideshow-track');
    track.style.width = (SLIDES.length * 100) + '%';

    SLIDES.forEach(function (src) {
      var slide = el('div', 'slide');
      slide.style.width = (100 / SLIDES.length) + '%';
      slide.style.backgroundImage = 'url("' + src + '")';
      track.appendChild(slide);
    });

    wrap.appendChild(track);
    return wrap;
  }

  function positionTrack() {
    track.style.transform = 'translateX(-' + (slideIndex * (100 / SLIDES.length)) + '%)';
  }

  function startSlideshow() {
    if (PF.reduceMotion) return;
    setInterval(function () {
      if (slideIndex < SLIDES.length - 1) {
        slideIndex += 1;
        positionTrack();
        return;
      }
      // Let the last slide rest, then snap back to the first without animating.
      setTimeout(function () {
        slideIndex = 0;
        track.classList.add('is-jumping');
        positionTrack();
        setTimeout(function () { track.classList.remove('is-jumping'); }, 70);
      }, 550);
    }, 4200);
  }

  /* ── Gallery ──────────────────────────────────────────────────────────── */

  function shot(src, extraClass) {
    var node = el('div', 'shot' + (extraClass ? ' ' + extraClass : ''));
    node.style.backgroundImage = 'url("' + src + '")';
    return node;
  }

  function buildGallery() {
    var frag = document.createDocumentFragment();

    var pair1 = el('div', 'gallery-grid has-top-gap');
    pair1.appendChild(shot('assets/mujo-shot-2.webp'));
    pair1.appendChild(shot('assets/mujo-shot-1.webp'));
    frag.appendChild(pair1);

    // Wider left cell — 1.464fr / 1fr on desktop.
    var row = el('div', 'gallery-row-start');
    row.appendChild(shot('assets/mujo-shot-5.webp', 'is-cover'));
    row.lastChild.style.aspectRatio = '1347 / 920';
    row.appendChild(shot('assets/mujo-shot-6.webp', 'is-cover'));
    row.lastChild.style.aspectRatio = '1 / 1';
    frag.appendChild(row);

    var pair2 = el('div', 'gallery-grid has-top-gap');
    pair2.appendChild(shot('assets/mujo-shot-4.webp'));
    pair2.appendChild(shot('assets/mujo-shot-3.webp'));
    frag.appendChild(pair2);

    return frag;
  }

  /* ── Render ───────────────────────────────────────────────────────────── */

  function render() {
    var t = PF.localize(COPY);
    document.title = t.title + ' · ' + PF.sidebarCopy().name;

    content.textContent = '';
    content.appendChild(ui.hero('assets/mujo-hero.webp'));
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(ui.metaGrid(t.meta));

    t.process.forEach(function (p) {
      content.appendChild(ui.block(p.heading, p.text));
    });

    content.appendChild(ui.sectionHeading(t.galleryLabel));
    content.appendChild(buildSlideshow());
    content.appendChild(buildGallery());

    positionTrack();
  }

  function init() {
    PF.init('sub');
    render();
    startSlideshow();
    PF.onChange(function (reason) {
      if (reason !== 'lang') return;
      var keepIndex = slideIndex;
      render();
      slideIndex = keepIndex;
      positionTrack();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
