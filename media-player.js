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
       - SoundCloud Sets / Playlists
       - Spotify
       - Local Music

       EFFECTS:
       - Rain
       - Airplane
       - Coffee
       - Fireplace
       - Peaceful Piano

       IMPORTANT:
       - No Browser tab
       - No HTML modification required
       - No CSS file modification required
       - Existing Header / Tabs design preserved
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


    /* =====================================================
       YOUTUBE ELEMENTS
    ===================================================== */

    const youtubeInput =
        document.getElementById("rakkezYoutubeInput");

    const youtubePlay =
        document.getElementById("rakkezYoutubePlay");

    const youtubeEmbed =
        document.getElementById("rakkezYoutubeEmbed");


    /* =====================================================
       SPOTIFY ELEMENTS
    ===================================================== */

    const spotifyInput =
        document.getElementById("rakkezSpotifyInput");

    const spotifyPlay =
        document.getElementById("rakkezSpotifyPlay");

    const spotifyEmbed =
        document.getElementById("rakkezSpotifyEmbed");


    /* =====================================================
       LOCAL ELEMENTS
    ===================================================== */

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
       SOUNDCLOUD
    ===================================================== */

    let soundCloudTab = null;
    let soundCloudSource = null;
    let soundCloudInput = null;
    let soundCloudPlay = null;
    let soundCloudEmbed = null;
    let soundCloudPrevious = null;
    let soundCloudNext = null;
    let soundCloudStatus = null;

    let soundCloudWidget = null;

    let soundCloudQueue = [];
    let soundCloudCurrentIndex = 0;


    /* =====================================================
       CREATE SOUNDCLOUD UI
    ===================================================== */

    function createSoundCloudUI() {

        soundCloudInput =
            document.getElementById(
                "rakkezSoundCloudInput"
            );

        soundCloudPlay =
            document.getElementById(
                "rakkezSoundCloudPlay"
            );

        soundCloudEmbed =
            document.getElementById(
                "rakkezSoundCloudEmbed"
            );


        let tabContainer =
            document.querySelector(
                ".rakkez-media-tabs"
            );


        if (!tabContainer) {

            const firstTab =
                document.querySelector(
                    ".rakkez-media-tab"
                );


            if (firstTab) {

                tabContainer =
                    firstTab.parentElement;

            }

        }


        let sourceContainer =
            document.querySelector(
                ".rakkez-media-sources"
            );


        if (!sourceContainer) {

            const firstSource =
                document.querySelector(
                    ".rakkez-media-source"
                );


            if (firstSource) {

                sourceContainer =
                    firstSource.parentElement;

            }

        }


        /*
         * IMPORTANT:
         *
         * We ONLY add the SoundCloud tab.
         * We do not modify the existing tabs.
         */

        soundCloudSource =
            document.getElementById(
                "rakkezSoundCloudSource"
            );


        if (
            !soundCloudSource &&
            sourceContainer
        ) {

            soundCloudSource =
                document.createElement(
                    "section"
                );


            soundCloudSource.id =
                "rakkezSoundCloudSource";


            soundCloudSource.className =
                "rakkez-media-source";


            soundCloudSource.dataset.rakkezSource =
                "soundcloud";


            soundCloudSource.innerHTML = `

                <div
                    class="rakkez-soundcloud-page"
                    style="
                        width:100%;
                        display:flex;
                        flex-direction:column;
                        gap:16px;
                    "
                >

                    <div
                        style="
                            width:100%;
                            display:flex;
                            gap:10px;
                            align-items:center;
                        "
                    >

                        <input
                            id="rakkezSoundCloudInput"
                            type="url"
                            placeholder="Paste a SoundCloud track or playlist URL..."
                            autocomplete="off"
                            style="
                                flex:1;
                                min-width:0;
                            "
                        >

                        <button
                            id="rakkezSoundCloudPlay"
                            type="button"
                        >
                            Load
                        </button>

                    </div>


                    <div
                        id="rakkezSoundCloudStatus"
                        style="
                            font-size:12px;
                            line-height:1.5;
                            color:rgba(255,255,255,.55);
                        "
                    >
                        Paste a SoundCloud track, set, or playlist URL.
                    </div>


                    <div
                        id="rakkezSoundCloudEmbed"
                        style="
                            width:100%;
                            min-height:180px;
                            overflow:hidden;
                            border-radius:16px;
                            background:rgba(0,0,0,.16);
                        "
                    ></div>


                    <div
                        id="rakkezSoundCloudControls"
                        style="
                            display:flex;
                            justify-content:center;
                            align-items:center;
                            gap:10px;
                        "
                    >

                        <button
                            id="rakkezSoundCloudPrevious"
                            type="button"
                        >
                            Previous
                        </button>

                        <button
                            id="rakkezSoundCloudNext"
                            type="button"
                        >
                            Next
                        </button>

                    </div>


                    <div
                        id="rakkezSoundCloudPlaylist"
                        style="
                            width:100%;
                            display:none;
                            flex-direction:column;
                            gap:8px;
                        "
                    ></div>

                </div>

            `;


            sourceContainer.appendChild(
                soundCloudSource
            );

        }


        /*
         * Find existing SoundCloud tab.
         */

        soundCloudTab =
            document.querySelector(
                '.rakkez-media-tab[data-rakkez-source="soundcloud"]'
            );


        /*
         * Create only if missing.
         *
         * Existing Header tab design is preserved
         * because we use the exact same class.
         */

        if (
            !soundCloudTab &&
            tabContainer
        ) {

            soundCloudTab =
                document.createElement(
                    "button"
                );


            soundCloudTab.type =
                "button";


            soundCloudTab.className =
                "rakkez-media-tab";


            soundCloudTab.dataset.rakkezSource =
                "soundcloud";


            soundCloudTab.textContent =
                "SoundCloud";


            tabContainer.appendChild(
                soundCloudTab
            );

        }


        /*
         * Re-query dynamic elements.
         */

        soundCloudInput =
            document.getElementById(
                "rakkezSoundCloudInput"
            );

        soundCloudPlay =
            document.getElementById(
                "rakkezSoundCloudPlay"
            );

        soundCloudEmbed =
            document.getElementById(
                "rakkezSoundCloudEmbed"
            );

        soundCloudPrevious =
            document.getElementById(
                "rakkezSoundCloudPrevious"
            );

        soundCloudNext =
            document.getElementById(
                "rakkezSoundCloudNext"
            );

        soundCloudStatus =
            document.getElementById(
                "rakkezSoundCloudStatus"
            );


        if (soundCloudTab) {

            soundCloudTab.addEventListener(
                "click",
                function () {

                    switchTab(
                        "soundcloud"
                    );

                }
            );

        }


        if (soundCloudPlay) {

            soundCloudPlay.addEventListener(
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

                        event.preventDefault();

                        playSoundCloud();

                    }

                }
            );

        }


        if (soundCloudPrevious) {

            soundCloudPrevious.addEventListener(
                "click",
                function () {

                    soundCloudPreviousTrack();

                }
            );

        }


        if (soundCloudNext) {

            soundCloudNext.addEventListener(
                "click",
                function () {

                    soundCloudNextTrack();

                }
            );

        }

    }


    /* =====================================================
       SOUNDCLOUD URL
    ===================================================== */

    function getSoundCloudUrl(
        url
    ) {

        if (!url) {
            return null;
        }


        try {

            const parsed =
                new URL(url);


            const hostname =
                parsed.hostname
                    .toLowerCase()
                    .replace(
                        /^www\./,
                        ""
                    );


            if (
                hostname !==
                "soundcloud.com"
            ) {

                return null;

            }


            if (
                !parsed.pathname ||
                parsed.pathname === "/"
            ) {

                return null;

            }


            return parsed.href;

        } catch (error) {

            return null;

        }

    }


    /* =====================================================
       SOUNDCLOUD WIDGET API
    ===================================================== */

    function loadSoundCloudWidgetAPI(
        callback
    ) {

        if (
            window.SC &&
            typeof window.SC.Widget ===
            "function"
        ) {

            callback();

            return;

        }


        const existingScript =
            document.querySelector(
                'script[data-rakkez-soundcloud-widget]'
            );


        if (existingScript) {

            const check =
                setInterval(
                    function () {

                        if (
                            window.SC &&
                            typeof window.SC.Widget ===
                            "function"
                        ) {

                            clearInterval(
                                check
                            );

                            callback();

                        }

                    },
                    100
                );


            setTimeout(
                function () {

                    clearInterval(
                        check
                    );

                },
                10000
            );


            return;

        }


        const script =
            document.createElement(
                "script"
            );


        script.src =
            "https://w.soundcloud.com/player/api.js";


        script.async =
            true;


        script.dataset.rakkezSoundcloudWidget =
            "true";


        script.onload =
            function () {

                if (
                    window.SC &&
                    typeof window.SC.Widget ===
                    "function"
                ) {

                    callback();

                }

            };


        script.onerror =
            function () {

                console.warn(
                    "RakkeZ: SoundCloud Widget API could not be loaded."
                );

            };


        document.head.appendChild(
            script
        );

    }


    /* =====================================================
       SOUNDCLOUD QUEUE
    ===================================================== */

    function clearSoundCloudPlaylist() {

        const list =
            document.getElementById(
                "rakkezSoundCloudPlaylist"
            );


        if (!list) {
            return;
        }


        list.innerHTML =
            "";


        list.style.display =
            "none";

    }


    function showSoundCloudPlaylist() {

        const list =
            document.getElementById(
                "rakkezSoundCloudPlaylist"
            );


        if (!list) {
            return;
        }


        list.innerHTML =
            "";


        if (
            !soundCloudQueue.length
        ) {

            list.style.display =
                "none";

            return;

        }


        list.style.display =
            "flex";


        soundCloudQueue.forEach(
            function (
                item,
                index
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.dataset.soundcloudIndex =
                    String(index);


                button.style.cssText = `
                    width:100%;
                    display:flex;
                    align-items:center;
                    gap:12px;
                    padding:11px 12px;
                    border-radius:12px;
                    border:1px solid rgba(255,255,255,.07);
                    background:rgba(255,255,255,.035);
                    color:inherit;
                    cursor:pointer;
                    text-align:left;
                `;


                button.innerHTML = `

                    <span
                        style="
                            width:28px;
                            min-width:28px;
                            height:28px;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            border-radius:8px;
                            background:rgba(255,255,255,.07);
                            font-size:12px;
                        "
                    >
                        ${index + 1}
                    </span>

                    <span
                        style="
                            min-width:0;
                            flex:1;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                            font-size:13px;
                        "
                    >
                        ${escapeHTML(
                            item.title ||
                            "SoundCloud Track " +
                            (index + 1)
                        )}
                    </span>

                `;


                button.addEventListener(
                    "click",
                    function () {

                        playSoundCloudQueueItem(
                            index
                        );

                    }
                );


                list.appendChild(
                    button
                );

            }
        );


        updateSoundCloudPlaylistUI();

    }


    function updateSoundCloudPlaylistUI() {

        const list =
            document.getElementById(
                "rakkezSoundCloudPlaylist"
            );


        if (!list) {
            return;
        }


        list
            .querySelectorAll(
                "button[data-soundcloud-index]"
            )
            .forEach(
                function (
                    button,
                    index
                ) {

                    const active =
                        index ===
                        soundCloudCurrentIndex;


                    button.style.background =
                        active
                            ? "rgba(255,255,255,.10)"
                            : "rgba(255,255,255,.035)";


                    button.style.borderColor =
                        active
                            ? "rgba(255,255,255,.15)"
                            : "rgba(255,255,255,.07)";

                }
            );

    }


    function playSoundCloudQueueItem(
        index
    ) {

        if (
            !soundCloudQueue.length
        ) {

            return;

        }


        index =
            clamp(
                index,
                0,
                soundCloudQueue.length - 1
            );


        soundCloudCurrentIndex =
            index;


        const item =
            soundCloudQueue[index];


        if (
            soundCloudWidget &&
            item &&
            item.id &&
            typeof soundCloudWidget.skip ===
            "function"
        ) {

            /*
             * SoundCloud Widget API uses
             * skip(index) for playlist items.
             */

            soundCloudWidget.skip(
                index
            );


            updateSoundCloudPlaylistUI();


            return;

        }


        if (
            soundCloudWidget &&
            typeof soundCloudWidget.play ===
            "function"
        ) {

            soundCloudWidget.play();

        }


        updateSoundCloudPlaylistUI();

    }


    function soundCloudNextTrack() {

        if (
            soundCloudWidget &&
            soundCloudQueue.length
        ) {

            const next =
                (
                    soundCloudCurrentIndex +
                    1
                ) %
                soundCloudQueue.length;


            soundCloudCurrentIndex =
                next;


            if (
                typeof soundCloudWidget.skip ===
                "function"
            ) {

                soundCloudWidget.skip(
                    next
                );

            }


            updateSoundCloudPlaylistUI();


            return;

        }


        if (
            soundCloudWidget &&
            typeof soundCloudWidget.next ===
            "function"
        ) {

            soundCloudWidget.next();

        }

    }


    function soundCloudPreviousTrack() {

        if (
            soundCloudWidget &&
            soundCloudQueue.length
        ) {

            const previous =
                (
                    soundCloudCurrentIndex -
                    1 +
                    soundCloudQueue.length
                ) %
                soundCloudQueue.length;


            soundCloudCurrentIndex =
                previous;


            if (
                typeof soundCloudWidget.skip ===
                "function"
            ) {

                soundCloudWidget.skip(
                    previous
                );

            }


            updateSoundCloudPlaylistUI();


            return;

        }


        if (
            soundCloudWidget &&
            typeof soundCloudWidget.prev ===
            "function"
        ) {

            soundCloudWidget.prev();

        }

    }


    /* =====================================================
       SOUNDCLOUD PLAY
    ===================================================== */

    function playSoundCloud() {

        if (
            !soundCloudInput ||
            !soundCloudEmbed
        ) {

            return;

        }


        const originalUrl =
            soundCloudInput.value.trim();


        const soundCloudUrl =
            getSoundCloudUrl(
                originalUrl
            );


        if (!soundCloudUrl) {

            soundCloudEmbed.innerHTML = `

                <div
                    style="
                        padding:24px;
                        text-align:center;
                        color:rgba(255,255,255,.55);
                    "
                >
                    Invalid SoundCloud URL
                </div>

            `;


            clearSoundCloudPlaylist();


            return;

        }


        soundCloudWidget =
            null;


        soundCloudQueue =
            [];


        soundCloudCurrentIndex =
            0;


        clearSoundCloudPlaylist();


        /*
         * The official SoundCloud Widget
         * is used directly.
         */

        soundCloudEmbed.innerHTML = `

            <iframe
                id="rakkezSoundCloudFrame"
                title="SoundCloud Player"
                allow="autoplay"
                scrolling="no"
                frameborder="no"
                src="https://w.soundcloud.com/player/?url=${encodeURIComponent(soundCloudUrl)}&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&color=%23000000"
                style="
                    width:100%;
                    height:166px;
                    border:0;
                    display:block;
                    border-radius:16px;
                "
            ></iframe>

        `;


        if (soundCloudStatus) {

            soundCloudStatus.textContent =
                "SoundCloud loaded.";

        }


        loadSoundCloudWidgetAPI(
            function () {

                const frame =
                    document.getElementById(
                        "rakkezSoundCloudFrame"
                    );


                if (
                    !frame ||
                    !window.SC ||
                    typeof window.SC.Widget !==
                    "function"
                ) {

                    return;

                }


                soundCloudWidget =
                    window.SC.Widget(
                        frame
                    );


                soundCloudWidget.bind(
                    window.SC.Widget.Events.READY,
                    function () {

                        /*
                         * Retrieve playlist / set items.
                         */

                        if (
                            typeof soundCloudWidget.getSounds ===
                            "function"
                        ) {

                            soundCloudWidget.getSounds(
                                function (sounds) {

                                    if (
                                        Array.isArray(
                                            sounds
                                        )
                                    ) {

                                        soundCloudQueue =
                                            sounds.map(
                                                function (
                                                    sound
                                                ) {

                                                    return {

                                                        id:
                                                            sound.id,

                                                        title:
                                                            sound.title ||
                                                            "SoundCloud Track",

                                                        permalink:
                                                            sound.permalink_url ||
                                                            null

                                                    };

                                                }
                                            );


                                        if (
                                            soundCloudQueue.length
                                        ) {

                                            showSoundCloudPlaylist();

                                        }

                                    }

                                }
                            );

                        }


                        if (
                            typeof soundCloudWidget.play ===
                            "function"
                        ) {

                            soundCloudWidget.play();

                        }

                    }
                );


                soundCloudWidget.bind(
                    window.SC.Widget.Events.PLAY_PROGRESS,
                    function () {

                        if (
                            typeof soundCloudWidget.getCurrentSoundIndex ===
                            "function"
                        ) {

                            soundCloudWidget.getCurrentSoundIndex(
                                function (index) {

                                    if (
                                        Number.isFinite(
                                            index
                                        )
                                    ) {

                                        soundCloudCurrentIndex =
                                            index;

                                        updateSoundCloudPlaylistUI();

                                    }

                                }
                            );

                        }

                    }
                );


                soundCloudWidget.bind(
                    window.SC.Widget.Events.PLAY,
                    function () {

                        if (
                            soundCloudStatus
                        ) {

                            soundCloudStatus.textContent =
                                "SoundCloud is playing.";

                        }

                    }
                );


                soundCloudWidget.bind(
                    window.SC.Widget.Events.PAUSE,
                    function () {

                        if (
                            soundCloudStatus
                        ) {

                            soundCloudStatus.textContent =
                                "SoundCloud paused.";

                        }

                    }
                );


                soundCloudWidget.bind(
                    window.SC.Widget.Events.FINISH,
                    function () {

                        if (
                            soundCloudQueue.length
                        ) {

                            soundCloudNextTrack();

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       TABS
    ===================================================== */

    function switchTab(
        name
    ) {

        const currentTabs =
            document.querySelectorAll(
                ".rakkez-media-tab"
            );


        const currentSources =
            document.querySelectorAll(
                ".rakkez-media-source"
            );


        currentTabs.forEach(
            function (tab) {

                tab.classList.toggle(
                    "active",
                    tab.dataset.rakkezSource ===
                    name
                );

            }
        );


        currentSources.forEach(
            function (source) {

                source.classList.toggle(
                    "active",
                    source.dataset.rakkezSource ===
                    name
                );

            }
        );

    }


    tabs.forEach(
        function (tab) {

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

    let youtubePlayer = null;

    let youtubePlaylist = [];

    let youtubePlaylistIndex = 0;

    let youtubeApiReady = false;

    let youtubeApiCallbacks = [];


    /* =====================================================
       LOAD YOUTUBE IFRAME API
    ===================================================== */

    function loadYouTubeAPI(
        callback
    ) {

        if (
            window.YT &&
            typeof window.YT.Player ===
            "function"
        ) {

            youtubeApiReady =
                true;


            callback();

            return;

        }


        youtubeApiCallbacks.push(
            callback
        );


        if (
            document.getElementById(
                "rakkezYouTubeIframeAPI"
            )
        ) {

            return;

        }


        const previousReady =
            window.onYouTubeIframeAPIReady;


        window.onYouTubeIframeAPIReady =
            function () {

                youtubeApiReady =
                    true;


                if (
                    typeof previousReady ===
                    "function"
                ) {

                    try {

                        previousReady();

                    } catch (error) {

                        console.warn(
                            "Previous YouTube API callback failed:",
                            error
                        );

                    }

                }


                const callbacks =
                    youtubeApiCallbacks.slice();


                youtubeApiCallbacks =
                    [];


                callbacks.forEach(
                    function (
                        callback
                    ) {

                        try {

                            callback();

                        } catch (error) {

                            console.error(
                                "RakkeZ YouTube callback error:",
                                error
                            );

                        }

                    }
                );

            };


        const script =
            document.createElement(
                "script"
            );


        script.id =
            "rakkezYouTubeIframeAPI";


        script.src =
            "https://www.youtube.com/iframe_api";


        script.async =
            true;


        document.head.appendChild(
            script
        );

    }


    /* =====================================================
       YOUTUBE URL PARSER
    ===================================================== */

    function getYouTubeData(
        url
    ) {

        if (!url) {
            return null;
        }


        try {

            const parsed =
                new URL(url);


            const hostname =
                parsed.hostname
                    .toLowerCase()
                    .replace(
                        /^www\./,
                        ""
                    );


            const isYouTube =
                hostname === "youtube.com" ||
                hostname === "youtu.be" ||
                hostname === "music.youtube.com";


            if (!isYouTube) {

                return null;

            }


            let videoId =
                null;


            let playlistId =
                parsed.searchParams.get(
                    "list"
                );


            if (
                hostname ===
                "youtu.be"
            ) {

                videoId =
                    parsed.pathname
                        .replace(
                            /^\/+/,
                            ""
                        )
                        .split("/")[0];

            }


            if (
                hostname === "youtube.com" ||
                hostname === "music.youtube.com"
            ) {

                if (
                    parsed.searchParams.has(
                        "v"
                    )
                ) {

                    videoId =
                        parsed.searchParams.get(
                            "v"
                        );

                }

            }


            const parts =
                parsed.pathname
                    .split("/")
                    .filter(Boolean);


            const embedIndex =
                parts.indexOf(
                    "embed"
                );


            if (
                embedIndex !== -1 &&
                parts[embedIndex + 1]
            ) {

                videoId =
                    parts[
                        embedIndex + 1
                    ];

            }


            const shortsIndex =
                parts.indexOf(
                    "shorts"
                );


            if (
                shortsIndex !== -1 &&
                parts[shortsIndex + 1]
            ) {

                videoId =
                    parts[
                        shortsIndex + 1
                    ];

            }


            if (videoId) {

                videoId =
                    videoId
                        .split("?")[0]
                        .split("&")[0]
                        .split("#")[0];

            }


            if (playlistId) {

                playlistId =
                    playlistId.trim();

            }


            if (
                !videoId &&
                !playlistId
            ) {

                return null;

            }


            return {

                videoId:
                    videoId || null,

                playlistId:
                    playlistId || null

            };

        } catch (error) {

            return null;

        }

    }


    /* =====================================================
       YOUTUBE PLAYLIST UI
    ===================================================== */

    function getYouTubePlaylistContainer() {

        if (!youtubeEmbed) {
            return null;
        }


        let container =
            document.getElementById(
                "rakkezYoutubePlaylistContainer"
            );


        if (!container) {

            container =
                document.createElement(
                    "div"
                );


            container.id =
                "rakkezYoutubePlaylistContainer";


            container.style.cssText = `
                width:100%;
                margin-top:14px;
                display:none;
                flex-direction:column;
                gap:8px;
            `;


            youtubeEmbed.parentElement
                ?.appendChild(
                    container
                );

        }


        return container;

    }


    function createYouTubePlaylistUI() {

        const container =
            getYouTubePlaylistContainer();


        if (!container) {
            return;
        }


        container.innerHTML =
            "";


        if (
            !youtubePlaylist.length
        ) {

            container.style.display =
                "none";

            return;

        }


        container.style.display =
            "flex";


        const heading =
            document.createElement(
                "div"
            );


        heading.style.cssText = `
            font-size:12px;
            color:rgba(255,255,255,.55);
            padding:4px 2px;
        `;


        heading.textContent =
            "Playlist";


        container.appendChild(
            heading
        );


        const list =
            document.createElement(
                "div"
            );


        list.style.cssText = `
            width:100%;
            max-height:260px;
            overflow-y:auto;
            display:flex;
            flex-direction:column;
            gap:7px;
        `;


        youtubePlaylist.forEach(
            function (
                video,
                index
            ) {

                const item =
                    document.createElement(
                        "button"
                    );


                item.type =
                    "button";


                item.dataset.youtubeIndex =
                    String(index);


                item.style.cssText = `
                    width:100%;
                    display:flex;
                    align-items:center;
                    gap:10px;
                    padding:9px 10px;
                    border-radius:10px;
                    border:1px solid rgba(255,255,255,.07);
                    background:rgba(255,255,255,.035);
                    color:inherit;
                    cursor:pointer;
                    text-align:left;
                `;


                const thumbnail =
                    video.videoId
                        ? "https://i.ytimg.com/vi/" +
                          encodeURIComponent(
                              video.videoId
                          ) +
                          "/default.jpg"
                        : "";


                item.innerHTML = `

                    <div
                        style="
                            width:70px;
                            min-width:70px;
                            height:40px;
                            border-radius:7px;
                            overflow:hidden;
                            background:rgba(255,255,255,.05);
                        "
                    >
                        ${
                            thumbnail
                                ? `
                                    <img
                                        src="${thumbnail}"
                                        alt=""
                                        style="
                                            width:100%;
                                            height:100%;
                                            object-fit:cover;
                                        "
                                    >
                                `
                                : ""
                        }
                    </div>

                    <div
                        style="
                            min-width:0;
                            flex:1;
                        "
                    >

                        <div
                            style="
                                font-size:12px;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                            "
                        >
                            ${escapeHTML(
                                video.title ||
                                "Video " +
                                (index + 1)
                            )}
                        </div>

                        <div
                            style="
                                margin-top:3px;
                                font-size:10px;
                                color:rgba(255,255,255,.42);
                            "
                        >
                            ${index + 1}
                        </div>

                    </div>

                `;


                item.addEventListener(
                    "click",
                    function () {

                        playYouTubePlaylistItem(
                            index
                        );

                    }
                );


                list.appendChild(
                    item
                );

            }
        );


        container.appendChild(
            list
        );


        updateYouTubePlaylistUI();

    }


    function updateYouTubePlaylistUI() {

        const container =
            document.getElementById(
                "rakkezYoutubePlaylistContainer"
            );


        if (!container) {
            return;
        }


        container
            .querySelectorAll(
                "button[data-youtube-index]"
            )
            .forEach(
                function (
                    button,
                    index
                ) {

                    const active =
                        index ===
                        youtubePlaylistIndex;


                    button.style.background =
                        active
                            ? "rgba(255,255,255,.10)"
                            : "rgba(255,255,255,.035)";


                    button.style.borderColor =
                        active
                            ? "rgba(255,255,255,.15)"
                            : "rgba(255,255,255,.07)";

                }
            );

    }


    function playYouTubePlaylistItem(
        index
    ) {

        if (
            !youtubePlaylist.length
        ) {

            return;

        }


        index =
            clamp(
                index,
                0,
                youtubePlaylist.length - 1
            );


        youtubePlaylistIndex =
            index;


        const video =
            youtubePlaylist[index];


        if (
            !youtubePlayer ||
            !video
        ) {

            return;

        }


        if (
            typeof youtubePlayer.loadVideoById ===
            "function"
        ) {

            youtubePlayer.loadVideoById(
                video.videoId
            );

        }


        updateYouTubePlaylistUI();

    }


    function youtubeNextTrack() {

        if (
            youtubePlaylist.length
        ) {

            const next =
                (
                    youtubePlaylistIndex +
                    1
                ) %
                youtubePlaylist.length;


            playYouTubePlaylistItem(
                next
            );


            return;

        }


        if (
            youtubePlayer &&
            typeof youtubePlayer.nextVideo ===
            "function"
        ) {

            youtubePlayer.nextVideo();

        }

    }


    function youtubePreviousTrack() {

        if (
            youtubePlaylist.length
        ) {

            const previous =
                (
                    youtubePlaylistIndex -
                    1 +
                    youtubePlaylist.length
                ) %
                youtubePlaylist.length;


            playYouTubePlaylistItem(
                previous
            );


            return;

        }


        if (
            youtubePlayer &&
            typeof youtubePlayer.previousVideo ===
            "function"
        ) {

            youtubePlayer.previousVideo();

        }

    }


    /* =====================================================
       YOUTUBE PLAYER CREATION
    ===================================================== */

    function createYouTubePlayer(
        data
    ) {

        if (!youtubeEmbed) {
            return;
        }


        youtubeEmbed.innerHTML =
            "";


        const playerElement =
            document.createElement(
                "div"
            );


        playerElement.id =
            "rakkezYoutubePlayer";


        playerElement.style.cssText = `
            width:100%;
            min-height:300px;
            border-radius:16px;
            overflow:hidden;
        `;


        youtubeEmbed.appendChild(
            playerElement
        );


        loadYouTubeAPI(
            function () {

                if (
                    youtubePlayer &&
                    typeof youtubePlayer.destroy ===
                    "function"
                ) {

                    try {

                        youtubePlayer.destroy();

                    } catch (error) {}

                }


                const playerOptions = {

                    width:
                        "100%",

                    height:
                        "420",

                    videoId:
                        data.videoId || undefined,

                    playerVars: {

                        autoplay:
                            1,

                        controls:
                            1,

                        rel:
                            0,

                        playsinline:
                            1,

                        modestbranding:
                            1

                    },

                    events: {

                        onReady:
                            function (
                                event
                            ) {

                                if (
                                    data.playlistId &&
                                    typeof event.target.loadPlaylist ===
                                    "function"
                                ) {

                                    event.target.loadPlaylist({

                                        list:
                                            data.playlistId,

                                        index:
                                            0

                                    });

                                }

                            },


                        onStateChange:
                            function (
                                event
                            ) {

                                if (
                                    window.YT &&
                                    event.data ===
                                    window.YT.PlayerState.PLAYING
                                ) {

                                    syncYouTubePlaylist();

                                }


                                if (
                                    window.YT &&
                                    event.data ===
                                    window.YT.PlayerState.ENDED
                                ) {

                                    youtubeNextTrack();

                                }

                            },

                        onError:
                            function (
                                event
                            ) {

                                console.warn(
                                    "RakkeZ YouTube error:",
                                    event.data
                                );

                            }

                    }

                };


                youtubePlayer =
                    new YT.Player(
                        playerElement.id,
                        playerOptions
                    );


                /*
                 * If playlist-only URL was supplied,
                 * load it after player creation.
                 */

                if (
                    data.playlistId
                ) {

                    setTimeout(
                        function () {

                            if (
                                youtubePlayer &&
                                typeof youtubePlayer.loadPlaylist ===
                                "function"
                            ) {

                                youtubePlayer.loadPlaylist({

                                    list:
                                        data.playlistId,

                                    index:
                                        0

                                });

                            }

                        },
                        700
                    );

                }

            }
        );

    }


    /* =====================================================
       SYNC YOUTUBE PLAYLIST
    ===================================================== */

    function syncYouTubePlaylist() {

        if (!youtubePlayer) {
            return;
        }


        if (
            typeof youtubePlayer.getPlaylist ===
            "function"
        ) {

            const ids =
                youtubePlayer.getPlaylist();


            if (
                Array.isArray(ids) &&
                ids.length
            ) {

                const current =
                    youtubePlayer.getPlaylistIndex();


                youtubePlaylist =
                    ids.map(
                        function (
                            id,
                            index
                        ) {

                            return {

                                videoId:
                                    id,

                                title:
                                    "YouTube Video " +
                                    (index + 1)

                            };

                        }
                    );


                youtubePlaylistIndex =
                    Number.isFinite(
                        current
                    )
                        ? current
                        : 0;


                createYouTubePlaylistUI();


                /*
                 * Try to get the current video
                 * title from the player.
                 */

                updateYouTubeCurrentTitle();

            }

        }

    }


    function updateYouTubeCurrentTitle() {

        if (
            !youtubePlayer ||
            !youtubePlaylist.length
        ) {

            return;

        }


        const data =
            typeof youtubePlayer.getVideoData ===
            "function"
                ? youtubePlayer.getVideoData()
                : null;


        if (
            data &&
            data.video_id
        ) {

            const index =
                youtubePlaylist.findIndex(
                    function (
                        item
                    ) {

                        return (
                            item.videoId ===
                            data.video_id
                        );

                    }
                );


            if (index !== -1) {

                youtubePlaylistIndex =
                    index;


                if (data.title) {

                    youtubePlaylist[index].title =
                        data.title;

                }


                createYouTubePlaylistUI();

            }

        }

    }


    /* =====================================================
       PLAY YOUTUBE
    ===================================================== */

    function playYouTube() {

        if (
            !youtubeInput ||
            !youtubeEmbed
        ) {

            return;

        }


        const url =
            youtubeInput.value.trim();


        const data =
            getYouTubeData(
                url
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


            const playlistContainer =
                document.getElementById(
                    "rakkezYoutubePlaylistContainer"
                );


            if (playlistContainer) {

                playlistContainer.style.display =
                    "none";

            }


            return;

        }


        youtubePlaylist =
            [];


        youtubePlaylistIndex =
            0;


        createYouTubePlayer(
            data
        );

    }


    /* =====================================================
       YOUTUBE HINT
    ===================================================== */

    function addYouTubePlaylistHint() {

        if (!youtubeInput) {
            return;
        }


        const youtubeSource =
            youtubeInput.closest(
                ".rakkez-media-source"
            );


        if (!youtubeSource) {
            return;
        }


        if (
            youtubeSource.querySelector(
                "#rakkezYoutubePlaylistHint"
            )
        ) {

            return;

        }


        const hint =
            document.createElement(
                "div"
            );


        hint.id =
            "rakkezYoutubePlaylistHint";


        hint.style.cssText = `
            margin-top:10px;
            padding:10px 12px;
            border-radius:10px;
            background:rgba(255,255,255,.04);
            border:1px solid rgba(255,255,255,.07);
            color:rgba(255,255,255,.55);
            font-size:12px;
            line-height:1.55;
        `;


        hint.innerHTML = `

            <strong
                style="
                    color:rgba(255,255,255,.78);
                    font-weight:600;
                "
            >
                Tip:
            </strong>

            You can paste a YouTube
            <strong
                style="
                    color:rgba(255,255,255,.78);
                    font-weight:600;
                "
            >
                Playlist
            </strong>
            URL here too.

            The playlist will appear below the player,
            and you can choose any song directly.

        `;


        const row =
            youtubeInput.parentElement;


        if (row) {

            row.insertAdjacentElement(
                "afterend",
                hint
            );

        } else {

            youtubeSource.appendChild(
                hint
            );

        }

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

                    event.preventDefault();

                    playYouTube();

                }

            }
        );

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
                id +
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


        const embed =
            getSpotifyEmbed(
                spotifyInput.value.trim()
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


        spotifyEmbed.innerHTML = `

            <iframe
                src="${embed}"
                allow="
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    fullscreen;
                    picture-in-picture
                "
                loading="lazy"
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

                    event.preventDefault();

                    playSpotify();

                }

            }
        );

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


            if (
                youtubePlayer &&
                typeof youtubePlayer.destroy ===
                "function"
            ) {

                try {

                    youtubePlayer.destroy();

                } catch (error) {}

            }


            if (
                soundCloudWidget &&
                typeof soundCloudWidget.pause ===
                "function"
            ) {

                try {

                    soundCloudWidget.pause();

                } catch (error) {}

            }

        }
    );


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    function initialize() {

        /*
         * SoundCloud is created automatically.
         *
         * Existing Header / Tab design is untouched.
         */

        createSoundCloudUI();


        /*
         * YouTube playlist help.
         */

        addYouTubePlaylistHint();


        /*
         * Main playlist.
         */

        renderPlaylist();


        /*
         * Local music.
         */

        renderLocalTracks();


        /*
         * Main volume.
         */

        const savedVolume =
            getSavedMainVolume();


        if (volume) {

            volume.value =
                savedVolume;


            updateMainVolume();

        }


        audio.loop =
            loop;


        /*
         * Load initial Lofi track.
         */

        loadTrack(
            currentIndex,
            false
        );


        /*
         * Buttons state.
         */

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
         * Effects.
         */

        renderEffects();


        /*
         * Make sure YouTube API is ready
         * only when YouTube is actually used.
         */


        console.log(
            "RakkeZ Media Player initialized successfully."
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
