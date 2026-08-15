/* =========================
   GAME VARIABLES
========================= */

let attempts = {
    mountain: 0,
    river: 0,
    fox: 0,
    math: 0
};

let timerId = null;


/* =========================
   BACKGROUND MUSIC
========================= */

function startBackgroundMusic() {

    const bgMusic = document.getElementById("bgMusic");

    if (!bgMusic) {
        console.log("❌ Background music element not found");
        return;
    }

    bgMusic.volume = 0.1;

    bgMusic.play()
        .then(() => {
            console.log("🎵 Background music started");
        })
        .catch((error) => {
            console.log("❌ Music error:", error);
        });
}


/* =========================
   CARTOON VOICE
========================= */

let voiceList = [];


function loadVoices() {

    if ("speechSynthesis" in window) {
        voiceList = speechSynthesis.getVoices();
    }

}


if ("speechSynthesis" in window) {

    loadVoices();

    speechSynthesis.onvoiceschanged = loadVoices;

}


function cartoonSpeak(text, pitch = 1.35, rate = 0.9) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Your browser does not support voice. Please use Chrome or Edge."
        );

        return;
    }


    speechSynthesis.cancel();


    const msg = new SpeechSynthesisUtterance(text);


    msg.text = text;

    msg.lang = "en-US";

    msg.pitch = pitch;

    msg.rate = rate;

    msg.volume = 1;


    const preferred =
        voiceList.find(v => /Microsoft Zira/i.test(v.name)) ||
        voiceList.find(v => /Google US English/i.test(v.name)) ||
        voiceList.find(v => /^en-US/i.test(v.lang)) ||
        voiceList.find(v => /^en/i.test(v.lang));


    if (preferred) {

        msg.voice = preferred;

    }


    speechSynthesis.speak(msg);

}


/* =========================
   SCREEN CHANGE
========================= */

function show(id, stage) {

    document
        .querySelectorAll(".screen")
        .forEach(x => x.classList.remove("active"));


    document
        .getElementById(id)
        .classList.add("active");


    document.getElementById("stage").textContent = stage;

    document.getElementById("chances").textContent = 2;


    attempts = {
        mountain: 0,
        river: 0,
        fox: 0,
        math: 0
    };


    if (timerId) {

        clearInterval(timerId);

        timerId = null;

    }


    /* Mountain */

    if (id === "mountain") {

        setTimeout(() => {

            cartoonSpeak(
                "Hahaha! I am the mountain ghost! Answer my riddle if you want to pass!",
                1.5,
                0.85
            );

        }, 600);

    }


    /* River */

    if (id === "river") {

        setTimeout(() => {

            cartoonSpeak(
                "You reached the river! Choose carefully. Only the boat can cross!",
                1.3,
                0.9
            );

        }, 600);

    }


    /* Fox */

    if (id === "fox") {

        setTimeout(() => {

            cartoonSpeak(
                "Oh no! A clever fox is here! Quickly scare the fox away!",
                1.5,
                0.85
            );

        }, 600);

    }


    /* School */

    if (id === "school") {

        setTimeout(() => {

            cartoonSpeak(
                "Welcome to the school! Solve my math challenge!",
                1.2,
                0.9
            );

        }, 600);


        startTimer();

    }


    /* House */

    if (id === "house") {

        setTimeout(() => {

            cartoonSpeak(
                "Yay! Congratulations! You reached Bujji's house and delivered the gift safely!",
                1.3,
                0.85
            );

        }, 500);

    }

}


/* =========================
   START GAME
========================= */

function startGame() {

    /* 🎵 Start background music */

    startBackgroundMusic();


    /* Show HUD */

    document
        .getElementById("hud")
        .classList
        .remove("hidden");


    /* 🎙️ Welcome voice */

    cartoonSpeak(
        "Welcome to Doravin Prayanam! Help me deliver this gift to Bujji's house!",
        1.3,
        0.9
    );


    /* Go to Mountain */

    setTimeout(() => {

        show("mountain", "Mountain");

    }, 1200);

}


/* =========================
   WRONG ANSWER
========================= */

function wrong(key, text) {

    attempts[key]++;


    let left = 2 - attempts[key];


    document.getElementById("chances").textContent =
        Math.max(left, 0);


    cartoonSpeak(

        left > 0
            ? "Oops! That's not correct. Try again!"
            : "Oh no! You used all your chances!",

        1.45,
        0.85

    );


    toast(
        text +
        (
            left > 0
                ? ` ${left} chance left.`
                : " Game over."
        )
    );


    return left > 0;

}


