/* ============================================================================
   Animation challenge — article.
   30 numbered cells, each loaded only once it comes near the viewport, with a
   shimmer placeholder until it does and a label if it fails.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      typeLabel: 'Статья',
      title: 'Как я проходила челлендж по анимации?',
      meta: [
        { label: 'Год', value: '2025' },
        { label: 'Анимаций', value: '30' },
        { label: 'Дней', value: '30' }
      ],
      galleryLabel: 'Галерея',
      failedLabel: 'не загрузилось',
      blocks: [
        { text: 'В рамках месячного челленджа я каждый день выполняла небольшое задание на анимацию. Для работы использовала Figma, Jitter, Spline, а позже — Rive, который стал основным инструментом для большинства заданий.' },
        { text: 'Проект помог мне глубже разобраться в интерфейсной анимации, попробовать новые инструменты и добавить больше motion-практики в повседневную дизайнерскую работу.' }
      ]
    },
    en: {
      typeLabel: 'Article',
      title: 'How I completed an animation challenge',
      meta: [
        { label: 'Year', value: '2025' },
        { label: 'Animations', value: '30' },
        { label: 'Days', value: '30' }
      ],
      galleryLabel: 'Gallery',
      failedLabel: 'failed to load',
      blocks: [
        { text: 'As part of a month-long challenge, I completed a small animation task every day. I worked with Figma, Jitter, Spline, and later Rive, which became my main tool for most of the tasks.' },
        { text: 'The project helped me explore interface animation in more depth, experiment with new tools, and bring more motion practice into my everyday design work.' }
      ]
    }
  };

  // In challenge order. The last entry is a video; the rest are stills.
  var CLIPS = [
    'assets/anim-01.webp', 'assets/anim-02.webp', 'assets/anim-03.webp', 'assets/anim-04.webp',
    'assets/anim-05.webp', 'assets/anim-06.webp', 'assets/anim-07.webp', 'assets/anim-08.webp',
    'assets/anim-09.webp', 'assets/anim-10.webp', 'assets/anim-11.webp', 'assets/anim-12.webp',
    'assets/anim-13.webp', 'assets/anim-14.webp', 'assets/anim-15.webp', 'assets/anim-16.webp',
    'assets/anim-17.webp', 'assets/anim-18.webp', 'assets/anim-19.webp', 'assets/anim-20.webp',
    'assets/anim-21.webp', 'assets/anim-22.webp', 'assets/anim-23.webp', 'assets/anim-24.webp',
    'assets/anim-25.webp', 'assets/anim-26.webp', 'assets/anim-27.webp', 'assets/anim-28.webp',
    'assets/anim-29.webp', 'assets/anim-30.mp4'
  ];

  var IMAGE_RE = /\.(webp|gif|png|jpe?g|avif)$/i;

  var content = document.querySelector('[data-content]');
  var observer = null;
  var requested = {};

  /* ── One gallery cell ─────────────────────────────────────────────────── */

  function buildCell(src, index, failedLabel) {
    var cell = el('div', 'clip-cell');
    cell.dataset.clipIndex = String(index);

    var skeleton = el('div', 'skeleton');
    cell.appendChild(skeleton);

    var failed = el('div', 'failed-label');
    failed.textContent = failedLabel;
    failed.hidden = true;
    cell.appendChild(failed);

    var num = el('div', 'clip-num');
    num.textContent = String(index + 1).padStart(2, '0');
    cell.appendChild(num);

    cell._mount = function () {
      if (requested[index]) return;
      requested[index] = true;

      if (IMAGE_RE.test(src)) {
        var probe = new Image();
        probe.onload = function () {
          skeleton.remove();
          var media = el('div', 'clip-media');
          media.style.backgroundImage = 'url("' + src + '")';
          cell.insertBefore(media, num);
        };
        probe.onerror = function () {
          skeleton.remove();
          failed.hidden = false;
        };
        probe.src = src;
        return;
      }

      var video = el('video', 'clip-video', {
        autoplay: '', loop: '', muted: '', playsinline: '', preload: 'auto', src: src
      });
      var veil = ui.videoVeil(video, function () { failed.hidden = false; });
      video.addEventListener('loadeddata', function () { skeleton.remove(); });
      video.addEventListener('error', function () { skeleton.remove(); });
      cell.insertBefore(ui.autoplay(video), num);
      cell.insertBefore(veil, num);
    };

    return cell;
  }

  function buildGallery(failedLabel) {
    var grid = el('div', 'gallery-grid');
    CLIPS.forEach(function (src, i) {
      grid.appendChild(buildCell(src, i, failedLabel));
    });
    return grid;
  }

  // Load a cell's media 400px before it scrolls into view.
  function observeCells() {
    if (observer) observer.disconnect();
    if (typeof IntersectionObserver === 'undefined') {
      Array.prototype.forEach.call(content.querySelectorAll('.clip-cell'), function (cell) {
        cell._mount();
      });
      return;
    }
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target._mount();
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '400px 0px' });

    Array.prototype.forEach.call(content.querySelectorAll('.clip-cell'), function (cell) {
      observer.observe(cell);
    });
  }

  /* ── Render ───────────────────────────────────────────────────────────── */

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    content.appendChild(ui.hero('assets/animation-hero.webp'));
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title, 'is-compact'));
    content.appendChild(ui.metaGrid(t.meta, 'cols-3'));

    t.blocks.forEach(function (b) {
      var block = ui.block(b.heading || null, b.text, 'is-large');
      block.style.marginBottom = '28px';
      content.appendChild(block);
    });

    content.appendChild(ui.sectionHeading(t.galleryLabel));
    content.appendChild(buildGallery(t.failedLabel));

    // A re-render throws away the loaded media, so let every cell load again.
    requested = {};
    observeCells();
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
