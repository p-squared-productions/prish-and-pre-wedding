/* Shared site behavior: mobile nav, footer year, countdown, RSVP checks.
   Every block is gated so a page without that markup does not error. */

(function () {
  /* The big day: 5 December 2026 at The Garden Venue, Johannesburg.
     The time below is still a guess — set it to the real ceremony time, and keep
     it in step with the times shown on details.html. If this is not a parseable
     date the countdown stays hidden. */
  var WEDDING_DATE_ISO = "2026-12-05T14:00:00";

  /* --- Homepage stages --------------------------------------------------
     The names, the welcome and the countdown each hold the space between
     Ganesha and the couple's heads in turn. Each scroll step fades the current
     stage out and the next one in. CSS (.stages) pins them; this measures the
     space, sets the page length and drives the fades. */

  var couple = document.querySelector(".hero__couple");
  var stages = Array.prototype.slice.call(document.querySelectorAll(".stage"));
  var main = document.querySelector(".site-main");

  if (couple && stages.length && main) {
    var root = document.documentElement;
    var ganesha = document.querySelector(".ganesha");
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var step = 1;
    var ticking = false;

    var place = function () {
      ticking = false;
      var p = window.pageYOffset / step;
      stages.forEach(function (stage, i) {
        var d = p - i;
        // The first stage holds before it, the last holds after it.
        if ((i === 0 && d < 0) || (i === stages.length - 1 && d > 0)) {
          d = 0;
        }
        var o = Math.max(0, Math.min(1, (0.5 - Math.abs(d)) / 0.3));
        stage.style.opacity = o;
        stage.style.visibility = o > 0 ? "visible" : "hidden";
        stage.style.transform = still ? "" : "translateY(" + (-d * 60).toFixed(1) + "px)";
      });
    };

    var measure = function () {
      var viewH = window.innerHeight;
      var viewW = document.documentElement.clientWidth;
      var top = ganesha ? ganesha.getBoundingClientRect().bottom + 16 : viewH * 0.15;
      var width = viewW - 32;
      var left = document.querySelector(".bell--left");
      var right = document.querySelector(".bell--right");
      if (left && right) {
        var l = left.getBoundingClientRect();
        var r = right.getBoundingClientRect();
        var gap = r.left - l.right - 24;
        if (gap >= 320) {
          // Wide screens: the copy fits between the bells.
          width = gap;
        } else {
          // Narrow screens: the copy starts below the bells instead.
          top = Math.max(top, l.bottom + 8, r.bottom + 8);
        }
      }
      // The heads sit at the very top of the illustration.
      var heads = couple.getBoundingClientRect().top + couple.offsetHeight * 0.03 - 12;
      var height = Math.max(heads - top, viewH * 0.4);
      step = viewH * 0.8;
      root.style.setProperty("--win-top", top + "px");
      root.style.setProperty("--win-h", height + "px");
      root.style.setProperty("--win-w", width + "px");

      // Where the names actually start once centred; later stages start there.
      var first = stages[0].firstElementChild;
      var start = top + (first ? first.offsetTop : 0);
      root.style.setProperty("--stage-start", start + "px");

      // The open area for the later stages runs down to the stage floor, or
      // to the couple's heads when they sit under the middle of the page.
      var c = couple.getBoundingClientRect();
      var middle = (c.left + c.right) / 2;
      var floor = middle > viewW * 0.35 && middle < viewW * 0.65 ? heads : viewH * 0.86;
      root.style.setProperty("--stage-h", Math.max(floor - start, 120) + "px");

      // The countdown fits above the heads when there is room; on short
      // screens it keeps a readable size and sits over the couple instead.
      var room = heads - start - 72;
      if (room < 220) {
        room = viewH - start - 72 - 16;
      }
      var cd = Math.min(780, width, viewW * 0.92, Math.max(room, 220) * 1600 / 1037);
      root.style.setProperty("--cd-w", cd + "px");
      main.style.height = viewH + step * (stages.length - 1) + step * 0.3 + "px";
      place();
    };

    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(place);
      }
    };

    document.body.classList.add("stages");
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    if (!couple.complete) {
      couple.addEventListener("load", measure);
    }
  }

  /* --- Fade under Ganesha -----------------------------------------------
     On pages with .fade-under-ganesha the copy fades out as it scrolls up to
     Ganesha. CSS masks .site-main; this keeps the mask's fade band pinned just
     under Ganesha's bottom edge while the page moves. */

  var fadeMain = document.body.classList.contains("fade-under-ganesha") && main;
  var fadeGanesha = document.querySelector(".ganesha");

  if (fadeMain && fadeGanesha) {
    var fading = false;

    var fade = function () {
      fading = false;
      var mainTop = fadeMain.getBoundingClientRect().top;
      var line = fadeGanesha.getBoundingClientRect().bottom - mainTop;
      fadeMain.style.setProperty("--fade-top", line + "px");
      fadeMain.style.setProperty("--fade-bottom", line + 90 + "px");

      // Pages whose backdrop has decor along the bottom set --decor-top (where
      // it starts, as a fraction of the image height) and --field-ratio (image
      // height / width). The copy then fades in just above that decor too.
      var styles = window.getComputedStyle(document.body);
      var decorTop = parseFloat(styles.getPropertyValue("--decor-top"));
      var ratio = parseFloat(styles.getPropertyValue("--field-ratio"));
      if (decorTop && ratio) {
        // The backdrop is background-size: cover, centred on the viewport.
        var viewH = window.innerHeight;
        var imageH = Math.max(viewH, document.documentElement.clientWidth * ratio);
        var decorLine = viewH / 2 + (decorTop - 0.5) * imageH;
        var decor = decorLine - mainTop;
        fadeMain.style.setProperty("--fade-low-top", decor - 40 + "px");
        fadeMain.style.setProperty("--fade-low-bottom", decor + 30 + "px");
        // Room under the last item so it can scroll clear of the fade.
        fadeMain.style.setProperty("--fade-room", Math.max(0, viewH - decorLine + 64) + "px");
      }
    };

    var onFadeScroll = function () {
      if (!fading) {
        fading = true;
        window.requestAnimationFrame(fade);
      }
    };

    fade();
    window.addEventListener("scroll", onFadeScroll, { passive: true });
    window.addEventListener("resize", fade);
    window.addEventListener("load", fade);
  }

  /* --- Mobile nav ------------------------------------------------------- */

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");

  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* --- Footer year ------------------------------------------------------ */

  var year = String(new Date().getFullYear());
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (node) {
    node.textContent = year;
  });

  /* --- Countdown: months, weeks, days, hours, minutes, seconds ----------- */

  var countdown = document.querySelector("[data-countdown]");
  if (countdown) {
    var target = Date.parse(WEDDING_DATE_ISO);
    var out = {
      months: countdown.querySelector("[data-months]"),
      weeks: countdown.querySelector("[data-weeks]"),
      days: countdown.querySelector("[data-days]"),
      hours: countdown.querySelector("[data-hours]"),
      minutes: countdown.querySelector("[data-minutes]"),
      seconds: countdown.querySelector("[data-seconds]")
    };

    var set = function (key, value) {
      if (out[key]) out[key].textContent = String(value);
    };

    /* Calendar months first, so "2 months" means what a guest expects,
       then the remainder split into weeks, days and clock time. */
    var render = function () {
      var now = new Date();
      var end = new Date(target);

      if (end - now <= 0) {
        countdown.hidden = true;
        return false;
      }

      var months = 0;
      var cursor = new Date(now.getTime());
      while (true) {
        var next = new Date(cursor.getTime());
        next.setMonth(next.getMonth() + 1);
        if (next > end) break;
        cursor = next;
        months += 1;
      }

      var rest = end - cursor;
      var seconds = Math.floor(rest / 1000);
      var weeks = Math.floor(seconds / 604800);
      seconds -= weeks * 604800;
      var days = Math.floor(seconds / 86400);
      seconds -= days * 86400;
      var hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      var minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;

      set("months", months);
      set("weeks", weeks);
      set("days", days);
      set("hours", hours);
      set("minutes", minutes);
      set("seconds", seconds);

      countdown.hidden = false;
      return true;
    };

    if (Number.isNaN(target)) {
      countdown.hidden = true;
    } else if (render()) {
      window.setInterval(render, 1000);
    }
  }

  /* --- Scroll reveals ---------------------------------------------------- */

  var revealables = document.querySelectorAll("[data-reveal]");

  if (revealables.length) {
    /* Tells the failsafe in the page head that the reveals are in hand. */
    document.documentElement.setAttribute("data-reveal-ready", "");

    var reveal = function (el) {
      var delay = el.getAttribute("data-reveal-delay");
      if (delay) el.style.transitionDelay = delay + "ms";
      el.classList.add("is-revealed");
    };

    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      /* No animation available or wanted: show everything at once. */
      Array.prototype.forEach.call(revealables, function (el) {
        el.classList.add("is-revealed");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            reveal(entry.target);
            observer.unobserve(entry.target);
          });
        },
        /* Fire a little before the element is fully in view, so the text has
           finished arriving by the time the reader reaches it. */
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
      );

      Array.prototype.forEach.call(revealables, function (el) {
        observer.observe(el);
      });
    }
  }

  /* --- RSVP form -------------------------------------------------------- */

  var form = document.getElementById("rsvp-form");
  if (!form) return;

  var status = document.getElementById("rsvp-status");

  function showStatus(type, message) {
    if (!status) return;
    status.hidden = false;
    status.className = "form-status is-" + type;
    status.textContent = message;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.elements.namedItem("guest-name");
    var email = form.elements.namedItem("guest-email");
    var attending = form.querySelector("input[name='attending']:checked");

    if (!name || !String(name.value).trim()) {
      showStatus("error", "Please enter the guest name.");
      if (name) name.focus();
      return;
    }

    if (!email || !String(email.value).trim()) {
      showStatus("error", "Please enter an email address.");
      if (email) email.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email.value).trim())) {
      showStatus("error", "Please enter a valid email address.");
      email.focus();
      return;
    }

    if (!attending) {
      showStatus("error", "Please tell us whether you are attending.");
      return;
    }

    showStatus(
      "success",
      "Thank you. RSVP submission is not wired up yet, so this form did not send your reply. Please also contact yeshria.pillay@gmail.com."
    );
  });
})();
