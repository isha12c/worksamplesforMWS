(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Frame counter tick in hero — mimics a mechanical film advance, runs once.
  var counter = document.getElementById("frameCounter");
  if (counter && !reduceMotion) {
    var frame = 0;
    var target = 7; // "roll 7_17_26"
    var tick = setInterval(function () {
      frame++;
      counter.textContent = String(frame).padStart(3, "0");
      if (frame >= target) clearInterval(tick);
    }, 140);
  }

  // Scroll reveal for log entries / flags / metrics
  var targets = document.querySelectorAll(".log__entry, .flag, .metric, .jump-card");
  targets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach(function (el) { observer.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
