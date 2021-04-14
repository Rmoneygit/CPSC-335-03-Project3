class NeuralNode {
    
    constructor(x, y) {
        /* Formula for random number between range:
            rand = Math.random() * (max - min) + min
            The range for w1 and w2 is (-5, 5).
            The range for w3 is (-60, 60).
            The possible values for classification are 1, 2, or 3.
        */
        let w1 = Math.random() * 10 - 5;
        let w2 = Math.random() * 10 - 5;
        let w3 = Math.random() * 120 - 60;

        this.weight = [w1, w2, w3];
        this.classification = Math.floor(Math.random() * 3 + 1);
        this.x = x;
        this.y = y;
    }

    toString() {
        return `weight = [${this.weight[0]}, ${this.weight[1]}, ${this.weight[2]}]; class = ${this.classification}\n`;
    }

    compute_distance(vector) {
        // We speed up the computation by not computing the square root.
        let dist = 0;
        for(var i = 0; i < 3; i++) {
            dist += Math.pow(vector[i] - this.weight[i], 2);
        }
        return dist;
    }

    adjust_weight(target) {
        for(var i = 0; i < 3; i++) {
            this.weight[i] += (target[i] - this.weight[i])*0.2;
        }
    }
}