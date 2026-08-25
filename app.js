/* =========================================================
   RAKKEZ V2
   TIMER + STATS + PERSISTENCE + LANGUAGE SAFE
   FULL VERSION
   ========================================================= */


/* =========================================================
   HELPERS
   ---------------------------------------------------------
   $() = shortcut للحصول على عنصر من HTML عن طريق ID.
   ========================================================= */

const $ = id => document.getElementById(id);


/* =========================================================
   STORAGE
   ---------------------------------------------------------
   جميع بيانات RakkeZ المحفوظة في LocalStorage.
   لو أردت إضافة Storage جديد مستقبلاً، أضفه هنا.
   ========================================================= */

const STORAGE = {

    settings: "rakkez_settings",

    stats: "rakkez_stats",

    tasks: "rakkez_tasks",

    timer: "rakkez_timer_state",

    spotify: "rakkez_spotify",

    google: "rakkez_google",

    ambient: "rakkez_ambient",

    alarm: "rakkez_alarm"

};


/* =========================================================
   DEFAULT SETTINGS
   ---------------------------------------------------------
   الإعدادات الافتراضية للتطبيق.
   يمكنك تعديل القيم من هنا.
   ========================================================= */

const DEFAULT_SETTINGS = {

    focus: 25,

    shortBreak: 5,

    longBreak: 15,

    longBreakAfter: 4,

    dailyGoal: 240,

    autoStart: false,

    smartTimer: true,

    sound: true,

    alarmVolume: 0.70,

    alarmSound: "soft",

    theme: "dark"

};


/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function load(key, fallback) {

    try {

        const value =
            localStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : fallback;

    } catch (error) {

        console.error(
            "Load error:",
            error
        );

        return fallback;

    }

}


function save(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.error(
            "Storage error:",
            error
        );

    }

}


/* =========================================================
   SETTINGS
   ========================================================= */

let settings = {

    ...DEFAULT_SETTINGS,

    ...load(
        STORAGE.settings,
        {}
    )

};


/* =========================================================
   STATS
   ========================================================= */

let stats = {

    totalFocusSeconds: 0,

    sessions: 0,

    streak: 0,

    lastFocusDate: null,

    dailyFocus: {},

    ...load(
        STORAGE.stats,
        {}
    )

};


/* =========================================================
   TASKS
   ========================================================= */

let tasks =
    load(
        STORAGE.tasks,
        []
    );


/* =========================================================
   TIMER STATE
   ========================================================= */

let timerState = {

    mode: "focus",

    remaining:
        Number(settings.focus) * 60,

    total:
        Number(settings.focus) * 60,

    running: false,

    interval: null

};


/* =========================================================
   OTHER STATE
   ========================================================= */

let completedFocusInCycle = 0;

let currentTaskId = null;


/* =========================================================
   LANGUAGE
   ========================================================= */

function getCurrentLanguage() {

    const language =
        localStorage.getItem("language") ||
        localStorage.getItem("rakkez_language") ||
        "en";

    return language === "ar"
        ? "ar"
        : "en";

}


/* =========================================================
   ARABIC NUMBERS
   ========================================================= */

function arabicNumbers(value) {

    return String(value).replace(
        /\d/g,
        digit =>
            "٠١٢٣٤٥٦٧٨٩"[digit]
    );

}


/* =========================================================
   ENGLISH NUMBERS
   ========================================================= */

function englishNumbers(value) {

    return String(value).replace(
        /[٠-٩]/g,
        digit =>
            "٠١٢٣٤٥٦٧٨٩".indexOf(
                digit
            )
    );

}


/* =========================================================
   DATE
   ========================================================= */

function todayKey() {

    const d = new Date();

    return [

        d.getFullYear(),

        String(
            d.getMonth() + 1
        ).padStart(2, "0"),

        String(
            d.getDate()
        ).padStart(2, "0")

    ].join("-");

}


/* =========================================================
   FORMAT TIMER
   ========================================================= */

function formatTime(seconds) {

    seconds =
        Math.max(
            0,
            Math.floor(
                Number(seconds) || 0
            )
        );

    const minutes =
        Math.floor(
            seconds / 60
        );

    const secs =
        seconds % 60;

    return (

        String(minutes)
            .padStart(2, "0")

        +

        ":"

        +

        String(secs)
            .padStart(2, "0")

    );

}


/* =========================================================
   TIMER MODE TEXT
   ========================================================= */

function getTimerModeText() {

    const lang =
        getCurrentLanguage();

    if (lang === "ar") {

        if (
            timerState.mode === "short"
        ) {

            return "استراحة قصيرة";

        }

        if (
            timerState.mode === "long"
        ) {

            return "استراحة طويلة";

        }

        return "التركيز";

    }


    if (
        timerState.mode === "short"
    ) {

        return "SHORT BREAK";

    }


    if (
        timerState.mode === "long"
    ) {

        return "LONG BREAK";

    }


    return "FOCUS";

}


/* =========================================================
   TIMER LABEL
   ========================================================= */

function getTimerLabel() {

    const lang =
        getCurrentLanguage();

    if (lang === "ar") {

        return timerState.mode === "focus"

            ? "ركز على شيء واحد فقط."

            : "خذ نفسًا. لقد استحققت الراحة.";

    }

    return timerState.mode === "focus"

        ? "Stay focused. One thing at a time."

        : "Take a breath. You earned it.";

}


/* =========================================================
   START BUTTON TEXT
   ========================================================= */

function getStartButtonText() {

    const lang =
        getCurrentLanguage();

    if (lang === "ar") {

        return timerState.running
            ? "إيقاف مؤقت"
            : "ابدأ";

    }

    return timerState.running
        ? "PAUSE"
        : "START";

}


/* =========================================================
   TIMER UI
   ========================================================= */

function updateTimerUI() {

    const lang =
        getCurrentLanguage();


    /* =====================================================
       TIMER NUMBER
       ===================================================== */

    const timer =
        $("timer");

    if (timer) {

        const time =
            formatTime(
                timerState.remaining
            );

        timer.textContent =
            lang === "ar"
                ? arabicNumbers(time)
                : time;

    }


    /* =====================================================
       MODE
       ===================================================== */

    const modeText =
        $("modeText");

    if (modeText) {

        modeText.dataset.mode =
            timerState.mode;

        modeText.textContent =
            getTimerModeText();

    }


    /* =====================================================
       TIMER LABEL
       ===================================================== */

    const timerLabel =
        $("timerLabel");

    if (timerLabel) {

        timerLabel.textContent =
            getTimerLabel();

    }


    /* =====================================================
       PROGRESS
       ===================================================== */

    const elapsed =
        timerState.total -
        timerState.remaining;

    const percentage =
        timerState.total > 0

            ? (
                elapsed /
                timerState.total
            ) * 100

            : 0;


    const progress =
        $("progress");

    if (progress) {

        progress.style.width =
            Math.max(
                0,
                Math.min(
                    100,
                    percentage
                )
            ) + "%";

    }


    /* =====================================================
       START / PAUSE
       ===================================================== */

    const startButton =
        $("startBtn");

    if (startButton) {

        startButton.textContent =
            getStartButtonText();

    }


    /* =====================================================
       CURRENT TASK
       ===================================================== */

    if (
        typeof updateCurrentTask ===
        "function"
    ) {

        updateCurrentTask();

    }

}


/* =========================================================
   START TIMER
   ========================================================= */

function startTimer() {

    if (timerState.running) {

        pauseTimer();

        return;

    }


    if (
        typeof stopAlarm ===
        "function"
    ) {

        stopAlarm();

    }


    if (
        typeof unlockAudio ===
        "function"
    ) {

        unlockAudio();

    }


    if (
        timerState.interval !==
        null
    ) {

        clearInterval(
            timerState.interval
        );

        timerState.interval = null;

    }


    if (
        !Number.isFinite(
            Number(
                timerState.remaining
            )
        )
    ) {

        setMode(
            timerState.mode
        );

    }


    timerState.running =
        true;


    timerState.interval =
        setInterval(
            tick,
            1000
        );


    saveTimer();

    updateTimerUI();

}


/* =========================================================
   PAUSE TIMER
   ========================================================= */

function pauseTimer() {

    timerState.running =
        false;


    if (
        timerState.interval !==
        null
    ) {

        clearInterval(
            timerState.interval
        );

    }


    timerState.interval =
        null;


    saveTimer();

    updateTimerUI();

}


/* =========================================================
   TICK
   ========================================================= */

function tick() {

    if (!timerState.running) {

        return;

    }


    if (
        timerState.remaining <=
        0
    ) {

        completePhase();

        return;

    }


    /* =====================================================
       FOCUS STATISTICS
       ===================================================== */

    if (
        timerState.mode ===
        "focus"
    ) {

        stats.totalFocusSeconds++;


        const today =
            todayKey();


        if (
            !stats.dailyFocus[today]
        ) {

            stats.dailyFocus[today] =
                0;

        }


        stats.dailyFocus[today]++;


        save(
            STORAGE.stats,
            stats
        );


        updateStats();

    }


    /* =====================================================
       DECREASE TIMER
       ===================================================== */

    timerState.remaining =
        Math.max(
            0,
            Number(
                timerState.remaining
            ) - 1
        );


    if (
        timerState.remaining <=
        0
    ) {

        updateTimerUI();

        completePhase();

        return;

    }


    updateTimerUI();

}


/* =========================================================
   PHASE COMPLETE
   ========================================================= */

function completePhase() {

    pauseTimer();


    if (
        typeof playAlarm ===
        "function"
    ) {

        playAlarm();

    }


    if (
        timerState.mode ===
        "focus"
    ) {

        completedFocusInCycle++;

        stats.sessions++;


        const today =
            todayKey();


        stats.lastFocusDate =
            today;


        updateStreakOnFocus();


        /* =================================================
           TASK FOCUS TIME
           ================================================= */

        if (currentTaskId) {

            const task =
                tasks.find(
                    task =>
                        task.id ===
                        currentTaskId
                );


            if (task) {

                task.focusMinutes =
                    (
                        task.focusMinutes ||
                        0
                    ) +

                    Math.round(
                        timerState.total /
                        60
                    );

            }

        }


        /* =================================================
           NEXT MODE
           ================================================= */

        if (
            completedFocusInCycle >=
            Number(
                settings.longBreakAfter
            )
        ) {

            completedFocusInCycle =
                0;

            setMode("long");

        } else {

            setMode("short");

        }

    } else {

        setMode("focus");

    }


    save(
        STORAGE.stats,
        stats
    );


    save(
        STORAGE.tasks,
        tasks
    );


    updateStats();


    /* =====================================================
       AUTO START
       ===================================================== */

    if (settings.autoStart) {

        setTimeout(
            () => {

                if (
                    typeof isAlarmPlaying ===
                    "function"
                ) {

                    if (
                        !isAlarmPlaying()
                    ) {

                        startTimer();

                    }

                } else {

                    startTimer();

                }

            },
            800
        );

    }

}


