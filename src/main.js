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
let barYPosition;
let mouseXPosition;
let mouseYPosition;

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

/* Función para extraer la parte númerica de un width */

function stripeNumber(string) {
    let number = '';
    let letter;
    for(index in string) {
        letter = parseFloat(string[index]);
        if (!isNaN(letter)) {
            number += string[index];
        }
    }

    return parseFloat(number);
}

/* Carga la canción */

function load(element) {
    player.src = element.url;
    currentSong = element;
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

/* Cambia la música a la siguiente o al comienzo */

function nextSong() {
    if(songs.indexOf(currentSong) + 1 == songs.length) {
        load(songs[0])
    } else {
        load(songs[songs.indexOf(currentSong) + 1]);
    }
}

/* Cambia la música a la anterior o al final */

function backSong() {
    if(songs.indexOf(currentSong) == 0) {
        load(songs[songs.length - 1])
    } else {
        load(songs[songs.indexOf(currentSong) - 1]);
    }
}

/* Renderiza los datos de la canción */

function render() {
    songThumbnail.src = currentSong.thumbnail;
    songTitle.innerText = currentSong.title;
    songAuthor.innerText = currentSong.author;
    songTimerCurrent.innerText = '0:00';
    songTimerDuration.innerText = convertTime(player.duration);
    player.play()
}

function togglePlay() {
    player.paused ? player.play() : player.pause();
}

playButton.addEventListener('click', togglePlay);
forwardButton.addEventListener('click', nextSong);
backwardButton.addEventListener('click', backSong);

player.addEventListener('loadeddata', render);

player.addEventListener('timeupdate', (e) => {
    progress.style.width = `${(player.currentTime * 100 / player.duration) * 300 / 100}px`;
    songTimerCurrent.innerText = convertTime(player.currentTime);
});

progressBar.addEventListener('mousedown', (e) => {
    player.pause()
    wasBarClicked = true;
    barXPosition = e.target.offsetLeft;
    barYPosition = e.target.offsetTop;

    let mouseXPosition = e.offsetX;
    let progressWidth;
    let progressBarWidth = stripeNumber(progressBar.style.width);
    let songDuration = player.duration;
    
    progress.style.width = `${mouseXPosition}px`;
    progressWidth = stripeNumber(progress.style.width);

    player.currentTime = (progressWidth / progressBarWidth * 100) * songDuration / 100
    return false;
});

document.addEventListener('mousemove', (e) => {
    e.preventDefault()
    let progressWidth = stripeNumber(progress.style.width);
    let progressBarWidth = stripeNumber(progressBar.style.width);

    mouseXPosition = e.x;
    mouseYPosition = e.y;
    let mouseMovementX = e.movementX;
    if(wasBarClicked) {
        if(e.x < barXPosition) {
            progress.style.width = '0px';
        } else if(e.x > barXPosition + progressBarWidth) {
            progress.style.width = `${progressBarWidth}px`
        } else {
            if(mouseMovementX + progressWidth > 300) {
                progress.style.width = '300px'
            } else {
                progress.style.width = `${mouseMovementX + progressWidth}px`;
            }
        }
    }
})

document.addEventListener('mouseup', () => {
    if(wasBarClicked) wasBarClicked = false;
    return false;
})

load(songs[Math.round(Math.random())]);
