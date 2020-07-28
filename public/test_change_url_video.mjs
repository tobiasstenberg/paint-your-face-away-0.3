
// https://stackoverflow.com/questions/12151606/setattribute-and-video-src-for-changing-video-tag-source-not-working-in-ie9

// <!-- You MUST give your sources tags individual ID's for the solution to work. -->
var mp4Vid = document.getElementById('mp4Source');

function change() {
  x.pause();
  // Now simply set the 'src' property of the mp4Vid variable!!!!
  mp4Vid.src = "media/fluid8a re-GS crp_1.mp4";
  x.load();
  x.play();
}

