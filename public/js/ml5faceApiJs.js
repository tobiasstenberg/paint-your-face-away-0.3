// // high dpi adjustment
// // https://www.html5rocks.com/en/tutorials/canvas/hidpi/
// // Get the device pixel ratio, falling back to 1.
// var dpr = window.devicePixelRatio || 1;
// // // Get the size of the canvas in CSS pixels.
// // var rect = canvas.getBoundingClientRect();



let faceapi;
// let img;
let detections;
let width = 600  ;
let height = 600 ;
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

function runDetection() {
    context.clearRect(0, 0, width * dpr, height * dpr);
    
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
    context.lineWidth = 3 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2 * dpr;
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
    context.lineWidth = 3 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2 * dpr;
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
    context.lineWidth = 3 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2 * dpr;
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
    context.lineWidth = 3 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2 * dpr;
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
    context.lineWidth = 3 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2 * dpr;
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
    context.lineWidth = 3 * dpr;
    context.stroke();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2 * dpr;
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
    context.lineWidth = 2 * dpr;
    context.rect(_x, _y, _width, _height );
    context.stroke();

}



// Helper Functions
function createCanvasFace(w, h){
    
    const canvas = document.createElement("canvas"); 

    // ////////
    // https://stackoverflow.com/questions/35820750/understanding-html-retina-canvas-support
    // Returns: 1 on 'normal' screens, 2 on retina displays
    var pixelRatio = (function () {
        // var ctx = document.createElement("canvas").getContext("2d"),
            dpr = window.devicePixelRatio || 1,
            bsr = canvas.webkitBackingStorePixelRatio ||
                canvas.mozBackingStorePixelRatio ||
                canvas.msBackingStorePixelRatio ||
                canvas.oBackingStorePixelRatio ||
                canvas.backingStorePixelRatio || 1;

                console.log("dpr " + dpr);

        // return dpr / bsr;
        return dpr / bsr ;
    })();
    ///////////


    // dpr adjustment
    canvas.width = w * pixelRatio ;
    canvas.height  = h * pixelRatio;
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
    context.clearRect(0, 0, width * dpr, height * dpr);

    clearInterval(autoDetect);
    }

function timeoutDetect() {
    clearTimeout();
    runDetection();

    setTimeout(function(){ 
        context.clearRect(0, 0, width * dpr, height * dpr);
    }, 5000);

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
