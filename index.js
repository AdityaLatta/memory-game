const icons = [
    "house",
    "user",
    "shield-halved",
    "comment",
    "face-smile",
    "car",
    "heart",
    "star",
    "house",
    "user",
    "shield-halved",
    "comment",
    "face-smile",
    "car",
    "heart",
    "star",
];

const game = document.querySelector("#game > div");

function appentTile(icon) {
    const tile = document.createElement("div");

    const back = document.createElement("i");
    back.setAttribute("class", `fa-solid fa-${icon}`);

    tile.appendChild(back);

    const front = document.createElement("div");
    front.setAttribute("class", "front");

    tile.appendChild(front);

    game.appendChild(tile);
}

function hydrateBoard() {
    const boardArray = new Array(16);
    let fills = 0;

    for (let icon of icons) {
        function suffle() {
            if (fills >= 16) return;

            const position = Math.floor(Math.random() * 16);

            if (boardArray[position]) {
                suffle();
            } else {
                fills++;
                boardArray[position] = icon;
            }
        }

        suffle();
    }

    boardArray.forEach((icon) => {
        appentTile(icon);
    });
}

hydrateBoard();

let opened = [];
let clicks = 0;
let matches = 0;
const startTime = new Date();

game.addEventListener("click", (event) => {
    clicks++;
    console.log(clicks, matches);
    event.target.previousElementSibling.classList.add("open");

    if (event.target.classList.contains("front")) {
        event.target.classList.remove("front");
        event.target.classList.add("flip");

        opened.push(event.target.previousElementSibling.className);

        if (opened.length === 2) {
            if (opened[0] !== opened[1]) {
                setTimeout(() => {
                    const tiles = Array.from(
                        document.getElementsByTagName("i")
                    );

                    tiles.forEach((item) => {
                        if (
                            item.classList.contains("open") &&
                            item.style.backgroundColor !== "green"
                        ) {
                            item.classList.remove("open");

                            item.nextElementSibling.classList.remove("flip");
                            item.nextElementSibling.classList.add("front");
                        }
                    });

                    opened = [];
                }, 500);
            } else {
                opened = [];
                matches++;
                setTimeout(() => {
                    const tiles = Array.from(
                        document.getElementsByTagName("i")
                    );

                    tiles.forEach((item) => {
                        if (item.classList.contains("open")) {
                            item.style.backgroundColor = "green";
                        }
                    });
                }, 500);

                if (matches === 8) {
                    const result = document.createElement("h2");
                    const resultText = document.createTextNode(
                        `Moves :- ${clicks}`
                    );
                    result.appendChild(resultText);

                    const endTime = new Date();

                    const totalSeconds = endTime - startTime;

                    const resTime = new Date();
                    resTime.setHours(0, 0, 0, totalSeconds);

                    const minutes = resTime.getMinutes();
                    const seconds = resTime.getSeconds();

                    const timeTaken = document.createElement("h2");
                    const timeText = document.createTextNode(
                        `Completed in ${minutes} : ${seconds}`
                    );
                    timeTaken.appendChild(timeText);

                    game.appendChild(result);
                    game.appendChild(timeTaken);
                }
            }
        }
    }
});
