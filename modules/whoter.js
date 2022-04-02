module.exports = class Whoter { 
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;
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

    mul(){
        let emptycells = this.chooseCell(0);
        let newCell = emptycells[Math.floor(Math.random()*emptycells.length)];
        if (this.multiplay >= 45 && newCell) {
            const newWhoter = new Whoter(newCell[0], newCell[1])
            whoterArr.push(newWhoter);
            matrix[newCell[1]][newCell[0]] = 4;
            this.muplitplay = 0;
        }
        this.multiplay++;
    }

} 