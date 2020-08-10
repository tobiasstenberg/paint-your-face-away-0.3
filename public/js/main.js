// THE MAIN FILE WHICH HANDLES DRAWING, SETTING UP A P5JS CANVAS ETC.

// update shinji this variable disabled as the button moved to the main html
// let webcamFace;             // the face image "face" variable turned into a webcam image
// v0.75
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

// v0.6 see paintBlobs js
let blob; 
// v0.7
let allCanv_width = 750;
let allCanv_height = 750;
var p5canv_x;
var p5canv_y;
var p5canv_width = allCanv_width;
var p5canv_height = allCanv_height;
var winWidth = window.matchMedia("(max-width: 767px)")



function preload () {
    // load in all the images

    // face = loadImage("img/face.jpg");
    // face = loadImage("");
    // paint1 = loadImage("img/paint1.png");
    // paint2 = loadImage("img/Paint-Img2-102.png");
    // // brush 3 added shinji 26 july
    // v0.65
    // paint3 = loadImage("img/paint3/Paint-Img3-44.png");
    
    maskBrush = loadImage("img/brush_sq_r.png");
    // v0.6
    blob = loadImage('img/blobs/blob3.png');
}

function setup() {
    sketch = createCanvas(p5canv_width, p5canv_height);
    // centerP5Canvas();

    sketch.id('myP5canvas1');

    sketch.parent('compiled');

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

    initPaint();

    // INITIAL RESET OF SKETCH
    // deleted v0.75

    // hide the spinner when the p5 canvas loaded / added shinji 28 july
    hideSpinner();

    idingCanvas();

    // v0.7
    if (winWidth.matches) { 
        // If the window below 768px query matches
        // enter mobile
        console.log("mob");
        p5canvas.style.width  = (window.innerWidth * 0.9)  + "px";
        p5canvas.style.height = (window.innerWidth * 0.9)  + "px";
    } else {
        // enter non mobile
        console.log("non mob");
        p5canvas.style.width  = (window.innerHeight * 0.9)  + "px";
        p5canvas.style.height = (window.innerHeight * 0.9)  + "px";
    }
      
    // shinji v0.6
    showImgButton();


}


// addition 5 july shinji

//  below switches for shuffling and changing the paint images with the draw loop below (disabled)
let paint1Changed = 0;
let paint2Changed = 0;
// v0.65
let paint3Changed = 0;

// v0.65 disabled below
// function updatingPaint() {
//     drawMaskedPaint();        
//     maskedPaint1 = paint1.get();
//     maskedPaint1.mask(mask1.get());
//     maskedPaint2 = paint2.get();
//     maskedPaint2.mask(mask2.get());
//     // mask3 added 26 july shinji
//     maskedPaint3 = paint3.get();
//     maskedPaint3.mask(mask3.get());
// }


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

    // v0.65 below enabled again then made shorter
    if (paint2Changed === 1) {
        // draw the masked paint image over the top of the face...
        drawMaskedPaint();        
        // below lines moved from the drawBrush functions to enable the change of the brush image immediately 
        // - rather than when the mouse is pressed.
        maskedPaint2 = paint2.get();
        maskedPaint2.mask(mask2.get());

        setTimeout(function(){ 
            paint2Changed = 0;
            // console.log("changed");
        }, 400);
    }

    // v0.65 added below but disabled
    // if (paint3Changed === 1) {
    //     // draw the masked paint image over the top of the face...
    //     drawMaskedPaint();        
    //     // below lines moved from the drawBrush functions to enable the change of the brush image immediately 
    //     // - rather than when the mouse is pressed.
    //     maskedPaint3 = paint3.get();
    //     maskedPaint3.mask(mask3.get());

    //     setTimeout(function(){ 
    //         paint3Changed = 0;
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
                        // v0.6
                        break;
                    default:
                        drawBrush0();
                }
            }
        }
    }

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
// update shinji separeted the initialisation of the paint below 29 july
function initPaint() {
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
}

