(function () {

    "use strict";

    /* =====================================================
       RAKKEZ MEDIA PLAYER
       FULL REPLACEMENT
       
       IMPORTANT:
       - Lofi/player = music only
       - Effects = Rain / Airplane / Coffee / Fireplace /
                  Peaceful Piano
       - Multiple effects can play at the same time
       - Each effect has independent volume
       - Effects are NOT part of the main playlist
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
       MAIN LOFI PLAYLIST
       
       IMPORTANT:
       ONLY REAL MUSIC GOES HERE.
       
       Do NOT put Rain / Airplane / Coffee /
       Fireplace / Peaceful Piano here.
       ===================================================== */

    const PLAYLIST = [

        {
            title: "بحب الله موسيقى مع بيز هادي",
            artist: "Ahmed S",
            src: "Music/Guitar.mp3",
            artwork: "assets/blog/effects/Guitar.jpg",
            type: "lofi"
        }

    ];


    /* =====================================================
       AMBIENT EFFECTS
       
       Add new effects ONLY HERE.
       
       Every effect:
       - has its own Audio object
       - loops independently
       - has independent volume
       - can play simultaneously with other effects
       ===================================================== */

    const AMBIENT_EFFECTS = [

        {
            id: "rain",
            name: "Rain",
            icon: "🌧️",
            image: "assets/blog/effects/RAIN.jpg",
            src: "rain.mp3",
            defaultVolume: 0.50
        },

        {
            id: "airplane",
            name: "Airplane",
            icon: "✈️",
            image: null,
            src: "Airplane.mp3",
            defaultVolume: 0.50
        },

        {
            id: "coffee",
            name: "Coffee",
            icon: "☕",
            image: "assets/blog/effects/CAFFEE.jpg",
            src: "Caffee.mp3",
            defaultVolume: 0.50
        },

        {
            id: "fireplace",
            name: "Fireplace",
            icon: "🔥",
            image: "assets/blog/effects/Fireplace.jfif",
            src: "FirePlace.mp3",
            defaultVolume: 0.50
        },

        {
            id: "peaceful-piano",
            name: "Peaceful Piano",
            icon: "🎹",
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
       MAIN AUDIO ENGINE
       ===================================================== */

    const audio = new Audio();

    audio.preload = "metadata";

    audio.controls = false;


    let currentIndex = parseInt(
        localStorage.getItem(STORAGE.track),
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
       HELPERS
       ===================================================== */

    function clamp(value, min, max) {

        return Math.max(
            min,
            Math.min(max, value)
        );

    }


    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds) ||
            seconds < 0
        ) {

            return "0:00";

        }


        const minutes =
            Math.floor(seconds / 60);

        const secs =
            Math.floor(seconds % 60);


        return (
            minutes +
            ":" +
            String(secs).padStart(2, "0")
        );

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


        loadingTimer = setTimeout(
            function () {

                if (
                    token !== currentLoadToken
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


    function setMediaStatus(status) {

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


    function handleTrackError(reason) {

        clearLoadingTimer();


        currentTrackFailed = true;


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
            "RakkeZ Media: Track unavailable:",
            audio.src,
            reason || ""
        );


        setMediaStatus("error");

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


        currentIndex = index;


        const track =
            tracks[currentIndex];


        if (!track) {

            return;

        }


        currentIsLocal =
            !!track.isLocal;


        currentTrackFailed = false;


        clearLoadingTimer();


        currentLoadToken++;


        const token =
            currentLoadToken;


        audio.pause();


        audio.currentTime = 0;


        audio.src = track.src;


        audio.loop = loop;


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

            startLoadingGuard(token);


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

            if (tracks.length === 1) {

                currentIndex = 0;

            } else {

                let next;

                do {

                    next =
                        Math.floor(
                            Math.random() *
                            tracks.length
                        );

                } while (
                    next === currentIndex
                );


                currentIndex = next;

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
       PLAYLIST UI
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
                function (element, index) {

                    element.classList.toggle(
                        "active",
                        index === currentIndex
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
            function (track, index) {

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
                                ? `<img
                                    src="${track.artwork}"
                                    alt=""
                                    style="
                                        width:100%;
                                        height:100%;
                                        object-fit:cover;
                                        border-radius:10px;
                                    "
                                >`
                                : "♪"
                        }

                    </div>

                    <div class="rakkez-track-details">

                        <div class="rakkez-track-title">
                            ${escapeHTML(track.title)}
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


    function escapeHTML(value) {

        return String(value || "")
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

    function switchTab(name) {

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


        if (
            !audio.paused
        ) {

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
                    event.target === overlay
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
       VOLUME
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
       AUDIO EVENTS
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
                        ) * 100
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
       MINI PLAYER CONTROLS
       ===================================================== */

    if (miniPlay) {

        miniPlay.addEventListener(
            "click",
            function () {

                toggleMainPlay();

            }
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

    function getYouTubeId(url) {

        if (!url) {
            return null;
        }


        try {

            const parsed =
                new URL(url);


            if (
                parsed.hostname.includes(
                    "youtu.be"
                )
            ) {

                return (
                    parsed.pathname
                        .replace(
                            "/",
                            ""
                        )
                );

            }


            if (
                parsed.hostname.includes(
                    "youtube.com"
                )
            ) {

                if (
                    parsed.searchParams.has(
                        "v"
                    )
                ) {

                    return parsed
                        .searchParams
                        .get("v");

                }


                const parts =
                    parsed.pathname
                        .split("/")
                        .filter(Boolean);


                const index =
                    parts.indexOf("embed");


                if (
                    index !== -1 &&
                    parts[index + 1]
                ) {

                    return parts[
                        index + 1
                    ];

                }

            }

        } catch (error) {

            return null;

        }


        return null;

    }


    function playYouTube() {

        if (
            !youtubeInput ||
            !youtubeEmbed
        ) {

            return;

        }


        const id =
            getYouTubeId(
                youtubeInput.value.trim()
            );


        if (!id) {

            youtubeEmbed.innerHTML =
                `<div
                    style="
                        padding:20px;
                        color:rgba(255,255,255,.55);
                        text-align:center;
                    "
                >
                    Invalid YouTube URL
                </div>`;

            return;

        }


        youtubeEmbed.innerHTML = `

            <iframe
                src="https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1"
                allow="
                    autoplay;
                    encrypted-media;
                    picture-in-picture
                "
                allowfullscreen
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

    }


    /* =====================================================
       SPOTIFY
       ===================================================== */

    function getSpotifyEmbed(url) {

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
                !allowed.includes(type)
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

            spotifyEmbed.innerHTML =
                `<div
                    style="
                        padding:20px;
                        color:rgba(255,255,255,.55);
                        text-align:center;
                    "
                >
                    Invalid Spotify URL
                </div>`;

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

                    playSpotify();

                }

            }
        );

    }


    /* =====================================================
       LOCAL MUSIC
       ===================================================== */

    function loadSavedLocalNames() {

        try {

            const saved =
                JSON.parse(
                    localStorage.getItem(
                        STORAGE.localTracks
                    ) || "[]"
                );


            if (
                Array.isArray(saved)
            ) {

                return saved;

            }

        } catch (error) {}

        return [];

    }


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
            function (track, index) {

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
       AMBIENT EFFECT ENGINE
       
       IMPORTANT:
       This is completely independent from
       the main music player.
       
       That means:
       
       Rain + Coffee
       Rain + Fireplace
       Airplane + Piano
       Rain + Airplane + Coffee + Piano
       
       can all play together.
       ===================================================== */

    const effectPlayers = {};


    function effectStorageKey(
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
                    effectStorageKey(
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
            effect.defaultVolume || 0.5,
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


        if (
            effect.src &&
            typeof effect.src ===
            "string"
        ) {

            player.audio =
                new Audio(
                    effect.src
                );


            player.audio.loop =
                true;


            player.audio.preload =
                "metadata";


            player.audio.volume =
                player.volume;


            player.audio.addEventListener(
                "error",
                function () {

                    console.warn(
                        "RakkeZ Effect unavailable:",
                        effect.name,
                        effect.src
                    );

                }
            );

        }


        effectPlayers[
            effect.id
        ] = player;


        return player;

    }


    AMBIENT_EFFECTS.forEach(
        createEffectPlayer
    );


    /* =====================================================
       EFFECT UI
       
       We REMOVE the old manually-created
       Rain / Airplane cards first.
       
       Then we generate EXACTLY ONE card
       for each effect in AMBIENT_EFFECTS.
       
       This fixes duplicate Rain / Airplane.
       ===================================================== */

    function getEffectsContainer() {

        const source =
            document.getElementById(
                "rakkezEffectsSource"
            );


        if (!source) {
            return null;
        }


        let container =
            document.getElementById(
                "rakkezEffectsContainer"
            );


        if (container) {
            return container;
        }


        container =
            document.createElement(
                "div"
            );


        container.id =
            "rakkezEffectsContainer";


        source.appendChild(
            container
        );


        return container;

    }


    function clearOldEffectCards(
        container
    ) {

        if (!container) {
            return;
        }


        container
            .querySelectorAll(
                ".rakkez-effect-card"
            )
            .forEach(
                function (card) {

                    card.remove();

                }
            );

    }


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

                    <div
                        class="rakkez-effect-title"
                    >
                        ${escapeHTML(
                            effect.name
                        )}
                    </div>

                    <div
                        class="rakkez-effect-subtitle"
                    >
                        Ambient sound
                    </div>

                </div>

            </div>


            <button
                class="rakkez-effect-toggle"
                type="button"
                data-effect-toggle
            >
                Play ${escapeHTML(
                    effect.name
                )}
            </button>


            <div
                class="rakkez-effect-volume"
            >

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


        /* ---------------------------------------------
           PLAY / STOP
           --------------------------------------------- */

        toggle.addEventListener(
            "click",
            function () {

                if (!player.audio) {

                    toggle.textContent =
                        "Audio unavailable";


                    return;

                }


                if (
                    !player.audio.paused
                ) {

                    player.audio.pause();


                    updateEffectUI(
                        effect
                    );


                    return;

                }


                player.audio.volume =
                    player.volume;


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
                                effect.name,
                                error
                            );


                            updateEffectUI(
                                effect
                            );

                        }
                    );

                }

            }
        );


        /* ---------------------------------------------
           VOLUME
           --------------------------------------------- */

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


                if (player.audio) {

                    player.audio.volume =
                        value;

                }


                localStorage.setItem(
                    effectStorageKey(
                        effect,
                        "volume"
                    ),
                    String(value)
                );


                volumeValue.textContent =
                    Math.round(
                        value * 100
                    ) +
                    "%";

            }
        );


        /* ---------------------------------------------
           AUDIO EVENTS
           --------------------------------------------- */

        if (player.audio) {

            player.audio.addEventListener(
                "play",
                function () {

                    updateEffectUI(
                        effect
                    );

                }
            );


            player.audio.addEventListener(
                "pause",
                function () {

                    updateEffectUI(
                        effect
                    );

                }
            );


            player.audio.addEventListener(
                "ended",
                function () {

                    updateEffectUI(
                        effect
                    );

                }
            );

        }


        function updateEffectUI(
            effectToUpdate
        ) {

            const currentPlayer =
                effectPlayers[
                    effectToUpdate.id
                ];


            const playing =
                currentPlayer &&
                currentPlayer.audio &&
                !currentPlayer.audio.paused;


            card.classList.toggle(
                "active",
                !!playing
            );


            toggle.classList.toggle(
                "active",
                !!playing
            );


            toggle.textContent =
                playing
                    ? "Stop"
                    : "Play " +
                      effectToUpdate.name;

        }


        container.appendChild(
            card
        );


        updateEffectUI(
            effect
        );

    }


    function renderEffects() {

        const container =
            getEffectsContainer();


        if (!container) {

            console.warn(
                "RakkeZ: Effects container not found."
            );


            return;

        }


        /*
         * Remove every old card.
         * This specifically prevents the old
         * Rain / Airplane duplicates.
         */

        clearOldEffectCards(
            container
        );


        /*
         * Create exactly one card per effect.
         */

        AMBIENT_EFFECTS.forEach(
            function (effect) {

                createEffectCard(
                    effect,
                    container
                );

            }
        );

    }


    renderEffects();


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

        }
    );


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initialize() {

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