/* =========================================================
   SET MODE
   ========================================================= */

function setMode(mode) {

    if (
        mode !== "focus" &&
        mode !== "short" &&
        mode !== "long"
    ) {

        mode = "focus";

    }


    timerState.mode =
        mode;


    let minutes;


    if (mode === "focus") {

        minutes =
            Number(
                settings.focus
            );

    } else if (
        mode === "short"
    ) {

        minutes =
            Number(
                settings.shortBreak
            );

    } else {

        minutes =
            Number(
                settings.longBreak
            );

    }


    if (
        !Number.isFinite(minutes) ||
        minutes <= 0
    ) {

        minutes =
            DEFAULT_SETTINGS.focus;

    }


    timerState.total =
        Math.floor(
            minutes * 60
        );


    timerState.remaining =
        timerState.total;


    timerState.running =
        false;


    if (
        timerState.interval !==
        null
    ) {

        clearInterval(
            timerState.interval
        );

    }


    timerState.interval =
        null;


    saveTimer();

    updateTimerUI();

}


/* =========================================================
   RESET TIMER
   =========================================================
   IMPORTANT:
   هذا لا يمسح الإحصائيات.
   ========================================================= */

function resetTimer() {

    timerState.running =
        false;


    if (
        timerState.interval !==
        null
    ) {

        clearInterval(
            timerState.interval
        );

    }


    timerState.interval =
        null;


    if (
        typeof stopAlarm ===
        "function"
    ) {

        stopAlarm();

    }


    if (
        typeof stopTestAlarm ===
        "function"
    ) {

        stopTestAlarm();

    }


    timerState.mode =
        "focus";


    const focusMinutes =
        Number(
            settings.focus
        );


    const safeFocus =
        Number.isFinite(
            focusMinutes
        ) &&
        focusMinutes > 0

            ? focusMinutes

            : DEFAULT_SETTINGS.focus;


    timerState.total =
        Math.floor(
            safeFocus * 60
        );


    timerState.remaining =
        timerState.total;


    timerState.running =
        false;


    timerState.interval =
        null;


    saveTimer();

    updateTimerUI();

    updateStats();

}


/* =========================================================
   STATS
   ========================================================= */

function updateStats() {

    const focusStat =
        $("focusStat");


    if (focusStat) {

        focusStat.textContent =
            formatFocus(
                stats.totalFocusSeconds
            );

    }


    const sessionsStat =
        $("sessionsStat");


    if (sessionsStat) {

        const value =
            Number(
                stats.sessions
            ) || 0;


        sessionsStat.textContent =
            getCurrentLanguage() === "ar"

                ? arabicNumbers(value)

                : value;

    }


    updateStreak();


    const streakStat =
        $("streakStat");


    if (streakStat) {

        const streak =
            Number(
                stats.streak
            ) || 0;


        if (
            getCurrentLanguage() ===
            "ar"
        ) {

            streakStat.textContent =
                arabicNumbers(
                    streak
                ) +
                " يوم";

        } else {

            streakStat.textContent =
                streak +
                " day" +
                (
                    streak === 1
                        ? ""
                        : "s"
                );

        }

    }


    updateDailyGoal();

}


/* =========================================================
   FORMAT FOCUS
   ========================================================= */

