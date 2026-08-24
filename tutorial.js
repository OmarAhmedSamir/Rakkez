/* =========================================================
   RAKKEZ TUTORIAL
   ========================================================= */


/* =========================
   ELEMENTS
========================= */

const $ = id =>
    document.getElementById(id);


/* =========================
   TUTORIAL DATA
========================= */

const tutorialSteps = [

    {
        icon:"⏱",
        category:"GETTING STARTED",
        title:"Welcome to RakkeZ",
        description:
            "RakkeZ is a focused workspace designed to help you work on one thing at a time — without unnecessary distractions.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Focus session
                        </div>

                        <div class="demo-muted">
                            One thing at a time.
                        </div>
                    </div>

                    <div class="demo-pill">
                        FOCUS
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"🍅",
        category:"TIMER",
        title:"Pomodoro",
        description:
            "The main timer is your focus engine. Start a session, work until the timer ends, then take your break.",
        demo:`
            <div class="demo-box">

                <div class="demo-timer">
                    25:00
                </div>

                <div class="demo-progress">
                    <span></span>
                </div>

            </div>
        `
    },


    {
        icon:"☕",
        category:"TIMER",
        title:"Short & Long Breaks",
        description:
            "After a Focus session, RakkeZ can automatically switch to a Short Break. After several sessions, it can use a Long Break.",
        demo:`
            <div class="demo-box">

                <div class="media-demo">

                    <div class="media-card">
                        <div class="media-icon">☕</div>
                        <div class="media-title">
                            Short Break
                        </div>
                        <div class="media-sub">
                            Quick recovery.
                        </div>
                    </div>

                    <div class="media-card">
                        <div class="media-icon">🌙</div>
                        <div class="media-title">
                            Long Break
                        </div>
                        <div class="media-sub">
                            Longer recovery.
                        </div>
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"▶",
        category:"SMART TIMER",
        title:"Auto Start",
        description:
            "Enable Auto Start and RakkeZ will automatically begin the next timer phase when the current one finishes.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Auto Start
                        </div>

                        <div class="demo-muted">
                            Focus → Break → Focus
                        </div>
                    </div>

                    <div class="demo-pill">
                        ON
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"🧠",
        category:"SMART TIMER",
        title:"Smart Timer",
        description:
            "Smart Timer remembers your timer state locally so RakkeZ can restore it when you return.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Timer state
                        </div>

                        <div class="demo-muted">
                            Saved locally
                        </div>
                    </div>

                    <div class="demo-pill">
                        SYNCED
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"💾",
        category:"YOUR DATA",
        title:"Local Storage",
        description:
            "Your RakkeZ settings and progress are stored locally in your browser. No database is required for these features.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Your data
                        </div>

                        <div class="demo-muted">
                            Stored on this device
                        </div>
                    </div>

                    <div class="demo-pill">
                        LOCAL
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"✓",
        category:"TASKS",
        title:"Tasks",
        description:
            "Create tasks so your focus sessions have a clear purpose. Instead of simply starting a timer, know exactly what you're working on.",
        demo:`
            <div class="demo-box">

                <div class="demo-task">

                    <div class="check">
                        ✓
                    </div>

                    <div>
                        <div class="demo-title">
                            Finish Math Practice
                        </div>

                        <div class="demo-muted">
                            Today's task
                        </div>
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"🎯",
        category:"TASKS",
        title:"Current Task",
        description:
            "Choose one task as your Current Task. This keeps your attention on the exact thing you're trying to complete.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Current Task
                        </div>

                        <div class="demo-muted">
                            Finish Math Practice
                        </div>
                    </div>

                    <div class="demo-pill">
                        ACTIVE
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"⌛",
        category:"TASKS",
        title:"Task Focus Minutes",
        description:
            "RakkeZ can track how many focus minutes you spend on a task, helping you understand where your time actually goes.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Finish Math Practice
                        </div>

                        <div class="demo-muted">
                            Focus time
                        </div>
                    </div>

                    <div class="demo-pill">
                        45m
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"🎯",
        category:"DAILY GOAL",
        title:"Daily Goal",
        description:
            "Set a daily focus target. RakkeZ will show your progress toward that goal throughout the day.",
        demo:`
            <div class="demo-box">

                <div class="goal">

                    <div>
                        <div class="demo-muted">
                            Today's focus
                        </div>

                        <div class="goal-number">
                            0m
                        </div>
                    </div>

                    <div class="demo-title">
                        Goal: 4h
                    </div>

                </div>

                <div class="goal-bar">
                    <span></span>
                </div>

            </div>
        `
    },


    {
        icon:"📊",
        category:"DAILY GOAL",
        title:"0m / 4h",
        description:
            "Your Daily Goal is displayed as current focus time versus your target. For example, 0m / 4h means you have completed zero minutes out of four hours.",
        demo:`
            <div class="demo-box">

                <div class="goal">

                    <div class="goal-number">
                        0m
                    </div>

                    <div class="demo-title">
                        / 4h
                    </div>

                </div>

                <div class="goal-bar">
                    <span style="width:0%"></span>
                </div>

            </div>
        `
    },


    {
        icon:"🔢",
        category:"STATISTICS",
        title:"Sessions",
        description:
            "Every completed Focus session counts as a Session. This gives you a simple picture of how many focused blocks you finished.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Sessions
                        </div>

                        <div class="demo-muted">
                            Completed Focus sessions
                        </div>
                    </div>

                    <div class="demo-pill">
                        12
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"🔥",
        category:"STATISTICS",
        title:"Streak",
        description:
            "Focus consistently and build a streak. RakkeZ tracks consecutive days in which you complete Focus time.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Current Streak
                        </div>

                        <div class="demo-muted">
                            Keep going.
                        </div>
                    </div>

                    <div class="demo-pill">
                        7 DAYS
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"⏳",
        category:"STATISTICS",
        title:"Focus Time",
        description:
            "Focus Time is the total amount of time you've spent actively focusing inside RakkeZ.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Total Focus Time
                        </div>

                        <div class="demo-muted">
                            All recorded Focus time
                        </div>
                    </div>

                    <div class="demo-pill">
                        12h 35m
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"◐",
        category:"FOCUS MODE",
        title:"Focus Only",
        description:
            "Focus Only is designed to reduce distractions and keep your attention on the Focus experience.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Focus Only
                        </div>

                        <div class="demo-muted">
                            Less distraction. More focus.
                        </div>
                    </div>

                    <div class="demo-pill">
                        ON
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"🔊",
        category:"ALARM",
        title:"Alarm Volume",
        description:
            "Control how loud your completion alarm is with the Alarm Volume slider.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div class="demo-title">
                        Alarm Volume
                    </div>

                    <div class="demo-pill">
                        70%
                    </div>

                </div>

                <div class="goal-bar">
                    <span style="width:70%"></span>
                </div>

            </div>
        `
    },


    {
        icon:"🔔",
        category:"ALARM",
        title:"Multiple Alarm Sounds",
        description:
            "Choose between different built-in alarm sounds and select the one that feels right for your focus sessions.",
        demo:`
            <div class="demo-box">

                <div class="sound-options">

                    <div class="sound active">
                        Soft
                    </div>

                    <div class="sound">
                        Bell
                    </div>

                    <div class="sound">
                        Digital
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"🎵",
        category:"ALARM",
        title:"Custom Alarm Upload",
        description:
            "You can also upload your own alarm sound from your device and use it when a timer finishes.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            Custom Alarm
                        </div>

                        <div class="demo-muted">
                            Your own sound
                        </div>
                    </div>

                    <div class="demo-pill">
                        UPLOAD
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"▶",
        category:"MEDIA",
        title:"YouTube Embed",
        description:
            "Play supported YouTube videos directly inside RakkeZ using the YouTube Embed player.",
        demo:`
            <div class="demo-box">

                <div class="media-demo">

                    <div class="media-card">

                        <div class="media-icon">
                            ▶
                        </div>

                        <div class="media-title">
                            YouTube
                        </div>

                        <div class="media-sub">
                            Paste a video URL.
                        </div>

                    </div>

                    <div class="media-card">

                        <div class="media-icon">
                            ♪
                        </div>

                        <div class="media-title">
                            Focus Music
                        </div>

                        <div class="media-sub">
                            Keep your workspace running.
                        </div>

                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"♫",
        category:"MEDIA",
        title:"Spotify Embed",
        description:
            "Paste a Spotify Track, Playlist, or Album URL to use Spotify's embedded player inside RakkeZ.",
        demo:`
            <div class="demo-box">

                <div class="media-row">

                    <div class="media-card">

                        <div class="media-icon">
                            ♫
                        </div>

                        <div class="media-title">
                            Spotify
                        </div>

                        <div class="media-sub">
                            Track · Playlist · Album
                        </div>

                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"✦",
        category:"AMBIENT",
        title:"Ambient",
        description:
            "Change the atmosphere of RakkeZ with built-in ambient backgrounds designed to make your workspace feel more immersive.",
        demo:`
            <div class="demo-box">

                <div
                    style="
                        height:110px;
                        border-radius:14px;
                        background:
                        radial-gradient(
                            circle at 25% 25%,
                            #006cff,
                            transparent 35%
                        ),
                        radial-gradient(
                            circle at 75% 75%,
                            #001e79,
                            transparent 40%
                        ),
                        #02040b;
                    "
                ></div>

            </div>
        `
    },


    {
        icon:"♫",
        category:"LOCAL MEDIA",
        title:"Local Music",
        description:
            "Use music stored directly on your device. Select an audio file and play it while you focus.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            My Focus Music.mp3
                        </div>

                        <div class="demo-muted">
                            Local file
                        </div>
                    </div>

                    <div class="demo-pill">
                        PLAYING
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"▶",
        category:"LOCAL MEDIA",
        title:"Local Video",
        description:
            "RakkeZ can also play supported video files directly from your device.",
        demo:`
            <div class="demo-box">

                <div
                    style="
                        height:110px;
                        border-radius:14px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:
                        linear-gradient(
                            135deg,
                            #07152b,
                            #102c52
                        );
                        font-size:30px;
                    "
                >
                    ▶
                </div>

            </div>
        `
    },


    {
        icon:"🖼",
        category:"BACKGROUND",
        title:"Local Background",
        description:
            "Upload your own image or video and use it as your RakkeZ background.",
        demo:`
            <div class="demo-box">

                <div class="demo-row">

                    <div>
                        <div class="demo-title">
                            My Background
                        </div>

                        <div class="demo-muted">
                            Image / Video
                        </div>
                    </div>

                    <div class="demo-pill">
                        CUSTOM
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"◐",
        category:"APPEARANCE",
        title:"Dark / Light",
        description:
            "Choose the appearance that feels best for you. RakkeZ supports both Dark and Light themes.",
        demo:`
            <div class="demo-box">

                <div class="media-demo">

                    <div class="media-card">
                        <div class="media-icon">
                            ☾
                        </div>

                        <div class="media-title">
                            Dark
                        </div>
                    </div>

                    <div
                        class="media-card"
                        style="background:#f2f5fa;color:#111"
                    >
                        <div class="media-icon">
                            ☀
                        </div>

                        <div class="media-title">
                            Light
                        </div>
                    </div>

                </div>

            </div>
        `
    },


    {
        icon:"✓",
        category:"FINAL",
        title:"Everything is saved locally",
        description:
            "Your timer settings, tasks, progress, sessions, focus time, streak and other local preferences can remain on your device through Local Storage.",
        demo:`
            <div class="demo-box">

                <div class="media-demo">

                    <div class="media-card">
                        <div class="media-title">
                            Settings
                        </div>

                        <div class="media-sub">
                            Saved locally
                        </div>
                    </div>

                    <div class="media-card">
                        <div class="media-title">
                            Progress
                        </div>

                        <div class="media-sub">
                            Saved locally
                        </div>
                    </div>

                </div>

            </div>
        `
    }

];


/* =========================
   STATE
========================= */

let currentStep = 0;


/* =========================
   ELEMENTS
========================= */

const card =
    $("tutorialCard");

const icon =
    $("featureIcon");

const category =
    $("featureCategory");

const title =
    $("featureTitle");

const description =
    $("featureDescription");

const demo =
    $("featureDemo");

const nextBtn =
    $("nextBtn");

const backBtn =
    $("backBtn");

const skipBtn =
    $("skipBtn");

const stepCounter =
    $("stepCounter");

const progressBar =
    $("progressBar");

const dots =
    $("dots");

const finalScreen =
    $("finalScreen");


/* =========================
   RENDER DOTS
========================= */

function renderDots(){

    dots.innerHTML = "";

    tutorialSteps.forEach(
        (_,index)=>{

            const dot =
                document.createElement("div");

            dot.className =
                "dot";

            if(index === currentStep){
                dot.classList.add("active");
            }

            dots.appendChild(dot);

        }
    );

}


/* =========================
   RENDER STEP
========================= */

function renderStep(){

    const step =
        tutorialSteps[currentStep];

    card.style.animation = "none";

    void card.offsetWidth;

    card.style.animation =
        "cardIn .45s cubic-bezier(.2,.8,.2,1)";


    icon.textContent =
        step.icon;

    category.textContent =
        step.category;

    title.textContent =
        step.title;

    description.textContent =
        step.description;

    demo.innerHTML =
        step.demo;


    stepCounter.textContent =
        String(currentStep + 1)
            .padStart(2,"0")
        +
        " / "
        +
        String(tutorialSteps.length)
            .padStart(2,"0");


    const percentage =
        ((currentStep + 1) /
        tutorialSteps.length) *
        100;

    progressBar.style.width =
        percentage + "%";


    backBtn.disabled =
        currentStep === 0;


    nextBtn.textContent =
        currentStep ===
        tutorialSteps.length - 1
        ? "Finish"
        : "Next";


    renderDots();

}


/* =========================
   NEXT
========================= */

function nextStep(){

    if(
        currentStep <
        tutorialSteps.length - 1
    ){

        currentStep++;

        renderStep();

        return;

    }

    showFinal();

}


/* =========================
   BACK
========================= */

function previousStep(){

    if(currentStep > 0){

        currentStep--;

        renderStep();

    }

}


/* =========================
   FINAL
========================= */

function showFinal(){

    finalScreen.classList.add("show");

}


/* =========================
   COMPLETE
========================= */

function completeTutorial(){

    localStorage.setItem(
        "rakkez_tutorial_completed",
        "true"
    );

    /*
      Change this path if your
      main app is located somewhere else.
    */

    window.location.href =
        "../index.html";

}


/* =========================
   REPLAY
========================= */

function replayTutorial(){

    finalScreen.classList.remove("show");

    currentStep = 0;

    renderStep();

}


/* =========================
   SKIP
========================= */

function skipTutorial(){

    const confirmed =
        confirm(
            "Are you sure you want to skip the tutorial?"
        );

    if(!confirmed){
        return;
    }

    completeTutorial();

}


/* =========================
   EVENTS
========================= */

nextBtn.addEventListener(
    "click",
    nextStep
);


backBtn.addEventListener(
    "click",
    previousStep
);


skipBtn.addEventListener(
    "click",
    skipTutorial
);


$("readyBtn").addEventListener(
    "click",
    completeTutorial
);


$("replayBtn").addEventListener(
    "click",
    replayTutorial
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    event => {

        if(event.key === "ArrowRight"){

            nextStep();

        }


        if(event.key === "ArrowLeft"){

            previousStep();

        }


        if(event.key === "Escape"){

            skipTutorial();

        }

    }
);


/* =========================
   INITIALIZE
========================= */

renderStep();