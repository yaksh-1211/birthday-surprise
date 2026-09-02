/* Birthday Surprise - protected client-side version */
(() => {
  "use strict";

  let p = 0;
  const loading = setInterval(() => {
    p++;
    const bar = document.getElementById("loadingBar");
    const pct = document.getElementById("percentage");
    if (bar) bar.style.width = p + "%";
    if (pct) pct.innerText = p + "%";
    if (p >= 100) clearInterval(loading);
  }, 100);

  // Unlock time: 8 September 2026, 12:00 AM (local browser time)
  const birthday = new Date("September 08, 2026 00:00:00").getTime();
  const btn = document.getElementById("sBtn");
  let unlocked = false;

  function unlock() {
    unlocked = true;
    if (!btn) return;
    btn.disabled = false;
    btn.removeAttribute("aria-disabled");
    btn.innerHTML = "🎁 Open Your Surprise ❤️";
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-success");
    btn.style.cursor = "pointer";
  }

  function updateCountdown() {
    const now = Date.now();
    const difference = birthday - now;

    if (difference <= 0) {
      ["days","hours","minutes","seconds"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = "0";
      });
      unlock();
      return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference / 3600000) % 24);
    const minutes = Math.floor((difference / 60000) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }

  // Defense-in-depth: the button itself, not an <a>, controls navigation.
  if (btn) {
    btn.disabled = true;
    btn.addEventListener("click", () => {
      if (!unlocked || Date.now() < birthday) return;
      window.location.href = "Sneha-birthday.html";
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Basic deterrents. These do NOT provide real security.
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("dragstart", e => e.preventDefault());
  document.addEventListener("keydown", e => {
    const key = e.key.toLowerCase();
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (key === "i" || key === "j" || key === "c")) ||
      (e.ctrlKey && (key === "u" || key === "s"))
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // Do not block the page if a browser/extension behaves differently.
  // These protections are only deterrents.
})(); 
