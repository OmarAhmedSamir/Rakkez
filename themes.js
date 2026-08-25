/* =========================================================
   RAKKEZ THEME + AMBIENT SYSTEM
   FULL REPLACEMENT
   =========================================================

   RESPONSIBILITIES:

   1. Dark / Light Theme
   2. Theme Button
   3. Ambient Button
   4. Ambient Overlay
   5. Ambient Close Buttons
   6. Gradient Backgrounds
   7. Image Backgrounds
   8. Local Image / Video Background
   9. Persistent Theme
   10. Persistent Ambient

   IMPORTANT:

   This version uses EVENT DELEGATION for buttons.

   Therefore it still works if:
   - Header is re-rendered
   - Buttons are dynamically created
   - app.js changes the DOM
   - Header content is replaced

   ========================================================= */


(function () {

    "use strict";


    /* =========================================================
       01 — PREVENT DOUBLE INITIALIZATION
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
       ========================================================= */

    const $ = function (id) {

        return document.getElementById(id);

    };


    /* =========================================================
       03 — STORAGE
       ========================================================= */

    const STORAGE = {

        settings:
            "rakkez_theme_settings",

        ambient:
            "rakkez_ambient"

    };


    /* =========================================================
       04 — DEFAULT SETTINGS
       ========================================================= */

    const DEFAULT_SETTINGS = {

        theme: "dark"

    };


    /* =========================================================
       05 — LOAD JSON
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
       06 — SAVE JSON
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
       07 — CURRENT SETTINGS
       ========================================================= */

    let settings = {

        ...DEFAULT_SETTINGS,

        ...loadJSON(
            STORAGE.settings,
            {}
        )

    };


    /* =========================================================
       08 — VALIDATE THEME
       ========================================================= */

    if (
        settings.theme !== "dark" &&
        settings.theme !== "light"
    ) {

        settings.theme =
            DEFAULT_SETTINGS.theme;

    }


    /* =========================================================
       09 — SELECTED AMBIENT
       ========================================================= */

    let selectedAmbient =
        localStorage.getItem(
            STORAGE.ambient
        ) || "gradient";


    /* =========================================================
       10 — LOCAL BACKGROUND URL
       ========================================================= */

    let localBackgroundURL = null;


    /* =========================================================
       11 — GRADIENT BACKGROUNDS
       ========================================================= */

    const AMBIENT_GRADIENTS = [

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
       ========================================================= */

    const AMBIENT_PRESETS = [

        {
            id: "anime-girl",

            name: "✨ NEW ✨ Anime Girl",

            url:
                "https://image.cdn2.seaart.ai/2024-03-02/cnhb3jde878c73a9lp80/0c7c4c2054c4dd5d4dce8769ef3e4fdc02c9f2d6_high.webp"
        },


        {
            id: "newyork",

            name: "New York",

            url:
                "https://wallpapercave.com/wp/wp3544754.jpg"
        },


        {
            id: "ocean",

            name: "Ocean",

            url:
                "https://wallpapercave.com/wp/wp8963442.jpg"
        },


        {
            id: "nature",

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
            id: "room",

            name: "Lofi Room",

            url:
                "https://wallpapercave.com/wp/wp12446857.jpg"
        },


        {
            id: "swiss",

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
       13 — GET GRADIENT ELEMENT
       ========================================================= */

    function getGradientElement() {

        return document.querySelector(
            ".bg-gradient"
        );

    }


    /* =========================================================
       14 — GET IMAGE ELEMENT
       ========================================================= */

    function getImageElement() {

        return $("customImage");

    }


    /* =========================================================
       15 — GET VIDEO ELEMENT
       ========================================================= */

    function getVideoElement() {

        return $("customVideo");

    }


    /* =========================================================
       16 — STOP VIDEO
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
       17 — HIDE IMAGE
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
       18 — HIDE GRADIENT
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
       19 — APPLY THEME
       ========================================================= */

    function applyTheme() {

        const theme =
            settings.theme === "light"
                ? "light"
                : "dark";


        const isLight =
            theme === "light";


        /* =====================================================
           HTML
           ===================================================== */

        document.documentElement.classList.toggle(
            "light",
            isLight
        );


        document.documentElement.dataset.theme =
            theme;


        /* =====================================================
           BODY
           ===================================================== */

        if (document.body) {

            document.body.classList.toggle(
                "light",
                isLight
            );


            document.body.dataset.theme =
                theme;

        }


        /* =====================================================
           THEME BUTTON

           Support:

           #themeBtn
           ===================================================== */

        const themeButton =
            $("themeBtn");


        if (themeButton) {

            themeButton.textContent =
                isLight
                    ? "☀"
                    : "☾";


            themeButton.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );


            themeButton.setAttribute(
                "title",
                isLight
                    ? "Dark Mode"
                    : "Light Mode"
            );


            themeButton.dataset.theme =
                theme;

        }


        /* =====================================================
           OPTIONAL SUPPORT FOR COMMON ICON ELEMENTS
           ===================================================== */

        document
            .querySelectorAll(
                "[data-theme-icon]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        isLight
                            ? "☀"
                            : "☾";

                }
            );

    }


    /* =========================================================
       20 — TOGGLE THEME
       ========================================================= */

    function toggleTheme() {

        settings.theme =
            settings.theme === "light"
                ? "dark"
                : "light";


        saveJSON(
            STORAGE.settings,
            settings
        );


        applyTheme();


        /* =====================================================
           EVENT

           يسمح لملفات أخرى بمعرفة أن Theme تغير.
           ===================================================== */

        try {

            window.dispatchEvent(
                new CustomEvent(
                    "rakkez:themechange",
                    {
                        detail: {
                            theme:
                                settings.theme
                        }
                    }
                )
            );

        } catch (error) {}

    }


    /* =========================================================
       21 — APPLY GRADIENT
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
       22 — APPLY IMAGE AMBIENT
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
       23 — RESET BACKGROUND
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
       24 — SELECT AMBIENT
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


        /* =====================================================
           EVENT
           ===================================================== */

        try {

            window.dispatchEvent(
                new CustomEvent(
                    "rakkez:ambientchange",
                    {
                        detail: {
                            ambient:
                                selectedAmbient
                        }
                    }
                )
            );

        } catch (error) {}

    }


    /* =========================================================
       25 — CLOSE AMBIENT
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


        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =========================================================
       26 — OPEN AMBIENT
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


        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =========================================================
       27 — AMBIENT NAME
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
       28 — GRADIENT CARD
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


        card.dataset.ambient =
            item.id;


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
       29 — IMAGE CARD
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


        card.dataset.ambient =
            item.id;


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
       30 — LOCAL BACKGROUND CARD
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


        card.dataset.ambient =
            "local";


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
       31 — RENDER AMBIENT
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


        grid.replaceChildren();


        /* =====================================================
           GRADIENTS
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
           IMAGES
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
           LOCAL
           ===================================================== */

        grid.appendChild(
            createLocalCard()
        );

    }


    /* =========================================================
       32 — RESTORE AMBIENT
       ========================================================= */

    function restoreAmbient() {

        /* =====================================================
           LOCAL FILES CANNOT SURVIVE REFRESH
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
           GRADIENT
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
           IMAGE
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
           FALLBACK
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
       33 — LOCAL IMAGE / VIDEO
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
           REVOKE OLD URL
           ===================================================== */

        if (localBackgroundURL) {

            try {

                URL.revokeObjectURL(
                    localBackgroundURL
                );

            } catch (error) {}

        }


        /* =====================================================
           CREATE NEW URL
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
           VIDEO
           ===================================================== */

        if (
            file.type.startsWith(
                "video/"
            )
        ) {

            hideImage();

            hideGradient();


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
           IMAGE
           ===================================================== */

        else {

            stopVideo();

            hideGradient();


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
           CLOSE
           ===================================================== */

        closeAmbient();


        /* =====================================================
           RESET INPUT
           ===================================================== */

        if (event.target) {

            event.target.value =
                "";

        }


        renderAmbient();

    }


    /* =========================================================
       34 — THEME BUTTON EVENT DELEGATION
       =========================================================

       IMPORTANT:

       لا نستخدم:

           button.addEventListener(...)

       هنا.

       لأن Header ممكن يتغير.

       نستخدم document delegation.

       ========================================================= */

    function handleGlobalClick(event) {

        const target =
            event.target;


        if (!target) {

            return;

        }


        /* =====================================================
           THEME BUTTON
           ===================================================== */

        const themeButton =
            target.closest &&
            target.closest(
                "#themeBtn"
            );


        if (themeButton) {

            event.preventDefault();

            event.stopPropagation();


            toggleTheme();


            return;

        }


        /* =====================================================
           AMBIENT BUTTON

           Supported:

           #ambientOpen
           [data-open-ambient]
           .ambient-open
           ===================================================== */

        const ambientButton =
            target.closest &&
            target.closest(
                "#ambientOpen, [data-open-ambient], .ambient-open"
            );


        if (ambientButton) {

            event.preventDefault();

            event.stopPropagation();


            openAmbient();


            return;

        }


        /* =====================================================
           AMBIENT CLOSE BUTTONS
           ===================================================== */

        const closeButton =
            target.closest &&
            target.closest(
                "#ambientClose, #ambientCloseBtn, .ambient-close, .ambient-overlay-close, [data-close-ambient]"
            );


        if (closeButton) {

            event.preventDefault();

            event.stopPropagation();


            closeAmbient();


            return;

        }


        /* =====================================================
           CLICK ON OVERLAY BACKGROUND
           ===================================================== */

        const overlay =
            $("ambientOverlay");


        if (
            overlay &&
            target === overlay
        ) {

            closeAmbient();

        }

    }


    /* =========================================================
       35 — GLOBAL CLICK BINDING
       ========================================================= */

    function bindGlobalClicks() {

        document.addEventListener(
            "click",
            handleGlobalClick,
            true
        );

    }


    /* =========================================================
       36 — ESC KEY
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
       37 — FILE INPUT
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
       38 — PUBLIC API
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
       39 — INITIALIZATION
       ========================================================= */

    function initThemeSystem() {

        /* =====================================================
           THEME
           ===================================================== */

        applyTheme();


        /* =====================================================
           AMBIENT
           ===================================================== */

        restoreAmbient();


        /* =====================================================
           DRAW AMBIENT CARDS
           ===================================================== */

        renderAmbient();


        /* =====================================================
           GLOBAL BUTTON SYSTEM
           ===================================================== */

        bindGlobalClicks();


        /* =====================================================
           ESC
           ===================================================== */

        bindEscapeKey();


        /* =====================================================
           LOCAL FILE
           ===================================================== */

        bindLocalBackground();


        console.log(
            "RakkeZ Theme + Ambient initialized successfully."
        );

    }


    /* =========================================================
       40 — DOM READY
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
