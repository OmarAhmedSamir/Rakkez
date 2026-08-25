(function () {

    "use strict";


    /* =====================================================
       SAFE INITIALIZATION
    ===================================================== */

    function initRakkeZMedia() {

        /* =====================================================
           STORAGE
        ===================================================== */

        const STORAGE = {

            track:
                "rakkez_media_track",

            volume:
                "rakkez_media_volume",

            shuffle:
                "rakkez_media_shuffle",

            loop:
                "rakkez_media_loop",

            autoNext:
                "rakkez_media_auto_next",

            localTracks:
                "rakkez_local_music_names"

        };


        /* =====================================================
           BUILT-IN LOFI PLAYLIST

           IMPORTANT:
           All built-in media files are in ROOT.
           There is NO Music/ folder.
        ===================================================== */

        const PLAYLIST = [

            {
                title:
                    "بحب الله موسيقى مع بيز هادي",

                artist:
                    "Ahmed S",

                src:
                    "Guitar.mp3",

                artwork:
                    "SAM_2012.JPG",

                type:
                    "lofi"
            },

            {
                title:
                    "Late Night Study",

                artist:
                    "RakkeZ Lofi",

                src:
                    "late-night-study.mp3",

                artwork:
                    "late-night-study.jpg",

                type:
                    "lofi"
            },

            {
                title:
                    "Coffee Shop",

                artist:
                    "RakkeZ Lofi",

                src:
                    "coffee-shop.mp3",

                artwork:
                    "coffee-shop.jpg",

                type:
                    "lofi"
            },

            {
                title:
                    "Deep Focus",

                artist:
                    "RakkeZ Lofi",

                src:
                    "deep-focus.mp3",

                artwork:
                    "deep-focus.jpg",

                type:
                    "lofi"
            },

            {
                title:
                    "Midnight",

                artist:
                    "RakkeZ Lofi",

                src:
                    "midnight.mp3",

                artwork:
                    "midnight.jpg",

                type:
                    "lofi"
            }

        ];


        /* =====================================================
           LOCAL TRACKS
        ===================================================== */

        let LOCAL_TRACKS = [];

        let localObjectUrls = [];


        /* =====================================================
           COMBINED PLAYLIST
        ===================================================== */

        function getAllTracks() {

            return PLAYLIST.concat(
                LOCAL_TRACKS
            );

        }


        /* =====================================================
           ELEMENTS
        ===================================================== */

        const overlay =
            document.getElementById(
                "rakkezMediaOverlay"
            );


        const closeButton =
            document.getElementById(
                "rakkezMediaClose"
            );


        const mediaButton =
            document.getElementById(
                "mediaOpen"
            );


        const tabs =
            document.querySelectorAll(
                ".rakkez-media-tab"
            );


        const sources =
            document.querySelectorAll(
                ".rakkez-media-source"
            );


        const artwork =
            document.getElementById(
                "rakkezArtwork"
            );


        const trackName =
            document.getElementById(
                "rakkezTrackName"
            );


        const trackArtist =
            document.getElementById(
                "rakkezTrackArtist"
            );


        const playlistElement =
            document.getElementById(
                "rakkezPlaylist"
            );


        const playlistCount =
            document.getElementById(
                "rakkezPlaylistCount"
            );


        const playButton =
            document.getElementById(
                "rakkezPlay"
            );


        const previousButton =
            document.getElementById(
                "rakkezPrevious"
            );


        const nextButton =
            document.getElementById(
                "rakkezNext"
            );


        const shuffleButton =
            document.getElementById(
                "rakkezShuffle"
            );


        const loopButton =
            document.getElementById(
                "rakkezLoop"
            );


        const autoNextButton =
            document.getElementById(
                "rakkezAutoNext"
            );


        const progress =
            document.getElementById(
                "rakkezProgress"
            );


        const currentTimeElement =
            document.getElementById(
                "rakkezCurrentTime"
            );


        const durationElement =
            document.getElementById(
                "rakkezDuration"
            );


        const volume =
            document.getElementById(
                "rakkezVolume"
            );


        const volumeValue =
            document.getElementById(
                "rakkezVolumeValue"
            );


        const youtubeInput =
            document.getElementById(
                "rakkezYoutubeInput"
            );


        const youtubePlay =
            document.getElementById(
                "rakkezYoutubePlay"
            );


        const youtubeEmbed =
            document.getElementById(
                "rakkezYoutubeEmbed"
            );


        const spotifyInput =
            document.getElementById(
                "rakkezSpotifyInput"
            );


        const spotifyPlay =
            document.getElementById(
                "rakkezSpotifyPlay"
            );


        const spotifyEmbed =
            document.getElementById(
                "rakkezSpotifyEmbed"
            );


        const localFile =
            document.getElementById(
                "rakkezLocalFile"
            );


        const localAudio =
            document.getElementById(
                "rakkezLocalAudio"
            );


        const localList =
            document.getElementById(
                "rakkezLocalList"
            );


        /* =====================================================
           MINI PLAYER
        ===================================================== */

        const miniPlayer =
            document.getElementById(
                "rakkezMiniPlayer"
            );


        const miniArtwork =
            document.getElementById(
                "rakkezMiniArtwork"
            );


        const miniTitle =
            document.getElementById(
                "rakkezMiniTitle"
            );


        const miniArtist =
            document.getElementById(
                "rakkezMiniArtist"
            );


        const miniPlay =
            document.getElementById(
                "rakkezMiniPlay"
            );


        const miniNext =
            document.getElementById(
                "rakkezMiniNext"
            );


        const miniClose =
            document.getElementById(
                "rakkezMiniClose"
            );


        const miniProgress =
            document.getElementById(
                "rakkezMiniProgress"
            );


        /* =====================================================
           AUDIO ENGINE
        ===================================================== */

        const audio =
            new Audio();


        /*
         * IMPORTANT:
         * Do not immediately request media files when the page
         * loads. The audio will be loaded only when required.
         */

        audio.preload =
            "none";


        let storedTrack =
            parseInt(
                localStorage.getItem(
                    STORAGE.track
                ),
                10
            );


        let currentIndex =
            Number.isInteger(
                storedTrack
            )
                ? storedTrack
                : 0;


        let shuffle =
            localStorage.getItem(
                STORAGE.shuffle
            ) === "true";


        let loop =
            localStorage.getItem(
                STORAGE.loop
            ) === "true";


        let autoNext =
            localStorage.getItem(
                STORAGE.autoNext
            ) !== "false";


        let isDraggingProgress =
            false;


        let miniPlayerClosed =
            true;


        let currentIsLocal =
            false;


        let currentTrackLoaded =
            false;


        let isLoadingTrack =
            false;


        /* =====================================================
           AMBIENT EFFECTS ENGINE
        ===================================================== */

        const AMBIENT_EFFECTS = [

            {
                id:
                    "rain",

                name:
                    "Rain",

                icon:
                    "🌧️",

                src:
                    "rain.mp3",

                defaultVolume:
                    0.5
            },

            {
                id:
                    "airplane",

                name:
                    "Airplane",

                icon:
                    "✈️",

                src:
                    "Airplane.mp3",

                defaultVolume:
                    0.5
            }

        ];


        const STORAGE_PREFIX =
            "rakkez_effect_";


        const effectsContainer =
            document.getElementById(
                "rakkezEffectsContainer"
            );


        const effectPlayers = {};


        /*
         * Ambient effects are initialized safely.
         * A missing effect file must NEVER stop the main
         * Media Player from initializing.
         */

        AMBIENT_EFFECTS.forEach(
            function (effect) {

                try {

                    const effectAudio =
                        new Audio();


                    effectAudio.loop =
                        true;


                    effectAudio.preload =
                        "none";


                    let savedVolume =
                        parseFloat(
                            localStorage.getItem(
                                STORAGE_PREFIX +
                                effect.id +
                                "_volume"
                            )
                        );


                    if (
                        !Number.isFinite(
                            savedVolume
                        )
                    ) {

                        savedVolume =
                            effect.defaultVolume;

                    }


                    savedVolume =
                        Math.max(
                            0,
                            Math.min(
                                1,
                                savedVolume
                            )
                        );


                    effectAudio.volume =
                        savedVolume;


                    effectPlayers[
                        effect.id
                    ] = {

                        audio:
                            effectAudio,

                        volume:
                            savedVolume,

                        loaded:
                            false

                    };


                    effectAudio.addEventListener(
                        "error",
                        function () {

                            console.warn(
                                "RakkeZ: Ambient effect unavailable:",
                                effect.src
                            );

                        }
                    );

                } catch (error) {

                    console.warn(
                        "RakkeZ: Could not initialize effect:",
                        effect.id,
                        error
                    );

                }

            }
        );


        /* =====================================================
           RENDER EFFECTS
        ===================================================== */

        function renderEffects() {

            if (!effectsContainer) {
                return;
            }


            effectsContainer.innerHTML =
                "";


            AMBIENT_EFFECTS.forEach(
                function (effect) {

                    const player =
                        effectPlayers[
                            effect.id
                        ];


                    if (!player) {
                        return;
                    }


                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "rakkez-effect-card";


                    card.innerHTML = `

                        <div class="rakkez-effect-info">

                            <div class="rakkez-effect-icon">
                                ${effect.icon}
                            </div>

                            <div>

                                <div class="rakkez-effect-title">
                                    ${effect.name}
                                </div>

                                <div class="rakkez-effect-subtitle">
                                    Ambient sound
                                </div>

                            </div>

                        </div>

                        <button
                            class="rakkez-effect-toggle"
                            type="button"
                        >
                            Play ${effect.name}
                        </button>

                        <div class="rakkez-effect-volume">

                            <span>
                                Volume
                            </span>

                            <input
                                class="rakkez-effect-volume-input"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value="${player.audio.volume}"
                            >

                            <span
                                class="rakkez-effect-volume-value"
                            >
                                ${Math.round(
                                    player.audio.volume * 100
                                )}%
                            </span>

                        </div>

                    `;


                    const toggle =
                        card.querySelector(
                            ".rakkez-effect-toggle"
                        );


                    const volumeInput =
                        card.querySelector(
                            ".rakkez-effect-volume-input"
                        );


                    const volumeValue =
                        card.querySelector(
                            ".rakkez-effect-volume-value"
                        );


                    if (toggle) {

                        toggle.addEventListener(
                            "click",
                            function () {

                                if (
                                    player.audio.paused
                                ) {

                                    playEffect(
                                        effect.id
                                    );

                                } else {

                                    player.audio.pause();

                                }

                            }
                        );

                    }


                    if (volumeInput) {

                        volumeInput.addEventListener(
                            "input",
                            function () {

                                const value =
                                    parseFloat(
                                        volumeInput.value
                                    );


                                player.audio.volume =
                                    value;


                                player.volume =
                                    value;


                                localStorage.setItem(
                                    STORAGE_PREFIX +
                                    effect.id +
                                    "_volume",
                                    String(value)
                                );


                                if (volumeValue) {

                                    volumeValue.textContent =
                                        Math.round(
                                            value * 100
                                        ) +
                                        "%";

                                }

                            }
                        );

                    }


                    player.audio.addEventListener(
                        "play",
                        function () {

                            if (toggle) {

                                toggle.classList.add(
                                    "active"
                                );


                                toggle.textContent =
                                    "Ⅱ  " +
                                    effect.name;

                            }

                        }
                    );


                    player.audio.addEventListener(
                        "pause",
                        function () {

                            if (toggle) {

                                toggle.classList.remove(
                                    "active"
                                );


                                toggle.textContent =
                                    "Play " +
                                    effect.name;

                            }

                        }
                    );


                    effectsContainer.appendChild(
                        card
                    );

                }
            );

        }


        function playEffect(
            id
        ) {

            const player =
                effectPlayers[id];


            if (!player) {
                return;
            }


            try {

                if (
                    !player.loaded
                ) {

                    const effect =
                        AMBIENT_EFFECTS.find(
                            function (item) {

                                return (
                                    item.id ===
                                    id
                                );

                            }
                        );


                    if (effect) {

                        player.audio.src =
                            effect.src;

                        player.audio.load();

                        player.loaded =
                            true;

                    }

                }


                const promise =
                    player.audio.play();


                if (
                    promise &&
                    typeof promise.catch ===
                        "function"
                ) {

                    promise.catch(
                        function (error) {

                            console.warn(
                                "RakkeZ Effect:",
                                effectPlayers[id],
                                error
                            );

                        }
                    );

                }

            } catch (error) {

                console.warn(
                    "RakkeZ Effect Error:",
                    error
                );

            }

        }


        renderEffects();


        /* =====================================================
           PUBLIC AMBIENT API
        ===================================================== */

        window.rakkezAmbient = {

            play:
                function (id) {

                    playEffect(
                        id
                    );

                },


            stop:
                function (id) {

                    const player =
                        effectPlayers[id];


                    if (!player) {
                        return;
                    }


                    player.audio.pause();

                },


            toggle:
                function (id) {

                    const player =
                        effectPlayers[id];


                    if (!player) {
                        return;
                    }


                    if (
                        player.audio.paused
                    ) {

                        playEffect(
                            id
                        );

                    } else {

                        player.audio.pause();

                    }

                },


            getEffects:
                function () {

                    return AMBIENT_EFFECTS;

                }

        };


        /* =====================================================
           VALIDATE TRACK INDEX
        ===================================================== */

        function normalizeIndex() {

            const allTracks =
                getAllTracks();


            if (
                !Number.isInteger(
                    currentIndex
                ) ||
                currentIndex < 0 ||
                currentIndex >= allTracks.length
            ) {

                currentIndex =
                    0;

            }

        }


        normalizeIndex();


        /* =====================================================
           VOLUME
        ===================================================== */

        let savedVolume =
            parseFloat(
                localStorage.getItem(
                    STORAGE.volume
                )
            );


        if (
            !Number.isFinite(
                savedVolume
            )
        ) {

            savedVolume =
                0.7;

        }


        savedVolume =
            Math.max(
                0,
                Math.min(
                    1,
                    savedVolume
                )
            );


        audio.volume =
            savedVolume;


        if (volume) {

            volume.value =
                savedVolume;

        }


        function updateVolumeUI() {

            if (!volumeValue) {
                return;
            }


            volumeValue.textContent =
                Math.round(
                    audio.volume * 100
                ) +
                "%";

        }


        updateVolumeUI();


        /* =====================================================
           OPEN MEDIA
        ===================================================== */

        function openMedia() {

            if (!overlay) {
                return;
            }


            overlay.classList.add(
                "show"
            );


            overlay.setAttribute(
                "aria-hidden",
                "false"
            );


            miniPlayerClosed =
                false;


            hideMiniPlayer();


            document.body.style.overflow =
                "hidden";


            /*
             * Load current track only when Media is opened.
             */

            if (
                !currentTrackLoaded
            ) {

                loadTrack(
                    currentIndex,
                    false
                );

            }

        }


        /* =====================================================
           CLOSE MEDIA
        ===================================================== */

        function closeMedia() {

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


            document.body.style.overflow =
                "";


            if (
                !audio.paused &&
                !audio.ended
            ) {

                miniPlayerClosed =
                    false;


                showMiniPlayer();

            }

        }


        /* =====================================================
           MINI PLAYER
        ===================================================== */

        function showMiniPlayer() {

            if (!miniPlayer) {
                return;
            }


            if (
                !audio.src ||
                audio.paused
            ) {

                return;

            }


            miniPlayer.classList.add(
                "show"
            );


            miniPlayer.setAttribute(
                "aria-hidden",
                "false"
            );


            updateMiniPlayer();

        }


        function hideMiniPlayer() {

            if (!miniPlayer) {
                return;
            }


            miniPlayer.classList.remove(
                "show"
            );


            miniPlayer.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        function updateMiniPlayer() {

            if (!miniPlayer) {
                return;
            }


            if (miniTitle) {

                miniTitle.textContent =
                    trackName
                        ? trackName.textContent
                        : "";

            }


            if (miniArtist) {

                miniArtist.textContent =
                    trackArtist
                        ? trackArtist.textContent
                        : "";

            }


            if (
                artwork &&
                artwork.style.backgroundImage &&
                artwork.style.backgroundImage !==
                    "none"
            ) {

                if (miniArtwork) {

                    miniArtwork.style.backgroundImage =
                        artwork.style.backgroundImage;


                    miniArtwork.style.backgroundSize =
                        "cover";


                    miniArtwork.style.backgroundPosition =
                        "center";


                    miniArtwork.textContent =
                        "";

                }

            } else {

                if (miniArtwork) {

                    miniArtwork.style.backgroundImage =
                        "";


                    miniArtwork.textContent =
                        "♪";

                }

            }


            if (miniPlay) {

                miniPlay.textContent =
                    audio.paused
                        ? "▶"
                        : "Ⅱ";

            }

        }


        if (miniPlay) {

            miniPlay.addEventListener(
                "click",
                function () {

                    if (
                        audio.paused
                    ) {

                        playAudio();

                    } else {

                        pauseAudio();

                    }

                }
            );

        }


        if (miniNext) {

            miniNext.addEventListener(
                "click",
                function () {

                    nextTrack(
                        true
                    );

                }
            );

        }


        if (miniClose) {

            miniClose.addEventListener(
                "click",
                function () {

                    miniPlayerClosed =
                        true;


                    hideMiniPlayer();

                }
            );

        }


        if (mediaButton) {

            mediaButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopImmediatePropagation();

                    openMedia();

                },
                true
            );

        }


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeMedia
            );

        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        overlay
                    ) {

                        closeMedia();

                    }

                }
            );

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    overlay &&
                    overlay.classList.contains(
                        "show"
                    )
                ) {

                    closeMedia();

                }

            }
        );


        /* =====================================================
           TABS
        ===================================================== */

        tabs.forEach(
            function (tab) {

                tab.addEventListener(
                    "click",
                    function () {

                        const source =
                            tab.dataset
                                .rakkezSource;


                        tabs.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        sources.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        tab.classList.add(
                            "active"
                        );


                        const target =
                            document.getElementById(
                                "rakkez" +
                                source
                                    .charAt(0)
                                    .toUpperCase() +
                                source.slice(1) +
                                "Source"
                            );


                        if (target) {

                            target.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }
        );


        /* =====================================================
           FORMAT TIME
        ===================================================== */

        function formatTime(
            seconds
        ) {

            if (
                !Number.isFinite(
                    seconds
                ) ||
                seconds < 0
            ) {

                return "0:00";

            }


            const minutes =
                Math.floor(
                    seconds / 60
                );


            const remaining =
                Math.floor(
                    seconds % 60
                );


            return (
                minutes +
                ":" +
                String(
                    remaining
                ).padStart(
                    2,
                    "0"
                )
            );

        }


        /* =====================================================
           LOAD TRACK
        ===================================================== */

        function loadTrack(
            index,
            shouldPlay
        ) {

            const allTracks =
                getAllTracks();


            if (!allTracks.length) {
                return;
            }


            if (
                index < 0
            ) {

                index =
                    allTracks.length - 1;

            }


            if (
                index >= allTracks.length
            ) {

                index =
                    0;

            }


            currentIndex =
                index;


            const track =
                allTracks[
                    currentIndex
                ];


            if (!track) {
                return;
            }


            currentIsLocal =
                track.type === "local";


            isLoadingTrack =
                true;


            audio.pause();


            /*
             * Revoke the previous local source only through
             * the stored URL list on unload.
             *
             * Never revoke it here because the playlist still
             * needs it.
             */


            audio.src =
                track.src;


            audio.preload =
                "metadata";


            audio.load();


            currentTrackLoaded =
                true;


            isLoadingTrack =
                false;


            if (trackName) {

                trackName.textContent =
                    track.title;

            }


            if (trackArtist) {

                trackArtist.textContent =
                    track.artist;

            }


            localStorage.setItem(
                STORAGE.track,
                String(
                    currentIndex
                )
            );


            if (
                track.artwork &&
                artwork
            ) {

                artwork.style.backgroundImage =
                    "url('" +
                    track.artwork +
                    "')";


                artwork.style.backgroundSize =
                    "cover";


                artwork.style.backgroundPosition =
                    "center";


                const icon =
                    artwork.querySelector(
                        ".rakkez-artwork-icon"
                    );


                if (icon) {

                    icon.style.opacity =
                        "0";

                }

            } else if (artwork) {

                artwork.style.backgroundImage =
                    "";


                const icon =
                    artwork.querySelector(
                        ".rakkez-artwork-icon"
                    );


                if (icon) {

                    icon.style.opacity =
                        "1";

                }

            }


            if (progress) {

                progress.value =
                    0;

            }


            if (currentTimeElement) {

                currentTimeElement.textContent =
                    "0:00";

            }


            if (durationElement) {

                durationElement.textContent =
                    "0:00";

            }


            renderPlaylist();

            renderLocalList();

            updateMiniPlayer();


            if (shouldPlay) {

                playAudio();

            }

        }


        /* =====================================================
           PLAY
        ===================================================== */

        function playAudio() {

            /*
             * If the current track has not been loaded yet,
             * load it first.
             */

            if (
                !currentTrackLoaded ||
                !audio.src
            ) {

                loadTrack(
                    currentIndex,
                    false
                );

            }


            if (
                localAudio &&
                localAudio.src
            ) {

                try {

                    localAudio.pause();

                } catch (error) {}

            }


            try {

                const promise =
                    audio.play();


                if (
                    promise &&
                    typeof promise.catch ===
                        "function"
                ) {

                    promise.catch(
                        function (error) {

                            console.warn(
                                "RakkeZ Media: Playback could not start.",
                                error
                            );

                        }
                    );

                }

            } catch (error) {

                console.warn(
                    "RakkeZ Media: Playback error.",
                    error
                );

            }

        }


        /* =====================================================
           PAUSE
        ===================================================== */

        function pauseAudio() {

            try {

                audio.pause();

            } catch (error) {

                console.warn(
                    "RakkeZ Media: Pause error.",
                    error
                );

            }

        }


        /* =====================================================
           PLAY BUTTON
        ===================================================== */

        if (playButton) {

            playButton.addEventListener(
                "click",
                function () {

                    if (
                        audio.paused
                    ) {

                        playAudio();

                    } else {

                        pauseAudio();

                    }

                }
            );

        }


        /* =====================================================
           AUDIO PLAY
        ===================================================== */

        audio.addEventListener(
            "play",
            function () {

                if (playButton) {

                    playButton.textContent =
                        "Ⅱ";


                    playButton.title =
                        "Pause";

                }


                if (artwork) {

                    artwork.classList.add(
                        "playing"
                    );

                }


                updateMiniPlayer();


                if (
                    overlay &&
                    !overlay.classList.contains(
                        "show"
                    ) &&
                    !miniPlayerClosed
                ) {

                    showMiniPlayer();

                }

            }
        );


        /* =====================================================
           AUDIO PAUSE
        ===================================================== */

        audio.addEventListener(
            "pause",
            function () {

                if (playButton) {

                    playButton.textContent =
                        "▶";


                    playButton.title =
                        "Play";

                }


                if (artwork) {

                    artwork.classList.remove(
                        "playing"
                    );

                }


                updateMiniPlayer();

            }
        );


        /* =====================================================
           METADATA
        ===================================================== */

        audio.addEventListener(
            "loadedmetadata",
            function () {

                if (
                    durationElement &&
                    Number.isFinite(
                        audio.duration
                    )
                ) {

                    durationElement.textContent =
                        formatTime(
                            audio.duration
                        );

                }

            }
        );


        /* =====================================================
           TIME UPDATE
        ===================================================== */

        audio.addEventListener(
            "timeupdate",
            function () {

                if (
                    progress &&
                    !isDraggingProgress &&
                    Number.isFinite(
                        audio.duration
                    ) &&
                    audio.duration > 0
                ) {

                    progress.value =
                        (
                            audio.currentTime /
                            audio.duration
                        ) *
                        100;

                }


                if (currentTimeElement) {

                    currentTimeElement.textContent =
                        formatTime(
                            audio.currentTime
                        );

                }


                if (
                    miniProgress &&
                    Number.isFinite(
                        audio.duration
                    ) &&
                    audio.duration > 0
                ) {

                    miniProgress.style.width =
                        (
                            audio.currentTime /
                            audio.duration
                        ) *
                        100 +
                        "%";

                }

            }
        );


        /* =====================================================
           ENDED
        ===================================================== */

        audio.addEventListener(
            "ended",
            function () {

                if (loop) {

                    audio.currentTime =
                        0;


                    playAudio();


                    return;

                }


                if (autoNext) {

                    nextTrack(
                        true
                    );

                } else {

                    updateMiniPlayer();

                }

            }
        );


        /* =====================================================
           ERROR
        ===================================================== */

        audio.addEventListener(
            "error",
            function () {

                currentTrackLoaded =
                    false;


                isLoadingTrack =
                    false;


                const error =
                    audio.error;


                console.warn(
                    "RakkeZ Media: Unable to load track:",
                    audio.src,
                    error
                );


                /*
                 * Do NOT throw the error.
                 * A missing MP3 must not break the entire website.
                 */

                if (durationElement) {

                    durationElement.textContent =
                        "0:00";

                }

            }
        );


        /* =====================================================
           PROGRESS
        ===================================================== */

        if (progress) {

            progress.addEventListener(
                "input",
                function () {

                    isDraggingProgress =
                        true;


                    if (
                        Number.isFinite(
                            audio.duration
                        )
                    ) {

                        const newTime =
                            (
                                parseFloat(
                                    progress.value
                                ) /
                                100
                            ) *
                            audio.duration;


                        if (currentTimeElement) {

                            currentTimeElement.textContent =
                                formatTime(
                                    newTime
                                );

                        }

                    }

                }
            );


            progress.addEventListener(
                "change",
                function () {

                    if (
                        Number.isFinite(
                            audio.duration
                        )
                    ) {

                        audio.currentTime =
                            (
                                parseFloat(
                                    progress.value
                                ) /
                                100
                            ) *
                            audio.duration;

                    }


                    isDraggingProgress =
                        false;

                }
            );


            progress.addEventListener(
                "pointerup",
                function () {

                    isDraggingProgress =
                        false;

                }
            );

        }


        /* =====================================================
           NEXT
        ===================================================== */

        function nextTrack(
            shouldPlay
        ) {

            const allTracks =
                getAllTracks();


            if (!allTracks.length) {
                return;
            }


            let nextIndex;


            if (shuffle) {

                if (
                    allTracks.length <= 1
                ) {

                    nextIndex =
                        currentIndex;

                } else {

                    do {

                        nextIndex =
                            Math.floor(
                                Math.random() *
                                allTracks.length
                            );

                    } while (
                        nextIndex ===
                        currentIndex
                    );

                }

            } else {

                nextIndex =
                    currentIndex + 1;


                if (
                    nextIndex >=
                    allTracks.length
                ) {

                    nextIndex =
                        0;

                }

            }


            loadTrack(
                nextIndex,
                shouldPlay
            );

        }


        /* =====================================================
           PREVIOUS
        ===================================================== */

        function previousTrack() {

            if (
                audio.currentTime > 3
            ) {

                audio.currentTime =
                    0;


                return;

            }


            const allTracks =
                getAllTracks();


            if (!allTracks.length) {
                return;
            }


            let previousIndex =
                currentIndex - 1;


            if (
                previousIndex < 0
            ) {

                previousIndex =
                    allTracks.length - 1;

            }


            loadTrack(
                previousIndex,
                true
            );

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    nextTrack(
                        true
                    );

                }
            );

        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                previousTrack
            );

        }


        /* =====================================================
           SHUFFLE
        ===================================================== */

        if (shuffleButton) {

            shuffleButton.addEventListener(
                "click",
                function () {

                    shuffle =
                        !shuffle;


                    localStorage.setItem(
                        STORAGE.shuffle,
                        String(
                            shuffle
                        )
                    );


                    shuffleButton.classList.toggle(
                        "active",
                        shuffle
                    );

                }
            );


            shuffleButton.classList.toggle(
                "active",
                shuffle
            );

        }


        /* =====================================================
           LOOP
        ===================================================== */

        if (loopButton) {

            loopButton.addEventListener(
                "click",
                function () {

                    loop =
                        !loop;


                    localStorage.setItem(
                        STORAGE.loop,
                        String(
                            loop
                        )
                    );


                    loopButton.classList.toggle(
                        "active",
                        loop
                    );

                }
            );


            loopButton.classList.toggle(
                "active",
                loop
            );

        }


        /* =====================================================
           AUTO NEXT
        ===================================================== */

        if (autoNextButton) {

            autoNextButton.addEventListener(
                "click",
                function () {

                    autoNext =
                        !autoNext;


                    localStorage.setItem(
                        STORAGE.autoNext,
                        String(
                            autoNext
                        )
                    );


                    autoNextButton.classList.toggle(
                        "active",
                        autoNext
                    );

                }
            );


            autoNextButton.classList.toggle(
                "active",
                autoNext
            );

        }


        /* =====================================================
           VOLUME
        ===================================================== */

        if (volume) {

            volume.addEventListener(
                "input",
                function () {

                    const value =
                        parseFloat(
                            volume.value
                        );


                    audio.volume =
                        value;


                    localStorage.setItem(
                        STORAGE.volume,
                        String(
                            value
                        )
                    );


                    updateVolumeUI();

                }
            );

        }


        /* =====================================================
           PLAYLIST RENDER
        ===================================================== */

        function renderPlaylist() {

            if (!playlistElement) {
                return;
            }


            const allTracks =
                getAllTracks();


            playlistElement.innerHTML =
                "";


            if (playlistCount) {

                playlistCount.textContent =
                    allTracks.length +
                    (
                        allTracks.length === 1
                            ? " track"
                            : " tracks"
                    );

            }


            allTracks.forEach(
                function (
                    track,
                    index
                ) {

                    const item =
                        document.createElement(
                            "button"
                        );


                    item.type =
                        "button";


                    item.className =
                        "rakkez-track";


                    if (
                        index ===
                        currentIndex
                    ) {

                        item.classList.add(
                            "active"
                        );

                    }


                    const art =
                        document.createElement(
                            "div"
                        );


                    art.className =
                        "rakkez-track-art";


                    if (
                        track.artwork
                    ) {

                        art.style.backgroundImage =
                            "url('" +
                            track.artwork +
                            "')";


                        art.style.backgroundSize =
                            "cover";


                        art.style.backgroundPosition =
                            "center";


                        art.textContent =
                            "";

                    } else {

                        art.textContent =
                            "♪";

                    }


                    const details =
                        document.createElement(
                            "div"
                        );


                    details.className =
                        "rakkez-track-details";


                    const title =
                        document.createElement(
                            "div"
                        );


                    title.className =
                        "rakkez-track-title";


                    title.textContent =
                        track.title;


                    const source =
                        document.createElement(
                            "div"
                        );


                    source.className =
                        "rakkez-track-source";


                    source.textContent =
                        track.artist;


                    details.appendChild(
                        title
                    );


                    details.appendChild(
                        source
                    );


                    const type =
                        document.createElement(
                            "div"
                        );


                    type.className =
                        "rakkez-track-duration";


                    type.textContent =
                        track.type === "local"
                            ? "Local"
                            : "Lofi";


                    item.appendChild(
                        art
                    );


                    item.appendChild(
                        details
                    );


                    item.appendChild(
                        type
                    );


                    item.addEventListener(
                        "click",
                        function () {

                            loadTrack(
                                index,
                                true
                            );

                        }
                    );


                    playlistElement.appendChild(
                        item
                    );

                }
            );

        }


        /* =====================================================
           LOCAL MULTIPLE FILE UPLOAD
        ===================================================== */

        function addLocalFiles(
            files
        ) {

            if (
                !files ||
                !files.length
            ) {

                return;

            }


            const incomingFiles =
                Array.from(
                    files
                ).filter(
                    function (file) {

                        return (
                            file &&
                            file.type &&
                            file.type.startsWith(
                                "audio/"
                            )
                        );

                    }
                );


            if (!incomingFiles.length) {
                return;
            }


            const firstNewIndex =
                PLAYLIST.length +
                LOCAL_TRACKS.length;


            incomingFiles.forEach(
                function (file) {

                    const url =
                        URL.createObjectURL(
                            file
                        );


                    localObjectUrls.push(
                        url
                    );


                    LOCAL_TRACKS.push({

                        title:
                            file.name.replace(
                                /\.[^/.]+$/,
                                ""
                            ),

                        artist:
                            "Local Music",

                        src:
                            url,

                        artwork:
                            "",

                        type:
                            "local",

                        file:
                            file

                    });

                }
            );


            normalizeIndex();


            renderPlaylist();

            renderLocalList();


            activateSource(
                "local"
            );


            /*
             * Play the first newly added track.
             */

            loadTrack(
                firstNewIndex,
                true
            );

        }


        if (localFile) {

            localFile.addEventListener(
                "change",
                function () {

                    addLocalFiles(
                        localFile.files
                    );


                    localFile.value =
                        "";

                }
            );

        }


        /* =====================================================
           LOCAL LIST
        ===================================================== */

        function renderLocalList() {

            if (!localList) {
                return;
            }


            localList.innerHTML =
                "";


            LOCAL_TRACKS.forEach(
                function (
                    track,
                    localIndex
                ) {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.className =
                        "rakkez-local-track";


                    const globalIndex =
                        PLAYLIST.length +
                        localIndex;


                    if (
                        globalIndex ===
                        currentIndex
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }


                    const icon =
                        document.createElement(
                            "div"
                        );


                    icon.className =
                        "rakkez-local-track-icon";


                    icon.textContent =
                        "♪";


                    const info =
                        document.createElement(
                            "div"
                        );


                    info.className =
                        "rakkez-local-track-info";


                    const name =
                        document.createElement(
                            "div"
                        );


                    name.className =
                        "rakkez-local-track-name";


                    name.textContent =
                        track.title;


                    const meta =
                        document.createElement(
                            "div"
                        );


                    meta.className =
                        "rakkez-local-track-meta";


                    meta.textContent =
                        "Local Music";


                    info.appendChild(
                        name
                    );


                    info.appendChild(
                        meta
                    );


                    button.appendChild(
                        icon
                    );


                    button.appendChild(
                        info
                    );


                    button.addEventListener(
                        "click",
                        function () {

                            loadTrack(
                                globalIndex,
                                true
                            );

                        }
                    );


                    localList.appendChild(
                        button
                    );

                }
            );

        }


        /* =====================================================
           ACTIVATE SOURCE
        ===================================================== */

        function activateSource(
            sourceName
        ) {

            tabs.forEach(
                function (tab) {

                    tab.classList.toggle(
                        "active",
                        tab.dataset
                            .rakkezSource ===
                        sourceName
                    );

                }
            );


            sources.forEach(
                function (source) {

                    source.classList.remove(
                        "active"
                    );

                }
            );


            const target =
                document.getElementById(
                    "rakkez" +
                    sourceName
                        .charAt(0)
                        .toUpperCase() +
                    sourceName.slice(1) +
                    "Source"
                );


            if (target) {

                target.classList.add(
                    "active"
                );

            }

        }


        /* =====================================================
           YOUTUBE
        ===================================================== */

        function getYouTubeId(
            value
        ) {

            if (!value) {
                return null;
            }


            const text =
                value.trim();


            const patterns = [

                /youtube\.com\/watch\?v=([^&]+)/i,

                /youtu\.be\/([^?&]+)/i,

                /youtube\.com\/embed\/([^?&]+)/i,

                /youtube\.com\/shorts\/([^?&]+)/i

            ];


            for (
                let i = 0;
                i < patterns.length;
                i++
            ) {

                const match =
                    text.match(
                        patterns[i]
                    );


                if (
                    match &&
                    match[1]
                ) {

                    return match[1];

                }

            }


            return null;

        }


        if (youtubePlay) {

            youtubePlay.addEventListener(
                "click",
                function () {

                    const id =
                        getYouTubeId(
                            youtubeInput
                                ? youtubeInput.value
                                : ""
                        );


                    if (!id) {

                        if (youtubeEmbed) {

                            youtubeEmbed.innerHTML = `

                                <div
                                    style="
                                        padding:20px;
                                        color:rgba(255,255,255,.55);
                                        font-size:12px;
                                    "
                                >
                                    Please enter a valid YouTube URL.
                                </div>

                            `;

                        }

                        return;

                    }


                    if (youtubeEmbed) {

                        youtubeEmbed.innerHTML = `

                            <iframe
                                src="https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1"
                                title="YouTube Player"
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowfullscreen
                            ></iframe>

                        `;

                    }

                }
            );

        }


        /* =====================================================
           SPOTIFY
        ===================================================== */

        function getSpotifyEmbedUrl(
            value
        ) {

            if (!value) {
                return null;
            }


            const text =
                value.trim();


            const match =
                text.match(
                    /spotify\.com\/(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]+)/
                );


            if (!match) {
                return null;
            }


            return (
                "https://open.spotify.com/embed/" +
                match[1] +
                "/" +
                match[2] +
                "?utm_source=generator"
            );

        }


        if (spotifyPlay) {

            spotifyPlay.addEventListener(
                "click",
                function () {

                    const embedUrl =
                        getSpotifyEmbedUrl(
                            spotifyInput
                                ? spotifyInput.value
                                : ""
                        );


                    if (!embedUrl) {

                        if (spotifyEmbed) {

                            spotifyEmbed.innerHTML = `

                                <div
                                    style="
                                        padding:20px;
                                        color:rgba(255,255,255,.55);
                                        font-size:12px;
                                    "
                                >
                                    Please enter a valid Spotify URL.
                                </div>

                            `;

                        }

                        return;

                    }


                    if (spotifyEmbed) {

                        spotifyEmbed.innerHTML = `

                            <iframe
                                src="${embedUrl}"
                                title="Spotify Player"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>

                        `;

                    }

                }
            );

        }


        /* =====================================================
           LANGUAGE SYSTEM
        ===================================================== */

        const MEDIA_TRANSLATIONS = {

            en: {

                effects:
                    "Effects",

                effectsDescription:
                    "Add ambient sounds while you focus.",

                rain:
                    "Rain",

                rainDescription:
                    "Soft rain for deeper focus.",

                eyebrow:
                    "RAKKEZ MEDIA",

                focusMusic:
                    "Focus Music",

                lofi:
                    "Lofi",

                youtube:
                    "YouTube",

                spotify:
                    "Spotify",

                local:
                    "Local",

                playlist:
                    "Playlist",

                autoNext:
                    "AUTO-NEXT",

                youtubeDescription:
                    "Paste a YouTube video URL and play it inside RakkeZ.",

                spotifyDescription:
                    "Paste a Spotify track, album or playlist URL.",

                localMusic:
                    "Local Music",

                localDescription:
                    "Choose multiple music files from your device.",

                chooseMusic:
                    "Choose Music",

                play:
                    "Play",

                previous:
                    "Previous",

                next:
                    "Next",

                shuffle:
                    "Shuffle",

                loop:
                    "Loop",

                close:
                    "Close",

                open:
                    "Open",

                youtubePlaceholder:
                    "Paste YouTube URL...",

                spotifyPlaceholder:
                    "Paste Spotify URL..."

            },


            ar: {

                eyebrow:
                    "وسائط ركز",

                effects:
                    "المؤثرات",

                effectsDescription:
                    "أضف أصواتًا هادئة أثناء التركيز.",

                rain:
                    "المطر",

                rainDescription:
                    "صوت مطر هادئ لتركيز أعمق.",

                focusMusic:
                    "موسيقى التركيز",

                lofi:
                    "لوفاي",

                youtube:
                    "يوتيوب",

                spotify:
                    "سبوتيفاي",

                local:
                    "محلي",

                playlist:
                    "قائمة التشغيل",

                autoNext:
                    "التالي تلقائيًا",

                youtubeDescription:
                    "الصق رابط فيديو من يوتيوب وشغّله داخل ركز.",

                spotifyDescription:
                    "الصق رابط أغنية أو ألبوم أو قائمة تشغيل من سبوتيفاي.",

                localMusic:
                    "الموسيقى المحلية",

                localDescription:
                    "اختر أكثر من ملف موسيقى من جهازك.",

                chooseMusic:
                    "اختيار الموسيقى",

                play:
                    "تشغيل",

                previous:
                    "السابق",

                next:
                    "التالي",

                shuffle:
                    "تشغيل عشوائي",

                loop:
                    "تكرار",

                close:
                    "إغلاق",

                open:
                    "فتح",

                youtubePlaceholder:
                    "الصق رابط يوتيوب...",

                spotifyPlaceholder:
                    "الصق رابط سبوتيفاي..."

            }

        };


        function detectLanguage() {

            const htmlLang =
                document.documentElement
                    .getAttribute(
                        "lang"
                    );


            if (
                htmlLang &&
                htmlLang.toLowerCase()
                    .startsWith("ar")
            ) {

                return "ar";

            }


            if (
                htmlLang &&
                htmlLang.toLowerCase()
                    .startsWith("en")
            ) {

                return "en";

            }


            const possibleKeys = [

                "language",

                "lang",

                "rakkez_language",

                "rakkez_lang",

                "selectedLanguage",

                "siteLanguage"

            ];


            for (
                let i = 0;
                i < possibleKeys.length;
                i++
            ) {

                try {

                    const value =
                        localStorage.getItem(
                            possibleKeys[i]
                        );


                    if (!value) {
                        continue;
                    }


                    const normalized =
                        value.toLowerCase();


                    if (
                        normalized.startsWith("ar") ||
                        value === "Arabic"
                    ) {

                        return "ar";

                    }


                    if (
                        normalized.startsWith("en") ||
                        value === "English"
                    ) {

                        return "en";

                    }

                } catch (error) {

                    console.warn(
                        "RakkeZ: Language storage error.",
                        error
                    );

                }

            }


            return "en";

        }


        function applyMediaLanguage() {

            const language =
                detectLanguage();


            const dictionary =
                MEDIA_TRANSLATIONS[
                    language
                ] ||
                MEDIA_TRANSLATIONS.en;


            document
                .querySelectorAll(
                    "[data-media-i18n]"
                )
                .forEach(
                    function (element) {

                        const key =
                            element.dataset
                                .mediaI18n;


                        if (
                            dictionary[key] !==
                            undefined
                        ) {

                            element.textContent =
                                dictionary[key];

                        }

                    }
                );


            document
                .querySelectorAll(
                    "[data-media-i18n-title]"
                )
                .forEach(
                    function (element) {

                        const key =
                            element.dataset
                                .mediaI18nTitle;


                        if (
                            dictionary[key] !==
                            undefined
                        ) {

                            element.setAttribute(
                                "title",
                                dictionary[key]
                            );

                        }

                    }
                );


            document
                .querySelectorAll(
                    "[data-media-i18n-placeholder]"
                )
                .forEach(
                    function (element) {

                        const key =
                            element.dataset
                                .mediaI18nPlaceholder;


                        if (
                            dictionary[key] !==
                            undefined
                        ) {

                            element.setAttribute(
                                "placeholder",
                                dictionary[key]
                            );

                        }

                    }
                );


            const allTracks =
                getAllTracks();


            if (playlistCount) {

                if (
                    language === "ar"
                ) {

                    playlistCount.textContent =
                        allTracks.length +
                        " " +
                        (
                            allTracks.length === 1
                                ? "مقطع"
                                : "مقاطع"
                        );

                } else {

                    playlistCount.textContent =
                        allTracks.length +
                        (
                            allTracks.length === 1
                                ? " track"
                                : " tracks"
                        );

                }

            }

        }


        /* =====================================================
           LANGUAGE OBSERVER
        ===================================================== */

        let languageObserver =
            null;


        if (
            typeof MutationObserver !==
            "undefined"
        ) {

            languageObserver =
                new MutationObserver(
                    function () {

                        applyMediaLanguage();

                    }
                );


            languageObserver.observe(
                document.documentElement,
                {
                    attributes: true,
                    attributeFilter: [
                        "lang",
                        "dir",
                        "class"
                    ]
                }
            );

        }


        window.addEventListener(
            "storage",
            function () {

                applyMediaLanguage();

            }
        );


        let lastDetectedLanguage =
            detectLanguage();


        /*
         * Less aggressive language checking.
         * 2000ms instead of 500ms.
         */

        setInterval(
            function () {

                const currentLanguage =
                    detectLanguage();


                if (
                    currentLanguage !==
                    lastDetectedLanguage
                ) {

                    lastDetectedLanguage =
                        currentLanguage;


                    applyMediaLanguage();

                }

            },
            2000
        );


        /* =====================================================
           KEYBOARD SHORTCUTS
        ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !overlay ||
                    !overlay.classList.contains(
                        "show"
                    )
                ) {

                    return;

                }


                const target =
                    event.target;


                if (
                    target &&
                    (
                        target.tagName === "INPUT" ||
                        target.tagName === "TEXTAREA"
                    )
                ) {

                    return;

                }


                if (
                    event.code === "Space"
                ) {

                    event.preventDefault();


                    if (
                        audio.paused
                    ) {

                        playAudio();

                    } else {

                        pauseAudio();

                    }

                }


                if (
                    event.code === "ArrowRight"
                ) {

                    nextTrack(
                        true
                    );

                }


                if (
                    event.code === "ArrowLeft"
                ) {

                    previousTrack();

                }

            }
        );


        /* =====================================================
           INITIALIZE
        ===================================================== */

        normalizeIndex();

        renderPlaylist();

        renderLocalList();

        /*
         * IMPORTANT:
         * Do NOT load the audio file here.
         * This prevents the website from waiting for a missing
         * MP3 during initial page load.
         */

        applyMediaLanguage();


        /* =====================================================
           LOCAL AUDIO SYNC
        ===================================================== */

        if (localAudio) {

            try {

                localAudio.pause();

                localAudio.removeAttribute(
                    "src"
                );

            } catch (error) {

                console.warn(
                    "RakkeZ: Local audio cleanup error.",
                    error
                );

            }

        }


        /* =====================================================
           CLEAN OBJECT URLS
        ===================================================== */

        window.addEventListener(
            "beforeunload",
            function () {

                localObjectUrls.forEach(
                    function (url) {

                        try {

                            URL.revokeObjectURL(
                                url
                            );

                        } catch (error) {}

                    }
                );

            }
        );


        /* =====================================================
           DEBUG API
        ===================================================== */

        window.rakkezMedia = {

            play:
                playAudio,

            pause:
                pauseAudio,

            next:
                function () {

                    nextTrack(
                        true
                    );

                },

            previous:
                previousTrack,

            open:
                openMedia,

            close:
                closeMedia,

            load:
                function (index) {

                    loadTrack(
                        index,
                        false
                    );

                },

            getCurrentTrack:
                function () {

                    const tracks =
                        getAllTracks();


                    return tracks[
                        currentIndex
                    ] || null;

                },

            getPlaylist:
                function () {

                    return getAllTracks();

                },

            isPlaying:
                function () {

                    return !audio.paused;

                }

        };


        console.log(
            "RakkeZ Media Player initialized successfully."
        );

    }


    /* =====================================================
       START ONLY AFTER DOM IS READY
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initRakkeZMedia,
            {
                once: true
            }
        );

    } else {

        initRakkeZMedia();

    }

})();
