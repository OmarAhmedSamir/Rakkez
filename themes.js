/* =========================================================
   RAKKEZ THEME + AMBIENT SYSTEM
   FULL SEPARATED FILE

   File:
   theme.js

   Responsibilities:
   - Theme button
   - Dark / Light theme
   - Ambient button
   - Ambient backgrounds
   - Gradient themes
   - Image themes
   - Local image/video backgrounds
   - Ambient persistence

   IMPORTANT:
   Add future themes ONLY inside:
   - AMBIENT_GRADIENTS
   - AMBIENT_PRESETS

   This file does NOT control:
   - Timer
   - Stats
   - Tasks
   - Media Player
   - Alarm
   - Spotify
   - Google
   ========================================================= */

(function () {

    "use strict";

    /* =========================================================
       HELPERS
       ========================================================= */

    const $ = id => document.getElementById(id);


    /* =========================================================
       STORAGE
       ========================================================= */

    const STORAGE = {
        settings: "rakkez_settings",
        ambient: "rakkez_ambient"
    };


    /* =========================================================
       DEFAULT SETTINGS
       ========================================================= */

    const DEFAULT_SETTINGS = {
        theme: "dark"
    };


    /* =========================================================
       LOAD / SAVE
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
                "RakkeZ Theme load error:",
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
                "RakkeZ Theme save error:",
                error
            );
        }
    }


    /* =========================================================
       SETTINGS
       ========================================================= */

    let settings = {
        ...DEFAULT_SETTINGS,
        ...load(STORAGE.settings, {})
    };


    /* =========================================================
       AMBIENT STATE
       ========================================================= */

    let selectedAmbient =
        localStorage.getItem(STORAGE.ambient)
        || "gradient";


    /* =========================================================
       GRADIENT THEMES

       ADD NEW GRADIENTS HERE

       Example:

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

       That's it.
       No app.js editing required.
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
       IMAGE THEMES

       ADD NEW IMAGE THEMES HERE

       Example:

       {
           id: "tokyo",
           name: "Tokyo Night",
           url: "https://..."
       }

       No app.js editing required.
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
       LOCAL BACKGROUND
       ========================================================= */

    let localBackgroundURL = null;


    /* =========================================================
       THEME
       ========================================================= */

    function applyTheme() {

        const theme =
            settings.theme === "light"
                ? "light"
                : "dark";

        document.body.classList.toggle(
            "light",
            theme === "light"
        );

        document.documentElement.classList.toggle(
            "light",
            theme === "light"
        );

        document.body.dataset.theme =
            theme;

        document.documentElement.dataset.theme =
            theme;

        const themeButton =
            $("themeBtn");

        if (themeButton) {

            themeButton.textContent =
                theme === "light"
                    ? "☀"
                    : "☾";

        }

    }


    /* =========================================================
       TOGGLE THEME
       ========================================================= */

    function toggleTheme() {

        settings.theme =
            settings.theme === "light"
                ? "dark"
                : "light";

        applyTheme();

        save(
            STORAGE.settings,
            settings
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

        if (!gradient) {
            return;
        }

        gradient.style.display =
            "block";

        gradient.style.background =
            gradientValue;

        const image =
            $("customImage");

        if (image) {

            image.style.display =
                "none";

            image.removeAttribute(
                "src"
            );

        }

        const video =
            $("customVideo");

        if (video) {

            video.pause();

            video.style.display =
                "none";

            video.removeAttribute(
                "src"
            );

        }

    }


    /* =========================================================
       APPLY IMAGE
       ========================================================= */

    function applyAmbient(
        item
    ) {

        if (!item) {
            return;
        }

        const gradient =
            document.querySelector(
                ".bg-gradient"
            );

        if (gradient) {

            gradient.style.display =
                "none";

        }


        const video =
            $("customVideo");

        if (video) {

            video.pause();

            video.style.display =
                "none";

            video.removeAttribute(
                "src"
            );

        }


        const image =
            $("customImage");

        if (image) {

            image.style.display =
                "block";

            image.src =
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

            gradient.style.background =
                "";

        }


        const image =
            $("customImage");

        if (image) {

            image.style.display =
                "none";

            image.removeAttribute(
                "src"
            );

        }


        const video =
            $("customVideo");

        if (video) {

            try {
                video.pause();
            } catch {}

            video.style.display =
                "none";

            video.removeAttribute(
                "src"
            );

        }

    }


    /* =========================================================
       SAVE AMBIENT
       ========================================================= */

    function selectAmbient(
        id
    ) {

        selectedAmbient =
            id;

        localStorage.setItem(
            STORAGE.ambient,
            selectedAmbient
        );

    }


    /* =========================================================
       RENDER AMBIENT
       ========================================================= */

    function renderAmbient() {

        const grid =
            $("ambientGrid");

        if (!grid) {
            return;
        }

        grid.innerHTML =
            "";


        /* =====================================================
           GRADIENTS
           ===================================================== */

        AMBIENT_GRADIENTS.forEach(
            gradientItem => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "ambient-card"
                    +
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


                card.onclick =
                    () => {

                        selectAmbient(
                            gradientItem.id
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
           ===================================================== */

        AMBIENT_PRESETS.forEach(
            item => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "ambient-card"
                    +
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


                card.onclick =
                    () => {

                        selectAmbient(
                            item.id
                        );

                        applyAmbient(
                            item
                        );

                        renderAmbient();

                    };


                grid.appendChild(
                    card
                );

            }
        );


        /* =====================================================
           LOCAL BACKGROUND CARD
           ===================================================== */

        const localCard =
            document.createElement(
                "div"
            );

        localCard.className =
            "ambient-card"
            +
            (
                selectedAmbient ===
                "local"
                    ? " selected"
                    : ""
            );


        localCard.innerHTML = `

            <div
                style="
                    width:100%;
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background:
                        linear-gradient(
                            135deg,
                            #151515,
                            #050505
                        );
                    font-size:34px;
                "
            >
                +
            </div>

            <div class="ambient-name">
                Local Background
            </div>

        `;


        localCard.onclick =
            () => {

                const input =
                    $("bgFile");

                if (input) {
                    input.click();
                }

            };


        grid.appendChild(
            localCard
        );

    }


    /* =========================================================
       RESTORE SAVED AMBIENT
       ========================================================= */

    function restoreAmbient() {

        if (
            selectedAmbient ===
            "local"
        ) {

            /*
             * Browser Blob URLs do not
             * survive page refresh.
             *
             * Therefore local background
             * safely falls back to gradient.
             */

            selectedAmbient =
                "gradient";

            localStorage.setItem(
                STORAGE.ambient,
                "gradient"
            );

        }


        const gradient =
            AMBIENT_GRADIENTS.find(
                item =>
                    item.id ===
                    selectedAmbient
            );


        if (gradient) {

            resetBackground();

            applyGradient(
                gradient.background
            );

            return;

        }


        const image =
            AMBIENT_PRESETS.find(
                item =>
                    item.id ===
                    selectedAmbient
            );


        if (image) {

            applyAmbient(
                image
            );

            return;

        }


        selectedAmbient =
            "gradient";

        localStorage.setItem(
            STORAGE.ambient,
            "gradient"
        );


        const fallback =
            AMBIENT_GRADIENTS.find(
                item =>
                    item.id ===
                    "gradient"
            );


        resetBackground();

        if (fallback) {

            applyGradient(
                fallback.background
            );

        }

    }


    /* =========================================================
       LOCAL BACKGROUND UPLOAD
       ========================================================= */

    function handleLocalBackground(
        event
    ) {

        const file =
            event.target.files &&
            event.target.files[0];

        if (!file) {
            return;
        }


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


        const image =
            $("customImage");

        const video =
            $("customVideo");


        /* =====================================================
           VIDEO
           ===================================================== */

        if (
            file.type.startsWith(
                "video/"
            )
        ) {

            if (image) {

                image.style.display =
                    "none";

                image.removeAttribute(
                    "src"
                );

            }


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

                video.play()
                    .catch(
                        () => {}
                    );

            }

        }


        /* =====================================================
           IMAGE
           ===================================================== */

        else {

            if (video) {

                try {
                    video.pause();
                } catch {}

                video.style.display =
                    "none";

                video.removeAttribute(
                    "src"
                );

            }


            if (image) {

                image.style.display =
                    "block";

                image.src =
                    localBackgroundURL;

            }

        }


        const overlay =
            $("ambientOverlay");

        if (overlay) {

            overlay.classList.remove(
                "show"
            );

        }


        renderAmbient();

    }


    /* =========================================================
       AMBIENT BUTTON
       ========================================================= */

    function bindAmbientButton() {

        const button =
            $("ambientOpen");

        if (!button) {
            return;
        }


        button.onclick =
            () => {

                renderAmbient();

                const overlay =
                    $("ambientOverlay");

                if (overlay) {

                    overlay.classList.add(
                        "show"
                    );

                }

            };

    }


    /* =========================================================
       THEME BUTTON
       ========================================================= */

    function bindThemeButton() {

        const button =
            $("themeBtn");

        if (!button) {
            return;
        }


        button.onclick =
            toggleTheme;

    }


    /* =========================================================
       LOCAL FILE BUTTON
       ========================================================= */

    function bindLocalBackground() {

        const input =
            $("bgFile");

        if (!input) {
            return;
        }


        input.addEventListener(
            "change",
            handleLocalBackground
        );

    }


    /* =========================================================
       PUBLIC API

       Other files can safely use:

       window.rakkezTheme.applyTheme()
       window.rakkezTheme.toggleTheme()
       window.rakkezTheme.renderAmbient()
       window.rakkezTheme.restoreAmbient()
       window.rakkezTheme.applyGradient()
       window.rakkezTheme.applyAmbient()
       window.rakkezTheme.resetBackground()

       Future theme work stays here.
       ========================================================= */

    window.rakkezTheme = {

        applyTheme,

        toggleTheme,

        renderAmbient,

        restoreAmbient,

        applyGradient,

        applyAmbient,

        resetBackground,

        getSelectedAmbient:
            () => selectedAmbient,

        getGradients:
            () => AMBIENT_GRADIENTS.slice(),

        getPresets:
            () => AMBIENT_PRESETS.slice()

    };


    /* =========================================================
       INITIALIZE
       ========================================================= */

    function initThemeSystem() {

        applyTheme();

        renderAmbient();

        restoreAmbient();

        bindThemeButton();

        bindAmbientButton();

        bindLocalBackground();

    }


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
