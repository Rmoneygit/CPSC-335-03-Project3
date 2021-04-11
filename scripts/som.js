class SOM {
    constructor() {
        this.grid = [];
        for(var i = 0; i < 21; i++) {
            let row = []
            for(var j = 0; j < 21; j++) {
                row.push(new NeuralNode());
            }
            this.grid.push(row);
        }
    }

    get(x, y) {
        return grid[x][y];
    }

    toString() {
        let str = ''
        for(var i = 0; i < 21; i++) {
            for(var j = 0; j < 21; j++) {
                str += `Node at (${i}, ${j}): ` + this.grid[i][j].toString();
            }
        }
        return str;
    }
}