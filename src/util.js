

// return a random number from min exclusive to max exclusive
export function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
