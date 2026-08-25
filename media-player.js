(function () {

    "use strict";

    /* =====================================================
       RAKKEZ MEDIA PLAYER
       FULL REPLACEMENT

       MAIN PLAYER:
       - Lofi / Music only

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
            image: "assets/blog/effects/7.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 2",
            artist: "RakkeZ",
            src: "Music/lofi (2).mp3",
            image: "assets/blog/effects/4.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 3",
            artist: "RakkeZ",
            src: "Music/lofi (3).mp3",
            image: "assets/blog/effects/1.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 4",
            artist: "RakkeZ",
            src: "Music/lofi (4).mp3",
            image: "assets/blog/effects/3.png", 
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 5",
            artist: "RakkeZ",
            src: "Music/lofi (5).mp3",
            image: "assets/blog/effects/6.png",
            type: "lofi"
        },

        {
            title: "Lofi Chill Music 6",
            artist: "RakkeZ",
            src: "Music/lofi (6).mp3",
            image: "assets/blog/effects/5.png",
            type: "lofi"
        },

         {
            title: "Lofi Chill Music 7",
            artist: "RakkeZ",
            src: "Music/lofi (7).mp3",
            image: "assets/blog/effects/2.png",
            type: "lofi"
        }



    ];


    /* =====================================================
       EFFECTS
       
       ADD NEW EFFECTS ONLY HERE.
       
       IMPORTANT:
       src = exact audio file path
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
            image: null,
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
       TABS
       ===================================================== */

    function switchTab(
        name
    ) {

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

    function getYouTubeId(
        url
    ) {

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

                return parsed.pathname
                    .replace(
                        "/",
                        ""
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

                    return parsed.searchParams.get(
                        "v"
                    );

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

                    return parts[
                        embedIndex + 1
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
       
       ONE AUDIO ELEMENT PER EFFECT.
       
       IMPORTANT:
       This is NOT connected to the main audio.
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

        /*
         * NEVER create the same Audio object twice.
         */

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


        /*
         * Create ONE independent Audio.
         */

        player.audio =
            new Audio();


        player.audio.preload =
            "auto";


        player.audio.loop =
            true;


        player.audio.volume =
            player.volume;


        /*
         * Set source explicitly.
         */

        player.audio.src =
            effect.src;


        /*
         * Force browser to load the file.
         */

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


    /*
     * Create exactly ONE player for
     * every effect.
     */

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
       
       This is the important fix for:
       
       Rain
       Airplane
       Rain
       
       and other duplicates.
       ===================================================== */

    function removeOldEffectCards(
        source,
        container
    ) {

        if (!source) {
            return;
        }


        /*
         * Remove cards that were generated
         * by previous versions.
         */

        source.querySelectorAll(
            ".rakkez-effect-card"
        ).forEach(
            function (card) {

                card.remove();

            }
        );


        /*
         * Remove old effect elements
         * that may have different classes
         * but carry an effect identifier.
         */

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


        /*
         * Remove old cards using effect IDs.
         */

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


        /*
         * Background image.
         */

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


        /* =================================================
           PLAY / STOP EFFECT
           ================================================= */

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


                /*
                 * STOP
                 */

                if (
                    !player.audio.paused
                ) {

                    player.audio.pause();


                    updateEffectCard(
                        effect
                    );


                    return;

                }


                /*
                 * PLAY
                 */

                player.audio.volume =
                    player.volume;


                /*
                 * Important:
                 * Reset only if ended.
                 */

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


        /* =================================================
           EFFECT VOLUME
           ================================================= */

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


        /* =================================================
           AUDIO EVENTS
           ================================================= */

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
       
       EXACTLY ONE CARD PER EFFECT.
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


        /*
         * First remove EVERY generated
         * effect card from the source.
         */

        removeOldEffectCards(
            source,
            container
        );


        /*
         * Clear our own container completely.
         */

        container.innerHTML =
            "";


        /*
         * Now create exactly one card
         * for every effect.
         */

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


        /*
         * Render Effects LAST.
         *
         * This guarantees that the DOM
         * is ready and that old cards
         * are removed before new cards
         * are created.
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
