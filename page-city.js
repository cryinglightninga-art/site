/* ============================================================================
   "Современный город глазами студентов" — identity for an inter-university
   competition. Context, research and design, then a gallery built row by row:
   1, 2, 1, 2, and a final split row whose two columns end level.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      typeLabel: 'Проект',
      title: '«Современный город глазами студентов» — фирменный стиль конкурса',
      meta: [
        { label: 'Роль', value: 'Графический дизайнер' },
        { label: 'Год', value: '2022' },
        { label: 'Команда', value: '1 дизайнер' },
        { label: 'Задача', value: 'Фирменный стиль конкурса' }
      ],
      contextLabel: 'Вводные',
      contextText: 'Фирменный стиль I-го межвузовского конкурса студенческих проектов развития городской среды «Современный город глазами студентов». Конкурс выявляет и поддерживает талантливую молодёжь, поднимает уровень профессиональной подготовки будущих специалистов и тренирует навыки проектной и командной работы. Вторая его задача — популяризация «зелёных» технологий, методов снижения негативного воздействия на окружающую среду и темы устойчивого развития городских территорий.',
      contextText2: 'Отсюда четыре задачи по стилю: определить средства визуальной коммуникации под специфику аудитории, найти яркий и запоминающийся визуальный образ, создать уникальную фирменную графику и собрать на её основе рекламно-информационные и презентационные материалы.',
      researchLabel: 'Исследование',
      researchText: 'Аудитория конкурса — студенты архитектурных и инженерных направлений и преподаватели, которые их ведут. Стиль должен был читаться и на строгом дипломе, и на мерче, и в ленте у студента, поэтому за основу взят не декоративный, а структурный образ.',
      researchText2: 'Я разбирала спутниковые снимки городов: радиальные площади, сетки кварталов, разрывы застройки. В этих планах уже есть готовая графика — линии улиц и пятна кварталов. Из них и вырос фирменный паттерн, а вместе с ним и знак, где план города прорастает листьями.',
      designLabel: 'Дизайн',
      designText: 'Знак — круг, собранный из двух половин: сверху схема городской застройки, снизу листья и русло реки. Он работает в трёх состояниях — цветной на светлом, выворотка на зелёном и монохромный контурный, — поэтому одинаково ложится на диплом, значок и упаковку.',
      designText2: 'Палитра построена на двух зелёных — тёмном и травяном — с голубым для воды и графитовым для текста. Шрифтовая пара: Bebas Neue в заголовках, узкий и плотный, и Gilroy в наборе. Фирменный паттерн из городского плана даёт стилю масштабируемую фактуру: он одинаково работает и на обложке презентации, и на сумке.',
      designText3: 'На основе стиля собран весь пакет носителей: дипломы, благодарности и специальные призы, шаблоны презентаций и социальных сетей, деловая документация, мерч — сумка, кружка, бутылка, блокнот — и макеты сайта и мобильной версии конкурса. Отдельно нарисована серия иллюстраций: линейные персонажи с зелёными и голубыми акцентами, которыми размечены этапы конкурса.',
      galleryLabel: 'Стиль'
    },
    en: {
      typeLabel: 'Project',
      title: '“The Modern City Through Students’ Eyes” — competition identity',
      meta: [
        { label: 'Role', value: 'Graphic Designer' },
        { label: 'Year', value: '2022' },
        { label: 'Team', value: '1 designer' },
        { label: 'Task', value: 'Identity for a competition' }
      ],
      contextLabel: 'Context',
      contextText: 'A visual identity for the first inter-university competition of student projects in urban development, “The Modern City Through Students’ Eyes”. The competition exists to find and support talented students, raise the level of professional training among future specialists, and build project and teamwork skills. Its second purpose is to popularise green technology, ways of reducing environmental impact, and the subject of sustainable urban development.',
      contextText2: 'That set four tasks for the identity: choose the means of visual communication that suit this particular audience, find a bright and memorable visual image, create an original graphic language, and build the promotional and presentation materials on top of it.',
      researchLabel: 'Research',
      researchText: 'The audience is students of architecture and engineering, and the faculty who supervise them. The identity had to hold up on a formal diploma, on merchandise, and in a student’s feed alike, so it is built on a structural image rather than a decorative one.',
      researchText2: 'I went through satellite views of cities: radial squares, block grids, gaps in the built fabric. Those plans are already graphics — street lines and blocks as shapes. The pattern grew out of them, and so did the mark, where a city plan sprouts leaves.',
      designLabel: 'Design',
      designText: 'The mark is a circle made of two halves: an urban plan above, leaves and a river bed below. It works in three states — colour on light, knocked out on green, and a monochrome outline — so it sits equally well on a diploma, a badge and a package.',
      designText2: 'The palette runs on two greens, a deep one and a grass one, with blue for water and graphite for text. The type pairing is Bebas Neue for headlines, narrow and dense, and Gilroy for body copy. The pattern taken from the city plan gives the identity a scalable texture that works on a presentation cover and on a tote alike.',
      designText3: 'The identity carries the full set of materials: diplomas, letters of thanks and special awards, presentation and social templates, business documents, merchandise — tote, mug, bottle, notebook — and layouts for the competition’s website and mobile version. A separate series of illustrations was drawn for it: line characters with green and blue accents that mark the stages of the competition.',
      galleryLabel: 'Identity'
    }
  };

  var content = document.querySelector('[data-content]');

  function photo(src, w, h, extraClass) {
    return el('img', 'gallery-img' + (extraClass ? ' ' + extraClass : ''), {
      src: src, alt: '', loading: 'lazy', width: String(w), height: String(h)
    });
  }

  function buildGallery() {
    var wrap = el('div', 'city-gallery');

    // 1 — the merchandise line-up.
    wrap.appendChild(photo('assets/city-01.webp', 1600, 726));

    // 2 — the logo lockup, light and on green.
    var row2 = el('div', 'gallery-grid');
    row2.appendChild(photo('assets/city-02a.webp', 1000, 391));
    row2.appendChild(photo('assets/city-02b.webp', 1000, 389));
    wrap.appendChild(row2);

    // 3 — the illustration set.
    wrap.appendChild(photo('assets/city-03.webp', 1600, 898));

    // 4 — the vertical lockup and the mark on its own.
    var row4 = el('div', 'gallery-grid');
    row4.appendChild(photo('assets/city-04a.webp', 758, 722));
    row4.appendChild(photo('assets/city-04b.webp', 758, 722));
    wrap.appendChild(row4);

    // 5 — the full identity board.
    wrap.appendChild(photo('assets/city-06.webp', 1600, 900));

    // 6 — the pattern beside the aerial views it came from. The four small
    // photos sit two-by-two, which lands their column at the same height as
    // the single wide one next to it.
    var row5 = el('div', 'gallery-split');
    row5.appendChild(photo('assets/city-05-main.webp', 758, 440));

    var quad = el('div', 'gallery-quad');
    for (var i = 1; i <= 4; i++) {
      quad.appendChild(photo('assets/city-05-' + i + '.webp', 354, 208));
    }
    row5.appendChild(quad);
    wrap.appendChild(row5);

    return wrap;
  }

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    // The wide board is cut to 21/8 on desktop, which is exactly its own
    // ratio; a phone would show only a narrow slice of it, so it gets the
    // left-hand quarter of the board instead.
    content.appendChild(ui.hero('assets/city-hero.webp', 'assets/city-hero-mobile.webp'));
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(ui.metaGrid(t.meta));

    content.appendChild(ui.block(t.contextLabel, t.contextText));
    content.appendChild(ui.block(null, t.contextText2));

    content.appendChild(ui.block(t.researchLabel, t.researchText));
    content.appendChild(ui.block(null, t.researchText2));

    content.appendChild(ui.block(t.designLabel, t.designText));
    content.appendChild(ui.block(null, t.designText2));
    content.appendChild(ui.block(null, t.designText3));

    content.appendChild(ui.sectionHeading(t.galleryLabel));
    content.appendChild(buildGallery());
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