/* =========================
   MOUNTAIN
========================= */

function checkMountain() {

    let a =
        document
            .getElementById("mountainAnswer")
            .value
            .trim()
            .toLowerCase();


    if (a === "keyboard") {

        cartoonSpeak(
            "Wow! Correct! The answer is keyboard. You can continue your journey!",
            1.35,
            0.88
        );


        document
            .getElementById("mountainMsg")
            .textContent =
            "✅ Correct! You can pass!";


        setTimeout(() => {

            show("river", "River");

        }, 1800);

    }

    else {

        document
            .getElementById("mountainMsg")
            .textContent =
            wrong("mountain", "❌ Incorrect.")
                ? "Try again."
                : "The ghost stopped you.";

    }

}


/* =========================
   RIVER
========================= */

function chooseRiver(c) {

    if (c === "boat") {

        cartoonSpeak(
            "Great choice! The boat can cross the river!",
            1.25,
            0.9
        );


        document
            .getElementById("riverMsg")
            .textContent =
            "🚣 Boat is crossing!";


        document
            .getElementById("boat")
            .style
            .left = "42%";


        setTimeout(() => {

            show("fox", "Fox");

        }, 1800);

    }

    else {

        document
            .getElementById("riverMsg")
            .textContent =
            wrong("river", "❌ That cannot cross.")
                ? "Choose again."
                : "You couldn't cross.";

    }

}


/* =========================
   FOX
========================= */

function checkFox() {

    let a =
        document
            .getElementById("foxAnswer")
            .value
            .trim()
            .toLowerCase();


    if (a === "kulla nari thiruda koodathu") {

        cartoonSpeak(
            "Oh no! I am scared! I am running away!",
            1.6,
            0.8
        );


        document
            .getElementById("foxMsg")
            .textContent =
            "📢 🦊 The fox ran away!";


        document
            .querySelector(".fox")
            .style
            .left = "110%";


        setTimeout(() => {

            show("school", "School");

        }, 1800);

    }

    else {

        document
            .getElementById("foxMsg")
            .textContent =
            wrong("fox", "❌ Wrong phrase.")
                ? "Try again."
                : "The fox stole the gift.";

    }

}


/* =========================
   SCHOOL TIMER
========================= */

function startTimer() {

    let t = 10;


    document
        .getElementById("timer")
        .textContent = t;


    timerId = setInterval(() => {

        t--;


        document
            .getElementById("timer")
            .textContent = t;


        if (t <= 0) {

            clearInterval(timerId);

            timerId = null;


            cartoonSpeak(
                "Time is up! Hurry and answer the question!",
                1.2,
                0.9
            );

        }

    }, 1000);

}


/* =========================
   MATH
========================= */

function checkMath() {

    let n =
        Number(
            document
                .getElementById("mathAnswer")
                .value
        );


    if (
        n !== 0 &&
        Number.isFinite(n) &&
        n % 10 === 0
    ) {

        if (timerId) {

            clearInterval(timerId);

            timerId = null;

        }


        cartoonSpeak(
            "Amazing! That's correct! You completed the journey!",
            1.35,
            0.85
        );


        document
            .getElementById("mathMsg")
            .textContent =
            "✅ Correct!";


        setTimeout(() => {

            show(
                "house",
                "Bujji's House"
            );

        }, 1800);

    }

    else {

        document
            .getElementById("mathMsg")
            .textContent =
            wrong(
                "math",
                "❌ Not a multiple of 10."
            )
                ? "Try again."
                : "Challenge failed.";

    }

}


/* =========================
   TOAST
========================= */

function toast(s) {

    let t =
        document.getElementById("toast");


    t.textContent = s;


    t.className = "show";


    setTimeout(() => {

        t.className = "";

    }, 1700);

}


/* =========================
   ENTER KEY
========================= */

document.addEventListener(
    "keydown",
    e => {

        if (e.key === "Enter") {

            let id =
                document
                    .querySelector(".screen.active")
                    .id;


            if (id === "mountain")
                checkMountain();


            if (id === "fox")
                checkFox();


            if (id === "school")
                checkMath();

        }

    }
);
   
     