/* =========================================================
   RAKKEZ LANGUAGE FIX
========================================================= */

(function () {

    "use strict";

    const translations = {

        en: {
            languageButton: "العربية",
            dir: "ltr"
        },

        ar: {
            languageButton: "English",
            dir: "rtl"
        }

    };


    function getLanguage() {

        return (
            localStorage.getItem("rakkez_language")
            || "en"
        );

    }


    function applyLanguage(language) {

        language =
            language === "ar"
                ? "ar"
                : "en";


        document.documentElement.lang =
            language;

        document.documentElement.dir =
            translations[language].dir;


        const label =
            document.getElementById(
                "languageLabel"
            );


        if (label) {

            label.textContent =
                translations[language]
                    .languageButton;

        }


        /*
         * Tell the main RAKKEZ system
         * about the language if it exists.
         */

        if (
            typeof window.setLanguage ===
            "function"
        ) {

            window.setLanguage(language);

        }


        if (
            typeof window.applyLanguage ===
            "function"
        ) {

            window.applyLanguage(language);

        }


        localStorage.setItem(
            "rakkez_language",
            language
        );

    }


    function toggleLanguage() {

        const current =
            getLanguage();


        const next =
            current === "en"
                ? "ar"
                : "en";


        applyLanguage(next);

    }


    /*
     * Make functions globally available
     * in case your main JS uses them.
     */

    window.applyLanguage =
        applyLanguage;

    window.toggleLanguage =
        toggleLanguage;


    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const button =
                document.getElementById(
                    "languageToggle"
                );


            if (!button) return;


            /*
             * Remove old inline/event handlers
             * by cloning the button.
             */

            const newButton =
                button.cloneNode(true);


            button.parentNode.replaceChild(
                newButton,
                button
            );


            newButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    toggleLanguage();

                }
            );


            /*
             * Restore saved language.
             */

            applyLanguage(
                getLanguage()
            );

        }
    );

})();
