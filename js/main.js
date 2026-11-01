/* Настройки сайта - здесь можно менять контакты, не трогая остальной код */
var SITE = {
  maxLink: "https://max.ru/",        // ВСТАВЬТЕ ссылку на профиль в MAX: Настройки MAX -> Профиль -> Поделиться ссылкой (вид https://max.ru/u/...)
  phone: "+79650514787",
  email: "Sofya.ternikova@yandex.ru",
  sendUrl: "send.php"                 // серверный обработчик формы (нужен PHP-хостинг). На хостинге без PHP форма откроет почтовую программу с готовым письмом
};

(function () {
  // подставляем ссылку на MAX во все кнопки
  document.querySelectorAll("[data-max]").forEach(function (a) { a.href = SITE.maxLink; });

  // мобильное меню
  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () { menu.classList.toggle("open"); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { menu.classList.remove("open"); }); });
  }

  // маска телефона +7
  var phone = document.getElementById("phone");
  if (phone) {
    phone.addEventListener("input", function () {
      var d = phone.value.replace(/\D/g, "");
      if (d[0] === "8") d = "7" + d.slice(1);
      if (d[0] !== "7") d = "7" + d;
      d = d.slice(0, 11);
      var r = "+7";
      if (d.length > 1) r += " (" + d.slice(1, 4);
      if (d.length >= 4) r += ") " + d.slice(4, 7);
      if (d.length >= 7) r += "-" + d.slice(7, 9);
      if (d.length >= 9) r += "-" + d.slice(9, 11);
      phone.value = r;
    });
  }

  // форма
  var form = document.getElementById("form");
  if (!form) return;
  var err = document.getElementById("err"), ok = document.getElementById("ok");
  function fail(t) { err.textContent = t; err.style.display = "block"; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    err.style.display = "none";
    var name = form.name.value.trim(), ph = form.phone.value.replace(/\D/g, ""), msg = form.msg.value.trim();
    if (name.length < 2) return fail("Укажите имя.");
    if (ph.length !== 11) return fail("Укажите телефон полностью.");
    if (!form.agree.checked) return fail("Для отправки заявки нужно согласие на обработку персональных данных.");

    var btn = form.querySelector("button"); btn.disabled = true; btn.textContent = "Отправляю...";
    var payload = { name: name, phone: form.phone.value, msg: msg, agree: "1", page: location.href, ts: new Date().toISOString() };

    function done() {
      form.querySelectorAll(".field, .check, button").forEach(function (el) { el.style.display = "none"; });
      ok.style.display = "block";
    }
    function fallback() {
      // хостинг без PHP: открываем почтовую программу с готовым письмом
      var text = "Имя: " + name + "\nТелефон: " + form.phone.value + (msg ? "\nВопрос: " + msg : "") + "\nСогласие на обработку ПДн: да, " + new Date().toLocaleString("ru-RU");
      location.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Заявка с сайта") + "&body=" + encodeURIComponent(text);
      done();
    }

    fetch(SITE.sendUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (j) { if (j && j.ok) done(); else fallback(); })
      .catch(fallback)
      .finally(function () { btn.disabled = false; btn.textContent = "Отправить заявку"; });
  });
})();
