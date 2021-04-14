
// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:30, wid:21, hgt:21 }; // JS Global var, w canvas size info.
var training_data=[
[[5, 5, -53.5], 1], [[5, 4, -18.8], 2], [[5, 3, -6.9], 2], [[5, 2, -15.6], 1],
[[5, 1, 19.3], 3], [[5, 0, 0.0], 2], [[5, -1, -11.3], 1], [[5, -2, -0.4], 3],
[[5, -3, -14.1], 1], [[5, -4, 0.8], 3], [[5, -5, -12.5], 2], [[4, 5, -22.0], 3],
[[4, 4, -14.2], 3], [[4, 3, -7.8], 2], [[4, 2, -4.6], 1], [[4, 1, 0.6], 2],
[[4, 0, 0.0], 2], [[4, -1, 6.8], 3], [[4, -2, 11.2], 3], [[4, -3, -6.6], 2],
[[4, -4, -6.4], 2], [[4, -5, -3.0], 2], [[3, 5, -17.5], 3], [[3, 4, -29.8], 1],
[[3, 3, -8.1], 2], [[3, 2, -2.2], 2], [[3, 1, 0.1], 2], [[3, 0, 0.0], 2],
[[3, -1, -1.3], 2], [[3, -2, 5.3], 3], [[3, -3, -2.7], 2], [[3, -4, 10.5], 3],
[[3, -5, -10.5], 1], [[2, 5, -28.0], 3], [[2, 4, -17.6], 2], [[2, 3, -7.8], 2],
[[2, 2, -2.4], 2], [[2, 1, 7.8], 3], [[2, 0, -11.0], 1], [[2, -1, -15.6], 1],
[[2, -2, -0.8], 2], [[2, -3, -1.4], 1], [[2, -4, 15.8], 3], [[2, -5, 13.0], 2],
[[1, 5, -29.5], 2], [[1, 4, -10.6], 3], [[1, 3, -8.9], 1], [[1, 2, -2.2], 2],
[[1, 1, -0.3], 2], [[1, 0, 10.0], 3], [[1, -1, -0.1], 2], [[1, -2, 0.6], 2],
[[1, -3, 3.3], 2], [[1, -4, -3.7], 1], [[1, -5, 34.5], 3], [[0, 5, -30.0], 1],
[[0, 4, -6.8], 3], [[0, 3, 13.6], 3], [[0, 2, 12.4], 3], [[0, 1, -0.2], 2],
[[0, 0, 0.0], 2], [[0, -1, 0.2], 2], [[0, -2, -5.4], 1], [[0, -3, 5.4], 2],
[[0, -4, 12.8], 2], [[0, -5, 25.0], 2], [[-1, 5, -19.5], 2], [[-1, 4, -23.2], 1],
[[-1, 3, -3.3], 2], [[-1, 2, -0.6], 2], [[-1, 1, 0.1], 2], [[-1, 0, 9.0], 3],
[[-1, -1, -1.7], 1], [[-1, -2, 19.2], 3], [[-1, -3, 6.9], 2], [[-1, -4, 15.6], 2],
[[-1, -5, 29.5], 2], [[-2, 5, -9.0], 3], [[-2, 4, -4.8], 2], [[-2, 3, -16.6], 1],
[[-2, 2, 0.8], 2], [[-2, 1, -13.4], 1], [[-2, 0, 0.0], 2], [[-2, -1, 0.2], 2],
[[-2, -2, -2.5], 1], [[-2, -3, 18.8], 3], [[-2, -4, 17.6], 2], [[-2, -5, 25.0], 1],
[[-3, 5, -5.4], 2], [[-3, 4, 0.4], 2], [[-3, 3, 2.7], 2], [[-3, 2, 6.6], 3], 
[[-3, 1, 13.3], 3], [[-3, 0, -4.0], 1], [[-3, -1, -0.1], 2], [[-3, -2, -13.8], 1],
[[-3, -3, 25.1], 3], [[-3, -4, 18.8], 2], [[-3, -5, 35.5], 2], [[-4, 5, -2.0], 1],
[[-4, 4, 1.4], 1], [[-4, 3, 6.6], 2], [[-4, 2, -9.2], 1], [[-4, 1, 2.2], 2],
[[-4, 0, -8.0], 1], [[-4, -1, 14.4], 3], [[-4, -2, 7.6], 3], [[-4, -3, -4.1], 1],
[[-4, -4, 19.2], 2], [[-4, -5, 24.0], 1], [[-5, 5, 23.5], 3], [[-5, 4, 13.2], 2],
[[-5, 3, 1.0], 1], [[-5, 2, 7.4], 2], [[-5, 1, 19.3], 3], [[-5, 0, -18.0], 1],
[[-5, -1, 10.7], 3], [[-5, -2, 0.6], 2], [[-5, -3, 6.9], 2], [[-5, -4, 18.8], 2],
[[-5, -5, 35.5], 1]];
var changeColors = false;
var changes = [];
var som = new SOM();
var epoch = 1;
var i = 0;
var last_update_time = 0;
// Array in position 0 is the training vector, number is position 1 is class

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    background(100, 100, 100);
}

function draw() {
    let current_time = new Date().getTime();
    if(i < training_data.length && current_time - last_update_time >= 10 && epoch <= 30) {
        document.getElementById('vector-id').innerHTML = `Training Vector # ${i + 1}`;
        last_update_time = current_time;
        row = training_data[i];
        changes = som.train(row[0], row[1]);
        adjust_colors();
        i++;
        if(i === training_data.length) {
            epoch++;
            if(epoch != 31) {
                document.getElementById('epoch').innerHTML = `Epoch # ${epoch}`;
            }
            i = 0;
        }
    }
}

function adjust_colors() {
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