// بيضيف: زر لوحة التحكم (للأدمن بس) + صندوق تأكيد تسجيل الخروج
// السطر ده موجود في آخر home.html :  <script src="home-admin.js"></script>
(function () {
  var ADMIN_EMAILS = ["yasser242006@gmail.com", "yousefeeldeeb@gmail.com"];
  var ADMIN_PAGE = "admin.html";

  function sessionEmail() {
    var stores = [window.localStorage, window.sessionStorage];
    for (var s = 0; s < stores.length; s++) {
      try {
        for (var i = 0; i < stores[s].length; i++) {
          var k = stores[s].key(i);
          if (/^sb-.*-auth-token$/.test(k)) {
            var v = JSON.parse(stores[s].getItem(k));
            var u = (v && v.user) || (v && v.currentSession && v.currentSession.user);
            if (u && u.email) return String(u.email).toLowerCase();
          }
        }
      } catch (e) {}
    }
    return "";
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  /* ---------- زر لوحة التحكم (للأدمن بس) ---------- */
  if (ADMIN_EMAILS.indexOf(sessionEmail()) !== -1) {
    var cols = document.querySelectorAll("#pageSettings .col");
    var col = cols[cols.length - 1];
    if (col && !document.getElementById("adminCard")) {
      var card = el("div", "set-card");
      card.id = "adminCard";
      card.appendChild(el("h2", "set-title", "الإدارة"));
      var b = el("button", "btn-primary", "لوحة التحكم");
      b.type = "button";
      b.addEventListener("click", function () { window.location.href = ADMIN_PAGE; });
      card.appendChild(b);
      col.insertBefore(card, col.lastElementChild);
    }
  }

  /* ---------- تأكيد تسجيل الخروج (لكل الطلبة) ---------- */
  var out = document.getElementById("logoutBtn");
  if (out) {
    out.addEventListener("click", function (ev) {
      if (out.dataset.ok === "1") { out.dataset.ok = ""; return; }
      ev.stopImmediatePropagation();
      ev.preventDefault();
      var box = document.getElementById("modalBox");
      var back = document.getElementById("modal");
      box.innerHTML = "";
      box.appendChild(el("h2", null, "تسجيل الخروج"));
      box.appendChild(el("p", "sub", "متأكد إنك عايز تسجّل خروج؟"));
      var acts = el("div", "actions");
      var yes = el("button", "btn-danger", "تأكيد");
      var no = el("button", "btn-ghost", "إلغاء");
      yes.type = no.type = "button";
      no.addEventListener("click", function () { back.hidden = true; });
      yes.addEventListener("click", function () { back.hidden = true; out.dataset.ok = "1"; out.click(); });
      acts.appendChild(yes);
      acts.appendChild(no);
      box.appendChild(acts);
      back.hidden = false;
    }, true);
  }
})();
