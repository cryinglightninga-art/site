/* ============================================================================
   Shared layer for every page: theme and language state, the author sidebar,
   the language/theme controls, and the Lottie wordmark.

   Exposes window.PF. Page scripts read PF.state, render their own content, and
   register PF.onChange(fn) to re-render when the language or theme flips.
   ========================================================================== */

window.PF = (function () {
  'use strict';

  var DESKTOP_MIN = 900;
  var HOME_HREF = 'index.html';

  /* ── Copy shared by all seven pages ───────────────────────────────────── */

  var SIDEBAR = {
    ru: {
      name: 'Аделина Уржанова',
      role: 'Product Designer',
      bio: 'Продуктовый дизайнер на стыке AI, e-commerce и fintech. Делаю сложное внутри понятным снаружи.',
      experienceLabel: 'Опыт',
      contactsLabel: 'Контакты',
      back: 'Назад',
      exp: [
        { id: 'wildberries', company: 'Wildberries', role: 'Sr. Product Designer', dates: '2024 — н.в.' },
        { id: 'mujo', company: 'Mujo', role: 'Product Designer', dates: '2024 — 2025' },
        { id: 'teamly', company: 'Teamly', role: 'Web Designer', dates: '2023 — 2024' },
        { id: 'other', company: 'Другое', role: 'Graphic Designer', dates: '2020 — 2023' }
      ]
    },
    en: {
      name: 'Adelina Urzhanova',
      role: 'Product Designer',
      bio: 'Product Designer at the intersection of AI, e-commerce, and fintech. Making complex products feel clear from the outside.',
      experienceLabel: 'Experience',
      contactsLabel: 'Contact',
      back: 'Back',
      exp: [
        { id: 'wildberries', company: 'Wildberries', role: 'Sr. Product Designer', dates: '2024 — now' },
        { id: 'mujo', company: 'Mujo', role: 'Product Designer', dates: '2024 — 2025' },
        { id: 'teamly', company: 'Teamly', role: 'Web Designer', dates: '2023 — 2024' },
        { id: 'other', company: 'Other', role: 'Graphic Designer', dates: '2020 — 2023' }
      ]
    }
  };

  var CONTACT_LINKS = [
    { label: 'adelina@urzhanovaa.com', href: 'mailto:adelina@urzhanovaa.com', target: '_self' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/urzhanovaa/', target: '_blank' },
    { label: 'Telegram', href: 'https://t.me/urzhanovaa', target: '_blank' },
    { label: 'Instagram', href: 'https://www.instagram.com/urzhanovaa/', target: '_blank' }
  ];

  var LOGO_SRC = {
    wildberries: [{ src: 'assets/logo-wildberries.webp', zoom: '100% 100%' }],
    mujo: [{ src: 'assets/logo-mujo.webp', zoom: '100% 100%' }],
    teamly: [{ src: 'assets/logo-teamly.webp', zoom: '100% 100%' }],
    other: ['assets/logo-au-1.webp', 'assets/logo-au-2.webp']
  };

  var LOTTIE_SRC = { light: 'assets/logo-light.json', dark: 'assets/logo-dark.json' };

  /* ── Russian typography: glue short words and dashes to what follows ───── */

  function nbspText(s) {
    return s
      .replace(/(^|[\s(«"—-])([а-яёА-ЯЁ]{1,2})\s+/g, '$1$2\u00A0')
      .replace(/\s+(—|–)\s+/g, '\u00A0$1 ');
  }

  function nbspDeep(v) {
    if (typeof v === 'string') return nbspText(v);
    if (Array.isArray(v)) return v.map(nbspDeep);
    if (v && typeof v === 'object') {
      var out = {};
      for (var k in v) out[k] = nbspDeep(v[k]);
      return out;
    }
    return v;
  }

  // Page scripts pass their own copy object through this to get the same
  // treatment the sidebar gets.
  function localize(copy) {
    return state.lang === 'ru' ? nbspDeep(copy.ru) : copy.en;
  }

  /* ── Preferences ──────────────────────────────────────────────────────── */

  function readPref(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }

  function writePref(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  // Until the visitor picks a side with the toggle, the site follows the phone
  // or the laptop — which is also what keeps the strips above and below the
  // page (the clock, the battery) from staying white on a dark phone.
  function systemTheme() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light';
    } catch (e) { return 'light'; }
  }

  /* ── DOM helper ───────────────────────────────────────────────────────── */

  function el(tag, className, attrs) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (attrs) for (var k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  /* ── State ────────────────────────────────────────────────────────────── */

  var state = {
    theme: readPref('pf-theme', systemTheme()),
    lang: readPref('pf-lang', 'en'),
    isDesktop: window.innerWidth >= DESKTOP_MIN
  };

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var listeners = [];

  function onChange(fn) { listeners.push(fn); }

  function emit(reason) {
    listeners.forEach(function (fn) {
      try { fn(reason); } catch (e) { /* one bad listener must not stop the rest */ }
    });
  }

  function sidebarCopy() {
    return state.lang === 'ru' ? nbspDeep(SIDEBAR.ru) : SIDEBAR.en;
  }

  /* ── Sidebar rendering ────────────────────────────────────────────────── */

  function renderExperience(container, t) {
    container.textContent = '';
    t.exp.forEach(function (exp) {
      var row = el('div', 'exp-row');
      var main = el('div', 'exp-main');
      var companyRow = el('div', 'exp-company-row');

      var company = el('span', 'exp-company');
      company.textContent = exp.company;
      companyRow.appendChild(company);

      var srcs = LOGO_SRC[exp.id] || [];
      if (srcs.length) {
        var stack = el('div', 'exp-logos');
        srcs.forEach(function (entry, li) {
          var isPlain = typeof entry === 'string';
          var dot = el('div', 'exp-logo');
          dot.style.backgroundImage = 'url("' + (isPlain ? entry : entry.src) + '")';
          dot.style.backgroundSize = isPlain ? 'cover' : (entry.zoom || 'cover');
          // Earlier logos sit on top of the ones they overlap.
          dot.style.zIndex = String(srcs.length - li);
          stack.appendChild(dot);
        });
        companyRow.appendChild(stack);
      }

      main.appendChild(companyRow);

      var role = el('span', 'exp-role');
      role.textContent = exp.role;
      main.appendChild(role);

      var dates = el('span', 'exp-dates');
      dates.textContent = exp.dates;

      row.appendChild(main);
      row.appendChild(dates);
      container.appendChild(row);
    });
  }

  function renderContacts(container) {
    container.textContent = '';
    CONTACT_LINKS.forEach(function (contact) {
      var a = el('a', 'contact-link', { href: contact.href, target: contact.target, rel: 'noopener' });
      a.textContent = contact.label;
      container.appendChild(a);
    });
  }

  /* ── Controls ─────────────────────────────────────────────────────────── */

  function bindControls(root) {
    var scope = root || document;
    Array.prototype.forEach.call(scope.querySelectorAll('[data-lang]'), function (btn) {
      if (btn.dataset.pfBound) return;
      btn.dataset.pfBound = '1';
      btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
    });
    Array.prototype.forEach.call(scope.querySelectorAll('[data-theme-toggle]'), function (btn) {
      if (btn.dataset.pfBound) return;
      btn.dataset.pfBound = '1';
      btn.addEventListener('click', function () {
        setTheme(state.theme === 'dark' ? 'light' : 'dark');
      });
    });
  }

  function controlsMarkup() {
    var wrap = el('div', 'topbar-controls');

    var langSwitch = el('div', 'lang-switch');
    ['en', 'ru'].forEach(function (code) {
      var btn = el('button', 'lang-btn', { type: 'button', 'data-lang': code });
      btn.textContent = code.toUpperCase();
      langSwitch.appendChild(btn);
    });

    var themeBtn = el('button', 'theme-btn', { type: 'button', 'data-theme-toggle': '', 'aria-label': 'Toggle theme' });

    wrap.appendChild(langSwitch);
    wrap.appendChild(themeBtn);
    return wrap;
  }

  function backLinkMarkup() {
    var a = el('a', 'back-link', { href: HOME_HREF });
    var arrow = el('span', 'back-arrow');
    arrow.textContent = '←';
    var label = el('span', null, { 'data-back-label': '' });
    a.appendChild(arrow);
    a.appendChild(label);
    bindBackLink(a);
    return a;
  }

  /* ── Sub-page chrome ──────────────────────────────────────────────────── */

  // Fills [data-author] with the mobile top bar plus the desktop sidebar, and
  // [data-topbar-row] with the desktop back link and controls.
  function buildSubPageChrome() {
    document.body.classList.add('page-sub');

    var author = document.querySelector('[data-author]');
    if (author) {
      // Into the layout, ahead of the author column — a sticky bar only stays
      // put while its own parent is on screen, and the column ends early.
      var topbar = el('div', 'topbar');
      topbar.appendChild(backLinkMarkup());
      topbar.appendChild(controlsMarkup());
      (author.parentNode || author).insertBefore(topbar, author);

      var body = el('div', 'sidebar-body');

      var logoLink = el('a', 'logo-link', { href: HOME_HREF });
      logoLink.appendChild(el('div', 'logo', { 'data-logo': '' }));
      body.appendChild(logoLink);

      body.appendChild(el('p', 'bio', { 'data-bio': '' }));
      body.appendChild(el('div', 'section-label exp-label', { 'data-exp-label': '' }));
      body.appendChild(el('div', 'exp-block', { 'data-exp-list': '' }));

      var contacts = el('div', 'contacts-block');
      contacts.appendChild(el('div', 'section-label', { 'data-contacts-label': '' }));
      contacts.appendChild(el('div', 'contacts-row', { 'data-contacts': '' }));
      body.appendChild(contacts);

      author.appendChild(body);
    }

    var row = document.querySelector('[data-topbar-row]');
    if (row) {
      row.appendChild(backLinkMarkup());
      row.appendChild(controlsMarkup());
    }
  }

  /* ── Applying state ───────────────────────────────────────────────────── */

  function applyTheme() {
    var root = document.documentElement;
    if (state.theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    // Drop the inline background the pre-paint script set so the token wins.
    root.style.background = '';

    // Safari ignores a theme-color meta whose content merely changes — it only
    // re-reads the value when the element itself is new, which is why the
    // strips around the page used to stay put until the next reload. Swap the
    // whole node instead of editing it.
    var head = document.head;
    var old = head.querySelector('meta[name="theme-color"]');
    if (old) head.removeChild(old);
    var meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', state.theme === 'dark' ? '#000000' : '#ffffff');
    head.appendChild(meta);

    var icon = state.theme === 'dark' ? '☀️' : '🌙';
    Array.prototype.forEach.call(document.querySelectorAll('[data-theme-toggle]'), function (btn) {
      btn.textContent = icon;
    });

    loadLogo();
  }

  function applyLanguage() {
    var t = sidebarCopy();
    document.documentElement.lang = state.lang === 'ru' ? 'ru' : 'en';

    var bio = document.querySelector('[data-bio]');
    if (bio) bio.textContent = t.bio;

    var expLabel = document.querySelector('[data-exp-label]');
    if (expLabel) expLabel.textContent = t.experienceLabel;

    var expList = document.querySelector('[data-exp-list]');
    if (expList) renderExperience(expList, t);

    var contactsLabel = document.querySelector('[data-contacts-label]');
    if (contactsLabel) contactsLabel.textContent = t.contactsLabel;

    var srHeading = document.querySelector('[data-sr-heading]');
    if (srHeading) srHeading.textContent = t.name + ' — ' + t.role;

    Array.prototype.forEach.call(document.querySelectorAll('[data-back-label]'), function (node) {
      node.textContent = t.back;
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (btn) {
      btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
    });
  }

  function setTheme(theme) {
    state.theme = theme;
    writePref('pf-theme', theme);
    applyTheme();
    emit('theme');
  }

  function setLang(lang) {
    state.lang = lang;
    writePref('pf-lang', lang);
    applyLanguage();
    emit('lang');
  }

  /* ── Lottie wordmark ──────────────────────────────────────────────────── */

  var lottieAnim = null;
  var lottieTheme = null;
  var lottieWait = null;

  function logoNode() { return document.querySelector('[data-logo]'); }

  function logoFallback() {
    var node = logoNode();
    if (!node) return;
    node.classList.add('is-fallback');
    node.textContent = sidebarCopy().name;
  }

  // The splash covers the whole viewport on the first load of a session. Run
  // `fn` only once it starts clearing, so an animation held for it isn't spent
  // behind it. Fires immediately when there is no splash (later navigations,
  // theme switches).
  function whenPageVisible(fn) {
    var splash = document.getElementById('om-splash');
    if (!splash || !splash.isConnected) { fn(); return; }

    var fired = false;
    function fire() {
      if (fired) return;
      fired = true;
      observer.disconnect();
      clearTimeout(safety);
      fn();
    }

    // Wait for the splash to leave the DOM, not just to start fading, so the
    // animation plays entirely on the visible page.
    var observer = new MutationObserver(function () {
      if (!splash.isConnected) setTimeout(fire, 80);
    });
    observer.observe(document.body, { childList: true });

    // The splash removes itself by ~4.7s at the very latest; don't outwait it.
    var safety = setTimeout(fire, 6000);
  }

  function loadLogo() {
    var node = logoNode();
    if (!node) return;

    if (!window.lottie) {
      if (lottieWait) return;
      lottieWait = setInterval(function () {
        if (!window.lottie) return;
        clearInterval(lottieWait);
        lottieWait = null;
        loadLogo();
      }, 60);
      // If the CDN never answers, fall back to the name in text.
      setTimeout(function () {
        if (!window.lottie && !lottieAnim) {
          if (lottieWait) { clearInterval(lottieWait); lottieWait = null; }
          logoFallback();
        }
      }, 4000);
      return;
    }

    if (lottieAnim && lottieTheme === state.theme) return;
    lottieTheme = state.theme;
    if (lottieAnim) lottieAnim.destroy();

    node.classList.remove('is-fallback');
    node.textContent = '';

    // Held rather than autoplayed: the splash would otherwise cover the whole
    // animation, and the wordmark would be sitting on its last frame by the
    // time the page appears.
    var anim = window.lottie.loadAnimation({
      container: node,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: LOTTIE_SRC[state.theme] || LOTTIE_SRC.light
    });
    lottieAnim = anim;

    anim.addEventListener('data_failed', function () { logoFallback(); });
    anim.addEventListener('DOMLoaded', function () {
      if (lottieAnim !== anim) return;
      anim.goToAndStop(0, true);

      whenPageVisible(function () {
        if (lottieAnim !== anim) return;
        anim.goToAndPlay(0, true);

        setTimeout(function () {
          if (lottieAnim !== anim) return;
          // Some exports render empty on the first frames — jump to the end.
          var paths = Array.prototype.slice.call(node.querySelectorAll('path'));
          var empty = paths.length > 0 && paths.every(function (p) {
            return (p.getAttribute('d') || '').length <= 4;
          });
          if (empty) anim.goToAndStop(anim.totalFrames - 1, true);
        }, 1200);
      });
    });
  }

  /* ── Scroll memory ────────────────────────────────────────────────────── */

  // Going back from a project should land where the tile was, not at the top
  // of the page. A browser does that on its own when it can reuse the copy of
  // the home page it kept — but a plain navigation (our own "Назад" link) and
  // a back button on a page the browser has since dropped both rebuild the
  // page from scratch, and a rebuilt page starts at zero. So the home page
  // records where it was on the way out and puts it back on the way in.

  var SCROLL_KEY = 'pf-home-scroll';
  var RETURN_KEY = 'pf-home-return';

  function sessionGet(key) {
    try { return sessionStorage.getItem(key); } catch (e) { return null; }
  }
  function sessionSet(key, value) {
    try { sessionStorage.setItem(key, value); } catch (e) {}
  }
  function sessionDel(key) {
    try { sessionStorage.removeItem(key); } catch (e) {}
  }

  function navigationType() {
    try {
      var entries = performance.getEntriesByType('navigation');
      if (entries && entries.length) return entries[0].type;
    } catch (e) {}
    return '';
  }

  function rememberScroll() {
    sessionSet(SCROLL_KEY, String(Math.round(window.scrollY || window.pageYOffset || 0)));
  }

  // Home only: save the position on every exit, and flag the exits that should
  // come back to it — the ones that follow one of our own links.
  function watchHomeScroll() {
    // Deliberately NOT history.scrollRestoration = 'manual'. On a phone the
    // browser usually hands back its own cached copy of this page and never
    // re-runs any script — 'manual' would stop it restoring the position and
    // leave nothing to do the job instead.

    document.addEventListener('click', function (e) {
      var node = e.target;
      var link = node && node.closest ? node.closest('a[href]') : null;
      if (!link || link.target === '_blank') return;
      if (link.origin && link.origin !== window.location.origin) return;
      rememberScroll();
      sessionSet(RETURN_KEY, '1');
    }, true);

    // `pagehide` rather than `beforeunload`: iOS Safari fires it reliably, and
    // it also covers a back button pressed on the home page itself.
    window.addEventListener('pagehide', rememberScroll);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') rememberScroll();
    });
  }

  // Scroll there and keep checking for a moment. A phone settles its layout
  // late — web fonts arrive, the address bar slides away, images take their
  // final height — and each of those can drag the page back up. The moment the
  // visitor scrolls themselves, stop interfering.
  function scrollBackTo(y) {
    var cancelled = false;
    function stop() { cancelled = true; }
    ['wheel', 'touchstart', 'keydown'].forEach(function (evt) {
      window.addEventListener(evt, stop, { once: true, passive: true });
    });

    var tries = 0;
    function attempt() {
      if (cancelled) return;
      if (Math.abs(window.scrollY - y) > 2) window.scrollTo(0, y);
      tries += 1;
      if (tries < 7) setTimeout(attempt, tries < 4 ? 60 : 220);
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(attempt);
    });
  }

  // Home only, and only once the grid is on the page — the position cannot be
  // restored while the document is still too short to hold it.
  function restoreHomeScroll() {
    var stored = sessionGet(SCROLL_KEY);
    var returning = sessionGet(RETURN_KEY) === '1';
    sessionDel(RETURN_KEY);

    if (!stored) return;

    var type = navigationType();
    if (!returning && type !== 'back_forward' && type !== 'reload') return;

    var y = parseInt(stored, 10);
    if (y > 0) scrollBackTo(y);
  }

  // The other route home: the browser returns its own cached copy of the page,
  // so nothing above runs. Usually it restores the position too — but not
  // always, and on a phone that is the common case. Only step in when the page
  // has genuinely come back at the top.
  function restoreCachedScroll() {
    sessionDel(RETURN_KEY);
    if (window.scrollY > 2) return;
    var y = parseInt(sessionGet(SCROLL_KEY) || '0', 10);
    if (y > 0) scrollBackTo(y);
  }

  // A sub-page reached from the home page goes back through history instead of
  // navigating, so the browser can hand back the copy it kept — instantly, and
  // at the exact position. Arriving any other way (a shared link, a new tab)
  // leaves the link as an ordinary link to the home page.
  function cameFromHome() {
    if (!document.referrer || history.length <= 1) return false;
    try {
      var url = new URL(document.referrer);
      if (url.origin !== window.location.origin) return false;
      return url.pathname === '/' || url.pathname === '/index.html';
    } catch (e) { return false; }
  }

  function bindBackLink(a) {
    a.addEventListener('click', function (e) {
      // Leave modified clicks alone — they open a tab or a window.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!cameFromHome()) return;
      e.preventDefault();
      history.back();
    });
  }

  /* ── Sticky header ────────────────────────────────────────────────────── */

  // Below 900px the author column scrolls away with the page and takes the
  // language and theme controls with it, so the bar is pinned to the top (CSS
  // does that part). On the home page the wordmark then walks up into it: it
  // holds its place in the flow until the bar catches up with it, rides along
  // from there, and shrinks on the way, so that by the moment the two share a
  // line it is exactly as tall as the controls beside it.
  //
  // Above 900px the author column is already fixed on screen, so none of this
  // runs and the mark is left alone.
  function setupStickyHeader() {
    var topbar = document.querySelector('.topbar');
    if (!topbar) return;

    var slot = document.querySelector('[data-logo-slot]');
    var dock = topbar.querySelector('[data-logo-dock]');
    var logo = slot ? slot.querySelector('[data-logo]') : null;
    var pinned = false;

    function release() {
      if (!pinned) return;
      pinned = false;
      logo.style.position = '';
      logo.style.top = '';
      logo.style.left = '';
      logo.style.transform = '';
      logo.style.transformOrigin = '';
      logo.style.zIndex = '';
      slot.appendChild(logo);
    }

    // A pinned element is positioned against the window — unless some ancestor
    // carries a transform, and the author column does, left behind by its
    // entrance animation. Parking the mark on <body> keeps the arithmetic
    // honest wherever it came from.
    function pin() {
      if (pinned) return;
      pinned = true;
      document.body.appendChild(logo);
    }

    function update() {
      topbar.classList.toggle('is-stuck', window.scrollY > 2);

      if (!logo || !dock || state.isDesktop) { release(); return; }

      var from = slot.getBoundingClientRect();   // the place it keeps in the flow
      var to = dock.getBoundingClientRect();     // the place it is heading for
      if (!from.height || !to.height) { release(); return; }

      // How far it has come, as a fraction of the whole trip. `from.top` falls
      // as the page scrolls; the trip ends when it meets the dock.
      var total = from.top + window.scrollY - to.top;
      var p = total > 0 ? 1 - (from.top - to.top) / total : 1;
      p = p < 0 ? 0 : (p > 1 ? 1 : p);

      // Untouched until the page actually moves, so it fades in with the
      // column it belongs to.
      if (p <= 0) { release(); return; }

      var scale = 1 - (1 - to.height / from.height) * p;

      pin();
      logo.style.position = 'fixed';
      // Never above the dock — that is where it comes to rest.
      logo.style.top = Math.max(to.top, from.top) + 'px';
      logo.style.left = (from.left + (to.left - from.left) * p) + 'px';
      logo.style.transformOrigin = 'left top';
      logo.style.transform = 'scale(' + scale + ')';
      logo.style.zIndex = '60';
    }

    var queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; update(); });
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    onChange(function (reason) { if (reason === 'viewport') schedule(); });
    update();
  }

  /* ── Viewport ─────────────────────────────────────────────────────────── */

  // Follow the system while no explicit choice is stored, so flipping the
  // phone into dark mode repaints the page under the visitor.
  function watchSystemTheme() {
    if (!window.matchMedia) return;
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    function follow() {
      if (readPref('pf-theme', '')) return;
      state.theme = mq.matches ? 'dark' : 'light';
      applyTheme();
      emit('theme');
    }
    if (mq.addEventListener) mq.addEventListener('change', follow);
    else if (mq.addListener) mq.addListener(follow);
  }

  function watchResize() {
    window.addEventListener('resize', function () {
      var isDesktop = window.innerWidth >= DESKTOP_MIN;
      if (isDesktop === state.isDesktop) return;
      state.isDesktop = isDesktop;
      emit('viewport');
    });
  }

  /* ── Boot ─────────────────────────────────────────────────────────────── */

  // `sub` builds the back-link chrome and sidebar; the home page supplies its
  // own markup and only needs the state machine.
  function init(kind) {
    if (kind === 'sub') buildSubPageChrome();
    if (kind === 'home') watchHomeScroll();
    bindControls();
    renderContactsInto();
    applyTheme();
    applyLanguage();
    watchResize();
    watchSystemTheme();
    setupStickyHeader();
  }

  function renderContactsInto() {
    var container = document.querySelector('[data-contacts]');
    if (container) renderContacts(container);
  }


  /* ── Building blocks shared by the project and article pages ──────────── */

  var ui = {
    // `mobileSrc` is optional; article.css swaps to it below 900px. Both go in
    // as custom properties rather than as an inline background-image, which no
    // media query could out-rank.
    hero: function (src, mobileSrc) {
      var node = el('div', 'hero');
      if (src) node.style.setProperty('--hero', 'url("' + src + '")');
      if (mobileSrc) node.style.setProperty('--hero-mobile', 'url("' + mobileSrc + '")');
      return node;
    },
    badge: function (text) {
      var node = el('div', 'type-badge');
      node.textContent = text;
      return node;
    },
    title: function (text, extraClass) {
      var node = el('h1', 'page-title' + (extraClass ? ' ' + extraClass : ''));
      node.textContent = text;
      return node;
    },
    lead: function (text, extraClass) {
      var node = el('p', 'lead' + (extraClass ? ' ' + extraClass : ''));
      node.textContent = text;
      return node;
    },
    metaGrid: function (fields, colsClass) {
      var grid = el('div', 'meta-grid' + (colsClass ? ' ' + colsClass : ''));
      fields.forEach(function (field) {
        var cell = el('div');
        var label = el('div', 'meta-label');
        label.textContent = field.label;
        var value = el('div', 'meta-value');
        value.textContent = field.value;
        cell.appendChild(label);
        cell.appendChild(value);
        grid.appendChild(cell);
      });
      return grid;
    },
    // A heading + paragraph pair; pass a falsy heading for a bare paragraph.
    block: function (heading, text, headingClass) {
      var wrap = el('div', 'block');
      if (heading) {
        var h = el('h2', 'block-heading' + (headingClass ? ' ' + headingClass : ''));
        h.textContent = heading;
        wrap.appendChild(h);
      }
      var p = el('p', 'para');
      p.textContent = text;
      wrap.appendChild(p);
      return wrap;
    },
    sectionHeading: function (text) {
      var node = el('div', 'section-heading');
      node.textContent = text;
      return node;
    },
    // These clips play muted with no controls, so until one starts moving
    // there is nothing to say it is a video rather than a photo. This dims the
    // first frame and spins over it until playback actually begins.
    videoVeil: function (video, onFail) {
      var veil = el('div', 'video-veil');
      veil.appendChild(el('i'));

      var gone = false;
      function clear() {
        if (gone) return;
        gone = true;
        veil.classList.add('is-gone');
        setTimeout(function () { veil.remove(); }, 400);
      }

      video.addEventListener('playing', clear);
      // A browser that refuses to autoplay still shows the first frame, and a
      // spinner that never stops would be worse than no spinner at all.
      video.addEventListener('loadeddata', function () { setTimeout(clear, 2500); });
      video.addEventListener('error', function () {
        gone = true;
        veil.remove();
        if (onFail) onFail();
      });

      return veil;
    },
    // A clip in its own box: the video, the loading veil over it, and a label
    // for the case where the file never arrives.
    videoFrame: function (video, failedLabel, extraClass) {
      var wrap = el('div', 'video-frame' + (extraClass ? ' ' + extraClass : ''));

      var failed = el('div', 'failed-label');
      failed.textContent = failedLabel || '';
      failed.hidden = true;

      wrap.appendChild(ui.autoplay(video));
      wrap.appendChild(ui.videoVeil(video, function () { failed.hidden = false; }));
      wrap.appendChild(failed);
      return wrap;
    },
    // Muted, non-looping autoplay that survives browsers refusing the promise.
    autoplay: function (video) {
      video.muted = true;
      video.setAttribute('muted', '');
      video.loop = true;
      setTimeout(function () {
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () {});
      }, 0);
      return video;
    }
  };

  return {
    state: state,
    ui: ui,
    reduceMotion: reduceMotion,
    DESKTOP_MIN: DESKTOP_MIN,
    el: el,
    localize: localize,
    nbspDeep: nbspDeep,
    sidebarCopy: sidebarCopy,
    renderExperience: renderExperience,
    renderContacts: renderContacts,
    bindControls: bindControls,
    onChange: onChange,
    setTheme: setTheme,
    setLang: setLang,
    applyTheme: applyTheme,
    applyLanguage: applyLanguage,
    watchResize: watchResize,
    restoreHomeScroll: restoreHomeScroll,
    restoreCachedScroll: restoreCachedScroll,
    init: init
  };
})();
