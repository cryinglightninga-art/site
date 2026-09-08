/* ============================================================================
   Activities — a masonry wall of certificates, awards and talks.
   Captions reveal on hover; some cells link out to the issuing page.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      title: 'Активности',
      lead: 'Конкурсы, олимпиады и курсы — то, чем я занималась помимо работы',
      labels: [
        'Спикер курса для селлеров о создании и развитии СТМ',
        'Спикер мастер-класса о продвинутой работе с карточкой товара',
        'ВСО «Графический дизайн»',
        '1 место в конкурсе студенческих проектов',
        'Google — Foundations of Project Management',
        'Фотошкола inFocus — основы цифровой фотографии',
        'Почётный диплом фестиваля «Заводной апельсин»',
        'Adobe InDesign — вёрстка и допечатная подготовка',
        'Tilda School — PRO course',
        'FutureLearn × Accenture — Digital Skills: User Experience',
        'Uxcel — HTML for Designers',
        'Skyeng — English, Intermediate',
        'Онлайн-волонтёр / участник исследований'
      ]
    },
    en: {
      title: 'Activities',
      lead: 'Competitions, olympiads, and courses — what I do beyond work',
      labels: [
        'Speaker at a seller course on private label product development',
        'Speaker at a masterclass on advanced product card tools',
        'Student Olympiad — Graphic Design',
        '1st place in the student project competition',
        'Google — Foundations of Project Management',
        'inFocus Photo School — Basics of Digital Photography',
        'Honorary Diploma — “A Clockwork Orange” festival',
        'Adobe InDesign — Layout and Prepress',
        'Tilda School — PRO Course',
        'FutureLearn × Accenture — Digital Skills: User Experience',
        'Uxcel — HTML for Designers',
        'Skyeng — English, Intermediate',
        'Online Volunteer / Research Contributor'
      ]
    }
  };

  // Natural aspect ratios are preserved — the masonry columns absorb the
  // height differences. Order matches COPY[lang].labels.
  //
  // `w` and `h` are each file's real pixel size and go on the <img> as
  // attributes. Without them a cell is a couple of pixels tall until its
  // picture arrives and then jumps to full height, which reshuffles the whole
  // wall; with them the browser knows the shape up front and holds the space.
  var PHOTOS = [
    { src: 'assets/activities-1.webp', w: 580, h: 800 },
    { src: 'assets/activities-2.webp', w: 800, h: 478 },
    { src: 'assets/activities-3.webp', w: 800, h: 566 },
    { src: 'assets/activities-4.webp', w: 566, h: 800, href: 'https://laenguild.org/workshop' },
    { src: 'assets/activities-5.webp', w: 800, h: 618, href: 'https://www.coursera.org/account/accomplishments/verify/QLV2VPCNZA7S' },
    { src: 'assets/activities-6.webp', w: 558, h: 800 },
    { src: 'assets/activities-7.webp', w: 559, h: 800, href: 'https://staroekrukovo.ru/print.php?item=studenty-mieta-diplomanty-xxvi-mezhdunarodnogo-studencheskogo-konkursa-na-luchshiy-dizayn-upakovki-z' },
    { src: 'assets/activities-8.webp', w: 800, h: 574 },
    { src: 'assets/activities-9.webp', w: 565, h: 800, href: 'https://tilda.school/stories/ugk5guxxb1-istoriya-studenta-adelina-urzhanova' },
    { src: 'assets/activities-10.webp', w: 800, h: 548 },
    { src: 'assets/activities-11.webp', w: 800, h: 565 },
    { src: 'assets/activities-12.webp', w: 800, h: 569 },
    { src: 'assets/activities-13.webp', w: 800, h: 586 }
  ];

  var content = document.querySelector('[data-content]');

  function buildPhoto(photo, label) {
    var cell = photo.href
      ? el('a', 'photo-cell', { href: photo.href, target: '_blank', rel: 'noopener' })
      : el('div', 'photo-cell');

    cell.appendChild(el('img', null, {
      src: photo.src, alt: label, loading: 'lazy',
      width: String(photo.w), height: String(photo.h)
    }));
    cell.appendChild(el('div', 'photo-scrim'));

    var caption = el('div', 'photo-caption');
    caption.textContent = label;
    cell.appendChild(caption);

    return cell;
  }

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    content.appendChild(ui.title(t.title, 'has-lead'));
    content.appendChild(ui.lead(t.lead));

    var masonry = el('div', 'masonry');
    PHOTOS.forEach(function (photo, i) {
      masonry.appendChild(buildPhoto(photo, t.labels[i] || ''));
    });
    content.appendChild(masonry);
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
