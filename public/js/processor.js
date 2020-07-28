let processor = {
    timerCallback: function() {
      if (this.video.paused) {
        return;
      }
      this.computeFrame();
      let self = this;
      setTimeout(function () {
          self.timerCallback();
        }, 0);
    },
  
    doLoad: function() {
      this.video = document.getElementById("video");
      this.c1 = document.getElementById("c1");
      this.ctx1 = this.c1.getContext("2d");
      this.c2 = document.getElementById("c2");
      this.ctx2 = this.c2.getContext("2d");
      let self = this;
      this.video.addEventListener("play", function() {
          self.width = 600;
          self.height = 600;
          // self.width = self.video.videoWidth / 1;
          // self.height = self.video.videoHeight / 1;
          self.timerCallback();
        }, false);
    },
  
    computeFrame: function() {
      this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
      let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
          let l = frame.data.length / 4;
  
      for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];
        if (g >= 125 && r < 130)
        // if (r > 0 && r < 50 && g > 10 && g <= 255 && b > 0 && b < 50)
          frame.data[i * 4 + 3] = 0;
      }
      this.ctx2.putImageData(frame, 0, 0);
      return;
    }

  };

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});


// enabling the autoplay manually
var x = document.getElementById("video");

function enableAutoplay() { 
  x.autoplay = true;
  x.load();
} 

// // add the third context + copy the video
// let canv = document.getElementById("canv");
// let ctx3 = canv.getContext("2d");
// ctx3.fillRect(10, 10, 50, 50);

// function copy3Dp() {
//   ctx3.putImageData(frame, 0, 0);
// }

// --- addition 4 july shinji
let videoPauseButton = document.querySelector('#vidPauseButton');

function pauseVideo() { 
  x.pause();
  videoPauseButton.innerHTML = "Play";
} 
function playVideo() { 
  x.play();
  videoPauseButton.innerHTML = "Pause";
} 


function toggleVideoPause() {

  if (x.paused) {
    showVideo();
    playVideo();
  } else {
    showVideo();
    pauseVideo();
  }
}

let alphaVideo = document.querySelector('#c2');
let videoHideButton = document.querySelector('#vidHideButton');

function toggleVideoHide() {

  if (alphaVideo.style.display === "none") {
    playVideo();
    showVideo();
  } else {
    hideVideo();
    pauseVideo();
  }
}

function hideVideo() { 
  document.querySelector('#c2').style.display = 'none';
  videoHideButton.innerHTML = "ON";
} 
function showVideo() { 
  document.querySelector('#c2').style.display = 'block';
  videoHideButton.innerHTML = "OFF";
} 

function initialiseVid() {
  x.autoplay = true;
  hideVideo();
  x.load();
  playVideo();
}


// below shuffle of the video

var lastIndex;
var sourceURL;

// <!-- You MUST give your sources tags individual ID's for the solution to work. -->
var mp4Vid = document.getElementById('mp4Source');

function intialRandomVid() {
    let randNum = Math.floor(Math.random() * 3) + 1;
    console.log (randNum);

    switch(randNum) {
      case 1:
        sourceURL = "media/fluid1a img1 re-GS crp_1.mp4";
        mp4Vid.src = sourceURL;
        x.load();
      break;
      case 2:
        sourceURL = "media/fluid8a re-GS crp_1.mp4";
        mp4Vid.src = sourceURL;
        x.load();
      break;
      case 3:
        sourceURL = "media/fluid2a img2 re-GS crp.mp4";
        mp4Vid.src = sourceURL;
        x.load();
      break;
      default:
        sourceURL = "media/fluid2a img2 re-GS crp.mp4";
        mp4Vid.src = sourceURL;
        x.load();
    }
    lastIndex = randNum;
}

// click to randomly change the video source
function change() {
    let randNum = Math.floor(Math.random() * 3) + 1;

    console.log (lastIndex + " " + randNum); 

    if (randNum === lastIndex) {
        // console.log ("once more");
        change();
    }
    else {
        // console.log ("success");

        // change the video if the random number is not duplicated
        switch(randNum) {
          case 1:
            sourceURL = "media/fluid1a img1 re-GS crp_1.mp4";
            changeVid();
          break;
          case 2:
            sourceURL = "media/fluid8a re-GS crp_1.mp4";
            changeVid();
          break;
          case 3:
            sourceURL = "media/fluid2a img2 re-GS crp.mp4";
            changeVid();
          break;
          default:
            sourceURL = "media/fluid2a img2 re-GS crp.mp4";
            changeVid();
        }
    }

    // rewrite the last index as the new random number
    lastIndex = randNum;
}

// a function to load the changed video
function changeVid() {
    x.pause();
    // Now simply set the 'src' property of the mp4Vid variable!!!!
    mp4Vid.src = sourceURL;
    x.load();
    x.play();
}