function formatFocus(seconds) {

    const minutes =
        Math.floor(
            (
                Number(seconds) ||
                0
            ) / 60
        );


    const lang =
        getCurrentLanguage();


    if (lang === "ar") {

        if (minutes < 60) {

            return (
                arabicNumbers(
                    minutes
                ) +
                "د"
            );

        }


        const hours =
            Math.floor(
                minutes / 60
            );


        const remaining =
            minutes % 60;


        if (remaining > 0) {

            return (
                arabicNumbers(hours) +
                "س " +
                arabicNumbers(
                    remaining
                ) +
                "د"
            );

        }


        return (
            arabicNumbers(hours) +
            "س"
        );

    }


    if (minutes < 60) {

        return (
            minutes +
            "m"
        );

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    const remaining =
        minutes % 60;


    if (remaining > 0) {

        return (
            hours +
            "h " +
            remaining +
            "m"
        );

    }


    return (
        hours +
        "h"
    );

}


/* =========================================================
   DAILY GOAL
   ========================================================= */

function updateDailyGoal() {

    const goalStat =
        $("goalStat");


    if (!goalStat) {

        return;

    }


    const today =
        todayKey();


    const seconds =
        Number(
            stats.dailyFocus[today]
        ) || 0;


    const minutes =
        Math.floor(
            seconds / 60
        );


    const goal =
        Number(
            settings.dailyGoal
        ) || 0;


    const goalHours =
        Math.floor(
            goal / 60
        );


    const goalMinutes =
        goal % 60;


    const lang =
        getCurrentLanguage();


    let currentText;

    let goalText;


    if (lang === "ar") {

        currentText =
            arabicNumbers(
                minutes
            ) +
            "د";


        if (goalHours) {

            goalText =
                arabicNumbers(
                    goalHours
                ) +
                "س";


            if (goalMinutes) {

                goalText +=
                    " " +
                    arabicNumbers(
                        goalMinutes
                    ) +
                    "د";

            }

        } else {

            goalText =
                arabicNumbers(
                    goal
                ) +
                "د";

        }

    } else {

        currentText =
            minutes +
            "m";


        if (goalHours) {

            goalText =
                goalHours +
                "h";


            if (goalMinutes) {

                goalText +=
                    " " +
                    goalMinutes +
                    "m";

            }

        } else {

            goalText =
                goal +
                "m";

        }

    }


    goalStat.textContent =
        currentText +
        " / " +
        goalText;

}


/* =========================================================
   STREAK
   ========================================================= */

function updateStreakOnFocus() {

    const today =
        todayKey();


    const previous =
        localStorage.getItem(
            "rakkez_last_focus_day"
        );


    if (previous === today) {

        return;

    }


    if (previous) {

        const last =
            new Date(
                previous +
                "T00:00:00"
            );


        const current =
            new Date(
                today +
                "T00:00:00"
            );


        const diff =
            Math.round(
                (
                    current -
                    last
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        if (diff === 1) {

            stats.streak =
                (
                    Number(
                        stats.streak
                    ) || 0
                ) + 1;

        } else {

            stats.streak = 1;

        }

    } else {

        stats.streak = 1;

    }


    localStorage.setItem(
        "rakkez_last_focus_day",
        today
    );

}


/* =========================================================
   CHECK STREAK
   ========================================================= */

function updateStreak() {

    if (!stats.lastFocusDate) {

        return;

    }


    const today =
        todayKey();


    const last =
        new Date(
            stats.lastFocusDate +
            "T00:00:00"
        );


    const current =
        new Date(
            today +
            "T00:00:00"
        );


    const difference =
        Math.round(
            (
                current -
                last
            ) /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    if (difference > 1) {

        stats.streak = 0;

    }

}


/* =========================================================
   TIMER PERSISTENCE
   ========================================================= */

function saveTimer() {

    if (!settings.smartTimer) {

        return;

    }


    save(
        STORAGE.timer,
        {

            mode:
                timerState.mode,

            remaining:
                Number(
                    timerState.remaining
                ),

            total:
                Number(
                    timerState.total
                ),

            timestamp:
                Date.now(),

            running:
                Boolean(
                    timerState.running
                )

        }
    );

}


/* =========================================================
   RESTORE TIMER
   ========================================================= */

function restoreTimer() {

    if (!settings.smartTimer) {

        return;

    }


    const saved =
        load(
            STORAGE.timer,
            null
        );


    if (!saved) {

        return;

    }


    if (
        saved.mode !== "focus" &&
        saved.mode !== "short" &&
        saved.mode !== "long"
    ) {

        return;

    }


    timerState.mode =
        saved.mode;


    timerState.total =
        Number(saved.total) ||
        (
            Number(
                settings.focus
            ) * 60
        );


    const savedRemaining =
        Number(
            saved.remaining
        );


    if (
        saved.running &&
        Number.isFinite(
            savedRemaining
        )
    ) {

        const savedTimestamp =
            Number(
                saved.timestamp
            );


        const elapsed =
            Number.isFinite(
                savedTimestamp
            )

                ? Math.floor(
                    (
                        Date.now() -
                        savedTimestamp
                    ) / 1000
                )

                : 0;


        timerState.remaining =
            Math.max(
                0,
                savedRemaining -
                Math.max(
                    0,
                    elapsed
                )
            );

    } else {

        timerState.remaining =
            Number.isFinite(
                savedRemaining
            )

                ? Math.max(
                    0,
                    savedRemaining
                )

                : timerState.total;

    }


    timerState.running =
        false;


    timerState.interval =
        null;


    updateTimerUI();

}


/* =========================================================
   AUDIO UNLOCK
   ========================================================= */

let audioUnlocked = false;


function unlockAudio() {

    if (audioUnlocked) {

        return;

    }


    try {

        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContextClass) {

            return;

        }


        const context =
            new AudioContextClass();


        if (
            context.state ===
            "suspended"
        ) {

            context.resume();

        }


        const oscillator =
            context.createOscillator();


        const gain =
            context.createGain();


        gain.gain.value =
            0.00001;


        oscillator.connect(
            gain
        );


        gain.connect(
            context.destination
        );


        oscillator.start();


        oscillator.stop(
            context.currentTime +
            0.01
        );


        oscillator.onended =
            () => {

                try {

                    context.close();

                } catch {}

            };


        audioUnlocked = true;

    } catch (error) {

        console.warn(
            "Audio unlock failed:",
            error
        );

    }

}


/* =========================================================
   LANGUAGE REFRESH HOOK
   ========================================================= */

window.refreshTimerLanguage =
    function () {

        updateTimerUI();

        updateStats();

    };


/* =========================================================
   SAFE NUMBER UPDATE HOOK
   ========================================================= */

window.updateLanguageNumbers =
    function () {

        updateTimerUI();

    };


/* =========================================================
   GLOBAL TIMER FUNCTIONS
   ========================================================= */

window.startTimer =
    startTimer;


window.pauseTimer =
    pauseTimer;


window.resetTimer =
    resetTimer;


window.setMode =
    setMode;


/* =========================================================
   ALARM SYSTEM
   ========================================================= */

let customAlarmURL =
    null;

let customAlarmName =
    null;

let alarmAudio =
    null;

let alarmAudioContext =
    null;

let alarmOscillators =
    [];

let alarmLoopTimeout =
    null;

let alarmPlaying =
    false;

let alarmSequenceId =
    0;


/* =========================================================
   TEST ALARM STATE
   ========================================================= */

let testAudio =
    null;

let testAudioContext =
    null;

let testOscillators =
    [];

let testTimeout =
    null;

let testPlaying =
    false;

let testSequenceId =
    0;


/* =========================================================
   ALARM FREQUENCIES
   ---------------------------------------------------------
   يمكنك إضافة أصوات جديدة هنا.
   ========================================================= */

const ALARM_FREQUENCIES = {

    soft: [
        660,
        880
    ],

    digital: [
        880,
        660,
        880
    ],

    focus: [
        520,
        780,
        1040
    ],

    gentle: [
        523,
        659,
        784
    ],

    deep: [
        220,
        330,
        440
    ],

    success: [
        784,
        988,
        1174
    ]

};


/* =========================================================
   ALARM POPUP
   ========================================================= */

function createAlarmPopup() {

    if (
        document.getElementById(
            "rakkezAlarmPopup"
        )
    ) {

        return;

    }


    const popup =
        document.createElement(
            "div"
        );


    popup.id =
        "rakkezAlarmPopup";


    popup.innerHTML = `

        <div class="rakkez-alarm-box">

            <div class="rakkez-alarm-icon">
                🔔
            </div>

            <div class="rakkez-alarm-title">
                Time's up
            </div>

            <div class="rakkez-alarm-text">
                Your session has finished.
            </div>

            <button
                id="rakkezStopAlarm"
                type="button"
            >
                STOP ALARM
            </button>

        </div>

    `;


    document.body.appendChild(
        popup
    );


    const style =
        document.createElement(
            "style"
        );


    style.textContent = `

        #rakkezAlarmPopup {

            position:fixed;

            inset:0;

            z-index:99999;

            display:none;

            align-items:center;

            justify-content:center;

            background:rgba(0,0,0,.55);

            backdrop-filter:blur(14px);

        }

        #rakkezAlarmPopup.show {

            display:flex;

        }

        .rakkez-alarm-box {

            width:min(
                360px,
                calc(100vw - 40px)
            );

            padding:30px;

            border-radius:24px;

            text-align:center;

            background:rgba(
                20,
                20,
                24,
                .96
            );

            border:1px solid
                rgba(
                    255,
                    255,
                    255,
                    .1
                );

            box-shadow:
                0 30px 80px
                rgba(
                    0,
                    0,
                    0,
                    .5
                );

        }

        .rakkez-alarm-icon {

            font-size:36px;

            margin-bottom:12px;

        }

        .rakkez-alarm-title {

            font-family:
                "Space Grotesk",
                sans-serif;

            font-size:24px;

            font-weight:700;

            color:white;

            margin-bottom:8px;

        }

        .rakkez-alarm-text {

            font-family:
                "DM Sans",
                sans-serif;

            font-size:14px;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .55
                );

            margin-bottom:22px;

        }

        #rakkezStopAlarm {

            width:100%;

            height:48px;

            border:0;

            border-radius:14px;

            cursor:pointer;

            background:white;

            color:#111;

            font-weight:700;

            letter-spacing:.5px;

        }

        #rakkezStopAlarm:hover {

            opacity:.9;

        }

    `;


    document.head.appendChild(
        style
    );


    const stopButton =
        $("rakkezStopAlarm");


    if (stopButton) {

        stopButton.onclick =
            stopAlarm;

    }

}


/* =========================================================
   IS ALARM PLAYING
   ========================================================= */

function isAlarmPlaying() {

    return alarmPlaying;

}


/* =========================================================
   STOP ALARM
   ========================================================= */

function stopAlarm() {

    alarmSequenceId++;

    alarmPlaying =
        false;


    clearTimeout(
        alarmLoopTimeout
    );


    alarmLoopTimeout =
        null;


    if (alarmAudio) {

        try {

            alarmAudio.pause();

        } catch {}


        try {

            alarmAudio.currentTime =
                0;

        } catch {}


        try {

            alarmAudio.loop =
                false;

        } catch {}


        try {

            alarmAudio.removeAttribute(
                "src"
            );

            alarmAudio.load();

        } catch {}


        alarmAudio =
            null;

    }


    alarmOscillators.forEach(
        oscillator => {

            try {

                oscillator.stop();

            } catch {}


            try {

                oscillator.disconnect();

            } catch {}

        }
    );


    alarmOscillators =
        [];


    if (alarmAudioContext) {

        try {

            alarmAudioContext.close();

        } catch {}


        alarmAudioContext =
            null;

    }


    const popup =
        $("rakkezAlarmPopup");


    if (popup) {

        popup.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   PLAY REAL ALARM
   ========================================================= */

function playAlarm() {

    if (!settings.sound) {

        return;

    }


    if (
        typeof stopTestAlarm ===
        "function"
    ) {

        stopTestAlarm();

    }


    stopAlarm();


    alarmPlaying =
        true;


    createAlarmPopup();


    const popup =
        $("rakkezAlarmPopup");


    if (popup) {

        popup.classList.add(
            "show"
        );

    }


    if (
        customAlarmURL &&
        settings.alarmSound ===
            "custom"
    ) {

        if (
            typeof playCustomAlarm ===
            "function"
        ) {

            playCustomAlarm();

        }

        return;

    }


    if (
        typeof playGeneratedAlarmLoop ===
        "function"
    ) {

        playGeneratedAlarmLoop();

    }

}


/* =========================================================
   CUSTOM REAL ALARM
   ========================================================= */

function playCustomAlarm() {

    if (
        !alarmPlaying ||
        !customAlarmURL ||
        settings.alarmSound !==
            "custom" ||
        !settings.sound
    ) {

        return;

    }


    try {

        const audio =
            new Audio();


        alarmAudio =
            audio;


        audio.src =
            customAlarmURL;


        audio.volume =
            Math.max(
                0,
                Math.min(
                    1,
                    settings.alarmVolume
                )
            );


        audio.loop =
            true;


        audio.preload =
            "auto";


        audio.addEventListener(
            "error",
            error => {

                console.error(
                    "Custom alarm error:",
                    error
                );

            }
        );


        const playPromise =
            audio.play();


        if (
            playPromise &&
            typeof playPromise.catch ===
                "function"
        ) {

            playPromise.catch(
                error => {

                    console.warn(
                        "Custom alarm playback blocked:",
                        error
                    );

                }
            );

        }

    } catch (error) {

        console.error(
            "Custom alarm error:",
            error
        );

    }

}


/* =========================================================
   GENERATED REAL ALARM
   ========================================================= */

function playGeneratedAlarmLoop() {

    if (
        !alarmPlaying ||
        !settings.sound
    ) {

        return;

    }


    const sequenceId =
        alarmSequenceId;


    const frequencies =
        ALARM_FREQUENCIES[
            settings.alarmSound
        ] ||
        ALARM_FREQUENCIES.soft;


    try {

        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContextClass) {

            return;

        }


        if (alarmAudioContext) {

            try {

                alarmAudioContext.close();

            } catch {}


            alarmAudioContext =
                null;

        }


        alarmAudioContext =
            new AudioContextClass();


        if (
            alarmAudioContext.state ===
            "suspended"
        ) {

            alarmAudioContext
                .resume()
                .catch(() => {});

        }


        const now =
            alarmAudioContext.currentTime;


        alarmOscillators =
            [];


        frequencies.forEach(
            (
                frequency,
                index
            ) => {

                const oscillator =
                    alarmAudioContext
                        .createOscillator();


                const gain =
                    alarmAudioContext
                        .createGain();


                oscillator.type =
                    "sine";


                oscillator.frequency.value =
                    frequency;


                const start =
                    now +
                    index * 0.16;


                const end =
                    start +
                    0.45;


                gain.gain.setValueAtTime(
                    0.0001,
                    start
                );


                gain.gain
                    .exponentialRampToValueAtTime(
                        Math.max(
                            0.0001,
                            0.28 *
                            settings.alarmVolume
                        ),
                        start + 0.03
                    );


                gain.gain
                    .exponentialRampToValueAtTime(
                        0.0001,
                        end
                    );


                oscillator.connect(
                    gain
                );


                gain.connect(
                    alarmAudioContext.destination
                );


                oscillator.start(
                    start
                );


                oscillator.stop(
                    end
                );


                alarmOscillators.push(
                    oscillator
                );

            }
        );


        const duration =
            (
                frequencies.length *
                160
            ) + 700;


        alarmLoopTimeout =
            setTimeout(
                () => {

                    if (
                        !alarmPlaying ||
                        sequenceId !==
                            alarmSequenceId
                    ) {

                        return;

                    }


                    alarmOscillators =
                        [];


                    if (
                        alarmAudioContext
                    ) {

                        try {

                            alarmAudioContext.close();

                        } catch {}

                    }


                    alarmAudioContext =
                        null;


                    playGeneratedAlarmLoop();

                },
                duration
            );

    } catch (error) {

        console.error(
            "Alarm error:",
            error
        );

    }

}


/* =========================================================
   STOP TEST ALARM
   ========================================================= */

function stopTestAlarm() {

    testSequenceId++;

    testPlaying =
        false;


    clearTimeout(
        testTimeout
    );


    testTimeout =
        null;


    if (testAudio) {

        try {

            testAudio.pause();

        } catch {}


        try {

            testAudio.currentTime =
                0;

        } catch {}


        try {

            testAudio.loop =
                false;

        } catch {}


        try {

            testAudio.removeAttribute(
                "src"
            );

            testAudio.load();

        } catch {}


        testAudio =
            null;

    }


    testOscillators.forEach(
        oscillator => {

            try {

                oscillator.stop();

            } catch {}


            try {

                oscillator.disconnect();

            } catch {}

        }
    );


    testOscillators =
        [];


    if (testAudioContext) {

        try {

            testAudioContext.close();

        } catch {}


        testAudioContext =
            null;

    }

}


/* =========================================================
   TEST ALARM
   ========================================================= */

function testAlarm() {

    stopTestAlarm();


    if (!settings.sound) {

        return;

    }


    unlockAudio();


    stopAlarm();


    testPlaying =
        true;


    const sequenceId =
        testSequenceId;


    if (
        customAlarmURL &&
        settings.alarmSound ===
            "custom"
    ) {

        try {

            const audio =
                new Audio(
                    customAlarmURL
                );


            testAudio =
                audio;


            audio.volume =
                Math.max(
                    0,
                    Math.min(
                        1,
                        settings.alarmVolume
                    )
                );


            audio.loop =
                false;


            audio.preload =
                "auto";


            audio.onended =
                () => {

                    if (
                        sequenceId ===
                        testSequenceId
                    ) {

                        testAudio =
                            null;

                        testPlaying =
                            false;

                    }

                };


            const promise =
                audio.play();


            if (
                promise &&
                typeof promise.catch ===
                    "function"
            ) {

                promise.catch(
                    error => {

                        console.warn(
                            "Test custom alarm blocked:",
                            error
                        );


                        if (
                            sequenceId ===
                            testSequenceId
                        ) {

                            stopTestAlarm();

                        }

                    }
                );

            }

        } catch (error) {

            console.error(
                "Test custom alarm:",
                error
            );


            stopTestAlarm();

        }


        return;

    }


    try {

        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContextClass) {

            stopTestAlarm();

            return;

        }


        testAudioContext =
            new AudioContextClass();


        if (
            testAudioContext.state ===
            "suspended"
        ) {

            testAudioContext
                .resume()
                .catch(() => {});

        }


        const frequencies =
            ALARM_FREQUENCIES[
                settings.alarmSound
            ] ||
            ALARM_FREQUENCIES.soft;


        const now =
            testAudioContext.currentTime;


        testOscillators =
            [];


        frequencies.forEach(
            (
                frequency,
                index
            ) => {

                const oscillator =
                    testAudioContext
                        .createOscillator();


                const gain =
                    testAudioContext
                        .createGain();


                oscillator.type =
                    "sine";


                oscillator.frequency.value =
                    frequency;


                const start =
                    now +
                    index * 0.16;


                const end =
                    start +
                    0.45;


                gain.gain.setValueAtTime(
                    0.0001,
                    start
                );


                gain.gain
                    .exponentialRampToValueAtTime(
                        Math.max(
                            0.0001,
                            0.28 *
                            settings.alarmVolume
                        ),
                        start + 0.03
                    );


                gain.gain
                    .exponentialRampToValueAtTime(
                        0.0001,
                        end
                    );


                oscillator.connect(
                    gain
                );


                gain.connect(
                    testAudioContext.destination
                );


                oscillator.start(
                    start
                );


                oscillator.stop(
                    end
                );


                testOscillators.push(
                    oscillator
                );

            }
        );


        testTimeout =
            setTimeout(
                () => {

                    if (
                        sequenceId ===
                        testSequenceId
                    ) {

                        stopTestAlarm();

                    }

                },
                frequencies.length *
                    160 +
                    800
            );

    } catch (error) {

        console.error(
            "Test alarm error:",
            error
        );


        stopTestAlarm();

    }

}


/* =========================================================
   TEST ALARM BUTTON
   ========================================================= */

if ($("testAlarmBtn")) {

    $("testAlarmBtn")
        .addEventListener(
            "click",
            () => {

                testAlarm();

            }
        );

}


/* =========================================================
   UPLOAD CUSTOM ALARM
   ========================================================= */

const alarmUploadInput =
    $("alarmFile") ||
    $("customAlarmFile") ||
    $("alarmUpload");


if (alarmUploadInput) {

    alarmUploadInput.addEventListener(
        "change",
        e => {

            const file =
                e.target.files &&
                e.target.files[0];


            if (!file) {

                return;

            }


            if (
                !file.type.startsWith(
                    "audio/"
                )
            ) {

                alert(
                    "Please choose an audio file."
                );


                e.target.value =
                    "";


                return;

            }


            stopAlarm();

            stopTestAlarm();


            if (customAlarmURL) {

                try {

                    URL.revokeObjectURL(
                        customAlarmURL
                    );

                } catch {}

            }


            customAlarmURL =
                URL.createObjectURL(
                    file
                );


            customAlarmName =
                file.name;


            settings.alarmSound =
                "custom";


            save(
                STORAGE.settings,
                settings
            );


            if ($("alarmSound")) {

                $("alarmSound").value =
                    "custom";

            }


            setAlarmUploadStatus(
                file.name
            );


            if ($("alarmName")) {

                $("alarmName").textContent =
                    file.name;

            }


            if ($("alarmFileName")) {

                $("alarmFileName").textContent =
                    file.name;

            }


            console.log(
                "Custom alarm loaded:",
                file.name
            );

        }
    );

}


/* =========================================================
   ALARM UPLOAD STATUS
   ========================================================= */

function setAlarmUploadStatus(
    fileName = null
) {

    const existing =
        document.getElementById(
            "alarmUploadFeedback"
        );


    if (existing) {

        existing.remove();

    }


    if (!fileName) {

        return;

    }


    const feedback =
        document.createElement(
            "div"
        );


    feedback.id =
        "alarmUploadFeedback";


    feedback.style.cssText = `

        margin-top:10px;

        padding:9px 12px;

        border-radius:10px;

        display:flex;

        align-items:center;

        gap:8px;

        font-size:12px;

        line-height:1.4;

        color:#86efac;

        background:
            rgba(
                34,
                197,
                94,
                .10
            );

        border:
            1px solid
            rgba(
                34,
                197,
                94,
                .20
            );

        font-family:
            "DM Sans",
            sans-serif;

    `;


    feedback.innerHTML = `

        <span style="
            display:inline-flex;
            width:18px;
            height:18px;
            min-width:18px;
            align-items:center;
            justify-content:center;
            border-radius:50%;
            background:#22c55e;
            color:white;
            font-size:11px;
            font-weight:700;
        ">
            ✓
        </span>

        <span>
            Uploaded:
            ${escapeHTML(fileName)}
        </span>

    `;


    const input =
        $("alarmFile") ||
        $("customAlarmFile") ||
        $("alarmUpload");


    if (
        input &&
        input.parentElement
    ) {

        input.parentElement.appendChild(
            feedback
        );

    }

}


/* =========================================================
   CLEAR ALARM UPLOAD STATUS
   ========================================================= */

function clearAlarmUploadStatus() {

    const feedback =
        document.getElementById(
            "alarmUploadFeedback"
        );


    if (feedback) {

        feedback.remove();

    }


    if ($("alarmName")) {

        $("alarmName").textContent =
            "";

    }


    if ($("alarmFileName")) {

        $("alarmFileName").textContent =
            "";

    }

}


/* =========================================================
   SETTINGS UI
   ========================================================= */

function syncSettingsUI() {

    if ($("focusInput"))
        $("focusInput").value =
            settings.focus;


    if ($("shortBreakInput"))
        $("shortBreakInput").value =
            settings.shortBreak;


    if ($("longBreakInput"))
        $("longBreakInput").value =
            settings.longBreak;


    if ($("longBreakAfterInput"))
        $("longBreakAfterInput").value =
            settings.longBreakAfter;


    if ($("dailyGoalInput"))
        $("dailyGoalInput").value =
            settings.dailyGoal;


    if ($("autoStartToggle"))
        $("autoStartToggle")
            .classList.toggle(
                "active",
                settings.autoStart
            );


    if ($("smartTimerToggle"))
        $("smartTimerToggle")
            .classList.toggle(
                "active",
                settings.smartTimer
            );


    if ($("soundToggle"))
        $("soundToggle")
            .classList.toggle(
                "active",
                settings.sound
            );


    if ($("alarmVolume"))
        $("alarmVolume").value =
            settings.alarmVolume * 100;


    if ($("alarmVolumeValue"))
        $("alarmVolumeValue")
            .textContent =
                Math.round(
                    settings.alarmVolume *
                    100
                ) + "%";


    if ($("alarmSound"))
        $("alarmSound").value =
            settings.alarmSound;

}


/* =========================================================
   SETTINGS EVENTS
   ========================================================= */

if ($("focusInput")) {

    $("focusInput")
        .addEventListener(
            "change",
            e => {

                settings.focus =
                    Math.max(
                        1,
                        Number(
                            e.target.value
                        )
                    );


                if (
                    !timerState.running &&
                    timerState.mode ===
                        "focus"
                ) {

                    setMode(
                        "focus"
                    );

                }


                save(
                    STORAGE.settings,
                    settings
                );

            }
        );

}


if ($("shortBreakInput")) {

    $("shortBreakInput")
        .addEventListener(
            "change",
            e => {

                settings.shortBreak =
                    Math.max(
                        1,
                        Number(
                            e.target.value
                        )
                    );


                if (
                    !timerState.running &&
                    timerState.mode ===
                        "short"
                ) {

                    setMode(
                        "short"
                    );

                }


                save(
                    STORAGE.settings,
                    settings
                );

            }
        );

}


if ($("longBreakInput")) {

    $("longBreakInput")
        .addEventListener(
            "change",
            e => {

                settings.longBreak =
                    Math.max(
                        1,
                        Number(
                            e.target.value
                        )
                    );


                if (
                    !timerState.running &&
                    timerState.mode ===
                        "long"
                ) {

                    setMode(
                        "long"
                    );

                }


                save(
                    STORAGE.settings,
                    settings
                );

            }
        );

}


if ($("longBreakAfterInput")) {

    $("longBreakAfterInput")
        .addEventListener(
            "change",
            e => {

                settings.longBreakAfter =
                    Math.max(
                        1,
                        Number(
                            e.target.value
                        )
                    );


                save(
                    STORAGE.settings,
                    settings
                );

            }
        );

}


if ($("dailyGoalInput")) {

    $("dailyGoalInput")
        .addEventListener(
            "change",
            e => {

                settings.dailyGoal =
                    Math.max(
                        1,
                        Number(
                            e.target.value
                        )
                    );


                save(
                    STORAGE.settings,
                    settings
                );


                updateDailyGoal();

            }
        );

}


if ($("autoStartToggle")) {

    $("autoStartToggle").onclick =
        () => {

            settings.autoStart =
                !settings.autoStart;


            syncSettingsUI();


            save(
                STORAGE.settings,
                settings
            );

        };

}


if ($("smartTimerToggle")) {

    $("smartTimerToggle").onclick =
        () => {

            settings.smartTimer =
                !settings.smartTimer;


            syncSettingsUI();


            save(
                STORAGE.settings,
                settings
            );

        };

}


if ($("soundToggle")) {

    $("soundToggle").onclick =
        () => {

            settings.sound =
                !settings.sound;


            if (!settings.sound) {

                stopAlarm();

                stopTestAlarm();

            }


            syncSettingsUI();


            save(
                STORAGE.settings,
                settings
            );

        };

}


if ($("alarmVolume")) {

    $("alarmVolume")
        .addEventListener(
            "input",
            e => {

                settings.alarmVolume =
                    Number(
                        e.target.value
                    ) / 100;


                if (
                    $("alarmVolumeValue")
                ) {

                    $("alarmVolumeValue")
                        .textContent =
                            e.target.value +
                            "%";

                }


                if (alarmAudio) {

                    alarmAudio.volume =
                        settings.alarmVolume;

                }


                if (testAudio) {

                    testAudio.volume =
                        settings.alarmVolume;

                }


                save(
                    STORAGE.settings,
                    settings
                );

            }
        );

}


if ($("alarmSound")) {

    $("alarmSound")
        .addEventListener(
            "change",
            e => {

                stopTestAlarm();


                settings.alarmSound =
                    e.target.value;


                if (
                    settings.alarmSound !==
                    "custom"
                ) {

                    clearAlarmUploadStatus();

                }


                save(
                    STORAGE.settings,
                    settings
                );

            }
        );

}


/* =========================================================
   TASK SYSTEM
   ========================================================= */

function renderTasks() {

    const list =
        $("taskList");


    if (!list) {

        return;

    }


    list.innerHTML =
        "";


    if ($("taskEmpty")) {

        $("taskEmpty")
            .style.display =
                tasks.length
                    ? "none"
                    : "block";

    }


    tasks.forEach(
        task => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "task" +
                (
                    task.completed
                        ? " completed"
                        : ""
                );


            element.innerHTML = `

                <button
                    class="task-check"
                    data-action="complete"
                    data-id="${task.id}"
                >
                    ${
                        task.completed
                            ? "✓"
                            : ""
                    }
                </button>

                <div class="task-text">
                    ${escapeHTML(task.title)}
                </div>

                <div class="task-focus">
                    ${task.focusMinutes || 0}m
                </div>

                <button
                    class="task-delete"
                    data-action="delete"
                    data-id="${task.id}"
                >
                    ×
                </button>

            `;


            list.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   ADD TASK
   ========================================================= */

function addTask() {

    const input =
        $("taskInput");


    if (!input) {

        return;

    }


    const title =
        input.value.trim();


    if (!title) {

        return;

    }


    const task = {

        id:
            crypto.randomUUID
                ? crypto.randomUUID()
                : Date.now().toString(),

        title,

        completed:
            false,

        created:
            Date.now(),

        focusMinutes:
            0

    };


    tasks.unshift(
        task
    );


    save(
        STORAGE.tasks,
        tasks
    );


    input.value =
        "";


    renderTasks();

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


/* =========================================================
   TOGGLE TASK
   ========================================================= */

function toggleTask(id) {

    const task =
        tasks.find(
            t => t.id === id
        );


    if (!task) {

        return;

    }


    task.completed =
        !task.completed;


    save(
        STORAGE.tasks,
        tasks
    );


    renderTasks();

}


/* =========================================================
   DELETE TASK
   ========================================================= */

function deleteTask(id) {

    tasks =
        tasks.filter(
            t => t.id !== id
        );


    if (
        currentTaskId === id
    ) {

        currentTaskId =
            null;

    }


    save(
        STORAGE.tasks,
        tasks
    );


    renderTasks();

}


/* =========================================================
   SELECT TASK
   ========================================================= */

function selectTask(id) {

    currentTaskId =
        id;


    updateCurrentTask();


    closeOverlayById(
        "tasksOverlay"
    );

}


/* =========================================================
   CURRENT TASK
   ========================================================= */

function updateCurrentTask() {

    const container =
        $("currentTask");


    if (!container) {

        return;

    }


    const lang =
        localStorage.getItem(
            "language"
        ) ||
        localStorage.getItem(
            "rakkez_language"
        ) ||
        "en";


    if (!currentTaskId) {

        container.innerHTML =
            lang === "ar"

                ? "<span>لم يتم اختيار مهمة</span>"

                : "<span>NO TASK SELECTED</span>";

        return;

    }


    const task =
        tasks.find(
            t =>
                t.id ===
                currentTaskId
        );


    if (!task) {

        currentTaskId =
            null;


        container.innerHTML =
            lang === "ar"

                ? "<span>لم يتم اختيار مهمة</span>"

                : "<span>NO TASK SELECTED</span>";

        return;

    }


    container.innerHTML = `

        <span>

            ${
                lang === "ar"
                    ? "التركيز على:"
                    : "FOCUSING ON:"
            }

            ${escapeHTML(task.title)}

        </span>

    `;

}


/* =========================================================
   TASK EVENTS
   ========================================================= */

if ($("addTaskBtn")) {

    $("addTaskBtn").onclick =
        addTask;

}


if ($("taskInput")) {

    $("taskInput")
        .addEventListener(
            "keydown",
            e => {

                if (e.key === "Enter") {

                    addTask();

                }

            }
        );

}


if ($("taskList")) {

    $("taskList")
        .addEventListener(
            "click",
            e => {

                const button =
                    e.target.closest(
                        "button"
                    );


                if (!button) {

                    return;

                }


                const action =
                    button.dataset.action;


                const id =
                    button.dataset.id;


                if (
                    action ===
                    "complete"
                ) {

                    toggleTask(id);

                }


                if (
                    action ===
                    "delete"
                ) {

                    deleteTask(id);

                }

            }
        );


    $("taskList")
        .addEventListener(
            "dblclick",
            e => {

                const task =
                    e.target.closest(
                        ".task"
                    );


                if (!task) {

                    return;

                }


                const check =
                    task.querySelector(
                        "[data-id]"
                    );


                if (check) {

                    selectTask(
                        check.dataset.id
                    );

                }

            }
        );

}


/* =========================================================
   OVERLAY / PANEL SYSTEM
   ---------------------------------------------------------
   هذا هو الجزء المهم الذي تم إصلاحه.

   المشكلة القديمة:
   كان عندك فتح للـ overlays فقط:

       classList.add("show")

   لكن لم يكن هناك نظام مركزي يغلقها.

   الآن:
   - X buttons
   - Background click
   - Escape
   - data-close
   كلها تعمل.
   ========================================================= */


/* =========================================================
   CLOSE OVERLAY BY ID
   ---------------------------------------------------------
   يمكنك استخدام هذه الدالة من أي مكان:

   closeOverlayById("settingsOverlay");

   closeOverlayById("tasksOverlay");

   closeOverlayById("mediaOverlay");

   ========================================================= */

function closeOverlayById(id) {

    const overlay =
        $(id);


    if (!overlay) {

        return;

    }


    overlay.classList.remove(
        "show"
    );


    overlay.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
     * لو الـ CSS يعتمد على display
     * نخليه يرجع للحالة الطبيعية.
     */

    if (
        overlay.style.display ===
        "flex"
    ) {

        overlay.style.display =
            "";

    }


    /*
     * مهم جدًا:
     * لا نترك body مقفولًا بعد إغلاق
     * آخر overlay.
     */

    syncBodyScrollLock();

}


/* =========================================================
   OPEN OVERLAY BY ID
   ========================================================= */

function openOverlayById(id) {

    const overlay =
        $(id);


    if (!overlay) {

        console.warn(
            "RakkeZ: Overlay not found:",
            id
        );

        return;

    }


    overlay.classList.add(
        "show"
    );


    overlay.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CHECK IF ANY MAIN OVERLAY IS OPEN
   ========================================================= */

function syncBodyScrollLock() {

    const overlays = [

        "settingsOverlay",

        "tasksOverlay",

        "mediaOverlay",

        "confirmOverlay",

        "updatesModal"

    ];


    const anyOpen =
        overlays.some(
            id => {

                const element =
                    $(id);


                return (
                    element &&
                    element.classList.contains(
                        "show"
                    )
                );

            }
        );


    document.body.style.overflow =
        anyOpen
            ? "hidden"
            : "";

}


/* =========================================================
   CLOSE ALL OVERLAYS
   ========================================================= */

function closeAllOverlays() {

    const overlays = [

        "settingsOverlay",

        "tasksOverlay",

        "mediaOverlay",

        "confirmOverlay",

        "updatesModal"

    ];


    overlays.forEach(
        id => {

            const overlay =
                $(id);


            if (!overlay) {

                return;

            }


            overlay.classList.remove(
                "show"
            );


            overlay.setAttribute(
                "aria-hidden",
                "true"
            );


            if (
                overlay.style.display ===
                "flex"
            ) {

                overlay.style.display =
                    "";

            }

        }
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   OPEN SETTINGS
   ========================================================= */

if ($("settingsOpen")) {

    $("settingsOpen").onclick =
        () => {

            syncSettingsUI();

            openOverlayById(
                "settingsOverlay"
            );

        };

}


/* =========================================================
   OPEN TASKS
   ========================================================= */

if ($("tasksOpen")) {

    $("tasksOpen").onclick =
        () => {

            renderTasks();

            openOverlayById(
                "tasksOverlay"
            );

        };

}


/* =========================================================
   OPEN MEDIA
   ========================================================= */

if ($("mediaOpen")) {

    $("mediaOpen").onclick =
        () => {

            openOverlayById(
                "mediaOverlay"
            );

        };

}


/* =========================================================
   X BUTTONS — EXPLICIT SUPPORT
   ---------------------------------------------------------
   لو الـ HTML عندك يحتوي على:

       id="closeSettings"

       id="closeTasks"

       id="closeMedia"

       id="closeConfirm"

   فهي ستعمل مباشرة.

   ========================================================= */

const CLOSE_BUTTONS = {

    closeSettings:
        "settingsOverlay",

    closeTasks:
        "tasksOverlay",

    closeMedia:
        "mediaOverlay",

    closeConfirm:
        "confirmOverlay",

    closeUpdates:
        "updatesModal"

};


Object.entries(
    CLOSE_BUTTONS
).forEach(
    ([buttonId, overlayId]) => {

        const button =
            $(buttonId);


        if (!button) {

            return;

        }


        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                closeOverlayById(
                    overlayId
                );

            }
        );

    }
);


/* =========================================================
   UNIVERSAL CLOSE BUTTON
   ---------------------------------------------------------
   أي زر في HTML مثل:

       <button data-close="settingsOverlay">×</button>

   سيعمل تلقائيًا.

   وهذا مفيد جدًا للمستقبل.
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-close]"
            );


        if (!button) {

            return;

        }


        const overlayId =
            button.dataset.close;


        if (!overlayId) {

            return;

        }


        event.preventDefault();

        event.stopPropagation();


        closeOverlayById(
            overlayId
        );

    }
);


/* =========================================================
   BACKGROUND CLICK
   ---------------------------------------------------------
   الضغط على الخلفية خارج الـ panel يغلقه.
   ========================================================= */

[
    "settingsOverlay",

    "tasksOverlay",

    "mediaOverlay",

    "confirmOverlay",

    "updatesModal"

].forEach(
    overlayId => {

        const overlay =
            $(overlayId);


        if (!overlay) {

            return;

        }


        overlay.addEventListener(
            "click",
            event => {

                /*
                 * مهم:
                 * لا تغلق إذا ضغط المستخدم
                 * داخل الـ box نفسه.
                 */

                if (
                    event.target ===
                    overlay
                ) {

                    closeOverlayById(
                        overlayId
                    );

                }

            }
        );

    }
);


/* =========================================================
   ESCAPE CLOSE
   ---------------------------------------------------------
   الضغط على ESC يغلق آخر/كل الـ overlays.
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        closeAllOverlays();

    }
);


/* =========================================================
   FOCUS ONLY
   ========================================================= */

let focusOnly =
    false;


function toggleFocusOnly() {

    focusOnly =
        !focusOnly;


    document.body
        .classList.toggle(
            "focus-only",
            focusOnly
        );

}


if ($("focusOnlyBtn")) {

    $("focusOnlyBtn").onclick =
        toggleFocusOnly;

}


if ($("focusExit")) {

    $("focusExit").onclick =
        toggleFocusOnly;

}


/* =========================================================
   RESET
   ========================================================= */

function openResetConfirmation() {

    openOverlayById(
        "confirmOverlay"
    );

}


if ($("resetBtn")) {

    $("resetBtn").onclick =
        openResetConfirmation;

}


if ($("resetStatsBtn")) {

    $("resetStatsBtn").onclick =
        openResetConfirmation;

}


if ($("confirmReset")) {

    $("confirmReset").onclick =
        () => {

            stopAlarm();

            stopTestAlarm();


            stats = {

                totalFocusSeconds: 0,

                sessions: 0,

                streak: 0,

                lastFocusDate:
                    null,

                dailyFocus: {}

            };


            tasks =
                [];


            localStorage.removeItem(
                "rakkez_last_focus_day"
            );


            save(
                STORAGE.stats,
                stats
            );


            save(
                STORAGE.tasks,
                tasks
            );


            resetTimer();

            renderTasks();

            updateStats();


            closeOverlayById(
                "confirmOverlay"
            );

        };

}


/* =========================================================
   MEDIA TABS
   ========================================================= */

document
    .querySelectorAll(
        ".media-tab"
    )
    .forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".media-tab"
                        )
                        .forEach(
                            t =>
                                t.classList
                                    .remove(
                                        "active"
                                    )
                        );


                    document
                        .querySelectorAll(
                            ".media-content"
                        )
                        .forEach(
                            c =>
                                c.classList
                                    .remove(
                                        "active"
                                    )
                        );


                    tab.classList.add(
                        "active"
                    );


                    const content =
                        $(
                            tab.dataset.media +
                            "Content"
                        );


                    if (content) {

                        content.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   YOUTUBE
   ========================================================= */

function getYouTubeId(url) {

    try {

        const parsed =
            new URL(url);


        const hostname =
            parsed.hostname.toLowerCase();


        if (
            hostname ===
            "youtu.be"
        ) {

            return parsed.pathname
                .replace("/", "")
                .split("/")[0]
                .split("?")[0];

        }


        if (
            hostname.includes(
                "youtube.com"
            ) &&
            parsed.searchParams.get(
                "v"
            )
        ) {

            return parsed.searchParams.get(
                "v"
            );

        }


        if (
            parsed.pathname.startsWith(
                "/embed/"
            )
        ) {

            return parsed.pathname
                .split("/embed/")[1]
                .split("/")[0];

        }


        if (
            parsed.pathname.startsWith(
                "/shorts/"
            )
        ) {

            return parsed.pathname
                .split("/shorts/")[1]
                .split("/")[0];

        }

    } catch (error) {

        console.error(
            "Invalid YouTube URL:",
            error
        );

    }


    return null;

}


if ($("youtubePlay")) {

    $("youtubePlay").onclick =
        () => {

            const url =
                $("youtubeInput")
                    .value
                    .trim();


            if (!url) {

                alert(
                    "Please paste a YouTube URL."
                );

                return;

            }


            const videoId =
                getYouTubeId(url);


            if (!videoId) {

                alert(
                    "Invalid YouTube URL."
                );

                return;

            }


            const embedUrl =
                "https://www.youtube.com/embed/" +
                encodeURIComponent(
                    videoId
                ) +
                "?autoplay=1" +
                "&rel=0" +
                "&enablejsapi=1";


            $("youtubeEmbed")
                .innerHTML = `

                    <iframe
                        src="${embedUrl}"
                        title="YouTube Player"
                        allow="
                            accelerometer;
                            autoplay;
                            clipboard-write;
                            encrypted-media;
                            gyroscope;
                            picture-in-picture;
                            web-share
                        "
                        referrerpolicy="
                            strict-origin-when-cross-origin
                        "
                        allowfullscreen>
                    </iframe>

                `;


            $("youtubeEmbed")
                .classList
                .add("show");


            showNowPlaying(
                "YouTube Video",
                "YouTube",
                "▶"
            );

        };

}


/* =========================================================
   SPOTIFY EMBED
   ========================================================= */

function spotifyEmbedUrl(url) {

    try {

        const parsed =
            new URL(url);


        const parts =
            parsed.pathname
                .split("/")
                .filter(Boolean);


        if (parts.length >= 2) {

            return (
                "https://open.spotify.com/embed/" +
                parts[0] +
                "/" +
                parts[1] +
                "?utm_source=generator"
            );

        }

    } catch {}


    return null;

}


if ($("spotifyPlay")) {

    $("spotifyPlay").onclick =
        () => {

            const url =
                $("spotifyInput")
                    .value
                    .trim();


            const embed =
                spotifyEmbedUrl(
                    url
                );


            if (!embed) {

                alert(
                    "Paste a Spotify track, playlist or album URL."
                );

                return;

            }


            $("spotifyEmbed")
                .innerHTML = `

                    <iframe
                        src="${embed}"
                        allow="
                            autoplay;
                            clipboard-write;
                            encrypted-media;
                            fullscreen;
                            picture-in-picture
                        ">
                    </iframe>

                `;


            $("spotifyEmbed")
                .classList
                .add("show");


            showNowPlaying(
                "Spotify",
                "Spotify",
                "S"
            );

        };

}


/* =========================================================
   LOCAL MEDIA
   ========================================================= */

let localMediaURL =
    null;


/* =========================================================
   UPLOAD FEEDBACK
   ========================================================= */

function showUploadFeedback(
    message,
    success = true
) {

    let feedback =
        document.getElementById(
            "uploadFeedback"
        );


    if (!feedback) {

        feedback =
            document.createElement(
                "div"
            );


        feedback.id =
            "uploadFeedback";


        feedback.style.cssText = `

            margin-top:12px;

            padding:10px 14px;

            border-radius:12px;

            font-size:13px;

            font-family:
                "DM Sans",
                sans-serif;

            display:flex;

            align-items:center;

            gap:8px;

            transition:
                all .25s ease;

        `;


        const mediaFile =
            document.getElementById(
                "mediaFile"
            );


        if (
            mediaFile &&
            mediaFile.parentElement
        ) {

            mediaFile.parentElement
                .appendChild(
                    feedback
                );

        } else {

            document.body.appendChild(
                feedback
            );

        }

    }


    feedback.innerHTML =
        success

            ? `

                <span style="
                    display:inline-flex;
                    width:20px;
                    height:20px;
                    align-items:center;
                    justify-content:center;
                    border-radius:50%;
                    background:#22c55e;
                    color:white;
                    font-size:12px;
                    font-weight:700;
                ">
                    ✓
                </span>

                <span>
                    ${escapeHTML(message)}
                </span>

            `

            : `

                <span style="
                    display:inline-flex;
                    width:20px;
                    height:20px;
                    align-items:center;
                    justify-content:center;
                    border-radius:50%;
                    background:#ef4444;
                    color:white;
                    font-size:12px;
                    font-weight:700;
                ">
                    !
                </span>

                <span>
                    ${escapeHTML(message)}
                </span>

            `;


    feedback.style.background =
        success
            ? "rgba(34,197,94,.10)"
            : "rgba(239,68,68,.10)";


    feedback.style.border =
        success
            ? "1px solid rgba(34,197,94,.20)"
            : "1px solid rgba(239,68,68,.20)";


    feedback.style.color =
        success
            ? "#86efac"
            : "#fca5a5";

}


/* =========================================================
   LOCAL MEDIA UPLOAD
   ========================================================= */

if ($("mediaFile")) {

    $("mediaFile")
        .addEventListener(
            "change",
            e => {

                const file =
                    e.target.files &&
                    e.target.files[0];


                if (!file) {

                    return;

                }


                if (localMediaURL) {

                    URL.revokeObjectURL(
                        localMediaURL
                    );

                    localMediaURL =
                        null;

                }


                if ($("audioPlayer")) {

                    $("audioPlayer")
                        .pause();

                    $("audioPlayer")
                        .removeAttribute(
                            "src"
                        );

                    $("audioPlayer")
                        .style.display =
                            "none";

                }


                if ($("videoPlayer")) {

                    $("videoPlayer")
                        .pause();

                    $("videoPlayer")
                        .removeAttribute(
                            "src"
                        );

                    $("videoPlayer")
                        .style.display =
                            "none";

                }


                const isAudio =
                    file.type.startsWith(
                        "audio/"
                    );


                const isVideo =
                    file.type.startsWith(
                        "video/"
                    );


                if (
                    !isAudio &&
                    !isVideo
                ) {

                    showUploadFeedback(
                        "Unsupported file. Please upload an audio or video file.",
                        false
                    );


                    e.target.value =
                        "";


                    return;

                }


                localMediaURL =
                    URL.createObjectURL(
                        file
                    );


                if (isAudio) {

                    const player =
                        $("audioPlayer");


                    if (!player) {

                        return;

                    }


                    player.src =
                        localMediaURL;


                    player.loop =
                        true;


                    player.volume =
                        1;


                    player.style.display =
                        "block";


                    player.load();


                    player.play()
                        .then(
                            () => {

                                showUploadFeedback(
                                    "Uploaded • Playing in loop"
                                );

                            }
                        )
                        .catch(
                            error => {

                                console.warn(
                                    "Autoplay blocked:",
                                    error
                                );


                                showUploadFeedback(
                                    "Uploaded • Press play to start"
                                );

                            }
                        );


                    if ($("mediaName")) {

                        $("mediaName")
                            .textContent =
                                file.name;

                    }


                    if ($("mediaSource")) {

                        $("mediaSource")
                            .textContent =
                                "Local Audio";

                    }


                    showNowPlaying(
                        file.name,
                        "Local Audio",
                        "♫"
                    );

                }


                if (isVideo) {

                    const player =
                        $("videoPlayer");


                    if (!player) {

                        return;

                    }


                    player.src =
                        localMediaURL;


                    player.loop =
                        true;


                    player.muted =
                        false;


                    player.style.display =
                        "block";


                    player.load();


                    player.play()
                        .then(
                            () => {

                                showUploadFeedback(
                                    "Uploaded • Playing in loop"
                                );

                            }
                        )
                        .catch(
                            error => {

                                console.warn(
                                    "Autoplay blocked:",
                                    error
                                );


                                showUploadFeedback(
                                    "Uploaded • Press play to start"
                                );

                            }
                        );


                    if ($("mediaName")) {

                        $("mediaName")
                            .textContent =
                                file.name;

                    }


                    if ($("mediaSource")) {

                        $("mediaSource")
                            .textContent =
                                "Local Video";

                    }


                    showNowPlaying(
                        file.name,
                        "Local Video",
                        "▶"
                    );

                }

            }
        );

}


/* =========================================================
   NOW PLAYING
   ========================================================= */

function showNowPlaying(
    name,
    source,
    artwork
) {

    if ($("mediaName")) {

        $("mediaName").textContent =
            name;

    }


    if ($("mediaSource")) {

        $("mediaSource").textContent =
            source;

    }


    if ($("mediaArtwork")) {

        $("mediaArtwork").textContent =
            artwork;

    }


    if ($("nowPlaying")) {

        $("nowPlaying")
            .classList
            .add("show");

    }

}


/* =========================================================
   SPOTIFY OAUTH — PKCE
   ========================================================= */

let spotifyUser =
    null;


function randomString(
    length = 64
) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";


    let result =
        "";


    const array =
        new Uint8Array(
            length
        );


    crypto.getRandomValues(
        array
    );


    array.forEach(
        value => {

            result +=
                chars[
                    value %
                    chars.length
                ];

        }
    );


    return result;

}


async function sha256(value) {

    const data =
        new TextEncoder()
            .encode(value);


    return crypto.subtle.digest(
        "SHA-256",
        data
    );

}


function base64url(buffer) {

    return btoa(
        String.fromCharCode(
            ...new Uint8Array(
                buffer
            )
        )
    )
        .replace(
            /\+/g,
            "-"
        )
        .replace(
            /\//g,
            "_"
        )
        .replace(
            /=/g,
            ""
        );

}


async function spotifyLogin() {

    if (
        !window.RAKKEZ_CONFIG ||
        !RAKKEZ_CONFIG.spotify ||
        !RAKKEZ_CONFIG.spotify.clientId ||
        !RAKKEZ_CONFIG.spotify.clientId.trim() ||
        RAKKEZ_CONFIG.spotify.clientId ===
            "YOUR_SPOTIFY_CLIENT_ID"
    ) {

        alert(
            "Add your Spotify Client ID inside config.js first."
        );

        return;

    }


    const verifier =
        randomString(64);


    const challenge =
        base64url(
            await sha256(
                verifier
            )
        );


    sessionStorage.setItem(
        "rakkez_spotify_verifier",
        verifier
    );


    const params =
        new URLSearchParams({

            client_id:
                RAKKEZ_CONFIG
                    .spotify
                    .clientId,

            response_type:
                "code",

            redirect_uri:
                RAKKEZ_CONFIG
                    .spotify
                    .redirectUri,

            code_challenge_method:
                "S256",

            code_challenge:
                challenge,

            scope:
                RAKKEZ_CONFIG
                    .spotify
                    .scopes

        });


    window.location.href =
        "https://accounts.spotify.com/authorize?" +
        params.toString();

}


async function handleSpotifyCallback() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const code =
        params.get("code");


    if (!code) {

        return;

    }


    const verifier =
        sessionStorage.getItem(
            "rakkez_spotify_verifier"
        );


    if (!verifier) {

        return;

    }


    try {

        const body =
            new URLSearchParams({

                client_id:
                    RAKKEZ_CONFIG
                        .spotify
                        .clientId,

                grant_type:
                    "authorization_code",

                code,

                redirect_uri:
                    RAKKEZ_CONFIG
                        .spotify
                        .redirectUri,

                code_verifier:
                    verifier

            });


        const response =
            await fetch(
                "https://accounts.spotify.com/api/token",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/x-www-form-urlencoded"

                    },

                    body

                }
            );


        const token =
            await response.json();


        if (!token.access_token) {

            console.error(token);

            return;

        }


        save(
            STORAGE.spotify,
            {

                accessToken:
                    token.access_token,

                expiresAt:
                    Date.now() +
                    token.expires_in *
                    1000

            }
        );


        sessionStorage.removeItem(
            "rakkez_spotify_verifier"
        );


        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );


        await loadSpotifyUser();

    } catch (error) {

        console.error(
            "Spotify OAuth:",
            error
        );

    }

}


async function loadSpotifyUser() {

    const auth =
        load(
            STORAGE.spotify,
            null
        );


    if (
        !auth ||
        !auth.accessToken
    ) {

        updateSpotifyUI(
            null
        );

        return;

    }


    try {

        const response =
            await fetch(
                "https://api.spotify.com/v1/me",
                {

                    headers: {

                        Authorization:
                            "Bearer " +
                            auth.accessToken

                    }

                }
            );


        if (!response.ok) {

            localStorage.removeItem(
                STORAGE.spotify
            );


            updateSpotifyUI(
                null
            );


            return;

        }


        spotifyUser =
            await response.json();


        updateSpotifyUI(
            spotifyUser
        );

    } catch {

        updateSpotifyUI(
            null
        );

    }

}


function updateSpotifyUI(user) {

    if (user) {

        if ($("spotifyStatus")) {

            $("spotifyStatus")
                .textContent =
                    user.display_name ||
                    user.id;

        }


        if ($("spotifyLogin")) {

            $("spotifyLogin")
                .textContent =
                    "Connected";


            $("spotifyLogin")
                .classList
                .add("connected");

        }


        if ($("spotifyUser")) {

            $("spotifyUser")
                .textContent =
                    "Connected: " +
                    (
                        user.display_name ||
                        user.id
                    );

        }

    } else {

        if ($("spotifyStatus")) {

            $("spotifyStatus")
                .textContent =
                    "Not connected";

        }


        if ($("spotifyLogin")) {

            $("spotifyLogin")
                .textContent =
                    "Connect";


            $("spotifyLogin")
                .classList
                .remove(
                    "connected"
                );

        }

    }

}


if ($("spotifyLogin")) {

    $("spotifyLogin").onclick =
        spotifyLogin;

}


/* =========================================================
   GOOGLE / YOUTUBE OAUTH
   ========================================================= */

let googleUser =
    null;

let googleTokenClient =
    null;


function initializeGoogle() {

    if (
        typeof google ===
        "undefined"
    ) {

        return;

    }


    if (
        !window.RAKKEZ_CONFIG ||
        !RAKKEZ_CONFIG.google ||
        !RAKKEZ_CONFIG.google.clientId ||
        RAKKEZ_CONFIG.google.clientId.includes(
            "YOUR_GOOGLE"
        )
    ) {

        return;

    }


    googleTokenClient =
        google.accounts.oauth2
            .initTokenClient({

                client_id:
                    RAKKEZ_CONFIG
                        .google
                        .clientId,

                scope:
                    "openid profile email https://www.googleapis.com/auth/youtube.readonly",

                callback:
                    handleGoogleToken

            });

}


function googleLogin() {

    if (!googleTokenClient) {

        alert(
            "Add your Google Client ID inside config.js first."
        );

        return;

    }


    googleTokenClient
        .requestAccessToken();

}


async function handleGoogleToken(
    response
) {

    if (response.error) {

        console.error(
            response
        );

        return;

    }


    const token =
        response.access_token;


    save(
        STORAGE.google,
        {

            accessToken:
                token,

            created:
                Date.now()

        }
    );


    try {

        const profileResponse =
            await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {

                    headers: {

                        Authorization:
                            "Bearer " +
                            token

                    }

                }
            );


        googleUser =
            await profileResponse.json();


        updateGoogleUI(
            googleUser
        );

    } catch (error) {

        console.error(
            error
        );

    }

}


function updateGoogleUI(user) {

    if (user) {

        const name =
            user.name ||
            user.email ||
            "Connected";


        if ($("googleStatus")) {

            $("googleStatus")
                .textContent =
                    name;

        }


        if ($("googleLogin")) {

            $("googleLogin")
                .textContent =
                    "Connected";


            $("googleLogin")
                .classList
                .add("connected");

        }


        if ($("youtubeUser")) {

            $("youtubeUser")
                .textContent =
                    "Connected: " +
                    name;

        }

    } else {

        if ($("googleStatus")) {

            $("googleStatus")
                .textContent =
                    "Not connected";

        }


        if ($("googleLogin")) {

            $("googleLogin")
                .textContent =
                    "Connect";


            $("googleLogin")
                .classList
                .remove(
                    "connected"
                );

        }

    }

}


if ($("googleLogin")) {

    $("googleLogin").onclick =
        googleLogin;

}


/* =========================================================
   THEME
   ---------------------------------------------------------
   لو applyTheme موجودة في ملف آخر، نستخدمها.
   لو غير موجودة، لا نكسر التطبيق.
   ========================================================= */

function applyTheme() {

    if (
        typeof window.applyRakkeZTheme ===
        "function"
    ) {

        window.applyRakkeZTheme(
            settings.theme
        );

        return;

    }


    document.documentElement
        .dataset.theme =
            settings.theme;

}


/* =========================================================
   AMBIENT
   ---------------------------------------------------------
   لو restoreAmbient موجودة في ملف آخر،
   يتم استدعاؤها بشكل آمن.
   ========================================================= */

function restoreAmbient() {

    if (
        typeof window.restoreRakkeZAmbient ===
        "function"
    ) {

        window.restoreRakkeZAmbient();

    }

}


/* =========================================================
   TIMER BUTTON
   ========================================================= */

if ($("startBtn")) {

    $("startBtn").onclick =
        startTimer;

}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
    "keydown",
    e => {

        if (
            e.target.tagName ===
                "INPUT" ||
            e.target.tagName ===
                "TEXTAREA" ||
            e.target.isContentEditable
        ) {

            return;

        }


        if (
            e.code ===
            "Space"
        ) {

            e.preventDefault();

            startTimer();

        }


        if (
            e.key.toLowerCase() ===
            "r"
        ) {

            openResetConfirmation();

        }


        if (
            e.key.toLowerCase() ===
            "f"
        ) {

            toggleFocusOnly();

        }

    }
);


