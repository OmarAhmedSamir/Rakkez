(function () {

    "use strict";


    /* =====================================================
       🚀 RAKKEZ UPDATE SYSTEM
       =====================================================

       هذا الملف مسؤول عن نافذة "What's New".

       IMPORTANT:
       عند إضافة Update جديد، أنت غالبًا تحتاج
       لتعديل الجزء الموجود في الأعلى فقط:

       1. version
       2. badge
       3. title
       4. description
       5. changes

       لا تحتاج لتعديل باقي الكود إلا إذا كنت
       تريد تغيير طريقة عمل الـ Update System.
    ===================================================== */


    /* =====================================================
       📝 UPDATE CONTENT
       =====================================================

       👇👇👇
       هذا هو أهم جزء في الملف.

       من هنا تستطيع تعديل محتوى الـ Update
       الذي يظهر للمستخدم.

       -----------------------------------------------------

       version:
       رقم إصدار الـ Update.

       IMPORTANT:
       كلما عملت Update جديد غيّر الرقم.

       مثال:

       version: "1.0.8"

       ثم في Update القادم:

       version: "1.0.9"

       إذا لم تغيّر الـ version، المستخدم الذي
       شاهد نفس الإصدار من قبل لن يرى الـ Popup مرة أخرى.
       ===================================================== */

    const RAKKEZ_UPDATE = {


        /* -------------------------------------------------
           🔢 UPDATE VERSION

           غيّر هذا الرقم في كل Update جديد.
           ------------------------------------------------- */

        version: "1.0.8",


        /* -------------------------------------------------
           🏷️ UPDATE BADGE

           الكلمة الصغيرة التي تظهر أعلى العنوان.

           أمثلة:

           "NEW"
           "UPDATE"
           "LATEST"
           "v1.0.8"

           ------------------------------------------------- */

        badge: "NEW",


        /* -------------------------------------------------
           📝 UPDATE TITLE

           العنوان الرئيسي للـ Update Popup.

           أمثلة:

           "What's New"
           "RakkeZ 1.0.8"
           "New Features"
           "RakkeZ Just Got Better"

           ------------------------------------------------- */

        title: "What's New",


        /* -------------------------------------------------
           💬 UPDATE DESCRIPTION

           الجملة الموجودة أسفل العنوان.

           اكتب هنا وصفًا قصيرًا للتحديث.

           ------------------------------------------------- */

        description:
            "We've added new features, improved the Media Player, and fixed several issues.",


        /* =================================================
           📦 CHANGES

           هنا تكتب كل الإضافات والتغييرات الجديدة.

           كل Change يتكون من:

           title
           description

           يمكنك إضافة عدد غير محدود من العناصر.

           مثال:

           {
               title: "New Feature",

               description:
                   "Description of the new feature."
           }

           ================================================= */

        changes: [


            /* =================================================
               🎵 MEDIA PLAYER
               ================================================= */

            {
                title: "New Media Player",

                description:
                    "Enjoy a cleaner and improved Media Player for focused study sessions."
            },


            /* =================================================
               🌧️ AMBIENT EFFECTS
               ================================================= */

            {
                title: "Ambient Effects",

                description:
                    "Play Rain, Airplane, Coffee, Fireplace, and Peaceful Piano independently alongside your music."
            },


            /* =================================================
               🔊 EFFECT VOLUME CONTROL
               ================================================= */

            {
                title: "Individual Effect Volume",

                description:
                    "Each ambient effect now has its own independent volume control."
            },


            /* =================================================
               ▶️ MULTIPLE EFFECTS
               ================================================= */

            {
                title: "Multiple Effects",

                description:
                    "You can now play multiple ambient effects at the same time while listening to your music."
            },


            /* =================================================
               📚 TUTORIAL
               ================================================= */

            {
                title: "Improved User Tutorial",

                description:
                    "The RakkeZ tutorial has been improved to make it easier for new users to understand the platform."
            },


            /* =================================================
               🌍 LANGUAGE
               ================================================= */

            {
                title: "Language Switcher",

                description:
                    "Improved the language switcher and added country flag icons for a cleaner experience."
            },


            /* =================================================
               📝 BLOG
               ================================================= */

            {
                title: "Blog Improvements",

                description:
                    "Added new focus and productivity articles and improved the Blog experience."
            },


            /* =================================================
               🎨 UI
               ================================================= */

            {
                title: "UI Improvements",

                description:
                    "Improved buttons, spacing, visual hierarchy, and several interface elements across RakkeZ."
            },


            /* =================================================
               🧹 CLEANER CODE
               ================================================= */

            {
                title: "Cleaner Media Player",

                description:
                    "Removed duplicated Media Player elements from the HTML and improved the overall structure."
            },


            /* =================================================
               🐛 BUG FIXES
               ================================================= */

            {
                title: "Bug Fixes",

                description:
                    "Fixed Media Player errors, Effect playback issues, loading problems, and several UI interaction bugs."
            },


            /* =================================================
               ⚡ PERFORMANCE
               ================================================= */

            {
                title: "Performance Improvements",

                description:
                    "Improved Media Player stability, loading reliability, and the overall RakkeZ experience."
            }

        ]

    };


    /* =====================================================
       ⚙️ SETTINGS
       =====================================================

       لا تحتاج لتعديل هذا الجزء عادةً.

       هذا المفتاح يستخدم LocalStorage لمعرفة
       إذا كان المستخدم شاهد هذا الإصدار أم لا.

       إذا كان المستخدم شاهد:

       1.0.8

       فلن يظهر له Popup مرة أخرى لنفس الإصدار.

       عندما تغيّر version إلى:

       1.0.9

       سيظهر الـ Popup مرة أخرى.
    ===================================================== */

    const STORAGE_KEY =
        "rakkez_seen_update_version";


    /* =====================================================
       🔗 DOM VARIABLES
       =====================================================

       هذه المتغيرات تمسك عناصر الـ HTML الخاصة
       بالـ Update Popup.

       لا تحتاج لتعديلها طالما أن IDs الموجودة
       في HTML لم تتغير.
    ===================================================== */

    let modal = null;

    let badge = null;

    let title = null;

    let description = null;

    let list = null;

    let doneButton = null;

    let closeButton = null;


    /* =====================================================
       🔍 FIND HTML ELEMENTS
       =====================================================

       يبحث عن عناصر الـ Update Popup داخل الصفحة.

       يعتمد على الـ IDs التالية:

       updatesModal
       updatesBadge
       updatesTitle
       updatesDescription
       updatesList
       updatesDone
       closeUpdates
    ===================================================== */

    function findElements() {

        modal =
            document.getElementById(
                "updatesModal"
            );


        badge =
            document.getElementById(
                "updatesBadge"
            );


        title =
            document.getElementById(
                "updatesTitle"
            );


        description =
            document.getElementById(
                "updatesDescription"
            );


        list =
            document.getElementById(
                "updatesList"
            );


        doneButton =
            document.getElementById(
                "updatesDone"
            );


        closeButton =
            document.getElementById(
                "closeUpdates"
            );


        return !!modal && !!list;

    }


    /* =====================================================
       🖥️ RENDER UPDATE
       =====================================================

       هذا الجزء يأخذ البيانات الموجودة في:

       RAKKEZ_UPDATE

       ويضعها داخل الـ HTML.

       لا تعدّل هذا الجزء عند إضافة Update جديد.
    ===================================================== */

    function renderUpdate() {

        if (!findElements()) {

            console.warn(
                "RakkeZ Updates: Required HTML elements were not found."
            );

            return false;

        }


        /* -------------------------------------------------
           🏷️ UPDATE BADGE
           ------------------------------------------------- */

        if (badge) {

            badge.textContent =
                RAKKEZ_UPDATE.badge ||
                "NEW";

        }


        /* -------------------------------------------------
           📝 UPDATE TITLE
           ------------------------------------------------- */

        if (title) {

            title.textContent =
                RAKKEZ_UPDATE.title ||
                "What's New";

        }


        /* -------------------------------------------------
           💬 UPDATE DESCRIPTION
           ------------------------------------------------- */

        if (description) {

            description.textContent =
                RAKKEZ_UPDATE.description ||
                "";

        }


        /* -------------------------------------------------
           🧹 CLEAR OLD CHANGES
           ------------------------------------------------- */

        list.innerHTML = "";


        /* -------------------------------------------------
           📦 GET CHANGES

           نتأكد أن changes عبارة عن Array.
           ------------------------------------------------- */

        const changes =
            Array.isArray(
                RAKKEZ_UPDATE.changes
            )
                ? RAKKEZ_UPDATE.changes
                : [];


        /* -------------------------------------------------
           🔄 CREATE EACH CHANGE
           ------------------------------------------------- */

        changes.forEach(
            function (change) {


                /* -----------------------------------------
                   إنشاء العنصر الرئيسي
                   ----------------------------------------- */

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "update-item";


                /* -----------------------------------------
                   إنشاء عنوان الـ Change
                   ----------------------------------------- */

                const itemTitle =
                    document.createElement(
                        "h3"
                    );


                itemTitle.textContent =
                    change.title ||
                    "Update";


                /* -----------------------------------------
                   إنشاء وصف الـ Change
                   ----------------------------------------- */

                const itemDescription =
                    document.createElement(
                        "p"
                    );


                itemDescription.textContent =
                    change.description ||
                    "";


                /* -----------------------------------------
                   إضافة العنوان والوصف
                   ----------------------------------------- */

                item.appendChild(
                    itemTitle
                );


                item.appendChild(
                    itemDescription
                );


                /* -----------------------------------------
                   إضافة الـ Change للـ List
                   ----------------------------------------- */

                list.appendChild(
                    item
                );

            }
        );


        return true;

    }


    /* =====================================================
       🔓 OPEN UPDATE POPUP
       =====================================================

       يفتح نافذة What's New.

       يمكنك أيضًا فتحها يدويًا من أي مكان
       باستخدام:

       RakkeZUpdates.open();
    ===================================================== */

    function openUpdates() {

        if (!renderUpdate()) {

            console.warn(
                "RakkeZ Updates: Cannot open because updatesModal was not found."
            );

            return;

        }


        /* -------------------------------------------------
           إظهار الـ Modal
           ------------------------------------------------- */

        modal.classList.add(
            "show"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        /* -------------------------------------------------
           Fallback

           في حالة الـ CSS لم يعرض الـ Modal بشكل صحيح.
           ------------------------------------------------- */

        modal.style.display =
            "flex";


        /* -------------------------------------------------
           منع Scroll الصفحة أثناء فتح الـ Popup.
           ------------------------------------------------- */

        document.body.style.overflow =
            "hidden";


        /* -------------------------------------------------
           Focus على زر Done
           ------------------------------------------------- */

        if (doneButton) {

            setTimeout(
                function () {

                    doneButton.focus();

                },
                100
            );

        }

    }


    /* =====================================================
       🔒 CLOSE UPDATE POPUP
       =====================================================

       يغلق الـ Popup ويسجل أن المستخدم شاهد
       إصدار الـ Update الحالي.

       لا تعدّل هذا الجزء عادةً.
    ===================================================== */

    function closeUpdates() {

        if (!modal) {

            findElements();

        }


        if (!modal) {

            return;

        }


        /* -------------------------------------------------
           إخفاء الـ Modal
           ------------------------------------------------- */

        modal.classList.remove(
            "show"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        modal.style.display =
            "none";


        /* -------------------------------------------------
           إعادة Scroll الصفحة.
           ------------------------------------------------- */

        document.body.style.overflow =
            "";


        /* -------------------------------------------------
           حفظ الإصدار الذي شاهده المستخدم.
           ------------------------------------------------- */

        localStorage.setItem(
            STORAGE_KEY,
            RAKKEZ_UPDATE.version
        );

    }


    /* =====================================================
       🔔 CHECK FOR NEW UPDATE
       =====================================================

       يقارن بين:

       Current Version
       و
       Last Seen Version

       إذا كانا مختلفين:

       → يفتح الـ Popup

       إذا كانا متساويين:

       → لا يظهر الـ Popup.
    ===================================================== */

    function checkForUpdate() {

        if (!findElements()) {

            console.warn(
                "RakkeZ Updates: HTML not ready yet. Retrying..."
            );


            setTimeout(
                checkForUpdate,
                300
            );


            return;

        }


        /* -------------------------------------------------
           معرفة آخر Version شاهده المستخدم.
           ------------------------------------------------- */

        const seenVersion =
            localStorage.getItem(
                STORAGE_KEY
            );


        /* -------------------------------------------------
           Debug Log

           يظهر في Console لمعرفة الإصدارات.
           ------------------------------------------------- */

        console.log(
            "RakkeZ Updates:",
            "Current:",
            RAKKEZ_UPDATE.version,
            "Seen:",
            seenVersion
        );


        /* -------------------------------------------------
           إذا كان الإصدار الحالي مختلفًا عن آخر
           إصدار شاهده المستخدم → افتح Popup.
           ------------------------------------------------- */

        if (
            seenVersion !==
            RAKKEZ_UPDATE.version
        ) {

            openUpdates();

        }

    }


    /* =====================================================
       🖱️ EVENTS
       =====================================================

       هنا يتم ربط أزرار الـ Popup بالوظائف.

       لا تحتاج لتعديل هذا الجزء.
    ===================================================== */

    function attachEvents() {

        if (!findElements()) {

            return;

        }


        /* -------------------------------------------------
           زر Done
           ------------------------------------------------- */

        if (doneButton) {

            doneButton.addEventListener(
                "click",
                closeUpdates
            );

        }


        /* -------------------------------------------------
           زر X
           ------------------------------------------------- */

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeUpdates
            );

        }


        /* -------------------------------------------------
           الضغط خارج الـ Popup يغلقه.
           ------------------------------------------------- */

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    modal
                ) {

                    closeUpdates();

                }

            }
        );

    }


    /* =====================================================
       ⌨️ ESCAPE KEY
       =====================================================

       الضغط على ESC أثناء فتح الـ Popup
       يقوم بإغلاقه.
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("show")
            ) {

                closeUpdates();

            }

        }
    );


    /* =====================================================
       🚀 INITIALIZE
       =====================================================

       يبدأ نظام الـ Update بعد تحميل الصفحة.

       لا تحتاج لتعديل هذا الجزء.
    ===================================================== */

    function initialize() {

        attachEvents();


        /*
         * ننتظر نصف ثانية حتى نتأكد أن
         * HTML الخاص بالـ Popup تم تحميله.
         */

        setTimeout(
            checkForUpdate,
            500
        );

    }


    /* -----------------------------------------------------
       انتظار تحميل DOM
       ----------------------------------------------------- */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            {
                once: true
            }
        );

    } else {

        initialize();

    }


    /* =====================================================
       🌐 GLOBAL API
       =====================================================

       يمكنك التحكم في الـ Update Popup من أي ملف
       JavaScript آخر.

       فتح:

       RakkeZUpdates.open();

       إغلاق:

       RakkeZUpdates.close();

       فحص Update:

       RakkeZUpdates.check();

       معرفة Version الحالي:

       RakkeZUpdates.version
    ===================================================== */

    window.RakkeZUpdates = {

        open:
            openUpdates,

        close:
            closeUpdates,

        check:
            checkForUpdate,

        version:
            RAKKEZ_UPDATE.version

    };


})();
