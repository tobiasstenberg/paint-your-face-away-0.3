// // high dpi adjustment
// // https://www.html5rocks.com/en/tutorials/canvas/hidpi/
// // Get the device pixel ratio, falling back to 1.
// var dpr = window.devicePixelRatio || 1;
// // // Get the size of the canvas in CSS pixels.
// // var rect = canvas.getBoundingClientRect();



let faceapi;
// let img;
let detections;
let landCanvWidth = allCanv_width ;
let landCanvHeight = allCanv_height ;
let canvas, context;
// v0.7
// let landLineWidth1 = 3;
// let landLineWidth2 = 2;
// let boxLineWidth = 2 ;
let landLineWidth1 = (allCanv_width + allCanv_height / 2) / 300;
let landLineWidth2 = (allCanv_width + allCanv_height / 2) / 400;
let boxLineWidth = (allCanv_width + allCanv_height / 2) / 400;


// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: true,

    minConfidence: 0.4,
    withTinyNet: true,

    MODEL_URLS: {
        // Mobilenetv1Model: '/js/libs/ml5@0.5.0/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json',
        Mobilenetv1Model: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json',
        FaceLandmarkModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_model-weights_manifest.json',
        FaceLandmark68TinyNet: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json',
        // FaceRecognitionModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_recognition_model-weights_manifest.json',
      },
}


async function make(){
    // img = new Image();
    // img.src = 'img/face.jpg';
    // img.width = width;
    // img.height = height;

    canvas = createCanvasFace(landCanvWidth, landCanvHeight);
    context = canvas.getContext('2d');

    faceapi = await ml5.faceApi(detection_options, modelReady)
    // context.clearRect(0, 0, width * dpr, height * dpr);
    
}
// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    make();
  });

function modelReady() {
    console.log('ready!')
    // faceapi.detectSingle(sketch, gotResults)
}

// 0.65 
function enterNoDetectionMode() {
    selectNaviMsg3();
    selectPopMessage2();
    showPopDivNoFaceMsg();

    removeSavingFunctionToReset();
}

function enterDetectionMode() {
    selectNaviMsg1();
    showDetectButtons();
}


// v0.6
/////////////////// for initial detection ///////////////////////
function runInitDetection() {
    // context.clearRect(0, 0, width * dpr, height * dpr);
    faceapi.detectSingle(sketch, gotInitResults)
}

// v0.6
// the detection for the initial one
function gotInitResults(err, result) {

    // initial not detected
    if (err) {
        // console.log(err);
        console.log("not detected")

        // stopTimeout();        
        // timeoutToSave()
        
        // v0.65
        enterNoDetectionMode();
        
        // v0.7 hidespinner() moved from openimage.js
        hideSpinner();
        return 
    }

    // console.log(result)
    detections = result;

    // v0.6
    // first time face detected
    if (detections) {
        console.log(detections)
        drawBox(detections)
        drawLandmarks(detections)

        // v0.65
        enterDetectionMode();

        // v0.7 hidespinner() moved from openimage.js
        hideSpinner();
    } 

}
// <- v0.6
// timeout detection just for the initial detection
    // v0.6
    let timingOutInitDetect;

    function timeoutInitDetect() {
        clearTimeout(timingOutInitDetect);
        runInitDetection();
    
        timingOutInitDetect = setTimeout(function(){ 
            context.clearRect(0, 0, width * dpr, height * dpr);
            }, 15000);
    
        }
///////

/////////////////// for the usual detection ///////////////////////
function runDetection() {
    context.clearRect(0, 0, width * dpr, height * dpr);
    
    faceapi.detectSingle(sketch, gotResults)
}

////////
function gotResults(err, result) {

    // if the detection goes off after the second time
    if (err) {
        // console.log(err)
        console.log("not detected")

        stopTimeout(); 
        timeoutToFadeStamp1();
        timeoutToSave();

        // added v0.6
        selectNaviMsg2();
        
        // v0.7 hidespinner() moved from the top of the function
        hideSpinner();

        return 
    }

    // console.log(result)
    detections = result;

    if (detections) {
        console.log(detections)
        drawBox(detections)
        drawLandmarks(detections)

        // v0.7 hidespinner() moved from the top of the function
        hideSpinner();
        console.log(result)
    } 

}

// v0.6
let timingOutDetect;

function timeoutDetect() {
    clearTimeout(timingOutDetect);
    runDetection();

    timingOutDetect = setTimeout(function(){ 
        context.clearRect(0, 0, width * dpr, height * dpr);
        }, 10000);

    }


// v0.6
/////////////////// for the blobs + detection ///////////////////////
// the detection - for blobs - connected to paintBlobs.js

function gotResultsBlobs(err, result) {

    // if the detection goes off 
    if (err) {
        // console.log(err)
        console.log("not detected")

        stopTimeout(); 
        timeoutToFadeStamp2();
        timeoutToSave();

        selectNaviMsg2();
        
        // v0.7 hidespinner() moved from the top of the function
        hideSpinner();

        return 
    }

    // console.log(result)
    detections = result;

    if (detections) {
        console.log(detections)
        // timeout drawing just for blobs
        // v0.6
        throwPaint();
        drawBox(detections)
        drawLandmarks(detections)

        // v0.7 hidespinner() moved from the top of the function
        hideSpinner();
    } 


}

// v0.6 detection for blob
function runDetectionBlob() {
    showSpinner();
    context.clearRect(0, 0, width * dpr, height * dpr);
    faceapi.detectSingle(sketch, gotResultsBlobs)
}

