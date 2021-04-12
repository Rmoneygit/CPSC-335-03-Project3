// Authors: Ryan Patrick
// Description:

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:10, wid:60, hgt:40 }; // JS Global var, w canvas size info.
var training_data = [[[5, 5, -53.5], 1], [[5, 4, -18.8], 2]]; 
var changeColors = false;
var changes = [];
// Array in position 0 is the training vector, number is position 1 is class

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    background(100, 100, 100);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function main() {
    let som = new SOM();
    for(var i = 0; i < training_data.length; i++) {
        row = training_data[i];
        changes = som.train(row[0], row[1]);
    }
}
main();

// Not called yet, needs to be implemented
function adjust_colors() {
    console.log('ajdust colors was called');
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let big = sz -2;
    let K = 0.1;
    changes.forEach(function(node) {
        let x = node.x*sz;
        let y = node.y*sz;
        let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
        if(node.classification === 1) {
            acolors = [acolors[0]*(1+K), acolors[1]*(1-K), acolors[2]*(1-K)];
        }
        else if(node.classification === 2) {
            acolors = [acolors[0]*(1-K), acolors[1]*(1+K), acolors[2]*(1-K)];
        }
        else if(node.classification === 3) {
            acolors = [acolors[0]*(1-K), acolors[1]*(1-K), acolors[2]*(1+K)];
        }
        fill(acolors);
        stroke(100, 100, 100);
        rect( x, y, big, big );
    });
}