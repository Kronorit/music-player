/* Cambia la música a la siguiente o al comienzo */

function nextSong(songs, song) {
    if(songs.indexOf(song) + 1 == songs.length) {
        return songs[0];
    } else {
        return songs[songs.indexOf(song) + 1];
    }
}

/* Cambia la música a la anterior o al final */

function backSong(songs, song) {
    if(songs.indexOf(song) == 0) {
        return songs[songs.length - 1];
    } else {
        return songs[songs.indexOf(song) - 1];
    }
}

/* Función para pausar y empezar la música. */

function togglePlay(audioElement) {
    audioElement.paused ? audioElement.play() : audioElement.pause();
}

export {nextSong, backSong, togglePlay};