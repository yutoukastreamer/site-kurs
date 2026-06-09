/* ============================================================================
   Calltouch — отслеживание форм и кнопок «Получить предложение»
   Сайт: kurs-gsi.ru
   ----------------------------------------------------------------------------
   Что делает:
   1. Перехватывает отправку формы обратной связи (Bitrix24) и кнопки
      «Получить предложение» по всему сайту.
   2. Собирает имя / телефон / email из полей формы.
   3. Для кнопок «Получить предложение» определяет продукт по URL и кладёт
      его название в subject/comment.
   4. Подтягивает sessionId Calltouch и utm-метки из URL.
   5. Отправляет заявку в Calltouch REST API (чистый fetch, без jQuery).
   6. Логирует каждый шаг в консоль для отладки.

   Работает в SPA (React): слушатели висят на document (делегирование),
   поэтому переживают перерисовку и переходы между страницами.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Настройки (уже подставлены ваши ID) -------------------------------- */
  var MOD_ID  = '4xv0727u'; // идентификатор скрипта Calltouch (mod_id)
  var SITE_ID = '82582';    // ID личного кабинета Calltouch (site_id)
  var API_URL = 'https://api.calltouch.ru/calls-service/RestAPI/requests/' + SITE_ID + '/register/';
  var LOG = '[Calltouch]';

  /* Соответствие URL → название продукта (для кнопок «Получить предложение») */
  var PRODUCTS = {
    '/bulldozer': 'Безмачтовая 3D система нивелирования (Бульдозер)',
    '/excavator': 'Индикаторная 3D система нивелирования (Экскаватор)',
    '/grader':    'Двухмачтовая 3D система нивелирования (Грейдер)',
  };

  /* Запоминаем последний интерес по продукту (клик «Получить предложение»),
     чтобы передать его при отправке формы. */
  var productInterest = '';

  /* ---- UTM-метки из URL ---------------------------------------------------- */
  function getUtm() {
    var params = new URLSearchParams(location.search);
    var utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
      var value = params.get(key);
      if (value) utm[key] = value;
    });
    return utm;
  }

  /* ---- sessionId от Calltouch --------------------------------------------- */
  function getSessionId() {
    try {
      if (typeof window.ct === 'function') {
        var p = window.ct('calltracking_params', MOD_ID);
        if (p && p.sessionId) return p.sessionId;
      }
      console.warn(LOG, 'sessionId недоступен (скрипт Calltouch ещё не загрузился?).');
    } catch (e) {
      console.warn(LOG, 'ошибка получения sessionId:', e);
    }
    return null;
  }

  /* ---- Нормализация телефона к виду 79000000000 --------------------------- */
  function normalizePhone(raw) {
    if (!raw) return '';
    var digits = raw.replace(/\D/g, '');
    if (digits.length === 11 && digits.charAt(0) === '8') digits = '7' + digits.slice(1);
    return digits;
  }

  /* ---- Чтение полей формы (эвристика по type / name / placeholder) -------- */
  function scrapeForm(form) {
    var data = { fio: '', phoneNumber: '', email: '' };
    var fields = form.querySelectorAll('input, textarea');

    fields.forEach(function (el) {
      var type = (el.type || '').toLowerCase();
      var hint = ((el.name || '') + ' ' + (el.placeholder || '') + ' ' + (el.getAttribute('autocomplete') || '')).toLowerCase();
      var value = (el.value || '').trim();
      if (!value || type === 'hidden' || type === 'submit' || type === 'checkbox') return;

      if (type === 'email' || /mail|почт|email/.test(hint)) {
        data.email = value;
      } else if (type === 'tel' || /phone|tel|телефон|\bтел\b/.test(hint)) {
        data.phoneNumber = normalizePhone(value);
      } else if (/name|fio|имя|фио|контакт/.test(hint) || (type === 'text' && !data.fio)) {
        data.fio = value;
      }
    });

    return data;
  }

  /* ---- Отправка заявки в Calltouch ---------------------------------------- */
  function sendToCalltouch(data) {
    var sessionId = getSessionId();

    var body = new URLSearchParams();
    body.set('sessionId', sessionId || '');
    body.set('requestUrl', location.href);
    if (document.referrer) body.set('requestUrlReferer', document.referrer);
    if (data.fio)         body.set('fio', data.fio);
    if (data.phoneNumber) body.set('phoneNumber', data.phoneNumber);
    if (data.email)       body.set('email', data.email);
    if (data.subject)     body.set('subject', data.subject);
    if (data.comment)     body.set('comment', data.comment);

    var utm = getUtm();
    Object.keys(utm).forEach(function (key) { body.set(key, utm[key]); });

    console.log(LOG, 'Отправляю заявку:', Object.fromEntries(body.entries()));

    if (!sessionId) {
      console.warn(LOG, 'sessionId пуст — заявка может быть отклонена антифродом Calltouch.');
    }

    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
      .then(function (res) {
        return res.json().catch(function () { return res.text(); });
      })
      .then(function (result) {
        console.log(LOG, '✅ Ответ API:', result);
        return result;
      })
      .catch(function (err) {
        console.error(LOG, '❌ Ошибка отправки:', err);
      });
  }

  /* ---- Клик по кнопке «Получить предложение» ------------------------------ */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button, [role="button"]');
    if (!el) return;

    var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (text === 'Получить предложение') {
      productInterest = PRODUCTS[location.pathname] || 'Заявка с главной страницы';
      console.log(LOG, 'Клик «Получить предложение». Продукт:', productInterest);
    }
  }, true);

  /* ---- Отправка любой формы на сайте (включая Bitrix24) ------------------- */
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    var data = scrapeForm(form);

    // Если нет ни телефона, ни email — это, скорее всего, чужая форма (поиск
    // и т.п.). Пропускаем, чтобы не слать пустые заявки.
    if (!data.phoneNumber && !data.email) {
      console.log(LOG, 'Форма без телефона и email — пропускаю.');
      return;
    }

    if (productInterest) {
      data.subject = 'Получить предложение: ' + productInterest;
      data.comment = data.subject;
      productInterest = ''; // сбрасываем после использования
    } else {
      data.subject = 'Форма обратной связи (kurs-gsi.ru)';
      data.comment = data.subject;
    }

    sendToCalltouch(data);
    // НЕ вызываем e.preventDefault() — даём Bitrix24 штатно обработать форму.
  }, true);

  console.log(LOG, 'Скрипт отслеживания форм инициализирован.');
})();
