/* ============================================================================
   ContentLog — a personal shoot tracker, built as a pet project.
   The promo clip opens the gallery; the rest of the shots follow once they
   arrive.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      typeLabel: 'Pet проект',
      title: 'ContentLog — трекер съёмок для блога',
      meta: [
        { label: 'Роль', value: 'Product Designer' },
        { label: 'Год', value: '2026' },
        { label: 'Команда', value: 'Личный проект' },
        { label: 'Задача', value: 'Собрать все идеи съёмок в одном месте' }
      ],
      failedLabel: 'не загрузилось',
      contextLabel: 'Вводные',
      contextText: 'Я веду фэшн-блог, и идеи для видео копились везде сразу: заметки в телефоне, сохранённые рилсы, скриншоты, голосовые самой себе. К моменту съёмки половина терялась, а по оставшимся было не понять, что уже снято, что на монтаже, а что ждёт публикации.',
      contextText2: 'Обычные таск-трекеры под это не подходят. Они про задачи со сроками, а у съёмки своя логика: ей нужны референсы, фото, список кадров и состояние «погода не та, отложили до лучших времён». Поэтому я сделала инструмент под собственный процесс.',
      designLabel: 'Дизайн',
      designText: 'В основе — пайплайн из пяти статусов: бэклог → в процессе → монтаж → запостить → готово. У каждого свой цвет, по нему же работает фильтр на главном экране. Холд и отмену я намеренно вынесла из пайплайна в архив: это не стадии производства, и в общей сетке они бы только шумели.',
      designText2: 'Карточка идеи — это всё, что нужно на съёмке: название, обложка и до трёх фото веером, тип поста, ссылка-референс, заметки и чек-лист с готовым набором «Базовые кадры». Под названием — флаги: улица, одежда, есть трудности. Короткие метки, по которым сразу видно, что съёмка зависит от погоды или что нужно заранее собрать образ.',
      designText3: 'Идеи группируются в подборки — «Япония», «Съёмка на улице». У подборки свой экран, так что готовиться к серии съёмок можно, не отвлекаясь на остальной бэклог.',
      designText4: 'Дизайн-система собрана под инструмент, а не под витрину: утилитарная, без декора, вся нагрузка — на цвет статуса и типографику. Из украшений только микроанимации — карточки появляются по очереди, сетка перестраивается при смене фильтра, фото раскрываются веером.',
      buildLabel: 'Как собрано',
      buildText: 'Макеты я сделала в Figma, а рабочее приложение собрала вместе с Claude: сначала прототипом, потом перенесла на свой хостинг — статика на Netlify, данные и фото в Supabase. Это PWA: ставится на телефон как обычное приложение и открывается прямо на съёмке.',
      buildText2: 'Сейчас я пользуюсь им каждый день, новая версия по свежим макетам в работе.',
      darkLabel: 'Тёмная тема',
      lightLabel: 'Светлая тема'
    },
    en: {
      typeLabel: 'Pet project',
      title: 'ContentLog — a shoot tracker for my blog',
      meta: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Year', value: '2026' },
        { label: 'Team', value: 'Personal project' },
        { label: 'Task', value: 'Keep every shoot idea in one place' }
      ],
      failedLabel: 'failed to load',
      contextLabel: 'Context',
      contextText: 'I run a fashion blog, and ideas for videos piled up everywhere at once: phone notes, saved reels, screenshots, voice memos to myself. By the time I got to shooting, half of them were gone, and for the rest it was anyone’s guess what had been filmed, what was being edited, and what was waiting to go out.',
      contextText2: 'Ordinary task trackers don’t fit this. They are built around tasks with deadlines, while a shoot has its own logic: it needs references, photos, a shot list, and a state that says “wrong weather, pushed to another day”. So I built a tool around my own process.',
      designLabel: 'Design',
      designText: 'Everything runs on a five-stage pipeline: backlog → in progress → editing → to post → done. Each stage has its own colour, and the same colour drives the filter on the main screen. Hold and cancelled sit outside the pipeline, in an archive — they aren’t production stages, and in the main grid they would only add noise.',
      designText2: 'An idea card holds everything a shoot needs: a title, a cover and up to three photos fanned out, the post type, a reference link, notes, and a checklist with a ready-made “Basic shots” set. Under the title are flags — outdoors, outfit, tricky. Short marks that tell me at a glance whether a shoot depends on the weather or needs a look put together in advance.',
      designText3: 'Ideas group into collections — “Japan”, “Street shoot”. A collection gets its own screen, so I can prepare for a series of shoots without the rest of the backlog in the way.',
      designText4: 'The design system is built for a tool, not for a showcase: utilitarian, no decoration, with the weight carried by status colour and typography. The only flourish is motion — cards appear one after another, the grid re-flows when the filter changes, photos fan open on a card.',
      buildLabel: 'How it was built',
      buildText: 'I designed the screens in Figma, then built the working app together with Claude: first as a prototype, then moved onto my own hosting — static files on Netlify, data and photos in Supabase. It’s a PWA, so it installs on the phone like a normal app and opens right there during a shoot.',
      buildText2: 'I use it every day now, and a new version based on the latest designs is in progress.',
      darkLabel: 'Dark theme',
      lightLabel: 'Light theme'
    }
  };

  var SCREENS = [
    'assets/contentlog-s1.webp',
    'assets/contentlog-s2.webp',
    'assets/contentlog-s3.webp'
  ];

  var content = document.querySelector('[data-content]');

  // Three phone shots standing on the same grey the covers use, rather than a
  // flat picture — so they can rise into place when the page opens.
  function buildScreens() {
    var hero = el('div', 'hero is-screens');
    var row = el('div', 'screens');
    SCREENS.forEach(function (src, i) {
      // On a phone the idea grid leads from the middle, the card stands left.
      var img = el('img', 'screen' + (i === 0 ? ' is-lead' : ''), {
        src: src, alt: '', width: '450', height: '611',
        fetchpriority: i === 0 ? 'high' : 'auto'
      });
      // Each one starts a beat after the last.
      img.style.setProperty('--i', String(i));
      img.style.setProperty('--mo', String([2, 1, 3][i]));
      row.appendChild(img);
    });
    hero.appendChild(row);
    return hero;
  }

  function buildPromo(failedLabel) {
    var video = el('video', 'clip', {
      autoplay: '', loop: '', muted: '', playsinline: '',
      preload: 'auto', poster: 'assets/contentlog-poster.webp',
      src: 'assets/contentlog-promo.mp4'
    });
    // 5:4, the ratio the clip was rendered at — the box never changes size as
    // the file arrives.
    return ui.videoFrame(video, failedLabel, 'promo-wrap');
  }

  // The screens, in order, as rails the reader can push sideways — the dark
  // set first, then the light one.
  function rail(theme) {
    // Newest screen first: the files run 1-6, the rail runs the other way.
    return [6, 5, 4, 3, 2, 1].map(function (n) {
      return 'assets/contentlog-' + theme + '-' + n + '.webp';
    });
  }

  var DARK_SHOTS = rail('dark');
  var LIGHT_SHOTS = rail('light');

  function buildRail(sources) {
    var rail = el('div', 'shot-rail');
    sources.forEach(function (src) {
      rail.appendChild(el('img', 'rail-shot', {
        src: src, alt: '', loading: 'lazy', width: '450', height: '920'
      }));
    });
    return rail;
  }

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    content.appendChild(buildScreens());
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(ui.metaGrid(t.meta));

    content.appendChild(ui.block(t.contextLabel, t.contextText));
    content.appendChild(ui.block(null, t.contextText2));

    content.appendChild(ui.block(t.designLabel, t.designText));
    content.appendChild(ui.block(null, t.designText2));
    content.appendChild(ui.block(null, t.designText3));
    content.appendChild(ui.block(null, t.designText4));

    content.appendChild(ui.block(t.buildLabel, t.buildText));
    content.appendChild(ui.block(null, t.buildText2));

    content.appendChild(ui.sectionHeading(t.darkLabel));
    content.appendChild(buildRail(DARK_SHOTS));
    content.appendChild(ui.sectionHeading(t.lightLabel));
    content.appendChild(buildRail(LIGHT_SHOTS));
    content.appendChild(buildPromo(t.failedLabel));
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
