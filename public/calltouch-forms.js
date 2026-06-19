/* ============================================================================
   Calltouch — отслеживание форм и кнопок «Получить предложение»
   Сайт: kurs-gsi.ru
   ----------------------------------------------------------------------------
   Что делает:
   1. Перехватывает отправку формы обратной связи Bitrix24 через ОФИЦИАЛЬНОЕ
      событие «b24:form:submit» и шлёт заявку ТОЛЬКО если сам Битрикс пометил
      форму как валидную (form.validated === true).
   2. Собирает имя / телефон / email из полей формы (LEAD_*/CONTACT_*).
   3. Для кнопок «Получить предложение» определяет продукт по URL и кладёт
      его название в subject/comment.
   4. Подтягивает sessionId Calltouch и utm-метки из URL.
   5. Отправляет заявку в Calltouch REST API (чистый fetch, без jQuery).
   6. Логирует каждый шаг в консоль для отладки.

   ПОЧЕМУ b24:form:submit, а не DOM-событие submit:
   Раньше скрипт слушал родное событие «submit» и сам угадывал валидность
   (длина телефона, regex email). Наша эвристика ≠ валидация Битрикса, поэтому
   заявка могла улетать на каждый клик по кнопке, даже когда форма невалидна, —
   отсюда дубли. Событие b24:form:submit + флаг form.validated дают точный
   ответ самого Битрикса, поэтому заявка уходит ровно один раз и только когда
   форма реально прошла валидацию.

   Работает в SPA (React): слушатели висят на window/document (делегирование),
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
    var digits = String(raw).replace(/\D/g, '');
    if (digits.length === 11 && digits.charAt(0) === '8') digits = '7' + digits.slice(1);
    return digits;
  }

  /* ---- Чтение полей формы Bitrix24 (form.getFields()) ---------------------
     В формах Б24 значение поля — это функция: el.value() возвращает строку.
     Имена полей стандартные: LEAD_*/CONTACT_*/DEAL_*. */
  function readB24Form(form) {
    var data = { fio: '', phoneNumber: '', email: '', comment: '' };
    if (typeof form.getFields !== 'function') return data;

    form.getFields().forEach(function (el) {
      var name = el.name;
      var value = (typeof el.value === 'function') ? el.value() : el.value;
      value = (value == null ? '' : String(value)).trim();
      if (!value) return;

      if (name === 'LEAD_NAME' || name === 'CONTACT_NAME') {
        data.fio = value;
      } else if (name === 'LEAD_PHONE' || name === 'CONTACT_PHONE') {
        data.phoneNumber = normalizePhone(value);
      } else if (name === 'LEAD_EMAIL' || name === 'CONTACT_EMAIL') {
        data.email = value;
      } else if (name === 'LEAD_COMMENTS' || name === 'DEAL_COMMENTS' || name === 'CONTACT_COMMENTS') {
        data.comment = value;
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

  /* ---- Отправка формы Bitrix24 (официальное событие) ----------------------
     b24:form:submit срабатывает при сабмите формы Б24. event.detail.object —
     объект формы с флагом .validated и методами .getFields()/.title.
     Шлём в Calltouch ТОЛЬКО при form.validated === true → нет дублей и нет
     заявок при невалидной форме. */
  window.addEventListener('b24:form:submit', function (e) {
    var form = e.detail && e.detail.object;
    if (!form) {
      console.warn(LOG, 'b24:form:submit без объекта формы — пропускаю.', e);
      return;
    }

    if (!form.validated) {
      console.log(LOG, 'Форма Б24 не прошла валидацию — заявку не шлём.');
      return;
    }

    var data = readB24Form(form);

    if (!data.phoneNumber && !data.email) {
      console.log(LOG, 'В валидной форме нет телефона/email — пропускаю.', data);
      return;
    }

    if (productInterest) {
      data.subject = 'Получить предложение: ' + productInterest;
      if (!data.comment) data.comment = data.subject;
      productInterest = ''; // сбрасываем после использования
    } else {
      data.subject = form.title || ('Форма обратной связи (' + location.hostname + ')');
      if (!data.comment) data.comment = data.subject;
    }

    sendToCalltouch(data);
  });

  console.log(LOG, 'Скрипт отслеживания форм инициализирован (b24:form:submit).');
})();
