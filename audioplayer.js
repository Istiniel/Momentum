import playList from './playlist.js';

//
const audioPlayer = document.querySelector('.audio-player');
const audio = new Audio();
console.dir(audio);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector('.controls .toggle-play');
const songName = audioPlayer.querySelector('.song-name');
const songLength = audioPlayer.querySelector('.length');
let playPrevButton = document.querySelector('.audio-prev');
let playNextButton = document.querySelector('.audio-next');
let timeToSeek;
let playNum = 0;
let isPlay = false;
audio.src = playList[playNum].src;
songName.textContent = playList[playNum].title;
songLength.textContent = playList[playNum].duration;

function playAudio() {
  audio.src = playList[playNum].src;
  songName.textContent = playList[playNum].title;
  songLength.textContent = playList[playNum].duration;
  audio.currentTime = timeToSeek;

  if (!isPlay) {
    songIndicator();
    playBtn.classList.remove('play');
    playBtn.classList.add('pause');
    audio.play();
    isPlay = true;
  } else {
    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
    audio.pause();
    isPlay = false;
  }
}
playBtn.addEventListener('click', playAudio);

function playNext() {
  playNum == 3 ? (playNum = 0) : playNum++;
  audio.src = playList[playNum].src;
  songName.textContent = playList[playNum].title;
  songLength.textContent = playList[playNum].duration;
  playBtn.classList.remove('play');
  playBtn.classList.add('pause');
  audio.currentTime = 0;
  songIndicator();
  audio.play();
  isPlay = true;
}

function playPrev() {
  playNum == 0 ? (playNum = 3) : playNum--;
  audio.src = playList[playNum].src;
  songName.textContent = playList[playNum].title;
  songLength.textContent = playList[playNum].duration;
  playBtn.classList.remove('play');
  playBtn.classList.add('pause');
  audio.currentTime = 0;
  songIndicator();
  audio.play();
  isPlay = true;
}

playPrevButton.addEventListener('click', playPrev);
playNextButton.addEventListener('click', playNext);

function songIndicator() {
  if (document.querySelector('.item-active') != null) {
    Array.from(document.querySelectorAll('.play-item'))
      .filter((e) => e.classList.contains('item-active'))[0]
      .classList.remove('item-active');
  }
  Array.from(document.querySelectorAll('.play-item'))
    .filter((e) => e.textContent == songName.textContent)[0]
    .classList.add('item-active');
}
//click on timeline to skip around
const timeline = audioPlayer.querySelector('.timeline');

timeline.addEventListener(
  'click',
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector('.controls .volume-slider');
volumeSlider.addEventListener(
  'click',
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector('.controls .volume-percentage').style.width =
      newVolume * 100 + '%';
  },
  false
);

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector('.progress');
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
  audioPlayer.querySelector('.song-time .current').textContent =
    getTimeCodeFromNum(audio.currentTime);
  timeToSeek = audio.currentTime;
}, 500);

audioPlayer.querySelector('.volume-button').addEventListener('click', () => {
  const volumeEl = audioPlayer.querySelector('.volume-container .volume');
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove('icono-volumeMedium');
    volumeEl.classList.add('icono-volumeMute');
  } else {
    volumeEl.classList.add('icono-volumeMedium');
    volumeEl.classList.remove('icono-volumeMute');
  }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

playList.forEach((el) => {
  let li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el['title'];
  document.querySelector('.play-list').append(li);
});

document.addEventListener('click', playlistHandler);

function playlistHandler(event) {
  if (!event.target.classList.contains('play-item')) return;
  playNum = playList.reduce(
    (acc, e, index, arr) =>
      acc + (e['title'] == event.target.textContent ? index : 0),
    0
  );
  timeToSeek = 0;
  isPlay = false;
  playAudio();
}
