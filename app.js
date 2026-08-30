/* =========================================================
   RAKKEZ V2 TIMER + STATS + PERSISTENCE + LANGUAGE SAFE
   FULL VERSION
   ========================================================= */



/* =========================================================
   HELPERS
   ========================================================= */

const $ = id => document.getElementById(id);


function updateTabTitle(secondsLeft, isRunning) {

    if (!isRunning) {

        document.title = "RakkeZ";

        return;

    }


    const minutes =
        Math.floor(secondsLeft / 60);


    const seconds =
        secondsLeft % 60;


    document.title =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} • RakkeZ`;

}



/* =========================================================
   STORAGE
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

    dailySessions: {},

    focusPeriods: [],

    ...load(
        STORAGE.stats,
        {}
    )

};



/* =========================================================
   BACKWARD COMPATIBILITY
   ========================================================= */

if (
    !stats.dailySessions ||
    typeof stats.dailySessions !== "object"
) {

    stats.dailySessions = {};

}



if (
    !stats.dailyFocus ||
    typeof stats.dailyFocus !== "object"
) {

    stats.dailyFocus = {};

}



/* =========================================================
   FOCUS PERIODS BACKWARD COMPATIBILITY
   ========================================================= */

if (
    !Array.isArray(
        stats.focusPeriods
    )
) {

    stats.focusPeriods = [];

}



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

    startedAt: null,

    timestamp: null,

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
        digit => "٠١٢٣٤٥٦٧٨٩"[digit]
    );

}



/* =========================================================
   ENGLISH NUMBERS
   ========================================================= */

function englishNumbers(value) {

    return String(value).replace(
        /[٠-٩]/g,
        digit =>
            "٠١٢٣٤٥٦٧٨٩".indexOf(digit)
    );

}



/* =========================================================
   DATE
   ========================================================= */

function todayKey() {

    const d =
        new Date();


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
   DAILY POMODORO COUNT
   ========================================================= */

function getTodayPomodoroCount() {

    const today =
        todayKey();


    return Number(
        stats.dailySessions &&
        stats.dailySessions[today]
    ) || 0;

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

        + ":" +

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


    updateTabTitle(
        timerState.remaining,
        timerState.running
    );


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


    const modeText =
        $("modeText");


    if (modeText) {

        modeText.dataset.mode =
            timerState.mode;


        modeText.textContent =
            getTimerModeText();

    }


    const timerLabel =
        $("timerLabel");


    if (timerLabel) {

        timerLabel.textContent =
            getTimerLabel();

    }


    document
        .querySelectorAll(
            "[data-timer-mode]"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.timerMode ===
                timerState.mode
            );

        });


    const modeButtonMap = {

        focus: [
            "focusMode",
            "focusBtn",
            "focusModeBtn",
            "focusTab"
        ],

        short: [
            "shortBreakMode",
            "shortBreakBtn",
            "shortBreakModeBtn",
            "shortBreakTab"
        ],

        long: [
            "longBreakMode",
            "longBreakBtn",
            "longBreakModeBtn",
            "longBreakTab"
        ]

    };


    Object.entries(
        modeButtonMap
    ).forEach(
        ([mode, ids]) => {

            ids.forEach(id => {

                const button =
                    $(id);


                if (!button) {
                    return;
                }


                button.classList.toggle(
                    "active",
                    timerState.mode === mode
                );

            });

        }
    );


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


    const startButton =
        $("startBtn");


    if (startButton) {

        startButton.textContent =
            getStartButtonText();

    }


    if (
        typeof updateCurrentTask ===
        "function"
    ) {

        updateCurrentTask();

    }

}



/* =========================================================
   COMPLETION CARD
   ========================================================= */

function getCompletionElements() {

    return {

        overlay:
            $("rkCompletionOverlay"),

        title:
            $("rkCompletionTitle"),

        message:
            $("rkCompletionMessage"),

        count:
            $("rkCompletionCount"),

        trophy:
            $("rkCompletionTrophy"),

        close:
            $("rkCompletionClose"),

        button:
            $("rkCompletionButton")

    };

}



function showPomodoroCompletion(
    pomodoroNumber
) {

    const elements =
        getCompletionElements();


    if (!elements.overlay) {
        return;
    }


    const number =
        Math.max(
            1,
            Number(pomodoroNumber) || 1
        );


    const lang =
        getCurrentLanguage();


    if (number === 1) {

        if (elements.title) {

            elements.title.textContent =
                lang === "ar"
                    ? "مبروك!"
                    : "You did it!";

        }


        if (elements.message) {

            elements.message.textContent =
                lang === "ar"
                    ? "لقد أكملت أول Pomodoro لك."
                    : "Your first Pomodoro is complete.";

        }

    } else {

        if (elements.title) {

            elements.title.textContent =
                "Congratulations!";

        }


        if (elements.message) {

            elements.message.textContent =
                lang === "ar"
                    ? "Pomodoro أخرى اكتملت."
                    : "Another Pomodoro done.";

        }

    }


    if (elements.count) {

        const numberText =
            lang === "ar"
                ? arabicNumbers(number)
                : String(number);


        elements.count.textContent =
            lang === "ar"
                ? "Pomodoro رقم " + numberText
                : "Pomodoro #" + numberText;

    }


    if (elements.trophy) {

        elements.trophy.style.animation =
            "none";


        void elements.trophy.offsetWidth;


        elements.trophy.style.animation =
            "";

    }


    elements.overlay.classList.add(
        "rk-show"
    );


    elements.overlay.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    setTimeout(
        () => {

            if (elements.button) {

                try {

                    elements.button.focus();

                } catch {}

            }

        },
        300
    );

}



function hidePomodoroCompletion() {

    const elements =
        getCompletionElements();


    if (!elements.overlay) {
        return;
    }


    elements.overlay.classList.remove(
        "rk-show"
    );


    elements.overlay.setAttribute(
        "aria-hidden",
        "true"
    );


    if (
        typeof syncBodyScrollLock ===
        "function"
    ) {

        syncBodyScrollLock();

    } else {

        document.body.style.overflow =
            "";

    }

}



/* =========================================================
   COMPLETION CARD EVENTS
   ========================================================= */

function initializePomodoroCompletion() {

    const elements =
        getCompletionElements();


    if (!elements.overlay) {

        console.warn(
            "RakkeZ: Completion card not found in index.html"
        );


        return;

    }


    if (elements.button) {

        elements.button.addEventListener(
            "click",
            hidePomodoroCompletion
        );

    }


    if (elements.close) {

        elements.close.addEventListener(
            "click",
            hidePomodoroCompletion
        );

    }


    elements.overlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                elements.overlay
            ) {

                hidePomodoroCompletion();

            }

        }
    );

}



/* =========================================================
   GLOBAL COMPLETION API
   ========================================================= */

window.RakkeZShowCompletion =
    showPomodoroCompletion;


window.RakkeZHideCompletion =
    hidePomodoroCompletion;



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


        timerState.interval =
            null;

    }


    if (
        !Number.isFinite(
            Number(timerState.remaining)
        ) ||
        timerState.remaining < 0
    ) {

        setMode(
            timerState.mode
        );

    }


    if (!timerState.startedAt) {

        timerState.startedAt =
            Date.now();

    }


    timerState.running =
        true;


    timerState.timestamp =
        Date.now();


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


    timerState.timestamp =
        Date.now();


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
        timerState.remaining <= 0
    ) {

        completePhase();

        return;

    }


    if (
        timerState.mode === "focus"
    ) {

        stats.totalFocusSeconds =
            Number(
                stats.totalFocusSeconds
            ) + 1;


        const today =
            todayKey();


        if (
            !stats.dailyFocus ||
            typeof stats.dailyFocus !==
            "object"
        ) {

            stats.dailyFocus = {};

        }


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


    timerState.remaining =
        Math.max(
            0,
            Number(
                timerState.remaining
            ) - 1
        );


    timerState.timestamp =
        Date.now();


    saveTimer();


    if (
        timerState.remaining <= 0
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
        typeof playAlarm ===
        "function"
    ) {

        playAlarm();

    }


    if (
        timerState.mode === "focus"
    ) {

        completedFocusInCycle++;


        stats.sessions =
            Number(
                stats.sessions
            ) + 1;


        const today =
            todayKey();


        if (
            !stats.dailySessions ||
            typeof stats.dailySessions !==
            "object"
        ) {

            stats.dailySessions = {};

        }


        if (
            !stats.dailySessions[today]
        ) {

            stats.dailySessions[today] =
                0;

        }


        stats.dailySessions[today]++;


        const pomodoroNumber =
            Number(
                stats.dailySessions[today]
            );


        stats.lastFocusDate =
            today;


        updateStreakOnFocus();


        if (
            !Array.isArray(
                stats.focusPeriods
            )
        ) {

            stats.focusPeriods = [];

        }


        const sessionEnd =
            Date.now();


        let sessionStart =
            Number(
                timerState.startedAt
            );


        if (
            !Number.isFinite(
                sessionStart
            ) ||
            sessionStart <= 0
        ) {

            sessionStart =
                sessionEnd -
                (
                    Number(
                        timerState.total
                    ) * 1000
                );

        }


        const durationSeconds =
            Math.max(
                0,
                Math.floor(
                    (
                        sessionEnd -
                        sessionStart
                    ) / 1000
                )
            );


        stats.focusPeriods.push({

            id:
                crypto.randomUUID
                    ? crypto.randomUUID()
                    : (
                        Date.now().toString() +
                        Math.random()
                            .toString(36)
                    ),

            date:
                today,

            start:
                sessionStart,

            end:
                sessionEnd,

            durationSeconds

        });


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
                        durationSeconds / 60
                    );

            }

        }


        if (
            completedFocusInCycle >=
            Number(
                settings.longBreakAfter
            )
        ) {

            completedFocusInCycle =
                0;


            setMode(
                "long"
            );

        } else {

            setMode(
                "short"
            );

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


        if (
            typeof window.RakkeZShowCompletion ===
            "function"
        ) {

            setTimeout(
                () => {

                    window.RakkeZShowCompletion(
                        pomodoroNumber
                    );

                },
                120
            );

        }

    } else {

        setMode(
            "focus"
        );

    }


    timerState.startedAt =
        null;


    timerState.timestamp =
        Date.now();


    saveTimer();


    save(
        STORAGE.stats,
        stats
    );


    save(
        STORAGE.tasks,
        tasks
    );


    updateStats();


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

        mode =
            "focus";

    }


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


    timerState.mode =
        mode;


    let minutes;


    if (
        mode === "focus"
    ) {

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


    timerState.startedAt =
        null;


    timerState.timestamp =
        Date.now();


    saveTimer();

    updateTimerUI();

}



/* =========================================================
   RESET FULL SESSION
   ---------------------------------------------------------
   IMPORTANT:

   This is the FIXED reset.

   It resets:

   ✓ Current timer
   ✓ Current Pomodoro cycle
   ✓ TODAY focus display
   ✓ TODAY Pomodoro count
   ✓ Today's focus periods

   It DOES NOT reset:

   ✗ Lifetime focus time
   ✗ Lifetime completed sessions
   ✗ Tasks
   ✗ Settings
   ✗ Streak history
   ✗ Other days
   ========================================================= */

function resetTimer() {

    /* =====================================================
       STOP TIMER
       ===================================================== */

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


    /* =====================================================
       STOP ALARMS
       ===================================================== */

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


    /* =====================================================
       RESET CURRENT POMODORO CYCLE
       ===================================================== */

    completedFocusInCycle =
        0;


    /* =====================================================
       RESET TODAY'S STATS
       ===================================================== */

    const today =
        todayKey();


    /*
     * Focus shown in:
     *
     * Focus
     * Daily Goal
     */

    if (
        stats.dailyFocus &&
        typeof stats.dailyFocus ===
        "object"
    ) {

        stats.dailyFocus[today] =
            0;

    } else {

        stats.dailyFocus = {

            [today]: 0

        };

    }


    /*
     * Sessions shown in:
     *
     * Sessions
     */

    if (
        stats.dailySessions &&
        typeof stats.dailySessions ===
        "object"
    ) {

        stats.dailySessions[today] =
            0;

    } else {

        stats.dailySessions = {

            [today]: 0

        };

    }


    /* =====================================================
       REMOVE TODAY'S FOCUS PERIODS
       ===================================================== */

    if (
        Array.isArray(
            stats.focusPeriods
        )
    ) {

        stats.focusPeriods =
            stats.focusPeriods.filter(
                period =>
                    period.date !== today
            );

    }


    /* =====================================================
       RESET CURRENT TIMER TO FOCUS
       ===================================================== */

    timerState.mode =
        "focus";


    const focusMinutes =
        Number(
            settings.focus
        );


    const safeFocusMinutes =
        Number.isFinite(
            focusMinutes
        ) &&
        focusMinutes > 0

            ? focusMinutes

            : DEFAULT_SETTINGS.focus;


    timerState.total =
        Math.floor(
            safeFocusMinutes * 60
        );


    timerState.remaining =
        timerState.total;


    timerState.startedAt =
        null;


    timerState.timestamp =
        Date.now();


    timerState.running =
        false;


    timerState.interval =
        null;


    /* =====================================================
       SAVE
       ===================================================== */

    save(
        STORAGE.stats,
        stats
    );


    saveTimer();


    /* =====================================================
       REFRESH UI
       ===================================================== */

    updateTimerUI();

    updateStats();

    renderTasks();


    /* =====================================================
       CLOSE COMPLETION CARD IF OPEN
       ===================================================== */

    if (
        typeof hidePomodoroCompletion ===
        "function"
    ) {

        hidePomodoroCompletion();

    }


    console.log(
        "RakkeZ: Full session reset completed."
    );

}



/* =========================================================
   STATS
   ========================================================= */

function updateStats() {

    const today =
        todayKey();


    const todayFocusSeconds =
        Number(
            stats.dailyFocus &&
            stats.dailyFocus[today]
        ) || 0;


    const focusStat =
        $("focusStat");


    if (focusStat) {

        focusStat.textContent =
            formatFocus(
                todayFocusSeconds
            );

    }


    const todaySessions =
        Number(
            stats.dailySessions &&
            stats.dailySessions[today]
        ) || 0;


    const sessionsStat =
        $("sessionsStat");


    if (sessionsStat) {

        sessionsStat.textContent =
            getCurrentLanguage() === "ar"

                ? arabicNumbers(
                    todaySessions
                )

                : todaySessions;

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
                arabicNumbers(
                    hours
                ) +
                "س " +
                arabicNumbers(
                    remaining
                ) +
                "د"
            );

        }


        return (
            arabicNumbers(
                hours
            ) +
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
            stats.dailyFocus &&
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


    if (
        previous ===
        today
    ) {

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

            stats.streak =
                1;

        }

    } else {

        stats.streak =
            1;

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

    if (
        !stats.lastFocusDate
    ) {

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


    if (
        difference > 1
    ) {

        stats.streak =
            0;


        save(
            STORAGE.stats,
            stats
        );

    }

}



/* =========================================================
   TIMER PERSISTENCE
   ========================================================= */

function saveTimer() {

    if (
        !settings.smartTimer
    ) {

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

            startedAt:
                timerState.startedAt
                    ? Number(
                        timerState.startedAt
                    )
                    : null,

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

    if (
        !settings.smartTimer
    ) {

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


    const savedTotal =
        Number(
            saved.total
        );


    const savedRemaining =
        Number(
            saved.remaining
        );


    const savedTimestamp =
        Number(
            saved.timestamp
        );


    timerState.mode =
        saved.mode;


    timerState.total =
        Number.isFinite(
            savedTotal
        ) &&
        savedTotal > 0

            ? savedTotal

            : (
                saved.mode === "focus"

                    ? Number(
                        settings.focus
                    ) * 60

                    : saved.mode === "short"

                        ? Number(
                            settings.shortBreak
                        ) * 60

                        : Number(
                            settings.longBreak
                        ) * 60
            );


    let remaining =
        Number.isFinite(
            savedRemaining
        )

            ? savedRemaining

            : timerState.total;


    if (
        saved.running &&
        Number.isFinite(
            savedTimestamp
        )
    ) {

        const elapsedSinceSave =
            Math.max(
                0,
                Math.floor(
                    (
                        Date.now() -
                        savedTimestamp
                    ) / 1000
                )
            );


        remaining =
            Math.max(
                0,
                remaining -
                elapsedSinceSave
            );

    }


    timerState.remaining =
        remaining;


    timerState.startedAt =
        Number.isFinite(
            Number(
                saved.startedAt
            )
        )

            ? Number(
                saved.startedAt
            )

            : null;


    timerState.running =
        false;


    timerState.timestamp =
        Date.now();


    timerState.interval =
        null;


    if (
        saved.running &&
        timerState.remaining <= 0
    ) {

        timerState.remaining =
            0;


        setTimeout(
            () => {

                completePhase();

            },
            0
        );


        return;

    }


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


        audioUnlocked =
            true;


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



window.updateLanguageNumbers =
    function () {

        updateTimerUI();

        updateStats();

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
   TIMER MODE BUTTONS
   ========================================================= */

function initializeTimerModeButtons() {

    const modeButtons = [

        {
            ids: [
                "focusMode",
                "focusBtn",
                "focusModeBtn",
                "focusTab"
            ],
            mode: "focus"
        },

        {
            ids: [
                "shortBreakMode",
                "shortBreakBtn",
                "shortBreakModeBtn",
                "shortBreakTab"
            ],
            mode: "short"
        },

        {
            ids: [
                "longBreakMode",
                "longBreakBtn",
                "longBreakModeBtn",
                "longBreakTab"
            ],
            mode: "long"
        }

    ];


    modeButtons.forEach(
        item => {

            item.ids.forEach(
                id => {

                    const button =
                        $(id);


                    if (!button) {
                        return;
                    }


                    if (
                        button.dataset
                            .rakkezModeBound ===
                        "true"
                    ) {

                        return;

                    }


                    button.dataset
                        .rakkezModeBound =
                        "true";


                    button.addEventListener(
                        "click",
                        event => {

                            event.preventDefault();


                            if (
                                timerState.running
                            ) {

                                return;

                            }


                            setMode(
                                item.mode
                            );

                        }
                    );

                }
            );

        }
    );


    document
        .querySelectorAll(
            "[data-timer-mode]"
        )
        .forEach(
            button => {

                if (
                    button.dataset
                        .rakkezModeBound ===
                    "true"
                ) {

                    return;

                }


                button.dataset
                    .rakkezModeBound =
                    "true";


                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        if (
                            timerState.running
                        ) {

                            return;

                        }


                        const mode =
                            button.dataset
                                .timerMode;


                        if (
                            mode === "focus" ||
                            mode === "short" ||
                            mode === "long"
                        ) {

                            setMode(
                                mode
                            );

                        }

                    }
                );

            }
        );

}



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

            background:
                rgba(0,0,0,.55);

            backdrop-filter:
                blur(14px);

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

            background:
                rgba(
                    20,
                    20,
                    24,
                    .96
                );

            border:
                1px solid
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
        settings.alarmSound !== "custom" ||
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
                    index *
                    0.16;


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
                        start +
                        0.03
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
                    alarmAudioContext
                        .destination
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
            ) +
            700;


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


                    if (alarmAudioContext) {

                        try {

                            alarmAudioContext.close();

                        } catch {}


                        alarmAudioContext =
                            null;

                    }


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
                    index *
                    0.16;


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
                        start +
                        0.03
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
                    testAudioContext
                        .destination
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

        <span
            style="
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
            "
        >
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
                    ${escapeHTML(
                        task.title
                    )}
                </div>

                <div class="task-focus">
                    ${
                        task.focusMinutes ||
                        0
                    }m
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

            ${escapeHTML(
                task.title
            )}

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

                if (
                    e.key ===
                    "Enter"
                ) {

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