/* =========================================================
   LOADING SCREEN SAFE HANDLER
   ========================================================= */

function finishLoadingScreen() {

    const loading =
        document.getElementById(
            "loadingScreen"
        ) ||

        document.getElementById(
            "loader"
        ) ||

        document.querySelector(
            ".loading-screen"
        ) ||

        document.querySelector(
            ".loader"
        );


    if (!loading) {

        return;

    }


    loading.classList.add(
        "hide"
    );


    setTimeout(
        () => {

            try {

                loading.style.display =
                    "none";

            } catch {}

        },
        500
    );

}


/* =========================================================
   SAFE ASYNC
   ========================================================= */

function safeAsync(fn) {

    try {

        const result =
            fn();


        if (
            result &&
            typeof result.catch ===
                "function"
        ) {

            result.catch(
                error => {

                    console.warn(
                        "Background initialization failed:",
                        error
                    );

                }
            );

        }

    } catch (error) {

        console.warn(
            "Background initialization failed:",
            error
        );

    }

}

/* =========================================================
   THEME SYSTEM
   =========================================================
   
   DARK MODE = NIGHT
   LIGHT MODE = SUN
   
   This system:
   - Saves the selected theme
   - Restores it after refresh
   - Supports existing theme buttons
   - Does NOT affect timer/statistics
   - Uses the existing settings.theme value
   
   IMPORTANT:
   If your HTML uses different IDs for the theme buttons,
   change the IDs inside THEME_SELECTORS below.
   ========================================================= */

