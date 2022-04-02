/*
 * Variables globales
 */
let timerId;
let timerRemainingSeconds = 65;

/**
 * Fonction permettant de transformer une durée en secondes en durée en minutes : secondes
 * @param seconds le temps total en secondes
 * @returns {string} la chaine de caractères représentant la durée
 */
function secondsToStringDuration(seconds) {
    const remainingSeconds = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * Fonction permettant de transformer une durée en minutes : secondes en une somme de secondes
 * @param minutes le nombre total de minutes
 * @param seconds le nombre de secondes restantes
 * @returns {number} la durée en secondes seulement
 */
function durationToSeconds(minutes, seconds) {
    return minutes * 60 + seconds;
}

/**
 * Fonction permettant de mettre à jour le compte à rebours dans le DOM en se basant sur l'état de la variable globale timerRemainingSeconds
 */
function refreshTimer() {
    document.getElementById('timer').textContent = secondsToStringDuration(timerRemainingSeconds);
}

/**
 * Fonction permettant de changer la valeur de la variable globale timerRemainingSeconds et de raffraichir sa valeur dans le DOM
 * @param seconds
 */
function setTimer(seconds) {
    timerRemainingSeconds = seconds;
    refreshTimer();
}

/**
 * Fonction permettant de lancer le timer et de garder en mémoire l'ID pour arrêter l'action quand nécessaire
 */
function startTimer() {
    timerId = setInterval(() => {
        if (timerRemainingSeconds > 0) {
            timerRemainingSeconds--;
        } else {
            stopTimer();
        }
        refreshTimer();
    }, 1000)
}

/**
 * Fonction permettant de stoper le timer
 */
function stopTimer() {
    clearInterval(timerId);
}

/*
 * Section de gestion des évènements
 */
// Gestion du démarrage du timer
document.getElementById('start-timer-button').addEventListener('click', (event) => {
    startTimer();
});

// Gestion de l'arrêt du timer
document.getElementById('stop-timer-button').addEventListener('click', (event) => {
    stopTimer();
});

// Gestion du changement de la valeur du timer
document.getElementById('set-timer-button').addEventListener('click', (event) => {
    // Empêche le raffraîchissement de la page
    event.preventDefault();
    const minutes = Number(document.getElementById('timer-input-min').value);
    const seconds = Number(document.getElementById('timer-input-sec').value);

    stopTimer();
    setTimer(durationToSeconds(minutes, seconds));
});
