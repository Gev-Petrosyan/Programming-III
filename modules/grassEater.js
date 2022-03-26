module.exports = class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 3;

        this.directions = [];
    }

    getCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    
    chooseCell(character) {
        this.getCordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    
    mul() {
        let emptycells = this.chooseCell(0);
        let newCell = emptycells[Math.floor(Math.random()*emptycells.length)];

        if(newCell && this.energy >= 2) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 2;
            grassEaterArr.push(new GrassEater(newX, newY));
            this.energy = 1;
        }
    }
    
    eat() {
        let emptycells = this.chooseCell(1);
        let newCell = emptycells[Math.floor(Math.random()*emptycells.length)];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 15) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }

    move() {
        let emptycells = this.chooseCell(0);
        let newCell = emptycells[Math.floor(Math.random()*emptycells.length)];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 2;

            matrix[this.y] [this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }


    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y] [this.x] = 0;
    }


}