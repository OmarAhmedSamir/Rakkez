/* =========================================================
   RAKKEZ - LANGUAGE SYSTEM
========================================================= */

(function () {

    "use strict";

    /* =========================================================
       TRANSLATIONS
    ========================================================= */

    const translations = {

        en: {

            language: "العربية",
            logo: "RakkeZ",

            blog: "Blog",

            focus: "FOCUS",
            shortBreak: "SHORT BREAK",
            longBreak: "LONG BREAK",

            timerLabel: "Stay focused. One thing at a time.",
            noTask: "NO TASK SELECTED",

            start: "START",
            focusOnly: "Focus Only",
            theme: "Theme",
            settings: "Settings",
            media: "Media",
            tasks: "Tasks",

            focusStat: "Focus",
            dailyGoal: "Daily Goal",
            sessions: "Sessions",
            streak: "Streak",

            ambient: "✦ AMBIENT",
            exitFocus: "EXIT FOCUS",

            settingsTitle: "Settings",
            timer: "Timer",

            focusDuration: "Focus Duration",
            focusDescription: "Minutes for every focus session",

            shortBreakTitle: "Short Break",
            shortBreakDescription: "Break between sessions",

            longBreakTitle: "Long Break",
            longBreakDescription: "Longer break",

            sessionsBeforeLong:
                "Sessions Before Long Break",

            dailyGoalTitle: "Daily Goal",
            dailyFocusGoal: "Daily Focus Goal",
            dailyGoalDescription:
                "Your target focus time",

            minutes: "minutes",

            smartTimer: "Smart Timer",

            autoStart: "Auto Start",
            autoStartDescription:
                "Automatically start next phase",

            smartTimerDescription:
                "Restore timer after leaving",

            alarm: "Alarm",

            completionSound: "Completion Sound",
            completionSoundDescription:
                "Sound when a phase finishes",

            alarmVolume: "Alarm Volume",
            alarmVolumeDescription:
                "Notification volume",

            alarmSound: "Alarm Sound",
            alarmSoundDescription:
                "Choose your completion sound",

            softBell: "Soft Bell",
            digital: "Digital",
            focusSound: "Focus",
            gentle: "Gentle",
            deep: "Deep",
            success: "Success",
            custom: "Custom",

            testSound: "Test Sound",
            testSoundDescription:
                "Preview the selected alarm",

            test: "Test",

            uploadCustom: "+ Upload Custom Alarm",
            audioFormats: "MP3 / WAV / M4A",

            accounts: "Accounts",
            spotify: "Spotify",
            googleYoutube: "Google / YouTube",
            notConnected: "Not connected",
            connect: "Connect",

            reset: "Reset",
            resetStats: "Reset All Statistics",

            tasksTitle: "Tasks",
            tasksSubtitle: "What are you focusing on?",
            taskPlaceholder: "Add a task...",
            noTasks: "No tasks yet.",
            addSomething:
                "Add something you want to accomplish.",

            mediaTitle: "Media",
            youtube: "YouTube",
            spotifyTab: "Spotify",
            local: "Local",

            youtubePlaceholder:
                "Paste a YouTube URL...",

            playYoutube: "Play YouTube",

            spotifyPlaceholder:
                "Paste Spotify track / playlist / album...",

            openSpotify: "Open Spotify Player",

            chooseMusic: "Choose Music or Video",

            mediaFormats:
                "MP3, WAV, M4A, MP4, WebM",

            nothingPlaying: "Nothing playing",

            ambientTitle: "Ambient",

            ambientSubtitle:
                "Choose your atmosphere.",

            uploadBackground:
                "+ Upload Image / Video Background",

            resetEverything:
                "Reset everything?",

            resetDescription:
                "This will remove your sessions, focus time, streak and tasks. This cannot be undone.",

            cancel: "Cancel",

            resetButton: "Reset"

        },


        ar: {

            language: "English",
            logo: "ركز",

            blog: "المدونة",

            focus: "التركيز",
            shortBreak: "استراحة قصيرة",
            longBreak: "استراحة طويلة",

            timerLabel:
                "ركز على شيء واحد فقط.",

            noTask:
                "لم يتم اختيار مهمة",

            start: "ابدأ",

            focusOnly:
                "وضع التركيز",

            theme:
                "المظهر",

            settings:
                "الإعدادات",

            media:
                "الوسائط",

            tasks:
                "المهام",

            focusStat:
                "التركيز",

            dailyGoal:
                "الهدف اليومي",

            sessions:
                "الجلسات",

            streak:
                "أيام متتالية",

            ambient:
                "✦ الأجواء",

            exitFocus:
                "الخروج من التركيز",

            settingsTitle:
                "الإعدادات",

            timer:
                "المؤقت",

            focusDuration:
                "مدة التركيز",

            focusDescription:
                "عدد دقائق كل جلسة تركيز",

            shortBreakTitle:
                "الاستراحة القصيرة",

            shortBreakDescription:
                "استراحة بين الجلسات",

            longBreakTitle:
                "الاستراحة الطويلة",

            longBreakDescription:
                "استراحة أطول",

            sessionsBeforeLong:
                "عدد الجلسات قبل الاستراحة الطويلة",

            dailyGoalTitle:
                "الهدف اليومي",

            dailyFocusGoal:
                "هدف التركيز اليومي",

            dailyGoalDescription:
                "الوقت المستهدف للتركيز",

            minutes:
                "دقيقة",

            smartTimer:
                "المؤقت الذكي",

            autoStart:
                "البدء التلقائي",

            autoStartDescription:
                "ابدأ المرحلة التالية تلقائيًا",

            smartTimerDescription:
                "استعادة المؤقت بعد مغادرة الصفحة",

            alarm:
                "التنبيه",

            completionSound:
                "صوت انتهاء الجلسة",

            completionSoundDescription:
                "الصوت عند انتهاء المرحلة",

            alarmVolume:
                "مستوى صوت التنبيه",

            alarmVolumeDescription:
                "مستوى صوت الإشعار",

            alarmSound:
                "صوت التنبيه",

            alarmSoundDescription:
                "اختر صوت انتهاء الجلسة",

            softBell:
                "جرس هادئ",

            digital:
                "رقمي",

            focusSound:
                "تركيز",

            gentle:
                "لطيف",

            deep:
                "عميق",

            success:
                "نجاح",

            custom:
                "مخصص",

            testSound:
                "تجربة الصوت",

            testSoundDescription:
                "معاينة صوت التنبيه المحدد",

            test:
                "تجربة",

            uploadCustom:
                "+ رفع تنبيه مخصص",

            audioFormats:
                "MP3 / WAV / M4A",

            accounts:
                "الحسابات",

            spotify:
                "Spotify",

            googleYoutube:
                "Google / YouTube",

            notConnected:
                "غير متصل",

            connect:
                "اتصال",

            reset:
                "إعادة ضبط",

            resetStats:
                "إعادة ضبط جميع الإحصائيات",

            tasksTitle:
                "المهام",

            tasksSubtitle:
                "ما الذي تركز عليه؟",

            taskPlaceholder:
                "أضف مهمة...",

            noTasks:
                "لا توجد مهام بعد.",

            addSomething:
                "أضف شيئًا تريد إنجازه.",

            mediaTitle:
                "الوسائط",

            youtube:
                "YouTube",

            spotifyTab:
                "Spotify",

            local:
                "ملفات محلية",

            youtubePlaceholder:
                "الصق رابط YouTube...",

            playYoutube:
                "تشغيل YouTube",

            spotifyPlaceholder:
                "الصق رابط أغنية أو قائمة Spotify...",

            openSpotify:
                "فتح مشغل Spotify",

            chooseMusic:
                "اختر موسيقى أو فيديو",

            mediaFormats:
                "MP3, WAV, M4A, MP4, WebM",

            nothingPlaying:
                "لا يوجد شيء قيد التشغيل",

            ambientTitle:
                "الأجواء",

            ambientSubtitle:
                "اختر الأجواء المناسبة لك.",

            uploadBackground:
                "+ رفع صورة / فيديو للخلفية",

            resetEverything:
                "إعادة ضبط كل شيء؟",

            resetDescription:
                "سيؤدي هذا إلى حذف جلساتك ووقت التركيز والأيام المتتالية والمهام. لا يمكن التراجع عن ذلك.",

            cancel:
                "إلغاء",

            resetButton:
                "إعادة ضبط"

        }

    };


    /* =========================================================
       CURRENT LANGUAGE
    ========================================================= */

    let currentLanguage =
        localStorage.getItem("rakkez_language") || "en";


    /* =========================================================
       HELPERS
    ========================================================= */

    function get(id) {

        return document.getElementById(id);

    }


    function setText(element, text) {

        if (!element) return;

        element.textContent = text;

    }


    function setPlaceholder(element, text) {

        if (!element) return;

        element.placeholder = text;

    }


    /* =========================================================
       APPLY LANGUAGE
    ========================================================= */

    function applyLanguage(lang) {

        const t = translations[lang];

        if (!t) return;


        /* LANGUAGE */

        document.documentElement.lang = lang;

        document.documentElement.dir =
            lang === "ar" ? "rtl" : "ltr";


        document.body.dir =
            lang === "ar" ? "rtl" : "ltr";


        /* HEADER */

        setText(
            get("languageLabel"),
            t.language
        );


        setText(
            document.querySelector(".blog-btn"),
            t.blog
        );


        /* TIMER */

        const mode =
            get("modeText");

        if (mode) {

            const current =
                mode.dataset.mode ||
                "focus";

            if (current === "short") {

                setText(
                    mode,
                    t.shortBreak
                );

            } else if (current === "long") {

                setText(
                    mode,
                    t.longBreak
                );

            } else {

                setText(
                    mode,
                    t.focus
                );

            }

        }


        setText(
            get("timerLabel"),
            t.timerLabel
        );


        const currentTask =
            get("currentTask");

        if (currentTask) {

            const span =
                currentTask.querySelector("span");

            if (span) {

                setText(
                    span,
                    t.noTask
                );

            }

        }


        setText(
            get("startBtn"),
            t.start
        );


        setText(
            get("focusExit"),
            t.exitFocus
        );


        /* =====================================================
           BOTTOM STATS
        ===================================================== */

        const statTitles =
            document.querySelectorAll(".stat-title");


        if (statTitles.length >= 4) {

            setText(
                statTitles[0],
                t.focusStat
            );

            setText(
                statTitles[1],
                t.dailyGoal
            );

            setText(
                statTitles[2],
                t.sessions
            );

            setText(
                statTitles[3],
                t.streak
            );

        }


        /* =====================================================
           MAIN BUTTONS
        ===================================================== */

        setText(
            get("ambientOpen"),
            t.ambient
        );


        /* =====================================================
           SETTINGS
        ===================================================== */

        const settingsOverlay =
            get("settingsOverlay");


        if (settingsOverlay) {

            const title =
                settingsOverlay.querySelector(
                    ".panel-title"
                );

            setText(
                title,
                t.settingsTitle
            );


            const sections =
                settingsOverlay.querySelectorAll(
                    ".section-title"
                );


            const sectionTexts = [

                t.timer,
                t.dailyGoalTitle,
                t.smartTimer,
                t.alarm,
                t.accounts

            ];


            sections.forEach(
                (element, index) => {

                    if (sectionTexts[index]) {

                        setText(
                            element,
                            sectionTexts[index]
                        );

                    }

                }
            );


            /* SETTING NAMES */

            const names =
                settingsOverlay.querySelectorAll(
                    ".setting-name"
                );


            const nameTexts = [

                t.focusDuration,
                t.shortBreakTitle,
                t.longBreakTitle,
                t.sessionsBeforeLong,
                t.dailyFocusGoal,
                t.autoStart,
                t.smartTimer,
                t.completionSound,
                t.alarmVolume,
                t.alarmSound,
                t.testSound

            ];


            names.forEach(
                (element, index) => {

                    if (nameTexts[index]) {

                        setText(
                            element,
                            nameTexts[index]
                        );

                    }

                }
            );


            /* DESCRIPTIONS */

            const descriptions =
                settingsOverlay.querySelectorAll(
                    ".setting-description"
                );


            const descriptionTexts = [

                t.focusDescription,
                t.shortBreakDescription,
                t.longBreakDescription,
                "",
                t.dailyGoalDescription,
                t.autoStartDescription,
                t.smartTimerDescription,
                t.completionSoundDescription,
                t.alarmVolumeDescription,
                t.alarmSoundDescription,
                t.testSoundDescription

            ];


            descriptions.forEach(
                (element, index) => {

                    if (descriptionTexts[index]) {

                        setText(
                            element,
                            descriptionTexts[index]
                        );

                    }

                }
            );

        }


        /* =====================================================
           ALARM
        ===================================================== */

        setText(
            get("testAlarmText"),
            t.test
        );


        const alarmUpload =
            get("alarmUploadLabel");


        if (alarmUpload) {

            setText(
                alarmUpload.querySelector("strong"),
                t.uploadCustom
            );


            setText(
                alarmUpload.querySelector("span"),
                t.audioFormats
            );

        }


        /* =====================================================
           ACCOUNTS
        ===================================================== */

        setText(
            get("spotifyStatus"),
            t.notConnected
        );


        setText(
            get("googleStatus"),
            t.notConnected
        );


        document
            .querySelectorAll(".account-button")
            .forEach(button => {

                setText(
                    button,
                    t.connect
                );

            });


        /* =====================================================
           RESET
        ===================================================== */

        setText(
            get("resetStatsBtn"),
            t.resetStats
        );


        /* =====================================================
           TASKS
        ===================================================== */

        const tasksOverlay =
            get("tasksOverlay");


        if (tasksOverlay) {

            setText(
                tasksOverlay.querySelector(
                    ".panel-title"
                ),
                t.tasksTitle
            );


            setText(
                tasksOverlay.querySelector(
                    ".panel-subtitle"
                ),
                t.tasksSubtitle
            );

        }


        setPlaceholder(
            get("taskInput"),
            t.taskPlaceholder
        );


        setText(
            get("taskEmpty"),
            t.noTasks
        );


        /* =====================================================
           MEDIA
        ===================================================== */

        const mediaOverlay =
            get("mediaOverlay");


        if (mediaOverlay) {

            setText(
                mediaOverlay.querySelector(
                    ".panel-title"
                ),
                t.mediaTitle
            );

        }


        document
            .querySelectorAll(".media-tab")
            .forEach((tab, index) => {

                if (index === 0) {

                    setText(
                        tab,
                        t.youtube
                    );

                }

                if (index === 1) {

                    setText(
                        tab,
                        t.spotifyTab
                    );

                }

                if (index === 2) {

                    setText(
                        tab,
                        t.local
                    );

                }

            });


        setPlaceholder(
            get("youtubeInput"),
            t.youtubePlaceholder
        );


        setText(
            get("youtubePlay"),
            t.playYoutube
        );


        setPlaceholder(
            get("spotifyInput"),
            t.spotifyPlaceholder
        );


        setText(
            get("spotifyPlay"),
            t.openSpotify
        );


        const mediaFileLabel =
            document.querySelector(
                'label[for="mediaFile"]'
            );


        if (mediaFileLabel) {

            setText(
                mediaFileLabel.querySelector(
                    "strong"
                ),
                t.chooseMusic
            );


            setText(
                mediaFileLabel.querySelector(
                    "span"
                ),
                t.mediaFormats
            );

        }


        setText(
            get("mediaName"),
            t.nothingPlaying
        );


        /* =====================================================
           AMBIENT
        ===================================================== */

        const ambientOverlay =
            get("ambientOverlay");


        if (ambientOverlay) {

            setText(
                ambientOverlay.querySelector(
                    ".panel-title"
                ),
                t.ambientTitle
            );


            setText(
                ambientOverlay.querySelector(
                    ".panel-subtitle"
                ),
                t.ambientSubtitle
            );

        }


        setText(
            document.querySelector(
                'label[for="bgFile"]'
            ),
            t.uploadBackground
        );


        /* =====================================================
           RESET CONFIRM
        ===================================================== */

        const confirmOverlay =
            get("confirmOverlay");


        if (confirmOverlay) {

            setText(
                confirmOverlay.querySelector(
                    ".panel-title"
                ),
                t.resetEverything
            );


            setText(
                confirmOverlay.querySelector(
                    ".confirm-description"
                ),
                t.resetDescription
            );

        }


        setText(
            get("confirmReset"),
            t.resetButton
        );


        document
            .querySelectorAll(
                '[data-close="confirmOverlay"]'
            )
            .forEach(button => {

                setText(
                    button,
                    t.cancel
                );

            });


        /* =====================================================
           SAVE LANGUAGE
        ===================================================== */

        localStorage.setItem(
            "rakkez_language",
            lang
        );


        currentLanguage = lang;


        /* =====================================================
           LANGUAGE BUTTON
        ===================================================== */

        const languageButton =
            get("languageToggle");


        if (languageButton) {

            languageButton.setAttribute(
                "aria-label",
                lang === "ar"
                    ? "Switch to English"
                    : "التبديل إلى العربية"
            );

        }

    }


    /* =========================================================
       TOGGLE
    ========================================================= */

    function toggleLanguage() {

        const next =
            currentLanguage === "en"
                ? "ar"
                : "en";

        applyLanguage(next);

    }


    /* =========================================================
       INIT
    ========================================================= */

    function initLanguage() {

        const button =
            get("languageToggle");


        if (!button) {

            console.error(
                "RakkeZ: languageToggle was not found."
            );

            return;

        }


        /* Prevent duplicate listeners */

        if (
            button.dataset.languageReady === "true"
        ) {

            return;

        }


        button.dataset.languageReady = "true";


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleLanguage();

            }
        );


        applyLanguage(
            currentLanguage
        );

    }


    /* =========================================================
       START
    ========================================================= */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initLanguage
        );

    } else {

        initLanguage();

    }

})();
