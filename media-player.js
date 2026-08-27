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
       - Lofi / Local / Effects system preserved
       - SoundCloud is injected automatically
       - No HTML/CSS file modification required
       - Existing Header / Tabs design is preserved
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
    let soundCloudList = null;
    let soundCloudTitle = null;
    let soundCloudArtist = null;
    let soundCloudArtwork = null;
    let soundCloudCount = null;
    let soundCloudWidget = null;
    let soundCloudFrame = null;
    let soundCloudReady = false;
    let soundCloudTracks = [];
    let soundCloudCurrentIndex = 0;
    let soundCloudRequestToken = 0;


    /* =====================================================
       SOUNDCLOUD STYLE
       ===================================================== */

    function injectSoundCloudStyles() {

        if (
            document.getElementById(
                "rakkezSoundCloudStyles"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "rakkezSoundCloudStyles";


        style.textContent = `

            #rakkezSoundCloudSource
            .rakkez-sc-shell {

                width:100%;
                display:flex;
                flex-direction:column;
                gap:18px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-input-row {

                display:flex;
                gap:10px;
                align-items:center;
                width:100%;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-input {

                flex:1;
                min-width:0;
                width:100%;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-load {

                flex:0 0 auto;
                min-width:82px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-status {

                font-size:12px;
                line-height:1.5;
                color:rgba(255,255,255,.48);
                min-height:18px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-player {

                width:100%;
                overflow:hidden;
                border-radius:20px;
                border:1px solid rgba(255,255,255,.07);
                background:
                    linear-gradient(
                        135deg,
                        rgba(255,255,255,.055),
                        rgba(255,255,255,.018)
                    );
                box-shadow:
                    0 18px 55px rgba(0,0,0,.18);
                padding:16px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-now {

                display:flex;
                align-items:center;
                gap:13px;
                margin-bottom:14px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-art {

                width:54px;
                height:54px;
                flex:0 0 54px;
                border-radius:14px;
                overflow:hidden;
                background:
                    linear-gradient(
                        135deg,
                        rgba(255,255,255,.10),
                        rgba(255,255,255,.03)
                    );
                display:flex;
                align-items:center;
                justify-content:center;
                color:rgba(255,255,255,.45);
                font-size:20px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-art img {

                width:100%;
                height:100%;
                display:block;
                object-fit:cover;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-now-info {

                min-width:0;
                flex:1;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-now-label {

                font-size:10px;
                text-transform:uppercase;
                letter-spacing:.11em;
                color:rgba(255,255,255,.38);
                margin-bottom:3px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-now-title {

                font-size:14px;
                line-height:1.3;
                font-weight:650;
                color:rgba(255,255,255,.92);
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-now-artist {

                font-size:11px;
                line-height:1.3;
                color:rgba(255,255,255,.45);
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                margin-top:3px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-frame-wrap {

                width:100%;
                height:166px;
                overflow:hidden;
                border-radius:14px;
                background:rgba(0,0,0,.18);
                border:1px solid rgba(255,255,255,.045);

            }


            #rakkezSoundCloudSource
            .rakkez-sc-frame {

                width:100%;
                height:166px;
                display:block;
                border:0;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-list-header {

                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:12px;
                margin-top:2px;
                margin-bottom:4px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-list-title {

                font-size:12px;
                font-weight:650;
                color:rgba(255,255,255,.78);

            }


            #rakkezSoundCloudSource
            .rakkez-sc-list-count {

                font-size:11px;
                color:rgba(255,255,255,.38);

            }


            #rakkezSoundCloudSource
            .rakkez-sc-list {

                display:flex;
                flex-direction:column;
                gap:6px;
                max-height:310px;
                overflow-y:auto;
                overflow-x:hidden;
                padding-right:3px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-list::-webkit-scrollbar {

                width:5px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-list::-webkit-scrollbar-track {

                background:transparent;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-list::-webkit-scrollbar-thumb {

                background:rgba(255,255,255,.12);
                border-radius:99px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-track {

                width:100%;
                border:1px solid transparent;
                border-radius:13px;
                background:rgba(255,255,255,.025);
                padding:8px;
                display:flex;
                align-items:center;
                gap:10px;
                text-align:left;
                cursor:pointer;
                color:inherit;
                transition:
                    background .18s ease,
                    border-color .18s ease,
                    transform .18s ease;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-track:hover {

                background:rgba(255,255,255,.055);
                transform:translateY(-1px);

            }


            #rakkezSoundCloudSource
            .rakkez-sc-track.active {

                background:rgba(255,255,255,.075);
                border-color:rgba(255,255,255,.10);

            }


            #rakkezSoundCloudSource
            .rakkez-sc-track-art {

                width:40px;
                height:40px;
                flex:0 0 40px;
                border-radius:10px;
                overflow:hidden;
                background:rgba(255,255,255,.06);
                display:flex;
                align-items:center;
                justify-content:center;
                color:rgba(255,255,255,.38);
                font-size:15px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-track-art img {

                width:100%;
                height:100%;
                display:block;
                object-fit:cover;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-track-info {

                min-width:0;
                flex:1;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-track-name {

                font-size:12px;
                line-height:1.35;
                font-weight:600;
                color:rgba(255,255,255,.82);
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-track-artist {

                font-size:10px;
                line-height:1.35;
                color:rgba(255,255,255,.40);
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                margin-top:2px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-track-number {

                width:23px;
                flex:0 0 23px;
                text-align:center;
                font-size:10px;
                color:rgba(255,255,255,.28);

            }


            #rakkezSoundCloudSource
            .rakkez-sc-actions {

                display:flex;
                justify-content:center;
                gap:8px;
                margin-top:2px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-action {

                min-width:105px;

            }


            #rakkezSoundCloudSource
            .rakkez-sc-empty {

                padding:20px 12px;
                text-align:center;
                color:rgba(255,255,255,.36);
                font-size:11px;

            }


            @media (max-width:640px) {

                #rakkezSoundCloudSource
                .rakkez-sc-input-row {

                    flex-direction:column;
                    align-items:stretch;

                }


                #rakkezSoundCloudSource
                .rakkez-sc-load {

                    width:100%;

                }


                #rakkezSoundCloudSource
                .rakkez-sc-player {

                    padding:12px;

                }


                #rakkezSoundCloudSource
                .rakkez-sc-list {

                    max-height:260px;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       SOUNDCLOUD UI
       ===================================================== */

    function createSoundCloudUI() {

        injectSoundCloudStyles();


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

                <div class="rakkez-sc-shell">

                    <div class="rakkez-sc-input-row">

                        <input
                            id="rakkezSoundCloudInput"
                            class="rakkez-sc-input"
                            type="url"
                            placeholder="Paste a SoundCloud track or playlist URL..."
                            autocomplete="off"
                            spellcheck="false"
                        >

                        <button
                            id="rakkezSoundCloudPlay"
                            class="rakkez-sc-load"
                            type="button"
                        >
                            Load
                        </button>

                    </div>


                    <div
                        id="rakkezSoundCloudStatus"
                        class="rakkez-sc-status"
                    >
                        Paste a SoundCloud track, set, or playlist URL.
                    </div>


                    <div
                        id="rakkezSoundCloudEmbed"
                    ></div>

                </div>

            `;


            sourceContainer.appendChild(
                soundCloudSource
            );

        }


        soundCloudTab =
            document.querySelector(
                '[data-rakkez-source="soundcloud"]'
            );


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

        soundCloudStatus =
            document.getElementById(
                "rakkezSoundCloudStatus"
            );


        if (
            soundCloudTab &&
            !soundCloudTab.dataset.rakkezBound
        ) {

            soundCloudTab.dataset.rakkezBound =
                "true";


            soundCloudTab.addEventListener(
                "click",
                function () {

                    switchTab(
                        "soundcloud"
                    );

                }
            );

        }


        if (
            soundCloudPlay &&
            !soundCloudPlay.dataset.rakkezBound
        ) {

            soundCloudPlay.dataset.rakkezBound =
                "true";


            soundCloudPlay.addEventListener(
                "click",
                playSoundCloud
            );

        }


        if (
            soundCloudInput &&
            !soundCloudInput.dataset.rakkezBound
        ) {

            soundCloudInput.dataset.rakkezBound =
                "true";


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

            let value =
                String(url).trim();


            if (
                !/^https?:\/\//i.test(
                    value
                )
            ) {

                value =
                    "https://" +
                    value;

            }


            const parsed =
                new URL(value);


            const hostname =
                parsed.hostname
                    .toLowerCase()
                    .replace(
                        /^www\./,
                        ""
                    );


            if (
                hostname !==
                "soundcloud.com" &&
                hostname !==
                "on.soundcloud.com"
            ) {

                return null;

            }


            if (
                hostname ===
                "on.soundcloud.com"
            ) {

                return parsed.href;

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
       SOUNDCLOUD API
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

            const started =
                Date.now();


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

                            return;

                        }


                        if (
                            Date.now() -
                            started >
                            10000
                        ) {

                            clearInterval(
                                check
                            );

                        }

                    },
                    100
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
       SOUNDCLOUD HELPERS
       ===================================================== */

    function getSoundCloudArtwork(
        track
    ) {

        if (!track) {
            return "";
        }


        return (
            track.artwork_url ||
            track.user &&
            track.user.avatar_url ||
            ""
        );

    }


    function getSoundCloudArtist(
        track
    ) {

        if (!track) {
            return "SoundCloud";

        }


        if (
            track.user &&
            track.user.username
        ) {

            return track.user.username;

        }


        return "SoundCloud";

    }


    function updateSoundCloudNowPlaying(
        track,
        index
    ) {

        if (!track) {
            return;
        }


        soundCloudCurrentIndex =
            Number.isFinite(index)
                ? index
                : soundCloudCurrentIndex;


        if (soundCloudTitle) {

            soundCloudTitle.textContent =
                track.title ||
                "SoundCloud Track";

        }


        if (soundCloudArtist) {

            soundCloudArtist.textContent =
                getSoundCloudArtist(
                    track
                );

        }


        if (soundCloudArtwork) {

            const image =
                getSoundCloudArtwork(
                    track
                );


            if (image) {

                soundCloudArtwork.innerHTML = `

                    <img
                        src="${escapeHTML(image)}"
                        alt=""
                    >

                `;

            } else {

                soundCloudArtwork.textContent =
                    "♪";

            }

        }


        updateSoundCloudListUI();

    }


    function updateSoundCloudListUI() {

        if (!soundCloudList) {
            return;
        }


        soundCloudList
            .querySelectorAll(
                ".rakkez-sc-track"
            )
            .forEach(
                function (
                    item,
                    index
                ) {

                    item.classList.toggle(
                        "active",
                        index ===
                        soundCloudCurrentIndex
                    );

                }
            );

    }


    function renderSoundCloudTracks() {

        if (!soundCloudList) {
            return;
        }


        soundCloudList.innerHTML =
            "";


        if (!soundCloudTracks.length) {

            soundCloudList.innerHTML = `

                <div class="rakkez-sc-empty">
                    No track list is available for this SoundCloud source.
                </div>

            `;


            return;

        }


        soundCloudTracks.forEach(
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
                    "rakkez-sc-track";


                item.dataset.index =
                    String(index);


                const image =
                    getSoundCloudArtwork(
                        track
                    );


                item.innerHTML = `

                    <div class="rakkez-sc-track-number">
                        ${index + 1}
                    </div>

                    <div class="rakkez-sc-track-art">

                        ${
                            image
                                ? `
                                    <img
                                        src="${escapeHTML(image)}"
                                        alt=""
                                        loading="lazy"
                                    >
                                `
                                : "♪"
                        }

                    </div>

                    <div class="rakkez-sc-track-info">

                        <div class="rakkez-sc-track-name">
                            ${escapeHTML(
                                track.title ||
                                "Untitled"
                            )}
                        </div>

                        <div class="rakkez-sc-track-artist">
                            ${escapeHTML(
                                getSoundCloudArtist(
                                    track
                                )
                            )}
                        </div>

                    </div>

                `;


                item.addEventListener(
                    "click",
                    function () {

                        playSoundCloudTrack(
                            index
                        );

                    }
                );


                soundCloudList.appendChild(
                    item
                );

            }
        );


        updateSoundCloudListUI();

    }


    function playSoundCloudTrack(
        index
    ) {

        if (
            !soundCloudWidget ||
            !soundCloudReady
        ) {

            return;

        }


        if (
            !Number.isFinite(index) ||
            index < 0 ||
            index >= soundCloudTracks.length
        ) {

            return;

        }


        soundCloudCurrentIndex =
            index;


        const track =
            soundCloudTracks[index];


        updateSoundCloudNowPlaying(
            track,
            index
        );


        if (
            typeof soundCloudWidget.skip ===
            "function"
        ) {

            try {

                soundCloudWidget.skip(
                    index
                );

            } catch (error) {

                console.warn(
                    "RakkeZ SoundCloud skip failed:",
                    error
                );

            }

        }


        if (
            typeof soundCloudWidget.play ===
            "function"
        ) {

            try {

                const promise =
                    soundCloudWidget.play();


                if (
                    promise &&
                    typeof promise.catch ===
                    "function"
                ) {

                    promise.catch(
                        function (error) {

                            console.warn(
                                "RakkeZ SoundCloud play failed:",
                                error
                            );

                        }
                    );

                }

            } catch (error) {

                console.warn(
                    "RakkeZ SoundCloud play failed:",
                    error
                );

            }

        }

    }


    function clearSoundCloudUI() {

        if (soundCloudEmbed) {

            soundCloudEmbed.innerHTML =
                "";

        }


        soundCloudWidget =
            null;


        soundCloudFrame =
            null;


        soundCloudReady =
            false;


        soundCloudTracks =
            [];


        soundCloudCurrentIndex =
            0;


        soundCloudList =
            null;


        soundCloudTitle =
            null;


        soundCloudArtist =
            null;


        soundCloudArtwork =
            null;


        soundCloudCount =
            null;


        soundCloudPrevious =
            null;


        soundCloudNext =
            null;

    }


    function buildSoundCloudPlayerUI() {

        if (!soundCloudEmbed) {
            return;
        }


        soundCloudEmbed.innerHTML = `

            <div class="rakkez-sc-player">

                <div class="rakkez-sc-now">

                    <div
                        id="rakkezSoundCloudArtwork"
                        class="rakkez-sc-art"
                    >
                        ♪
                    </div>

                    <div class="rakkez-sc-now-info">

                        <div class="rakkez-sc-now-label">
                            Now Playing
                        </div>

                        <div
                            id="rakkezSoundCloudTitle"
                            class="rakkez-sc-now-title"
                        >
                            SoundCloud
                        </div>

                        <div
                            id="rakkezSoundCloudArtist"
                            class="rakkez-sc-now-artist"
                        >
                            SoundCloud
                        </div>

                    </div>

                </div>


                <div class="rakkez-sc-frame-wrap">

                    <iframe
                        id="rakkezSoundCloudFrame"
                        class="rakkez-sc-frame"
                        title="SoundCloud Player"
                        allow="autoplay"
                        scrolling="no"
                        frameborder="no"
                    ></iframe>

                </div>


                <div class="rakkez-sc-actions">

                    <button
                        id="rakkezSoundCloudPrevious"
                        class="rakkez-sc-action"
                        type="button"
                    >
                        Previous
                    </button>

                    <button
                        id="rakkezSoundCloudNext"
                        class="rakkez-sc-action"
                        type="button"
                    >
                        Next
                    </button>

                </div>


                <div class="rakkez-sc-list-header">

                    <div class="rakkez-sc-list-title">
                        Tracks
                    </div>

                    <div
                        id="rakkezSoundCloudCount"
                        class="rakkez-sc-list-count"
                    >
                        0 tracks
                    </div>

                </div>


                <div
                    id="rakkezSoundCloudList"
                    class="rakkez-sc-list"
                >

                    <div class="rakkez-sc-empty">
                        Loading tracks...
                    </div>

                </div>

            </div>

        `;


        soundCloudFrame =
            document.getElementById(
                "rakkezSoundCloudFrame"
            );


        soundCloudPrevious =
            document.getElementById(
                "rakkezSoundCloudPrevious"
            );


        soundCloudNext =
            document.getElementById(
                "rakkezSoundCloudNext"
            );


        soundCloudList =
            document.getElementById(
                "rakkezSoundCloudList"
            );


        soundCloudTitle =
            document.getElementById(
                "rakkezSoundCloudTitle"
            );


        soundCloudArtist =
            document.getElementById(
                "rakkezSoundCloudArtist"
            );


        soundCloudArtwork =
            document.getElementById(
                "rakkezSoundCloudArtwork"
            );


        soundCloudCount =
            document.getElementById(
                "rakkezSoundCloudCount"
            );


        if (soundCloudPrevious) {

            soundCloudPrevious.addEventListener(
                "click",
                function () {

                    if (
                        !soundCloudWidget ||
                        !soundCloudReady
                    ) {

                        return;

                    }


                    if (
                        soundCloudTracks.length <=
                        1
                    ) {

                        return;

                    }


                    if (
                        soundCloudCurrentIndex >
                        0
                    ) {

                        playSoundCloudTrack(
                            soundCloudCurrentIndex - 1
                        );

                    } else {

                        playSoundCloudTrack(
                            soundCloudTracks.length - 1
                        );

                    }

                }
            );

        }


        if (soundCloudNext) {

            soundCloudNext.addEventListener(
                "click",
                function () {

                    if (
                        !soundCloudWidget ||
                        !soundCloudReady
                    ) {

                        return;

                    }


                    if (
                        soundCloudTracks.length <=
                        1
                    ) {

                        return;

                    }


                    if (
                        soundCloudCurrentIndex <
                        soundCloudTracks.length - 1
                    ) {

                        playSoundCloudTrack(
                            soundCloudCurrentIndex + 1
                        );

                    } else {

                        playSoundCloudTrack(
                            0
                        );

                    }

                }
            );

        }

    }


    function getSoundCloudWidgetOptions(
        soundCloudUrl
    ) {

        return (
            "https://w.soundcloud.com/player/?" +
            "url=" +
            encodeURIComponent(
                soundCloudUrl
            ) +
            "&auto_play=false" +
            "&hide_related=true" +
            "&show_comments=false" +
            "&show_user=true" +
            "&show_reposts=false" +
            "&show_teaser=false" +
            "&visual=false" +
            "&color=%23000000"
        );

    }


    function bindSoundCloudWidget(
        token
    ) {

        loadSoundCloudWidgetAPI(
            function () {

                if (
                    token !==
                    soundCloudRequestToken
                ) {

                    return;

                }


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

                    if (soundCloudStatus) {

                        soundCloudStatus.textContent =
                            "SoundCloud player could not be initialized.";

                    }


                    return;

                }


                soundCloudFrame =
                    frame;


                soundCloudWidget =
                    window.SC.Widget(
                        frame
                    );


                soundCloudReady =
                    false;


                soundCloudWidget.bind(
                    window.SC.Widget.Events.READY,
                    function () {

                        if (
                            token !==
                            soundCloudRequestToken
                        ) {

                            return;

                        }


                        soundCloudReady =
                            true;


                        if (
                            soundCloudStatus
                        ) {

                            soundCloudStatus.textContent =
                                "SoundCloud loaded successfully.";

                        }


                        /*
                         * Get the actual playlist/set tracks
                         * from the official widget API.
                         */

                        if (
                            typeof soundCloudWidget.getSounds ===
                            "function"
                        ) {

                            soundCloudWidget.getSounds(
                                function (
                                    sounds
                                ) {

                                    if (
                                        token !==
                                        soundCloudRequestToken
                                    ) {

                                        return;

                                    }


                                    soundCloudTracks =
                                        Array.isArray(
                                            sounds
                                        )
                                            ? sounds
                                            : [];


                                    if (
                                        soundCloudCount
                                    ) {

                                        soundCloudCount.textContent =
                                            soundCloudTracks.length +
                                            (
                                                soundCloudTracks.length === 1
                                                    ? " track"
                                                    : " tracks"
                                            );

                                    }


                                    renderSoundCloudTracks();


                                    if (
                                        soundCloudTracks.length
                                    ) {

                                        updateSoundCloudNowPlaying(
                                            soundCloudTracks[0],
                                            0
                                        );

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
                                "Playing on SoundCloud.";

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
                    window.SC.Widget.Events.PLAY_PROGRESS,
                    function (data) {

                        if (
                            !data ||
                            !soundCloudTracks.length
                        ) {

                            return;

                        }

                    }
                );


                soundCloudWidget.bind(
                    window.SC.Widget.Events.FINISH,
                    function () {

                        if (
                            !soundCloudTracks.length
                        ) {

                            return;

                        }


                        if (
                            soundCloudCurrentIndex <
                            soundCloudTracks.length - 1
                        ) {

                            playSoundCloudTrack(
                                soundCloudCurrentIndex + 1
                            );

                        } else {

                            playSoundCloudTrack(
                                0
                            );

                        }

                    }
                );


                soundCloudWidget.bind(
                    window.SC.Widget.Events.ERROR,
                    function () {

                        if (
                            soundCloudStatus
                        ) {

                            soundCloudStatus.textContent =
                                "SoundCloud could not play this source.";

                        }

                    }
                );


                /*
                 * SoundCloud widget exposes CURRENT_SOUND
                 * for the track that is actually playing.
                 */

                if (
                    window.SC.Widget.Events &&
                    window.SC.Widget.Events.PLAY_PROGRESS
                ) {

                    /*
                     * No aggressive polling is used here.
                     * The list remains controlled by RakkeZ.
                     */

                }

            }
        );

    }


    /* =====================================================
       PLAY SOUNDCLOUD
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
                    class="rakkez-sc-empty"
                    style="
                        padding:24px;
                    "
                >
                    Invalid SoundCloud URL
                </div>

            `;


            if (soundCloudStatus) {

                soundCloudStatus.textContent =
                    "Please paste a valid SoundCloud track, set, or playlist URL.";

            }


            return;

        }


        soundCloudRequestToken++;


        const token =
            soundCloudRequestToken;


        clearSoundCloudUI();


        buildSoundCloudPlayerUI();


        if (soundCloudStatus) {

            soundCloudStatus.textContent =
                "Loading SoundCloud...";

        }


        const frame =
            document.getElementById(
                "rakkezSoundCloudFrame"
            );


        if (!frame) {
            return;
        }


        frame.src =
            getSoundCloudWidgetOptions(
                soundCloudUrl
            );


        bindSoundCloudWidget(
            token
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

    function getYouTubeData(
        url
    ) {

        if (!url) {
            return null;
        }


        try {

            let value =
                String(url).trim();


            if (
                !/^https?:\/\//i.test(
                    value
                )
            ) {

                value =
                    "https://" +
                    value;

            }


            const parsed =
                new URL(value);


            const hostname =
                parsed.hostname
                    .toLowerCase()
                    .replace(
                        /^www\./,
                        ""
                    );


            const isYouTube =
                hostname ===
                    "youtube.com" ||
                hostname ===
                    "youtu.be" ||
                hostname ===
                    "music.youtube.com";


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
                hostname ===
                    "youtube.com" ||
                hostname ===
                    "music.youtube.com"
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
                        .split("#")[0]
                        .trim();

            }


            if (playlistId) {

                playlistId =
                    playlistId
                        .trim();

            }


            /*
             * YouTube playlist IDs normally start with PL,
             * but we do not enforce that because YouTube
             * also uses other list formats.
             */

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

            console.warn(
                "RakkeZ YouTube URL parsing failed:",
                error
            );


            return null;

        }

    }


    function getYouTubeOrigin() {

        try {

            if (
                window.location.protocol ===
                "http:" ||
                window.location.protocol ===
                "https:"
            ) {

                return (
                    window.location.origin
                );

            }

        } catch (error) {}


        return null;

    }


    function buildYouTubeEmbedUrl(
        data
    ) {

        if (!data) {
            return null;
        }


        let path =
            "";


        const params =
            new URLSearchParams();


        /*
         * IMPORTANT:
         *
         * autoplay is intentionally NOT enabled.
         *
         * This prevents the iframe from immediately
         * attempting playback before the user interacts
         * with the YouTube player.
         */

        params.set(
            "rel",
            "0"
        );


        params.set(
            "playsinline",
            "1"
        );


        params.set(
            "enablejsapi",
            "1"
        );


        params.set(
            "modestbranding",
            "1"
        );


        params.set(
            "iv_load_policy",
            "3"
        );


        const origin =
            getYouTubeOrigin();


        if (origin) {

            params.set(
                "origin",
                origin
            );

        }


        /*
         * Playlist only.
         */

        if (
            data.playlistId &&
            !data.videoId
        ) {

            path =
                "https://www.youtube.com/embed/videoseries";

            params.set(
                "list",
                data.playlistId
            );

        }


        /*
         * Video + Playlist.
         */

        else if (
            data.videoId &&
            data.playlistId
        ) {

            path =
                "https://www.youtube.com/embed/" +
                encodeURIComponent(
                    data.videoId
                );


            params.set(
                "list",
                data.playlistId
            );

        }


        /*
         * Video only.
         */

        else if (
            data.videoId
        ) {

            path =
                "https://www.youtube.com/embed/" +
                encodeURIComponent(
                    data.videoId
                );

        }


        else {

            return null;

        }


        return (
            path +
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


            return;

        }


        const embedUrl =
            buildYouTubeEmbedUrl(
                data
            );


        if (!embedUrl) {

            return;

        }


        /*
         * Remove previous iframe first.
         * This prevents old YouTube frames from
         * continuing to exist underneath the new one.
         */

        youtubeEmbed.innerHTML =
            "";


        const iframe =
            document.createElement(
                "iframe"
            );


        iframe.src =
            embedUrl;


        iframe.title =
            "YouTube Player";


        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";


        iframe.allowFullscreen =
            true;


        iframe.referrerPolicy =
            "strict-origin-when-cross-origin";


        iframe.style.width =
            "100%";


        iframe.style.height =
            "100%";


        iframe.style.border =
            "0";


        iframe.style.display =
            "block";


        youtubeEmbed.appendChild(
            iframe
        );

    }


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

            Paste a YouTube video or playlist URL.
            The playlist controls are provided by YouTube.

        `;


        const row =
            youtubeInput.parentElement;


        if (row) {

            row.insertAdjacentElement(
                "afterend",
                hint
            );

        } else {

            youtubeSource.insertBefore(
                hint,
                youtubeSource.firstChild
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
       REMOVE ALL OLD EFFECT CARDS
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


            /*
             * Stop SoundCloud widget communication
             * by removing its iframe.
             */

            if (soundCloudFrame) {

                try {

                    soundCloudFrame.src =
                        "about:blank";

                } catch (error) {}

            }

        }
    );


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initialize() {

        /*
         * Create SoundCloud.
         */

        createSoundCloudUI();


        /*
         * Add YouTube hint.
         */

        addYouTubePlaylistHint();


        /*
         * Render main playlist.
         */

        renderPlaylist();


        /*
         * Render local music.
         */

        renderLocalTracks();


        /*
         * Restore main volume.
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
         * Load current local/Lofi track
         * without autoplay.
         */

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
         * Render effects.
         */

        renderEffects();


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
