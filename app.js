//Drum kit class
class DrumKit {
  constructor() {
    //select all drum pads
    this.pads = document.querySelectorAll(".pad");
    //select play button
    this.playBtn = document.querySelector(".play");
    //select the assigned sound for the pad
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    //start at the first pad (index 0)
    this.index = 0;
    //set default beats per minute
    this.bpm = 250;
  }
  //method to toggle "active" class styling to an active pad
  activePad() {
    this.classList.toggle("active");
  }
  //sound loop method
  repeat() {
    //once pads steps through to 8, resets index to 0
    let step = this.index % 8;
    //select each pad on each row as it steps through
    const activeBars = document.querySelectorAll(`.b${step}`);
    //loop over pads
    activeBars.forEach((bar) => {
      //add animation for slight scale up on each pad during loop
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if pads are active
      if (bar.classList.contains("active")) {
        //check which sound to play and play it
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.play();
        }
      }
    });
    //increment index by one
    this.index++;
  }
  //method to run the loop
  start() {
    //set simple interval calculation by seconds
    const interval = (60 / this.bpm) * 1000;
    //set interval for the repeat method to run as per interval
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}

// create a new Drumkit instance
const drumKit = new DrumKit();

//loop over each pad
drumKit.pads.forEach((pad) => {
  //on click, toggle active pad colour via class
  pad.addEventListener("click", drumKit.activePad);
  //once animation ends, reset so it can start again
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

//add event listener for click on play button
drumKit.playBtn.addEventListener("click", function () {
  //run the start method (including the repeat) on the drumkit
  drumKit.start();
});
