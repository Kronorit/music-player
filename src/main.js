const player = document.querySelector('.player');
const playButton = document.querySelector('.play-button');
const forwardButton = document.querySelector('.forward-button');
const backwardButton = document.querySelector('.back-button');
const progressBar= document.querySelector('.progress');
const songTitle = document.querySelector('.title');
const songAuthor = document.querySelector('.author');
const songThumbnail = document.querySelector('.song-thumbnail');
const songTimerDuration = document.querySelector('.timer-duration');
const songTimerCurrent = document.querySelector('.timer-current')

let songs = {
    0: {
        title: 'Lost in the City Lights',
        author: 'Cosmo Sheldrake',
        url: './audio/lost-in-city-lights-145038.mp3',
        thumbnail: './img/cover-1.png'
    },
    1: {
        title: 'Forest Lullaby',
        author: 'Lesfm',
        url: './audio/forest-lullaby-110624.mp3',
        thumbnail: './img/cover-2.png'
    }
};

/* Carga la canción */

function load(element) {
    player.src = element.url;
}

/* Convierte los timers a minutos y segundos válidos */

function convertTime(number) {
    let minutes = number / 60;
    let intMinutes = Math.trunc(minutes);
    let seconds = minutes - intMinutes;
    seconds *= 60;

    Math.trunc(seconds) < 10 ?
            seconds = `0${Math.trunc(seconds)}`:
            seconds = Math.trunc(seconds);
            
    return `${intMinutes}:${seconds}`;
}

/* Renderiza los datos de la canción */

function render(element, e) {
    songThumbnail.src = element.thumbnail;
    songTitle.innerText = element.title;
    songAuthor.innerText = element.author;
    songTimerCurrent.innerText = '0:00';
    songTimerDuration.innerText = convertTime(player.duration);
}

function togglePlay() {
    player.paused ? player.play() : player.pause();
}

playButton.addEventListener('click', togglePlay);

player.addEventListener('loadeddata', render.bind(this, songs[1]));

player.addEventListener('timeupdate', (e) => {
    progressBar.style.width = `${(player.currentTime * 100 / player.duration) * 300 / 100}px`;
    songTimerCurrent.innerText = convertTime(player.currentTime);
});

load(songs[1]);