const THEME_SELECTORS = {

    /* Main theme buttons */

    dark:
        [
            "darkMode",
            "nightMode",
            "nightBtn",
            "darkBtn",
            "themeDark"
        ],

    light:
        [
            "lightMode",
            "sunMode",
            "sunBtn",
            "lightBtn",
            "themeLight"
        ],

    /* Optional single toggle button */

    toggle:
        [
            "themeToggle",
            "themeBtn",
            "themeSwitch"
        ]

};


/* =========================================================
   GET FIRST EXISTING ELEMENT
   ========================================================= */

function getFirstExistingElement(ids) {

    for (const id of ids) {

        const element = $(id);

        if (element) {
            return element;
        }

    }

    return null;

}


/* =========================================================
   APPLY THEME
   ========================================================= */

function applyTheme() {

    let theme =
        settings.theme === "light"
            ? "light"
            : "dark";


    /* -----------------------------------------------------
       HTML ATTRIBUTE
       ----------------------------------------------------- */

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );


    /* -----------------------------------------------------
       BODY CLASS
       ----------------------------------------------------- */

    document.body.classList.toggle(
        "light-mode",
        theme === "light"
    );

    document.body.classList.toggle(
        "dark-mode",
        theme === "dark"
    );


    /* -----------------------------------------------------
       OPTIONAL BODY DATA ATTRIBUTE
       ----------------------------------------------------- */

    document.body.setAttribute(
        "data-theme",
        theme
    );


    /* -----------------------------------------------------
       UPDATE THEME BUTTONS
       ----------------------------------------------------- */

    const darkButton =
        getFirstExistingElement(
            THEME_SELECTORS.dark
        );

    const lightButton =
        getFirstExistingElement(
            THEME_SELECTORS.light
        );


    if (darkButton) {

        darkButton.classList.toggle(
            "active",
            theme === "dark"
        );

        darkButton.setAttribute(
            "aria-pressed",
            theme === "dark"
                ? "true"
                : "false"
        );

    }


    if (lightButton) {

        lightButton.classList.toggle(
            "active",
            theme === "light"
        );

        lightButton.setAttribute(
            "aria-pressed",
            theme === "light"
                ? "true"
                : "false"
        );

    }


    /* -----------------------------------------------------
       UPDATE TOGGLE BUTTON
       ----------------------------------------------------- */

    const toggleButton =
        getFirstExistingElement(
            THEME_SELECTORS.toggle
        );


    if (toggleButton) {

        toggleButton.classList.toggle(
            "active",
            theme === "light"
        );

        toggleButton.setAttribute(
            "aria-pressed",
            theme === "light"
                ? "true"
                : "false"
        );

    }


    /* -----------------------------------------------------
       SAVE
       ----------------------------------------------------- */

    settings.theme = theme;

    save(
        STORAGE.settings,
        settings
    );

}


