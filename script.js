// script.js
const container = document.getElementById('map-container');
const cols = 30;
const rows = 20;

let delay = 0;

for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        // Animate each tile from left to right
        setTimeout(() => {
            tile.style.opacity = 1;
        }, delay);

        delay += 10; // controls animation speed
        container.appendChild(tile);
    }
}