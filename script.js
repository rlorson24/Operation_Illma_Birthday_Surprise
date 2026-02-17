let current = 0;
const slider = document.getElementById("mainContent");
const bgMusic = document.getElementById("bgMusic");

// 19 video screens
const videoFiles = [
    "Screen1.mp4","Screen2.mp4","Screen3.mp4","Screen4.mp4","Screen5.mp4",
    "Screen6.mp4","Screen7.mp4","Screen8.mp4","Screen9.mp4","Screen10.mp4",
    "Screen11.mp4","Screen12.mp4","Screen13.mp4","Screen14.mp4","Screen15.mp4",
    "Screen16.mp4","Screen17.mp4","Screen18.mp4","Screen19.mp4"
];


// Create screens
function createScreens() {
    videoFiles.forEach((file, index) => {
        const screen = document.createElement("div");
        screen.classList.add("screen");
        if(index === 0) screen.classList.add("active-screen");

        const video = document.createElement("video");
        video.src = file;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = false;
        video.preload = "auto";

        screen.appendChild(video);
        slider.appendChild(screen);
    });
}

// Start experience
function startExperience(){
    createScreens();
    document.getElementById("welcomeScreen").classList.remove("active");
    slider.style.display = "flex";
    playCurrentVideo();
    bgMusic.play().catch(()=>console.log("Music autoplay blocked"));
}

// Play current video
function playCurrentVideo(){
    const screens = document.querySelectorAll(".screen");
    screens.forEach(s => {
        const v = s.querySelector("video");
        if(v){ v.pause(); v.currentTime=0; }
        s.classList.remove("active-screen");
        s.style.zIndex = 0;
    });
    const currentScreen = screens[current];
    if(currentScreen){
        currentScreen.classList.add("active-screen");
        currentScreen.style.zIndex = 1;
        const video = currentScreen.querySelector("video");
        if(video){ video.play().catch(()=>console.log("Video autoplay blocked")); }
    }
}

// Move to next screen
function nextScreen(){
    if(current < videoFiles.length - 1){
        current++;
        playCurrentVideo();
    }
}

// Click anywhere → always forward
document.addEventListener("click", e => {
    if(slider.style.display !== "flex") return;
    nextScreen();  // click anywhere moves forward
});

// Swipe navigation (mobile)
let startX=0, endX=0;
document.addEventListener("touchstart", e => startX = e.changedTouches[0].screenX);
document.addEventListener("touchend", e => {
    endX = e.changedTouches[0].screenX;
    if(startX - endX > 50) nextScreen(); // swipe left = forward
});
