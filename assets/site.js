// BPSA – gemeinsames Skript für die deutsche und die englische Startseite.
// Die Texte stehen hier je Sprache; welche gilt, sagt <html lang>.
(function () {
  var TEXT = {
    de: {
      over: "Vorbei – der nächste Termin folgt", live: "Läuft gerade",
      today: "Heute", tomorrow: "Morgen", inDays: function (n) { return "In " + n + " Tagen"; },
      toLight: "Helles Design", toDark: "Dunkles Design",
      name: "Wie dürfen wir dich nennen?",
      email: "Bitte eine E-Mail-Adresse, unter der wir antworten können.",
      message: "Schreib uns kurz, worum es geht.",
      subject: "BPSA Kontakt: ", sending: "Wird gesendet …",
      sent: "Danke! Deine Nachricht ist angekommen, wir melden uns.",
      failed: 'Das hat leider nicht geklappt. Schreib uns gern direkt an <a href="mailto:bpsa@psng.info">bpsa@psng.info</a>.',
      event: "kontakt-gesendet"
    },
    en: {
      over: "This talk has ended – next date coming soon", live: "Happening now",
      today: "Today", tomorrow: "Tomorrow", inDays: function (n) { return "In " + n + " days"; },
      toLight: "Light theme", toDark: "Dark theme",
      name: "What should we call you?",
      email: "Please enter an email address we can reply to.",
      message: "Tell us briefly what it’s about.",
      subject: "BPSA Kontakt (EN): ", sending: "Sending…",
      sent: "Thanks! We got your message and will get back to you.",
      failed: 'Sorry, that didn’t work. Feel free to email us directly at <a href="mailto:bpsa@psng.info">bpsa@psng.info</a>.',
      event: "en-kontakt-gesendet"
    }
  };
  var T = TEXT[document.documentElement.lang] || TEXT.de;

  // Hell oder dunkel: Ohne Wahl gilt das Gerät. Wer umschaltet, behält
  // die Wahl – sofern der Browser speichern lässt.
  (function () {
    var button = document.querySelector(".theme-toggle");
    if (!button) return;
    var root = document.documentElement;
    var media = window.matchMedia("(prefers-color-scheme: light)");
    var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    function current() { return root.dataset.theme || (media.matches ? "light" : "dark"); }
    function paint() {
      var light = current() === "light";
      button.innerHTML = light ? MOON : SUN;
      button.setAttribute("aria-label", light ? T.toDark : T.toLight);
      button.title = button.getAttribute("aria-label");
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = light ? "#f6f7fa" : "#0a0f2e";
    }
    button.hidden = false;
    button.addEventListener("click", function () {
      var next = current() === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try { localStorage.setItem("bpsa-theme", next); } catch (e) {}
      paint();
    });
    if (media.addEventListener) media.addEventListener("change", paint);
    paint();
  })();

  // Erst der Klick holt den Player – und damit erst der Klick Google.
  // Ohne data-embed (Aufzeichnung noch nicht online) bleibt es beim Standbild.
  document.querySelectorAll(".facade").forEach(function (facade) {
    facade.addEventListener("click", function () {
      if (!facade.dataset.embed) return;
      var frame = document.createElement("iframe");
      frame.src = facade.dataset.embed;
      // Der Player-Titel steht am Knopf, in der Sprache der Seite.
      frame.title = facade.dataset.title;
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      frame.allowFullscreen = true;
      facade.replaceWith(frame);
    });
  });

  // "in 14 Tagen" statt nur eines Datums: Wie weit weg etwas ist, rechnet
  // niemand gern im Kopf. Gezählt wird in Berliner Kalendertagen.
  (function () {
    var label = document.querySelector("[data-countdown]");
    if (!label) return;
    var now = new Date();
    var today = Date.parse(new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(now));
    var target = Date.parse(label.dataset.countdown.slice(0, 10));
    var days = Math.round((target - today) / 864e5);
    var nowWall = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin", dateStyle: "short", timeStyle: "short" })
      .format(now).replace(" ", "T");
    if (nowWall >= label.dataset.until) label.textContent = T.over;
    else if (nowWall >= label.dataset.countdown) label.textContent = T.live;
    else if (days === 0) label.textContent = T.today;
    else if (days === 1) label.textContent = T.tomorrow;
    else if (days > 1) label.textContent = T.inDays(days);
  })();

  // Termin in den eigenen Kalender: Google kennt eine Adresse dafür, Apple
  // und alle anderen nehmen eine ICS-Datei. Die Zeiten stehen als Ortszeit im
  // HTML und werden hier nach UTC gerechnet – Intl kennt die Umstellungs-
  // termine, ein fest verdrahtetes "+02:00" wäre im Winter falsch.
  (function () {
    var ZONE = "Europe/Berlin";

    function zoneOffset(ms) {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: ZONE, hour12: false, year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      }).formatToParts(new Date(ms));
      var v = function (type) {
        var p = parts.find(function (x) { return x.type === type; });
        return Number(p ? p.value : 0);
      };
      return Date.UTC(v("year"), v("month") - 1, v("day"), v("hour") % 24, v("minute"), v("second")) - ms;
    }

    function stamp(dateIso, time) {
      var d = dateIso.split("-").map(Number), t = time.split(":").map(Number);
      var wall = Date.UTC(d[0], d[1] - 1, d[2], t[0], t[1]);
      var ms = wall - zoneOffset(wall - zoneOffset(wall));
      return new Date(ms).toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
    }

    function escape(value) {
      return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
    }

    // RFC 5545: höchstens 75 Oktette je Zeile, Fortsetzung mit einem Leerzeichen.
    function fold(line) {
      var out = [], current = "", bytes = 0;
      for (var i = 0; i < line.length; i++) {
        var size = new Blob([line[i]]).size;
        if (bytes + size > 74) { out.push(current); current = ""; bytes = 1; }
        current += line[i];
        bytes += size;
      }
      out.push(current);
      return out.join("\r\n ");
    }

    function read(button) {
      var d = button.dataset;
      return {
        title: d.title, date: d.date, start: d.start, end: d.end,
        location: d.location, text: d.description + "\n\n" + d.url, url: d.url
      };
    }

    function googleUrl(e) {
      var q = new URLSearchParams({
        action: "TEMPLATE", text: e.title,
        dates: stamp(e.date, e.start) + "/" + stamp(e.date, e.end),
        details: e.text, location: e.location
      });
      return "https://calendar.google.com/calendar/render?" + q.toString();
    }

    function ics(e) {
      var lines = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//BPSA//bpsa.psng.info//DE",
        "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "BEGIN:VEVENT",
        "UID:talk-" + e.date + "@bpsa.psng.info",
        "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z",
        "DTSTART:" + stamp(e.date, e.start), "DTEND:" + stamp(e.date, e.end),
        "SUMMARY:" + escape(e.title), "DESCRIPTION:" + escape(e.text),
        "LOCATION:" + escape(e.location), "URL:" + e.url,
        "END:VEVENT", "END:VCALENDAR"
      ];
      return lines.map(fold).join("\r\n") + "\r\n";
    }

    function download(e) {
      var blob = new Blob([ics(e)], { type: "text/calendar;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "bpsa-talk-" + e.date + ".ics";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    document.querySelectorAll(".cal").forEach(function (cal) {
      var button = cal.querySelector(".cal-toggle");
      var menu = cal.querySelector(".cal-menu");
      var event = read(button);

      function close() { menu.hidden = true; button.setAttribute("aria-expanded", "false"); }

      button.addEventListener("click", function () {
        if (!menu.hidden) { close(); return; }
        menu.querySelector("[data-cal=google]").href = googleUrl(event);
        menu.hidden = false;
        button.setAttribute("aria-expanded", "true");
        menu.querySelector("[role=menuitem]").focus();
      });

      menu.querySelectorAll("[data-cal=ics]").forEach(function (item) {
        item.addEventListener("click", function () { download(event); close(); button.focus(); });
      });
      menu.querySelector("[data-cal=google]").addEventListener("click", close);

      document.addEventListener("pointerdown", function (e) {
        if (!menu.hidden && !cal.contains(e.target)) close();
      });
      cal.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !menu.hidden) { close(); button.focus(); }
        // Pfeiltasten wandern durch die Einträge, wie man es von Menüs kennt.
        if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !menu.hidden) {
          e.preventDefault();
          var items = [].slice.call(menu.querySelectorAll("[role=menuitem]"));
          var i = items.indexOf(document.activeElement);
          items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length].focus();
        }
      });
    });
  })();

  // Bild groß: ein <dialog> übernimmt Hintergrund, Escape und Fokusfalle,
  // hier bleiben Gruppen und Blättern. Jede Gruppe (die Fotos eines Abends,
  // samt Plakat) blättert nur in sich selbst – auch durch die Fotos, die
  // hinter der "+6"-Kachel versteckt sind.
  (function () {
    var box = document.querySelector(".lightbox");
    if (!box || !box.showModal) return;
    var view = box.querySelector("img");
    var prev = box.querySelector(".lb-prev");
    var next = box.querySelector(".lb-next");
    var count = box.querySelector(".lb-count");
    var group = [];
    var at = 0;
    var opener = null;

    function show(index) {
      at = (index + group.length) % group.length;
      var source = group[at].querySelector("img");
      // src ist immer das große Foto; im Raster lädt der Browser die kleine Fassung aus srcset.
      view.src = source.src;
      view.alt = source.alt;
      count.textContent = (at + 1) + " / " + group.length;
    }

    document.querySelectorAll(".shot").forEach(function (shot) {
      shot.addEventListener("click", function () {
        var holder = shot.closest("[data-gallery]") || shot.parentElement;
        group = [].slice.call(holder.querySelectorAll(".shot"));
        var alone = group.length < 2;
        prev.hidden = alone;
        next.hidden = alone;
        count.hidden = alone;
        opener = shot;
        show(group.indexOf(shot));
        box.showModal();
        // Sonst scrollt die Seite unter dem Bild weiter, vor allem auf iOS.
        document.documentElement.style.overflow = "hidden";
      });
    });

    prev.addEventListener("click", function () { show(at - 1); });
    next.addEventListener("click", function () { show(at + 1); });
    box.querySelector(".lb-close").addEventListener("click", function () { box.close(); });
    box.addEventListener("keydown", function (e) {
      if (group.length < 2) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); show(at - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); show(at + 1); }
    });
    // Am Telefon wischt man statt zu tippen.
    var touchX = null;
    box.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (touchX === null || group.length < 2) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) show(at + (dx < 0 ? 1 : -1));
    });
    // Klick neben das Bild schließt.
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("lb-stage")) box.close();
    });
    // Beim Schließen zurück zur Kachel, von der man kam (nicht zu einem
    // versteckten Foto), und die Quelle freigeben.
    box.addEventListener("close", function () {
      document.documentElement.style.overflow = "";
      if (opener) opener.focus();
      view.removeAttribute("src");
    });
  })();

  // Sprachwechsel bleibt im selben Abschnitt: Beide Seiten haben dieselben IDs.
  document.querySelectorAll("a[hreflang]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (location.hash) link.href = link.href.split("#")[0] + location.hash;
    });
  });

  // Kontaktformular: abschicken ohne die Seite zu verlassen. Ohne JavaScript
  // geht das Formular ganz normal an Formspree und prüft der Browser selbst.
  (function () {
    var form = document.querySelector(".contact-form");
    if (!form || !window.fetch) return;
    form.noValidate = true;
    var status = form.querySelector(".status");
    var button = form.querySelector("[type=submit]");
    var topic = form.querySelector("[name=betreff]");
    var subject = form.querySelector("[name=_subject]");

    // Links mit data-betreff (etwa die Rollen unter "Mitmachen") wählen das Thema vor.
    document.querySelectorAll("[data-betreff]").forEach(function (link) {
      link.addEventListener("click", function () { topic.value = link.dataset.betreff; });
    });

    // Die Meldung steht unter dem Feld und verschwindet, sobald es passt –
    // nicht erst beim nächsten Absenden.
    function check(field) {
      var error = document.getElementById(field.getAttribute("aria-describedby"));
      var ok = field.checkValidity();
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      error.textContent = ok ? "" : T[field.name];
      return ok;
    }
    var fields = [].slice.call(form.querySelectorAll("[aria-describedby]"));
    fields.forEach(function (field) {
      field.addEventListener("input", function () {
        if (field.getAttribute("aria-invalid") === "true") check(field);
      });
      field.addEventListener("blur", function () { if (field.value) check(field); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = fields.filter(function (field) { return !check(field); });
      if (bad.length) { bad[0].focus(); return; }
      subject.value = T.subject + topic.value;
      button.disabled = true;
      status.className = "status wide";
      status.textContent = T.sending;
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.reset();
          status.className = "status wide ok";
          status.textContent = T.sent;
          // Zählt nur, dass etwas ankam – nicht was oder von wem.
          if (window.goatcounter && window.goatcounter.count) {
            window.goatcounter.count({ path: T.event, event: true });
          }
        })
        .catch(function () {
          status.className = "status wide err";
          status.innerHTML = T.failed;
        })
        .then(function () { button.disabled = false; });
    });
  })();
})();
