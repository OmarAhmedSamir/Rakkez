(function () {

    "use strict";


    /* =====================================================
       RAKKEZ UPDATE SYSTEM
       =====================================================

       FUTURE UPDATES:
       You ONLY need to edit this section.

       Change:
       - version
       - badge
       - title
       - description
       - changes

    ===================================================== */


    const RAKKEZ_UPDATE = {

        version: "1.0.1",

        badge: "NEW",

        title: "What's New",

        description:
            "We've added some exciting new features to RakkeZ.",


        changes: [

            {
                title: "New Media Player",

                description:
                    "Enjoy focus music and ambient sounds while you work."
            },


            {
                title: "Ambient Effects",

                description:
                    "Play sounds like Rain and Airplane independently alongside your music."
            },


            {
                title: "New User Tutorial",

                description:
                    "New users can now quickly learn how RakkeZ works."
            }

        ]

    };


    /* =====================================================
       SETTINGS
    ===================================================== */

    const STORAGE_KEY = "rakkez_seen_update_version";


    /* =====================================================
       DOM
    ===================================================== */

    const modal =
        document.getElementById("updatesModal");

    const badge =
        document.getElementById("updatesBadge");

    const title =
        document.getElementById("updatesTitle");

    const description =
        document.getElementById("updatesDescription");

    const list =
        document.getElementById("updatesList");

    const doneButton =
        document.getElementById("updatesDone");

    const closeButton =
        document.getElementById("closeUpdates");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!modal || !list) {

        console.warn(
            "RakkeZ Updates: Updates modal was not found."
        );

        return;

    }


    /* =====================================================
       RENDER UPDATE
    ===================================================== */

    function renderUpdate() {

        if (badge) {

            badge.textContent =
                RAKKEZ_UPDATE.badge || "NEW";

        }


        if (title) {

            title.textContent =
                RAKKEZ_UPDATE.title || "What's New";

        }


        if (description) {

            description.textContent =
                RAKKEZ_UPDATE.description || "";

        }


        list.innerHTML = "";


        const changes =
            Array.isArray(RAKKEZ_UPDATE.changes)
                ? RAKKEZ_UPDATE.changes
                : [];


        changes.forEach(function (change) {

            const item =
                document.createElement("div");

            item.className =
                "update-item";


            const itemTitle =
                document.createElement("h3");

            itemTitle.textContent =
                change.title || "Update";


            const itemDescription =
                document.createElement("p");

            itemDescription.textContent =
                change.description || "";


            item.appendChild(itemTitle);

            item.appendChild(itemDescription);

            list.appendChild(item);

        });

    }


    /* =====================================================
       OPEN
    ===================================================== */

    function openUpdates() {

        renderUpdate();


        modal.classList.add("show");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow = "hidden";


        /*
         * Small accessibility improvement.
         */

        if (doneButton) {

            setTimeout(function () {

                doneButton.focus();

            }, 100);

        }

    }


    /* =====================================================
       CLOSE
    ===================================================== */

    function closeUpdates() {

        modal.classList.remove("show");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow = "";


        /*
         * Remember that this version
         * has already been seen.
         */

        localStorage.setItem(
            STORAGE_KEY,
            RAKKEZ_UPDATE.version
        );

    }


    /* =====================================================
       CHECK FOR NEW UPDATE
    ===================================================== */

    function checkForUpdate() {

        const seenVersion =
            localStorage.getItem(STORAGE_KEY);


        /*
         * Show only when the current version
         * has not been seen before.
         */

        if (
            seenVersion !==
            RAKKEZ_UPDATE.version
        ) {

            openUpdates();

        }

    }


    /* =====================================================
       BUTTONS
    ===================================================== */

    if (doneButton) {

        doneButton.addEventListener(
            "click",
            closeUpdates
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeUpdates
        );

    }


    /* =====================================================
       CLICK OUTSIDE
    ===================================================== */

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeUpdates();

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("show")
            ) {

                closeUpdates();

            }

        }
    );


    /* =====================================================
       START
    ===================================================== */

    /*
     * Wait until the page is ready so all
     * HTML elements are available.
     */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                setTimeout(
                    checkForUpdate,
                    700
                );

            },
            { once: true }
        );

    } else {

        setTimeout(
            checkForUpdate,
            700
        );

    }


    /* =====================================================
       OPTIONAL GLOBAL API
       ===================================================== */

    window.RakkeZUpdates = {

        open: openUpdates,

        close: closeUpdates,

        check: checkForUpdate,

        version:
            RAKKEZ_UPDATE.version

    };


})();
