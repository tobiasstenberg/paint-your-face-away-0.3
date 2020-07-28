let faceapi;
// let img;
let detections;
let width = 600;
let height = 600;
let canvas, context;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: true,

    minConfidence: 0.4,
    withTinyNet: true,

    MODEL_URLS: {
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

    canvas = createCanvasFace(width, height);
    context = canvas.getContext('2d');

    faceapi = await ml5.faceApi(detection_options, modelReady)
    context.clearRect(0, 0, width, height);
    
}
// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    make();
  });


function modelReady() {
    console.log('ready!')
    // faceapi.detectSingle(sketch, gotResults)
}

function runDetection() {
    context.clearRect(0, 0, width, height);
    
    faceapi.detectSingle(sketch, gotResults)
}
 

function gotResults(err, result) {
    hideSpinner();

    if (err) {
        console.log(err)
        console.log("not detected")

        stopTimeout();        
        timeoutToSave();
        
        return 
    }

    // console.log(result)
    detections = result;

    if (detections) {
        console.log(detections)
        drawBox(detections)
        drawLandmarks(detections)
    } 
}

function drawBox(detections){
    const alignedRect = detections.alignedRect;
    const {_x, _y, _width, _height} = alignedRect._box;
    // canvas.fillStyle = 'none';
    context.strokeStyle = "rgb(255, 128, 128)";
    context.lineWidth = 2;
    context.rect(_x, _y, _width, _height);
    context.stroke();
}

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
    context.lineWidth = 3;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
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
    context.lineWidth = 3;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
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
    context.lineWidth = 3;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
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
    context.lineWidth = 3;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
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
    context.lineWidth = 3;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
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
    context.lineWidth = 3;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.stroke();

    // context.closePath();
}

// Helper Functions
function createCanvasFace(w, h){
    const canvas = document.createElement("canvas"); 
    canvas.width  = w;
    canvas.height = h;
    document.body.appendChild(canvas);

    // below line added to give an id to the canv
    canvas.id = "land_canv";

    return canvas;
  }

let autoDetect;

function faceRedraw() {
    autoDetect = setInterval(runDetection, 1200);
    }

function clearFaceRedraw() {
    context.clearRect(0, 0, width, height);

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


// alternative below

// function faceRedraw() {
//     autoDetect = setTimeout(function runDetection(){ 
//         setTimeout(runDetection, 300);
//         // updatingPaint();
//         console.log("bang");
//     }, 5000);

//     }

// function clearFaceRedraw() {
//     context.clearRect(0, 0, width, height);
//     clearTimeout(autoDetect);
//     }