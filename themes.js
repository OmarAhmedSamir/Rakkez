/* =========================================================
   RAKKEZ THEME + AMBIENT SYSTEM
   FULL STANDALONE VERSION
   =========================================================

   هذا الملف مسؤول فقط عن:

   1. الوضع الليلي / النهاري
   2. زر تغيير الـ Theme
   3. زر Ambient / الأجواء
   4. فتح وإغلاق نافذة الأجواء
   5. الخلفيات المتدرجة Gradient
   6. الخلفيات الجاهزة بالصور
   7. رفع صورة أو فيديو من الجهاز
   8. حفظ الخلفية المختارة
   9. حفظ الـ Dark / Light Theme

   =========================================================

   هذا الملف لا يتحكم في:

   ❌ Timer
   ❌ Stats
   ❌ Tasks
   ❌ Media Player
   ❌ Spotify
   ❌ YouTube
   ❌ Alarm
   ❌ Google

   =========================================================

   IMPORTANT:

   لو عايز تضيف Gradient جديد:
   عدل فقط AMBIENT_GRADIENTS

   لو عايز تضيف صورة جديدة:
   عدل فقط AMBIENT_PRESETS

   لا تحتاج لتعديل app.js.

   ========================================================= */


(function () {

    "use strict";


    /* =========================================================
       01 — منع تشغيل الملف أكثر من مرة
       =========================================================

       لو theme.js تم تحميله مرتين بالخطأ في HTML
       لن يتم إنشاء نظامين Ambient فوق بعض.

       لا تعدل هذا الجزء.
       ========================================================= */

    if (window.__RAKKEZ_THEME_INITIALIZED__) {

        console.warn(
            "RakkeZ Theme: already initialized."
        );

        return;
    }

    window.__RAKKEZ_THEME_INITIALIZED__ = true;


    /* =========================================================
       02 — HELPER

       الدالة $ تجعل كتابة:

           $("themeBtn")

       بدل:

           document.getElementById("themeBtn")

       لا تعدل هذا الجزء.
       ========================================================= */

    const $ = function (id) {

        return document.getElementById(id);

    };


    /* =========================================================
       03 — STORAGE

       هنا أسماء الأشياء التي يتم حفظها داخل Browser Storage.

       theme:
       يحفظ Dark / Light Mode.

       ambient:
       يحفظ الخلفية التي اختارها المستخدم.

       IMPORTANT:
       استخدمنا أسماء مستقلة عن app.js حتى لا يحصل تعارض.

       لا تغير هذه الأسماء بعد أن يستخدمها الموقع،
       إلا إذا كنت تعرف أنك تريد تصفير البيانات القديمة.
       ========================================================= */

    const STORAGE = {

        settings:
            "rakkez_theme_settings",

        ambient:
            "rakkez_ambient"

    };


    /* =========================================================
       04 — DEFAULT THEME

       هذا هو الوضع الافتراضي عند أول تشغيل.

       dark
       = الوضع الليلي

       light
       = الوضع النهاري

       لو عايز الموقع يبدأ Light بدل Dark:

           theme: "light"

       ========================================================= */

    const DEFAULT_SETTINGS = {

        theme: "dark"

    };


    /* =========================================================
       05 — قراءة البيانات المحفوظة

       هذه الدالة تقرأ البيانات من localStorage.

       لا تحتاج لتعديلها.
       ========================================================= */

    function loadJSON(key, fallback) {

        try {

            const value =
                localStorage.getItem(key);

            if (!value) {

                return fallback;

            }

            const parsed =
                JSON.parse(value);

            return parsed ?? fallback;

        } catch (error) {

            console.warn(
                "RakkeZ Theme: storage read failed:",
                key,
                error
            );

            return fallback;

        }

    }


    /* =========================================================
       06 — حفظ البيانات

       هذه الدالة تحفظ البيانات في localStorage.

       لا تحتاج لتعديلها.
       ========================================================= */

    function saveJSON(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

        } catch (error) {

            console.warn(
                "RakkeZ Theme: storage save failed:",
                key,
                error
            );

        }

    }


    /* =========================================================
       07 — إعدادات الـ Theme الحالية

       يتم دمج:

       DEFAULT_SETTINGS

       مع الإعدادات المحفوظة.

       لا تعدل هذا الجزء.
       ========================================================= */

    let settings = {

        ...DEFAULT_SETTINGS,

        ...loadJSON(
            STORAGE.settings,
            {}
        )

    };


    /* =========================================================
       08 — التأكد أن الـ Theme صحيح

       لو حصلت قيمة غريبة في Storage،
       يرجع تلقائيًا إلى Dark.

       لا تعدل هذا الجزء.
       ========================================================= */

    if (
        settings.theme !== "dark" &&
        settings.theme !== "light"
    ) {

        settings.theme =
            DEFAULT_SETTINGS.theme;

    }


    /* =========================================================
       09 — الخلفية الحالية

       الافتراضي:

           gradient

       لو المستخدم اختار صورة أو خلفية أخرى
       يتم حفظ الـ ID الخاص بها.

       لا تعدل هذا الجزء.
       ========================================================= */

    let selectedAmbient =
        localStorage.getItem(
            STORAGE.ambient
        ) || "gradient";


    /* =========================================================
       10 — Local Background URL

       هنا يتم تخزين رابط الصورة / الفيديو
       الذي رفعه المستخدم من جهازه.

       لا تعدل هذا الجزء.
       ========================================================= */

    let localBackgroundURL = null;


    /* =========================================================
       11 — GRADIENT BACKGROUNDS
       =========================================================

       ⭐⭐ هنا المكان الذي تعدل فيه الـ Gradients ⭐⭐

       لإضافة Gradient جديد:

       انسخ هذا الشكل:

       {
           id: "purple",
           name: "Purple Dream",
           background: `
               radial-gradient(
                   circle at 20% 20%,
                   #9b5cff,
                   transparent 35%
               ),
               #090014
           `
       }

       ثم ضعه قبل:

           ];

       =========================================================

       IMPORTANT:

       id:
       اسم داخلي فريد.

       name:
       الاسم الذي يظهر للمستخدم.

       background:
       شكل وألوان الخلفية.

       لا تجعل id متكررًا.

       ========================================================= */

    const AMBIENT_GRADIENTS = [

        /* =====================================================
           GRADIENT 01 — RakkeZ الأساسي
           ===================================================== */

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
           GRADIENT 02 — Yellow
           ===================================================== */

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
           GRADIENT 03 — Pink
           ===================================================== */

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

        }

    ];


    /* =========================================================
       12 — IMAGE AMBIENT PRESETS
       =========================================================

       ⭐⭐ هنا المكان الذي تضيف فيه صور الخلفيات ⭐⭐

       لإضافة صورة جديدة:

       {

           id: "tokyo",

           name: "Tokyo Night",

           url:
               "https://example.com/image.jpg"

       }

       =========================================================

       id:
       اسم داخلي فريد.

       name:
       الاسم الذي سيظهر أسفل الصورة.

       url:
       رابط الصورة.

       =========================================================

       تقدر تضيف أي عدد من الصور.

       لا تحتاج لتعديل أي شيء آخر.
       ========================================================= */

    const AMBIENT_PRESETS = [

        /* =====================================================
           IMAGE 01
           ===================================================== */

        {

            id: "anime-girl",

            name: "✨ NEW ✨ Anime Girl",

            url:
                "https://image.cdn2.seaart.ai/2024-03-02/cnhb3jde878c73a9lp80/0c7c4c2054c4dd5d4dce8769ef3e4fdc02c9f2d6_high.webp"

        },


        /* =====================================================
           IMAGE 02
           ===================================================== */

        {

            id: "newyork",

            name: "New York",

            url:
                "https://wallpapercave.com/wp/wp3544754.jpg"

        },


        /* =====================================================
           IMAGE 03
           ===================================================== */

        {

            id: "ocean",

            name: "Ocean",

            url:
                "https://wallpapercave.com/wp/wp8963442.jpg"

        },


        /* =====================================================
           IMAGE 04
           ===================================================== */

        {

            id: "nature",

            name: "Nature",

            url:
                "https://wallpapercave.com/wp/wp2506793.jpg"

        },


        /* =====================================================
           IMAGE 05
           ===================================================== */

        {

            id: "coffee",

            name: "Lofi Coffee",

            url:
                "https://wallpaperaccess.com/full/8891446.jpg"

        },


        /* =====================================================
           IMAGE 06
           ===================================================== */

        {

            id: "coffee2",

            name: "Lofi Coffee 2",

            url:
                "https://i.ytimg.com/vi/8-BsxrE1bY8/maxresdefault.jpg"

        },


        /* =====================================================
           IMAGE 07
           ===================================================== */

        {

            id: "room",

            name: "Lofi Room",

            url:
                "https://wallpapercave.com/wp/wp12446857.jpg"

        },


        /* =====================================================
           IMAGE 08
           ===================================================== */

        {

            id: "swiss",

            name: "Swiss",

            url:
                "https://wallpaperaccess.com/full/1455073.jpg"

        },


        /* =====================================================
           IMAGE 09
           ===================================================== */

        {

            id: "city",

            name: "Lofi City",

            url:
                "https://images.hdqwalls.com/download/van-ov-2560x1600.jpg"

        }

    ];


    /* =========================================================
       13 — الوصول إلى عنصر Gradient
       =========================================================

       لا تعدل.
       ========================================================= */

    function getGradientElement() {

        return document.querySelector(
            ".bg-gradient"
        );

    }


    /* =========================================================
       14 — الوصول إلى صورة الخلفية
       =========================================================

       HTML المطلوب:

       <img id="customImage">

       لا تعدل.
       ========================================================= */

    function getImageElement() {

        return $("customImage");

    }


    /* =========================================================
       15 — الوصول إلى فيديو الخلفية
       =========================================================

       HTML المطلوب:

       <video id="customVideo">

       لا تعدل.
       ========================================================= */

    function getVideoElement() {

        return $("customVideo");

    }


    /* =========================================================
       16 — إيقاف فيديو الخلفية

       يتم استخدامه عندما ننتقل من:

       Video → Image
       Video → Gradient

       لا تعدل.
       ========================================================= */

    function stopVideo() {

        const video =
            getVideoElement();

        if (!video) {

            return;

        }


        try {

            video.pause();

        } catch (error) {}


        video.removeAttribute(
            "src"
        );


        try {

            video.load();

        } catch (error) {}


        video.style.display =
            "none";

    }


    /* =========================================================
       17 — إخفاء صورة الخلفية

       لا تعدل.
       ========================================================= */

    function hideImage() {

        const image =
            getImageElement();


        if (!image) {

            return;

        }


        image.style.display =
            "none";


        image.removeAttribute(
            "src"
        );

    }


    /* =========================================================
       18 — إخفاء Gradient

       لا تعدل.
       ========================================================= */

    function hideGradient() {

        const gradient =
            getGradientElement();


        if (!gradient) {

            return;

        }


        gradient.style.display =
            "none";

    }


    /* =========================================================
       19 — تطبيق Dark / Light Theme
       =========================================================

       هذا الجزء يضيف:

           .light

       إلى:

           body
           html

       ويحدث زر Theme.

       لا تعدل إلا إذا كنت تريد تغيير
       طريقة عمل الـ Theme في CSS.
       ========================================================= */

    function applyTheme() {

        const theme =
            settings.theme === "light"
                ? "light"
                : "dark";


        document.documentElement.classList.toggle(
            "light",
            theme === "light"
        );


        document.body.classList.toggle(
            "light",
            theme === "light"
        );


        document.documentElement.dataset.theme =
            theme;


        document.body.dataset.theme =
            theme;


        const themeButton =
            $("themeBtn");


        if (themeButton) {

            themeButton.textContent =
                theme === "light"
                    ? "☀"
                    : "☾";


            themeButton.setAttribute(
                "aria-label",
                theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );


            themeButton.setAttribute(
                "title",
                theme === "light"
                    ? "Dark Mode"
                    : "Light Mode"
            );

        }

    }


    /* =========================================================
       20 — تبديل Dark / Light

       عند الضغط على زر Theme:

       Dark → Light

       Light → Dark

       لا تعدل.
       ========================================================= */

    function toggleTheme() {

        settings.theme =
            settings.theme === "light"
                ? "dark"
                : "light";


        applyTheme();


        saveJSON(
            STORAGE.settings,
            settings
        );

    }


    /* =========================================================
       21 — تطبيق Gradient

       تستخدم عندما يختار المستخدم Gradient.

       لا تعدل إلا إذا كنت تريد تغيير
       طريقة عرض الخلفية.
       ========================================================= */

    function applyGradient(
        gradientValue
    ) {

        if (!gradientValue) {

            return;

        }


        const gradient =
            getGradientElement();


        if (gradient) {

            gradient.style.display =
                "block";


            gradient.style.background =
                gradientValue;

        }


        hideImage();

        stopVideo();

    }


    /* =========================================================
       22 — تطبيق صورة Ambient

       تستخدم مع:

       Ocean
       Nature
       Coffee
       New York
       إلخ...

       لا تعدل.
       ========================================================= */

    function applyAmbient(item) {

        if (
            !item ||
            !item.url
        ) {

            return;

        }


        hideGradient();

        stopVideo();


        const image =
            getImageElement();


        if (!image) {

            console.warn(
                "RakkeZ Theme: #customImage not found."
            );

            return;

        }


        image.style.display =
            "block";


        image.src =
            item.url;


        image.alt =
            item.name ||
            "Ambient Background";

    }


    /* =========================================================
       23 — إلغاء كل الخلفيات

       Gradient OFF
       Image OFF
       Video OFF

       لا تعدل.
       ========================================================= */

    function resetBackground() {

        const gradient =
            getGradientElement();


        if (gradient) {

            gradient.style.display =
                "none";


            gradient.style.background =
                "";

        }


        hideImage();

        stopVideo();

    }


    /* =========================================================
       24 — حفظ Ambient المختار

       مثال:

           gradient
           yellow
           pink
           ocean
           coffee

       لا تعدل.
       ========================================================= */

    function selectAmbient(id) {

        selectedAmbient =
            id;


        try {

            localStorage.setItem(
                STORAGE.ambient,
                selectedAmbient
            );

        } catch (error) {

            console.warn(
                "RakkeZ Theme: ambient save failed.",
                error
            );

        }

    }


    /* =========================================================
       25 — إغلاق نافذة Ambient

       يتم إزالة:

           show

       من:

           #ambientOverlay

       لا تعدل.
       ========================================================= */

    function closeAmbient() {

        const overlay =
            $("ambientOverlay");


        if (!overlay) {

            return;

        }


        overlay.classList.remove(
            "show"
        );

    }


    /* =========================================================
       26 — فتح نافذة Ambient

       هذا هو الجزء المسؤول فعليًا
       عن زر الأجواء.

       عند الضغط:

       1. يعيد رسم الخلفيات
       2. يفتح الـ Overlay

       لا تعدل.
       ========================================================= */

    function openAmbient() {

        renderAmbient();


        const overlay =
            $("ambientOverlay");


        if (!overlay) {

            console.warn(
                "RakkeZ Theme: #ambientOverlay not found."
            );

            return;

        }


        overlay.classList.add(
            "show"
        );

    }


    /* =========================================================
       27 — إنشاء اسم كارت Ambient

       نستخدم textContent بدل innerHTML
       حتى يكون أكثر أمانًا.

       لا تعدل.
       ========================================================= */

    function createAmbientName(
        name
    ) {

        const element =
            document.createElement(
                "div"
            );


        element.className =
            "ambient-name";


        element.textContent =
            name ||
            "Ambient";


        return element;

    }


    /* =========================================================
       28 — إنشاء كارت Gradient

       هذا الجزء يبني كارت كل Gradient
       تلقائيًا.

       لا تحتاج لإضافة كود هنا
       عندما تضيف Gradient جديد.

       فقط أضفه في:

           AMBIENT_GRADIENTS

       ========================================================= */

    function createGradientCard(
        item
    ) {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "ambient-card";


        if (
            selectedAmbient ===
            item.id
        ) {

            card.classList.add(
                "selected"
            );

        }


        const preview =
            document.createElement(
                "div"
            );


        preview.style.width =
            "100%";


        preview.style.height =
            "100%";


        preview.style.background =
            item.background;


        card.appendChild(
            preview
        );


        card.appendChild(
            createAmbientName(
                item.name
            )
        );


        /* =====================================================
           عند الضغط على Gradient
           ===================================================== */

        card.addEventListener(
            "click",
            function () {

                selectAmbient(
                    item.id
                );


                resetBackground();


                applyGradient(
                    item.background
                );


                renderAmbient();

            }
        );


        return card;

    }


    /* =========================================================
       29 — إنشاء كارت Image

       لا تحتاج لتعديل.

       كل الصور الجديدة يتم توليد كروتها تلقائيًا
       من AMBIENT_PRESETS.
       ========================================================= */

    function createImageCard(
        item
    ) {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "ambient-card";


        if (
            selectedAmbient ===
            item.id
        ) {

            card.classList.add(
                "selected"
            );

        }


        const image =
            document.createElement(
                "img"
            );


        image.src =
            item.url;


        image.alt =
            item.name ||
            "Ambient";


        image.loading =
            "lazy";


        /* =====================================================
           لو الصورة الخارجية فشلت
           لا يكسر النظام.
           ===================================================== */

        image.addEventListener(
            "error",
            function () {

                image.style.opacity =
                    "0.35";

            }
        );


        card.appendChild(
            image
        );


        card.appendChild(
            createAmbientName(
                item.name
            )
        );


        /* =====================================================
           عند الضغط على الصورة
           ===================================================== */

        card.addEventListener(
            "click",
            function () {

                selectAmbient(
                    item.id
                );


                applyAmbient(
                    item
                );


                renderAmbient();

            }
        );


        return card;

    }


    /* =========================================================
       30 — Local Background Card

       هذا هو الكارت:

           +

       الذي يسمح للمستخدم باختيار:

       🖼 صورة من الجهاز
       🎥 فيديو من الجهاز

       لا تعدل.
       ========================================================= */

    function createLocalCard() {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "ambient-card";


        if (
            selectedAmbient ===
            "local"
        ) {

            card.classList.add(
                "selected"
            );

        }


        const preview =
            document.createElement(
                "div"
            );


        preview.style.width =
            "100%";


        preview.style.height =
            "100%";


        preview.style.display =
            "flex";


        preview.style.alignItems =
            "center";


        preview.style.justifyContent =
            "center";


        preview.style.background =
            "linear-gradient(135deg,#151515,#050505)";


        preview.style.fontSize =
            "34px";


        preview.textContent =
            "+";


        card.appendChild(
            preview
        );


        card.appendChild(
            createAmbientName(
                "Local Background"
            )
        );


        /* =====================================================
           عند الضغط يفتح File Picker
           ===================================================== */

        card.addEventListener(
            "click",
            function () {

                const input =
                    $("bgFile");


                if (input) {

                    input.click();

                } else {

                    console.warn(
                        "RakkeZ Theme: #bgFile not found."
                    );

                }

            }
        );


        return card;

    }


    /* =========================================================
       31 — رسم كل Ambient Cards

       هذا الجزء يجمع:

       Gradients
       +
       Images
       +
       Local Background

       لا تعدل هنا لإضافة خلفية جديدة.

       التعديل يكون في:

           AMBIENT_GRADIENTS

       أو:

           AMBIENT_PRESETS
       ========================================================= */

    function renderAmbient() {

        const grid =
            $("ambientGrid");


        if (!grid) {

            console.warn(
                "RakkeZ Theme: #ambientGrid not found."
            );

            return;

        }


        /* =====================================================
           حذف الكروت القديمة
           ===================================================== */

        grid.replaceChildren();


        /* =====================================================
           إضافة Gradients
           ===================================================== */

        AMBIENT_GRADIENTS.forEach(
            function (item) {

                grid.appendChild(
                    createGradientCard(
                        item
                    )
                );

            }
        );


        /* =====================================================
           إضافة الصور
           ===================================================== */

        AMBIENT_PRESETS.forEach(
            function (item) {

                grid.appendChild(
                    createImageCard(
                        item
                    )
                );

            }
        );


        /* =====================================================
           إضافة Local Background
           ===================================================== */

        grid.appendChild(
            createLocalCard()
        );

    }


    /* =========================================================
       32 — استرجاع Ambient المحفوظ

       عند فتح الموقع:

       يقرأ الخلفية التي اختارها المستخدم آخر مرة.

       مثال:

           pink
           ↓
           يطبق Pink تلقائيًا

       ========================================================= */

    function restoreAmbient() {

        /* =====================================================
           Local files لا تستمر بعد Refresh.

           لذلك نرجع للـ Gradient.
           ===================================================== */

        if (
            selectedAmbient ===
            "local"
        ) {

            selectedAmbient =
                "gradient";


            try {

                localStorage.setItem(
                    STORAGE.ambient,
                    "gradient"
                );

            } catch (error) {}

        }


        /* =====================================================
           البحث عن Gradient
           ===================================================== */

        const gradient =
            AMBIENT_GRADIENTS.find(
                function (item) {

                    return (
                        item.id ===
                        selectedAmbient
                    );

                }
            );


        if (gradient) {

            resetBackground();


            applyGradient(
                gradient.background
            );


            return;

        }


        /* =====================================================
           البحث عن Image
           ===================================================== */

        const image =
            AMBIENT_PRESETS.find(
                function (item) {

                    return (
                        item.id ===
                        selectedAmbient
                    );

                }
            );


        if (image) {

            applyAmbient(
                image
            );


            return;

        }


        /* =====================================================
           لو الخلفية المحفوظة غير موجودة
           نرجع إلى Gradient الأساسي.
           ===================================================== */

        selectedAmbient =
            "gradient";


        try {

            localStorage.setItem(
                STORAGE.ambient,
                "gradient"
            );

        } catch (error) {}


        const fallback =
            AMBIENT_GRADIENTS.find(
                function (item) {

                    return (
                        item.id ===
                        "gradient"
                    );

                }
            );


        resetBackground();


        if (fallback) {

            applyGradient(
                fallback.background
            );

        }

    }


    /* =========================================================
       33 — Local Image / Video

       هذا الجزء يعمل عندما يختار المستخدم
       ملفًا من جهازه.

       يقبل:

           Image
           Video

       لا تعدل إلا إذا كنت تريد إضافة
       أنواع ملفات جديدة.
       ========================================================= */

    function handleLocalBackground(
        event
    ) {

        const files =
            event.target.files;


        const file =
            files &&
            files[0];


        if (!file) {

            return;

        }


        /* =====================================================
           حذف Blob URL القديم
           ===================================================== */

        if (localBackgroundURL) {

            try {

                URL.revokeObjectURL(
                    localBackgroundURL
                );

            } catch (error) {}

        }


        /* =====================================================
           إنشاء Blob URL جديد
           ===================================================== */

        localBackgroundURL =
            URL.createObjectURL(
                file
            );


        selectAmbient(
            "local"
        );


        const image =
            getImageElement();


        const video =
            getVideoElement();


        /* =====================================================
           إذا كان الملف VIDEO
           ===================================================== */

        if (
            file.type.startsWith(
                "video/"
            )
        ) {

            hideImage();


            if (video) {

                video.style.display =
                    "block";


                video.src =
                    localBackgroundURL;


                video.loop =
                    true;


                video.muted =
                    true;


                video.playsInline =
                    true;


                video.setAttribute(
                    "playsinline",
                    ""
                );


                const playPromise =
                    video.play();


                if (
                    playPromise &&
                    typeof playPromise.catch ===
                    "function"
                ) {

                    playPromise.catch(
                        function () {}
                    );

                }

            }

        }


        /* =====================================================
           إذا كان الملف IMAGE
           ===================================================== */

        else {

            stopVideo();


            if (image) {

                image.style.display =
                    "block";


                image.src =
                    localBackgroundURL;


                image.alt =
                    "Local Background";

            }

        }


        /* =====================================================
           إغلاق نافذة Ambient بعد اختيار الملف
           ===================================================== */

        closeAmbient();


        /* =====================================================
           تصفير Input

           يسمح للمستخدم باختيار نفس الملف
           مرة أخرى.
           ===================================================== */

        if (event.target) {

            event.target.value =
                "";

        }


        renderAmbient();

    }


    /* =========================================================
       34 — زر Theme

       HTML المطلوب:

           id="themeBtn"

       لا تستخدم onclick في HTML.

       هذا الملف هو المسؤول عن الزر.
       ========================================================= */

    function bindThemeButton() {

        const button =
            $("themeBtn");


        if (!button) {

            console.warn(
                "RakkeZ Theme: #themeBtn not found."
            );

            return;

        }


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleTheme();

            }
        );

    }


    /* =========================================================
       35 — زر Ambient ⭐

       HTML المطلوب:

           id="ambientOpen"

       هذا هو الجزء المسؤول عن تشغيل زر الأجواء.

       عند الضغط:

           Ambient Button
                 ↓
           openAmbient()
                 ↓
           renderAmbient()
                 ↓
           ambientOverlay.show

       ========================================================= */

    function bindAmbientButton() {

        const button =
            $("ambientOpen");


        if (!button) {

            console.warn(
                "RakkeZ Theme: #ambientOpen not found."
            );

            return;

        }


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                openAmbient();

            }
        );

    }


    /* =========================================================
       36 — أزرار X لإغلاق Ambient

       يدعم النظام أكثر من اسم حتى لو كان
       الـ HTML الحالي عندك يستخدم واحدًا منها:

           #ambientClose

           #ambientCloseBtn

           .ambient-close

           .ambient-overlay-close

       لذلك لا تحتاج تعديل JavaScript
       إذا كان عندك واحد من هذه الأسماء.
       ========================================================= */

    function bindAmbientCloseButtons() {

        const selectors = [

            "#ambientClose",

            "#ambientCloseBtn",

            ".ambient-close",

            ".ambient-overlay-close"

        ];


        selectors.forEach(
            function (selector) {

                document
                    .querySelectorAll(
                        selector
                    )
                    .forEach(
                        function (button) {

                            button.addEventListener(
                                "click",
                                function (event) {

                                    event.preventDefault();

                                    event.stopPropagation();

                                    closeAmbient();

                                }
                            );

                        }
                    );

            }
        );

    }


    /* =========================================================
       37 — الضغط خارج نافذة Ambient

       لو المستخدم ضغط على الخلفية السوداء
       خارج الـ Panel:

           يتم إغلاق النافذة.

       ========================================================= */

    function bindAmbientOverlay() {

        const overlay =
            $("ambientOverlay");


        if (!overlay) {

            console.warn(
                "RakkeZ Theme: #ambientOverlay not found."
            );

            return;

        }


        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    overlay
                ) {

                    closeAmbient();

                }

            }
        );

    }


    /* =========================================================
       38 — زر ESC

       الضغط على:

           ESC

       يغلق Ambient.

       ========================================================= */

    function bindEscapeKey() {

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeAmbient();

                }

            }
        );

    }


    /* =========================================================
       39 — File Input

       HTML المطلوب:

           <input
               id="bgFile"
               type="file"
               accept="image/*,video/*"
           >

       لا تعدل.
       ========================================================= */

    function bindLocalBackground() {

        const input =
            $("bgFile");


        if (!input) {

            console.warn(
                "RakkeZ Theme: #bgFile not found."
            );

            return;

        }


        input.addEventListener(
            "change",
            handleLocalBackground
        );

    }


    /* =========================================================
       40 — PUBLIC API

       هذا يسمح لملفات أخرى باستخدام
       وظائف Theme عند الضرورة.

       مثال:

           window.rakkezTheme.toggleTheme();

       ========================================================= */

    window.rakkezTheme = {

        applyTheme,

        toggleTheme,

        renderAmbient,

        restoreAmbient,

        applyGradient,

        applyAmbient,

        resetBackground,

        openAmbient,

        closeAmbient,

        getSelectedAmbient:
            function () {

                return selectedAmbient;

            },

        getGradients:
            function () {

                return AMBIENT_GRADIENTS.slice();

            },

        getPresets:
            function () {

                return AMBIENT_PRESETS.slice();

            }

    };


    /* =========================================================
       41 — INITIALIZATION

       هنا يبدأ النظام بالكامل.

       الترتيب:

       1. Theme
       2. Ambient المحفوظ
       3. رسم الكروت
       4. زر Theme
       5. زر Ambient
       6. أزرار الإغلاق
       7. Overlay
       8. ESC
       9. Local Background

       لا تعدل.
       ========================================================= */

    function initThemeSystem() {

        applyTheme();

        restoreAmbient();

        renderAmbient();

        bindThemeButton();

        bindAmbientButton();

        bindAmbientCloseButtons();

        bindAmbientOverlay();

        bindEscapeKey();

        bindLocalBackground();


        console.log(
            "RakkeZ Theme + Ambient initialized successfully."
        );

    }


    /* =========================================================
       42 — DOM READY

       لو JavaScript اشتغل قبل HTML:
       ننتظر DOMContentLoaded.

       لو HTML جاهز:
       نشغل النظام فورًا.

       لا تعدل.
       ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initThemeSystem,
            {
                once: true
            }
        );

    } else {

        initThemeSystem();

    }


})();

