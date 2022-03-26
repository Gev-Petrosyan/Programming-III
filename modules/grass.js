module.exports = class Grass {
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
        if (this.multiplay >= 5 && newCell) {
            const newGrass = new Grass(newCell[0], newCell[1], 1)
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.muplitplay = 0;
        }
        this.multiplay++;
    }

} 