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
        { label: 'Роль', value: 'Creator & Product Designer' },
        { label: 'Год', value: '2026' },
        { label: 'Задача', value: 'Собрать план поездки и работу над ним в одном месте' }
      ],
      problemLabel: 'Проблема',
      problemText: 'Поездка в несколько городов разваливается на десятки источников: билеты в почте, брони в приложениях отелей, маршрут в заметках, траты в чате. Существующие планировщики либо хранят брони списком без привязки к дням, либо строят маршрут и не учитывают, как ты добираешься между городами. А общие деньги в компании почти всегда превращаются в «потом посчитаем»: кто за что платил, забывается, а траты идут в двух-трёх валютах сразу.',
      problemText2: 'EasyGoing собирает всё это в маршрут по дням, который можно вести вместе с попутчиками: приглашение по ссылке, роль гостя только для просмотра, личные документы видны только владельцу.',

      hardLabel: 'Сложность 1 — переезд между городами',
      hardText: 'Места в дне спланировать легко. Сложнее всего стык между городами: когда выезжать из отеля, каким рейсом лететь, где заселяться и не остаёшься ли ты без жилья.',
      researchLabel: 'Что показали интервью',
      researchText: 'Я собрала кликабельный прототип и провела 3 интервью с людьми, которые за последний год ездили в 2+ города за поездку. Попросила добавить перелёт с пересадкой и отель в новом городе.',
      researchList: [
        '2 из 3 не нашли, куда добавлять билет: в день вылета или в день прилёта. Один добавил дважды.',
        'Все трое искали отель в «переезде», а не в дне.',
        'Ночной рейс с пересадкой встал не в том порядке, и человек решил, что сломались данные.',
        'Предупреждение «ночь без жилья» сработало там, где заезд совпадал с прилётом, — ему перестали верить.'
      ],
      solutionLabel: 'Решение',
      solutionText: 'Переезд стал отдельной сущностью — плашкой между днями, а не частью дня:',
      solutionList: [
        'один сценарий: выезд из отеля → билеты → заезд, в одной шторке; задачи и документы вроде «купить билеты на синкансэн» прикрепляются к самому переезду;',
        'понятная дата: в заголовке даты по билетам — «27 ноября, Киото → Токио» или «21–22 ноября, Москва → Осака» для ночных рейсов;',
        'правильный порядок: строки сортируются по дате и времени отправления, а если логика другая, их можно перетащить;',
        'честное предупреждение: «без жилья» появляется, только если заезд позже прибытия, а если время заезда неизвестно, приложение молчит;',
        'полный маршрут: первая плашка — дорога в первый город, последняя — обратно домой.'
      ],
      solutionText2: 'Из этого выросло общее правило продукта: создать можно откуда удобно, но у каждой сущности одна шторка, и любая её строка открывает именно её. Карточка дня только показывает, а редактируется всё в шторках.',

      moneyLabel: 'Сложность 2 — общие деньги в разных валютах',
      moneyText: 'В поездке траты копятся быстро и в разных валютах: билеты покупают дома в рублях, отель платят в иенах, такси — в тенге. К концу никто не помнит, кто за что платил, а пересчитывать всё вручную по курсу никто не хочет. Из-за этого деньги делят «примерно» или откладывают разговор, пока он не станет неловким.',
      moneySolutionLabel: 'Решение',
      moneySolutionText: 'Раздел «Деньги» отвечает на один вопрос: кто кому сколько должен.',
      moneyList: [
        'трата за пару секунд: за что, кто платил, сколько и в какой валюте; делим на всех или выбираем, на кого;',
        'долги в исходной валюте: по умолчанию долги считаются отдельно в каждой валюте — так, как люди и возвращают деньги, без искажений от курса;',
        'конвертация по запросу: один переключатель сводит все долги в одну валюту по актуальному курсу; дата курса видна, поэтому понятно, откуда цифра;',
        'минимум переводов: приложение сводит взаимные долги и показывает самый короткий способ рассчитаться — сколько переводов и кому;',
        'возврат закрывает долг: перевод отмечается возвратом, и баланс сразу пересчитывается; траты сгруппированы по дням, поэтому легко вспомнить, за что платили.'
      ],

      systemLabel: 'Дизайн-система',
      systemText: 'Компоненты и цвета — на переменных Figma со светлой и тёмной темой: шапки, шторки, строки списков, поля, чипсы, бейджи, пустые состояния. Поведенческие правила зашиты в сами компоненты, поэтому работают везде, где компонент используется.',
      galleryLabel: 'Галерея',
      failedLabel: 'не загрузилось',
      lightLabel: 'Светлая тема',
      darkLabel: 'Тёмная тема'
    },
    en: {
      typeLabel: 'Project',
      title: 'EasyGoing — a planner for shared trips',
      meta: [
        { label: 'Role', value: 'Creator & Product Designer' },
        { label: 'Year', value: '2026' },
        { label: 'Task', value: 'Bring a trip plan and planning it together into one app' }
      ],
      problemLabel: 'Problem',
      problemText: 'A multi-city trip falls apart into dozens of sources: tickets in email, bookings in hotel apps, the route in notes, expenses in a group chat. Existing planners either keep bookings as a flat list with no link to days, or build a route that ignores how you get between cities. And shared money almost always becomes \u201cwe\u2019ll sort it out later\u201d: nobody remembers who paid for what, and spending happens in two or three currencies at once.',
      problemText2: 'EasyGoing pulls it all into a day-by-day route you can run with travel companions: invites by link, a view-only guest role, and personal documents visible only to their owner.',

      hardLabel: 'Challenge 1 — getting between cities',
      hardText: 'Planning places within a day is easy. The hard part is the seam between cities: when to check out, which flight to take, where to check in, and whether you\u2019ll be left without a place to stay.',
      researchLabel: 'What the interviews showed',
      researchText: 'I built a clickable prototype and ran 3 interviews with people who had visited 2+ cities on one trip in the past year. I asked them to add a flight with a layover and a hotel in the next city.',
      researchList: [
        '2 of 3 couldn\u2019t tell where a ticket belongs — the departure day or the arrival day. One added it twice.',
        'All three looked for the hotel under \u201ctransfer\u201d, not under the day.',
        'An overnight flight with a layover showed up in the wrong order, and the participant assumed the data was broken.',
        'The \u201cnight without a place to stay\u201d warning fired when check-in matched arrival, so people stopped trusting it.'
      ],
      solutionLabel: 'Solution',
      solutionText: 'The transfer became its own entity — a card between days rather than part of a day:',
      solutionList: [
        'one flow: check-out → tickets → check-in in a single sheet; tasks and documents such as \u201cbuy shinkansen tickets\u201d attach to the transfer itself;',
        'clear dates: the title carries the ticket dates — \u201c27 November, Kyoto → Tokyo\u201d, or \u201c21–22 November, Moscow → Osaka\u201d for overnight flights;',
        'correct order: rows sort by departure date and time, and can be dragged when the trip\u2019s logic differs;',
        'an honest warning: \u201cwithout a place to stay\u201d appears only when check-in is later than arrival; if the check-in time is unknown, the app stays quiet;',
        'the whole journey: the first card is the way to the first city, the last one is the way home.'
      ],
      solutionText2: 'This turned into a product-wide rule: you can create things wherever it\u2019s convenient, but every entity has one sheet, and any of its rows opens that sheet. The day card only shows; everything is edited in sheets.',

      moneyLabel: 'Challenge 2 — shared money in several currencies',
      moneyText: 'On a trip, expenses pile up fast and in different currencies: flights are bought at home in roubles, the hotel is paid in yen, taxis in tenge. By the end nobody remembers who paid for what, and nobody wants to convert everything by hand. So money gets split \u201croughly\u201d, or the conversation is put off until it gets awkward.',
      moneySolutionLabel: 'Solution',
      moneySolutionText: 'The \u201cMoney\u201d section answers one question: who owes whom, and how much.',
      moneyList: [
        'an expense in seconds: what for, who paid, how much and in which currency; split between everyone or chosen people;',
        'debts in the original currency: by default debts are kept separately per currency — the way people actually pay each other back, with no exchange-rate distortion;',
        'conversion on demand: one toggle brings all debts into a single currency at the current rate; the rate date is shown, so it\u2019s clear where the number comes from;',
        'fewest transfers: the app nets out mutual debts and shows the shortest way to settle — how many transfers and to whom;',
        'a refund closes the debt: a transfer is logged as a refund and the balance updates at once; expenses are grouped by day, which makes it easy to remember what they were for.'
      ],

      systemLabel: 'Design system',
      systemText: 'Components and colours run on Figma variables with light and dark themes: headers, sheets, list rows, fields, chips, badges and empty states. Behaviour rules are built into the components themselves, so they work everywhere a component is used.',
      galleryLabel: 'Gallery',
      failedLabel: 'failed to load',
      lightLabel: 'Light theme',
      darkLabel: 'Dark theme'
    }
  };

  // key → the Figma frame it comes from, so a re-export is a one-line change.
  var SHOTS = {
    '01-trips':     'v2 01 Мои поездки',
    '15-country':   'v2 15 Мастер — Страна',
    '16-cities':    'v2 16 Мастер — Города и ночи',
    '17-mates':     'v2 17 Мастер — Попутчики',
    '18-created':   'v2 18 Поездка создана',
    '48-empty':     'v2 48 Поездка — пусто (только создана)',
    '02a-done':     'v2 02a Поездка — задача выполнена',
    '05-day':       'v2 05 Шторка дня — 22 ноября',
    '03-files':     'v2 03 Мои файлы',
    '08-hotels':    'v2 08 Отели',
    '09-docs':      'v2 09 Документы',
    '10a-exchange': 'v2 10a Деньги — конвертация',
    '11-checklist': 'v2 11 Чек-лист',
    '06-place':     'v2 06 Шторка места'
  };

  // The hero: the trip list, the plan, and the day sheet standing over it.
  // Each is exported already sitting in the same phone mockup the ContentLog
  // hero uses, so the two pages open the same way.
  // The same three files as the cover on the home page, so the second page
  // takes them from the cache instead of fetching them again.
  var STAGE = ['trips', 'plan', 'day'];

  // The gallery, in the order a trip is actually made and then run.
  // Каждый ключ — имя макета в Figma: 01 Мои поездки, 15 Мастер — Страна,
  // 16 Города и ночи, 17 Попутчики, 18 Поездка создана, 48 Поездка — пусто,
  // 02a Задача выполнена, 05 Шторка дня, 03 Мои файлы, 08 Отели,
  // 09 Документы, 10a Деньги — конвертация, 11 Чек-лист, 06 Шторка места.
  var RAIL = ['01-trips', '15-country', '16-cities', '17-mates', '18-created',
              '48-empty', '02a-done', '05-day', '03-files', '08-hotels',
              '09-docs', '10a-exchange', '11-checklist', '06-place'];

  // The promo clip opens the gallery. Set it when the file lands.
  var PROMO = null;

  var content = document.querySelector('[data-content]');

  function shot(key, theme) { return 'assets/eg-' + key + '-' + theme + '.png' + PF.av; }
  var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  // Three shots standing on a plain stage, exactly as the ContentLog hero:
  // sized by height, each rising a beat after the last.
  // Built once as well: the language has nothing to say about these three,
  // and rebuilding them replayed the entrance and made them blink.
  var stageNode = null;

  function buildStage() {
    if (stageNode) return stageNode;
    var hero = el('div', 'hero is-screens is-even');
    var row = el('div', 'screens');
    STAGE.forEach(function (key, i) {
      // On a phone the plan leads from the middle, the others stand lower.
      var img = el('img', 'screen' + (i === 1 ? ' is-lead' : ''), {
        src: 'assets/eg-screen-' + key + '.png' + PF.av, alt: '',
        width: '332', height: '680',
        fetchpriority: i === 1 ? 'high' : 'auto'
      });
      img.style.setProperty('--i', String(i));
      img.style.setProperty('--mo', String([1, 2, 3][i]));
      row.appendChild(img);
    });
    hero.appendChild(row);
    stageNode = hero;
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
  //
  // The strip is built once and kept across a change of language: the words
  // above it are swapped, the shots are not. Otherwise the whole thing was
  // rebuilt from scratch and the chosen theme — a thing the language has no
  // business touching — fell back to light.
  var screens = null;

  function buildScreens(t) {
    var head = el('div', 'rail-head');
    var heading = ui.sectionHeading(t.galleryLabel);
    head.appendChild(heading);

    var seg = el('div', 'seg is-icons');
    var rail = el('div', 'shot-rail');
    var imgs = [];

    var theme = 'light';

    // Fifteen screens in two themes is three megabytes, and the strip shows
    // two at a time. A shot is fetched when it comes near the edge of the
    // strip, not when the page opens; its box is held by the width and height
    // below, so nothing jumps and the placeholder sits in its place.
    // A browser holds the picture it has until the next one is decoded, so
    // swapping the address alone left the light shot on screen and the switch
    // looked dead. The shot is cleared first — the placeholder takes its
    // place — and the new one goes in once it is ready.
    function show(img) {
      var want = shot(img.dataset.shot, theme);
      if (img.dataset.want === want) return;
      img.dataset.want = want;

      if (img.getAttribute('src')) {
        // A clear pixel rather than no address at all: an empty img draws the
        // browser's broken-picture mark in the corner.
        img.src = BLANK;
        img.classList.add('is-swapping');
      }

      var next = new Image();
      next.onload = next.onerror = function () {
        if (img.dataset.want !== want) return;   // the theme moved on meanwhile
        img.src = want;
        img.classList.remove('is-swapping');
      };
      next.src = want;
    }

    var near = null;
    if (typeof IntersectionObserver !== 'undefined') {
      near = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) show(entry.target);
        });
      }, { root: rail, rootMargin: '0px 700px' });
    }

    RAIL.forEach(function (key, i) {
      var img = el('img', 'rail-shot', { alt: '', width: '603', height: '1311' });
      img.dataset.shot = key;
      rail.appendChild(img);
      imgs.push(img);
      // The first two are on screen the moment the strip is; the rest wait.
      if (i < 2 || !near) show(img);
      if (near) near.observe(img);
    });

    var btns = [];
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
        theme = opt[0];
        // Only what has already been fetched is swapped; the rest will come
        // in the new theme when the strip reaches them.
        imgs.forEach(function (img) { if (img.dataset.want) show(img); });
      });
      btns.push(btn);
      seg.appendChild(btn);
    });

    ui.trackKnob(seg, '.seg-btn');
    head.appendChild(seg);

    return {
      head: head,
      rail: rail,
      // The language gives the heading and the two tooltips, nothing else.
      relabel: function (t2) {
        heading.textContent = t2.galleryLabel;
        [t2.lightLabel, t2.darkLabel].forEach(function (label, i) {
          btns[i].setAttribute('title', label);
          btns[i].setAttribute('aria-label', label);
        });
      }
    };
  }

  function list(items) {
    var ul = el('ul', 'block-list');
    items.forEach(function (text) {
      var li = el('li');
      li.textContent = text;
      ul.appendChild(li);
    });
    return ul;
  }

  // Заголовок, абзац и список одним блоком, чтобы перечисление не отрывалось
  // от текста, который его вводит.
  function section(heading, text, items, extraClass) {
    var wrap = el('div', 'block' + (extraClass ? ' ' + extraClass : ''));
    if (heading) {
      var h = el('h2', 'block-heading');
      h.textContent = heading;
      wrap.appendChild(h);
    }
    if (text) {
      var para = el('p', 'para');
      para.textContent = text;
      wrap.appendChild(para);
    }
    if (items) wrap.appendChild(list(items));
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
    // Taking the strip out of the page zeroes its scroll, so where it stood is
    // noted and put back.
    var railAt = screens ? screens.rail.scrollLeft : 0;

    content.textContent = '';
    content.appendChild(buildStage());
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(ui.metaGrid(t.meta, 'cols-3'));

    content.appendChild(ui.block(t.problemLabel, t.problemText));
    content.appendChild(ui.block(null, t.problemText2));

    content.appendChild(ui.block(t.hardLabel, t.hardText));
    // Цифры интервью пока выдуманные — блок помечен, пока их не заменят.
    content.appendChild(section(t.researchLabel, t.researchText, t.researchList, 'is-draft'));
    content.appendChild(section(t.solutionLabel, t.solutionText, t.solutionList));
    content.appendChild(ui.block(null, t.solutionText2));

    content.appendChild(ui.block(t.moneyLabel, t.moneyText));
    content.appendChild(section(t.moneySolutionLabel, t.moneySolutionText, t.moneyList));

    content.appendChild(ui.block(t.systemLabel, t.systemText));

    // The clip opens the gallery; the rail of screens follows it.
    if (PROMO) content.appendChild(buildPromo(t.failedLabel));
    if (!screens) screens = buildScreens(t);
    else screens.relabel(t);
    content.appendChild(screens.head);
    content.appendChild(screens.rail);
    if (railAt) screens.rail.scrollLeft = railAt;
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