// shinji reinitialising paint v0.5
function reInitPaint() {

    initPaint();
}

// reset sketch() moved to open image v0.75

function resetSketch2() {
    reInitPaint();
    resizeLoadedImage();
    // console.log(faceURL);
}

// v0.75 disabled the reset 1 as it messes with the reset2
// function resetSketch() {
//     reInitPaint();
//     newFace = loadImage(faceURL);
//     image(newFace, 0, 0, width, height);
// }

// // // updated by shinji 27 jul reloading a face with url
// function reloading() {
//     // added shinji 27jul update the face img if the url is changed
// }






//////////////////////////////////////////////
// below resizing canvases


function setAllCanvasSize(){
    // allCanv_width = window.innerHeight * 0.9;
    // allCanv_height = window.innerHeight * 0.9;
    // resizeCanvas(windowHeight * 0.9, windowHeight * 0.9);
    allCanv_width = 670;
    allCanv_height = 670;

    console.log(allCanv_height);

    return allCanv_height, allCanv_width; 
}

// v0.7
function resizeP5canvas() {
    // resizeCanvas(allCanv_width, allCanv_height);
    // resizeCanvas(windowHeight * 0.9, windowHeight * 0.9);
    p5canvas.width = allCanv_width * dpr;
    p5canvas.height = allCanv_height * dpr;
}
function resizeStyleP5canvas() {
    // p5canvas.style.width  = allCanv_width  + "px";
    // p5canvas.style.height = allCanv_height  + "px";
    p5canvas.style.width  = (window.innerHeight * 0.9)  + "px";
    p5canvas.style.height = (window.innerHeight * 0.9)  + "px";
}
function resizeStyleP5canvasMob() {
    p5canvas.style.width  = (window.innerWidth * 0.9)  + "px";
    p5canvas.style.height = (window.innerWidth * 0.9)  + "px";
}


// v0.7
// this one resizing the face landmark canvas
function resizeLandmarkCanvas() {
    canvas.width = allCanv_width * dpr;
    canvas.height = allCanv_height * dpr;
}
// this one resizing the face landmark canvas
function resizeStyleLandmarkCanvas() {
    // canvas.style.width  = allCanv_width  + "px";
    // canvas.style.height = allCanv_height  + "px";
    canvas.style.width  = (window.innerHeight * 0.9)  + "px";
    canvas.style.height = (window.innerHeight * 0.9)  + "px";
}
function resizeStyleLandmarkCanvasMob() {
    canvas.style.width  = (window.innerWidth * 0.9)  + "px";
    canvas.style.height = (window.innerWidth * 0.9)  + "px";
}


// v0.75

// function resizeVideoContainerDiv(){
//     // https://stackoverflow.com/questions/10118172/setting-div-width-and-height-in-javascript
//     var videoContainer = document.getElementById('vid-container');
//     var videoSource = document.getElementById('vid-src');
//     var aspectRatioVid = videoSource.clientWidth / videoSource.clientHeight;

//     // engarge the frame width beyond the canvas size to crop
//     videoSource.setAttribute("style","display:block;width:" + (window.innerHeight * 0.9) * aspectRatioVid + "px");
//     videoSource.style.width= (window.innerHeight * 0.9) * aspectRatioVid + "px";
//     // videoSource.setAttribute("style","display:block;left:" + -200 + "px");
//     // videoSource.style.left= -200 + "px";
//     videoContainer.setAttribute("style","display:block;width:" + window.innerHeight * 0.9  + "px");
//     videoContainer.style.width= window.innerHeight * 0.9 + "px";
//     videoContainer.setAttribute("style","display:block;width:" + window.innerHeight * 0.9  + "px");
//     videoContainer.style.width= window.innerHeight * 0.9 + "px";
//     // console.log(aspectRatioVid);
// }


