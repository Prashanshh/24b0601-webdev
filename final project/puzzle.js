const rows = 4;
const columns = 4;
let turns = 0;
const defaultOrder = ["4","2","8","5","1","6","7","9","3","15","12","10","16","13","11","14"];
let imgOrder = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function buildBoard() {
    const board = document.getElementById("board");
    board.innerHTML = '';

    imgOrder.forEach((imgNum, index) => {
        const r = Math.floor(index / columns);
        const c = index % columns;
        const tile = document.createElement("img");
        tile.id = `${r}-${c}`;
        tile.src = `${imgNum}.png`;
        tile.classList.toggle("blank", imgNum === "16");

        tile.addEventListener("click", clickTile);
        board.appendChild(tile);
    });
}

function newGame() {
    turns = 0;
    document.getElementById("turns").innerText = turns;
    imgOrder = defaultOrder.slice();
    shuffleArray(imgOrder);
    buildBoard();
}

window.onload = function() {
    document.getElementById("new-game").addEventListener("click", newGame);
    newGame();
};

function clickTile() {
    const clicked = this;
    const blank = document.querySelector('.blank');
    if (!blank) return;

    const [r1, c1] = clicked.id.split("-").map(Number);
    const [r2, c2] = blank.id.split("-").map(Number);
    const isAdjacent =
        (r1 === r2 && Math.abs(c1 - c2) === 1) ||
        (c1 === c2 && Math.abs(r1 - r2) === 1);

    if (isAdjacent) {
        [clicked.src, blank.src] = [blank.src, clicked.src];
        clicked.classList.add('blank');
        blank.classList.remove('blank');

        turns++;
        document.getElementById("turns").innerText = turns;
    }
}
