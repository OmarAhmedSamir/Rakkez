/* =========================================================
   RAKKEZ V2 - LANGUAGE SYSTEM
========================================================= */

(function () {

    "use strict";

    /* =========================================================
       TRANSLATIONS
    ========================================================= */

    const translations = {

        en: {

            language: "العربية",

            blog: "Blog",

            focus: "FOCUS",
            shortBreak: "SHORT BREAK",
            longBreak: "LONG BREAK",

            timerLabel:
                "Stay focused. One thing at a time.",

            noTask:
                "NO TASK SELECTED",

            start: "START",

            focusOnly:
                "Focus Only",

            theme:
                "Theme",

            settings:
                "Settings",

            media:
                "Media",

            tasks:
                "Tasks",

            focusStat:
                "Focus",

            dailyGoal:
                "Daily Goal",

            sessions:
                "Sessions",

            streak:
                "Streak",

            ambient:
                "✦ AMBIENT",

            exitFocus:
                "EXIT FOCUS",

            settingsTitle:
                "Settings",

            timer:
                "Timer",

            focusDuration:
                "Focus Duration",

            focusDescription:
                "Minutes for every focus session",

            shortBreakTitle:
                "Short Break",

            shortBreakDescription:
                "Break between sessions",

            longBreakTitle:
                "Long Break",

            longBreakDescription:
                "Longer break",

            sessionsBeforeLong:
                "Sessions Before Long Break",

            dailyGoalTitle:
                "Daily Goal",

            dailyFocusGoal:
                "Daily Focus Goal",

            dailyGoalDescription:
                "Your target focus time",

            minutes:
                "minutes",

            smartTimer:
                "Smart Timer",

            autoStart:
                "Auto Start",

            autoStartDescription:
                "Automatically start next phase",

            smartTimerDescription:
                "Restore timer after leaving",

            alarm:
                "Alarm",

            completionSound:
                "Completion Sound",

            completionSoundDescription:
                "Sound when a phase finishes",

            alarmVolume:
                "Alarm Volume",

            alarmVolumeDescription:
                "Notification volume",

            alarmSound:
                "Alarm Sound",

            alarmSoundDescription:
                "Choose your completion sound",

            softBell:
                "Soft Bell",

            digital:
                "Digital",

            focusSound:
                "Focus",

            gentle:
                "Gentle",

            deep:
                "Deep",

            success:
                "Success",

            custom:
                "Custom",

            testSound:
                "Test Sound",

            testSoundDescription:
                "Preview the selected alarm",

            test:
                "Test",

            uploadCustom:
                "+ Upload Custom Alarm",

            audioFormats:
                "MP3 / WAV / M4A",

            accounts:
                "Accounts",

            spotify:
                "Spotify",

            googleYoutube:
                "Google / YouTube",

            notConnected:
                "Not connected",

            connect:
                "Connect",

            reset:
                "Reset",

            resetStats:
                "Reset All Statistics",

            tasksTitle:
                "Tasks",

            tasksSubtitle:
                "What are you focusing on?",

            taskPlaceholder:
                "Add a task...",

            noTasks:
                "No tasks yet.",

            mediaTitle:
                "Media",

            youtube:
                "YouTube",

            spotifyTab:
                "Spotify",

            local:
                "Local",

            youtubePlaceholder:
                "Paste a YouTube URL...",

            playYoutube:
                "Play YouTube",

            spotifyPlaceholder:
                "Paste Spotify track / playlist / album...",

            openSpotify:
                "Open Spotify Player",

            chooseMusic:
                "Choose Music or Video",

            mediaFormats:
                "MP3, WAV, M4A, MP4, WebM",

            nothingPlaying:
                "Nothing playing",

            ambientTitle:
                "Ambient",

            ambientSubtitle:
                "Choose your atmosphere.",

            uploadBackground:
                "+ Upload Image / Video Background",

            resetEverything:
                "Reset everything?",

            resetDescription:
                "This will remove your sessions, focus time, streak and tasks. This cannot be undone.",

            cancel:
                "Cancel",

            resetButton:
                "Reset"

        },


        ar: {

            language: "English",

            blog: "Blog",

            focus: "التركيز",

            shortBreak:
                "استراحة قصيرة",

            longBreak:
                "استراحة طويلة",

            timerLabel:
                "ركز على شيء واحد فقط.",

            noTask:
                "لم يتم اختيار مهمة",

            start:
                "ابدأ",

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

    function $(id) {
        return document.getElementById(id);
    }


    function text(id, value) {

        const element = $(id);

        if (element) {
            element.textContent = value;
        }

    }


    function placeholder(id, value) {

        const element = $(id);

        if (element) {
            element.placeholder = value;
        }

    }


    /* =========================================================
       APPLY LANGUAGE
    ========================================================= */

    function applyLanguage(lang) {

        const t = translations[lang];

        if (!t) return;


        /* -----------------------------------------------------
           HTML DIRECTION
        ----------------------------------------------------- */

        document.documentElement.lang = lang;

        document.documentElement.dir =
            lang === "ar" ? "rtl" : "ltr";


        document.body.dir =
            lang === "ar" ? "rtl" : "ltr";


        /* -----------------------------------------------------
           HEADER
        ----------------------------------------------------- */

        text("languageLabel", t.language);

        const blog =
            document.querySelector(".blog-btn");

        if (blog) {
            blog.textContent = t.blog;
        }


        /* -----------------------------------------------------
           TIMER
        ----------------------------------------------------- */

        const mode =
            $("modeText");

        if (mode) {

            if (!mode.dataset.mode) {
                mode.dataset.mode = "focus";
            }

            if (mode.dataset.mode === "short") {

                mode.textContent =
                    t.shortBreak;

            } else if (mode.dataset.mode === "long") {

                mode.textContent =
                    t.longBreak;

            } else {

                mode.textContent =
                    t.focus;

            }

        }


        text(
            "timerLabel",
            t.timerLabel
        );


        const currentTask =
            $("currentTask");

        if (currentTask) {

            const span =
                currentTask.querySelector("span");

            if (span) {
                span.textContent = t.noTask;
            }

        }


        text(
            "startBtn",
            t.start
        );


        text(
            "focusExit",
            t.exitFocus
        );


        /* -----------------------------------------------------
           BOTTOM STATS
        ----------------------------------------------------- */

        const statTitles =
            document.querySelectorAll(".stat-title");

        if (statTitles.length >= 4) {

            statTitles[0].textContent =
                t.focusStat;

            statTitles[1].textContent =
                t.dailyGoal;

            statTitles[2].textContent =
                t.sessions;

            statTitles[3].textContent =
                t.streak;

        }


        text(
            "ambientOpen",
            t.ambient
        );


        /* -----------------------------------------------------
           SETTINGS
        ----------------------------------------------------- */

        const settingsOverlay =
            $("settingsOverlay");

        if (settingsOverlay) {

            const title =
                settingsOverlay.querySelector(
                    ".panel-title"
                );

            if (title) {
                title.textContent =
                    t.settingsTitle;
            }


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

                        element.textContent =
                            sectionTexts[index];

                    }

                }
            );


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

                        element.textContent =
                            nameTexts[index];

                    }

                }
            );


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

                        element.textContent =
                            descriptionTexts[index];

                    }

                }
            );

        }


        /* -----------------------------------------------------
           ALARM
        ----------------------------------------------------- */

        text(
            "testAlarmText",
            t.test
        );


        const upload =
            $("alarmUploadLabel");

        if (upload) {

            const strong =
                upload.querySelector("strong");

            const span =
                upload.querySelector("span");

            if (strong) {
                strong.textContent =
                    t.uploadCustom;
            }

            if (span) {
                span.textContent =
                    t.audioFormats;
            }

        }


        /* -----------------------------------------------------
           ACCOUNTS
        ----------------------------------------------------- */

        text(
            "spotifyStatus",
            t.notConnected
        );

        text(
            "googleStatus",
            t.notConnected
        );


        document
            .querySelectorAll(".account-button")
            .forEach(button => {

                button.textContent =
                    t.connect;

            });


        /* -----------------------------------------------------
           RESET
        ----------------------------------------------------- */

        text(
            "resetStatsBtn",
            t.resetStats
        );


        /* -----------------------------------------------------
           TASKS
        ----------------------------------------------------- */

        const tasksOverlay =
            $("tasksOverlay");

        if (tasksOverlay) {

            const title =
                tasksOverlay.querySelector(
                    ".panel-title"
                );

            const subtitle =
                tasksOverlay.querySelector(
                    ".panel-subtitle"
                );

            if (title) {
                title.textContent =
                    t.tasksTitle;
            }

            if (subtitle) {
                subtitle.textContent =
                    t.tasksSubtitle;
            }

        }


        placeholder(
            "taskInput",
            t.taskPlaceholder
        );


        text(
            "taskEmpty",
            t.noTasks
        );


        /* -----------------------------------------------------
           MEDIA
        ----------------------------------------------------- */

        const mediaOverlay =
            $("mediaOverlay");

        if (mediaOverlay) {

            const title =
                mediaOverlay.querySelector(
                    ".panel-title"
                );

            if (title) {
                title.textContent =
                    t.mediaTitle;
            }

        }


        const mediaTabs =
            document.querySelectorAll(
                ".media-tab"
            );

        if (mediaTabs[0]) {
            mediaTabs[0].textContent =
                t.youtube;
        }

        if (mediaTabs[1]) {
            mediaTabs[1].textContent =
                t.spotifyTab;
        }

        if (mediaTabs[2]) {
            mediaTabs[2].textContent =
                t.local;
        }


        placeholder(
            "youtubeInput",
            t.youtubePlaceholder
        );


        text(
            "youtubePlay",
            t.playYoutube
        );


        placeholder(
            "spotifyInput",
            t.spotifyPlaceholder
        );


        text(
            "spotifyPlay",
            t.openSpotify
        );


        const mediaFileLabel =
            document.querySelector(
                'label[for="mediaFile"]'
            );

        if (mediaFileLabel) {

            const strong =
                mediaFileLabel.querySelector(
                    "strong"
                );

            const span =
                mediaFileLabel.querySelector(
                    "span"
                );

            if (strong) {
                strong.textContent =
                    t.chooseMusic;
            }

            if (span) {
                span.textContent =
                    t.mediaFormats;
            }

        }


        text(
            "mediaName",
            t.nothingPlaying
        );


        /* -----------------------------------------------------
           AMBIENT
        ----------------------------------------------------- */

        const ambientOverlay =
            $("ambientOverlay");

        if (ambientOverlay) {

            const title =
                ambientOverlay.querySelector(
                    ".panel-title"
                );

            const subtitle =
                ambientOverlay.querySelector(
                    ".panel-subtitle"
                );

            if (title) {
                title.textContent =
                    t.ambientTitle;
            }

            if (subtitle) {
                subtitle.textContent =
                    t.ambientSubtitle;
            }

        }


        const bgLabel =
            document.querySelector(
                'label[for="bgFile"]'
            );

        if (bgLabel) {
            bgLabel.textContent =
                t.uploadBackground;
        }


        /* -----------------------------------------------------
           RESET CONFIRM
        ----------------------------------------------------- */

        const confirmOverlay =
            $("confirmOverlay");

        if (confirmOverlay) {

            const title =
                confirmOverlay.querySelector(
                    ".panel-title"
                );

            const description =
                confirmOverlay.querySelector(
                    ".confirm-description"
                );

            if (title) {
                title.textContent =
                    t.resetEverything;
            }

            if (description) {
                description.textContent =
                    t.resetDescription;
            }

        }


        text(
            "confirmReset",
            t.resetButton
        );


        document
            .querySelectorAll(
                '[data-close="confirmOverlay"]'
            )
            .forEach(button => {

                button.textContent =
                    t.cancel;

            });


        /* -----------------------------------------------------
           SAVE
        ----------------------------------------------------- */

        localStorage.setItem(
            "rakkez_language",
            lang
        );

        currentLanguage = lang;


        /* -----------------------------------------------------
           LANGUAGE BUTTON
        ----------------------------------------------------- */

        const languageButton =
            $("languageToggle");

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

        const nextLanguage =
            currentLanguage === "en"
                ? "ar"
                : "en";

        applyLanguage(nextLanguage);

    }


    /* =========================================================
       INIT
    ========================================================= */

    function initLanguage() {

        const button =
            $("languageToggle");

        if (!button) {

            console.error(
                "RakkeZ: languageToggle NOT FOUND"
            );

            return;

        }


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

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
