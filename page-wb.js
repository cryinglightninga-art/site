/* ============================================================================
   Wildberries — three strands of work on one page: the seller photo editor,
   the media projects around it, and the bank. Tabs swap the panel below the
   title; the cover collage, the badge and the title stay put.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  /* Two AI Studio screens. The blur is baked into the exported files, not
     applied in CSS: the work is under NDA, so no stylesheet or devtools
     toggle can bring the pixels back. */
  var AI_STUDIO_SHOTS = [
    { src: 'assets/wb-ai-studio-1.webp', w: 1440, h: 1024 },
    { src: 'assets/wb-ai-studio-2.webp', w: 1440, h: 1024 }
  ];

  var EDITOR_SHOTS = [
    { src: 'assets/wb-editor-panels.webp', w: 1170, h: 1170 },
    { src: 'assets/wb-editor-services.webp', w: 1800, h: 1280 },
    { src: 'assets/wb-editor-service-card.webp', w: 1800, h: 1280 }
  ];

  var AB_SHOTS = [
    { src: 'assets/wb-ab-1.webp', w: 1440, h: 1047 },
    { src: 'assets/wb-ab-2.webp', w: 1440, h: 1047 }
  ];

  /* The cover is one Figma frame, 1836×700, cut into the pieces it is made of
     so each can arrive on its own. Values are per cent of that frame. */
  var COLLAGE = [
    { src: 'wb-c-editor',   left: 4.085,  top: 5.286,  w: 33.061, h: 61.714, i: 0 },
    { src: 'wb-c-services', left: 31.754, top: 69.429, w: 10.784, h: 30.571, i: 1 },
    { src: 'wb-c-style',    left: 44.499, top: 0,      w: 10.784, h: 36.143, i: 2 },
    { src: 'wb-c-vase',     left: 44.499, top: 69.429, w: 10.784, h: 30.571, i: 2 },
    { src: 'wb-c-logo',     left: 44.608, top: 42.143, w: 10.784, h: 15.857, i: 3 },
    { src: 'wb-c-ab',       left: 57.244, top: 0,      w: 30.501, h: 36.143, i: 4 },
    { src: 'wb-c-rich',     left: 57.244, top: 69.429, w: 30.501, h: 30.571, i: 4 },
    { src: 'wb-c-text',     left: 61.111, top: 42.429, w: 13.017, h: 21.000, i: 5 },
    { src: 'wb-c-partners', left: 89.052, top: 5.286,  w: 10.948, h: 52.286, i: 6 }
  ];

  var COPY = {
    ru: {
      typeLabel: 'Проект',
      title: 'Wildberries',
      tabs: { editor: 'Фоторедактор', other: 'Другие проекты', bank: 'WB Банк · сейчас' },

      editor: {
        meta: [
          { label: 'Роль', value: 'Старший продуктовый дизайнер' },
          { label: 'Год', value: '2025–2026' },
          { label: 'Команда', value: '2 дизайнера' },
          { label: 'Формат', value: 'B2B' }
        ],
        introLabel: 'Вводные',
        introText: 'Фоторедактор — встроенный в портал продавца Wildberries инструмент для подготовки изображений карточки товара. Продавец собирает карточку прямо в кабинете: холст, шаблон, текст, фигуры, иконки, фон — без Photoshop и без подрядчика.',
        audienceText: 'Аудитория: продавцы Wildberries, менеджеры маркетплейсов, контент-менеджеры.',
        valueText: 'Ценность: сократить время и порог входа в подготовку визуального контента — сделать инфографику доступной тому, кто не умеет в дизайн.',
        contextLabel: 'Контекст',
        contextText: 'Я пришла в проект в октябре 2025 года. Редактор уже работал, но инструментов в нём было немного, поэтому задача была не собрать с нуля, а развивать. Я инициировала редизайн ради удобства, и дальше мы последовательно добавляли функциональность, в том числе AI-инструменты.',
        challengesLabel: 'Вызовы',
        challenges: [
          'сохранить простоту интерфейса, когда инструментов становится больше;',
          'встроить AI в сам процесс редактирования, а не положить рядом отдельным разделом;',
          'сделать сложные сценарии понятными без навыков дизайна;',
          'провести пользователя от загрузки изображения до сохранения без тупиков.'
        ],
        doneLabel: 'Что сделала',
        done: [
          'редизайн интерфейса редактора;',
          'шаблоны карточек товара, которые применяются в один клик;',
          'AI-инструменты в общем потоке редактирования: генерация композиции, удаление фона, улучшение качества, ластик;',
          'фоторедактор в мобильном приложении WB Partners: дополнила функциональность и сделала редизайн;',
          'проверяла решения на коридорных тестах и интервью с продавцами;',
          'выступала спикером на лекциях RWB Университета про создание продающей карточки товара.'
        ],
        resultLabel: 'Результат',
        stats: [
          { value: '+32,7%', label: 'Конверсия в сохранение после редактирования' },
          { value: '+12%', label: 'Карточки с изменёнными фото при создании' },
          { value: '+47,9%', label: 'Средний DAU мобильного приложения' }
        ],
        beforeCaption: 'До',
        afterCaption: 'После'
      },

      other: {
        meta: [
          { label: 'Роль', value: 'Продуктовый дизайнер' },
          { label: 'Год', value: '2024–2025' },
          { label: 'Команда', value: 'Более 2 дизайнеров' },
          { label: 'Формат', value: 'B2B' }
        ],
        items: [
          {
            heading: 'А/Б-тесты',
            paras: [
              'Раздел помогает проверить, какое главное фото в карточке работает лучше: два варианта показываются разным покупателям, а система считает, какой чаще доводит до заказа. Я отрисовала редизайн раздела и отдельно — маркетинговый лендинг, который объясняет, зачем запускать тест и что продавец получит на выходе.'
            ],
            shots: AB_SHOTS
          },
          {
            heading: 'AI Студия',
            paras: [
              'Медиасервисы для карточек росли по отдельности: фоторедактор, фотостудия, видеообложки, отметки на фото — прежде чем что-то сделать, продавец должен сам догадаться, какой из них подойдёт под задачу. Вместе с продуктовой командой мы решили собрать всё в один продукт, AI Студию, где начинают не с выбора инструмента, а с того, что нужно получить. Я собрала концепцию и прототип.'
            ],
            shots: AI_STUDIO_SHOTS
          },
          {
            heading: 'Фотостудия',
            paras: [
              'В исследованиях я увидела, что продавцы путаются при выборе типа генерации: «заменить лицо и фон» и «заменить одежду на человеке» выглядят как два разных продукта, хотя для человека это одна задача — получить нужное фото. Я предложила свести фотостудии к одному входу: генерация начинается с запроса, а инструменты показываются под цель — вырезать фон, надеть одежду на человека, заменить окружение.'
            ]
          }
        ]
      },

      bank: {
        meta: [
          { label: 'Роль', value: 'Продуктовый дизайнер' },
          { label: 'Год', value: '2026 — сейчас' },
          { label: 'Формат', value: 'B2C' }
        ],
        paras: [
          'С августа 2026 работаю в WB Банке над банковскими продуктами: платежи и переводы, апгрейд ВБ Кошелька, ЦФА и Инвесткопилка.'
        ]
      }
    },

    en: {
      typeLabel: 'Project',
      title: 'Wildberries',
      tabs: { editor: 'Photo editor', other: 'Other projects', bank: 'WB Bank · now' },

      editor: {
        meta: [
          { label: 'Role', value: 'Sr. Product Designer' },
          { label: 'Year', value: '2025–2026' },
          { label: 'Team', value: '2 designers' },
          { label: 'Format', value: 'B2B' }
        ],
        introLabel: 'Context',
        introText: 'The photo editor is a tool built into the Wildberries seller portal for preparing product card images. A seller puts the whole card together inside the account: canvas, template, text, shapes, icons, background — no Photoshop and no contractor.',
        audienceText: 'Audience: Wildberries sellers, marketplace managers, content managers.',
        valueText: 'Value: cut the time and the barrier to entry for preparing visual content — make infographics available to people who do not design.',
        contextLabel: 'Where it started',
        contextText: 'I joined the project in October 2025. The editor already worked, but it had few tools, so the task was not to build it from scratch but to grow it. I initiated a redesign for usability, and from there we kept adding functionality, AI tools among them.',
        challengesLabel: 'Challenges',
        challenges: [
          'keep the interface simple as the number of tools grows;',
          'build AI into the editing process itself rather than parking it in a separate section;',
          'make complex scenarios clear to people without design skills;',
          'carry the user from uploading an image to saving the result without dead ends.'
        ],
        doneLabel: 'What I did',
        done: [
          'redesigned the editor interface;',
          'product card templates that apply in one click;',
          'AI tools inside the editing flow: composition generation, background removal, quality upscaling, eraser;',
          'the photo editor in the WB Partners mobile app: extended the functionality and redesigned it;',
          'tested decisions in hallway testing and interviews with sellers;',
          'spoke at RWB University lectures on building a product card that sells.'
        ],
        resultLabel: 'Result',
        stats: [
          { value: '+32.7%', label: 'Conversion to save after editing' },
          { value: '+12%', label: 'Cards with edited photos at creation' },
          { value: '+47.9%', label: 'Average DAU of the mobile app' }
        ],
        beforeCaption: 'Before',
        afterCaption: 'After'
      },

      other: {
        meta: [
          { label: 'Role', value: 'Product Designer' },
          { label: 'Year', value: '2024–2025' },
          { label: 'Team', value: 'More than 2 designers' },
          { label: 'Format', value: 'B2B' }
        ],
        items: [
          {
            heading: 'A/B tests',
            paras: [
              'The section helps check which main photo on a card works better: two versions are shown to different shoppers, and the system counts which one leads to an order more often. I drew up a redesign of the section and, separately, a marketing landing page that explains why to run a test and what the seller gets out of it.'
            ],
            shots: AB_SHOTS
          },
          {
            heading: 'AI Studio',
            paras: [
              'The media services around a product card had grown separately: the photo editor, the photo studio, video covers, photo tags — before doing anything, a seller has to work out which one fits the task. With the product team we decided to pull everything into one product, AI Studio, where you start from what you need to get rather than from which tool to open. I put together the concept and the prototype.'
            ],
            shots: AI_STUDIO_SHOTS
          },
          {
            heading: 'Photo studio',
            paras: [
              'Research showed that sellers get lost choosing a generation type: "replace face and background" and "change the clothes on a person" read as two different products, while to a person it is one task — get the photo they need. I proposed bringing the photo studios down to one entry point: generation starts from the request, and the tools are shown by goal — cut out the background, dress a person, replace the surroundings.'
            ]
          }
        ]
      },

      bank: {
        meta: [
          { label: 'Role', value: 'Product Designer' },
          { label: 'Year', value: '2026 — now' },
          { label: 'Format', value: 'B2C' }
        ],
        paras: [
          'Since August 2026 I have been working at WB Bank on banking products: payments and transfers, the WB Wallet upgrade, digital financial assets (DFA) and InvestJar.'
        ]
      }
    }
  };

  var TAB_KEYS = ['editor', 'other', 'bank'];
  var active = 'editor';

  var content = document.querySelector('[data-content]');
  var panel = null;

  /* ── Pieces ───────────────────────────────────────────────────────────── */

  // The cover, rebuilt from its parts so they can arrive one after another.
  function buildHero() {
    var hero = el('div', 'hero is-collage');
    var stage = el('div', 'collage');
    COLLAGE.forEach(function (part, index) {
      var img = el('img', '', {
        src: 'assets/' + part.src + '.webp', alt: '',
        fetchpriority: index === 0 ? 'high' : 'auto'
      });
      img.style.left = part.left + '%';
      img.style.top = part.top + '%';
      img.style.width = part.w + '%';
      img.style.height = part.h + '%';
      img.style.setProperty('--i', String(part.i));
      stage.appendChild(img);
    });
    hero.appendChild(stage);
    return hero;
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

  // Three numbers, no plot: unrelated measures share no scale, so a bar behind
  // them would compare things that cannot be compared.
  function stats(items) {
    var row = el('div', 'stat-row');
    items.forEach(function (item) {
      var card = el('div', 'stat');
      var value = el('div', 'stat-value');
      value.textContent = item.value;
      var label = el('div', 'stat-label');
      label.textContent = item.label;
      card.appendChild(value);
      card.appendChild(label);
      row.appendChild(card);
    });
    return row;
  }

  // The caption sits above the shot: you read what you are about to look at.
  function figure(src, caption, w, h) {
    var wrap = el('div', 'shot-figure');
    var cap = el('div', 'shot-caption');
    cap.textContent = caption;
    wrap.appendChild(cap);
    wrap.appendChild(el('img', 'gallery-img', {
      src: src, alt: '', loading: 'lazy', width: String(w), height: String(h)
    }));
    return wrap;
  }

  var LOCK = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
    + '<path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0'
    + ' 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v3H9V7a3 3 0 0 1'
    + ' 3-3zm0 10a2 2 0 0 1 1 3.73V19a1 1 0 0 1-2 0v-1.27A2 2 0 0 1 12 14z"/></svg>';

  // The badge only says why the shot is unreadable; the blur itself lives in
  // the file, so there is nothing here to switch off.
  function ndaShot(shot) {
    var wrap = el('div', 'nda-shot');
    wrap.appendChild(el('img', 'gallery-img', {
      src: shot.src, alt: 'NDA', loading: 'lazy',
      width: String(shot.w), height: String(shot.h)
    }));
    var badge = el('div', 'nda-badge');
    badge.innerHTML = LOCK;
    var word = el('span');
    word.textContent = 'NDA';
    badge.appendChild(word);
    wrap.appendChild(badge);
    return wrap;
  }

  function ndaPair(shots) {
    var pair = el('div', 'shot-pair');
    shots.forEach(function (shot) { pair.appendChild(ndaShot(shot)); });
    return pair;
  }

  /* ── Panels ───────────────────────────────────────────────────────────── */

  function fillEditor(t) {
    var c = t.editor;
    panel.appendChild(ui.metaGrid(c.meta));

    panel.appendChild(ui.block(c.introLabel, c.introText));
    panel.appendChild(ui.block(null, c.audienceText));
    panel.appendChild(ui.block(null, c.valueText));

    panel.appendChild(ui.block(c.contextLabel, c.contextText));

    panel.appendChild(ui.sectionHeading(c.challengesLabel));
    panel.appendChild(list(c.challenges));

    panel.appendChild(ui.sectionHeading(c.doneLabel));
    panel.appendChild(list(c.done));

    panel.appendChild(ui.sectionHeading(c.resultLabel));
    panel.appendChild(stats(c.stats));

    var pair = el('div', 'shot-pair is-grouped');
    pair.appendChild(figure('assets/wb-editor-before.webp', c.beforeCaption, 1440, 1024));
    pair.appendChild(figure('assets/wb-editor-after.webp', c.afterCaption, 1440, 1024));
    panel.appendChild(pair);

    var trio = el('div', 'shot-trio');
    EDITOR_SHOTS.forEach(function (shot) {
      trio.appendChild(el('img', 'gallery-img', {
        src: shot.src, alt: '', loading: 'lazy',
        width: String(shot.w), height: String(shot.h)
      }));
    });
    panel.appendChild(trio);
  }

  function fillOther(t) {
    panel.appendChild(ui.metaGrid(t.other.meta));
    t.other.items.forEach(function (item) {
      var blocks = [ui.block(item.heading, item.paras[0])];
      item.paras.slice(1).forEach(function (text) {
        blocks.push(ui.block(null, text));
      });
      blocks.forEach(function (node) { panel.appendChild(node); });
      if (item.shots) {
        // The shots belong to the project right above them, so the text keeps
        // them close and the gap below separates one project from the next.
        blocks[blocks.length - 1].classList.add('is-tight');
        panel.appendChild(ndaPair(item.shots));
      }
    });
  }

  function fillBank(t) {
    panel.appendChild(ui.metaGrid(t.bank.meta));
    t.bank.paras.forEach(function (text) {
      panel.appendChild(ui.block(null, text));
    });
  }

  function fillPanel(t) {
    panel.textContent = '';
    if (active === 'editor') fillEditor(t);
    else if (active === 'other') fillOther(t);
    else fillBank(t);
  }

  /* ── Tabs ─────────────────────────────────────────────────────────────── */

  function buildTabs(t) {
    var row = el('div', 'tabs');
    TAB_KEYS.forEach(function (key) {
      var btn = el('button', 'tab' + (key === active ? ' is-active' : ''), {
        type: 'button'
      });
      btn.textContent = t.tabs[key];
      btn.addEventListener('click', function () {
        if (active === key) return;
        active = key;
        // Only the panel is rebuilt: the cover keeps its place and does not
        // replay its entrance on every tab.
        row.querySelectorAll('.tab').forEach(function (other) {
          other.classList.remove('is-active');
        });
        btn.classList.add('is-active');
        fillPanel(PF.localize(COPY));
      });
      row.appendChild(btn);
    });
    return row;
  }

  /* ── Render ───────────────────────────────────────────────────────────── */

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    content.appendChild(buildHero());
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(buildTabs(t));

    panel = el('div', 'tab-panel');
    content.appendChild(panel);
    fillPanel(t);
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
