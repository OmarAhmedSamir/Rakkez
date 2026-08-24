/* =========================================================
   RAKKEZ V2
   FULL LANGUAGE SYSTEM
   ENGLISH <-> ARABIC
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


            /* SETTINGS */

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


            /* ACCOUNTS */

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


            /* RESET */

            reset:
                "Reset",

            resetStats:
                "Reset All Statistics",


            /* TASKS */

            tasksTitle:
                "Tasks",

            tasksSubtitle:
                "What are you focusing on?",

            taskPlaceholder:
                "Add a task...",

            noTasks:
                "No tasks yet.",

            addSomething:
                "Add something you want to accomplish.",


            /* MEDIA */

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


            /* AMBIENT */

            ambientTitle:
                "Ambient",

            ambientSubtitle:
                "Choose your atmosphere.",

            uploadBackground:
                "+ Upload Image / Video Background",


            /* RESET CONFIRM */

            resetEverything:
                "Reset everything?",

            resetDescription:
                "This will remove your sessions, focus time, streak and tasks. This cannot be undone.",

            cancel:
                "Cancel",

            resetButton:
                "Reset",


            /* UNITS */

            minuteShort:
                "m",

            hourShort:
                "h",

            day:
                "day",

            days:
                "days",

            minuteWord:
                "minute",

            minutesWord:
                "minutes",

            hourWord:
                "hour",

            hoursWord:
                "hours"

        },


        /* =====================================================
           ARABIC
        ===================================================== */

        ar: {

            language:
                "English",

            logo:
                "ركز",

            blog:
                "المدونة",

            focus:
                "التركيز",

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


            /* SETTINGS */

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


            /* ACCOUNTS */

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


            /* RESET */

            reset:
                "إعادة ضبط",

            resetStats:
                "إعادة ضبط جميع الإحصائيات",


            /* TASKS */

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


            /* MEDIA */

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


            /* AMBIENT */

            ambientTitle:
                "الأجواء",

            ambientSubtitle:
                "اختر الأجواء المناسبة لك.",

            uploadBackground:
                "+ رفع صورة / فيديو للخلفية",


            /* RESET CONFIRM */

            resetEverything:
                "إعادة ضبط كل شيء؟",

            resetDescription:
                "سيؤدي هذا إلى حذف جلساتك ووقت التركيز والأيام المتتالية والمهام. لا يمكن التراجع عن ذلك.",

            cancel:
                "إلغاء",

            resetButton:
                "إعادة ضبط",


            /* UNITS */

            minuteShort:
                "د",

            hourShort:
                "س",

            day:
                "يوم",

            days:
                "يوم",

            minuteWord:
                "دقيقة",

            minutesWord:
                "دقائق",

            hourWord:
                "ساعة",

            hoursWord:
                "ساعات"

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
       ARABIC NUMBERS
    ========================================================= */

    function arabicNumbers(value) {

        return String(value).replace(
            /\d/g,
            digit => "٠١٢٣٤٥٦٧٨٩"[digit]
        );

    }


    function englishNumbers(value) {

        return String(value).replace(
            /[٠-٩]/g,
            digit =>
                "٠١٢٣٤٥٦٧٨٩".indexOf(digit)
        );

    }


    /* =========================================================
       FORMAT DYNAMIC VALUES
    ========================================================= */

    function translateNumberUnits(element) {

        if (!element) return;

        const raw =
            element.dataset.originalValue ||
            element.textContent.trim();

        if (!raw) return;


        element.dataset.originalValue = raw;


        if (currentLanguage === "en") {

            element.textContent =
                raw
                    .replace(/د/g, "m")
                    .replace(/س/g, "h")
                    .replace(/يوم/g, "day")
                    .replace(/أيام/g, "days");

            return;

        }


        let value = raw;


        /* Arabic digits */

        value =
            englishNumbers(value);


        /* minutes */

        value =
            value.replace(
                /(\d+)\s*m\b/gi,
                "$1د"
            );


        /* hours */

        value =
            value.replace(
                /(\d+)\s*h\b/gi,
                "$1س"
            );


        /* days */

        value =
            value.replace(
                /(\d+)\s*days?\b/gi,
                "$1 يوم"
            );


        /* minutes word */

        value =
            value.replace(
                /(\d+)\s*minutes?\b/gi,
                "$1 دقيقة"
            );


        /* hours word */

        value =
            value.replace(
                /(\d+)\s*hours?\b/gi,
                "$1 ساعة"
            );


        /* Arabic numerals */

        value =
            arabicNumbers(value);


        element.textContent = value;

    }


    function updateDynamicValues() {

        /* TIMER */

        const timer =
            get("timer");

        if (timer) {

            if (currentLanguage === "ar") {

                timer.textContent =
                    arabicNumbers(
                        englishNumbers(
                            timer.textContent
                        )
                    );

            } else {

                timer.textContent =
                    englishNumbers(
                        timer.textContent
                    );

            }

        }


        /* STATS */

        document
            .querySelectorAll(".stat-value")
            .forEach(element => {

                translateNumberUnits(element);

            });


        /* INPUT VALUES */

        [
            "focusInput",
            "shortBreakInput",
            "longBreakInput",
            "longBreakAfterInput",
            "dailyGoalInput"
        ].forEach(id => {

            const input = get(id);

            if (!input) return;

            if (
                currentLanguage === "ar"
                &&
                document.activeElement !== input
            ) {

                input.value =
                    arabicNumbers(
                        englishNumbers(
                            input.value
                        )
                    );

            }

        });


        /* VOLUME */

        const volume =
            get("alarmVolumeValue");

        if (volume) {

            const number =
                parseInt(
                    englishNumbers(
                        volume.textContent
                    )
                );

            if (!isNaN(number)) {

                volume.textContent =
                    currentLanguage === "ar"
                        ? arabicNumbers(number) + "%"
                        : number + "%";

            }

        }

    }


    /* =========================================================
       TITLES
    ========================================================= */

    function applyButtonTitles(lang) {

        const titles = {

            en: {
                blogOpen: "Blog",
                languageToggle: "Change language",
                mediaOpen: "Media",
                tasksOpen: "Tasks",
                focusOnlyBtn: "Focus Only",
                themeBtn: "Theme",
                settingsOpen: "Settings",
                ambientOpen: "Ambient",
                focusExit: "Exit Focus"
            },

            ar: {
                blogOpen: "المدونة",
                languageToggle: "تغيير اللغة",
                mediaOpen: "الوسائط",
                tasksOpen: "المهام",
                focusOnlyBtn: "وضع التركيز",
                themeBtn: "المظهر",
                settingsOpen: "الإعدادات",
                ambientOpen: "الأجواء",
                focusExit: "الخروج من التركيز"
            }

        };


        const selected =
            titles[lang];


        Object.keys(selected).forEach(id => {

            const element = get(id);

            if (element) {

                element.title =
                    selected[id];

            }

        });

    }


    /* =========================================================
       APPLY LANGUAGE
    ========================================================= */

    function applyLanguage(lang) {

        const t =
            translations[lang];

        if (!t) return;


        currentLanguage = lang;


        document.documentElement.lang =
            lang;

        document.documentElement.dir =
            lang === "ar"
                ? "rtl"
                : "ltr";

        document.body.dir =
            lang === "ar"
                ? "rtl"
                : "ltr";


        /* =====================================================
           LOGO
        ===================================================== */

        setText(
            document.querySelector(".logo"),
            t.logo
        );


        /* =====================================================
           HEADER
        ===================================================== */

        setText(
            get("languageLabel"),
            t.language
        );


        setText(
            get("blogOpen"),
            t.blog
        );


        /* =====================================================
           TIMER
        ===================================================== */

        const mode =
            get("modeText");

        if (mode) {

            const modeType =
                mode.dataset.mode ||
                "focus";


            if (modeType === "short") {

                setText(
                    mode,
                    t.shortBreak
                );

            } else if (modeType === "long") {

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
                currentTask.querySelector(
                    "span"
                );

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
            document.querySelectorAll(
                ".stat-title"
            );


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
           AMBIENT
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

            setText(
                settingsOverlay.querySelector(
                    ".panel-title"
                ),
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
                t.accounts,
                t.reset

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
                alarmUpload.querySelector(
                    "strong"
                ),
                t.uploadCustom
            );


            setText(
                alarmUpload.querySelector(
                    "span"
                ),
                t.audioFormats
            );

        }


        /* =====================================================
           ALARM SELECT OPTIONS
        ===================================================== */

        const alarmSelect =
            get("alarmSound");


        if (alarmSelect) {

            const optionMap = {

                soft: t.softBell,
                digital: t.digital,
                focus: t.focusSound,
                gentle: t.gentle,
                deep: t.deep,
                success: t.success,
                custom: t.custom

            };


            Array.from(
                alarmSelect.options
            ).forEach(option => {

                if (
                    optionMap[
                        option.value
                    ]
                ) {

                    option.textContent =
                        optionMap[
                            option.value
                        ];

                }

            });

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
            .querySelectorAll(
                ".account-button"
            )
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
            .querySelectorAll(
                ".media-tab"
            )
            .forEach(
                (tab, index) => {

                    if (index === 0)
                        setText(
                            tab,
                            t.youtube
                        );

                    if (index === 1)
                        setText(
                            tab,
                            t.spotifyTab
                        );

                    if (index === 2)
                        setText(
                            tab,
                            t.local
                        );

                }
            );


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
           BUTTON TITLES
        ===================================================== */

        applyButtonTitles(lang);


        /* =====================================================
           SAVE
        ===================================================== */

        localStorage.setItem(
            "rakkez_language",
            lang
        );


        /* =====================================================
           LANGUAGE BUTTON ACCESSIBILITY
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


        /* =====================================================
           UPDATE NUMBERS
        ===================================================== */

        updateDynamicValues();

    }


    /* =========================================================
       TOGGLE LANGUAGE
    ========================================================= */

    function toggleLanguage() {

        const nextLanguage =
            currentLanguage === "en"
                ? "ar"
                : "en";


        applyLanguage(
            nextLanguage
        );

    }


    /* =========================================================
       KEEP DYNAMIC STATS TRANSLATED
    ========================================================= */

    function watchDynamicValues() {

        const targets = [

            get("timer"),

            get("focusStat"),

            get("goalStat"),

            get("sessionsStat"),

            get("streakStat"),

            get("alarmVolumeValue")

        ];


        targets.forEach(element => {

            if (!element) return;


            new MutationObserver(
                function () {

                    if (
                        document.activeElement !==
                        element
                    ) {

                        updateDynamicValues();

                    }

                }
            ).observe(
                element,
                {
                    childList: true,
                    characterData: true,
                    subtree: true
                }
            );

        });

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


        if (
            button.dataset.languageReady ===
            "true"
        ) {

            return;

        }


        button.dataset.languageReady =
            "true";


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


        watchDynamicValues();

    }


    /* =========================================================
       START
    ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initLanguage
        );

    } else {

        initLanguage();

    }


})();
