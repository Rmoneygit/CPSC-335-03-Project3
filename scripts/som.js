class SOM {
    constructor() {
        this.grid = [];
        this.winnerx = 0;
        this.winnery = 0;
        for(var i = 0; i < 21; i++) {
            let row = []
            for(var j = 0; j < 21; j++) {
                row.push(new NeuralNode(i, j));
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

    find_winner(vector) {
        let minX = 0;
        let minY = 0;
        let min = Number.MAX_VALUE;
        for(var i = 0; i < 21; i++) {
            for(var j = 0; j < 21; j++) {
                let dist = this.grid[i][j].compute_distance(vector);
                if(dist < min) {
                    minX = i;
                    minY = j;
                    min = dist;
                }
            }
        }
        return this.grid[minX][minY];
    }

    train(vector, classification) {     
        let changes = [];
        
        let winner = this.find_winner(vector);
        winner.adjust_weight(vector);
        winner.classification = classification;
        changes.push(winner);
        this.winnerx = winner.x;
        this.winnery = winner.y;

        let neighbors = this.find_neighbors(winner);
        neighbors.forEach(function(node) {
            node.adjust_weight(winner.weight);
            node.classification = classification;
            changes.push(node);
        });

        neighbors.forEach(function(node) { 
            let steppies = this.find_neighbors(node);

            for(var i = 0; i < steppies.length; i++) {
                if(!neighbors.includes(steppies[i])) {
                    steppies[i].adjust_weight(node.weight);
                    steppies.classification = classification;
                    changes.push(steppies[i]);
                }
            }
        }, this);
        return changes;
    }

    find_neighbors(node) {
        let neighbors = [];
        if(node.x > 0) {
            neighbors.push(this.grid[node.x - 1][node.y]);
        }
        if(node.x < 20) {
            neighbors.push(this.grid[node.x + 1][node.y]);
        }     
        if(node.y > 0) {
            neighbors.push(this.grid[node.x][node.y - 1]);
        }
        if(node.y < 20) {
            neighbors.push(this.grid[node.x][node.y + 1]);
        }
        return neighbors;
      }

      classify(vector) {
        return this.find_winner(vector);
      }
}