/* ============================================================================
   Home page — filter chips, the tile grid, the avatars band and the bookshelf.
   The sidebar, controls, theme and language all come from shared.js (PF).
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var state = PF.state;

  /* ── Content ──────────────────────────────────────────────────────────── */

  var COPY = {
    ru: {
      emptyLabel: 'Здесь пока ничего нет',
      filters: { all: 'Все', project: 'Проекты', article: 'Статьи' },
      typeLabels: { project: 'Проект', article: 'Статья' },
      tiles: [
        'MUJO AI — платформа для контента маркетплейсов',
        'Как я проходила челлендж по анимации?',
        'Флоу разделения онлайн-оплаты',
        'AirTrip — сервис для планирования путешествий',
        'Активности: сертификаты, конкурсы и выступления',
        'Өнім дизайнері бәсекелі маманға айналды',
        'Атрибуты рабочего стола',
        'Wildberries B2B'
      ]
    },
    en: {
      emptyLabel: 'Nothing here yet',
      filters: { all: 'All', project: 'Projects', article: 'Articles' },
      typeLabels: { project: 'Project', article: 'Article' },
      tiles: [
        'MUJO AI — marketplace content platform',
        'How I completed an animation challenge',
        'Online payment splitting flow',
        'AirTrip — a travel planning service',
        'Activities: certificates, competitions, and talks',
        'Өнім дизайнері бәсекелі маманға айналды',
        'Desk Setup Essentials',
        'Wildberries B2B'
      ]
    }
  };

  var SHOTS = [
    'assets/shot-1.webp',
    'assets/shot-2.webp',
    'assets/shot-3.webp',
    'assets/shot-4.webp',
    'assets/shot-5.webp'
  ];

  // Cover treatment per tile. Order matches COPY[lang].tiles.
  var TILE_META = [
    { type: 'project', c1: '#dcd6cc', c2: '#c8c0b1', shapeAlt: true, stack: true, href: 'mujo.html' },
    { type: 'article', c1: '#e4e0d8', c2: '#d3cdc0', shapeAlt: true, video: 'assets/animation.mp4', href: 'animation-challenge.html' },
    { type: 'project', c1: '#d5d9dc', c2: '#b8bec4', shape: true, shots: true, href: 'payment-split.html' },
    { type: 'project', c1: '#d9d9dc', c2: '#bdbdc2', shape: true, fan: true, href: 'airtrip.html' },
    { type: 'article', c1: '#dad3c9', c2: '#c9c0af', shapeAlt: true, cert: true, href: 'activities.html' },
    { type: 'article', c1: '#d7dbd6', c2: '#bfc7bd', shapeAlt: true, cover: 'assets/cover-egemen.webp', tilt: true, bg: 'rgba(120,120,128,0.12)', href: 'https://egemen.kz/news/article390633-onim-dizayneri-basekeli-mamangha-aynaldy', external: true },
    { type: 'article', c1: '#dedad0', c2: '#c7c0b0', shape: true, cover: 'assets/cover-desk-setup.webp', href: 'desk-setup.html' },
    { type: 'project', c1: '#d3d8dc', c2: '#b3bcc2', soon: true, logo: 'assets/wb.svg' }
  ];

  var BOOKS = [
    { size: 'm', cover: 'assets/book-1.webp', href: 'https://ozon.kz/product/upravlenie-zhiznennym-tsiklom-kompanii-kak-organizatsii-rastut-razvivayutsya-i-umirayut-i-chto-627926985/', ru: { title: 'Управление жизненным циклом компании', author: 'Ицхак Адизес' }, en: { title: 'Managing Corporate Lifecycles', author: 'Ichak Adizes' } },
    { size: 'm', cover: 'assets/book-2.webp', href: 'https://ozon.kz/product/kak-rabotaet-google-32221772/', ru: { title: 'Как работает Google', author: 'Джоанн Харрис' }, en: { title: 'How Google Works', author: 'Joanne Harris' } },
    { size: 's', cover: 'assets/book-3.webp', href: 'https://www.litres.ru/book/rob-fitcpatrik/sprosi-mamu-kak-obschatsya-s-klientami-i-podtverdit-pravotu-23963007/chitat-onlayn/', ru: { title: 'Спроси маму', author: 'Роб Фитцпатрик' }, en: { title: 'The Mom Test', author: 'Rob Fitzpatrick' } },
    { size: 'l', cover: 'assets/book-4.webp', href: 'https://ozon.kz/product/patterny-dizayn-menedzhmenta-kak-kompanii-dostich-organizatsionnoy-zrelosti-i-uluchshit-1312155565/', ru: { title: 'Паттерны дизайн-менеджмента', author: 'Юрий Ветров' }, en: { title: 'Design Management Patterns', author: 'Yury Vetrov' } },
    { size: 'm', cover: 'assets/book-5.webp', href: 'https://www.labirint.ru/books/639546/', ru: { title: 'Непонятное искусство', author: 'Уилл Гомперц' }, en: { title: 'What Are You Looking At?', author: 'Will Gompertz' } },
    { size: 's', cover: 'assets/book-6.webp', href: 'https://ozon.kz/product/mozgouskoriteli-kak-nauchitsya-effektivno-myslit-ispolzuya-priemy-iz-raznyh-nauk-nisbett-richard-1411242453/', ru: { title: 'Мозгоускорители', author: 'Ричард Нисбетт' }, en: { title: 'Mindware: Tools for Smart Thinking', author: 'Richard Nisbett' } }
  ];

  var ROW_PATTERN = [2, 2, 3];

  /* ── Tile spans: rows of 2, 2, 3 across a 6-column grid ───────────────── */

  function computeSpans(count) {
    var spans = [], i = 0, p = 0;
    while (i < count) {
      var groupSize = ROW_PATTERN[p % ROW_PATTERN.length];
      var take = Math.min(groupSize, count - i);
      var span = Math.max(1, Math.floor(6 / groupSize));
      for (var k = 0; k < take; k++) spans.push(span);
      i += take;
      p++;
    }
    return spans;
  }

  /* ── Local state ──────────────────────────────────────────────────────── */

  var filter = 'all';
  var hoveredIndex = -1;
  var inView = {};
  var shotIndex = 0;
  var avatarProgress = 0;

  var dom = {
    filters: document.querySelector('[data-filters]'),
    grid: document.querySelector('[data-grid]'),
    empty: document.querySelector('[data-empty]')
  };

  var tiles = [];
  var bookNodes = [];
  var chipNodes = {};
  var avatarsNode = null;
  var avatarsImg = null;
  var booksNode = null;
  var shotNodes = [];

  /* ── Build: filter chips ──────────────────────────────────────────────── */

  function buildFilters() {
    dom.filters.textContent = '';
    chipNodes = {};
    ['all', 'project', 'article'].forEach(function (key) {
      var btn = el('button', 'chip', { type: 'button' });
      btn.addEventListener('click', function () { setFilter(key); });
      chipNodes[key] = btn;
      dom.filters.appendChild(btn);
    });
  }

  /* ── Build: tile covers ───────────────────────────────────────────────── */

  function buildTileMedia(meta) {
    var media = el('div', 'tile-media');

    if (meta.video) {
      var video = el('video', 'tile-video', {
        autoplay: '', loop: '', muted: '', playsinline: '', preload: 'metadata', src: meta.video
      });
      video.muted = true;
      video.loop = true;
      media.appendChild(video);
      // Some browsers only honour autoplay once the element is in the document.
      setTimeout(function () {
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () {});
      }, 0);
    }

    if (meta.fan) {
      var fanWrap = el('div', 'fan-wrap');
      [
        ['assets/fan-left.webp', 'fan-img fan-left'],
        ['assets/fan-right.webp', 'fan-img fan-right'],
        ['assets/fan-center.webp', 'fan-img fan-center']
      ].forEach(function (pair) {
        fanWrap.appendChild(el('img', pair[1], { src: pair[0], alt: '', loading: 'lazy' }));
      });
      media.appendChild(fanWrap);
    }

    if (meta.stack) {
      var stackWrap = el('div', 'fan-wrap');
      [
        ['assets/stack-back.webp', 'stack-img stack-back'],
        ['assets/stack-mid.webp', 'stack-img stack-mid'],
        ['assets/stack-front.webp', 'stack-img stack-front']
      ].forEach(function (pair) {
        stackWrap.appendChild(el('img', pair[1], { src: pair[0], alt: '', loading: 'lazy' }));
      });
      media.appendChild(stackWrap);
    }

    if (meta.soon) {
      var soonWrap = el('div', 'soon-wrap');
      var soonLogo = el('div', 'soon-logo');
      soonLogo.style.backgroundImage = 'url("' + (meta.logo || '') + '")';
      soonWrap.appendChild(soonLogo);
      media.appendChild(soonWrap);
    }

    if (meta.shots) {
      var shotsWrap = el('div', 'shots-wrap');
      var group = [];
      SHOTS.forEach(function (src, si) {
        var shot = el('div', 'shot' + (si === 0 ? ' is-current' : ''));
        shot.style.backgroundImage = 'url("' + src + '")';
        shotsWrap.appendChild(shot);
        group.push(shot);
      });
      shotNodes.push(group);
      media.appendChild(shotsWrap);
    }

    if (meta.cover) {
      var coverBg = el('div', 'cover-bg');
      coverBg.style.background = meta.bg || 'transparent';
      media.appendChild(coverBg);

      var cover = el('div', 'cover' + (meta.tilt ? ' is-tilt' : ''));
      cover.style.backgroundImage = 'url("' + meta.cover + '")';
      media.appendChild(cover);
    }

    if (meta.cert) {
      var certWrap = el('div', 'cert-wrap');
      var certImg = el('div', 'cert-img');
      certImg.style.backgroundImage = 'url("assets/cert.webp")';
      certWrap.appendChild(certImg);
      media.appendChild(certWrap);
    }

    var plainCover = !meta.video && !meta.fan && !meta.stack && !meta.shots && !meta.cert && !meta.cover && !meta.soon;
    if (plainCover) {
      var NS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 400 300');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      svg.setAttribute('class', 'tile-svg');

      var rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('width', '400');
      rect.setAttribute('height', '300');
      rect.setAttribute('fill', meta.c1);
      svg.appendChild(rect);

      if (meta.shape) {
        var circle = document.createElementNS(NS, 'circle');
        circle.setAttribute('cx', '200');
        circle.setAttribute('cy', '140');
        circle.setAttribute('r', '55');
        circle.setAttribute('fill', meta.c2);
        svg.appendChild(circle);
      }
      if (meta.shapeAlt) {
        var box = document.createElementNS(NS, 'rect');
        box.setAttribute('x', '70');
        box.setAttribute('y', '60');
        box.setAttribute('width', '260');
        box.setAttribute('height', '150');
        box.setAttribute('rx', '10');
        box.setAttribute('fill', meta.c2);
        svg.appendChild(box);
      }
      media.appendChild(svg);
    }

    return media;
  }

  function buildTile(meta, index) {
    // The "coming soon" card is deliberately not a link.
    var node = el('a', 'tile' + (meta.soon ? ' is-soon' : ''));
    if (!meta.soon) {
      node.setAttribute('href', meta.href || (meta.type === 'project' ? 'airtrip.html' : 'animation-challenge.html'));
      node.setAttribute('target', meta.external ? '_blank' : '_self');
      node.setAttribute('rel', 'noopener');
    }
    node.dataset.tileIndex = String(index);

    node.appendChild(buildTileMedia(meta));
    node.appendChild(el('div', 'tile-scrim'));

    var badge = el('span', 'tile-badge');
    var title = el('h2', 'tile-title');
    node.appendChild(badge);
    node.appendChild(title);

    node.addEventListener('mouseenter', function () {
      hoveredIndex = index;
      applyTileStates();
    });
    node.addEventListener('mouseleave', function () {
      hoveredIndex = -1;
      applyTileStates();
    });

    tiles.push({ node: node, badge: badge, title: title, meta: meta, index: index });
    return node;
  }

  /* ── Build: banners ───────────────────────────────────────────────────── */

  function buildAvatars() {
    avatarsNode = el('div', 'avatars');
    avatarsImg = el('img', null, { src: 'assets/avatars-collage.webp', alt: '', loading: 'lazy' });
    avatarsNode.appendChild(avatarsImg);
    return avatarsNode;
  }

  function buildBooks() {
    booksNode = el('div', 'books');
    var shelf = el('div', 'shelf');
    bookNodes = [];

    BOOKS.forEach(function (book) {
      var link = el('a', 'book size-' + (book.size || 'm'), {
        href: book.href, target: '_blank', rel: 'noopener'
      });

      var stage = el('div', 'book-stage');

      var page = el('div', 'book-page');
      var titleEl = el('div', 'book-title');
      var authorEl = el('div', 'book-author');
      page.appendChild(titleEl);
      page.appendChild(authorEl);

      var cover = el('div', 'book-cover');
      if (book.cover) cover.style.backgroundImage = 'url("' + book.cover + '")';

      stage.appendChild(page);
      stage.appendChild(cover);
      link.appendChild(stage);
      shelf.appendChild(link);

      bookNodes.push({ book: book, titleEl: titleEl, authorEl: authorEl });
    });

    booksNode.appendChild(shelf);
    return booksNode;
  }

  /* ── Build: the grid, in the prototype's interleaved order ────────────── */

  function buildGrid() {
    dom.grid.textContent = '';
    tiles = [];
    shotNodes = [];

    var tileNodes = TILE_META.map(function (meta, i) { return buildTile(meta, i); });

    [
      tileNodes[0], tileNodes[1], buildAvatars(),
      tileNodes[2], tileNodes[3], tileNodes[4], tileNodes[5], tileNodes[6],
      buildBooks(), tileNodes[7]
    ].forEach(function (node) { dom.grid.appendChild(node); });
  }

  /* ── Update passes ────────────────────────────────────────────────────── */

  function applyLanguage() {
    var t = PF.localize(COPY);

    dom.empty.textContent = t.emptyLabel;

    ['all', 'project', 'article'].forEach(function (key) {
      if (chipNodes[key]) chipNodes[key].textContent = t.filters[key];
    });

    tiles.forEach(function (tile) {
      tile.badge.textContent = t.typeLabels[tile.meta.type];
      tile.title.textContent = t.tiles[tile.index];
    });

    bookNodes.forEach(function (entry) {
      var info = entry.book[state.lang] || entry.book.ru;
      entry.titleEl.textContent = info.title;
      entry.authorEl.textContent = info.author;
    });
  }

  function applyFilter() {
    var showBanners = filter === 'all';
    var visible = [];

    tiles.forEach(function (tile) {
      var isVisible = filter === 'all' || tile.meta.type === filter;
      tile.node.hidden = !isVisible;
      if (isVisible) visible.push(tile);
    });

    var spans = computeSpans(visible.length);
    visible.forEach(function (tile, pos) {
      tile.node.style.setProperty('--span', String(spans[pos]));
    });

    if (avatarsNode) avatarsNode.hidden = !showBanners;
    if (booksNode) booksNode.hidden = !showBanners;

    ['all', 'project', 'article'].forEach(function (key) {
      if (chipNodes[key]) chipNodes[key].classList.toggle('is-active', filter === key);
    });

    var count = visible.length + (showBanners ? 2 : 0);
    dom.empty.hidden = count !== 0;
    dom.grid.hidden = count === 0;
  }

  // Desktop reveals a tile's label and motion on hover; mobile does it on scroll.
  function applyTileStates() {
    tiles.forEach(function (tile) {
      var hovered = state.isDesktop ? hoveredIndex === tile.index : !!inView[tile.index];
      tile.node.classList.toggle('hovered', hovered);
      tile.node.classList.toggle('labels-on', state.isDesktop ? hoveredIndex === tile.index : true);
    });
  }

  // Coming back from a project on a phone almost always means the browser
  // handing back its own cached copy of this page: no script runs, so the
  // tiles would sit there already revealed and the return would look dead.
  // Take the reveal off and put it back so it plays again.
  function replayReveal() {
    inView = {};
    tiles.forEach(function (tile) {
      tile.node.classList.remove('labels-on', 'hovered');
    });
    // Read a layout value in between, or the browser folds the two class
    // changes into one and animates nothing.
    void dom.grid.offsetHeight;
    requestAnimationFrame(function () {
      requestAnimationFrame(applyTileStates);
    });
  }

  function setFilter(key) {
    filter = key;
    applyFilter();
    applyTileStates();
  }

  /* ── Scroll-driven behaviour ──────────────────────────────────────────── */

  function setupObserver() {
    if (typeof IntersectionObserver === 'undefined') return;
    var io = new IntersectionObserver(function (entries) {
      var changed = false;
      entries.forEach(function (entry) {
        var idx = Number(entry.target.dataset.tileIndex);
        if (entry.isIntersecting) {
          if (!inView[idx]) {
            setTimeout(function () {
              inView[idx] = true;
              applyTileStates();
            }, 220);
          }
        } else if (inView[idx]) {
          inView[idx] = false;
          changed = true;
        }
      });
      if (changed) applyTileStates();
    }, { threshold: 0.35 });

    tiles.forEach(function (tile) { io.observe(tile.node); });
  }

  function setupShotRotation() {
    if (PF.reduceMotion || !shotNodes.length) return;
    setInterval(function () {
      shotIndex += 1;
      shotNodes.forEach(function (group) {
        var current = shotIndex % group.length;
        group.forEach(function (shot, i) {
          shot.classList.toggle('is-current', i === current);
        });
      });
    }, 1200);
  }

  // The collage drifts sideways: with page scroll on desktop, with its own
  // position in the viewport on mobile (after a short dwell).
  function setupParallax() {
    var target = 0;
    var avatarsEnterTime = null;

    function computeTarget() {
      var vh = window.innerHeight;
      if (state.isDesktop) {
        var scrollMax = document.documentElement.scrollHeight - vh;
        target = scrollMax > 0 ? Math.min(Math.max(window.scrollY / scrollMax, 0), 1) : 0;
      } else if (avatarsNode) {
        var rect = avatarsNode.getBoundingClientRect();
        var isVisible = rect.top < vh;
        if (isVisible && avatarsEnterTime == null) avatarsEnterTime = performance.now();
        if (!isVisible) avatarsEnterTime = null;
        if (avatarsEnterTime != null && performance.now() - avatarsEnterTime >= 650) {
          target = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
        }
      }
    }

    function tick() {
      var next = avatarProgress + (target - avatarProgress) * 0.1;
      if (Math.abs(next - avatarProgress) > 0.0008) {
        avatarProgress = PF.reduceMotion ? 0 : next;
        if (avatarsImg) {
          var shift = avatarProgress * (state.isDesktop ? 200 : 450);
          avatarsImg.style.transform = 'translateX(-' + shift + 'px)';
        }
      }
      requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', computeTarget, { passive: true });
    window.addEventListener('resize', computeTarget);
    computeTarget();
    requestAnimationFrame(tick);
  }

  /* ── Init ─────────────────────────────────────────────────────────────── */

  function init() {
    PF.init('home');

    buildFilters();
    buildGrid();

    applyLanguage();
    applyFilter();
    applyTileStates();

    PF.onChange(function (reason) {
      if (reason === 'lang') applyLanguage();
      if (reason === 'viewport') {
        hoveredIndex = -1;
        applyTileStates();
      }
    });

    setupObserver();
    setupShotRotation();
    setupParallax();

    // Last, with the grid in place: the page is now tall enough to scroll back
    // to wherever it was when a tile was clicked.
    PF.restoreHomeScroll();

    window.addEventListener('pageshow', function (e) {
      if (!e.persisted) return;
      replayReveal();
      PF.restoreCachedScroll();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
