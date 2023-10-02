/* Función para extraer la parte númerica de un width */

function stripeNumber(string) {
    let number = '';
    let letter;
    let i;
    for(i in string) {
        letter = parseFloat(string[i]);
        if (!isNaN(letter)) {
            number += string[i];
        }
    }

    return parseFloat(number);
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

export {convertTime, stripeNumber};