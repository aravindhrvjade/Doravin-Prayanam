/* =========================================================
   DORAVIN PRAYANAM — GAME ENGINE
   ========================================================= */

const TOTAL_CHANCES = 2;
let attempts = { mountain: 0, river: 0, fox: 0, math: 0 };
let timerId = null;
let voiceList = [];
let musicOn = true;

/* -------------------- MUSIC -------------------- */

function startBackgroundMusic() {
  const bgMusic = document.getElementById("bgMusic");
  if (!bgMusic) return;

  bgMusic.volume = 0.16;
  bgMusic.loop = true;

  bgMusic.play()
    .then(() => {
      musicOn = true;
      updateMusicButton();
    })
    .catch(() => {
      // Browsers may block autoplay. The Start button normally gives permission.
      showToast("🎵 Click the music button if sound is blocked.");
    });
}

function toggleMusic() {
  const bgMusic = document.getElementById("bgMusic");
  if (!bgMusic) return;

  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      musicOn = true;
      updateMusicButton();
    }).catch(() => showToast("🔊 Browser blocked the music."));
  } else {
    bgMusic.pause();
    musicOn = false;
    updateMusicButton();
  }
}

function updateMusicButton() {
  const btn = document.getElementById("musicBtn");
  if (btn) btn.textContent = musicOn ? "🔊" : "🔇";
}

/* -------------------- VOICE -------------------- */

function loadVoices() {
  if ("speechSynthesis" in window) {
    voiceList = window.speechSynthesis.getVoices();
  }
}

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function cartoonSpeak(text, pitch = 1.3, rate = 0.9) {
  if (!("speechSynthesis" in window)) {
    showToast("🔊 Voice is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.pitch = pitch;
  msg.rate = rate;
  msg.volume = 1;

  const preferred =
    voiceList.find(v => /Zira|Jenny|Samantha/i.test(v.name)) ||
    voiceList.find(v => /Google US English/i.test(v.name)) ||
    voiceList.find(v => /^en-US/i.test(v.lang)) ||
    voiceList.find(v => /^en/i.test(v.lang));

  if (preferred) msg.voice = preferred;
  window.speechSynthesis.speak(msg);
}

/* -------------------- SMALL UI HELPERS -------------------- */

function setMessage(id, text, type = "") {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = "msg " + type;
}

function showToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = text;
  toast.className = "show";
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.className = "", 1800);
}

