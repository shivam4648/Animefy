//initializing the variables
let songIndex = 0;
let songPlayName = "";
let audioElement = new Audio("songs/Gurenge.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let myGif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songPlay = document.getElementById("songPlayName");
// let container = document.getElementById("background");

let songs = [
  {
    id:0,
    name: "Gurenge",
    songName: "Gurenge",
    filePath: "songs/Gurenge.mp3",
    coverPath: "covers/gurengeCover.jpg",
    duration: "01:29",
  },
  {
    id:1,
    name: "Orange",
    songName: "Orange",
    filePath: "songs/Orange.mp3",
    coverPath: "covers/orangeCover.jpg",
    duration: "05:50",
  },
  {
    id:2,
    name: "TheWorld",
    songName: "The World",
    filePath: "songs/TheWorld.mp3",
    coverPath: "covers/theWorldCover.jpg",
    duration: "01:21",
  },
  {
    id:3,
    name: "ShinzouWoSasageyo",
    songName: "Shinzou Wo Sasageyo",
    filePath: "songs/ShinzouWoSasageyo.mp3",
    coverPath: "covers/sasageyoCover.jpg",
    duration: "01:35",
  },
  {
    id:4,
    name: "BlueBird",
    songName: "Blue Bird",
    filePath: "songs/BlueBird.mp3",
    coverPath: "covers/blueBirdCover.jpg",
    duration: "01:44",
  },
  {
    id:5,
    name: "BlackRover",
    songName: "Black Rover",
    filePath: "songs/BlackRover.mp3",
    coverPath: "covers/blackRoverCover.jpg",
    duration: "01:30",
  },
];

songItem.forEach((element, index) => {
  element.getElementsByTagName("img")[0].src = songs[index].coverPath;
  element.getElementsByClassName("songName")[0].innerText =
    songs[index].songName;
  element.getElementsByClassName("timeStamp")[0].innerText =
    songs[index].duration;
});

//Handle play/pause button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    // document.getElementById("background").style.backgroundImage = "url('background/gurenge.jpg')";
    myGif.style.opacity = 1;
    makeAllPlays();
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove('fa-play-circle');
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add('fa-pause-circle');
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    myGif.style.opacity = 0;
    makeAllPlays();
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove('fa-pause-circle');
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add('fa-play-circle');
  }
});

audioElement.ontimeupdate = (event) => {
  //update seekbar
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
};

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, i) => {
    element.addEventListener("click", (e) => {
      if (audioElement.paused || audioElement.currentTime >= 0) {        
        makeAllPlays();
        songPlayName = e.target.id;
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songPlayName}.mp3`;
        songPlay.innerText = songs[i].songName;
        songIndex = i;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        myGif.style.opacity = 1;
        document.getElementById("background").style.backgroundImage = `url('background/${songs[i].name}.jpg')`;
       }
      // else if(audioElement.played) {
      //   e.target.classList.remove("fa-pause-circle");
      //   e.target.classList.add("fa-play-circle");
      //   audioElement.pause();
      //   masterPlay.classList.remove("fa-pause-circle");
      //   masterPlay.classList.add("fa-play-circle");
      //   myGif.style.opacity = 0;
      // }
    });
  }
);

const loadSong = (songs) => {
  audioElement.src = `songs/${songs.name}.mp3`;
  document.getElementById("background").style.backgroundImage = `url('background/${songs.name}.jpg')`;
  songPlay.innerText = songs.songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  myGif.style.opacity = 1;
};

document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  makeAllPlays();
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove('fa-play-circle');
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add('fa-pause-circle');
});

document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  makeAllPlays();
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove('fa-play-circle');
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add('fa-pause-circle');
});

audioElement.addEventListener("ended", () => {
  audioElement.currentTime = 0;
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  makeAllPlays();
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove('fa-play-circle');
  Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add('fa-pause-circle');
  // audioElement.play();
  //   masterPlay.classList.remove("fa-pause-circle");
  // masterPlay.classList.add("fa-play-circle");
  // myGif.style.opacity = 0;
});
