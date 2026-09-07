/* ============================================================================
   Desk Setup Essentials — article.
   Eight numbered items, each with paragraphs, an optional store link and a
   photo. The last one shows three interior shots instead.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      typeLabel: 'Статья',
      buyLabel: 'Где купить',
      title: 'Атрибуты рабочего стола',
      meta: [{ label: 'Год', value: '2025' }, { label: 'Чтение', value: '6 минут' }],
      lead: 'У меня большой опыт работы как удалённо, так и в гибридном формате, и в обоих случаях комфорт сильно зависит от рабочего места. Поэтому хочу рассказать не только о базовых девайсах вроде ноутбука и монитора, но и о вещах, которые делают сам процесс приятнее.',
      items: [
        { name: 'MacBook Pro M3 Pro', paras: [
          'Не так давно я перешла с MacBook Air M2 13″ на MacBook Pro M3 Pro 14″. Air достойно отработал два года, но со временем мне стало не хватать мощности для одновременной работы в Figma, Photoshop, Illustrator и других тяжёлых приложениях.',
          'M3 Pro с этим справляется без проблем. В работе у меня практически всегда открыта Figma, а параллельно могут использоваться Photoshop, Premiere Pro, Screen Studio или Rive. Если работа не ограничивается одной Figma, запас мощности действительно чувствуется.'
        ] },
        { name: 'Huawei MateView 28″', paras: [
          'Это мой первый отдельный монитор, и выбор оказался удачным. Больше всего мне нравится формат 3:2 и разрешение 4K. Такой экран особенно удобен для монтажа: помещается и достаточно большой превью, и полноценный таймлайн.',
          'Монитор регулируется по высоте и углу наклона. Встроенными динамиками почти не пользуюсь — подключаю MacBook через Thunderbolt, поэтому звук обычно идёт с ноутбука.',
          'Из минусов: заметно нагревается стойка, нет возможности установить монитор на кронштейн, цветопередача немного отличается от MacBook, а частота обновления ограничена 60 Гц. Для моей работы это некритично, поэтому менять его пока не планирую.'
        ] },
        { name: 'Logitech MX Master 3S', paras: [
          'Долгое время я вообще не пользовалась мышью. После перехода на MacBook полностью привыкла к тачпаду, а Magic Mouse мне так и не подошла — рука и пальцы быстро уставали.',
          'После появления большого монитора мышь всё-таки понадобилась, и мне подарили Logitech MX Master 3S. Сначала я отнеслась к ней скептически, но возможность настроить кнопки под себя полностью изменила впечатление.',
          'Причём настройки можно задавать отдельно для разных приложений: например, один набор действий для Arc, другой — для Figma. В итоге мышь оказалась действительно удобной и эргономичной, и сейчас возвращаться к обычной я уже не хочу.'
        ] },
        { name: 'Magic Keyboard', paras: [
          'С механическими клавиатурами у меня отношения так и не сложились. Особенно неудобно работать с ними с длинными ногтями.',
          'Некоторое время у меня была Logitech K380, но после клавиатуры MacBook она ощущалась непривычно: клавиши нажимались тяжелее, а расположение Cmd постоянно сбивало.',
          'В итоге я решила не экспериментировать и выбрала Magic Keyboard. Здесь всё максимально знакомо и предсказуемо.'
        ] },
        { name: 'Logitech Desk Mat', paras: [
          'Для стола хотелось найти максимально нейтральный коврик, поэтому остановилась на Logitech Desk Mat размером 70 × 30 см.',
          'Он легко чистится, нормально переносит стирку, а в повседневной жизни достаточно периодически протирать его влажной салфеткой. Единственное — сейчас я бы, возможно, выбрала вариант немного больше.'
        ] },
        { name: 'Подставка под ноутбук', paras: [
          'Одна из моих любимых вещей в сетапе. У подставки можно менять угол наклона, а механизм достаточно тугой, чтобы спокойно выдерживать тяжёлый MacBook Pro.',
          'Отдельно нравится дизайн и качество материалов. А ещё у неё поворотное основание с механическими щелчками — совершенно необязательная, но очень приятная деталь.'
        ] },
        { name: 'Xiaomi Mijia Display Hanging Lamp', paras: [
          'Я предпочитаю работать с локальным освещением, поэтому дополнительный свет над рабочей зоной для меня особенно важен.',
          'Для этого использую Xiaomi Mijia Display Hanging Lamp. Она крепится непосредственно на монитор и освещает стол, не создавая лишнего света перед глазами.',
          'С моим тонким Huawei крепление подходит не идеально, поэтому лампа скорее лежит на верхней грани монитора, чем плотно фиксируется.',
          'В комплекте есть отдельный беспроводной пульт в форме шайбы. Поворотом можно менять яркость, а нажатием с одновременным вращением — температуру света.'
        ] },
        { name: 'Интерьер', paras: [
          'Когда базовый сетап собран, остаются вещи, которые не влияют напрямую на производительность, но сильно меняют ощущение от рабочего места.',
          'Для дополнительного освещения я использую две лампы: закатную и напольную RGB. Обе управляются с телефона или пульта, а у напольной можно дополнительно настраивать световые сценарии и анимацию.',
          'Рядом стоят две картины. Одну из них я нарисовала сама, а вторая — постер с работой Анри Матисса. Такие детали помогают сделать рабочее место менее «офисным» и больше похожим на пространство, в котором действительно приятно проводить несколько часов каждый день.'
        ] }
      ]
    },
    en: {
      typeLabel: 'Article',
      buyLabel: 'Where to buy',
      title: 'Desk Setup Essentials',
      meta: [{ label: 'Year', value: '2025' }, { label: 'Read', value: '6 min' }],
      lead: 'I have plenty of experience working both remotely and in a hybrid format, and in both cases, my workspace has a huge impact on how comfortable the process feels. So I wanted to share not only the essential devices like my laptop and monitor, but also the smaller things that make the space more enjoyable to work in.',
      items: [
        { name: 'MacBook Pro M3 Pro', paras: [
          'Not long ago, I upgraded from a 13″ MacBook Air M2 to a 14″ MacBook Pro M3 Pro. The Air served me well for two years, but eventually I started needing more power when running Figma together with Photoshop, Illustrator, and other heavier apps.',
          'The M3 Pro handles this without any issues. Figma is almost always open, while Photoshop, Premiere Pro, Screen Studio, or Rive might be running alongside it. If your workflow goes beyond Figma alone, the extra performance definitely makes a difference.'
        ] },
        { name: 'Huawei MateView 28″', paras: [
          'This is the first external monitor I have ever owned, and it turned out to be a very good choice. My favorite part is the 3:2 aspect ratio combined with 4K resolution.',
          'It is especially convenient for video editing, since there is enough space for both a large preview and a full timeline. The height and vertical angle can also be adjusted.',
          'I barely use the built-in speakers because my MacBook is connected through Thunderbolt, so the audio usually comes directly from the laptop.',
          'There are a few downsides: the stand gets noticeably warm, there is no VESA mount support, the colors look slightly different compared to the MacBook display, and the refresh rate is limited to 60 Hz. None of these are major issues for my workflow, so I am not planning to replace it anytime soon.'
        ] },
        { name: 'Logitech MX Master 3S', paras: [
          'For a long time, I did not use a mouse at all. After switching to a MacBook, I got completely used to working with the trackpad, while the Magic Mouse never really worked for me because my hand and fingers would get tired quickly.',
          'Once I added an external monitor to my setup, I finally needed a mouse again, and I was gifted a Logitech MX Master 3S.',
          'At first, I was skeptical, but being able to customize every button completely changed my opinion. You can even create different setups for different apps — one set of shortcuts for Arc, another for Figma.',
          'It turned out to be genuinely comfortable and ergonomic, and at this point I have no intention of switching back to a regular mouse.'
        ] },
        { name: 'Magic Keyboard', paras: [
          'I never really got into mechanical keyboards, especially since they are not particularly convenient with long nails.',
          'I used to have a Logitech K380, but after getting used to Apple keyboards, it felt unfamiliar: the keys required more pressure, and the Cmd key placement kept throwing me off.',
          'Eventually, I stopped experimenting and went with the Magic Keyboard. It feels familiar, predictable, and works perfectly for what I need.'
        ] },
        { name: 'Logitech Desk Mat', paras: [
          'I wanted something neutral for the desk, so I chose the Logitech Desk Mat in the 70 × 30 cm size.',
          'It is easy to maintain, survives washing well, and for everyday cleaning I usually just wipe it down with a damp cloth. The only thing I would change now is the size — I would probably go for something slightly larger.'
        ] },
        { name: 'Laptop Stand', paras: [
          'This is one of my favorite parts of the setup. The angle is fully adjustable, and the mechanism is stiff enough to comfortably support a heavier MacBook Pro.',
          'I also really like the design and the quality of the materials. The rotating base makes mechanical clicking sounds when you move it — completely unnecessary, but very satisfying.'
        ] },
        { name: 'Xiaomi Mijia Display Hanging Lamp', paras: [
          'I prefer working with local lighting, so having an additional light source directly above the desk is especially useful for me.',
          'I use the Xiaomi Mijia Display Hanging Lamp, which sits on top of the monitor and lights up the desk without shining directly into my eyes.',
          'The mount is not ideal for my thin Huawei monitor, so the lamp rests on top rather than being firmly attached.',
          'It also comes with a separate wireless dial. Rotating it adjusts the brightness, while pressing and rotating changes the color temperature.'
        ] },
        { name: 'Interior Details', paras: [
          'Once the essential setup is complete, there are also things that do not directly affect productivity but completely change how the workspace feels.',
          'For ambient lighting, I use two lamps: a sunset lamp and an RGB floor lamp. Both can be controlled through a phone or remote, and the floor lamp also supports different lighting scenes and animations.',
          'I also have two artworks near the desk. One was painted by me, while the other is a poster featuring a Henri Matisse painting. Small details like these make the setup feel less like an office and more like a space where I actually enjoy spending several hours every day.'
        ] }
      ]
    }
  };

  // Store links, in item order. Empty means no link for that item.
  var BUY_LINKS = [
    '',
    'https://megamarket.ru/catalog/details/monitor-huawei-mateview-28-100028661902_7/',
    'https://www.logitech.com/en-us/shop/p/mx-master-3s.910-006557',
    'https://www.apple.com/shop/product/mxcl3ll/a/magic-keyboard-usb-c-us-english',
    'https://megamarket.ru/catalog/details/kovrik-dlya-myshi-logitech-desk-mat-studio-series-mid-grey-956-000052-100030078195/',
    'https://ozon.kz/product/podstavka-dlya-noutbuka-metallicheskaya-reguliruemaya-skladnaya-nastolnaya-derzhatel-dlya-noutbuka-786609592/',
    'https://mi.com.kz/svetodiodnaya_lampa_dlya_monitora_xiaomi_mi_computer_monitor_light_bar.html',
    ''
  ];

  // Product photos, in item order. The last item uses INTERIOR instead.
  var PHOTOS = [
    'assets/desk-1.png',
    'assets/desk-2.png',
    'assets/desk-3.png',
    'assets/desk-4.png',
    'assets/desk-5.png',
    'assets/desk-6.png',
    'assets/desk-7.png',
    ''
  ];

  var INTERIOR = ['assets/desk-interior-1.png', 'assets/desk-interior-2.png', 'assets/desk-interior-3.png'];
  var INTERIOR_INDEX = 7;

  var content = document.querySelector('[data-content]');

  function buildItem(item, i, buyLabel) {
    var wrap = el('div', 'desk-item');

    var head = el('div', 'desk-head');
    var num = el('span', 'desk-num');
    num.textContent = '#' + (i + 1);
    var name = el('h2', 'desk-name');
    name.textContent = item.name;
    head.appendChild(num);
    head.appendChild(name);
    wrap.appendChild(head);

    item.paras.forEach(function (text) {
      var p = el('p', 'desk-para');
      p.textContent = text;
      wrap.appendChild(p);
    });

    if (BUY_LINKS[i]) {
      var link = el('a', 'buy-link', { href: BUY_LINKS[i], target: '_blank', rel: 'noopener' });
      link.textContent = buyLabel;
      wrap.appendChild(link);
    }

    if (i === INTERIOR_INDEX) {
      var row = el('div', 'desk-triple');
      INTERIOR.forEach(function (src) {
        var cell = el('div', 'desk-photo');
        cell.style.width = '100%';
        cell.style.backgroundImage = 'url("' + src + '")';
        row.appendChild(cell);
      });
      wrap.appendChild(row);
    } else if (PHOTOS[i]) {
      var photo = el('div', 'desk-photo');
      photo.style.backgroundImage = 'url("' + PHOTOS[i] + '")';
      wrap.appendChild(photo);
    }

    return wrap;
  }

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    content.appendChild(ui.hero('assets/desk-hero.png'));
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(ui.metaGrid(t.meta, 'cols-2'));
    content.appendChild(ui.lead(t.lead, 'is-wide'));

    t.items.forEach(function (item, i) {
      content.appendChild(buildItem(item, i, t.buyLabel));
    });
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