let timingOutLandmarksClearBlob;

function timeoutLandmarksClearBlob() {
    clearTimeout(timingOutLandmarksClearBlob);

    timingOutLandmarksClearBlob = setTimeout(function(){ 
        context.clearRect(0, 0, width * dpr, height * dpr);
        }, 3000);

}

///////


// landmark drawing
function drawLandmarks(detections){
    // mouth
    context.beginPath();
    detections.parts.mouth.forEach( (item, idx) => {
        if(idx = 0){
            context.moveTo(item._x, item._y);
        } else {
            context.lineTo(item._x, item._y);
        }
    })
    context.closePath();
    context.strokeStyle = "rgb(255, 0, 0)";
    context.lineWidth = landLineWidth1 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = landLineWidth2 * dpr;
    context.stroke();

    // nose
    context.beginPath();
    detections.parts.nose.forEach( (item, idx) => {
        if(idx = 0){
            context.moveTo(item._x, item._y);
        } else {
            context.lineTo(item._x, item._y);
        }
    })
    context.strokeStyle = "rgb(255, 0, 0)";
    context.lineWidth = landLineWidth1 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = landLineWidth2 * dpr;
    context.stroke();

    // // left eye
    context.beginPath();
    detections.parts.leftEye.forEach( (item, idx) => {
        if(idx = 0){
            context.moveTo(item._x, item._y);
        } else {
            context.lineTo(item._x, item._y);
        }
    })
    context.closePath();
    context.strokeStyle = "rgb(255, 0, 0)";
    context.lineWidth = landLineWidth1 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = landLineWidth2 * dpr;
    context.stroke();

    // // right eye
    context.beginPath();
    detections.parts.rightEye.forEach( (item, idx) => {
        if(idx = 0){
            context.moveTo(item._x, item._y);
        } else {
            context.lineTo(item._x, item._y);
        }
    })
    
    context.closePath();
    context.strokeStyle = "rgb(255, 0, 0)";
    context.lineWidth = landLineWidth1 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = landLineWidth2 * dpr;
    context.stroke();

    // // right eyebrow
    context.beginPath();
    detections.parts.rightEyeBrow.forEach( (item, idx) => {
        if(idx = 0){
            context.moveTo(item._x, item._y);
        } else {
            context.lineTo(item._x, item._y);
        }
    })
    context.strokeStyle = "rgb(255, 0, 0)";
    context.lineWidth = landLineWidth1 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = landLineWidth2 * dpr;
    context.stroke();
    context.closePath();

    
    // // left eyeBrow
    context.beginPath();
    detections.parts.leftEyeBrow.forEach( (item, idx) => {
        if(idx = 0){
            context.moveTo(item._x, item._y);
        } else {
            context.lineTo(item._x, item._y);
        }
    })
    context.strokeStyle = "rgb(255, 0, 0)";
    context.lineWidth = landLineWidth1 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = landLineWidth2 * dpr;
    context.stroke();

    // context.closePath();
}

function drawBox(detections){
    // shinji v0.4 29july add this begin path to clear the duplicated left eyebrow 
    context.beginPath();

    const alignedRect = detections.alignedRect;
    const {_x, _y, _width, _height} = alignedRect._box;
    // canvas.fillStyle = 'none';
    context.strokeStyle = "rgb(255, 128, 128)";
    context.lineWidth = boxLineWidth * dpr;
    context.rect(_x, _y, _width, _height );
    context.stroke();

    // v0.6 take the face dimentions and make them global
    window.detectX = _x;
    window.detectY = _y;
    window.detectWidth = _width;
    window.detectHeight = _height;
    console.log(detectX, detectY, _width, _height);
}



// Helper Functions
// create the canvas for drawing the landmarks on
function createCanvasFace(w, h){
    
    const canvas = document.createElement("canvas"); 

    // // v0.6
    // // add eventlistner for the temp disable draw
    canvas.addEventListener("mouseenter", tempEnableDraw);
    canvas.addEventListener("mouseleave", tempDisableDraw);

    // v0.65
    // v0.7 resolution half of p5 to make it lighter
    canvas.width = w * dpr ;
    canvas.height  = h * dpr ;
    // v0.7
    // canvas.style.width  = w  + "px";
    // canvas.style.height = h  + "px";
    // v0.7 -> revised below resize the css style of the canvas
    if (winWidth.matches) { 
        // If the window below 768px query matches
        // enter mobile
        canvas.style.width  = (window.innerWidth * 0.9)  + "px";
        canvas.style.height = (window.innerWidth * 0.9)  + "px";
    } else {
        // enter non mobile
        canvas.style.width  = (window.innerHeight * 0.9)  + "px";
        canvas.style.height = (window.innerHeight * 0.9)  + "px";
    }

    document.querySelector("#compiled").appendChild(canvas);

    // below line added to give an id to the canv
    canvas.id = "land_canv";

    return canvas;
  }





let autoDetect;

// 0.7 async
async function faceRedraw() {
    autoDetect = setInterval(runDetection, 1200);
    }

function clearFaceRedraw() {
    context.clearRect(0, 0, width * dpr, height * dpr);

    clearInterval(autoDetect);
    }




// //////////// alternative face api
// https://www.youtube.com/watch?v=CVClHLwv-4I&t=1s

// function faceRedraw() {
//     autoDetect = setInterval(async () => {
//         runDetection
//         }, 200);
//     }

// function clearFaceRedraw() {
//     context.clearRect(0, 0, width, height);

//     clearInterval(autoDetect);
//     }