function resetAttempts() {
  attempts = { mountain: 0, river: 0, fox: 0, math: 0 };
  document.getElementById("chances").textContent = TOTAL_CHANCES;
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

/* -------------------- SCREEN CHANGE -------------------- */

function show(id, stage) {
  stopTimer();

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const next = document.getElementById(id);
  if (!next) return;

  next.classList.add("active");
  document.getElementById("stage").textContent = stage;
  resetAttempts();

  if (id === "mountain") {
    setTimeout(() => cartoonSpeak(
      "Hahaha! I am the mountain ghost! Answer my riddle if you want to pass!",
      1.48, 0.86
    ), 500);
  }

  if (id === "river") {
    setTimeout(() => cartoonSpeak(
      "You reached the river! Choose carefully. Only the boat can cross!",
      1.28, 0.9
    ), 500);
  }

  if (id === "fox") {
    setTimeout(() => cartoonSpeak(
      "Oh no! A clever fox is here! Quickly scare the fox away!",
      1.5, 0.84
    ), 500);
  }

  if (id === "school") {
    setTimeout(() => cartoonSpeak(
      "Welcome to the school! Solve my math challenge!",
      1.22, 0.9
    ), 500);
    startTimer();
  }

  if (id === "house") {
    setTimeout(() => cartoonSpeak(
      "Yay! Congratulations! You reached Bujji's house and delivered the gift safely!",
      1.3, 0.86
    ), 400);
  }
}

/* -------------------- START -------------------- */

function startGame() {
  document.getElementById("hud").classList.remove("hidden");
  startBackgroundMusic();

  cartoonSpeak(
    "Welcome to Doravin Prayanam! Help me deliver this gift to Bujji's house!",
    1.3, 0.9
  );

  setTimeout(() => show("mountain", "Mountain"), 1000);
}

/* -------------------- CHANCES -------------------- */

function wrong(key, text) {
  attempts[key] += 1;
  const left = TOTAL_CHANCES - attempts[key];

  document.getElementById("chances").textContent = Math.max(left, 0);

  if (left > 0) {
    cartoonSpeak("Oops! That's not correct. Try again!", 1.42, 0.86);
    showToast(`${text} ${left} chance left.`);
    return true;
  }

  cartoonSpeak("Oh no! You used all your chances!", 1.42, 0.86);
  showToast("❌ Game over!");
  setTimeout(() => {
    document.getElementById("gameOver").classList.remove("hidden");
  }, 450);
  return false;
}

/* -------------------- MOUNTAIN -------------------- */

function checkMountain() {
  const input = document.getElementById("mountainAnswer");
  const answer = input.value.trim().toLowerCase();

  if (answer === "keyboard") {
    setMessage("mountainMsg", "✅ Correct! The answer is keyboard!", "success");
    cartoonSpeak(
      "Wow! Correct! The answer is keyboard. You can continue your journey!",
      1.34, 0.88
    );
    setTimeout(() => show("river", "River"), 1500);
  } else {
    setMessage("mountainMsg", wrong("mountain", "❌ Incorrect.") ? "Try again!" : "The ghost stopped you.", "error");
  }
}

/* -------------------- RIVER -------------------- */

function chooseRiver(choice) {
  if (choice === "boat") {
    setMessage("riverMsg", "🚣 Great choice! The boat is crossing!", "success");
    cartoonSpeak("Great choice! The boat can cross the river!", 1.25, 0.9);

    const boat = document.getElementById("boat");
    boat.classList.add("boat-moving");

    setTimeout(() => show("fox", "Fox"), 1500);
  } else {
    setMessage(
      "riverMsg",
      wrong("river", "❌ That cannot cross.") ? "Choose again!" : "You couldn't cross.",
      "error"
    );
  }
}

/* -------------------- FOX -------------------- */

function checkFox() {
  const answer = document.getElementById("foxAnswer").value
    .trim().toLowerCase()
    .replace(/\s+/g, " ");

  if (answer === "kulla nari thiruda koodathu") {
    setMessage("foxMsg", "📢 🦊 The fox ran away!", "success");
    cartoonSpeak("Oh no! I am scared! I am running away!", 1.58, 0.8);

    document.querySelector(".fox").classList.add("fox-running");

    setTimeout(() => show("school", "School"), 1500);
  } else {
    setMessage(
      "foxMsg",
      wrong("fox", "❌ Wrong phrase.") ? "Try again!" : "The fox stole the gift.",
      "error"
    );
  }
}

/* -------------------- SCHOOL TIMER -------------------- */

function startTimer() {
  let time = 10;
  const timer = document.getElementById("timer");
  timer.textContent = time;
  timer.classList.remove("danger");

  timerId = setInterval(() => {
    time -= 1;
    timer.textContent = time;

    if (time <= 3) timer.classList.add("danger");

    if (time <= 0) {
      stopTimer();
      cartoonSpeak("Time is up! Hurry and answer the question!", 1.22, 0.9);
      showToast("⏰ Time is up! You can still try your answer.");
    }
  }, 1000);
}

/* -------------------- MATH -------------------- */

function checkMath() {
  const n = Number(document.getElementById("mathAnswer").value);

  if (n !== 0 && Number.isFinite(n) && n % 10 === 0) {
    stopTimer();

    setMessage("mathMsg", "🎉 Correct! You completed the journey!", "success");
    cartoonSpeak(
      "Amazing! That's correct! You completed the journey!",
      1.35, 0.85
    );

    setTimeout(() => show("house", "Bujji's House"), 1500);
  } else {
    setMessage(
      "mathMsg",
      wrong("math", "❌ Not a multiple of 10.") ? "Try again!" : "Challenge failed.",
      "error"
    );
  }
}

/* -------------------- ENTER KEY -------------------- */

document.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;

  const active = document.querySelector(".screen.active");
  if (!active) return;

  if (active.id === "mountain") checkMountain();
  if (active.id === "fox") checkFox();
  if (active.id === "school") checkMath();
});
