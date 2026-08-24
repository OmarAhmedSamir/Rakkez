/* =========================================================
   RAKKEZ V2
   TIMER + STATS + PERSISTENCE
   LANGUAGE SAFE VERSION
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = id => document.getElementById(id);


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
   LOCAL STORAGE
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

    /*
       IMPORTANT:

       The timer uses ONLY timerState.remaining
       for counting.

       Language only changes how the value is displayed.
       It NEVER changes the numeric timer state.
    */


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
       START / PAUSE BUTTON
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

    /*
       START = PAUSE if already running.
    */

    if (
        timerState.running
    ) {

        pauseTimer();

        return;

    }


    /*
       Stop any alarm.
    */

    if (
        typeof stopAlarm ===
        "function"
    ) {

        stopAlarm();

    }


    /*
       Unlock audio.
    */

    if (
        typeof unlockAudio ===
        "function"
    ) {

        unlockAudio();

    }


    /*
       Prevent duplicate intervals.
    */

    if (
        timerState.interval !== null
    ) {

        clearInterval(
            timerState.interval
        );

        timerState.interval =
            null;

    }


    /*
       Make sure the timer has a valid value.
    */

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
        timerState.interval !== null
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

    /*
       IMPORTANT:

       NEVER read textContent from #timer here.

       The timer is purely numeric.
    */


    if (
        !timerState.running
    ) {

        return;

    }


    if (
        timerState.remaining <= 0
    ) {

        completePhase();

        return;

    }


    /* =====================================================
       FOCUS STATISTICS
    ===================================================== */

    if (
        timerState.mode === "focus"
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


    /*
       If this second reached zero,
       finish immediately.
    */

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

    pauseTimer();


    /* =====================================================
       ALARM
    ===================================================== */

    if (
        typeof playAlarm ===
        "function"
    ) {

        playAlarm();

    }


    /* =====================================================
       FOCUS COMPLETE
    ===================================================== */

    if (
        timerState.mode === "focus"
    ) {

        completedFocusInCycle++;


        stats.sessions++;


        const today =
            todayKey();


        stats.lastFocusDate =
            today;


        /*
           ONLY a completed focus session
           changes streak.
        */

        updateStreakOnFocus();


        /* =================================================
           TASK FOCUS TIME
        ================================================= */

        if (
            currentTaskId
        ) {

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
                    )

                    +

                    Math.round(
                        timerState.total / 60
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

            completedFocusInCycle = 0;

            setMode("long");

        } else {

            setMode("short");

        }

    } else {

        /*
           Break complete → Focus.
        */

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

    if (
        settings.autoStart
    ) {

        setTimeout(
            () => {

                /*
                   Never start while alarm is playing.
                */

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

    /*
       Validate mode.
    */

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


    if (
        mode === "focus"
    ) {

        minutes =
            Number(
                settings.focus
            );

    }


    else if (
        mode === "short"
    ) {

        minutes =
            Number(
                settings.shortBreak
            );

    }


    else {

        minutes =
            Number(
                settings.longBreak
            );

    }


    /*
       Protect against invalid values.
    */

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


    /*
       New mode is paused.
    */

    timerState.running =
        false;


    if (
        timerState.interval !== null
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
========================================================= */

function resetTimer() {

    /*
       IMPORTANT:

       THIS FUNCTION DOES NOT RESET:

       - streak
       - sessions
       - focus time
       - daily goal
       - dailyFocus
       - lastFocusDate
       - completedFocusInCycle

       It ONLY resets the current timer.
    */


    /*
       Stop timer.
    */

    timerState.running =
        false;


    if (
        timerState.interval !== null
    ) {

        clearInterval(
            timerState.interval
        );

    }


    timerState.interval =
        null;


    /*
       Stop alarms.
    */

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


    /*
       Reset ONLY the timer.
    */

    timerState.mode =
        "focus";


    const focusMinutes =
        Number(
            settings.focus
        );


    const safeFocus =
        Number.isFinite(
            focusMinutes
        ) && focusMinutes > 0

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


    /*
       Refresh UI without touching statistics.
    */

    updateTimerUI();


    updateStats();

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    /* =====================================================
       FOCUS
    ===================================================== */

    const focusStat =
        $("focusStat");


    if (focusStat) {

        focusStat.textContent =
            formatFocus(
                stats.totalFocusSeconds
            );

    }


    /* =====================================================
       SESSIONS
    ===================================================== */

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


    /* =====================================================
       STREAK
    ===================================================== */

    updateStreak();


    const streakStat =
        $("streakStat");


    if (streakStat) {

        const streak =
            Number(
                stats.streak
            ) || 0;


        if (
            getCurrentLanguage() === "ar"
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


    /* =====================================================
       DAILY GOAL
    ===================================================== */

    updateDailyGoal();

}


/* =========================================================
   FORMAT FOCUS
========================================================= */

function formatFocus(seconds) {

    const minutes =
        Math.floor(
            (
                Number(seconds) || 0
            ) / 60
        );


    const lang =
        getCurrentLanguage();


    if (
        lang === "ar"
    ) {

        if (
            minutes < 60
        ) {

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


        if (
            remaining > 0
        ) {

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


    if (
        minutes < 60
    ) {

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


    if (
        remaining > 0
    ) {

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


    /* =====================================================
       ARABIC
    ===================================================== */

    if (
        lang === "ar"
    ) {

        currentText =
            arabicNumbers(
                minutes
            ) +
            "د";


        if (
            goalHours
        ) {

            goalText =
                arabicNumbers(
                    goalHours
                ) +
                "س";


            if (
                goalMinutes
            ) {

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

    }


    /* =====================================================
       ENGLISH
    ===================================================== */

    else {

        currentText =
            minutes +
            "m";


        if (
            goalHours
        ) {

            goalText =
                goalHours +
                "h";


            if (
                goalMinutes
            ) {

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


    /*
       Same day:
       Do NOT increase streak.
    */

    if (
        previous === today
    ) {

        return;

    }


    if (
        previous
    ) {

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
                    current - last
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        if (
            diff === 1
        ) {

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

    /*
       IMPORTANT:

       Do NOT reset streak simply because
       resetTimer() was pressed.

       Streak only expires naturally when
       more than one full day has passed.
    */


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
                current - last
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


    timerState.mode =
        saved.mode;


    timerState.total =
        Number(
            saved.total
        ) || (
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


    /*
       IMPORTANT:

       Restore NEVER starts the interval automatically.
       User presses START.
    */

    timerState.running =
        false;


    timerState.interval =
        null;


    updateTimerUI();

}


/* =========================================================
   AUDIO UNLOCK
   ONLY ONE VERSION — DUPLICATE REMOVED
========================================================= */

let audioUnlocked = false;


function unlockAudio() {

    if (
        audioUnlocked
    ) {

        return;

    }


    try {

        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;


        if (
            !AudioContextClass
        ) {

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

        /*
           Refresh display only.

           Timer state is untouched.
        */

        updateTimerUI();

        updateStats();

    };


/* =========================================================
   SAFE NUMBER UPDATE HOOK
========================================================= */

window.updateLanguageNumbers =
    function () {

        /*
           Compatibility function.

           It does NOT modify timerState.
           It only redraws the timer.
        */

        updateTimerUI();

    };


/* =========================================================
   GLOBAL TIMER FUNCTIONS
   Makes buttons safe even if another script
   needs to call them.
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

let customAlarmURL = null;

let customAlarmName = null;

let alarmAudio = null;

let alarmAudioContext = null;

let alarmOscillators = [];

let alarmLoopTimeout = null;

let alarmPlaying = false;

let alarmSequenceId = 0;


/* =========================================================
   TEST ALARM STATE
========================================================= */

let testAudio = null;

let testAudioContext = null;

let testOscillators = [];

let testTimeout = null;

let testPlaying = false;

let testSequenceId = 0;


const ALARM_FREQUENCIES = {

    soft:
        [660, 880],

    digital:
        [880, 660, 880],

    focus:
        [520, 780, 1040],

    gentle:
        [523, 659, 784],

    deep:
        [220, 330, 440],

    success:
        [784, 988, 1174]

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
            width:min(360px,calc(100vw - 40px));
            padding:30px;
            border-radius:24px;
            text-align:center;
            background:rgba(20,20,24,.96);
            border:1px solid rgba(255,255,255,.1);
            box-shadow:0 30px 80px rgba(0,0,0,.5);
        }

        .rakkez-alarm-icon {
            font-size:36px;
            margin-bottom:12px;
        }

        .rakkez-alarm-title {
            font-family:"Space Grotesk",sans-serif;
            font-size:24px;
            font-weight:700;
            color:white;
            margin-bottom:8px;
        }

        .rakkez-alarm-text {
            font-family:"DM Sans",sans-serif;
            font-size:14px;
            color:rgba(255,255,255,.55);
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

    /*
       Invalidate every existing alarm sequence.
    */

    alarmSequenceId++;


    alarmPlaying =
        false;


    clearTimeout(
        alarmLoopTimeout
    );


    alarmLoopTimeout =
        null;


    /* =====================================================
       CUSTOM AUDIO
    ===================================================== */

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


    /* =====================================================
       GENERATED OSCILLATORS
    ===================================================== */

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


    /* =====================================================
       AUDIO CONTEXT
    ===================================================== */

    if (
        alarmAudioContext
    ) {

        try {

            alarmAudioContext.close();

        } catch {}


        alarmAudioContext =
            null;

    }


    /* =====================================================
       POPUP
    ===================================================== */

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

    if (
        !settings.sound
    ) {

        return;

    }


    /*
       Kill BOTH test and real alarm first.
    */

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


    /* =====================================================
       CUSTOM ALARM
    ===================================================== */

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


    /* =====================================================
       BUILT-IN ALARM
    ===================================================== */

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


        /*
           REAL ALARM:
           INFINITE LOOP.
        */

        audio.loop = true;

        audio.preload = "auto";


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
        ]
        ||
        ALARM_FREQUENCIES.soft;


    try {

        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContextClass) {

            return;

        }


        /*
           Close any context accidentally left
           from an older sequence.
        */

        if (alarmAudioContext) {

            try {

                alarmAudioContext.close();

            } catch {}

            alarmAudioContext = null;

        }


        alarmAudioContext =
            new AudioContextClass();


        if (
            alarmAudioContext.state ===
            "suspended"
        ) {

            alarmAudioContext.resume()
                .catch(() => {});

        }


        const now =
            alarmAudioContext.currentTime;


        /*
           Clear stale oscillator references.
        */

        alarmOscillators = [];


        frequencies.forEach(
            (frequency, index) => {

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


                gain.gain.exponentialRampToValueAtTime(
                    Math.max(
                        0.0001,
                        0.28 *
                        settings.alarmVolume
                    ),
                    start + 0.03
                );


                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    end
                );


                oscillator.connect(
                    gain
                );


                gain.connect(
                    alarmAudioContext.destination
                );


                oscillator.start(start);

                oscillator.stop(end);


                alarmOscillators.push(
                    oscillator
                );

            }
        );


        const duration =
            (
                frequencies.length * 160
            ) +
            700;


        alarmLoopTimeout =
            setTimeout(
                () => {

                    /*
                       If STOP ALARM was pressed,
                       this sequence is dead.
                    */

                    if (
                        !alarmPlaying ||
                        sequenceId !==
                        alarmSequenceId
                    ) {

                        return;

                    }


                    alarmOscillators = [];


                    if (
                        alarmAudioContext
                    ) {

                        try {

                            alarmAudioContext.close();

                        } catch {}

                    }


                    alarmAudioContext =
                        null;


                    /*
                       LOOP FOREVER.
                    */

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

    /*
       Invalidate the previous TEST sequence.
    */

    testSequenceId++;


    testPlaying = false;


    clearTimeout(
        testTimeout
    );


    testTimeout = null;


    /* CUSTOM TEST AUDIO */

    if (testAudio) {

        try {

            testAudio.pause();

        } catch {}


        try {

            testAudio.currentTime = 0;

        } catch {}


        try {

            testAudio.loop = false;

        } catch {}


        try {

            testAudio.removeAttribute(
                "src"
            );

            testAudio.load();

        } catch {}


        testAudio = null;

    }


    /* GENERATED TEST OSCILLATORS */

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


    testOscillators = [];


    /* TEST AUDIO CONTEXT */

    if (testAudioContext) {

        try {

            testAudioContext.close();

        } catch {}


        testAudioContext = null;

    }

}


/* =========================================================
   TEST ALARM
========================================================= */

function testAlarm() {

    /*
       CRITICAL FIX:

       Every TEST click first destroys the old test.
       This means:

       TEST
       TEST
       TEST
       TEST

       = one sound only, always the newest one.
    */

    stopTestAlarm();


    if (!settings.sound) {

        return;

    }


    unlockAudio();


    /*
       Stop the real alarm too so TEST can never
       overlap with the actual alarm.
    */

    stopAlarm();


    testPlaying = true;


    const sequenceId =
        testSequenceId;


    /*
       CUSTOM TEST
    */

    if (
        customAlarmURL &&
        settings.alarmSound === "custom"
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


            /*
               TEST is one playback.
               Real alarm is infinite.
            */

            audio.loop = false;


            audio.preload = "auto";


            audio.onended =
                () => {

                    if (
                        sequenceId ===
                        testSequenceId
                    ) {

                        testAudio = null;

                        testPlaying = false;

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


    /*
       GENERATED TEST ALARM
    */

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

            testAudioContext.resume()
                .catch(() => {});

        }


        const frequencies =
            ALARM_FREQUENCIES[
                settings.alarmSound
            ]
            ||
            ALARM_FREQUENCIES.soft;


        const now =
            testAudioContext.currentTime;


        testOscillators = [];


        frequencies.forEach(
            (frequency, index) => {

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


                gain.gain.exponentialRampToValueAtTime(
                    Math.max(
                        0.0001,
                        0.28 *
                        settings.alarmVolume
                    ),
                    start + 0.03
                );


                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    end
                );


                oscillator.connect(
                    gain
                );


                gain.connect(
                    testAudioContext.destination
                );


                oscillator.start(start);

                oscillator.stop(end);


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
                frequencies.length * 160 + 800
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
   TEST BUTTON
========================================================= */

if ($("testAlarmBtn")) {

    $("testAlarmBtn")
        .addEventListener(
            "click",
            () => {

                /*
                   Always restart with the latest selected
                   alarm. Never stack sounds.
                */

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


                e.target.value = "";


                return;

            }


            /*
               Stop everything using the old alarm.
            */

            stopAlarm();

            stopTestAlarm();


            /*
               Delete old object URL.
            */

            if (customAlarmURL) {

                try {

                    URL.revokeObjectURL(
                        customAlarmURL
                    );

                } catch {}

            }


            /*
               Create new object URL.
            */

            customAlarmURL =
                URL.createObjectURL(
                    file
                );


            customAlarmName =
                file.name;


            /*
               Automatically switch to CUSTOM.
            */

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


            /*
               CLEAR old stock/upload status
               then show the NEW uploaded file.
            */

            setAlarmUploadStatus(
                file.name
            );


            /*
               Optional labels.
            */

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
        background:rgba(34,197,94,.10);
        border:1px solid rgba(34,197,94,.20);
        font-family:"DM Sans",sans-serif;
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
        ">✓</span>

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

        /*
           Only clear the custom upload label
           when switching back to stock.
        */

        $("alarmName").textContent =
            "";

    }


    if ($("alarmFileName")) {

        $("alarmFileName").textContent =
            "";

    }

}


/* =========================================================
   SETTINGS
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
                settings.alarmVolume * 100
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

                    setMode("focus");

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

                    setMode("short");

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

                    setMode("long");

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


                if ($("alarmVolumeValue")) {

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

                /*
                   Stop ONLY current TEST.
                */

                stopTestAlarm();


                /*
                   Update selected sound.
                */

                settings.alarmSound =
                    e.target.value;


                /*
                   IMPORTANT:
                   If a stock sound was selected,
                   the uploaded-file status must disappear.
                */

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


    if (!list) return;


    list.innerHTML = "";


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
                    ${task.completed ? "✓" : ""}
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


function addTask() {

    const input =
        $("taskInput");


    if (!input) return;


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

        completed: false,

        created:
            Date.now(),

        focusMinutes: 0

    };


    tasks.unshift(task);


    save(
        STORAGE.tasks,
        tasks
    );


    input.value = "";


    renderTasks();

}


function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


function toggleTask(id) {

    const task =
        tasks.find(
            t => t.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    save(
        STORAGE.tasks,
        tasks
    );


    renderTasks();

}


function deleteTask(id) {

    tasks =
        tasks.filter(
            t => t.id !== id
        );


    if (currentTaskId === id) {

        currentTaskId = null;

    }


    save(
        STORAGE.tasks,
        tasks
    );


    renderTasks();

}


function selectTask(id) {

    currentTaskId = id;


    updateCurrentTask();


    if ($("tasksOverlay")) {

        $("tasksOverlay")
            .classList.remove(
                "show"
            );

    }

}


function updateCurrentTask() {

    const container =
        $("currentTask");


    if (!container) return;


    const lang =
        localStorage.getItem("language") ||
        localStorage.getItem("rakkez_language") ||
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

        currentTaskId = null;

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


                if (!button) return;


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


                if (!task) return;


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
   PANELS
========================================================= */

if ($("settingsOpen")) {

    $("settingsOpen").onclick =
        () => {

            syncSettingsUI();

            $("settingsOverlay")
                .classList.add(
                    "show"
                );

        };

}


if ($("tasksOpen")) {

    $("tasksOpen").onclick =
        () => {

            renderTasks();

            $("tasksOverlay")
                .classList.add(
                    "show"
                );

        };

}


if ($("mediaOpen")) {

    $("mediaOpen").onclick =
        () => {

            $("mediaOverlay")
                .classList.add(
                    "show"
                );

        };

}


/* =========================================================
   AMBIENT PANEL
========================================================= */

if ($("ambientOpen")) {

    $("ambientOpen").onclick =
        () => {

            renderAmbient();

            $("ambientOverlay")
                .classList.add(
                    "show"
                );

        };

}

document
    .querySelectorAll("[data-close]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        $(button.dataset.close);

                    if (target) {

                        target.classList.remove(
                            "show"
                        );

                    }

                }
            );

        }
    );

/* =========================================================
   THEME
========================================================= */

function applyTheme() {

    document.body.classList.toggle(
        "light",
        settings.theme === "light"
    );


    if ($("themeBtn")) {

        $("themeBtn").textContent =
            settings.theme === "light"
                ? "☀"
                : "☾";

    }

}


if ($("themeBtn")) {

    $("themeBtn").onclick =
        () => {

            settings.theme =
                settings.theme === "light"
                    ? "dark"
                    : "light";


            applyTheme();


            save(
                STORAGE.settings,
                settings
            );

        };

}


/* =========================================================
   FOCUS ONLY
========================================================= */

let focusOnly = false;


function toggleFocusOnly() {

    focusOnly = !focusOnly;


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

    if ($("confirmOverlay")) {

        $("confirmOverlay")
            .classList.add(
                "show"
            );

    }

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

                lastFocusDate: null,

                dailyFocus: {}

            };


            tasks = [];


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


            $("confirmOverlay")
                .classList.remove(
                    "show"
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
            parsed.hostname
                .toLowerCase();


        if (
            hostname === "youtu.be"
        ) {

            return parsed.pathname
                .replace("/", "")
                .split("/")[0]
                .split("?")[0];

        }


        if (
            hostname.includes("youtube.com") &&
            parsed.searchParams.get("v")
        ) {

            return parsed.searchParams.get("v");

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
   SPOTIFY
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
                        "
                    ></iframe>

                `;


            $("spotifyEmbed")
                .classList.add(
                    "show"
                );


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

let localMediaURL = null;


/* ---------------------------------------------------------
   UPLOAD FEEDBACK
--------------------------------------------------------- */

function showUploadFeedback(message, success = true) {

    let feedback =
        document.getElementById("uploadFeedback");


    if (!feedback) {

        feedback =
            document.createElement("div");


        feedback.id =
            "uploadFeedback";


        feedback.style.cssText = `
            margin-top:12px;
            padding:10px 14px;
            border-radius:12px;
            font-size:13px;
            font-family:"DM Sans",sans-serif;
            display:flex;
            align-items:center;
            gap:8px;
            transition:all .25s ease;
        `;


        const mediaFile =
            document.getElementById("mediaFile");


        if (
            mediaFile &&
            mediaFile.parentElement
        ) {

            mediaFile.parentElement.appendChild(
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
                ">✓</span>

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
                ">!</span>

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


/* ---------------------------------------------------------
   LOCAL MEDIA UPLOAD
--------------------------------------------------------- */

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

                    localMediaURL = null;

                }


                $("audioPlayer").pause();

                $("videoPlayer").pause();


                $("audioPlayer")
                    .removeAttribute("src");


                $("videoPlayer")
                    .removeAttribute("src");


                $("audioPlayer")
                    .style.display =
                    "none";


                $("videoPlayer")
                    .style.display =
                    "none";


                const isAudio =
                    file.type.startsWith("audio/");


                const isVideo =
                    file.type.startsWith("video/");


                if (!isAudio && !isVideo) {

                    showUploadFeedback(
                        "Unsupported file. Please upload an audio or video file.",
                        false
                    );


                    e.target.value = "";


                    return;

                }


                localMediaURL =
                    URL.createObjectURL(
                        file
                    );


                if (isAudio) {

                    const player =
                        $("audioPlayer");


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
                        .then(() => {

                            showUploadFeedback(
                                "Uploaded • Playing in loop"
                            );

                        })
                        .catch(error => {

                            console.warn(
                                "Autoplay blocked:",
                                error
                            );


                            showUploadFeedback(
                                "Uploaded • Press play to start"
                            );

                        });


                    $("mediaName")
                        .textContent =
                        file.name;


                    $("mediaSource")
                        .textContent =
                        "Local Audio";


                    showNowPlaying(
                        file.name,
                        "Local Audio",
                        "♫"
                    );

                }


                if (isVideo) {

                    const player =
                        $("videoPlayer");


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
                        .then(() => {

                            showUploadFeedback(
                                "Uploaded • Playing in loop"
                            );

                        })
                        .catch(error => {

                            console.warn(
                                "Autoplay blocked:",
                                error
                            );


                            showUploadFeedback(
                                "Uploaded • Press play to start"
                            );

                        });


                    $("mediaName")
                        .textContent =
                        file.name;


                    $("mediaSource")
                        .textContent =
                        "Local Video";


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
   AMBIENT
========================================================= */

const ambientPresets = [

    {
        id: "Anime girl",
        name: "✨NEW✨ Anime girl",
        url:
            "https://image.cdn2.seaart.ai/2024-03-02/cnhb3jde878c73a9lp80/0c7c4c2054c4dd5d4dce8769ef3e4fdc02c9f2d6_high.webp"
    },

    {
        id: "Newyork",
        name: "Newyork",
        url:
            "https://wallpapercave.com/wp/wp3544754.jpg"
    },

    {
        id: "Ocean",
        name: "Ocean",
        url:
            "https://wallpapercave.com/wp/wp8963442.jpg"
    },

    {
        id: "Nature",
        name: "Nature",
        url:
            "https://wallpapercave.com/wp/wp2506793.jpg"
    },

    {
        id: "coffee",
        name: "Lofi Coffee",
        url:
            "https://wallpaperaccess.com/full/8891446.jpg"
    },

    {
        id: "coffee2",
        name: "Lofi Coffee 2",
        url:
            "https://i.ytimg.com/vi/8-BsxrE1bY8/maxresdefault.jpg"
    },

    {
        id: "Room",
        name: "Lofi Room",
        url:
            "https://wallpapercave.com/wp/wp12446857.jpg"
    },

    {
        id: "Nature2",
        name: "Swiss",
        url:
            "https://wallpaperaccess.com/full/1455073.jpg"
    },

    {
        id: "city",
        name: "Lofi City",
        url:
            "https://images.hdqwalls.com/download/van-ov-2560x1600.jpg"
    }

];


/* =========================================================
   SELECTED AMBIENT
========================================================= */

let selectedAmbient =
    localStorage.getItem(
        STORAGE.ambient
    ) || "gradient";


/* =========================================================
   AMBIENT GRADIENTS
========================================================= */

const ambientGradients = [

    /* =====================================================
       BLUE
    ====================================================== */

    {
        id: "gradient",
        name: "RakkeZ Gradient",
        background: `
            radial-gradient(
                circle at 25% 25%,
                #006cff,
                transparent 35%
            ),
            radial-gradient(
                circle at 75% 70%,
                #001e79,
                transparent 40%
            ),
            #02040b
        `
    },


    /* =====================================================
       YELLOW
    ====================================================== */

    {
        id: "yellow",
        name: "Solar Yellow",
        background: `
            radial-gradient(
                circle at 20% 25%,
                #ffd000,
                transparent 35%
            ),
            radial-gradient(
                circle at 80% 70%,
                #ff7a00,
                transparent 45%
            ),
            #120900
        `
    },


    /* =====================================================
       PINK
    ====================================================== */

    {
        id: "pink",
        name: "Neon Pink",
        background: `
            radial-gradient(
                circle at 20% 25%,
                #ff2d95,
                transparent 35%
            ),
            radial-gradient(
                circle at 80% 70%,
                #8b1eff,
                transparent 45%
            ),
            #10020b
        `
    },


    /* =====================================================
       GREEN
    ====================================================== */

    {
        id: "green",
        name: "Emerald Green",
        background: `
            radial-gradient(
                circle at 20% 25%,
                #00ff88,
                transparent 35%
            ),
            radial-gradient(
                circle at 80% 70%,
                #008f5a,
                transparent 45%
            ),
            #00100a
        `
    }

];


/* =========================================================
   RENDER AMBIENT
========================================================= */

function renderAmbient() {

    const grid =
        $("ambientGrid");


    if (!grid) return;


    grid.innerHTML = "";


    /* =====================================================
       GRADIENT CARDS
    ====================================================== */

    ambientGradients.forEach(
        gradientItem => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "ambient-card" +
                (
                    selectedAmbient ===
                    gradientItem.id
                        ? " selected"
                        : ""
                );


            card.innerHTML = `

                <div
                    style="
                        width:100%;
                        height:100%;
                        background:${gradientItem.background};
                    "
                ></div>

                <div class="ambient-name">
                    ${gradientItem.name}
                </div>

            `;


            card.onclick = () => {

                selectedAmbient =
                    gradientItem.id;


                localStorage.setItem(
                    STORAGE.ambient,
                    selectedAmbient
                );


                resetBackground();


                applyGradient(
                    gradientItem.background
                );


                renderAmbient();

            };


            grid.appendChild(
                card
            );

        }
    );


    /* =====================================================
       IMAGE PRESETS
    ====================================================== */

    ambientPresets.forEach(
        item => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "ambient-card" +
                (
                    selectedAmbient ===
                    item.id
                        ? " selected"
                        : ""
                );


            card.innerHTML = `

                <img
                    src="${item.url}"
                    alt="${item.name}"
                    loading="lazy"
                >

                <div class="ambient-name">
                    ${item.name}
                </div>

            `;


            card.onclick = () => {

                selectedAmbient =
                    item.id;


                localStorage.setItem(
                    STORAGE.ambient,
                    selectedAmbient
                );


                applyAmbient(item);


                renderAmbient();

            };


            grid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   APPLY GRADIENT
========================================================= */

function applyGradient(
    gradientValue
) {

    const gradient =
        document.querySelector(
            ".bg-gradient"
        );


    if (!gradient) return;


    gradient.style.display =
        "block";


    gradient.style.background =
        gradientValue;


    if ($("customImage")) {

        $("customImage")
            .style.display =
            "none";

    }


    if ($("customVideo")) {

        $("customVideo")
            .style.display =
            "none";


        $("customVideo")
            .pause();

    }

}


/* =========================================================
   APPLY IMAGE AMBIENT
========================================================= */

function applyAmbient(item) {

    const gradient =
        document.querySelector(
            ".bg-gradient"
        );


    if (gradient) {

        gradient.style.display =
            "none";

    }


    if ($("customVideo")) {

        $("customVideo")
            .style.display =
            "none";


        $("customVideo")
            .pause();

    }


    if ($("customImage")) {

        $("customImage")
            .style.display =
            "block";


        $("customImage").src =
            item.url;

    }

}


/* =========================================================
   RESET BACKGROUND
========================================================= */

function resetBackground() {

    const gradient =
        document.querySelector(
            ".bg-gradient"
        );


    if (gradient) {

        gradient.style.display =
            "none";

    }


    if ($("customImage")) {

        $("customImage")
            .style.display =
            "none";


        $("customImage")
            .removeAttribute(
                "src"
            );

    }


    if ($("customVideo")) {

        $("customVideo")
            .style.display =
            "none";


        $("customVideo")
            .removeAttribute(
                "src"
            );


        $("customVideo")
            .pause();

    }

}


/* =========================================================
   APPLY IMAGE AMBIENT
========================================================= */

function applyAmbient(item) {

    const gradient =
        document.querySelector(
            ".bg-gradient"
        );


    if (gradient) {

        gradient.style.display =
            "none";

    }


    if ($("customVideo")) {

        $("customVideo")
            .pause();


        $("customVideo")
            .style.display =
            "none";


        $("customVideo")
            .removeAttribute(
                "src"
            );

    }


    if ($("customImage")) {

        $("customImage")
            .style.display =
            "block";


        $("customImage").src =
            item.url;

    }

}


/* =========================================================
   RESET BACKGROUND
========================================================= */

function resetBackground() {

    if ($("customImage")) {

        $("customImage")
            .style.display =
            "none";


        $("customImage")
            .removeAttribute(
                "src"
            );

    }


    if ($("customVideo")) {

        $("customVideo")
            .pause();


        $("customVideo")
            .style.display =
            "none";


        $("customVideo")
            .removeAttribute(
                "src"
            );

    }


    const gradient =
        document.querySelector(
            ".bg-gradient"
        );


    if (gradient) {

        gradient.style.display =
            "none";

    }

}


/* =========================================================
   RESTORE SAVED AMBIENT
========================================================= */

function restoreAmbient() {

    if (
        selectedAmbient ===
        "gradient"
    ) {

        applyGradient();

        return;

    }


    const saved =
        ambientPresets.find(
            item =>
                item.id ===
                selectedAmbient
        );


    if (saved) {

        applyAmbient(saved);

    } else {

        selectedAmbient =
            "gradient";


        localStorage.setItem(
            STORAGE.ambient,
            "gradient"
        );


        applyGradient();

    }

}


/* =========================================================
   INITIALIZE AMBIENT
========================================================= */

renderAmbient();

restoreAmbient();


/* =========================================================
   LOCAL BACKGROUND
========================================================= */

let localBackgroundURL = null;


if ($("bgFile")) {

    $("bgFile")
        .addEventListener(
            "change",
            e => {

                const file =
                    e.target.files &&
                    e.target.files[0];


                if (!file) return;


                if (localBackgroundURL) {

                    try {

                        URL.revokeObjectURL(
                            localBackgroundURL
                        );

                    } catch {}

                }


                localBackgroundURL =
                    URL.createObjectURL(
                        file
                    );


                selectedAmbient =
                    "local";


                localStorage.setItem(
                    STORAGE.ambient,
                    "local"
                );


                if (
                    file.type.startsWith(
                        "video/"
                    )
                ) {

                    if ($("customImage")) {

                        $("customImage")
                            .style.display =
                            "none";

                    }


                    if ($("customVideo")) {

                        $("customVideo")
                            .style.display =
                            "block";


                        $("customVideo").src =
                            localBackgroundURL;


                        $("customVideo").loop =
                            true;


                        $("customVideo")
                            .play()
                            .catch(
                                () => {}
                            );

                    }

                } else {

                    if ($("customVideo")) {

                        $("customVideo")
                            .style.display =
                            "none";

                    }


                    if ($("customImage")) {

                        $("customImage")
                            .style.display =
                            "block";


                        $("customImage").src =
                            localBackgroundURL;

                    }

                }


                if ($("ambientOverlay")) {

                    $("ambientOverlay")
                        .classList.remove(
                            "show"
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
            .classList.add(
                "show"
            );

    }

}


/* =========================================================
   SPOTIFY OAUTH — PKCE
========================================================= */

let spotifyUser = null;


function randomString(length = 64) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";


    let result = "";


    const array =
        new Uint8Array(length);


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
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

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
                    method: "POST",

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
                    token.expires_in * 1000

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

        updateSpotifyUI(null);

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


            updateSpotifyUI(null);

            return;

        }


        spotifyUser =
            await response.json();


        updateSpotifyUI(
            spotifyUser
        );

    } catch {

        updateSpotifyUI(null);

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
                .classList.add(
                    "connected"
                );

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
                .classList.remove(
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

let googleUser = null;
let googleTokenClient = null;


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


async function handleGoogleToken(response) {

    if (response.error) {

        console.error(response);

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

        console.error(error);

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
                .classList.add(
                    "connected"
                );

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
                .classList.remove(
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
   INIT
========================================================= */

if ($("startBtn")) {

    $("startBtn").onclick =
        startTimer;

}


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


        if (e.code === "Space") {

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
   STARTUP
========================================================= */

async function init() {

    createAlarmPopup();


    /*
       If settings say CUSTOM but there is no file
       available after refresh, fall back to soft.
       Object URLs cannot survive a page refresh.
    */

    if (
        settings.alarmSound === "custom" &&
        !customAlarmURL
    ) {

        /*
           Do not show a fake uploaded state.
           The browser cannot restore a local Blob URL
           after a full page reload.
        */

        settings.alarmSound = "soft";


        save(
            STORAGE.settings,
            settings
        );

    }


    updateStreak();

    restoreTimer();

    updateTimerUI();

    updateStats();

    syncSettingsUI();

    renderTasks();

    applyTheme();


    const ambient =
        ambientPresets.find(
            item =>
                item.id ===
                selectedAmbient
        );


    if (ambient) {

        applyAmbient(
            ambient
        );

    }


    await handleSpotifyCallback();

    await loadSpotifyUser();

    initializeGoogle();

}

document.addEventListener("DOMContentLoaded", () => {

    const updatesModal = document.getElementById("updatesModal");
    const closeUpdates = document.getElementById("closeUpdates");
    const updatesDone = document.getElementById("updatesDone");

    if (!updatesModal) {
        console.error("Updates modal not found!");
        return;
    }

    const UPDATE_VERSION = "2.0";

    const seenVersion = localStorage.getItem("rakkez_updates_version");

    if (seenVersion !== UPDATE_VERSION) {
        setTimeout(() => {
            updatesModal.classList.add("show");
        }, 500);
    }

    function closeModal() {
        updatesModal.classList.remove("show");

        localStorage.setItem(
            "rakkez_updates_version",
            UPDATE_VERSION
        );
    }

    closeUpdates?.addEventListener("click", closeModal);
    updatesDone?.addEventListener("click", closeModal);

    updatesModal.addEventListener("click", (e) => {
        if (e.target === updatesModal) {
            closeModal();
        }
    });

});



init();

