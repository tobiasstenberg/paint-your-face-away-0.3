// THE MAIN FILE WHICH HANDLES DRAWING, SETTING UP A P5JS CANVAS ETC.

// update shinji this variable disabled as the button moved to the main html
// let shuffleButton;    // the button used for shuffling
let face;             // the face image
// added shinji 27 july
let faceURL;
let mask1;            // the mask canvas
let paint1;           // the paint image
let maskedPaint1;     // variable to hold the masked paint
let mask2;            // the mask canvas
let paint2;           // the paint image
let maskedPaint2;     // variable to hold the masked paint
// mask 3 added 26 july shinji
let mask3;            // the mask canvas
let paint3;           // the paint image
let maskedPaint3;     // variable to hold the masked paint
let maskBrush;        // the 'brush' we'll draw on the mask with (a black circle)
let sketch;           // the sketch, which is an html canvas elem
let brushType = 0;    // current type of brush 
 

function preload () {
    // load in all the images

    face = loadImage("img/face.jpg");
    // paint1 = loadImage("img/paint1.png");
    // paint2 = loadImage("img/Paint-Img2-102.png");

    // // brush 3 added shinji 26 july
    paint3 = loadImage("img/paint3/paint3_29.png");
    maskBrush = loadImage("img/brush_sq_r.png");
}

function setup() {
    sketch = createCanvas(600, 600);
    sketch.id('myP5canvas1');
    

    // --- updated shinji 6 july --  the below button moved to the main html
    // // create the shuffle button
    // shuffleButton = createButton('Shuffle');
    // shuffleButton.position(0, 0);
    // shuffleButton.mousePressed(shufflePaint1);
    // shuffleButton.class('button');
    // // update ends here


    // why are we declaring a new brushSize here? 
    // seems like we can just declare it on line 17 as global declaration and assignment at the same time
    // buttons for brush size
    let brushSize = 38;
    brushSize = select('#brushSml');
    brushSize.mousePressed(switchSmlBrush);
    brushSize = select('#brushMed');
    brushSize.mousePressed(switchMedBrush);
    // new size added
    brushSize = select('#brushLrg');
    brushSize.mousePressed(switchLrgBrush);

    // INITIAL RESET OF SKETCH
    resetSketch();

}


// addition 5 july shinji

//  below switches for shuffling and changing the paint images with the draw loop below (disabled)
// let paint1Changed = 0;
// let paint2Changed = 0;

function updatingPaint() {
    drawMaskedPaint();        
    maskedPaint1 = paint1.get();
    maskedPaint1.mask(mask1.get());
    maskedPaint2 = paint2.get();
    maskedPaint2.mask(mask2.get());
    // mask3 added 26 july shinji
    maskedPaint3 = paint3.get();
    maskedPaint3.mask(mask3.get());
}

///////////////////////
// the main loop
function draw() {
    // -- below disabled and moved elsewhere as it seems to take much power
// // draw the masked paint image over the top of the face...
// image(maskedPaint1, 0, 0, width, height); 
// image(maskedPaint2, 0, 0, width, height);

// ///////////below disabled the draw loop update of the shuffled brush 1&2
    // if (paint1Changed === 1) {
    //     // draw the masked paint image over the top of the face...
    //     drawMaskedPaint();        
    //     // below lines moved from the drawBrush functions to enable the change of the brush image immediately 
    //     // - rather than when the mouse is pressed.
    //     maskedPaint1 = paint1.get();
    //     maskedPaint1.mask(mask1.get());

    //     setTimeout(function(){ 
    //         paint1Changed = 0;
    //         // console.log("changed");
    //     }, 2500);
    // }

    // if (paint2Changed === 1) {
    //     // draw the masked paint image over the top of the face...
    //     drawMaskedPaint();        
    //     // below lines moved from the drawBrush functions to enable the change of the brush image immediately 
    //     // - rather than when the mouse is pressed.
    //     maskedPaint2 = paint2.get();
    //     maskedPaint2.mask(mask2.get());

    //     setTimeout(function(){ 
    //         paint2Changed = 0;
    //         // console.log("changed");
    //     }, 2500);
    // }

    // if the variable is 1, draw something
    if (drawingOnOff === 1) {
        // if the mouse is over the div for the canvas, draw
        if (tempDrawOnOff === 1) {
            // if the mouse is pressed, then the painting can start
            if (mouseIsPressed === true) {
                // a switch to determine how to draw the brush
                // the default is brush 0
                switch (brushType) {
                    case 0:
                        drawBrush0();
                        break;
                    case 1:
                        drawBrush1();
                        break;
                    // mask3 + brush added 26 july shinji
                    case 2:
                        drawBrush2();
                        break;
                    default:
                        drawBrush0();
                }
            }
        }
    }

}

