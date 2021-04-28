
// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:30, wid:21, hgt:21 }; // JS Global var, w canvas size info.
var changeColors = false;
var changes = [];
var som = new SOM();
var epoch = 1;
var i = 0;
var last_update_time = 0;
var max_epochs = 40;
let sz = g_canvas.cell_size;
let sz2 = sz / 2;
let big = sz -2;
let K = 0.1;
let prev_hi = [0, 0];
// Array in position 0 is the training vector, number is position 1 is class

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    var canvas = createCanvas( width, height );  // Make a P5 canvas.
    canvas.parent('canvas-holder');
    background(100, 100, 100);
}

function draw() {
    let current_time = new Date().getTime();
    if(i < training_data.length && current_time - last_update_time >= 10 && epoch <= max_epochs) {
        document.getElementById('vector-id').innerHTML = `Training Vector # ${i + 1}`;
        last_update_time = current_time;
        row = training_data[i];
        changes = som.train(row[0], row[1]);
        adjust_colors();
        i++;
        if(i === training_data.length) {
            epoch++;
            document.getElementById('epoch').innerHTML = `Epoch # ${epoch}`;
            if(epoch > max_epochs) {
                document.getElementById('input-stuff').classList.remove('invisible');
                document.getElementById('epoch').innerHTML = 'Epoch # -';
                document.getElementById('vector-id').innerHTML = 'Training Vector # -';
            }
            i = 0;
        }
    }
}

function adjust_colors() {
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

function highlight(node) {
    
    let prev_x = prev_hi[0]*sz;
    let prev_y = prev_hi[1]*sz;
    let acolors = get( prev_x + sz2, prev_y + sz2 ); // Get cell interior pixel color [RGBA] array.
    fill(acolors)
    stroke(100, 100, 100);
    rect( prev_x, prev_y, big, big );
    
    
    let x = node.x*sz;
    let y = node.y*sz;
    acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    fill(acolors)
    stroke(255, 255, 0);
    rect( x, y, big, big );
    prev_hi[0] = node.x;
    prev_hi[1] = node.y;
}

function classify() {
    let v1 = document.getElementById('val-1').value;
    let v2 = document.getElementById('val-2').value;
    let v3 = document.getElementById('val-3').value;
    let vector = [v1, v2, v3];
    let winner = som.classify(vector);
    document.getElementById('wilder-class').innerHTML = `Wilder class: ${winner.classification}`;
    highlight(winner);
}

function test() {
    let cor = 0;
    let incor = 0;
    for(var i = 0; i < training_data.length; i++) {
        let row = training_data[i];
        let winner = som.classify(row[0]);

        document.getElementById('s1').innerHTML = `Test Vectors Inputted: ${i + 1}`;
        if(winner.classification === row[1]) {
            document.getElementById('s2').innerHTML = `Correct Classifications: ${cor++}`;
        }
        else {
            document.getElementById('s3').innerHTML = `Incorrect Classifications: ${incor++}`;
        }
    }
}