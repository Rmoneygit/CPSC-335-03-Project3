class NeuralNode {
    
    constructor() {
        /* Formula for random number between range:
            rand = Math.random() * (max - min) + min
            The range for w1 and w2 is (-5, 5).
            The range for w3 is (-60, 60).
            The possible values for class are 1, 2, or 3.
        */
        let w1 = Math.random() * 10 - 5;
        let w2 = Math.random() * 10 - 5;
        let w3 = Math.random() * 120 - 60;

        this.weight = [w1, w2, w3];
        this.class = Math.floor(Math.random() * 3 + 1);
    }

    toString() {
        return `weight = [${this.weight[0]}, ${this.weight[1]}, ${this.weight[2]}]; class = ${this.class}\n`;
    }
}