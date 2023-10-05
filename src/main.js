import { stripeNumber, convertTime } from "./assets/functions.js";
import { nextSong, togglePlay, backSong } from "./assets/buttonsFunctions.js";

const player = document.querySelector('.player');
const playButton = document.querySelector('.play-button');
const forwardButton = document.querySelector('.forward-button');
const backwardButton = document.querySelector('.backward-button');
const progress= document.querySelector('.progress');
const progressBar= document.querySelector('.progress-bar');
const songTitle = document.querySelector('.title');
const songAuthor = document.querySelector('.author');
const songThumbnail = document.querySelector('.song-thumbnail');
const songTimerDuration = document.querySelector('.timer-duration');
const songTimerCurrent = document.querySelector('.timer-current')

/* Variables de control */

let currentSong;
let wasBarClicked;
let barXPosition;
let mouseXPosition;
let progressWidth;
let progressBarWidth = stripeNumber(progressBar.style.width);
let songDuration;

let songs = [
    {
        title: 'Lost in the City Lights',
        author: 'Cosmo Sheldrake',
        url: './src/audio/lost-in-city-lights-145038.mp3',
        thumbnail: './src/img/cover-1.png'
    },
    {
        title: 'Forest Lullaby',
        author: 'Lesfm',
        url: './src/audio/forest-lullaby-110624.mp3',
        thumbnail: './src/img/cover-2.png'
    }
];

function moveBar(bar, barXPosition) {
    bar.style.width = `${barXPosition}px`;
}   

function setPlayerTime(player, time) {
    player.currentTime = time;
}

/* Carga la canción */

function load(element) {
    player.src = element.url;
    currentSong = element;
}

/* Renderiza los datos de la canción */

function render() {
    songDuration = player.duration;

    songThumbnail.src = currentSong.thumbnail;
    songTitle.innerText = currentSong.title;
    songAuthor.innerText = currentSong.author;
    songTimerCurrent.innerText = '0:00';
    songTimerDuration.innerText = convertTime(player.duration);
    player.play()
}

/* Event listeners para los botones */ 

playButton.addEventListener('click', ()=>{
    togglePlay(player);
    
});
forwardButton.addEventListener('click', ()=>{load(nextSong(songs, currentSong))});
backwardButton.addEventListener('click', ()=>{load(backSong(songs, currentSong))});

/* Event listeners de la barra de reproducción */

player.addEventListener('timeupdate', (e) => {
    let barPosition = (player.currentTime * 100 / player.duration) * 300 / 100
    moveBar(progress, barPosition);
    songTimerCurrent.innerText = convertTime(player.currentTime);
});

player.addEventListener('play', () => {playButton.classList.toggle('playing')});
player.addEventListener('pause', () => {playButton.classList.toggle('playing')});

progressBar.addEventListener('mousedown', (e) => {
    player.pause()
    wasBarClicked = true;
    barXPosition = e.target.offsetLeft;
    
    let mouseXPosition = e.offsetX;
    
    moveBar(progress, mouseXPosition);
    progressWidth = stripeNumber(progress.style.width);

    setPlayerTime(player, (progressWidth / progressBarWidth * 100) * songDuration / 100);
    return false;
});

document.addEventListener('mousemove', (e) => {
    e.preventDefault();

    
    if(wasBarClicked) {
        
        mouseXPosition = e.x;
        if(e.x < barXPosition) {
            moveBar(progress, 0);
        } else if(e.x > barXPosition + progressBarWidth) {
            moveBar(progress, progressBarWidth);
        } else {
            moveBar(progress, mouseXPosition - barXPosition);
        }
        progressWidth = stripeNumber(progress.style.width)
        setPlayerTime(player, (progressWidth / progressBarWidth * 100) * songDuration / 100);
    }
})

document.addEventListener('mouseup', () => {
    if(wasBarClicked) {
        wasBarClicked = false
        player.play();
    };
    return false;
})

/* Carga de la canción y renderizado de elementos */

player.addEventListener('loadeddata', render);

load(songs[Math.round(Math.random())]);

/* Media queries */

window.matchMedia("(max-width: 375px").addEventListener('change', () => {
    progressBar.style.width = '200px';
})

window.matchMedia("(min-width: 376px").addEventListener('change', () => {
    progressBar.style.width = '300px';
})