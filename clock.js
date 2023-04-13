// set these to change interval and video (no error checking yet)
const startTime = 9;
const endTime = 14;
const videoID = "QQNL83fhWJU";

// load JS for API
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

// when YT API iframe is ready, this is called
function onYouTubeIframeAPIReady() {
  // create the player
  player = new YT.Player("player", {
    height: "900",
    width: "640",
    videoId: videoID,
    playerVars: {
      playsinline: 1,
      mute: 1,
      autoplay: 1,
      controls: 0
    },
    events: {
      onReady: (event) => {
        //start video when it is ready
        event.target.playVideo();
        // start looping
        loop();
      }
    }
  });
}

/* move to start time, sets timer to start loop over at end time

zombie functions like setTimout that continually run aren't ideal. In a production site, to be polite, you might want to add more code to shut the video off after a certain amount of time. */
loop = () => {
  player.seekTo(startTime, true);
  setTimeout(loop, (endTime - startTime) * 1000);
};

