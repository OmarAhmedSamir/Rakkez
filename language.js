/* =========================================================
   RAKKEZ V2
   FULL LANGUAGE SYSTEM
   ENGLISH <-> ARABIC
   SAFE DYNAMIC NUMBER SYSTEM
   NO FREEZE / NO OBSERVER LOOP
========================================================= */

(function () {

    "use strict";


    /* =========================================================
       TRANSLATIONS
    ========================================================= */

    const translations = {

        /* =====================================================
           ENGLISH
        ===================================================== */

        en: {

            language: "العربية",

            /* BRAND — NEVER TRANSLATE */
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


            /* =================================================
               SETTINGS
            ================================================= */

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


            /* =================================================
               ACCOUNTS
            ================================================= */

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


            /* =================================================
               RESET
            ================================================= */

            reset:
                "Reset",

            resetStats:
                "Reset All Statistics",


            /* =================================================
               TASKS
            ================================================= */

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


            /* =================================================
               MEDIA
            ================================================= */

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


            /* =================================================
               AMBIENT
            ================================================= */

            ambientTitle:
                "Ambient",

            ambientSubtitle:
                "Choose your atmosphere.",

            uploadBackground:
                "+ Upload Image / Video Background",


            /* =================================================
               RESET CONFIRM
            ================================================= */

            resetEverything:
                "Reset everything?",

            resetDescription:
                "This will remove your sessions, focus time, streak and tasks. This cannot be undone.",

            cancel:
                "Cancel",

            resetButton:
                "Reset",


            /* =================================================
               UNITS
            ================================================= */

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

            /* BRAND — NEVER TRANSLATE */
            logo:
                "RakkeZ",

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


            /* =================================================
               SETTINGS
            ================================================= */

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
                "دقائق",

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


            /* =================================================
               ACCOUNTS
            ================================================= */

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


            /* =================================================
               RESET
            ================================================= */

            reset:
                "إعادة ضبط",

            resetStats:
                "إعادة ضبط جميع الإحصائيات",


            /* =================================================
               TASKS
            ================================================= */

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


            /* =================================================
               MEDIA
            ================================================= */

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


            /* =================================================
               AMBIENT
            ================================================= */

            ambientTitle:
                "الأجواء",

            ambientSubtitle:
                "اختر الأجواء المناسبة لك.",

            uploadBackground:
                "+ رفع صورة / فيديو للخلفية",


            /* =================================================
               RESET CONFIRM
            ================================================= */

            resetEverything:
                "إعادة ضبط كل شيء؟",

            resetDescription:
                "سيؤدي هذا إلى حذف جلساتك ووقت التركيز والأيام المتتالية والمهام. لا يمكن التراجع عن ذلك.",

            cancel:
                "إلغاء",

            resetButton:
                "إعادة ضبط",


            /* =================================================
               UNITS
            ================================================= */

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


    if (
        currentLanguage !== "en" &&
        currentLanguage !== "ar"
    ) {

        currentLanguage = "en";

    }


    /* =========================================================
       INTERNAL STATE
    ========================================================= */

    let applyingLanguage = false;
    let observerStarted = false;
    let observerTimer = null;


    /* =========================================================
       HELPERS
    ========================================================= */

    function get(id) {

        return document.getElementById(id);

    }


    function setText(element, text) {

        if (!element) return;

        if (element.textContent !== String(text)) {

            element.textContent = text;

        }

    }


    function setPlaceholder(element, text) {

        if (!element) return;

        if (element.placeholder !== String(text)) {

            element.placeholder = text;

        }

    }


    /* =========================================================
       NUMBER CONVERSION
    ========================================================= */

    function arabicNumbers(value) {

        return String(value).replace(
            /\d/g,
            function (digit) {

                return "٠١٢٣٤٥٦٧٨٩"[digit];

            }
        );

    }


    function englishNumbers(value) {

        return String(value).replace(
            /[٠-٩]/g,
            function (digit) {

                return "٠١٢٣٤٥٦٧٨٩".indexOf(digit);

            }
        );

    }


    /* =========================================================
       FORMAT ARABIC UNITS
    ========================================================= */

    function formatArabicUnits(value) {

        let text =
            englishNumbers(String(value));


        /* minutes abbreviation */

        text = text.replace(
            /(\d+)\s*m\b/gi,
            "$1د"
        );


        /* hours abbreviation */

        text = text.replace(
            /(\d+)\s*h\b/gi,
            "$1س"
        );


        /* days */

        text = text.replace(
            /(\d+)\s*days?\b/gi,
            "$1 يوم"
        );


        /* minute word */

        text = text.replace(
            /(\d+)\s*minutes?\b/gi,
            "$1 دقيقة"
        );


        /* hour word */

        text = text.replace(
            /(\d+)\s*hours?\b/gi,
            "$1 ساعة"
        );


        /* English remaining numbers -> Arabic */

        text =
            arabicNumbers(text);


        return text;

    }


    /* =========================================================
       FORMAT ENGLISH UNITS
    ========================================================= */

    function formatEnglishUnits(value) {

        let text =
            englishNumbers(String(value));


        text = text.replace(
            /(\d+)\s*د\b/g,
            "$1m"
        );


        text = text.replace(
            /(\d+)\s*س\b/g,
            "$1h"
        );


        text = text.replace(
            /(\d+)\s*يوم/g,
            function (match, number) {

                const n =
                    Number(number);

                return n === 1
                    ? `${n} day`
                    : `${n} days`;

            }
        );


        text = text.replace(
            /(\d+)\s*دقيقة/g,
            function (match, number) {

                const n =
                    Number(number);

                return n === 1
                    ? `${n} minute`
                    : `${n} minutes`;

            }
        );


        text = text.replace(
            /(\d+)\s*دقائق/g,
            function (match, number) {

                const n =
                    Number(number);

                return n === 1
                    ? `${n} minute`
                    : `${n} minutes`;

            }
        );


        text = text.replace(
            /(\d+)\s*ساعة/g,
            function (match, number) {

                const n =
                    Number(number);

                return n === 1
                    ? `${n} hour`
                    : `${n} hours`;

            }
        );


        text = text.replace(
            /(\d+)\s*ساعات/g,
            function (match, number) {

                const n =
                    Number(number);

                return n === 1
                    ? `${n} hour`
                    : `${n} hours`;

            }
        );


        return text;

    }


    /* =========================================================
       DYNAMIC NUMBER ELEMENT
    ========================================================= */

    function translateDynamicElement(element) {

        if (!element) return;


        /*
           IMPORTANT:
           Store the REAL / ENGLISH value only once.
           Never store the already-translated value.
        */

        let original =
            element.dataset.languageValue;


        if (
            original === undefined
        ) {

            original =
                englishNumbers(
                    element.textContent.trim()
                );

            element.dataset.languageValue =
                original;

        }


        if (!original) return;


        let output;


        if (currentLanguage === "ar") {

            output =
                formatArabicUnits(original);

        } else {

            output =
                formatEnglishUnits(original);

        }


        if (
            element.textContent !== output
        ) {

            element.textContent =
                output;

        }

    }


    /* =========================================================
       TIMER
    ========================================================= */

    function updateTimerLanguage() {

        const timer =
            get("timer");

        if (!timer) return;


        /*
           Timer normally contains values such as:
           25:00
           05:00
           00:30
        */

        const raw =
            englishNumbers(
                timer.textContent
            );


        if (currentLanguage === "ar") {

            const output =
                arabicNumbers(raw);

            if (
                timer.textContent !== output
            ) {

                timer.textContent =
                    output;

            }

        } else {

            if (
                timer.textContent !== raw
            ) {

                timer.textContent =
                    raw;

            }

        }

    }


    /* =========================================================
       UPDATE DYNAMIC VALUES
    ========================================================= */

    function updateDynamicValues() {

        if (applyingLanguage) return;


        /* TIMER */

        updateTimerLanguage();


        /* STATS */

        document
            .querySelectorAll(".stat-value")
            .forEach(function (element) {

                translateDynamicElement(
                    element
                );

            });


        /* OTHER KNOWN DYNAMIC VALUES */

        [
            "focusStat",
            "goalStat",
            "sessionsStat",
            "streakStat",
            "alarmVolumeValue"
        ].forEach(function (id) {

            const element =
                get(id);

            if (!element) return;

            translateDynamicElement(
                element
            );

        });


        /* =====================================================
           INPUT NUMBERS
        ===================================================== */

        [
            "focusInput",
            "shortBreakInput",
            "longBreakInput",
            "longBreakAfterInput",
            "dailyGoalInput"
        ].forEach(function (id) {

            const input =
                get(id);

            if (!input) return;


            /*
               Never change the input while the user
               is typing inside it.
            */

            if (
                document.activeElement === input
            ) {

                return;

            }


            const raw =
                englishNumbers(
                    input.value
                );


            if (
                currentLanguage === "ar"
            ) {

                const output =
                    arabicNumbers(raw);

                if (
                    input.value !== output
                ) {

                    input.value =
                        output;

                }

            } else {

                if (
                    input.value !== raw
                ) {

                    input.value =
                        raw;

                }

            }

        });


        /* =====================================================
           ALARM VOLUME
        ===================================================== */

        const volume =
            get("alarmVolumeValue");


        if (volume) {

            const raw =
                englishNumbers(
                    volume.textContent
                ).replace(
                    "%",
                    ""
                ).trim();


            const number =
                parseInt(raw, 10);


            if (!isNaN(number)) {

                const output =
                    currentLanguage === "ar"
                        ? arabicNumbers(number) + "%"
                        : number + "%";


                if (
                    volume.textContent !== output
                ) {

                    volume.textContent =
                        output;

                }

            }

        }

    }


    /* =========================================================
       DATA-I18N SUPPORT
       
       Future-proof:
       
       <span data-i18n="theme"></span>
       
       will automatically translate.
    ========================================================= */

    function applyDataTranslations(t) {

        document
            .querySelectorAll("[data-i18n]")
            .forEach(function (element) {

                const key =
                    element.dataset.i18n;

                if (
                    key &&
                    Object.prototype.hasOwnProperty.call(
                        t,
                        key
                    )
                ) {

                    setText(
                        element,
                        t[key]
                    );

                }

            });


        document
            .querySelectorAll("[data-i18n-placeholder]")
            .forEach(function (element) {

                const key =
                    element.dataset.i18nPlaceholder;

                if (
                    key &&
                    Object.prototype.hasOwnProperty.call(
                        t,
                        key
                    )
                ) {

                    setPlaceholder(
                        element,
                        t[key]
                    );

                }

            });

    }


    /* =========================================================
       BUTTON TITLES
    ========================================================= */

    function applyButtonTitles(lang) {

        const titles = {

            en: {

                blogOpen:
                    "Blog",

                languageToggle:
                    "Change language",

                mediaOpen:
                    "Media",

                tasksOpen:
                    "Tasks",

                focusOnlyBtn:
                    "Focus Only",

                themeBtn:
                    "Theme",

                settingsOpen:
                    "Settings",

                ambientOpen:
                    "Ambient",

                focusExit:
                    "Exit Focus"

            },


            ar: {

                blogOpen:
                    "المدونة",

                languageToggle:
                    "تغيير اللغة",

                mediaOpen:
                    "الوسائط",

                tasksOpen:
                    "المهام",

                focusOnlyBtn:
                    "وضع التركيز",

                themeBtn:
                    "المظهر",

                settingsOpen:
                    "الإعدادات",

                ambientOpen:
                    "الأجواء",

                focusExit:
                    "الخروج من التركيز"

            }

        };


        const selected =
            titles[lang];


        if (!selected) return;


        Object.keys(selected)
            .forEach(function (id) {

                const element =
                    get(id);

                if (!element) return;


                element.title =
                    selected[id];

            });

    }


    /* =========================================================
       APPLY LANGUAGE
    ========================================================= */

    function applyLanguage(lang) {

        if (
            !translations[lang]
        ) {

            return;

        }


        /*
           Prevent observer / event conflicts
        */

        applyingLanguage = true;


        const t =
            translations[lang];


        currentLanguage =
            lang;


        /* =====================================================
           DOCUMENT LANGUAGE
        ===================================================== */

        document.documentElement.lang =
            lang;

        document.documentElement.dir =
            lang === "ar"
                ? "rtl"
                : "ltr";


        if (document.body) {

            document.body.dir =
                lang === "ar"
                    ? "rtl"
                    : "ltr";

        }


        /* =====================================================
           LOGO
           
           IMPORTANT:
           RakkeZ NEVER becomes "ركز".
        ===================================================== */

        setText(
            document.querySelector(".logo"),
            "RakkeZ"
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
           TIMER MODE
        ===================================================== */

        const mode =
            get("modeText");


        if (mode) {

            const modeType =
                mode.dataset.mode ||
                "focus";


            if (
                modeType === "short"
            ) {

                setText(
                    mode,
                    t.shortBreak
                );

            } else if (
                modeType === "long"
            ) {

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


        /* =====================================================
           CURRENT TASK
        ===================================================== */

        const currentTask =
            get("currentTask");


        if (currentTask) {

            const span =
                currentTask.querySelector(
                    "span"
                );


            if (span) {

                /*
                   Only translate placeholder,
                   not an actual selected task.
                */

                if (
                    !currentTask.dataset.taskSelected
                ) {

                    setText(
                        span,
                        t.noTask
                    );

                }

            }

        }


        /* =====================================================
           MAIN BUTTONS
        ===================================================== */

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


        if (
            statTitles.length >= 4
        ) {

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
                function (element, index) {

                    if (
                        sectionTexts[index]
                    ) {

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
                function (element, index) {

                    if (
                        nameTexts[index]
                    ) {

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
                function (element, index) {

                    if (
                        descriptionTexts[index]
                    ) {

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
           ALARM SELECT
        ===================================================== */

        const alarmSelect =
            get("alarmSound");


        if (alarmSelect) {

            const optionMap = {

                soft:
                    t.softBell,

                digital:
                    t.digital,

                focus:
                    t.focusSound,

                gentle:
                    t.gentle,

                deep:
                    t.deep,

                success:
                    t.success,

                custom:
                    t.custom

            };


            Array.from(
                alarmSelect.options
            ).forEach(
                function (option) {

                    const text =
                        optionMap[
                            option.value
                        ];


                    if (text) {

                        option.textContent =
                            text;

                    }

                }
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
            .querySelectorAll(
                ".account-button"
            )
            .forEach(
                function (button) {

                    setText(
                        button,
                        t.connect
                    );

                }
            );


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
                function (tab, index) {

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
           AMBIENT OVERLAY
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


        const backgroundLabel =
            document.querySelector(
                'label[for="bgFile"]'
            );


        if (backgroundLabel) {

            setText(
                backgroundLabel,
                t.uploadBackground
            );

        }


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
            .forEach(
                function (button) {

                    setText(
                        button,
                        t.cancel
                    );

                }
            );


        /* =====================================================
           DATA-I18N
        ===================================================== */

        applyDataTranslations(t);


        /* =====================================================
           BUTTON TITLES
        ===================================================== */

        applyButtonTitles(lang);


        /* =====================================================
           ACCESSIBILITY
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
           SAVE
        ===================================================== */

        localStorage.setItem(
            "rakkez_language",
            lang
        );


        /*
           Release lock BEFORE dynamic update.
           This prevents observer recursion.
        */

        applyingLanguage = false;


        /* =====================================================
           UPDATE NUMBERS
        ===================================================== */

        updateDynamicValues();

    }


    /* =========================================================
       TOGGLE LANGUAGE
    ========================================================= */

    function toggleLanguage() {

        if (applyingLanguage) {

            return;

        }


        const nextLanguage =
            currentLanguage === "en"
                ? "ar"
                : "en";


        applyLanguage(
            nextLanguage
        );

    }


    /* =========================================================
       SAFE DYNAMIC OBSERVER
       
       IMPORTANT:
       The old version created an infinite loop because
       updateDynamicValues() changed the same elements that
       MutationObserver was watching.

       This version:
       - uses a lock
       - debounces updates
       - ignores language application
       - does not immediately recurse
    ========================================================= */

    function scheduleDynamicUpdate() {

        if (applyingLanguage) {

            return;

        }


        if (observerTimer) {

            clearTimeout(
                observerTimer
            );

        }


        observerTimer =
            setTimeout(
                function () {

                    observerTimer = null;


                    if (
                        !applyingLanguage
                    ) {

                        updateDynamicValues();

                    }

                },
                50
            );

    }


    function watchDynamicValues() {

        if (observerStarted) {

            return;

        }


        observerStarted = true;


        const targets = [

            get("timer"),

            get("focusStat"),

            get("goalStat"),

            get("sessionsStat"),

            get("streakStat"),

            get("alarmVolumeValue")

        ];


        targets.forEach(
            function (element) {

                if (!element) return;


                const observer =
                    new MutationObserver(
                        function () {

                            if (
                                applyingLanguage
                            ) {

                                return;

                            }


                            scheduleDynamicUpdate();

                        }
                    );


                observer.observe(
                    element,
                    {

                        childList: true,

                        characterData: true,

                        subtree: true

                    }
                );


                /*
                   Store observer so other scripts
                   can access it if necessary.
                */

                element.__rakkezLanguageObserver =
                    observer;

            }
        );

    }


    /* =========================================================
       INPUT NUMBER HANDLING
       
       Converts Arabic numbers back to English BEFORE
       the actual application reads the values.
    ========================================================= */

    function setupInputNumberHandling() {

        [

            "focusInput",

            "shortBreakInput",

            "longBreakInput",

            "longBreakAfterInput",

            "dailyGoalInput"

        ].forEach(
            function (id) {

                const input =
                    get(id);


                if (!input) return;


                if (
                    input.dataset.numberLanguageReady ===
                    "true"
                ) {

                    return;

                }


                input.dataset.numberLanguageReady =
                    "true";


                input.addEventListener(
                    "focus",
                    function () {

                        input.value =
                            englishNumbers(
                                input.value
                            );

                    }
                );


                input.addEventListener(
                    "input",
                    function () {

                        /*
                           Keep internal value English.
                           Display language conversion happens
                           when the input loses focus.
                        */

                        input.dataset.originalNumber =
                            englishNumbers(
                                input.value
                            );

                    }
                );


                input.addEventListener(
                    "blur",
                    function () {

                        const raw =
                            englishNumbers(
                                input.value
                            );


                        input.dataset.originalNumber =
                            raw;


                        if (
                            currentLanguage === "ar"
                        ) {

                            input.value =
                                arabicNumbers(
                                    raw
                                );

                        } else {

                            input.value =
                                raw;

                        }

                    }
                );

            }
        );

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


        /* =====================================================
           PREVENT DUPLICATE EVENT
        ===================================================== */

        if (
            button.dataset.languageReady ===
            "true"
        ) {

            /*
               Still apply language in case the script
               was loaded after another initialization.
            */

            applyLanguage(
                currentLanguage
            );

            return;

        }


        button.dataset.languageReady =
            "true";


        /* =====================================================
           CLICK
        ===================================================== */

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                toggleLanguage();

            }
        );


        /* =====================================================
           INPUTS
        ===================================================== */

        setupInputNumberHandling();


        /* =====================================================
           APPLY INITIAL LANGUAGE
        ===================================================== */

        applyLanguage(
            currentLanguage
        );


        /* =====================================================
           WATCH DYNAMIC VALUES
        ===================================================== */

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
            initLanguage,
            {
                once: true
            }
        );

    } else {

        initLanguage();

    }


})();
