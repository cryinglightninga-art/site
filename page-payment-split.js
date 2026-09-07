/* ============================================================================
   Online payment splitting flow — project case study.
   Two screen recordings, each with a shimmer placeholder while it loads and a
   fallback label if it never arrives.
   ========================================================================== */

(function () {
  'use strict';

  var el = PF.el;
  var ui = PF.ui;

  var COPY = {
    ru: {
      typeLabel: 'Проект',
      title: 'Флоу разделения онлайн-оплаты',
      meta: [
        { label: 'Роль', value: 'Product Designer' },
        { label: 'Год', value: '2023' },
        { label: 'Команда', value: 'Концептуальный проект' },
        { label: 'Задача', value: 'Разделить счёт после оплаты' }
      ],
      failedLabel: 'не загрузилось',
      contextLabel: 'Вводные',
      contextText: 'Анна оплатила общий счёт за компанию из трёх человек. После оплаты чек автоматически загружается из ФНС, поэтому в приложении можно увидеть все позиции и распределить оплату между участниками.',
      designLabel: 'Дизайн',
      designEqual: 'В сценарии «Поровну» Анна выбирает участников, после чего система автоматически делит итоговую сумму на троих. В расчёте отображается список позиций, их стоимость и сумма к оплате для каждого участника. После подтверждения Андрей получает уведомление с запросом на оплату от Анны.',
      designManual: 'В сценарии «Вручную» Анна сама распределяет позиции между участниками. Это можно сделать двумя способами: по участникам — выбрать, какие позиции оплачивает каждый человек, или по позициям — добавить к каждой позиции тех, кто участвовал в покупке. После подтверждения участникам отправляются запросы на оплату.'
    },
    en: {
      typeLabel: 'Project',
      title: 'Online payment splitting flow',
      meta: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Year', value: '2023' },
        { label: 'Team', value: 'Concept project' },
        { label: 'Task', value: 'Split a bill after payment' }
      ],
      failedLabel: 'failed to load',
      contextLabel: 'Context',
      contextText: 'Anna paid the full bill for a group of three. After payment, the receipt is automatically loaded from the tax service, so all purchased items can be viewed in the app and split between participants.',
      designLabel: 'Design',
      designEqual: 'In the “Equal split” scenario, Anna selects participants, and the system automatically divides the total amount between three people. The calculation shows the list of items, their prices, and the amount each participant needs to pay. After confirmation, Andrey receives a payment request from Anna.',
      designManual: 'In the “Manual split” scenario, Anna distributes items between participants herself. This can be done in two ways: by participants — selecting which items each person pays for, or by items — adding people to each purchased item. After confirmation, payment requests are sent to the participants.'
    }
  };

  // Hosted with the design; swap for local files if the links ever expire.
  var CLIPS = [
    'https://dl.dropboxusercontent.com/scl/fi/7wwfdntm5xk6g1bs26ikw/01.mp4?rlkey=nis0pjlkwtv9ge84mvq44hi1r&st=7r5yj8rq&dl=0',
    'https://dl.dropboxusercontent.com/scl/fi/frctrbi7l5a8otn0cwaw7/02.mp4?rlkey=hjqm04zjmp67z7fnd3jiapmm7&st=auznhm69&dl=0'
  ];

  var content = document.querySelector('[data-content]');

  function buildClip(src, failedLabel) {
    var wrap = el('div', 'clip-wrap');

    var skeleton = el('div', 'skeleton');
    wrap.appendChild(skeleton);

    var failed = el('div', 'failed-label');
    failed.textContent = failedLabel;
    failed.hidden = true;
    wrap.appendChild(failed);

    var video = el('video', 'clip', {
      autoplay: '', loop: '', muted: '', playsinline: '', src: src
    });
    video.addEventListener('loadeddata', function () { skeleton.remove(); });
    video.addEventListener('error', function () {
      skeleton.remove();
      failed.hidden = false;
    });
    wrap.appendChild(ui.autoplay(video));

    return wrap;
  }

  function render() {
    var t = PF.localize(COPY);

    content.textContent = '';
    content.appendChild(ui.hero('assets/payment-hero.png'));
    content.appendChild(ui.badge(t.typeLabel));
    content.appendChild(ui.title(t.title));
    content.appendChild(ui.metaGrid(t.meta));

    content.appendChild(ui.block(t.contextLabel, t.contextText));
    content.appendChild(ui.block(t.designLabel, t.designEqual));
    content.appendChild(buildClip(CLIPS[0], t.failedLabel));

    content.appendChild(ui.block(null, t.designManual));
    content.appendChild(buildClip(CLIPS[1], t.failedLabel));
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
