var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let fs = require('fs')
var Grass = require("./modules/grass.js");
var GrassEater = require("./modules/grassEater.js");
var Manster = require('./modules/manster.js');
var Whoter = require('./modules/whoter.js');
var Lava = require('./modules/lava.js');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

matrix = [];

grassArr = [];
grassEaterArr = [];
mansterArr = [];
whoterArr = [];
lavaArr = [];

weath = "spring";

function generator(grass, grassEater, manster, whoter, lava, matrixSize) {
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([]);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push([0]);
        }
    }
    for (let i = 0; i < grass; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 2;
    }
    for (let i = 0; i < manster; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 3;
    }
    for (let i = 0; i < whoter; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 4;
    }
    for (let i = 0; i < lava; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 5;
    }
}

generator(55, 15, 4, 1, 1, 32);

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                var manster = new Manster(x, y);
                mansterArr.push(manster);
            }
            else if (matrix[y][x] == 4) {
                var whoter = new Whoter(x, y);
                whoterArr.push(whoter);
            }
            else if (matrix[y][x] == 5) {
                var lava = new Lava(x, y);
                lavaArr.push(lava);
            }
        }
    }
}

function weather() {
    if (weath == "winter") {
        weath = "spring";
    }
    else if (weath == "spring") {
        weath = "summer";
    }
    else if (weath == "summer") {
        weath = "autumn";
    }
    else if (weath == "autumn") {
        weath = "winter";
    }
    io.sockets.emit('weather', weath);
}

setInterval(weather, 24000);

function game() {
    if (weath != 'autumn') {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
        for (var i in mansterArr) {
            mansterArr[i].eat();
        }
        for (var i in whoterArr) {
            whoterArr[i].mul();
        }
        for (var i in lavaArr) {
            lavaArr[i].mul();
        }
    }

    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        mansterCounter: mansterArr.length,
        whoterCounter: whoterArr.length,
        lavaCounter: lavaArr.length
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)

function kill() {
    grassArr = [];
    grassEaterArr = [];
    meatEaterArr = [];
    allEaterArr = [];
    hunterArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}


io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
});

var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.manster = mansterArr.length;
    statistics.whoter = whoterArr.length;
    statistics.lava = lavaArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
