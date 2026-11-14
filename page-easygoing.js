/* ============================================================================
   EasyGoing — a planner for shared trips, built as a pet project.
   The hero puts three screens in phone mockups; the gallery runs the promo
   clip first, then one rail of screens with a light/dark switch above it.

   Every shot is exported from the Figma file "Travel-planner", from the
   frames named "v2 <номер> <название>" — both the light and the dark
   section. SHOTS below keeps that number so a screen can be re-exported
   under the same name without hunting for it.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      typeLabel: 'Проект',
      title: 'EasyGoing — планировщик совместных поездок',
      meta: [
        { label: 'Роль', value: 'Product Designer' },
        { label: 'Год', value: '2026' },
        { label: 'Команда', value: 'Личный проект' },
        { label: 'Задача', value: 'Собрать план поездки и работу над ним в одном месте' }
      ],
      taskLabel: 'Задача',
      taskText: 'Маршрут, отели, билеты, документы, виза и общие траты обычно разбросаны по заметкам, чатам и почте. Нужен продукт, где поездку в любую страну создаёшь за пару шагов, планируешь по дням и ведёшь вместе с попутчиками.',
      designLabel: 'Дизайн',
      designText: 'Начала не с экранов, а с того, как поездку собирают сейчас: маршрут живёт в заметках, билеты — в почте, брони — в чатах, а общие траты выясняются постфактум в переписке. Я разложила этот путь на доске как есть, рядом собрала целевой — вход, создание поездки, план по дням, приглашение попутчиков — и проверила его кликабельным прототипом без визуала, чтобы ошибки в логике вылезли до того, как появится первый макет.',
      designText2: 'Главный экран — маршрут по дням с переключением между городами; день открывается шторкой, где собраны переезд, задачи, документы и места с картой Google. Пустые разделы не занимают место: сворачиваются в строку быстрых кнопок, а всё, что можно добавить, живёт в одном паттерне пунктирной плашки. То, что не привязано ко дню, ушло во вкладку «Мои файлы» — отели, виза по шагам, документы, чек-лист и общие траты в разных валютах. Совместная работа заложена в саму логику: приглашение по ссылке или QR с ролью «участник» или «гость», личные документы по умолчанию видны только владельцу, а при правке дат приложение предупреждает, какие планы пропадут. Держится всё это на дизайн-системе из переменных Figma со светлой и тёмной темой: шапки, шторки, строки списков, поля, чипсы, пустые состояния.',
      galleryLabel: 'Галерея',
      failedLabel: 'не загрузилось',
      lightLabel: 'Светлая тема',
      darkLabel: 'Тёмная тема'
    },
    en: {
      typeLabel: 'Project',
      title: 'EasyGoing — a planner for shared trips',
      meta: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Year', value: '2026' },
        { label: 'Team', value: 'Personal project' },
        { label: 'Task', value: 'Bring a trip plan and planning it together into one app' }
      ],
      taskLabel: 'Task',
      taskText: 'Routes, hotels, tickets, documents, visas and shared expenses are usually scattered across notes, chats and email. The goal was a product where you create a trip to any country in a few steps, plan it day by day, and run it together with your travel companions.',
      designLabel: 'Design',
      designText: 'I started not with screens but with how a trip actually gets put together today: the route lives in notes, tickets in email, bookings in chats, and who owes whom is worked out afterwards in a group thread. I mapped that path as it is, built the target flow beside it — sign-in, trip creation, the day-by-day plan, inviting companions — and tested it with a clickable prototype before any visuals, so the gaps in the logic surfaced before the first design did.',
      designText2: 'The main screen is a day-by-day route with switching between cities; a day opens as a sheet holding transfers, tasks, documents and places with Google Maps. Empty sections take up no room: they collapse into a row of quick buttons, and everything you can add lives in one dashed-card pattern. What isn’t tied to a day moved into the “My files” tab — hotels, visa steps, documents, a checklist and shared expenses in several currencies. Collaboration is built into the logic itself: invites by link or QR as a “member” or a view-only “guest”, personal documents visible only to their owner by default, and a warning about which plans will be lost when the dates change. All of it rests on a design system of Figma variables with light and dark themes: headers, sheets, list rows, fields, chips and empty states.',
      galleryLabel: 'Gallery',
      failedLabel: 'failed to load',
      lightLabel: 'Light theme',
      darkLabel: 'Dark theme'
    }
  };

  // key → the Figma frame it comes from, so a re-export is a one-line change.
  var SHOTS = {
    '01-trips':     'v2 01 Мои поездки',
    '02-plan':      'v2 02 Поездка — План',
    '03-files':     'v2 03 Мои файлы',
    '05-day':       'v2 05 Шторка дня — 22 ноября',
    '08-hotels':    'v2 08 Отели',
    '09-docs':      'v2 09 Документы',
    '10-money':     'v2 10 Деньги',
    '11-checklist': 'v2 11 Чек-лист',
    '13-new':       'v2 13 Новая поездка',
    '14-tickets':   'v2 14 Нашли в билетах',
    '15-country':   'v2 15 Мастер — Страна',
    '16-cities':    'v2 16 Мастер — Города и ночи',
    '17-mates':     'v2 17 Мастер — Попутчики',
    '18-created':   'v2 18 Поездка создана',
    '48-empty':     'v2 48 Поездка — пусто (только создана)'
  };

  // The hero: the trip list, the plan, and the day sheet standing over it.
  // Each is exported already sitting in the same phone mockup the ContentLog
  // hero uses, so the two pages open the same way.
  var STAGE = ['01-trips', '02-plan', '05-day'];

  // The gallery, in the order a trip is actually made and then run.
  var RAIL = ['01-trips', '13-new', '14-tickets', '15-country', '16-cities',
              '17-mates', '18-created', '48-empty', '02-plan', '05-day',
              '03-files', '08-hotels', '09-docs', '10-money', '11-checklist'];

  // The promo clip opens the gallery. Set it when the file lands.
  var PROMO = null;

  var content = document.querySelector('[data-content]');

  function shot(key, theme) { return 'assets/eg-' + key + '-' + theme + '.png' + PF.av; }

  // Three shots standing on a plain stage, exactly as the ContentLog hero:
  // sized by height, each rising a beat after the last.
  function buildStage() {
    var hero = el('div', 'hero is-screens');
    hero.style.setProperty('--stage', '#1f2227');
    var row = el('div', 'screens');
    STAGE.forEach(function (key, i) {
      // On a phone the plan leads from the middle, the others stand lower.
      var img = el('img', 'screen' + (i === 1 ? ' is-lead' : ''), {
        src: 'assets/eg-hero-' + key + '-light.png' + PF.av, alt: '',
        width: '900', height: '1222',
        fetchpriority: i === 1 ? 'high' : 'auto'
      });
      img.style.setProperty('--i', String(i));
      img.style.setProperty('--mo', String([1, 2, 3][i]));
      row.appendChild(img);
    });
    hero.appendChild(row);
    return hero;
  }

  var SUN = '<svg viewBox="0 0 21.48 21.2" aria-hidden="true" focusable="false">'
    + '<path d="M10.5664 3.79883C11.0254 3.79883 11.4062 3.41797 11.4062 2.94922L11.4062 0.849609C11.4062 0.380859 11.0254 0 10.5664 0C10.0977 0 9.7168 0.380859 9.7168 0.849609L9.7168 2.94922C9.7168 3.41797 10.0977 3.79883 10.5664 3.79883ZM15.3516 5.80078C15.6836 6.12305 16.2207 6.13281 16.5527 5.80078L18.0469 4.30664C18.3691 3.98438 18.3691 3.4375 18.0469 3.10547C17.7246 2.7832 17.1777 2.7832 16.8555 3.10547L15.3516 4.60938C15.0293 4.93164 15.0293 5.47852 15.3516 5.80078ZM17.334 10.5957C17.334 11.0547 17.7246 11.4355 18.1836 11.4355L20.2832 11.4355C20.7422 11.4355 21.123 11.0547 21.123 10.5957C21.123 10.1367 20.7422 9.74609 20.2832 9.74609L18.1836 9.74609C17.7246 9.74609 17.334 10.1367 17.334 10.5957ZM15.3516 15.3906C15.0293 15.7227 15.0293 16.2598 15.3516 16.582L16.8555 18.0957C17.1777 18.418 17.7246 18.3984 18.0469 18.0859C18.3691 17.7539 18.3691 17.2168 18.0469 16.8945L16.543 15.3906C16.2207 15.0684 15.6836 15.0781 15.3516 15.3906ZM10.5664 17.3926C10.0977 17.3926 9.7168 17.7734 9.7168 18.2324L9.7168 20.3418C9.7168 20.8008 10.0977 21.1816 10.5664 21.1816C11.0254 21.1816 11.4062 20.8008 11.4062 20.3418L11.4062 18.2324C11.4062 17.7734 11.0254 17.3926 10.5664 17.3926ZM5.77148 15.3906C5.43945 15.0781 4.89258 15.0684 4.57031 15.3906L3.07617 16.8848C2.75391 17.207 2.75391 17.7441 3.06641 18.0762C3.38867 18.3887 3.94531 18.4082 4.26758 18.0859L5.76172 16.582C6.08398 16.2598 6.08398 15.7227 5.77148 15.3906ZM3.78906 10.5957C3.78906 10.1367 3.39844 9.74609 2.93945 9.74609L0.839844 9.74609C0.380859 9.74609 0 10.1367 0 10.5957C0 11.0547 0.380859 11.4355 0.839844 11.4355L2.93945 11.4355C3.39844 11.4355 3.78906 11.0547 3.78906 10.5957ZM5.76172 5.80078C6.08398 5.48828 6.08398 4.92188 5.77148 4.60938L4.27734 3.10547C3.96484 2.79297 3.4082 2.7832 3.08594 3.10547C2.76367 3.4375 2.76367 3.98438 3.07617 4.29688L4.57031 5.80078C4.89258 6.12305 5.42969 6.12305 5.76172 5.80078Z"/>'
    + '<path d="M10.5566 15.5664C13.3008 15.5664 15.5273 13.3398 15.5273 10.5957C15.5273 7.85156 13.3008 5.61523 10.5566 5.61523C7.8125 5.61523 5.58594 7.85156 5.58594 10.5957C5.58594 13.3398 7.8125 15.5664 10.5566 15.5664Z"/></svg>';

  var MOON = '<svg viewBox="0 0 22.59 21.87" aria-hidden="true" focusable="false">'
    + '<path d="M18.8281 11.3574C19.0137 11.3574 19.1406 11.2305 19.1602 11.0352C19.4824 8.42773 19.6094 8.35938 22.2559 7.92969C22.4609 7.90039 22.5879 7.79297 22.5879 7.60742C22.5879 7.42188 22.4609 7.30469 22.2949 7.27539C19.6289 6.76758 19.4824 6.77734 19.1602 4.16992C19.1406 3.97461 19.0137 3.84766 18.8281 3.84766C18.6523 3.84766 18.5254 3.97461 18.4961 4.16016C18.1641 6.80664 18.0664 6.89453 15.3613 7.27539C15.1953 7.29492 15.0684 7.42188 15.0684 7.60742C15.0684 7.7832 15.1953 7.90039 15.3613 7.92969C18.0664 8.44727 18.1543 8.44727 18.4961 11.0547C18.5254 11.2305 18.6523 11.3574 18.8281 11.3574ZM14.1602 4.74609C14.2773 4.74609 14.3359 4.67773 14.3555 4.57031C14.6582 2.93945 14.6484 2.90039 16.3477 2.57812C16.4551 2.55859 16.5332 2.49023 16.5332 2.37305C16.5332 2.25586 16.4551 2.1875 16.3477 2.16797C14.6484 1.82617 14.707 1.78711 14.3555 0.175781C14.3359 0.0683594 14.2773 0 14.1602 0C14.043 0 13.9746 0.0683594 13.9551 0.175781C13.6133 1.78711 13.6719 1.82617 11.9727 2.16797C11.8555 2.1875 11.7871 2.25586 11.7871 2.37305C11.7871 2.49023 11.8555 2.55859 11.9727 2.57812C13.6719 2.91992 13.6523 2.93945 13.9551 4.57031C13.9746 4.67773 14.043 4.74609 14.1602 4.74609Z"/>'
    + '<path d="M11.4746 20.2832C14.9805 20.2832 17.8223 18.1641 19.0723 15.4785C19.3457 14.9023 18.9941 14.5312 18.457 14.6973C17.8613 14.9023 16.875 15.0879 15.9668 15.0879C11.1426 15.0879 8.37891 12.3242 8.37891 7.49023C8.37891 6.5918 8.58398 5.55664 8.86719 4.84375C9.11133 4.22852 8.69141 3.87695 8.11523 4.13086C5.23438 5.38086 3.04688 8.33984 3.04688 11.8555C3.04688 16.5137 6.81641 20.2832 11.4746 20.2832Z"/></svg>';

  // One rail, two sets of files. The switch swaps the source of every shot in
  // place, so the order and the scroll position never change.
  function buildScreens(t) {
    var head = el('div', 'rail-head');
    head.appendChild(ui.sectionHeading(t.galleryLabel));

    var seg = el('div', 'seg is-icons');
    var rail = el('div', 'shot-rail');
    var imgs = [];

    RAIL.forEach(function (key) {
      var img = el('img', 'rail-shot', {
        src: shot(key, 'light'), alt: '', loading: 'lazy',
        width: '804', height: '1748'
      });
      img.dataset.shot = key;
      rail.appendChild(img);
      imgs.push(img);
    });

    // The other theme is fetched up front, so the switch never shows a gap.
    RAIL.forEach(function (key) { var p = new Image(); p.src = shot(key, 'dark'); });

    [['light', SUN, t.lightLabel], ['dark', MOON, t.darkLabel]].forEach(function (opt) {
      var btn = el('button', 'seg-btn' + (opt[0] === 'light' ? ' is-active' : ''), {
        type: 'button', title: opt[2], 'aria-label': opt[2]
      });
      btn.innerHTML = opt[1];
      btn.addEventListener('click', function () {
        if (btn.classList.contains('is-active')) return;
        Array.prototype.forEach.call(seg.children, function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        imgs.forEach(function (img) { img.src = shot(img.dataset.shot, opt[0]); });
      });
      seg.appendChild(btn);
    });

    ui.trackKnob(seg, '.seg-btn');
    head.appendChild(seg);

    var wrap = document.createDocumentFragment();
    wrap.appendChild(head);
    wrap.appendChild(rail);
    return wrap;
  }

  function buildPromo(failedLabel) {
    var video = el('video', 'clip', {
      autoplay: '', loop: '', muted: '', playsinline: '',
      preload: 'auto', poster: PROMO.poster, src: PROMO.src
    });
    return ui.videoFrame(video, failedLabel, 'clip-wrap');
  }

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    content.appendChild(buildStage());
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(ui.metaGrid(t.meta));

    content.appendChild(ui.block(t.taskLabel, t.taskText));

    content.appendChild(ui.block(t.designLabel, t.designText));
    content.appendChild(ui.block(null, t.designText2));

    // The clip opens the gallery; the rail of screens follows it.
    if (PROMO) content.appendChild(buildPromo(t.failedLabel));
    content.appendChild(buildScreens(t));
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
