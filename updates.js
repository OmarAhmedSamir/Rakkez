(function () {

    "use strict";


    /* =====================================================
       RAKKEZ UPDATE SYSTEM
       ===================================================== */

    const RAKKEZ_UPDATE = {

        version: "1.0.7",

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

    const STORAGE_KEY =
        "rakkez_seen_update_version";


    /* =====================================================
       VARIABLES
       ===================================================== */

    let modal = null;
    let badge = null;
    let title = null;
    let description = null;
    let list = null;
    let doneButton = null;
    let closeButton = null;


    /* =====================================================
       FIND DOM ELEMENTS
       ===================================================== */

    function findElements() {

        modal =
            document.getElementById("updatesModal");

        badge =
            document.getElementById("updatesBadge");

        title =
            document.getElementById("updatesTitle");

        description =
            document.getElementById("updatesDescription");

        list =
            document.getElementById("updatesList");

        doneButton =
            document.getElementById("updatesDone");

        closeButton =
            document.getElementById("closeUpdates");


        return !!modal && !!list;

    }


    /* =====================================================
       RENDER
       ===================================================== */

    function renderUpdate() {

        if (!findElements()) {

            console.warn(
                "RakkeZ Updates: Required HTML elements were not found."
            );

            return false;

        }


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


        return true;

    }


    /* =====================================================
       OPEN
       ===================================================== */

    function openUpdates() {

        if (!renderUpdate()) {

            console.warn(
                "RakkeZ Updates: Cannot open because updatesModal was not found."
            );

            return;

        }


        modal.classList.add("show");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
         * Fallback in case CSS does not correctly
         * handle the .show class.
         */

        modal.style.display = "flex";


        document.body.style.overflow = "hidden";


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

        if (!modal) {

            findElements();

        }


        if (!modal) {

            return;

        }


        modal.classList.remove("show");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        modal.style.display = "none";


        document.body.style.overflow = "";


        localStorage.setItem(
            STORAGE_KEY,
            RAKKEZ_UPDATE.version
        );

    }


    /* =====================================================
       CHECK FOR NEW UPDATE
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


        const seenVersion =
            localStorage.getItem(
                STORAGE_KEY
            );


        console.log(
            "RakkeZ Updates:",
            "Current:",
            RAKKEZ_UPDATE.version,
            "Seen:",
            seenVersion
        );


        if (
            seenVersion !==
            RAKKEZ_UPDATE.version
        ) {

            openUpdates();

        }

    }


    /* =====================================================
       EVENTS
       ===================================================== */

    function attachEvents() {

        if (!findElements()) {

            return;

        }


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

    }


    /* =====================================================
       ESCAPE
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
       START
       ===================================================== */

    function initialize() {

        attachEvents();


        setTimeout(
            checkForUpdate,
            500
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );

    } else {

        initialize();

    }


    /* =====================================================
       GLOBAL API
       ===================================================== */

    window.RakkeZUpdates = {

        open: openUpdates,

        close: closeUpdates,

        check: checkForUpdate,

        version:
            RAKKEZ_UPDATE.version

    };


})();
