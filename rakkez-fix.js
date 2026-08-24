/* =========================================================
   RAKKEZ - SAFE UI FIX
   This file works independently from the main RAKKEZ V2 JS.
========================================================= */

(function () {

    "use strict";

    /* =====================================================
       BLOG BUTTON
    ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        const blogButton =
            document.getElementById("blogOpen");

        if (blogButton) {

            blogButton.addEventListener("click", function () {

                window.location.href =
                    "rakkez-blog.html";

            });

        }


        /* =================================================
           LANGUAGE BUTTON
        ================================================= */

        const languageButton =
            document.getElementById("languageToggle");

        const languageLabel =
            document.getElementById("languageLabel");


        if (languageButton) {

            languageButton.addEventListener(
                "click",
                function () {

                    /*
                     * If your existing RAKKEZ language system
                     * already has a language function, use it.
                     */

                    if (
                        typeof window.toggleLanguage ===
                        "function"
                    ) {

                        window.toggleLanguage();

                        return;

                    }


                    if (
                        typeof window.changeLanguage ===
                        "function"
                    ) {

                        window.changeLanguage();

                        return;

                    }


                    /*
                     * Fallback
                     */

                    const currentLanguage =
                        localStorage.getItem(
                            "rakkez_language"
                        ) || "en";


                    const newLanguage =
                        currentLanguage === "en"
                            ? "ar"
                            : "en";


                    localStorage.setItem(
                        "rakkez_language",
                        newLanguage
                    );


                    if (languageLabel) {

                        languageLabel.textContent =
                            newLanguage === "ar"
                                ? "English"
                                : "العربية";

                    }


                    document.documentElement.lang =
                        newLanguage;


                    /*
                     * If there is an existing function
                     * called applyLanguage, use it.
                     */

                    if (
                        typeof window.applyLanguage ===
                        "function"
                    ) {

                        window.applyLanguage(
                            newLanguage
                        );

                    }

                }
            );

        }

    });

})();