function blurCnv() {
    // blur function added; an element w/ "myP5canvas1" cannot be placed in the html otherwise the blur wont work.
    document.querySelector('#myP5canvas1').classList.add('blur'); 
}

function removeBlurCnv() {
    document.querySelector('#myP5canvas1').classList.remove('blur'); 
}

///////////////////////
function drawBrush0() {
    drawMaskedPaint();
    maskedPaint1 = paint1.get();
    maskedPaint1.mask(mask1.get());
    mask1.stroke('rgba(0,0,0, 0.9)');
    mask1.strokeWeight(brushSize);
    mask1.image(maskBrush, mouseX, mouseY, brushSize, brushSize - 4);
    mask1.line(mouseX, mouseY, pmouseX, pmouseY);
}

///////////////////////
function drawBrush1() {
    drawMaskedPaint();
    maskedPaint2 = paint2.get();
    maskedPaint2.mask(mask2.get());
    mask2.stroke('rgba(255,255,255, 1)');
    mask2.strokeWeight(brushSize);
    mask2.image(maskBrush, mouseX, mouseY, brushSize, brushSize - 4);
    mask2.line(mouseX, mouseY, pmouseX, pmouseY);
}

///////////////////////
function drawBrush2() {
    drawMaskedPaint();
    maskedPaint3 = paint3.get();
    maskedPaint3.mask(mask3.get());
    mask3.stroke('rgba(255,255,255, 1)');
    mask3.strokeWeight(brushSize);
    mask3.image(maskBrush, mouseX, mouseY, brushSize, brushSize - 4);
    mask3.line(mouseX, mouseY, pmouseX, pmouseY);
}

function drawMaskedPaint() {
    // draw the masked paint image over the top of the face...
    image(maskedPaint1, 0, 0, width, height); 
    image(maskedPaint2, 0, 0, width, height);
    // added the brush3 26 july shinji
    image(maskedPaint3, 0, 0, width, height);
}

///////////////////////
// function for creating graphics elements and using masks on the elems
function resetSketch() {
    // create a graphics element for each brush
    // since they are different graphic elems, the code must be somewhat redundant, they need separate function calls
    mask1 = createGraphics(width, height);
    mask1.imageMode(CENTER);
    // save a copy of the paint image
    maskedPaint1 = paint1.get();
    // apply a mask to the copied img
    maskedPaint1.mask(mask1.get());

    mask2 = createGraphics(width, height);
    mask2.imageMode(CENTER);
    maskedPaint2 = paint2.get();
    maskedPaint2.mask(mask2.get());

    // added the mask 3 shinji 26 july
    mask3 = createGraphics(width, height);
    mask3.imageMode(CENTER);
    maskedPaint3 = paint3.get();
    maskedPaint3.mask(mask3.get());

    // draw the face on the "original" sketch canvas, which places it below the 2 mask canvases
    image(face, 0, 0, width, height);


}

// // updated by shinji 27 jul reloading a face with url
function reloading() {
    // added shinji 27jul update the face img if the url is changed
    
    console.log(faceURL);
    face = loadImage(faceURL);
}




// ///// recreate the shuffle update function here w/ setinterval
let updating;

function updateChangedBrush() {
    clearInterval(updating);
    clearTimeout();

    setTimeout(function(){ 
        updating = setInterval(updatingPaint, 400);
        // updatingPaint();
    }, 1200);

    clearInterval(updating);

  }



//   function updateChangedBrush() {
//     clearTimeout();

//     setTimeout(function updatingPaint(){ 
//         setTimeout(updatingPaint, 200);
//         // updatingPaint();
//         console.log("time");
//     }, 5000);

//     clearTimeout();

//   }

// addition ends