/* =========================================================
   SET THEME
   ========================================================= */

function setTheme(theme) {

    if (
        theme !== "dark" &&
        theme !== "light"
    ) {

        theme = "dark";

    }


    settings.theme = theme;

    save(
        STORAGE.settings,
        settings
    );


    applyTheme();

}


/* =========================================================
   TOGGLE THEME
   ========================================================= */

function toggleTheme() {

    const currentTheme =
        settings.theme === "light"
            ? "light"
            : "dark";


    setTheme(
        currentTheme === "dark"
            ? "light"
            : "dark"
    );

}


/* =========================================================
   THEME EVENTS
   ========================================================= */

function initializeThemeEvents() {

    /* -----------------------------------------------------
       NIGHT / DARK
       ----------------------------------------------------- */

    const darkButton =
        getFirstExistingElement(
            THEME_SELECTORS.dark
        );


    if (darkButton) {

        darkButton.addEventListener(
            "click",
            function () {

                setTheme("dark");

            }
        );

    }


    /* -----------------------------------------------------
       SUN / LIGHT
       ----------------------------------------------------- */

    const lightButton =
        getFirstExistingElement(
            THEME_SELECTORS.light
        );


    if (lightButton) {

        lightButton.addEventListener(
            "click",
            function () {

                setTheme("light");

            }
        );

    }


    /* -----------------------------------------------------
       SINGLE TOGGLE
       ----------------------------------------------------- */

    const toggleButton =
        getFirstExistingElement(
            THEME_SELECTORS.toggle
        );


    if (
        toggleButton &&
        !darkButton &&
        !lightButton
    ) {

        toggleButton.addEventListener(
            "click",
            toggleTheme
        );

    }

}


