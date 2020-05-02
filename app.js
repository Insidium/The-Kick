//Drum kit class
class DrumKit {
  constructor() {
    //select all drum pads
    this.pads = document.querySelectorAll(".pad");
    //select play button
    this.playBtn = document.querySelector(".play");
    //set default sound to following
    this.currentKick = "./allSounds/kick-acoustic01.wav";
    this.currentSnare = "./allSounds/snare-acoustic01.wav";
    this.currentHihat = "./allSounds/hihat-acoustic01.wav";
    //select the assigned sound for the pad
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    //start at the first pad (index 0)
    this.index = 0;
    //set default beats per minute
    this.bpm = 150;
    //set default status to not playing
    this.isPlaying = null;
    //target all select elements
    this.selects = document.querySelectorAll("select");
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
          //reset sound timing if multiple pads in a row are active
          this.kickAudio.currentTime = 0;
          //play audio track
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
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
    //check if track is playing (i.e. not null)
    if (this.isPlaying) {
      //if it's already playing, clear the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      //if not playing, set interval for the repeat method to run as per interval
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  //change play button displayand change to active
  updateBtn() {
    //if the music is not playing, change play button to "Play" and remove active class
    if (this.isPlaying) {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    } else {
      //if the music is playing, change play button to "Stop" and add active class
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    }
  }
  //change sound on user select
  changeSound(e) {
    //target name (kick-select etc.) of selection
    const selectionName = e.target.name;
    //target value (track location) of selection
    const selectionValue = e.target.value;
    //check which selection name is chosen and change audio source accordingly
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
}

// create a new Drumkit instance
const drumKit = new DrumKit();

//Event Listeners

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
  //run the updateBtn method to show play/stop option
  drumKit.updateBtn();
  //run the start method (including the repeat) on the drumkit
  drumKit.start();
});

//add event listener to each select element
drumKit.selects.forEach((select) => {
  //when option in select is changed, change sound to assigned track
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
