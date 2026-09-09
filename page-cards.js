/* ============================================================================
   Playing cards based on Tim Burton films — graphic design case.
   A single design block, one full-width photo, then the 16 illustrated cards
   — four across on a phone, eight across on desktop.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      typeLabel: 'Проект',
      title: 'Игральные карты по фильмам Тима Бёртона',
      meta: [
        { label: 'Роль', value: 'Графический дизайнер' },
        { label: 'Год', value: '2019' },
        { label: 'Команда', value: '1 дизайнер' },
        { label: 'Задача', value: 'Колода в мире Бёртона' }
      ],
      designLabel: 'Дизайн',
      designText: 'Колода собрана вокруг героев фильмов Тима Бёртона: каждая старшая карта — отдельный персонаж, узнаваемый по силуэту, причёске и паре предметов, без лишних деталей. Масти закреплены за настроением: червы и бубны — тёплая бордовая гамма, пики и трефы — графитовая. Фигуры построены зеркально, как в классической колоде, поэтому карта одинаково читается с любой стороны.',
      designText2: 'Всё нарисовано вручную на графическом планшете — от эскиза до финальной заливки. Персонажи собраны из крупных плоских форм: так лица остаются узнаваемыми даже в размере настоящей карты, а вся колода держится в одном стиле. Тузы сделаны минималистично, одним знаком масти, чтобы дать глазу передышку между фигурными картами.',
      galleryLabel: 'Колода'
    },
    en: {
      typeLabel: 'Project',
      title: 'Playing cards based on Tim Burton films',
      meta: [
        { label: 'Role', value: 'Graphic Designer' },
        { label: 'Year', value: '2019' },
        { label: 'Team', value: '1 designer' },
        { label: 'Task', value: 'A deck set in Burton’s world' }
      ],
      designLabel: 'Design',
      designText: 'The deck is built around characters from Tim Burton’s films: every court card is a single character, recognisable from a silhouette, a hairstyle and one or two props, with nothing else added. Each suit carries its own mood — hearts and diamonds in a warm burgundy range, spades and clubs in graphite. The figures are mirrored the way they are in a classic deck, so a card reads the same from either side.',
      designText2: 'Everything is drawn by hand on a graphics tablet, from the first sketch to the final fill. The characters are built from large flat shapes, which keeps the faces readable at real card size and holds the whole deck in one style. The aces are stripped back to a single suit mark, to give the eye a rest between the court cards.',
      galleryLabel: 'The deck'
    }
  };

  // Four rows of four, in the order they sit in the deck layout.
  var CARDS = [];
  for (var i = 1; i <= 16; i++) {
    CARDS.push('assets/card-' + (i < 10 ? '0' : '') + i + '.webp');
  }

  var content = document.querySelector('[data-content]');

  function buildGrid() {
    var grid = el('div', 'cards-grid');
    CARDS.forEach(function (src) {
      var cell = el('div', 'card-cell');
      // Intrinsic size reserves the row height before the file lands, so the
      // grid does not jump as the images arrive.
      cell.appendChild(el('img', 'card-img', {
        src: src, alt: '', loading: 'lazy', width: '373', height: '571'
      }));
      grid.appendChild(cell);
    });
    return grid;
  }

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    content.appendChild(ui.hero('assets/cards-hero.webp'));
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(ui.metaGrid(t.meta));

    content.appendChild(ui.block(t.designLabel, t.designText));
    content.appendChild(ui.block(null, t.designText2));

    content.appendChild(ui.sectionHeading(t.galleryLabel));
    content.appendChild(el('img', 'gallery-img cards-wide', {
      src: 'assets/cards-wide.webp', alt: '', loading: 'lazy',
      width: '1600', height: '900'
    }));
    content.appendChild(buildGrid());
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
