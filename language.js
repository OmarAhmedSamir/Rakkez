/* =========================================================
   RAKKEZ - LANGUAGE SYSTEM
========================================================= */

(function () {

    const translations = {

        en: {
            language: "العربية",

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

            sessionsBeforeLong: "Sessions Before Long Break",

            dailyGoalTitle: "Daily Goal",
            dailyFocusGoal: "Daily Focus Goal",
            dailyGoalDescription: "Your target focus time",
            minutes: "minutes",

            smartTimer: "Smart Timer",
            autoStart: "Auto Start",
            autoStartDescription: "Automatically start next phase",

            smartTimerDescription: "Restore timer after leaving",

            alarm: "Alarm",
            completionSound: "Completion Sound",
            completionSoundDescription: "Sound when a phase finishes",

            alarmVolume: "Alarm Volume",
            alarmVolumeDescription: "Notification volume",

            alarmSound: "Alarm Sound",
            alarmSoundDescription: "Choose your completion sound",

            softBell: "Soft Bell",
            digital: "Digital",
            focusSound: "Focus",
            gentle: "Gentle",
            deep: "Deep",
            success: "Success",
            custom: "Custom",

            testSound: "Test Sound",
            testSoundDescription: "Preview the selected alarm",
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
            addSomething: "Add something you want to accomplish.",

            mediaTitle: "Media",
            youtube: "YouTube",
            spotifyTab: "Spotify",
            local: "Local",
            youtubePlaceholder: "Paste a YouTube URL...",
            playYoutube: "Play YouTube",
            spotifyPlaceholder: "Paste Spotify track / playlist / album...",
            openSpotify: "Open Spotify Player",
            chooseMusic: "Choose Music or Video",
            mediaFormats: "MP3, WAV, M4A, MP4, WebM",
            nothingPlaying: "Nothing playing",

            ambientTitle: "Ambient",
            ambientSubtitle: "Choose your atmosphere.",
            uploadBackground: "+ Upload Image / Video Background",

            resetEverything: "Reset everything?",
            resetDescription:
                "This will remove your sessions, focus time, streak and tasks. This cannot be undone.",
            cancel: "Cancel",
            resetButton: "Reset"
        },

        ar: {
            language: "English",

            blog: "المدونة",

            focus: "تركيز",
            shortBreak: "استراحة قصيرة",
            longBreak: "استراحة طويلة",

            timerLabel: "ركز على شيء واحد فقط.",

            noTask: "لم يتم اختيار مهمة",

            start: "ابدأ",
            focusOnly: "وضع التركيز",
            theme: "المظهر",
            settings: "الإعدادات",
            media: "الوسائط",
            tasks: "المهام",

            focusStat: "التركيز",
            dailyGoal: "الهدف اليومي",
            sessions: "الجلسات",
            streak: "أيام متتالية",

            ambient: "✦ الأجواء",
            exitFocus: "الخروج من التركيز",

            settingsTitle: "الإعدادات",
            timer: "المؤقت",

            focusDuration: "مدة التركيز",
            focusDescription: "عدد دقائق كل جلسة تركيز",

            shortBreakTitle: "الاستراحة القصيرة",
            shortBreakDescription: "استراحة بين الجلسات",

            longBreakTitle: "الاستراحة الطويلة",
            longBreakDescription: "استراحة أطول",

            sessionsBeforeLong: "عدد الجلسات قبل الاستراحة الطويلة",

            dailyGoalTitle: "الهدف اليومي",
            dailyFocusGoal: "هدف التركيز اليومي",
            dailyGoalDescription: "الوقت المستهدف للتركيز",
            minutes: "دقيقة",

            smartTimer: "المؤقت الذكي",
            autoStart: "البدء التلقائي",
            autoStartDescription: "ابدأ المرحلة التالية تلقائيًا",

            smartTimerDescription: "استعادة المؤقت بعد مغادرة الصفحة",

            alarm: "التنبيه",
            completionSound: "صوت انتهاء الجلسة",
            completionSoundDescription: "الصوت عند انتهاء المرحلة",

            alarmVolume: "مستوى صوت التنبيه",
            alarmVolumeDescription: "مستوى صوت الإشعار",

            alarmSound: "صوت التنبيه",
            alarmSoundDescription: "اختر صوت انتهاء الجلسة",

            softBell: "جرس هادئ",
            digital: "رقمي",
            focusSound: "تركيز",
            gentle: "لطيف",
            deep: "عميق",
            success: "نجاح",
            custom: "مخصص",

            testSound: "تجربة الصوت",
            testSoundDescription: "معاينة صوت التنبيه المحدد",
            test: "تجربة",

            uploadCustom: "+ رفع تنبيه مخصص",
            audioFormats: "MP3 / WAV / M4A",

            accounts: "الحسابات",
            spotify: "Spotify",
            googleYoutube: "Google / YouTube",
            notConnected: "غير متصل",
            connect: "اتصال",

            reset: "إعادة ضبط",
            resetStats: "إعادة ضبط جميع الإحصائيات",

            tasksTitle: "المهام",
            tasksSubtitle: "ما الذي تركز عليه؟",
            taskPlaceholder: "أضف مهمة...",
            noTasks: "لا توجد مهام بعد.",
            addSomething: "أضف شيئًا تريد إنجازه.",

            mediaTitle: "الوسائط",
            youtube: "YouTube",
            spotifyTab: "Spotify",
            local: "ملفات محلية",
            youtubePlaceholder: "الصق رابط YouTube...",
            playYoutube: "تشغيل YouTube",
            spotifyPlaceholder: "الصق رابط أغنية أو قائمة Spotify...",
            openSpotify: "فتح مشغل Spotify",
            chooseMusic: "اختر موسيقى أو فيديو",
            mediaFormats: "MP3, WAV, M4A, MP4, WebM",
            nothingPlaying: "لا يوجد شيء قيد التشغيل",

            ambientTitle: "الأجواء",
            ambientSubtitle: "اختر الأجواء المناسبة لك.",
            uploadBackground: "+ رفع صورة / فيديو للخلفية",

            resetEverything: "إعادة ضبط كل شيء؟",
            resetDescription:
                "سيؤدي هذا إلى حذف جلساتك ووقت التركيز والأيام المتتالية والمهام. لا يمكن التراجع عن ذلك.",
            cancel: "إلغاء",
            resetButton: "إعادة ضبط"
        }

    };


    let currentLanguage =
        localStorage.getItem("rakkez_language") || "en";


    function setText(element, text) {

        if (!element) return;

        element.textContent = text;

    }


    function setPlaceholder(element, text) {

        if (!element) return;

        element.placeholder = text;

    }


    function applyLanguage(lang) {

        const t = translations[lang];

        if (!t) return;


        /* =====================================================
           PAGE DIRECTION
        ===================================================== */

        document.documentElement.lang = lang;

        document.documentElement.dir =
            lang === "ar" ? "rtl" : "ltr";


        document.body.dir =
            lang === "ar" ? "rtl" : "ltr";


        /* =====================================================
           HEADER
        ===================================================== */

        setText($("languageLabel"), t.language);

        setText(
            document.querySelector(".blog-btn"),
            t.blog
        );


        /* =====================================================
           TIMER
        ===================================================== */

        setText(
            $("modeText"),
            $("modeText")?.textContent === "SHORT BREAK"
                ? t.shortBreak
                : $("modeText")?.textContent === "LONG BREAK"
                    ? t.longBreak
                    : t.focus
        );

        setText($("timerLabel"), t.timerLabel);
        setText(
            $("currentTask")?.querySelector("span"),
            t.noTask
        );

        setText($("startBtn"), t.start);

        setText(
            $("focusExit"),
            t.exitFocus
        );


        /* =====================================================
           BOTTOM
        ===================================================== */

        const statTitles =
            document.querySelectorAll(".stat-title");

        if (statTitles.length >= 4) {

            setText(statTitles[0], t.focusStat);
            setText(statTitles[1], t.dailyGoal);
            setText(statTitles[2], t.sessions);
            setText(statTitles[3], t.streak);

        }


        setText(
            $("ambientOpen"),
            t.ambient
        );


        /* =====================================================
           SETTINGS
        ===================================================== */

        const panelTitles =
            document.querySelectorAll(".panel-title");

        if ($("settingsOverlay")) {

            const title =
                $("settingsOverlay")
                    .querySelector(".panel-title");

            setText(title, t.settingsTitle);

        }


        const sectionTitles =
            $("settingsOverlay")
                ?.querySelectorAll(".section-title");

        if (sectionTitles?.length >= 5) {

            setText(sectionTitles[0], t.timer);
            setText(sectionTitles[1], t.dailyGoalTitle);
            setText(sectionTitles[2], t.smartTimer);
            setText(sectionTitles[3], t.alarm);
            setText(sectionTitles[4], t.accounts);

        }


        /* =====================================================
           SETTINGS NAMES
        ===================================================== */

        const names =
            $("settingsOverlay")
                ?.querySelectorAll(".setting-name");

        if (names) {

            const values = [

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

            names.forEach((el, index) => {

                if (values[index]) {

                    setText(el, values[index]);

                }

            });

        }


        /* =====================================================
           SETTINGS DESCRIPTIONS
        ===================================================== */

        const descriptions =
            $("settingsOverlay")
                ?.querySelectorAll(".setting-description");

        if (descriptions) {

            const values = [

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

            descriptions.forEach((el, index) => {

                if (values[index]) {

                    setText(el, values[index]);

                }

            });

        }


        /* =====================================================
           ALARM
        ===================================================== */

        setText(
            $("testAlarmText"),
            t.test
        );

        const upload =
            $("alarmUploadLabel");

        if (upload) {

            const strong =
                upload.querySelector("strong");

            const span =
                upload.querySelector("span");

            setText(strong, t.uploadCustom);
            setText(span, t.audioFormats);

        }


        /* =====================================================
           ACCOUNTS
        ===================================================== */

        setText(
            $("spotifyStatus"),
            t.notConnected
        );

        setText(
            $("googleStatus"),
            t.notConnected
        );


        document
            .querySelectorAll(".account-button")
            .forEach(btn => {

                setText(btn, t.connect);

            });


        /* =====================================================
           RESET
        ===================================================== */

        setText(
            $("resetStatsBtn"),
            t.resetStats
        );


        /* =====================================================
           TASKS
        ===================================================== */

        if ($("tasksOverlay")) {

            const title =
                $("tasksOverlay")
                    .querySelector(".panel-title");

            const subtitle =
                $("tasksOverlay")
                    .querySelector(".panel-subtitle");

            setText(title, t.tasksTitle);
            setText(subtitle, t.tasksSubtitle);

        }


        setPlaceholder(
            $("taskInput"),
            t.taskPlaceholder
        );


        setText(
            $("taskEmpty"),
            t.noTasks
        );


        /* =====================================================
           MEDIA
        ===================================================== */

        if ($("mediaOverlay")) {

            const title =
                $("mediaOverlay")
                    .querySelector(".panel-title");

            setText(title, t.mediaTitle);

        }


        document
            .querySelectorAll(".media-tab")
            .forEach((tab, index) => {

                if (index === 0)
                    setText(tab, t.youtube);

                if (index === 1)
                    setText(tab, t.spotifyTab);

                if (index === 2)
                    setText(tab, t.local);

            });


        setPlaceholder(
            $("youtubeInput"),
            t.youtubePlaceholder
        );

        setText(
            $("youtubePlay"),
            t.playYoutube
        );


        setPlaceholder(
            $("spotifyInput"),
            t.spotifyPlaceholder
        );

        setText(
            $("spotifyPlay"),
            t.openSpotify
        );


        /* =====================================================
           LOCAL MEDIA
        ===================================================== */

        const fileLabel =
            document.querySelector(
                'label[for="mediaFile"]'
            );

        if (fileLabel) {

            setText(
                fileLabel.querySelector("strong"),
                t.chooseMusic
            );

            setText(
                fileLabel.querySelector("span"),
                t.mediaFormats
            );

        }


        setText(
            $("mediaName"),
            t.nothingPlaying
        );


        /* =====================================================
           AMBIENT
        ===================================================== */

        if ($("ambientOverlay")) {

            const title =
                $("ambientOverlay")
                    .querySelector(".panel-title");

            const subtitle =
                $("ambientOverlay")
                    .querySelector(".panel-subtitle");

            setText(title, t.ambientTitle);
            setText(subtitle, t.ambientSubtitle);

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

        if ($("confirmOverlay")) {

            const title =
                $("confirmOverlay")
                    .querySelector(".panel-title");

            const description =
                $("confirmOverlay")
                    .querySelector(".confirm-description");

            setText(title, t.resetEverything);
            setText(description, t.resetDescription);

        }


        const confirmReset =
            $("confirmReset");

        setText(
            confirmReset,
            t.resetButton
        );


        document
            .querySelectorAll(
                '[data-close="confirmOverlay"]'
            )
            .forEach(btn => {

                setText(btn, t.cancel);

            });


        /* =====================================================
           SAVE
        ===================================================== */

        localStorage.setItem(
            "rakkez_language",
            lang
        );


        currentLanguage = lang;


        /* =====================================================
           CHANGE LANGUAGE BUTTON
        ===================================================== */

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

            console.warn(
                "RakkeZ: languageToggle not found."
            );

            return;

        }


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