/* =========================================================
   GLOBAL THEME API
   ========================================================= */

window.RakkeZTheme = {

    set: setTheme,

    toggle: toggleTheme,

    apply: applyTheme,

    get: function () {

        return settings.theme === "light"
            ? "light"
            : "dark";

    }

};


/* =========================================================
   STARTUP
   ========================================================= */

async function init() {

    /* =====================================================
       ALARM POPUP
       ===================================================== */

    try {

        createAlarmPopup();

    } catch (error) {

        console.warn(
            "Alarm popup initialization failed:",
            error
        );

    }


    /* =====================================================
       CUSTOM ALARM
       ===================================================== */

    try {

        if (
            settings.alarmSound ===
                "custom" &&
            !customAlarmURL
        ) {

            settings.alarmSound =
                "soft";


            save(
                STORAGE.settings,
                settings
            );

        }

    } catch (error) {

        console.warn(
            "Alarm settings initialization failed:",
            error
        );

    }


    /* =====================================================
       STREAK
       ===================================================== */

    try {

        updateStreak();

    } catch (error) {

        console.warn(
            "Streak initialization failed:",
            error
        );

    }


    /* =====================================================
       TIMER
       ===================================================== */

    try {

        restoreTimer();

    } catch (error) {

        console.warn(
            "Timer restore failed:",
            error
        );


        timerState.mode =
            "focus";


        const focusMinutes =
            Number(
                settings.focus
            );


        const safeFocus =
            Number.isFinite(
                focusMinutes
            ) &&
            focusMinutes > 0

                ? focusMinutes

                : DEFAULT_SETTINGS.focus;


        timerState.total =
            Math.floor(
                safeFocus * 60
            );


        timerState.remaining =
            timerState.total;


        timerState.running =
            false;


        timerState.interval =
            null;

    }


    /* =====================================================
       UI
       ===================================================== */

    try {

        updateTimerUI();

    } catch (error) {

        console.warn(
            "Timer UI initialization failed:",
            error
        );

    }


    try {

        updateStats();

    } catch (error) {

        console.warn(
            "Stats initialization failed:",
            error
        );

    }


    try {

        syncSettingsUI();

    } catch (error) {

        console.warn(
            "Settings UI initialization failed:",
            error
        );

    }


    try {

        renderTasks();

    } catch (error) {

        console.warn(
            "Tasks initialization failed:",
            error
        );

    }


    try {

        applyTheme();

    } catch (error) {

        console.warn(
            "Theme initialization failed:",
            error
        );

    }


    /* =====================================================
       AMBIENT
       ===================================================== */

    try {

        restoreAmbient();

    } catch (error) {

        console.warn(
            "Ambient initialization failed:",
            error
        );

    }


    /* =====================================================
       LOADING SCREEN
       ===================================================== */

    finishLoadingScreen();


    /* =====================================================
       BACKGROUND SERVICES
       ===================================================== */

    safeAsync(
        async () => {

            await handleSpotifyCallback();

        }
    );


    safeAsync(
        async () => {

            await loadSpotifyUser();

        }
    );


    safeAsync(
        async () => {

            initializeGoogle();

        }
    );

}


/* =========================================================
   START APPLICATION
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            safeAsync(
                init
            );

        },
        {
            once: true
        }
    );

} else {

    safeAsync(
        init
    );

}


/* =========================================================
   FINAL SAFETY
   ---------------------------------------------------------
   يمنع body من البقاء مقفولًا إذا تم إغلاق overlay
   من كود خارجي.
   ========================================================= */

window.RakkeZOverlay = {

    open:
        openOverlayById,

    close:
        closeOverlayById,

    closeAll:
        closeAllOverlays

};


/* =========================================================
   END OF RAKKEZ MAIN JS
   ========================================================= */
