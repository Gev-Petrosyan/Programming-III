module.exports = class Manster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 60;

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
        let emptycells = this.chooseCell(1);
        let newCell = emptycells[Math.floor(Math.random()*emptycells.length)];
        if(newCell && this.energy >= 2) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            mansterArr.push(new Manster(newX, newY));
            this.energy = 1;
        }
    }
    
    eat() {
        let emptycells = this.chooseCell(2);
        let newCell = emptycells[Math.floor(Math.random()*emptycells.length)];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 10) {
                this.mul();
            }
        }
        else {
            this.move();
        }
        
    }


    move() {
        let emptycells = this.chooseCell(1);
        let newCell = emptycells[Math.floor(Math.random()*emptycells.length)];
        

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 3;

            matrix[this.y] [this.x] = 1;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }

    die() {
        for (var i in mansterArr) {
            if (this.x == mansterArr[i].x && this.y == mansterArr[i].y) {
                mansterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y] [this.x] = 0;
    }

}