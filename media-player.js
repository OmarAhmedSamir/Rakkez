(function () {

    "use strict";

    /* =====================================================
       RAKKEZ MEDIA PLAYER
       FULL REPLACEMENT

       MAIN PLAYER:
       - Lofi / Music only

       EXTERNAL SOURCES:
       - YouTube
       - YouTube Playlists
       - SoundCloud
       - Spotify
       - Browser

       EFFECTS:
       - Rain
       - Airplane
       - Coffee
       - Fireplace
       - Peaceful Piano

       EFFECT RULES:
       - Effects are completely independent from music
       - Multiple effects can play simultaneously
       - Each effect has its own volume
       - Effects never enter the main playlist
       - Effects are generated from ONE centralized list

       IMPORTANT:
       - No HTML file modification required
       - New tabs/sources are generated automatically
       - New CSS is injected automatically
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
        localTracks: "rakkez_local_music_names",

        youtubeUrl: "rakkez_media_youtube_url",
        soundcloudUrl: "rakkez_media_soundcloud_url",
        spotifyUrl: "rakkez_media_spotify_url",

        browserUrl: "rakkez_media_browser_url",
        browserHistory: "rakkez_media_browser_history",
        browserHistoryIndex: "rakkez_media_browser_history_index"
    };


    /* =====================================================
       MAIN MUSIC PLAYLIST
       ===================================================== */

    const PLAYLIST = [

        {
            title: "Lofi Chill Music",
            artist: "RakkeZ",
            src: "Music/lofi (1).mp3",
            artwork: "assets/blog/effects/7.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 2",
            artist: "RakkeZ",
            src: "Music/lofi (2).mp3",
            artwork: "assets/blog/effects/4.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 3",
            artist: "RakkeZ",
            src: "Music/lofi (3).mp3",
            artwork: "assets/blog/effects/1.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 4",
            artist: "RakkeZ",
            src: "Music/lofi (4).mp3",
            artwork: "assets/blog/effects/3.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 5",
            artist: "RakkeZ",
            src: "Music/lofi (5).mp3",
            artwork: "assets/blog/effects/6.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 6",
            artist: "RakkeZ",
            src: "Music/lofi (6).mp3",
            artwork: "assets/blog/effects/5.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 7",
            artist: "RakkeZ",
            src: "Music/lofi (7).mp3",
            artwork: "assets/blog/effects/2.png",
            type: "lofi"
        }

    ];


    /* =====================================================
       EFFECTS
       ===================================================== */

    const AMBIENT_EFFECTS = [

        {
            id: "rain",
            name: "Rain",
            icon: "🌧️",
            description: "Soft rain for focus",
            image: "assets/blog/effects/RAIN.jpg",
            src: "rain.mp3",
            defaultVolume: 0.50
        },

        {
            id: "airplane",
            name: "Airplane",
            icon: "✈️",
            description: "Calm airplane cabin ambience",
            image: "assets/blog/effects/Airplane.jpg",
            src: "Airplane.mp3",
            defaultVolume: 0.50
        },

        {
            id: "coffee",
            name: "Coffee",
            icon: "☕",
            description: "Cozy coffee shop ambience",
            image: "assets/blog/effects/CAFFEE.jpg",
            src: "Caffee.mp3",
            defaultVolume: 0.50
        },

        {
            id: "fireplace",
            name: "Fireplace",
            icon: "🔥",
            description: "Warm fireplace ambience",
            image: "assets/blog/effects/Fireplace.jfif",
            src: "FirePlace.mp3",
            defaultVolume: 0.50
        },

        {
            id: "peaceful-piano",
            name: "Peaceful Piano",
            icon: "🎹",
            description: "Peaceful piano ambience",
            image: "assets/blog/effects/PEACEFUL-PIANO.jpg",
            src: "peaceful-piano.mp3",
            defaultVolume: 0.50
        }

    ];


    /* =====================================================
       LOCAL MUSIC
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


    let tabs =
        document.querySelectorAll(".rakkez-media-tab");

    let sources =
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
       MAIN AUDIO
       ===================================================== */

    const audio =
        new Audio();

    audio.preload =
        "metadata";

    audio.controls =
        false;


    let currentIndex =
        parseInt(
            localStorage.getItem(
                STORAGE.track
            ),
            10
        );


    if (
        !Number.isFinite(currentIndex) ||
        currentIndex < 0 ||
        currentIndex >= PLAYLIST.length
    ) {

        currentIndex = 0;

    }


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


    let currentTrackFailed =
        false;


    let loadingTimer =
        null;


    let currentLoadToken =
        0;


    /* =====================================================
       HELPERS
       ===================================================== */

    function clamp(
        value,
        min,
        max
    ) {

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );

    }


    function formatTime(
        seconds
    ) {

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


        const secs =
            Math.floor(
                seconds % 60
            );


        return (
            minutes +
            ":" +
            String(secs)
                .padStart(
                    2,
                    "0"
                )
        );

    }


    function escapeHTML(
        value
    ) {

        return String(
            value || ""
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    function safeUrl(
        value
    ) {

        try {

            const url =
                new URL(
                    value,
                    window.location.href
                );


            if (
                url.protocol === "http:" ||
                url.protocol === "https:"
            ) {

                return url.href;

            }

        } catch (error) {}

        return null;

    }


    function clearLoadingTimer() {

        if (!loadingTimer) {
            return;
        }


        clearTimeout(
            loadingTimer
        );


        loadingTimer =
            null;

    }


    function startLoadingGuard(
        token
    ) {

        clearLoadingTimer();


        loadingTimer =
            setTimeout(
                function () {

                    if (
                        token !==
                        currentLoadToken
                    ) {

                        return;

                    }


                    if (
                        audio.readyState <
                        HTMLMediaElement.HAVE_METADATA
                    ) {

                        handleTrackError(
                            "Loading timeout"
                        );

                    }

                },
                12000
            );

    }


    function setMediaStatus(
        status
    ) {

        if (
            !trackName ||
            status !== "error"
        ) {

            return;

        }


        const tracks =
            getAllTracks();


        const current =
            tracks[currentIndex];


        if (current) {

            trackName.textContent =
                current.title +
                " — unavailable";

        }

    }


    function handleTrackError(
        reason
    ) {

        clearLoadingTimer();


        currentTrackFailed =
            true;


        audio.pause();


        if (playButton) {

            playButton.textContent =
                "▶";

        }


        if (artwork) {

            artwork.classList.remove(
                "playing"
            );

        }


        console.warn(
            "RakkeZ Media:",
            reason,
            audio.src
        );


        setMediaStatus(
            "error"
        );


        updateMiniPlayer();

    }


    /* =====================================================
       DYNAMIC MEDIA UI CSS
       ===================================================== */

    function injectDynamicMediaStyles() {

        if (
            document.getElementById(
                "rakkezDynamicMediaStyles"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "rakkezDynamicMediaStyles";


        style.textContent = `

            /* =================================================
               DYNAMIC SOURCE COMMON
               ================================================= */

            .rakkez-dynamic-source {
                width: 100%;
                min-height: 100%;
                box-sizing: border-box;
                padding: 18px;
            }


            .rakkez-external-panel {
                width: 100%;
                max-width: 1100px;
                margin: 0 auto;
                box-sizing: border-box;
            }


            .rakkez-external-toolbar {
                display: flex;
                align-items: center;
                gap: 10px;
                width: 100%;
                margin-bottom: 14px;
                box-sizing: border-box;
            }


            .rakkez-external-input {
                flex: 1;
                min-width: 0;
                height: 44px;
                padding: 0 14px;
                border-radius: 12px;
                border: 1px solid rgba(255,255,255,.10);
                background: rgba(255,255,255,.055);
                color: inherit;
                outline: none;
                box-sizing: border-box;
            }


            .rakkez-external-input:focus {
                border-color: rgba(80,140,255,.45);
                background: rgba(255,255,255,.075);
            }


            .rakkez-external-button {
                height: 44px;
                padding: 0 16px;
                border-radius: 12px;
                border: 1px solid rgba(255,255,255,.10);
                background: rgba(255,255,255,.07);
                color: inherit;
                cursor: pointer;
                white-space: nowrap;
                transition:
                    transform .18s ease,
                    background .18s ease,
                    border-color .18s ease;
            }


            .rakkez-external-button:hover {
                background: rgba(255,255,255,.12);
                border-color: rgba(255,255,255,.18);
            }


            .rakkez-external-button:active {
                transform: scale(.97);
            }


            .rakkez-external-button.primary {
                background: rgba(70,120,255,.22);
                border-color: rgba(100,150,255,.32);
            }


            .rakkez-external-frame {
                width: 100%;
                height: 520px;
                min-height: 320px;
                border: 0;
                border-radius: 16px;
                display: block;
                background: #080d16;
                box-sizing: border-box;
            }


            .rakkez-external-help {
                margin-top: 10px;
                font-size: 12px;
                line-height: 1.5;
                opacity: .58;
            }


            /* =================================================
               SOUNDCLOUD
               ================================================= */

            .rakkez-soundcloud-panel {
                width: 100%;
            }


            .rakkez-soundcloud-frame {
                width: 100%;
                height: 480px;
                border: 0;
                border-radius: 16px;
                display: block;
                background: #080d16;
            }


            /* =================================================
               BROWSER
               ================================================= */

            .rakkez-browser-panel {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }


            .rakkez-browser-navigation {
                display: flex;
                align-items: center;
                gap: 6px;
                width: 100%;
            }


            .rakkez-browser-nav-button {
                width: 42px;
                min-width: 42px;
                height: 42px;
                border-radius: 11px;
                border: 1px solid rgba(255,255,255,.10);
                background: rgba(255,255,255,.055);
                color: inherit;
                cursor: pointer;
                font-size: 16px;
            }


            .rakkez-browser-nav-button:hover {
                background: rgba(255,255,255,.11);
            }


            .rakkez-browser-address {
                flex: 1;
                min-width: 0;
                height: 42px;
                border-radius: 11px;
                border: 1px solid rgba(255,255,255,.10);
                background: rgba(255,255,255,.055);
                color: inherit;
                padding: 0 13px;
                outline: none;
                box-sizing: border-box;
            }


            .rakkez-browser-address:focus {
                border-color: rgba(80,140,255,.45);
            }


            .rakkez-browser-go {
                height: 42px;
                padding: 0 15px;
                border-radius: 11px;
                border: 1px solid rgba(255,255,255,.12);
                background: rgba(70,120,255,.22);
                color: inherit;
                cursor: pointer;
                white-space: nowrap;
            }


            .rakkez-browser-actions {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
            }


            .rakkez-browser-status {
                font-size: 12px;
                opacity: .55;
                min-height: 18px;
            }


            .rakkez-browser-frame-wrap {
                position: relative;
                width: 100%;
                height: 560px;
                min-height: 360px;
                border-radius: 16px;
                overflow: hidden;
                background: #080d16;
                border: 1px solid rgba(255,255,255,.08);
            }


            .rakkez-browser-frame {
                width: 100%;
                height: 100%;
                border: 0;
                display: block;
                background: white;
            }


            .rakkez-browser-overlay {
                position: absolute;
                inset: 0;
                display: none;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 30px;
                box-sizing: border-box;
                background: rgba(8,13,22,.96);
                z-index: 5;
            }


            .rakkez-browser-overlay.show {
                display: flex;
            }


            .rakkez-browser-overlay-content {
                max-width: 500px;
            }


            .rakkez-browser-overlay-title {
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 8px;
            }


            .rakkez-browser-overlay-text {
                font-size: 13px;
                line-height: 1.6;
                opacity: .62;
                margin-bottom: 16px;
            }


            /* =================================================
               RESPONSIVE
               ================================================= */

            @media (max-width: 700px) {

                .rakkez-external-toolbar {
                    flex-wrap: wrap;
                }

                .rakkez-external-input {
                    flex-basis: 100%;
                }

                .rakkez-external-frame {
                    height: 420px;
                }

                .rakkez-soundcloud-frame {
                    height: 420px;
                }

                .rakkez-browser-navigation {
                    flex-wrap: wrap;
                }

                .rakkez-browser-address {
                    order: 10;
                    flex-basis: 100%;
                }

                .rakkez-browser-frame-wrap {
                    height: 460px;
                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       DYNAMIC TABS / SOURCES
       ===================================================== */

    function refreshMediaCollections() {

        tabs =
            document.querySelectorAll(
                ".rakkez-media-tab"
            );


        sources =
            document.querySelectorAll(
                ".rakkez-media-source"
            );

    }


    function findTabContainer() {

        const existingTab =
            document.querySelector(
                ".rakkez-media-tab"
            );


        if (existingTab) {

            return existingTab.parentElement;

        }


        return null;

    }


    function findSourceContainer() {

        const existingSource =
            document.querySelector(
                ".rakkez-media-source"
            );


        if (existingSource) {

            return existingSource.parentElement;

        }


        return null;

    }


    function createDynamicTab(
        name,
        label,
        icon
    ) {

        let tab =
            document.querySelector(
                `.rakkez-media-tab[data-rakkez-source="${name}"]`
            );


        if (tab) {

            return tab;

        }


        const container =
            findTabContainer();


        if (!container) {

            console.warn(
                "RakkeZ: Could not find media tab container."
            );


            return null;

        }


        tab =
            document.createElement(
                "button"
            );


        tab.type =
            "button";


        tab.className =
            "rakkez-media-tab";


        tab.dataset.rakkezSource =
            name;


        tab.innerHTML =
            icon +
            " " +
            escapeHTML(label);


        container.appendChild(
            tab
        );


        return tab;

    }


    function createDynamicSource(
        name
    ) {

        let source =
            document.querySelector(
                `.rakkez-media-source[data-rakkez-source="${name}"]`
            );


        if (source) {

            return source;

        }


        const container =
            findSourceContainer();


        if (!container) {

            console.warn(
                "RakkeZ: Could not find media source container."
            );


            return null;

        }


        source =
            document.createElement(
                "section"
            );


        source.className =
            "rakkez-media-source rakkez-dynamic-source";


        source.dataset.rakkezSource =
            name;


        source.setAttribute(
            "aria-hidden",
            "true"
        );


        container.appendChild(
            source
        );


        return source;

    }


    function ensureDynamicMediaUI() {

        injectDynamicMediaStyles();


        const soundcloudTab =
            createDynamicTab(
                "soundcloud",
                "SoundCloud",
                "🟠"
            );


        const browserTab =
            createDynamicTab(
                "browser",
                "Browser",
                "🌐"
            );


        const soundcloudSource =
            createDynamicSource(
                "soundcloud"
            );


        const browserSource =
            createDynamicSource(
                "browser"
            );


        if (soundcloudTab) {

            soundcloudTab.setAttribute(
                "aria-label",
                "SoundCloud"
            );

        }


        if (browserTab) {

            browserTab.setAttribute(
                "aria-label",
                "Browser"
            );

        }


        if (soundcloudSource) {

            soundcloudSource.setAttribute(
                "aria-label",
                "SoundCloud player"
            );

        }


        if (browserSource) {

            browserSource.setAttribute(
                "aria-label",
                "Browser"
            );

        }


        refreshMediaCollections();

    }


    /* =====================================================
       MAIN PLAYER
       ===================================================== */

    function loadTrack(
        index,
        autoplay = false
    ) {

        const tracks =
            getAllTracks();


        if (!tracks.length) {
            return;
        }


        index =
            clamp(
                index,
                0,
                tracks.length - 1
            );


        currentIndex =
            index;


        const track =
            tracks[currentIndex];


        if (!track) {
            return;
        }


        currentIsLocal =
            !!track.isLocal;


        currentTrackFailed =
            false;


        clearLoadingTimer();


        currentLoadToken++;


        const token =
            currentLoadToken;


        audio.pause();


        audio.removeAttribute(
            "src"
        );


        audio.load();


        audio.src =
            track.src;


        audio.loop =
            loop;


        audio.volume =
            getSavedMainVolume();


        if (trackName) {

            trackName.textContent =
                track.title;

        }


        if (trackArtist) {

            trackArtist.textContent =
                track.artist ||
                "RakkeZ";

        }


        if (artwork) {

            artwork.classList.remove(
                "playing"
            );


            if (track.artwork) {

                artwork.style.backgroundImage =
                    "url('" +
                    track.artwork.replace(
                        /'/g,
                        "\\'"
                    ) +
                    "')";


                artwork.style.backgroundSize =
                    "cover";


                artwork.style.backgroundPosition =
                    "center";

            } else {

                artwork.style.backgroundImage =
                    "";

            }

        }


        localStorage.setItem(
            STORAGE.track,
            String(currentIndex)
        );


        updatePlaylistUI();


        if (autoplay) {

            startLoadingGuard(
                token
            );


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
                            "RakkeZ Media play failed:",
                            error
                        );


                        handleTrackError(
                            "Playback failed"
                        );

                    }
                );

            }

        }


        updateMiniPlayer();

    }


    function playMain() {

        if (!audio.src) {

            loadTrack(
                currentIndex,
                false
            );

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
                        "RakkeZ Media play failed:",
                        error
                    );


                    handleTrackError(
                        "Playback failed"
                    );

                }
            );

        }

    }


    function pauseMain() {

        audio.pause();

    }


    function toggleMainPlay() {

        if (audio.paused) {

            playMain();

        } else {

            pauseMain();

        }

    }


    function nextTrack() {

        const tracks =
            getAllTracks();


        if (!tracks.length) {
            return;
        }


        if (shuffle) {

            if (
                tracks.length === 1
            ) {

                currentIndex =
                    0;

            } else {

                let next;


                do {

                    next =
                        Math.floor(
                            Math.random() *
                            tracks.length
                        );

                } while (
                    next ===
                    currentIndex
                );


                currentIndex =
                    next;

            }

        } else {

            currentIndex =
                (
                    currentIndex + 1
                ) %
                tracks.length;

        }


        loadTrack(
            currentIndex,
            true
        );

    }


    function previousTrack() {

        const tracks =
            getAllTracks();


        if (!tracks.length) {
            return;
        }


        currentIndex =
            (
                currentIndex -
                1 +
                tracks.length
            ) %
            tracks.length;


        loadTrack(
            currentIndex,
            true
        );

    }


    /* =====================================================
       MAIN VOLUME
       ===================================================== */

    function getSavedMainVolume() {

        const saved =
            parseFloat(
                localStorage.getItem(
                    STORAGE.volume
                )
            );


        if (
            Number.isFinite(saved)
        ) {

            return clamp(
                saved,
                0,
                1
            );

        }


        return 0.7;

    }


    function updateMainVolume() {

        if (!volume) {
            return;
        }


        const value =
            clamp(
                parseFloat(
                    volume.value
                ),
                0,
                1
            );


        audio.volume =
            value;


        localStorage.setItem(
            STORAGE.volume,
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


    /* =====================================================
       PLAYLIST
       ===================================================== */

    function updatePlaylistUI() {

        if (!playlistElement) {
            return;
        }


        playlistElement
            .querySelectorAll(
                ".rakkez-track"
            )
            .forEach(
                function (
                    element,
                    index
                ) {

                    element.classList.toggle(
                        "active",
                        index ===
                        currentIndex
                    );

                }
            );


        if (playlistCount) {

            const count =
                getAllTracks().length;


            playlistCount.textContent =
                count +
                (
                    count === 1
                        ? " track"
                        : " tracks"
                );

        }

    }


    function renderPlaylist() {

        if (!playlistElement) {
            return;
        }


        playlistElement.innerHTML =
            "";


        getAllTracks().forEach(
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


                item.dataset.index =
                    String(index);


                item.innerHTML = `

                    <div class="rakkez-track-art">

                        ${
                            track.artwork
                                ? `
                                    <img
                                        src="${escapeHTML(track.artwork)}"
                                        alt=""
                                        style="
                                            width:100%;
                                            height:100%;
                                            object-fit:cover;
                                            border-radius:10px;
                                        "
                                    >
                                `
                                : "♪"
                        }

                    </div>

                    <div class="rakkez-track-details">

                        <div class="rakkez-track-title">
                            ${escapeHTML(
                                track.title
                            )}
                        </div>

                        <div class="rakkez-track-source">
                            ${escapeHTML(
                                track.artist ||
                                "RakkeZ"
                            )}
                        </div>

                    </div>

                `;


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


        updatePlaylistUI();

    }


    /* =====================================================
       MINI PLAYER
       ===================================================== */

    function updateMiniPlayer() {

        if (!miniPlayer) {
            return;
        }


        const tracks =
            getAllTracks();


        const track =
            tracks[currentIndex];


        if (!track) {

            miniPlayer.classList.remove(
                "show"
            );


            return;

        }


        if (miniTitle) {

            miniTitle.textContent =
                track.title;

        }


        if (miniArtist) {

            miniArtist.textContent =
                track.artist ||
                "RakkeZ";

        }


        if (miniArtwork) {

            if (track.artwork) {

                miniArtwork.style.backgroundImage =
                    "url('" +
                    track.artwork.replace(
                        /'/g,
                        "\\'"
                    ) +
                    "')";


                miniArtwork.textContent =
                    "";

            } else {

                miniArtwork.style.backgroundImage =
                    "";


                miniArtwork.textContent =
                    "♪";

            }

        }


        if (
            !miniPlayerClosed &&
            !audio.paused
        ) {

            miniPlayer.classList.add(
                "show"
            );

        }

    }


    function showMiniPlayer() {

        miniPlayerClosed =
            false;


        if (miniPlayer) {

            miniPlayer.classList.add(
                "show"
            );

        }

    }


    function hideMiniPlayer() {

        miniPlayerClosed =
            true;


        if (miniPlayer) {

            miniPlayer.classList.remove(
                "show"
            );

        }

    }


    /* =====================================================
       TABS
       ===================================================== */

    function switchTab(
        name
    ) {

        refreshMediaCollections();


        tabs.forEach(
            function (tab) {

                tab.classList.toggle(
                    "active",
                    tab.dataset.rakkezSource ===
                    name
                );

            }
        );


        sources.forEach(
            function (source) {

                const active =
                    source.dataset.rakkezSource ===
                    name;


                source.classList.toggle(
                    "active",
                    active
                );


                source.setAttribute(
                    "aria-hidden",
                    active
                        ? "false"
                        : "true"
                );

            }
        );


        if (
            name === "soundcloud"
        ) {

            ensureSoundCloudUI();

        }


        if (
            name === "browser"
        ) {

            ensureBrowserUI();

        }

    }


    function bindTabs() {

        refreshMediaCollections();


        tabs.forEach(
            function (tab) {

                if (
                    tab.dataset.rakkezBound ===
                    "true"
                ) {

                    return;

                }


                tab.dataset.rakkezBound =
                    "true";


                tab.addEventListener(
                    "click",
                    function () {

                        switchTab(
                            tab.dataset.rakkezSource
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       OVERLAY
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


        if (
            audio.src &&
            !audio.paused
        ) {

            showMiniPlayer();

        }

    }


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


        if (!audio.paused) {

            showMiniPlayer();

        }

    }


    if (mediaButton) {

        mediaButton.addEventListener(
            "click",
            openMedia
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


    /* =====================================================
       MAIN CONTROLS
       ===================================================== */

    if (playButton) {

        playButton.addEventListener(
            "click",
            toggleMainPlay
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousTrack
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextTrack
        );

    }


    if (shuffleButton) {

        shuffleButton.classList.toggle(
            "active",
            shuffle
        );


        shuffleButton.addEventListener(
            "click",
            function () {

                shuffle =
                    !shuffle;


                localStorage.setItem(
                    STORAGE.shuffle,
                    String(shuffle)
                );


                shuffleButton.classList.toggle(
                    "active",
                    shuffle
                );

            }
        );

    }


    if (loopButton) {

        loopButton.classList.toggle(
            "active",
            loop
        );


        loopButton.addEventListener(
            "click",
            function () {

                loop =
                    !loop;


                audio.loop =
                    loop;


                localStorage.setItem(
                    STORAGE.loop,
                    String(loop)
                );


                loopButton.classList.toggle(
                    "active",
                    loop
                );

            }
        );

    }


    if (autoNextButton) {

        autoNextButton.classList.toggle(
            "active",
            autoNext
        );


        autoNextButton.addEventListener(
            "click",
            function () {

                autoNext =
                    !autoNext;


                localStorage.setItem(
                    STORAGE.autoNext,
                    String(autoNext)
                );


                autoNextButton.classList.toggle(
                    "active",
                    autoNext
                );

            }
        );

    }


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

                    audio.currentTime =
                        (
                            parseFloat(
                                progress.value
                            ) /
                            100
                        ) *
                        audio.duration;

                }

            }
        );


        progress.addEventListener(
            "change",
            function () {

                isDraggingProgress =
                    false;

            }
        );

    }


    /* =====================================================
       MAIN VOLUME
       ===================================================== */

    if (volume) {

        volume.value =
            getSavedMainVolume();


        updateMainVolume();


        volume.addEventListener(
            "input",
            updateMainVolume
        );

    }


    /* =====================================================
       MAIN AUDIO EVENTS
       ===================================================== */

    audio.addEventListener(
        "loadstart",
        function () {

            currentTrackFailed =
                false;


            startLoadingGuard(
                currentLoadToken
            );

        }
    );


    audio.addEventListener(
        "loadedmetadata",
        function () {

            clearLoadingTimer();


            if (durationElement) {

                durationElement.textContent =
                    formatTime(
                        audio.duration
                    );

            }

        }
    );


    audio.addEventListener(
        "timeupdate",
        function () {

            if (
                !isDraggingProgress &&
                progress &&
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


            if (miniProgress) {

                const percentage =
                    Number.isFinite(
                        audio.duration
                    ) &&
                    audio.duration > 0
                        ? (
                            audio.currentTime /
                            audio.duration
                        ) *
                        100
                        : 0;


                miniProgress.style.width =
                    percentage +
                    "%";

            }

        }
    );


    audio.addEventListener(
        "play",
        function () {

            clearLoadingTimer();


            if (playButton) {

                playButton.textContent =
                    "❚❚";

            }


            if (artwork) {

                artwork.classList.add(
                    "playing"
                );

            }


            showMiniPlayer();

        }
    );


    audio.addEventListener(
        "pause",
        function () {

            if (playButton) {

                playButton.textContent =
                    "▶";

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
        "ended",
        function () {

            clearLoadingTimer();


            if (loop) {

                audio.currentTime =
                    0;


                playMain();


                return;

            }


            if (autoNext) {

                nextTrack();

            }

        }
    );


    audio.addEventListener(
        "error",
        function () {

            handleTrackError(
                "Audio error"
            );

        }
    );


    /* =====================================================
       MINI CONTROLS
       ===================================================== */

    if (miniPlay) {

        miniPlay.addEventListener(
            "click",
            toggleMainPlay
        );

    }


    if (miniNext) {

        miniNext.addEventListener(
            "click",
            nextTrack
        );

    }


    if (miniClose) {

        miniClose.addEventListener(
            "click",
            hideMiniPlayer
        );

    }


    /* =====================================================
       YOUTUBE
       ===================================================== */

    function parseYouTubeUrl(
        value
    ) {

        if (!value) {
            return null;
        }


        try {

            const parsed =
                new URL(value.trim());


            const hostname =
                parsed.hostname
                    .toLowerCase()
                    .replace(
                        /^www\./,
                        ""
                    );


            const result = {
                videoId: null,
                playlistId: null,
                type: "video"
            };


            if (
                hostname === "youtu.be"
            ) {

                result.videoId =
                    parsed.pathname
                        .split("/")
                        .filter(Boolean)[0] ||
                    null;

            }


            if (
                hostname === "youtube.com" ||
                hostname === "m.youtube.com" ||
                hostname === "music.youtube.com"
            ) {

                const list =
                    parsed.searchParams.get(
                        "list"
                    );


                const video =
                    parsed.searchParams.get(
                        "v"
                    );


                if (list) {

                    result.playlistId =
                        list;

                }


                if (video) {

                    result.videoId =
                        video;

                }


                const parts =
                    parsed.pathname
                        .split("/")
                        .filter(Boolean);


                if (
                    parts[0] === "embed" &&
                    parts[1]
                ) {

                    result.videoId =
                        parts[1];

                }


                if (
                    parts[0] === "shorts" &&
                    parts[1]
                ) {

                    result.videoId =
                        parts[1];

                }


                if (
                    parts[0] === "live" &&
                    parts[1]
                ) {

                    result.videoId =
                        parts[1];

                }


                if (
                    parts[0] === "playlist" &&
                    list
                ) {

                    result.type =
                        "playlist";

                }

            }


            if (
                result.playlistId
            ) {

                result.type =
                    "playlist";

            }


            if (
                !result.videoId &&
                !result.playlistId
            ) {

                return null;

            }


            return result;

        } catch (error) {

            return null;

        }

    }


    function getYouTubeId(
        url
    ) {

        const parsed =
            parseYouTubeUrl(
                url
            );


        return parsed
            ? parsed.videoId
            : null;

    }


    function getYouTubeEmbedUrl(
        data
    ) {

        if (!data) {
            return null;
        }


        let base =
            "https://www.youtube.com/embed/";


        if (
            data.videoId
        ) {

            base +=
                encodeURIComponent(
                    data.videoId
                );

        } else {

            base +=
                "videoseries";

        }


        const params =
            new URLSearchParams();


        params.set(
            "autoplay",
            "1"
        );


        params.set(
            "rel",
            "0"
        );


        params.set(
            "modestbranding",
            "1"
        );


        params.set(
            "playsinline",
            "1"
        );


        if (
            data.playlistId
        ) {

            params.set(
                "list",
                data.playlistId
            );

        }


        return (
            base +
            "?" +
            params.toString()
        );

    }


    function playYouTube() {

        if (
            !youtubeInput ||
            !youtubeEmbed
        ) {

            return;

        }


        const raw =
            youtubeInput.value.trim();


        const data =
            parseYouTubeUrl(
                raw
            );


        if (!data) {

            youtubeEmbed.innerHTML = `

                <div
                    style="
                        padding:20px;
                        color:rgba(255,255,255,.55);
                        text-align:center;
                    "
                >
                    Invalid YouTube URL
                </div>

            `;


            return;

        }


        localStorage.setItem(
            STORAGE.youtubeUrl,
            raw
        );


        const embed =
            getYouTubeEmbedUrl(
                data
            );


        youtubeEmbed.innerHTML = `

            <iframe
                src="${escapeHTML(embed)}"
                title="YouTube Player"
                allow="
                    autoplay;
                    encrypted-media;
                    picture-in-picture;
                    fullscreen
                "
                allowfullscreen
                loading="lazy"
                style="
                    width:100%;
                    height:100%;
                    min-height:420px;
                    border:0;
                    border-radius:16px;
                "
            ></iframe>

        `;

    }


    if (youtubePlay) {

        youtubePlay.addEventListener(
            "click",
            playYouTube
        );

    }


    if (youtubeInput) {

        youtubeInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    playYouTube();

                }

            }
        );


        const savedYouTube =
            localStorage.getItem(
                STORAGE.youtubeUrl
            );


        if (
            savedYouTube &&
            !youtubeInput.value
        ) {

            youtubeInput.value =
                savedYouTube;

        }

    }


    /* =====================================================
       SPOTIFY
       ===================================================== */

    function getSpotifyEmbed(
        url
    ) {

        if (!url) {
            return null;
        }


        try {

            const parsed =
                new URL(url);


            if (
                !parsed.hostname.includes(
                    "spotify.com"
                )
            ) {

                return null;

            }


            const parts =
                parsed.pathname
                    .split("/")
                    .filter(Boolean);


            if (
                parts.length < 2
            ) {

                return null;

            }


            const type =
                parts[0];


            const id =
                parts[1];


            const allowed = [
                "track",
                "album",
                "playlist",
                "artist",
                "show",
                "episode"
            ];


            if (
                !allowed.includes(
                    type
                )
            ) {

                return null;

            }


            return (
                "https://open.spotify.com/embed/" +
                type +
                "/" +
                encodeURIComponent(id) +
                "?utm_source=generator"
            );

        } catch (error) {

            return null;

        }

    }


    function playSpotify() {

        if (
            !spotifyInput ||
            !spotifyEmbed
        ) {

            return;

        }


        const raw =
            spotifyInput.value.trim();


        const embed =
            getSpotifyEmbed(
                raw
            );


        if (!embed) {

            spotifyEmbed.innerHTML = `

                <div
                    style="
                        padding:20px;
                        color:rgba(255,255,255,.55);
                        text-align:center;
                    "
                >
                    Invalid Spotify URL
                </div>

            `;


            return;

        }


        localStorage.setItem(
            STORAGE.spotifyUrl,
            raw
        );


        spotifyEmbed.innerHTML = `

            <iframe
                src="${escapeHTML(embed)}"
                allow="
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    fullscreen;
                    picture-in-picture
                "
                loading="lazy"
                style="
                    width:100%;
                    height:100%;
                    min-height:420px;
                    border:0;
                    border-radius:16px;
                "
            ></iframe>

        `;

    }


    if (spotifyPlay) {

        spotifyPlay.addEventListener(
            "click",
            playSpotify
        );

    }


    if (spotifyInput) {

        spotifyInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    playSpotify();

                }

            }
        );


        const savedSpotify =
            localStorage.getItem(
                STORAGE.spotifyUrl
            );


        if (
            savedSpotify &&
            !spotifyInput.value
        ) {

            spotifyInput.value =
                savedSpotify;

        }

    }


    /* =====================================================
       SOUNDCLOUD
       ===================================================== */

    let soundCloudInput = null;
    let soundCloudButton = null;
    let soundCloudEmbed = null;
    let soundCloudOpenButton = null;


    function getSoundCloudSource() {

        return document.querySelector(
            '.rakkez-media-source[data-rakkez-source="soundcloud"]'
        );

    }


    function getSoundCloudWidgetUrl(
        sourceUrl
    ) {

        const safe =
            safeUrl(
                sourceUrl
            );


        if (!safe) {

            return null;

        }


        return (
            "https://w.soundcloud.com/player/?" +
            "url=" +
            encodeURIComponent(
                safe
            ) +
            "&color=%23000000" +
            "&auto_play=true" +
            "&hide_related=false" +
            "&show_comments=true" +
            "&show_user=true" +
            "&show_reposts=false" +
            "&show_teaser=true" +
            "&visual=true"
        );

    }


    function isSoundCloudUrl(
        value
    ) {

        try {

            const parsed =
                new URL(
                    value
                );


            const hostname =
                parsed.hostname
                    .toLowerCase()
                    .replace(
                        /^www\./,
                        ""
                    );


            return (
                hostname ===
                    "soundcloud.com" ||
                hostname ===
                    "on.soundcloud.com"
            );

        } catch (error) {

            return false;

        }

    }


    function ensureSoundCloudUI() {

        const source =
            getSoundCloudSource();


        if (!source) {

            return;

        }


        if (
            source.dataset.rakkezBuilt ===
            "true"
        ) {

            return;

        }


        source.dataset.rakkezBuilt =
            "true";


        source.innerHTML = `

            <div class="rakkez-external-panel rakkez-soundcloud-panel">

                <div class="rakkez-external-toolbar">

                    <input
                        type="url"
                        class="rakkez-external-input"
                        id="rakkezSoundCloudInput"
                        placeholder="Paste SoundCloud track or playlist URL..."
                        autocomplete="off"
                        spellcheck="false"
                    >

                    <button
                        type="button"
                        class="rakkez-external-button primary"
                        id="rakkezSoundCloudPlay"
                    >
                        Play
                    </button>

                    <button
                        type="button"
                        class="rakkez-external-button"
                        id="rakkezSoundCloudOpen"
                    >
                        Open
                    </button>

                </div>


                <iframe
                    id="rakkezSoundCloudEmbed"
                    class="rakkez-soundcloud-frame"
                    title="SoundCloud Player"
                    allow="
                        autoplay
                    "
                    scrolling="no"
                    frameborder="no"
                ></iframe>


                <div class="rakkez-external-help">
                    Supports SoundCloud tracks, sets and playlists.
                </div>

            </div>

        `;


        soundCloudInput =
            document.getElementById(
                "rakkezSoundCloudInput"
            );


        soundCloudButton =
            document.getElementById(
                "rakkezSoundCloudPlay"
            );


        soundCloudEmbed =
            document.getElementById(
                "rakkezSoundCloudEmbed"
            );


        soundCloudOpenButton =
            document.getElementById(
                "rakkezSoundCloudOpen"
            );


        const saved =
            localStorage.getItem(
                STORAGE.soundcloudUrl
            );


        if (
            saved &&
            soundCloudInput
        ) {

            soundCloudInput.value =
                saved;

        }


        if (soundCloudButton) {

            soundCloudButton.addEventListener(
                "click",
                playSoundCloud
            );

        }


        if (soundCloudInput) {

            soundCloudInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        playSoundCloud();

                    }

                }
            );

        }


        if (soundCloudOpenButton) {

            soundCloudOpenButton.addEventListener(
                "click",
                openSoundCloudExternally
            );

        }

    }


    function playSoundCloud() {

        ensureSoundCloudUI();


        if (
            !soundCloudInput ||
            !soundCloudEmbed
        ) {

            return;

        }


        const raw =
            soundCloudInput.value.trim();


        if (
            !isSoundCloudUrl(
                raw
            )
        ) {

            soundCloudEmbed.removeAttribute(
                "src"
            );


            soundCloudEmbed.insertAdjacentHTML(
                "afterend",
                ""
            );


            return;

        }


        const widgetUrl =
            getSoundCloudWidgetUrl(
                raw
            );


        if (!widgetUrl) {

            return;

        }


        localStorage.setItem(
            STORAGE.soundcloudUrl,
            raw
        );


        soundCloudEmbed.src =
            widgetUrl;

    }


    function openSoundCloudExternally() {

        if (
            !soundCloudInput
        ) {

            ensureSoundCloudUI();

        }


        const raw =
            soundCloudInput
                ? soundCloudInput.value.trim()
                : "";


        if (
            isSoundCloudUrl(
                raw
            )
        ) {

            window.open(
                raw,
                "_blank",
                "noopener,noreferrer"
            );

        }

    }


    /* =====================================================
       BROWSER ENGINE
       ===================================================== */

    let browserInput = null;
    let browserFrame = null;
    let browserBackButton = null;
    let browserForwardButton = null;
    let browserReloadButton = null;
    let browserGoButton = null;
    let browserOpenButton = null;
    let browserHomeButton = null;
    let browserStatus = null;
    let browserOverlay = null;
    let browserOverlayOpenButton = null;


    let browserHistory = [];


    let browserHistoryIndex =
        -1;


    let browserCurrentUrl =
        "";


    let browserLoadTimer =
        null;


    function getBrowserSource() {

        return document.querySelector(
            '.rakkez-media-source[data-rakkez-source="browser"]'
        );

    }


    function normalizeBrowserInput(
        value
    ) {

        if (!value) {
            return null;
        }


        const raw =
            value.trim();


        if (!raw) {
            return null;
        }


        /*
         * Direct URL.
         */

        if (
            /^https?:\/\//i.test(
                raw
            )
        ) {

            return safeUrl(
                raw
            );

        }


        /*
         * Domain without protocol.
         */

        if (
            /^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(
                raw
            )
        ) {

            return safeUrl(
                "https://" +
                raw
            );

        }


        /*
         * Search query.
         */

        return (
            "https://www.google.com/search?q=" +
            encodeURIComponent(
                raw
            )
        );

    }


    function updateBrowserButtons() {

        if (browserBackButton) {

            browserBackButton.disabled =
                browserHistoryIndex <= 0;

        }


        if (browserForwardButton) {

            browserForwardButton.disabled =
                browserHistoryIndex <
                0 ||
                browserHistoryIndex >=
                browserHistory.length - 1;

        }

    }


    function saveBrowserState() {

        try {

            localStorage.setItem(
                STORAGE.browserHistory,
                JSON.stringify(
                    browserHistory
                )
            );


            localStorage.setItem(
                STORAGE.browserHistoryIndex,
                String(
                    browserHistoryIndex
                )
            );


            if (browserCurrentUrl) {

                localStorage.setItem(
                    STORAGE.browserUrl,
                    browserCurrentUrl
                );

            }

        } catch (error) {}

    }


    function loadBrowserState() {

        try {

            const savedHistory =
                localStorage.getItem(
                    STORAGE.browserHistory
                );


            const savedIndex =
                parseInt(
                    localStorage.getItem(
                        STORAGE.browserHistoryIndex
                    ),
                    10
                );


            if (
                savedHistory
            ) {

                const parsed =
                    JSON.parse(
                        savedHistory
                    );


                if (
                    Array.isArray(
                        parsed
                    )
                ) {

                    browserHistory =
                        parsed.filter(
                            function (url) {

                                return !!safeUrl(
                                    url
                                );

                            }
                        );

                }

            }


            if (
                Number.isFinite(
                    savedIndex
                )
            ) {

                browserHistoryIndex =
                    clamp(
                        savedIndex,
                        -1,
                        Math.max(
                            -1,
                            browserHistory.length - 1
                        )
                    );

            }


            if (
                browserHistoryIndex >= 0 &&
                browserHistory[
                    browserHistoryIndex
                ]
            ) {

                browserCurrentUrl =
                    browserHistory[
                        browserHistoryIndex
                    ];

            }

        } catch (error) {

            browserHistory = [];
            browserHistoryIndex = -1;

        }

    }


    function setBrowserStatus(
        message
    ) {

        if (
            browserStatus
        ) {

            browserStatus.textContent =
                message || "";

        }

    }


    function showBrowserOverlay(
        show
    ) {

        if (!browserOverlay) {
            return;
        }


        browserOverlay.classList.toggle(
            "show",
            !!show
        );

    }


    function setBrowserAddress(
        url
    ) {

        if (
            browserInput
        ) {

            browserInput.value =
                url || "";

        }

    }


    function pushBrowserHistory(
        url
    ) {

        if (!url) {
            return;
        }


        if (
            browserHistoryIndex >= 0 &&
            browserHistory[
                browserHistoryIndex
            ] === url
        ) {

            return;

        }


        browserHistory =
            browserHistory.slice(
                0,
                browserHistoryIndex + 1
            );


        browserHistory.push(
            url
        );


        browserHistoryIndex =
            browserHistory.length - 1;


        saveBrowserState();


        updateBrowserButtons();

    }


    function loadBrowserUrl(
        url,
        options
    ) {

        options =
            options || {};


        const normalized =
            normalizeBrowserInput(
                url
            );


        if (!normalized) {

            setBrowserStatus(
                "Enter a valid URL or search term."
            );


            return;

        }


        browserCurrentUrl =
            normalized;


        setBrowserAddress(
            normalized
        );


        if (
            options.addHistory !== false
        ) {

            pushBrowserHistory(
                normalized
            );

        }


        saveBrowserState();


        showBrowserOverlay(
            false
        );


        if (!browserFrame) {

            return;

        }


        clearTimeout(
            browserLoadTimer
        );


        setBrowserStatus(
            "Loading..."
        );


        browserFrame.src =
            normalized;


        /*
         * There is no reliable JavaScript API
         * that allows a parent page to detect
         * X-Frame-Options/CSP blocking for
         * cross-origin iframes.
         *
         * Therefore we provide an Open button
         * and a fallback overlay after a delay.
         */

        browserLoadTimer =
            setTimeout(
                function () {

                    if (
                        browserCurrentUrl ===
                        normalized
                    ) {

                        setBrowserStatus(
                            "If the website does not appear, it may block iframe embedding."
                        );

                    }

                },
                5000
            );


        updateBrowserButtons();

    }


    function browserGo() {

        if (
            !browserInput
        ) {

            return;

        }


        loadBrowserUrl(
            browserInput.value,
            {
                addHistory: true
            }
        );

    }


    function browserBack() {

        if (
            browserHistoryIndex <= 0
        ) {

            return;

        }


        browserHistoryIndex--;


        const url =
            browserHistory[
                browserHistoryIndex
            ];


        browserCurrentUrl =
            url;


        setBrowserAddress(
            url
        );


        if (
            browserFrame
        ) {

            browserFrame.src =
                url;

        }


        saveBrowserState();


        updateBrowserButtons();

    }


    function browserForward() {

        if (
            browserHistoryIndex < 0 ||
            browserHistoryIndex >=
            browserHistory.length - 1
        ) {

            return;

        }


        browserHistoryIndex++;


        const url =
            browserHistory[
                browserHistoryIndex
            ];


        browserCurrentUrl =
            url;


        setBrowserAddress(
            url
        );


        if (
            browserFrame
        ) {

            browserFrame.src =
                url;

        }


        saveBrowserState();


        updateBrowserButtons();

    }


    function browserReload() {

        if (
            !browserFrame
        ) {

            return;

        }


        if (
            !browserCurrentUrl
        ) {

            loadBrowserUrl(
                "https://www.google.com",
                {
                    addHistory: true
                }
            );


            return;

        }


        showBrowserOverlay(
            false
        );


        setBrowserStatus(
            "Reloading..."
        );


        try {

            browserFrame.contentWindow.location.reload();

        } catch (error) {

            browserFrame.src =
                browserCurrentUrl;

        }

    }


    function browserOpenExternal() {

        if (
            !browserCurrentUrl
        ) {

            return;

        }


        window.open(
            browserCurrentUrl,
            "_blank",
            "noopener,noreferrer"
        );

    }


    function browserHome() {

        loadBrowserUrl(
            "https://www.google.com",
            {
                addHistory: true
            }
        );

    }


    function ensureBrowserUI() {

        const source =
            getBrowserSource();


        if (!source) {

            return;

        }


        if (
            source.dataset.rakkezBuilt ===
            "true"
        ) {

            updateBrowserButtons();

            return;

        }


        source.dataset.rakkezBuilt =
            "true";


        source.innerHTML = `

            <div class="rakkez-external-panel rakkez-browser-panel">

                <div class="rakkez-browser-navigation">

                    <button
                        type="button"
                        class="rakkez-browser-nav-button"
                        id="rakkezBrowserBack"
                        title="Back"
                        aria-label="Back"
                    >
                        ←
                    </button>


                    <button
                        type="button"
                        class="rakkez-browser-nav-button"
                        id="rakkezBrowserForward"
                        title="Forward"
                        aria-label="Forward"
                    >
                        →
                    </button>


                    <button
                        type="button"
                        class="rakkez-browser-nav-button"
                        id="rakkezBrowserReload"
                        title="Reload"
                        aria-label="Reload"
                    >
                        ↻
                    </button>


                    <input
                        type="text"
                        class="rakkez-browser-address"
                        id="rakkezBrowserAddress"
                        placeholder="Search or enter website..."
                        autocomplete="off"
                        spellcheck="false"
                    >


                    <button
                        type="button"
                        class="rakkez-browser-go"
                        id="rakkezBrowserGo"
                    >
                        Go
                    </button>

                </div>


                <div class="rakkez-browser-actions">

                    <button
                        type="button"
                        class="rakkez-external-button"
                        id="rakkezBrowserHome"
                    >
                        Home
                    </button>


                    <button
                        type="button"
                        class="rakkez-external-button"
                        id="rakkezBrowserOpen"
                    >
                        Open in New Tab
                    </button>

                </div>


                <div
                    class="rakkez-browser-status"
                    id="rakkezBrowserStatus"
                >
                </div>


                <div class="rakkez-browser-frame-wrap">

                    <iframe
                        id="rakkezBrowserFrame"
                        class="rakkez-browser-frame"
                        title="RakkeZ Browser"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allow="
                            autoplay;
                            fullscreen;
                            picture-in-picture;
                            encrypted-media
                        "
                    ></iframe>


                    <div
                        class="rakkez-browser-overlay"
                        id="rakkezBrowserOverlay"
                    >

                        <div class="rakkez-browser-overlay-content">

                            <div class="rakkez-browser-overlay-title">
                                Website cannot be displayed here
                            </div>

                            <div class="rakkez-browser-overlay-text">
                                This website may block iframe embedding.
                                You can open it normally in a new browser tab.
                            </div>

                            <button
                                type="button"
                                class="rakkez-external-button primary"
                                id="rakkezBrowserOverlayOpen"
                            >
                                Open in New Tab
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        `;


        browserInput =
            document.getElementById(
                "rakkezBrowserAddress"
            );


        browserFrame =
            document.getElementById(
                "rakkezBrowserFrame"
            );


        browserBackButton =
            document.getElementById(
                "rakkezBrowserBack"
            );


        browserForwardButton =
            document.getElementById(
                "rakkezBrowserForward"
            );


        browserReloadButton =
            document.getElementById(
                "rakkezBrowserReload"
            );


        browserGoButton =
            document.getElementById(
                "rakkezBrowserGo"
            );


        browserOpenButton =
            document.getElementById(
                "rakkezBrowserOpen"
            );


        browserHomeButton =
            document.getElementById(
                "rakkezBrowserHome"
            );


        browserStatus =
            document.getElementById(
                "rakkezBrowserStatus"
            );


        browserOverlay =
            document.getElementById(
                "rakkezBrowserOverlay"
            );


        browserOverlayOpenButton =
            document.getElementById(
                "rakkezBrowserOverlayOpen"
            );


        loadBrowserState();


        if (
            browserBackButton
        ) {

            browserBackButton.addEventListener(
                "click",
                browserBack
            );

        }


        if (
            browserForwardButton
        ) {

            browserForwardButton.addEventListener(
                "click",
                browserForward
            );

        }


        if (
            browserReloadButton
        ) {

            browserReloadButton.addEventListener(
                "click",
                browserReload
            );

        }


        if (
            browserGoButton
        ) {

            browserGoButton.addEventListener(
                "click",
                browserGo
            );

        }


        if (
            browserInput
        ) {

            browserInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        browserGo();

                    }

                }
            );

        }


        if (
            browserOpenButton
        ) {

            browserOpenButton.addEventListener(
                "click",
                browserOpenExternal
            );

        }


        if (
            browserHomeButton
        ) {

            browserHomeButton.addEventListener(
                "click",
                browserHome
            );

        }


        if (
            browserOverlayOpenButton
        ) {

            browserOverlayOpenButton.addEventListener(
                "click",
                browserOpenExternal
            );

        }


        if (
            browserFrame
        ) {

            browserFrame.addEventListener(
                "load",
                function () {

                    clearTimeout(
                        browserLoadTimer
                    );


                    setBrowserStatus(
                        browserCurrentUrl
                            ? "Loaded"
                            : ""
                    );

                }
            );

        }


        if (
            browserCurrentUrl
        ) {

            setBrowserAddress(
                browserCurrentUrl
            );


            if (
                browserFrame
            ) {

                browserFrame.src =
                    browserCurrentUrl;

            }

        } else {

            browserHome();

        }


        updateBrowserButtons();

    }


    /* =====================================================
       LOCAL MUSIC
       ===================================================== */

    function saveLocalNames() {

        localStorage.setItem(
            STORAGE.localTracks,
            JSON.stringify(
                LOCAL_TRACKS.map(
                    function (track) {

                        return track.title;

                    }
                )
            )
        );

    }


    function renderLocalTracks() {

        if (!localList) {
            return;
        }


        localList.innerHTML =
            "";


        LOCAL_TRACKS.forEach(
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
                    "rakkez-local-track";


                item.innerHTML = `

                    <div
                        class="rakkez-local-track-icon"
                    >
                        ♪
                    </div>

                    <div
                        class="rakkez-local-track-info"
                    >

                        <div
                            class="rakkez-local-track-name"
                        >
                            ${escapeHTML(
                                track.title
                            )}
                        </div>

                        <div
                            class="rakkez-local-track-meta"
                        >
                            Local Music
                        </div>

                    </div>

                `;


                item.addEventListener(
                    "click",
                    function () {

                        const globalIndex =
                            PLAYLIST.length +
                            index;


                        loadTrack(
                            globalIndex,
                            true
                        );

                    }
                );


                localList.appendChild(
                    item
                );

            }
        );

    }


    if (localFile) {

        localFile.addEventListener(
            "change",
            function () {

                const files =
                    Array.from(
                        localFile.files ||
                        []
                    );


                files.forEach(
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
                                null,

                            type:
                                "local",

                            isLocal:
                                true

                        });

                    }
                );


                saveLocalNames();


                renderLocalTracks();


                renderPlaylist();

            }
        );

    }


    /* =====================================================
       EFFECT ENGINE
       ===================================================== */

    const effectPlayers =
        Object.create(null);


    function getEffectStorageKey(
        effect,
        suffix
    ) {

        return (
            "rakkez_effect_" +
            effect.id +
            "_" +
            suffix
        );

    }


    function getEffectVolume(
        effect
    ) {

        const saved =
            parseFloat(
                localStorage.getItem(
                    getEffectStorageKey(
                        effect,
                        "volume"
                    )
                )
            );


        if (
            Number.isFinite(saved)
        ) {

            return clamp(
                saved,
                0,
                1
            );

        }


        return clamp(
            effect.defaultVolume,
            0,
            1
        );

    }


    function createEffectPlayer(
        effect
    ) {

        if (
            effectPlayers[effect.id]
        ) {

            return effectPlayers[
                effect.id
            ];

        }


        const player = {

            effect:
                effect,

            audio:
                null,

            volume:
                getEffectVolume(
                    effect
                )

        };


        player.audio =
            new Audio();


        player.audio.preload =
            "auto";


        player.audio.loop =
            true;


        player.audio.volume =
            player.volume;


        player.audio.src =
            effect.src;


        player.audio.load();


        player.audio.addEventListener(
            "error",
            function () {

                console.error(
                    "RakkeZ Effect ERROR:",
                    effect.name,
                    "Source:",
                    effect.src,
                    player.audio.error
                );

            }
        );


        effectPlayers[
            effect.id
        ] = player;


        return player;

    }


    AMBIENT_EFFECTS.forEach(
        createEffectPlayer
    );


    /* =====================================================
       EFFECTS CONTAINER
       ===================================================== */

    function getEffectsSource() {

        return document.getElementById(
            "rakkezEffectsSource"
        );

    }


    function getOrCreateEffectsContainer(
        source
    ) {

        if (!source) {
            return null;
        }


        let container =
            source.querySelector(
                "#rakkezEffectsContainer"
            );


        if (!container) {

            container =
                document.createElement(
                    "div"
                );


            container.id =
                "rakkezEffectsContainer";


            container.className =
                "rakkez-effects-container";


            source.appendChild(
                container
            );

        }


        return container;

    }


    /* =====================================================
       REMOVE OLD EFFECT CARDS
       ===================================================== */

    function removeOldEffectCards(
        source,
        container
    ) {

        if (!source) {
            return;
        }


        source.querySelectorAll(
            ".rakkez-effect-card"
        ).forEach(
            function (card) {

                card.remove();

            }
        );


        source.querySelectorAll(
            "[data-rakkez-effect]"
        ).forEach(
            function (element) {

                if (
                    element !== container &&
                    !element.closest(
                        "#rakkezEffectsContainer"
                    )
                ) {

                    element.remove();

                }

            }
        );


        AMBIENT_EFFECTS.forEach(
            function (effect) {

                const selectors = [

                    `[data-effect="${effect.id}"]`,

                    `[data-effect-id="${effect.id}"]`,

                    `[data-rakkez-effect="${effect.id}"]`

                ];


                selectors.forEach(
                    function (selector) {

                        source
                            .querySelectorAll(
                                selector
                            )
                            .forEach(
                                function (element) {

                                    if (
                                        element !== container &&
                                        !element.closest(
                                            "#rakkezEffectsContainer"
                                        )
                                    ) {

                                        element.remove();

                                    }

                                }
                            );

                    }
                );

            }
        );

    }


    /* =====================================================
       EFFECT UI UPDATE
       ===================================================== */

    function updateEffectCard(
        effect
    ) {

        const player =
            effectPlayers[
                effect.id
            ];


        if (!player) {
            return;
        }


        const container =
            document.getElementById(
                "rakkezEffectsContainer"
            );


        if (!container) {
            return;
        }


        const card =
            container.querySelector(
                `[data-effect="${effect.id}"]`
            );


        if (!card) {
            return;
        }


        const button =
            card.querySelector(
                "[data-effect-toggle]"
            );


        const playing =
            !!(
                player.audio &&
                !player.audio.paused
            );


        card.classList.toggle(
            "active",
            playing
        );


        if (button) {

            button.classList.toggle(
                "active",
                playing
            );


            button.textContent =
                playing
                    ? "Stop"
                    : "Play " +
                      effect.name;

        }

    }


    /* =====================================================
       CREATE EFFECT CARD
       ===================================================== */

    function createEffectCard(
        effect,
        container
    ) {

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


        card.dataset.effect =
            effect.id;


        card.dataset.rakkezEffect =
            effect.id;


        card.innerHTML = `

            <div class="rakkez-effect-info">

                <div class="rakkez-effect-icon">
                    ${effect.icon}
                </div>

                <div>

                    <div class="rakkez-effect-title">
                        ${escapeHTML(
                            effect.name
                        )}
                    </div>

                    <div class="rakkez-effect-subtitle">
                        ${escapeHTML(
                            effect.description
                        )}
                    </div>

                </div>

            </div>


            <button
                type="button"
                class="rakkez-effect-toggle"
                data-effect-toggle
            >
                Play ${escapeHTML(
                    effect.name
                )}
            </button>


            <div class="rakkez-effect-volume">

                <span>
                    Volume
                </span>


                <input
                    class="rakkez-effect-volume-input"
                    data-effect-volume
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value="${player.volume}"
                >


                <span
                    class="rakkez-effect-volume-value"
                    data-effect-volume-value
                >
                    ${Math.round(
                        player.volume * 100
                    )}%
                </span>

            </div>

        `;


        if (effect.image) {

            card.style.backgroundImage =
                "linear-gradient(" +
                "rgba(8,13,22,.72)," +
                "rgba(8,13,22,.92)" +
                "),url('" +
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


        const toggle =
            card.querySelector(
                "[data-effect-toggle]"
            );


        const volumeInput =
            card.querySelector(
                "[data-effect-volume]"
            );


        const volumeValue =
            card.querySelector(
                "[data-effect-volume-value]"
            );


        toggle.addEventListener(
            "click",
            function () {

                if (
                    !player.audio
                ) {

                    console.error(
                        "No Audio object for:",
                        effect.name
                    );


                    return;

                }


                if (
                    !player.audio.paused
                ) {

                    player.audio.pause();


                    updateEffectCard(
                        effect
                    );


                    return;

                }


                player.audio.volume =
                    player.volume;


                if (
                    player.audio.ended
                ) {

                    player.audio.currentTime =
                        0;

                }


                const promise =
                    player.audio.play();


                if (
                    promise &&
                    typeof promise.then ===
                    "function"
                ) {

                    promise
                        .then(
                            function () {

                                updateEffectCard(
                                    effect
                                );

                            }
                        )
                        .catch(
                            function (error) {

                                console.error(
                                    "RakkeZ Effect playback failed:",
                                    effect.name,
                                    effect.src,
                                    error
                                );


                                updateEffectCard(
                                    effect
                                );

                            }
                        );

                }

            }
        );


        volumeInput.addEventListener(
            "input",
            function () {

                const value =
                    clamp(
                        parseFloat(
                            volumeInput.value
                        ),
                        0,
                        1
                    );


                player.volume =
                    value;


                player.audio.volume =
                    value;


                localStorage.setItem(
                    getEffectStorageKey(
                        effect,
                        "volume"
                    ),
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


        player.audio.addEventListener(
            "play",
            function () {

                updateEffectCard(
                    effect
                );

            }
        );


        player.audio.addEventListener(
            "pause",
            function () {

                updateEffectCard(
                    effect
                );

            }
        );


        player.audio.addEventListener(
            "ended",
            function () {

                updateEffectCard(
                    effect
                );

            }
        );


        player.audio.addEventListener(
            "volumechange",
            function () {

                if (
                    volumeInput
                ) {

                    volumeInput.value =
                        player.audio.volume;

                }


                if (
                    volumeValue
                ) {

                    volumeValue.textContent =
                        Math.round(
                            player.audio.volume *
                            100
                        ) +
                        "%";

                }

            }
        );


        container.appendChild(
            card
        );


        updateEffectCard(
            effect
        );

    }


    /* =====================================================
       RENDER EFFECTS
       ===================================================== */

    function renderEffects() {

        const source =
            getEffectsSource();


        if (!source) {

            console.warn(
                "RakkeZ: #rakkezEffectsSource was not found."
            );


            return;

        }


        const container =
            getOrCreateEffectsContainer(
                source
            );


        if (!container) {
            return;
        }


        removeOldEffectCards(
            source,
            container
        );


        container.innerHTML =
            "";


        AMBIENT_EFFECTS.forEach(
            function (effect) {

                createEffectCard(
                    effect,
                    container
                );

            }
        );


        console.log(
            "RakkeZ Effects rendered:",
            AMBIENT_EFFECTS.map(
                function (effect) {

                    return effect.name;

                }
            )
        );

    }


    /* =====================================================
       EFFECT DEBUG
       ===================================================== */

    window.RakkeZEffects = {

        list:
            AMBIENT_EFFECTS,

        players:
            effectPlayers,

        play:
            function (id) {

                const player =
                    effectPlayers[id];


                if (
                    !player ||
                    !player.audio
                ) {

                    console.error(
                        "Effect not found:",
                        id
                    );


                    return;

                }


                player.audio.volume =
                    player.volume;


                player.audio.play()
                    .catch(
                        console.error
                    );

            },

        stop:
            function (id) {

                const player =
                    effectPlayers[id];


                if (
                    player &&
                    player.audio
                ) {

                    player.audio.pause();

                }

            },

        stopAll:
            function () {

                Object.keys(
                    effectPlayers
                ).forEach(
                    function (id) {

                        const player =
                            effectPlayers[id];


                        if (
                            player &&
                            player.audio
                        ) {

                            player.audio.pause();

                        }

                    }
                );

            }

    };


    /* =====================================================
       MEDIA PLAYER DEBUG API
       ===================================================== */

    window.RakkeZMedia = {

        play:
            playMain,

        pause:
            pauseMain,

        next:
            nextTrack,

        previous:
            previousTrack,

        load:
            function (index) {

                loadTrack(
                    index,
                    false
                );

            },

        youtube:
            playYouTube,

        soundcloud:
            playSoundCloud,

        spotify:
            playSpotify,

        browser:
            function (url) {

                ensureBrowserUI();


                if (
                    url
                ) {

                    loadBrowserUrl(
                        url
                    );

                }

            },

        switchTab:
            switchTab

    };


    /* =====================================================
       KEYBOARD
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.code ===
                "Space" &&
                !isTextInput(
                    event.target
                )
            ) {

                event.preventDefault();


                toggleMainPlay();

            }


            if (
                event.key ===
                "Escape"
            ) {

                closeMedia();

            }

        }
    );


    function isTextInput(
        element
    ) {

        if (!element) {
            return false;
        }


        const tag =
            element.tagName;


        return (
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT"
        );

    }


    /* =====================================================
       CLEANUP
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


            Object.keys(
                effectPlayers
            ).forEach(
                function (id) {

                    const player =
                        effectPlayers[id];


                    if (
                        player &&
                        player.audio
                    ) {

                        player.audio.pause();

                    }

                }
            );

        }
    );


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initialize() {

        /*
         * Add only the new infrastructure.
         * Existing HTML remains untouched.
         */

        ensureDynamicMediaUI();


        bindTabs();


        renderPlaylist();


        renderLocalTracks();


        const savedVolume =
            getSavedMainVolume();


        if (volume) {

            volume.value =
                savedVolume;


            updateMainVolume();

        }


        audio.loop =
            loop;


        loadTrack(
            currentIndex,
            false
        );


        if (shuffleButton) {

            shuffleButton.classList.toggle(
                "active",
                shuffle
            );

        }


        if (loopButton) {

            loopButton.classList.toggle(
                "active",
                loop
            );

        }


        if (autoNextButton) {

            autoNextButton.classList.toggle(
                "active",
                autoNext
            );

        }


        /*
         * Render Effects LAST.
         */

        renderEffects();


        /*
         * Prepare SoundCloud and Browser
         * without changing the existing
         * Lofi / Local / Effects systems.
         */

        ensureSoundCloudUI();


        ensureBrowserUI();


        /*
         * Rebind after dynamic elements
         * have been created.
         */

        bindTabs();


        /*
         * Restore YouTube if saved.
         */

        const savedYouTube =
            localStorage.getItem(
                STORAGE.youtubeUrl
            );


        if (
            savedYouTube &&
            youtubeInput &&
            youtubeInput.value
                .trim() === ""
        ) {

            youtubeInput.value =
                savedYouTube;

        }


        /*
         * Restore Spotify if saved.
         */

        const savedSpotify =
            localStorage.getItem(
                STORAGE.spotifyUrl
            );


        if (
            savedSpotify &&
            spotifyInput &&
            spotifyInput.value
                .trim() === ""
        ) {

            spotifyInput.value =
                savedSpotify;

        }


        console.log(
            "RakkeZ Media Player initialized successfully."
        );

        console.log(
            "RakkeZ Media Sources:",
            [
                "Lofi",
                "YouTube",
                "SoundCloud",
                "Spotify",
                "Local",
                "Browser",
                "Effects"
            ]
        );

    }


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


})();
