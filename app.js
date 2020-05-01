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
    this.bpm = 150;
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
  pad.addEventListener("click", drumKit.activePad);
});

//add event listener for click on play button
drumKit.playBtn.addEventListener("click", function () {
  //run the start method (including the repeat) on the drumkit
  drumKit.start();
});
