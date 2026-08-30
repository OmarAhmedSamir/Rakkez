(function () {
"use strict";


/*
 * =========================================================
 * RAKKEZ TIMER ENHANCEMENTS
 * =========================================================
 *
 * This file contains:
 *
 * - Timer tabs
 * - Reset Timer system
 * - Reset Current Segment
 * - Reset Full Session
 * - Mini Timer
 * - Document Picture-in-Picture
 * - Floating Mini Timer fallback
 *
 * It intentionally does NOT replace app.js.
 * It works alongside the existing timer system.
 */

function initRakkeZTimerEnhancements() {

    /* =====================================================
       HELPERS
       ===================================================== */

    const $ = function (id) {
        return document.getElementById(id);
    };

    const timerElement = $("timer");
    const modeElement = $("modeText");
    const startButton = $("startBtn");
    const resetButton = $("resetBtn");
    const timerCard = document.querySelector(".timer-card");


    /* =====================================================
       FORMAT TIME
       ===================================================== */

    function formatTime(seconds) {

        seconds = Math.max(
            0,
            Math.floor(Number(seconds) || 0)
        );

        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(remaining).padStart(2, "0")
        );
    }


    /* =====================================================
       TIMER MODE
       ===================================================== */

    function getMode() {

        const text = modeElement
            ? modeElement.textContent.trim().toUpperCase()
            : "FOCUS";

        if (text.includes("SHORT")) {
            return "short";
        }

        if (text.includes("LONG")) {
            return "long";
        }

        return "focus";
    }


    function getModeLabel() {

        const mode = getMode();

        if (mode === "short") {
            return "SHORT BREAK";
        }

        if (mode === "long") {
            return "LONG BREAK";
        }

        return "FOCUS";
    }


    /* =====================================================
       TIMER TABS
       ===================================================== */

    function createTimerTabs() {

        if (!timerCard) {
            return;
        }

        if (document.querySelector(".rakkez-timer-tabs")) {
            return;
        }

        const tabs = document.createElement("div");

        tabs.className = "rakkez-timer-tabs";

        tabs.innerHTML = `
            <button
                class="rakkez-timer-tab active"
                data-rakkez-timer-mode="focus"
                type="button"
            >
                Focus
            </button>

            <button
                class="rakkez-timer-tab"
                data-rakkez-timer-mode="short"
                type="button"
            >
                Short Break
            </button>

            <button
                class="rakkez-timer-tab"
                data-rakkez-timer-mode="long"
                type="button"
            >
                Long Break
            </button>
        `;

        if (modeElement) {
            timerCard.insertBefore(
                tabs,
                modeElement
            );
        } else {
            timerCard.prepend(tabs);
        }
    }


    function updateTabs() {

        const current = getMode();

        document
            .querySelectorAll(".rakkez-timer-tab")
            .forEach(function (tab) {

                tab.classList.toggle(
                    "active",
                    tab.dataset.rakkezTimerMode === current
                );

            });
    }


    /* =====================================================
       CHANGE TIMER MODE
       ===================================================== */

    function changeMode(mode) {

        const candidates = [
            "setTimerMode",
            "switchTimerMode",
            "changeTimerMode",
            "setMode",
            "switchMode"
        ];

        for (
            let i = 0;
            i < candidates.length;
            i++
        ) {

            const name = candidates[i];

            if (typeof window[name] === "function") {

                try {

                    window[name](mode);

                    updateTabs();

                    return true;

                } catch (error) {

                    console.warn(
                        "RakkeZ timer mode:",
                        name,
                        error
                    );

                }
            }
        }


        /*
         * Safe fallback.
         */

        try {

            const settings = JSON.parse(
                localStorage.getItem(
                    "rakkez_settings"
                ) || "{}"
            );

            let minutes;

            if (mode === "focus") {

                minutes =
                    Number(settings.focus) || 25;

            } else if (mode === "short") {

                minutes =
                    Number(settings.shortBreak) || 5;

            } else {

                minutes =
                    Number(settings.longBreak) || 15;
            }


            const stateRaw =
                localStorage.getItem(
                    "rakkez_timer_state"
                );

            if (!stateRaw) {
                return false;
            }

            const state =
                JSON.parse(stateRaw);

            state.mode = mode;

            state.remaining =
                minutes * 60;

            state.total =
                minutes * 60;

            state.running = false;
            state.isRunning = false;


            localStorage.setItem(
                "rakkez_timer_state",
                JSON.stringify(state)
            );


            if (timerElement) {

                timerElement.textContent =
                    formatTime(minutes * 60);
            }


            if (modeElement) {

                modeElement.textContent =
                    mode === "focus"
                        ? "FOCUS"
                        : mode === "short"
                            ? "SHORT BREAK"
                            : "LONG BREAK";
            }


            updateTabs();

            return true;

        } catch (error) {

            console.warn(
                "RakkeZ timer fallback failed:",
                error
            );

        }

        return false;
    }


    /* =====================================================
       TIMER TAB EVENTS
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const tab =
                event.target.closest(
                    ".rakkez-timer-tab"
                );

            if (!tab) {
                return;
            }

            const mode =
                tab.dataset.rakkezTimerMode;

            if (!mode) {
                return;
            }

            changeMode(mode);
        }
    );


    /* =====================================================
       RESET MODAL
       ===================================================== */

    const resetOverlay =
        $("rakkezResetTimerOverlay");

    const resetCurrent =
        $("rakkezResetCurrent");

    const resetFull =
        $("rakkezResetFull");

    const resetCancel =
        $("rakkezResetCancel");


    function openReset() {

        if (!resetOverlay) {

            console.error(
                "RakkeZ: Reset overlay not found."
            );

            return;
        }

        resetOverlay.classList.add("show");

        resetOverlay.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function closeReset() {

        if (!resetOverlay) {
            return;
        }

        resetOverlay.classList.remove("show");

        resetOverlay.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    /* =====================================================
       GET TIMER MINUTES
       ===================================================== */

    function getTimerMinutes(mode) {

        let settings = {};

        try {

            settings = JSON.parse(
                localStorage.getItem(
                    "rakkez_settings"
                ) || "{}"
            );

        } catch (error) {

            console.warn(
                "RakkeZ: settings read failed",
                error
            );
        }


        if (mode === "short") {

            return (
                Number(settings.shortBreak) || 5
            );
        }


        if (mode === "long") {

            return (
                Number(settings.longBreak) || 15
            );
        }


        return (
            Number(settings.focus) || 25
        );
    }


    /* =====================================================
       DIRECT TIMER RESET
       ===================================================== */

    function directReset(mode) {

        const seconds =
            getTimerMinutes(mode) * 60;


        let state = {};

        try {

            state = JSON.parse(
                localStorage.getItem(
                    "rakkez_timer_state"
                ) || "{}"
            );

        } catch (error) {

            console.warn(
                "RakkeZ: timer state read failed",
                error
            );
        }


        /*
         * Stop timer.
         */

        state.running = false;
        state.isRunning = false;


        /*
         * Reset only timer state.
         *
         * IMPORTANT:
         * Stats/history/tasks are untouched.
         */

        state.mode = mode;
        state.remaining = seconds;
        state.total = seconds;


        localStorage.setItem(
            "rakkez_timer_state",
            JSON.stringify(state)
        );


        /* =================================================
           UPDATE UI
           ================================================= */

        if (timerElement) {

            timerElement.textContent =
                formatTime(seconds);
        }


        if (modeElement) {

            modeElement.textContent =
                mode === "focus"
                    ? "FOCUS"
                    : mode === "short"
                        ? "SHORT BREAK"
                        : "LONG BREAK";
        }


        if (startButton) {

            startButton.textContent =
                "START";
        }


        updateTabs();


        /* =================================================
           TAB TITLE
           ================================================= */

        if (
            typeof window.updateTabTitle ===
            "function"
        ) {

            try {

                window.updateTabTitle(
                    seconds,
                    false
                );

            } catch (error) {

                console.warn(
                    "RakkeZ: tab title update failed",
                    error
                );
            }
        }


        /* =================================================
           NOTIFY EXISTING TIMER SYSTEM
           ================================================= */

        window.dispatchEvent(
            new CustomEvent(
                "rakkezTimerReset",
                {
                    detail: {
                        mode: mode,
                        remaining: seconds,
                        total: seconds
                    }
                }
            )
        );


        console.log(
            "RakkeZ: timer reset successfully:",
            mode,
            seconds
        );
    }


    /* =====================================================
       MAIN RESET BUTTON
       ===================================================== */

    if (resetButton) {

        /*
         * Capture phase ensures our reset dialog opens
         * before another click handler interferes.
         */

        resetButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                openReset();

            },
            true
        );
    }


    /* =====================================================
       RESET CURRENT SEGMENT
       ===================================================== */

    if (resetCurrent) {

        resetCurrent.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const currentMode =
                    getMode();

                closeReset();

                directReset(
                    currentMode
                );
            }
        );
    }


    /* =====================================================
       RESET FULL SESSION
       ===================================================== */

    if (resetFull) {

        resetFull.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                closeReset();

                /*
                 * Full Session:
                 *
                 * Return to Focus.
                 */

                directReset("focus");
            }
        );
    }


    /* =====================================================
       CANCEL
       ===================================================== */

    if (resetCancel) {

        resetCancel.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                closeReset();
            }
        );
    }


    /* =====================================================
       OUTSIDE CLICK
       ===================================================== */

    if (resetOverlay) {

        resetOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    resetOverlay
                ) {

                    closeReset();
                }
            }
        );
    }


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeReset();
            }
        }
    );


    /* =====================================================
       MINI TIMER ELEMENTS
       ===================================================== */

    const miniButton =
        $("miniTimerBtn");

    const floating =
        $("rakkezMiniFloating");

    const miniTime =
        $("rakkezMiniTime");

    const miniMode =
        $("rakkezMiniMode");

    const miniStart =
        $("rakkezMiniStart");

    const miniReset =
        $("rakkezMiniReset");

    const miniClose =
        $("rakkezMiniClose");


    let miniSyncInterval = null;
    let pipWindow = null;
    let pipSyncInterval = null;


    /* =====================================================
       GET TIMER TEXT
       ===================================================== */

    function getTimerText() {

        if (!timerElement) {
            return "--:--";
        }

        const text =
            timerElement.textContent.trim();

        return text || "--:--";
    }


    /* =====================================================
       CHECK RUNNING
       ===================================================== */

    function isTimerRunning() {

        if (!startButton) {
            return false;
        }

        const text =
            startButton.textContent
                .trim()
                .toUpperCase();

        return (
            text.includes("PAUSE") ||
            text.includes("إيقاف") ||
            text.includes("PAUS")
        );
    }


    /* =====================================================
       FLOATING MINI SYNC
       ===================================================== */

    function updateFloatingMini() {

        if (!floating) {
            return;
        }

        if (miniTime) {

            miniTime.textContent =
                getTimerText();
        }

        if (miniMode) {

            miniMode.textContent =
                getModeLabel();
        }

        if (miniStart) {

            miniStart.textContent =
                isTimerRunning()
                    ? "PAUSE"
                    : "START";
        }
    }


    function startFloatingSync() {

        stopFloatingSync();

        updateFloatingMini();

        miniSyncInterval =
            setInterval(
                updateFloatingMini,
                200
            );
    }


    function stopFloatingSync() {

        if (miniSyncInterval) {

            clearInterval(
                miniSyncInterval
            );

            miniSyncInterval = null;
        }
    }


    function showFloatingMini() {

        if (!floating) {
            return;
        }

        floating.classList.add("show");

        floating.setAttribute(
            "aria-hidden",
            "false"
        );

        startFloatingSync();
    }


    function hideFloatingMini() {

        if (!floating) {
            return;
        }

        floating.classList.remove("show");

        floating.setAttribute(
            "aria-hidden",
            "true"
        );

        stopFloatingSync();
    }


    /* =====================================================
       DOCUMENT PICTURE-IN-PICTURE
       ===================================================== */

    function canUseDocumentPiP() {

        return (
            "documentPictureInPicture" in window &&
            window.documentPictureInPicture &&
            typeof
                window.documentPictureInPicture
                    .requestWindow === "function"
        );
    }


    /* =====================================================
       OPEN MINI TIMER
       ===================================================== */

    async function openMiniTimer() {

        if (!canUseDocumentPiP()) {

            console.warn(
                "RakkeZ: Document Picture-in-Picture is not supported."
            );

            showFloatingMini();

            return;
        }


        if (
            pipWindow &&
            !pipWindow.closed
        ) {

            try {
                pipWindow.focus();
            } catch (error) {}

            return;
        }


        try {

            pipWindow =
                await window
                    .documentPictureInPicture
                    .requestWindow({
                        width: 360,
                        height: 220
                    });


            if (!pipWindow) {

                showFloatingMini();

                return;
            }


            /* =================================================
               PIP STYLES
               ================================================= */

            const style =
                pipWindow.document
                    .createElement("style");

            style.textContent = `

                * {
                    box-sizing: border-box;
                }

                html,
                body {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    background: #03050a;
                }

                body {
                    font-family:
                        "DM Sans",
                        Arial,
                        sans-serif;
                }

                .rakkez-mini-timer {
                    width: 100%;
                    height: 100%;
                    min-height: 100%;

                    position: relative;

                    overflow: hidden;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background:
                        radial-gradient(
                            circle at 50% 25%,
                            rgba(22,131,255,.22),
                            transparent 48%
                        ),
                        #03050a;

                    color: #fff;

                    font-family:
                        "DM Sans",
                        Arial,
                        sans-serif;
                }

                .rakkez-mini-bg {
                    position: absolute;
                    inset: 0;

                    background:
                        radial-gradient(
                            circle at 15% 20%,
                            rgba(22,131,255,.18),
                            transparent 35%
                        ),
                        radial-gradient(
                            circle at 85% 80%,
                            rgba(80,100,180,.14),
                            transparent 40%
                        );

                    pointer-events: none;
                }

                .rakkez-mini-content {
                    position: relative;
                    z-index: 2;

                    width: 100%;
                    padding: 18px;

                    text-align: center;
                }

                .rakkez-mini-mode {
                    margin-bottom: 8px;

                    color: rgba(255,255,255,.42);

                    font-size: 10px;
                    font-weight: 800;

                    letter-spacing: 2px;
                }

                .rakkez-mini-time {
                    color: #fff;

                    font-family:
                        "Space Grotesk",
                        Arial,
                        sans-serif;

                    font-size:
                        clamp(50px, 14vw, 86px);

                    font-weight: 600;

                    line-height: 1;
                    letter-spacing: -3px;

                    font-variant-numeric:
                        tabular-nums;
                }

                .rakkez-mini-buttons {
                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 8px;

                    margin-top: 22px;
                }

                .rakkez-mini-buttons button {
                    height: 36px;
                    min-width: 42px;

                    padding: 0 12px;

                    border:
                        1px solid
                        rgba(255,255,255,.10);

                    border-radius: 10px;

                    background:
                        rgba(255,255,255,.07);

                    color: #fff;

                    font-size: 12px;

                    cursor: pointer;
                }

                .rakkez-mini-buttons
                button:hover {
                    background:
                        rgba(255,255,255,.13);
                }

                .rakkez-mini-start {
                    min-width: 82px !important;

                    background: #fff !important;
                    color: #05070b !important;

                    border-color:
                        transparent !important;

                    font-weight: 700;
                }
            `;


            pipWindow.document.head.appendChild(
                style
            );


            /* =================================================
               CREATE PIP TIMER
               ================================================= */

            const mini =
                pipWindow.document
                    .createElement("div");

            mini.className =
                "rakkez-mini-timer";

            mini.innerHTML = `

                <div
                    class="rakkez-mini-bg"
                ></div>

                <div
                    class="rakkez-mini-content"
                >

                    <div
                        class="rakkez-mini-mode"
                        data-rakkez-pip-mode
                    >
                        FOCUS
                    </div>

                    <div
                        class="rakkez-mini-time"
                        data-rakkez-pip-time
                    >
                        25:00
                    </div>

                    <div
                        class="rakkez-mini-buttons"
                    >

                        <button
                            class="rakkez-mini-start"
                            data-rakkez-pip-start
                            type="button"
                        >
                            START
                        </button>

                        <button
                            data-rakkez-pip-reset
                            type="button"
                        >
                            ↻
                        </button>

                    </div>

                </div>
            `;


            pipWindow.document.body.appendChild(
                mini
            );


            /* =================================================
               PIP ELEMENTS
               ================================================= */

            const pipTime =
                mini.querySelector(
                    "[data-rakkez-pip-time]"
                );

            const pipMode =
                mini.querySelector(
                    "[data-rakkez-pip-mode]"
                );

            const pipStart =
                mini.querySelector(
                    "[data-rakkez-pip-start]"
                );

            const pipReset =
                mini.querySelector(
                    "[data-rakkez-pip-reset]"
                );


            /* =================================================
               PIP SYNC
               ================================================= */

            function syncPiP() {

                if (
                    !pipWindow ||
                    pipWindow.closed
                ) {
                    return;
                }

                if (pipTime) {

                    pipTime.textContent =
                        getTimerText();
                }

                if (pipMode) {

                    pipMode.textContent =
                        getModeLabel();
                }

                if (pipStart) {

                    pipStart.textContent =
                        isTimerRunning()
                            ? "PAUSE"
                            : "START";
                }
            }


            /* =================================================
               PIP START / PAUSE
               ================================================= */

            if (pipStart) {

                pipStart.addEventListener(
                    "click",
                    function () {

                        if (!startButton) {
                            return;
                        }

                        startButton.click();

                        setTimeout(
                            syncPiP,
                            50
                        );
                    }
                );
            }


            /* =================================================
               PIP RESET
               ================================================= */

            if (pipReset) {

                pipReset.addEventListener(
                    "click",
                    function () {

                        openReset();
                    }
                );
            }


            /* =================================================
               PIP SYNC
               ================================================= */

            if (pipSyncInterval) {

                clearInterval(
                    pipSyncInterval
                );
            }

            pipSyncInterval =
                setInterval(
                    syncPiP,
                    200
                );


            /* =================================================
               PIP CLOSE
               ================================================= */

            pipWindow.addEventListener(
                "pagehide",
                function () {

                    if (pipSyncInterval) {

                        clearInterval(
                            pipSyncInterval
                        );

                        pipSyncInterval = null;
                    }

                    pipWindow = null;
                }
            );


            syncPiP();

        } catch (error) {

            console.warn(
                "RakkeZ: Unable to open Document Picture-in-Picture.",
                error
            );

            pipWindow = null;

            if (pipSyncInterval) {

                clearInterval(
                    pipSyncInterval
                );

                pipSyncInterval = null;
            }

            showFloatingMini();
        }
    }


    /* =====================================================
       MINI TIMER BUTTON
       ===================================================== */

    if (miniButton) {

        miniButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                openMiniTimer();
            }
        );
    }


    /* =====================================================
       FALLBACK START / PAUSE
       ===================================================== */

    if (miniStart) {

        miniStart.addEventListener(
            "click",
            function () {

                if (!startButton) {
                    return;
                }

                startButton.click();

                setTimeout(
                    updateFloatingMini,
                    50
                );
            }
        );
    }


    /* =====================================================
       FALLBACK RESET
       ===================================================== */

    if (miniReset) {

        miniReset.addEventListener(
            "click",
            function () {

                openReset();
            }
        );
    }


    /* =====================================================
       FALLBACK CLOSE
       ===================================================== */

    if (miniClose) {

        miniClose.addEventListener(
            "click",
            function () {

                hideFloatingMini();
            }
        );
    }


    /* =====================================================
       GLOBAL SYNC
       ===================================================== */

    setInterval(
        function () {

            updateTabs();
            updateFloatingMini();

        },
        500
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    createTimerTabs();
    updateTabs();

    console.log(
        "RakkeZ: Timer Enhancements loaded successfully."
    );
}


/* =========================================================
   SAFE INITIALIZATION
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initRakkeZTimerEnhancements,
        {
            once: true
        }
    );

} else {

    initRakkeZTimerEnhancements();
}

})();