// prev ver fitting in the canv
function resizeVideoContainerDiv(){
    // https://stackoverflow.com/questions/10118172/setting-div-width-and-height-in-javascript
    var videoContainer = document.getElementById('vid-container');
    var videoSource = document.getElementById('vid-src');
    // var aspectRatioVid = videoSource.clientWidth / videoSource.clientHeight;

    // engarge the frame width beyond the canvas size to crop
    videoSource.setAttribute("style","display:block;width:" + (window.innerHeight * 0.9) + "px");
    videoSource.style.width= (window.innerHeight * 0.9) + "px";
    
    videoContainer.setAttribute("style","display:block;width:" + window.innerHeight * 0.9  + "px");
    videoContainer.style.width= window.innerHeight * 0.9 + "px";
    videoContainer.setAttribute("style","display:block;width:" + window.innerHeight * 0.9  + "px");
    videoContainer.style.width= window.innerHeight * 0.9 + "px";
    // console.log(aspectRatioVid);
}



// function resizeVideoContainerDiv(){
//     // https://stackoverflow.com/questions/10118172/setting-div-width-and-height-in-javascript
//     document.getElementById('vid-container').setAttribute("style","display:block;width:" + window.innerHeight * 0.9  + "px");
//     document.getElementById('vid-container').style.width= window.innerHeight * 0.9 + "px";
//     // document.getElementById('vid-container').setAttribute("style","display:block;height:" + window.innerHeight * 0.9  + "px");
//     // document.getElementById('vid-container').style.height= window.innerHeight * 0.9 + "px";
// }

// function resizeVideoContainerDiv(){
//     // https://stackoverflow.com/questions/10118172/setting-div-width-and-height-in-javascript
//     document.getElementById('vid-src').setAttribute("style","display:block;width:" + window.innerHeight * 0.9  + "px");
//     document.getElementById('vid-src').style.width= window.innerHeight * 0.9 + "px";
//     // document.getElementById('vid-src').setAttribute("style","display:block;height:" + window.innerHeight * 0.9  + "px");
//     // document.getElementById('vid-src').style.height= window.innerHeight * 0.9 + "px";
// }





// function centerP5Canvas() {
//   var p5canv_x = (windowWidth - p5canv_width) / 2;
//   var p5canv_y = (windowHeight - p5canv_height) / 2;
//   sketch.position(p5canv_x, p5canv_y);
// }


// // p5 windoresized event
function windowResized(){
    // centerP5Canvas();
    // changing the canvas size var and copy to the sizes of the p5 canv and the landmark canvas
    // setAllCanvasSize();
    // resizeP5canvas();
    // resizeLandmarkCanvas();

    /////////

    if (winWidth.matches) { // If media query matches
        //   setAllCanvasSize();
        //   resizeP5canvas();
        //   resizeLandmarkCanvas();
        resizeStyleLandmarkCanvasMob();
        resizeStyleP5canvasMob();
    } else {
        resizeStyleP5canvas();
        resizeStyleLandmarkCanvas();

    }
    

}




/////////////////////////////////////////////////////
// media query below

function mediaQ(winWidth) {
    if (winWidth.matches) { // If media query matches
        // enter mobile
        console.log("mob");
        resizeStyleLandmarkCanvasMob();
        resizeStyleP5canvasMob();
    } else {
        // enter non mobile
        console.log("non mob");
        resizeStyleP5canvas();
        resizeStyleLandmarkCanvas();
    }
  }
  
//   v0.7 moved to head
  // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_matchmedia2
//   var winWidth = window.matchMedia("(max-width: 767px)")
//   mediaQ(winWidth) // Call listener function at run time
//   winWidth.addListener(mediaQ) // Attach listener function on state changes
  

// // // initial function to get the the windowsize and resize the canvases
// function getWindowSizeForCanvasSize(winWidth) {
//     if (winWidth.matches) {
//         // if window is small get the width as the canvas size
//         allCanv_width = window.innerWidth * 0.9;
//         allCanv_height = window.innerWidth * 0.9;
//     } else {
//         // if not use the window hight
//         allCanv_width = window.innerHeight * 0.9;
//         allCanv_height = window.innerHeight * 0.9;
//     }

// }


