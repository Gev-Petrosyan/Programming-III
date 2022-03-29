
var socket = io();

function setup() {
    var weath = 'winter';

    var side = 25;

    var matrix = [];

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let mansterCountElement = document.getElementById('mansterCount');
    let whoterCountElement = document.getElementById('whoterCount');
    let lavaCountElement = document.getElementById('lavaCount');
    socket.on("data", drawCreatures);
    socket.on("weather", function (data) {
        weath = data;
    })
    function drawCreatures(data) {
        console.log(data);

        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        mansterCountElement.innerText = data.mansterCounter;
        whoterCountElement.innerText = data.whoterCounter;
        lavaCountElement.innerText = data.lavaCounter;

        createCanvas(matrix[0].length * side, matrix.length * side);
        background('#acacac');

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (weath == "spring") {
                        fill("green");
                    }
                    else if (weath == "summer") {
                        fill("green");
                    }
                    else if (weath == "winter") {
                        fill("white");
                    }
                    else if (weath == "autumn") {
                        fill("#ffd426");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    if (weath == "spring") {
                        fill("#4287f5");
                    }
                    else if (weath == "summer") {
                        fill("#4287f5");
                    }
                    else if (weath == "winter") {
                        fill("#1ab4d6");
                    }
                    else if (weath == "autumn") {
                        fill("#4287f5");
                    }
                    fill('#4287f5');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('black');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}

function killGrass() {
    socket.emit("killGrass");
}

function killGrassEater() {
    socket.emit("killGrassEater");
}

function killManster() {
    socket.emit("killManster");
}

function killWhoter() {
    socket.emit("killWhoter");
}

function killLava() {
    socket.emit("killLava");
}

function addGrass() {
    socket.emit("addGrass");
}

function addGrassEater() {
    socket.emit("addGrassEater");
}

function addManster() {
    socket.emit("addManster");
}

function addWhoter() {
    socket.emit("addWhoter");
}

function addLava() {
    socket.emit("addLava");
}