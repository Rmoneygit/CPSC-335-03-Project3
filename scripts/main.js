// Authors: Ryan Patrick
// Description:

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:10, wid:60, hgt:40 }; // JS Global var, w canvas size info.
var training_data = [[[5, 5, -53.5], 1]]; 
/* Array in position 0 is the training vector, 
                                        number is position 1 is class*/

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    background(100, 100, 100);
}

function main() {
    let som = new SOM();
    console.log(som.toString());
    for(var i = 0; i < training_data.length; i++) {
        row = training_data[i];
        som.train(row[0], row[1]);
    }
    console.log(som.toString());
}
main();