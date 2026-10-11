/* Shared site behavior: mobile nav, footer year, countdown, RSVP checks.
   Every block is gated so a page without that markup does not error. */

(function () {
  /* The big day: 5 December 2026 at The Garden Venue, Johannesburg.
     The time below is still a guess — set it to the real ceremony time, and keep
     it in step with the times shown on details.html. If this is not a parseable
     date the countdown stays hidden. */
  var WEDDING_DATE_ISO = "2026-12-05T14:00:00";

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
