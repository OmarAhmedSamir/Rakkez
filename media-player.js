(function () {

    "use strict";

    /* =====================================================
       RAKKEZ MEDIA PLAYER
       Full Replacement Version
       ===================================================== */

    /* =====================================================
       STORAGE
       ===================================================== */

    const STORAGE = {
        track: "rakkez_media_track",
        volume: "rakkez_media_volume",
        shuffle: "rakkez_media_shuffle",
        loop: "rakkez_media_loop",
        autoNext: "rakkez_media_auto_next",
        localTracks: "rakkez_local_music_names"
    };

    /* =====================================================
       BUILT-IN PLAYLIST
       ===================================================== */

    const PLAYLIST = [
        {
            title: "بحب الله موسيقى مع بيز هادي",
            artist: "Ahmed S",
            src: "Music/Guitar.mp3",
            artwork: "Music/artwork/Blog/Guitar.png",
            type: "lofi"
        },
        {
            title: "Airplane",
            artist: "RakkeZ Ambient",
            src: "Airplane.mp3",
            artwork: "Music/artwork/Blog/Airplane.png",
            type: "lofi"
        },
        {
            title: "Coffee",
            artist: "RakkeZ Ambient",
            src: "Caffee.mp3",
            artwork: "Music/artwork/Blog/Caffee.png",
            type: "lofi"
        },
        {
            title: "Fireplace",
            artist: "RakkeZ Ambient",
            src: "FirePlace.mp3",
            artwork: "Music/artwork/Blog/FirePlace.png",
            type: "lofi"
        },
        {
            title: "Peaceful Piano",
            artist: "RakkeZ Lofi",
            src: "peaceful-piano.mp3",
            artwork: "Music/artwork/Blog/peaceful-piano.png",
            type: "lofi"
        },
        {
            title: "Rain",
            artist: "RakkeZ Ambient",
            src: "rain.mp3",
            artwork: "Music/artwork/Blog/rain.png",
            type: "lofi"
        }
    ];

    /* =====================================================
       EFFECTS
       
       IMPORTANT:
       Add future effects ONLY inside this list.
       
       The image paths below match the actual GitHub files
       supplied by the user.
       
       Audio is null when an actual audio file has not been
       provided yet. This prevents 404 errors.
       ===================================================== */

    const AMBIENT_EFFECTS = [
        {
            id: "coffee",
            name: "Coffee",
            icon: "☕",
            image: "assets/blog/effects/CAFFEE.jpg",
            src: null,
            defaultVolume: 0.5
        },
        {
            id: "fireplace",
            name: "Fireplace",
            icon: "🔥",
            image: "assets/blog/effects/Fireplace.jfif",
            src: null,
            defaultVolume: 0.5
        },
        {
            id: "guitar",
            name: "Guitar",
            icon: "🎸",
            image: "assets/blog/effects/Guitar.jpg",
            src: null,
            defaultVolume: 0.5
        },
        {
            id: "peaceful-piano",
            name: "Peaceful Piano",
            icon: "🎹",
            image: "assets/blog/effects/PEACEFUL-PIANO.jpg",
            src: null,
            defaultVolume: 0.5
        },
        {
            id: "rain",
            name: "Rain",
            icon: "🌧️",
            image: "assets/blog/effects/RAIN.jpg",
            src: null,
            defaultVolume: 0.5
        }
    ];

    /* =====================================================
       LOCAL TRACKS
       ===================================================== */

    let LOCAL_TRACKS = [];

    const localObjectUrls = [];

    function getAllTracks() {
        return PLAYLIST.concat(LOCAL_TRACKS);
    }

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const overlay =
        document.getElementById("rakkezMediaOverlay");

    const closeButton =
        document.getElementById("rakkezMediaClose");

    const mediaButton =
        document.getElementById("mediaOpen");

    const tabs =
        document.querySelectorAll(".rakkez-media-tab");

    const sources =
        document.querySelectorAll(".rakkez-media-source");

    const artwork =
        document.getElementById("rakkezArtwork");

    const trackName =
        document.getElementById("rakkezTrackName");

    const trackArtist =
        document.getElementById("rakkezTrackArtist");

    const playlistElement =
        document.getElementById("rakkezPlaylist");

    const playlistCount =
        document.getElementById("rakkezPlaylistCount");

    const playButton =
        document.getElementById("rakkezPlay");

    const previousButton =
        document.getElementById("rakkezPrevious");

    const nextButton =
        document.getElementById("rakkezNext");

    const shuffleButton =
        document.getElementById("rakkezShuffle");

    const loopButton =
        document.getElementById("rakkezLoop");

    const autoNextButton =
        document.getElementById("rakkezAutoNext");

    const progress =
        document.getElementById("rakkezProgress");

    const currentTimeElement =
        document.getElementById("rakkezCurrentTime");

    const durationElement =
        document.getElementById("rakkezDuration");

    const volume =
        document.getElementById("rakkezVolume");

    const volumeValue =
        document.getElementById("rakkezVolumeValue");

    const youtubeInput =
        document.getElementById("rakkezYoutubeInput");

    const youtubePlay =
        document.getElementById("rakkezYoutubePlay");

    const youtubeEmbed =
        document.getElementById("rakkezYoutubeEmbed");

    const spotifyInput =
        document.getElementById("rakkezSpotifyInput");

    const spotifyPlay =
        document.getElementById("rakkezSpotifyPlay");

    const spotifyEmbed =
        document.getElementById("rakkezSpotifyEmbed");

    const localFile =
        document.getElementById("rakkezLocalFile");

    const localAudio =
        document.getElementById("rakkezLocalAudio");

    const localList =
        document.getElementById("rakkezLocalList");

    /* =====================================================
       MINI PLAYER
       ===================================================== */

    const miniPlayer =
        document.getElementById("rakkezMiniPlayer");

    const miniArtwork =
        document.getElementById("rakkezMiniArtwork");

    const miniTitle =
        document.getElementById("rakkezMiniTitle");

    const miniArtist =
        document.getElementById("rakkezMiniArtist");

    const miniPlay =
        document.getElementById("rakkezMiniPlay");

    const miniNext =
        document.getElementById("rakkezMiniNext");

    const miniClose =
        document.getElementById("rakkezMiniClose");

    const miniProgress =
        document.getElementById("rakkezMiniProgress");

    /* =====================================================
       AUDIO ENGINE
       ===================================================== */

    const audio = new Audio();

    audio.preload = "metadata";
    audio.controls = false;

    let currentIndex = parseInt(
        localStorage.getItem(STORAGE.track),
        10
    );

    let shuffle =
        localStorage.getItem(STORAGE.shuffle) === "true";

    let loop =
        localStorage.getItem(STORAGE.loop) === "true";

    let autoNext =
        localStorage.getItem(STORAGE.autoNext) !== "false";

    let isDraggingProgress = false;
    let miniPlayerClosed = true;
    let currentIsLocal = false;
    let currentTrackFailed = false;

    let loadingTimer = null;
    let currentLoadToken = 0;

    /* =====================================================
       MEDIA STATUS
       ===================================================== */

    function setMediaStatus(status) {

        if (!trackName || status !== "error") {
            return;
        }

        const current =
            getAllTracks()[currentIndex];

        if (current) {
            trackName.textContent =
                current.title + " — unavailable";
        }
    }

    function clearLoadingTimer() {

        if (!loadingTimer) {
            return;
        }

        clearTimeout(loadingTimer);
        loadingTimer = null;
    }

    function startLoadingGuard(token) {

        clearLoadingTimer();

        loadingTimer = setTimeout(function () {

            if (token !== currentLoadToken) {
                return;
            }

            if (
                audio.readyState <
                HTMLMediaElement.HAVE_METADATA
            ) {

                console.warn(
                    "RakkeZ Media: Audio loading timeout:",
                    audio.src
                );

                handleTrackError(
                    "Loading timeout"
                );
            }

        }, 12000);
    }

    function handleTrackError(reason) {

        clearLoadingTimer();

        currentTrackFailed = true;

        audio.pause();

        if (playButton) {
            playButton.textContent = "▶";
            playButton.title = "Play";
        }

        if (artwork) {
            artwork.classList.remove("playing");
        }

        console.warn(
            "RakkeZ Media: Track unavailable:",
            audio.src,
            reason || ""
        );

        setMediaStatus("error");

        updateMiniPlayer();
    }

    /* =====================================================
       AMBIENT EFFECTS ENGINE
       ===================================================== */

    (function initializeAmbientEffects() {

        const STORAGE_PREFIX =
            "rakkez_effect_";

        const effectsSource =
            document.getElementById(
                "rakkezEffectsSource"
            );

        const effectsContainer =
            document.getElementById(
                "rakkezEffectsContainer"
            ) ||
            effectsSource;

        const effectPlayers = {};

        /* =================================================
           CREATE EFFECT PLAYERS
           ================================================= */

        AMBIENT_EFFECTS.forEach(function (effect) {

            let savedVolume =
                parseFloat(
                    localStorage.getItem(
                        STORAGE_PREFIX +
                        effect.id +
                        "_volume"
                    )
                );

            if (!Number.isFinite(savedVolume)) {
                savedVolume =
                    effect.defaultVolume;
            }

            savedVolume = Math.max(
                0,
                Math.min(
                    1,
                    savedVolume
                )
            );

            /*
             * IMPORTANT:
             * Do not create Audio(null).
             *
             * Effects without a real audio source are kept
             * safely unavailable.
             */

            let effectAudio = null;

            if (
                typeof effect.src === "string" &&
                effect.src.trim()
            ) {

                effectAudio =
                    new Audio(effect.src);

                effectAudio.loop = true;
                effectAudio.preload = "metadata";
                effectAudio.volume =
                    savedVolume;

                effectAudio.addEventListener(
                    "error",
                    function () {

                        console.warn(
                            "RakkeZ: Effect unavailable:",
                            effect.src
                        );
                    }
                );
            }

            effectPlayers[effect.id] = {
                audio: effectAudio,
                volume: savedVolume,
                available: !!effectAudio
            };
        });

        /* =================================================
           FIND EXISTING EFFECT CARD
           ================================================= */

        function getExistingEffectCard(effect) {

            if (!effectsContainer) {
                return null;
            }

            const selectors = [
                `[data-effect="${effect.id}"]`,
                `[data-rakkez-effect="${effect.id}"]`,
                `#rakkezEffect-${effect.id}`,
                `.rakkez-effect-${effect.id}`
            ];

            for (
                const selector of selectors
            ) {

                try {

                    const element =
                        effectsContainer.querySelector(
                            selector
                        );

                    if (element) {
                        return element;
                    }

                } catch (error) {
                    // Ignore invalid selectors.
                }
            }

            return null;
        }

        /* =================================================
           UPDATE EFFECT CARD STATE
           ================================================= */

        function updateEffectCardState(
            effect,
            card
        ) {

            const player =
                effectPlayers[effect.id];

            if (!player || !card) {
                return;
            }

            const toggle =
                card.querySelector(
                    ".rakkez-effect-toggle, [data-effect-toggle], button"
                );

            const isPlaying =
                player.audio &&
                !player.audio.paused;

            card.classList.toggle(
                "active",
                !!isPlaying
            );

            if (toggle) {

                toggle.classList.toggle(
                    "active",
                    !!isPlaying
                );

                if (!player.available) {

                    toggle.disabled = true;

                    toggle.textContent =
                        "Unavailable";

                } else {

                    toggle.disabled = false;

                    toggle.textContent =
                        isPlaying
                            ? "Stop"
                            : "Play " +
                              effect.name;
                }
            }
        }

        /* =================================================
           BIND EXISTING EFFECT
           ================================================= */

        function bindExistingEffect(
            effect,
            card
        ) {

            const player =
                effectPlayers[effect.id];

            if (!player || !card) {
                return;
            }

            const toggle =
                card.querySelector(
                    ".rakkez-effect-toggle, [data-effect-toggle], button"
                );

            const volumeInput =
                card.querySelector(
                    ".rakkez-effect-volume-input, [data-effect-volume], input[type='range']"
                );

            const volumeValue =
                card.querySelector(
                    ".rakkez-effect-volume-value, [data-effect-volume-value]"
                );

            if (
                card.dataset.rakkezEffectBound ===
                "true"
            ) {
                updateEffectCardState(
                    effect,
                    card
                );

                return;
            }

            card.dataset.rakkezEffectBound =
                "true";

            /* ---------------------------------------------
               IMAGE
               --------------------------------------------- */

            if (
                effect.image &&
                typeof effect.image === "string"
            ) {

                card.style.backgroundImage =
                    "url('" +
                    effect.image.replace(
                        /'/g,
                        "\\'"
                    ) +
                    "')";

                card.style.backgroundSize =
                    "cover";

                card.style.backgroundPosition =
                    "center";
            }

            /* ---------------------------------------------
               VOLUME
               --------------------------------------------- */

            if (volumeInput) {

                volumeInput.value =
                    player.volume;

                if (volumeValue) {

                    volumeValue.textContent =
                        Math.round(
                            player.volume * 100
                        ) + "%";
                }

                volumeInput.addEventListener(
                    "input",
                    function () {

                        const value =
                            parseFloat(
                                volumeInput.value
                            );

                        if (
                            !Number.isFinite(
                                value
                            )
                        ) {
                            return;
                        }

                        const safeValue =
                            Math.max(
                                0,
                                Math.min(
                                    1,
                                    value
                                )
                            );

                        player.volume =
                            safeValue;

                        if (player.audio) {
                            player.audio.volume =
                                safeValue;
                        }

                        localStorage.setItem(
                            STORAGE_PREFIX +
                            effect.id +
                            "_volume",
                            String(
                                safeValue
                            )
                        );

                        if (volumeValue) {

                            volumeValue.textContent =
                                Math.round(
                                    safeValue *
                                    100
                                ) + "%";
                        }
                    }
                );
            }

            /* ---------------------------------------------
               TOGGLE
               --------------------------------------------- */

            if (toggle) {

                toggle.addEventListener(
                    "click",
                    function () {

                        if (!player.available) {

                            console.warn(
                                "RakkeZ: Effect has no audio source:",
                                effect.id
                            );

                            return;
                        }

                        if (
                            !player.audio.paused
                        ) {

                            player.audio.pause();

                            return;
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
                                        "RakkeZ Effect play failed:",
                                        effect.id,
                                        error
                                    );

                                    updateEffectCardState(
                                        effect,
                                        card
                                    );
                                }
                            );
                        }
                    }
                );
            }

            /* ---------------------------------------------
               AUDIO EVENTS
               --------------------------------------------- */

            if (player.audio) {

                player.audio.addEventListener(
                    "play",
                    function () {

                        card.classList.add(
                            "active"
                        );

                        if (toggle) {
                            toggle.classList.add(
                                "active"
                            );
                        }

                        updateEffectCardState(
                            effect,
                            card
                        );
                    }
                );

                player.audio.addEventListener(
                    "pause",
                    function () {

                        card.classList.remove(
                            "active"
                        );

                        if (toggle) {
                            toggle.classList.remove(
                                "active"
                            );
                        }

                        updateEffectCardState(
                            effect,
                            card
                        );
                    }
                );

                player.audio.addEventListener(
                    "ended",
                    function () {

                        updateEffectCardState(
                            effect,
                            card
                        );
                    }
                );

                player.audio.addEventListener(
                    "error",
                    function () {

                        console.warn(
                            "RakkeZ: Effect unavailable:",
                            effect.src
                        );

                        updateEffectCardState(
                            effect,
                            card
                        );
                    }
                );
            }

            updateEffectCardState(
                effect,
                card
            );
        }

        /* =================================================
           CREATE EFFECT CARD
           ================================================= */

        function createEffectCard(effect) {

            const player =
                effectPlayers[effect.id];

            if (!player || !effectsContainer) {
                return;
            }

            const card =
                document.createElement("div");

            card.className =
                "rakkez-effect-card";

            card.dataset.rakkezEffect =
                effect.id;

            if (effect.image) {

                card.style.backgroundImage =
                    "url('" +
                    effect.image.replace(
                        /'/g,
                        "\\'"
                    ) +
                    "')";

                card.style.backgroundSize =
                    "cover";

                card.style.backgroundPosition =
                    "center";
            }

            card.innerHTML = `
                <div class="rakkez-effect-info">

                    <div class="rakkez-effect-icon">
                        ${effect.icon || "♪"}
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
                        value="${player.volume}"
                    >

                    <span
                        class="rakkez-effect-volume-value"
                    >
                        ${Math.round(
                            player.volume * 100
                        )}%
                    </span>

                </div>
            `;

            effectsContainer.appendChild(
                card
            );

            bindExistingEffect(
                effect,
                card
            );
        }

        /* =================================================
           RENDER EFFECTS
           ================================================= */

        function renderEffects() {

            if (!effectsContainer) {

                console.warn(
                    "RakkeZ: Effects container not found."
                );

                return;
            }

            let foundExisting =
                false;

            AMBIENT_EFFECTS.forEach(
                function (effect) {

                    const card =
                        getExistingEffectCard(
                            effect
                        );

                    if (card) {

                        foundExisting =
                            true;

                        bindExistingEffect(
                            effect,
                            card
                        );
                    }
                }
            );

            /*
             * If the HTML already contains effect cards,
             * preserve them.
             */

            if (foundExisting) {
                return;
            }

            /*
             * Otherwise generate them automatically
             * from AMBIENT_EFFECTS.
             */

            AMBIENT_EFFECTS.forEach(
                function (effect) {

                    createEffectCard(
                        effect
                    );
                }
            );
        }

        renderEffects();

        /* =================================================
           PUBLIC EFFECT API
           ================================================= */

        window.rakkezAmbient = {

            play: function (id) {

                const player =
                    effectPlayers[id];

                if (!player) {

                    console.warn(
                        "RakkeZ: Unknown effect:",
                        id
                    );

                    return false;
                }

                if (!player.audio) {

                    console.warn(
                        "RakkeZ: Effect has no audio source:",
                        id
                    );

                    return false;
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
                                "RakkeZ Effect play failed:",
                                id,
                                error
                            );
                        }
                    );
                }

                return true;
            },

            stop: function (id) {

                const player =
                    effectPlayers[id];

                if (!player) {
                    return false;
                }

                if (!player.audio) {
                    return false;
                }

                player.audio.pause();

                return true;
            },

            toggle: function (id) {

                const player =
                    effectPlayers[id];

                if (!player) {
                    return false;
                }

                if (!player.audio) {

                    console.warn(
                        "RakkeZ: Effect has no audio source:",
                        id
                    );

                    return false;
                }

                if (player.audio.paused) {

                    const promise =
                        player.audio.play();

                    if (
                        promise &&
                        typeof promise.catch ===
                        "function"
                    ) {

                        promise.catch(
                            function () {}
                        );
                    }

                } else {

                    player.audio.pause();
                }

                return true;
            },

            getEffects: function () {
                return AMBIENT_EFFECTS.slice();
            },

            getEffect: function (id) {

                return (
                    AMBIENT_EFFECTS.find(
                        function (effect) {
                            return effect.id === id;
                        }
                    ) || null
                );
            }
        };

    })();

    /* =====================================================
       INDEX
       ===================================================== */

    function normalizeIndex() {

        const allTracks =
            getAllTracks();

        if (!allTracks.length) {

            currentIndex = 0;

            return;
        }

        if (
            !Number.isInteger(
                currentIndex
            ) ||
            currentIndex < 0 ||
            currentIndex >=
            allTracks.length
        ) {

            currentIndex = 0;
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

    if (!Number.isFinite(savedVolume)) {
        savedVolume = 0.7;
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
            ) + "%";
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

        } else if (miniArtwork) {

            miniArtwork.style.backgroundImage =
                "";

            miniArtwork.textContent =
                "♪";
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

                if (audio.paused) {
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
                nextTrack(true);
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
                        tab.dataset.rakkezSource;

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

                    if (!source) {
                        return;
                    }

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

    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds) ||
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
       ARTWORK
       ===================================================== */

    function clearArtwork() {

        if (!artwork) {
            return;
        }

        artwork.style.backgroundImage =
            "none";

        const icon =
            artwork.querySelector(
                ".rakkez-artwork-icon"
            );

        if (icon) {
            icon.style.opacity =
                "1";
        }
    }

    function setArtwork(image) {

        clearArtwork();

        if (
            !image ||
            typeof image !==
            "string" ||
            !image.trim()
        ) {
            return;
        }

        const cleanImage =
            image.trim();

        const testImage =
            new Image();

        testImage.onload =
            function () {

                if (!artwork) {
                    return;
                }

                artwork.style.backgroundImage =
                    "url('" +
                    cleanImage.replace(
                        /'/g,
                        "\\'"
                    ) +
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
            };

        testImage.onerror =
            function () {

                clearArtwork();
            };

        testImage.src =
            cleanImage;
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

            console.warn(
                "RakkeZ Media: Playlist is empty."
            );

            return;
        }

        if (index < 0) {
            index =
                allTracks.length - 1;
        }

        if (
            index >=
            allTracks.length
        ) {
            index = 0;
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

        const token =
            ++currentLoadToken;

        currentTrackFailed =
            false;

        currentIsLocal =
            track.type === "local";

        clearLoadingTimer();

        audio.pause();

        audio.removeAttribute(
            "src"
        );

        audio.load();

        if (trackName) {

            trackName.textContent =
                track.title ||
                "Unknown Track";
        }

        if (trackArtist) {

            trackArtist.textContent =
                track.artist ||
                "RakkeZ";
        }

        localStorage.setItem(
            STORAGE.track,
            String(
                currentIndex
            )
        );

        setArtwork(
            track.artwork
        );

        if (progress) {
            progress.value = 0;
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

        if (!track.src) {

            handleTrackError(
                "Missing audio source"
            );

            return;
        }

        audio.src =
            track.src;

        audio.load();

        startLoadingGuard(
            token
        );

        if (shouldPlay) {
            playAudio();
        }
    }

    /* =====================================================
       PLAY / PAUSE
       ===================================================== */

    function playAudio() {

        if (!audio.src) {
            return;
        }

        if (currentTrackFailed) {

            const track =
                getAllTracks()[
                    currentIndex
                ];

            if (
                track &&
                track.src
            ) {

                currentTrackFailed =
                    false;

                loadTrack(
                    currentIndex,
                    false
                );
            }
        }

        if (
            localAudio &&
            localAudio.src
        ) {

            try {
                localAudio.pause();
            } catch (error) {}
        }

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
                        "RakkeZ Media: Play prevented or failed.",
                        error
                    );

                    if (
                        error &&
                        error.name ===
                        "AbortError"
                    ) {
                        return;
                    }

                    handleTrackError(
                        error
                    );
                }
            );
        }
    }

    function pauseAudio() {
        audio.pause();
    }

    if (playButton) {

        playButton.addEventListener(
            "click",
            function () {

                if (audio.paused) {
                    playAudio();
                } else {
                    pauseAudio();
                }
            }
        );
    }

    /* =====================================================
       AUDIO EVENTS
       ===================================================== */

    audio.addEventListener(
        "play",
        function () {

            clearLoadingTimer();

            currentTrackFailed =
                false;

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

    audio.addEventListener(
        "loadstart",
        function () {

            startLoadingGuard(
                currentLoadToken
            );
        }
    );

    audio.addEventListener(
        "loadedmetadata",
        function () {

            clearLoadingTimer();

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

    audio.addEventListener(
        "loadeddata",
        function () {

            clearLoadingTimer();
        }
    );

    audio.addEventListener(
        "canplay",
        function () {

            clearLoadingTimer();

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

    audio.addEventListener(
        "canplaythrough",
        function () {

            clearLoadingTimer();
        }
    );

    audio.addEventListener(
        "stalled",
        function () {

            console.warn(
                "RakkeZ Media: Audio stalled:",
                audio.src
            );
        }
    );

    audio.addEventListener(
        "abort",
        function () {

            clearLoadingTimer();
        }
    );

    audio.addEventListener(
        "waiting",
        function () {
            // Normal buffering.
        }
    );

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
                    ) * 100;
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
                    ) * 100 +
                    "%";
            }
        }
    );

    audio.addEventListener(
        "ended",
        function () {

            clearLoadingTimer();

            if (loop) {

                audio.currentTime = 0;

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

    audio.addEventListener(
        "error",
        function () {

            clearLoadingTimer();

            const mediaError =
                audio.error;

            let message =
                "Unknown media error";

            if (mediaError) {

                switch (
                    mediaError.code
                ) {

                    case 1:
                        message =
                            "MEDIA_ERR_ABORTED";
                        break;

                    case 2:
                        message =
                            "MEDIA_ERR_NETWORK";
                        break;

                    case 3:
                        message =
                            "MEDIA_ERR_DECODE";
                        break;

                    case 4:
                        message =
                            "MEDIA_ERR_SRC_NOT_SUPPORTED";
                        break;
                }
            }

            console.warn(
                "RakkeZ Media: Unable to load audio:",
                audio.src,
                message,
                mediaError
            );

            handleTrackError(
                message
            );
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
                            ) / 100
                        ) *
                        audio.duration;

                    if (
                        currentTimeElement
                    ) {

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
                            ) / 100
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
                nextIndex = 0;
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

        if (previousIndex < 0) {

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
                nextTrack(true);
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
       SHUFFLE / LOOP / AUTO NEXT
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

                if (
                    !Number.isFinite(
                        value
                    )
                ) {
                    return;
                }

                audio.volume =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            value
                        )
                    );

                localStorage.setItem(
                    STORAGE.volume,
                    String(
                        audio.volume
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

            const language =
                detectLanguage();

            if (language === "ar") {

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
                    track.artwork &&
                    typeof track.artwork ===
                    "string" &&
                    track.artwork.trim()
                ) {

                    art.style.backgroundImage =
                        "url('" +
                        track.artwork.replace(
                            /'/g,
                            "\\'"
                        ) +
                        "')";

                    art.style.backgroundSize =
                        "cover";

                    art.style.backgroundPosition =
                        "center";

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
                    track.title ||
                    "Unknown Track";

                const source =
                    document.createElement(
                        "div"
                    );

                source.className =
                    "rakkez-track-source";

                source.textContent =
                    track.artist ||
                    "RakkeZ";

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
       LOCAL FILES
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

        let addedCount =
            0;

        Array.from(
            files
        ).forEach(
            function (file) {

                if (
                    !file.type ||
                    !file.type.startsWith(
                        "audio/"
                    )
                ) {
                    return;
                }

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

                addedCount++;
            }
        );

        if (!addedCount) {
            return;
        }

        normalizeIndex();

        renderPlaylist();

        renderLocalList();

        activateSource(
            "local"
        );

        const firstNewIndex =
            PLAYLIST.length +
            (
                LOCAL_TRACKS.length -
                addedCount
            );

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
                    tab.dataset.rakkezSource ===
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

        if (!sourceName) {
            return;
        }

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
            const pattern of patterns
        ) {

            const match =
                text.match(
                    pattern
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
            document.documentElement.getAttribute(
                "lang"
            );

        if (
            htmlLang &&
            htmlLang
                .toLowerCase()
                .startsWith("ar")
        ) {

            return "ar";
        }

        if (
            htmlLang &&
            htmlLang
                .toLowerCase()
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
            const key of possibleKeys
        ) {

            const value =
                localStorage.getItem(
                    key
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

    const languageObserver =
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

    window.addEventListener(
        "storage",
        function () {

            applyMediaLanguage();
        }
    );

    let lastDetectedLanguage =
        detectLanguage();

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
        500
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
                    target.tagName ===
                    "INPUT" ||
                    target.tagName ===
                    "TEXTAREA"
                )
            ) {
                return;
            }

            if (
                event.code ===
                "Space"
            ) {

                event.preventDefault();

                if (audio.paused) {
                    playAudio();
                } else {
                    pauseAudio();
                }
            }

            if (
                event.code ===
                "ArrowRight"
            ) {

                nextTrack(
                    true
                );
            }

            if (
                event.code ===
                "ArrowLeft"
            ) {

                previousTrack();
            }
        }
    );

    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.rakkezMedia = {

        play:
            playAudio,

        pause:
            pauseAudio,

        next:
            function () {
                nextTrack(true);
            },

        previous:
            previousTrack,

        load:
            function (index) {
                loadTrack(
                    index,
                    false
                );
            },

        open:
            openMedia,

        close:
            closeMedia,

        getCurrentTrack:
            function () {

                return (
                    getAllTracks()[
                        currentIndex
                    ] ||
                    null
                );
            },

        getPlaylist:
            function () {

                return getAllTracks()
                    .slice();
            },

        getAudio:
            function () {

                return audio;
            }
    };

    /* =====================================================
       INITIALIZE
       ===================================================== */

    normalizeIndex();

    renderPlaylist();

    renderLocalList();

    loadTrack(
        currentIndex,
        false
    );

    applyMediaLanguage();

    /* =====================================================
       LOCAL AUDIO SYNC
       ===================================================== */

    if (localAudio) {

        try {
            localAudio.pause();
        } catch (error) {}

        localAudio.removeAttribute(
            "src"
        );
    }

    /* =====================================================
       CLEAN OBJECT URLS
       ===================================================== */

    window.addEventListener(
        "beforeunload",
        function () {

            clearLoadingTimer();

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
       READY
       ===================================================== */

    console.log(
        "RakkeZ Media Player initialized successfully."
    );

})();
