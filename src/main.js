const player = document.querySelector('.player');
const playButton = document.querySelector('.play-button');
const forwardButton = document.querySelector('.forward-button');
const backwardButton = document.querySelector('.backward-button');
const progressBar= document.querySelector('.progress');
const songTitle = document.querySelector('.title');
const songAuthor = document.querySelector('.author');
const songThumbnail = document.querySelector('.song-thumbnail');
const songTimerDuration = document.querySelector('.timer-duration');
const songTimerCurrent = document.querySelector('.timer-current')

let currentSong;

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
    console.log('hola')
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
    progressBar.style.width = `${(player.currentTime * 100 / player.duration) * 300 / 100}px`;
    songTimerCurrent.innerText = convertTime(player.currentTime);
});


load(songs[Math.round(Math.random())]);
