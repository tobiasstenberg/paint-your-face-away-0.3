// THIS FILE HANDLES UPLOADING AND RESIZING OF P5 CANVAS

// we need to fist grab the file input and all the canvases in the program
// then we can set the new size for the p5 canvas and hopefully just use resetSketch() so that p5 handles resizing of graphics elements

var p5canvas;
var newFace;

// this function needs to be an async callback!
setTimeout(function(){
    var fileInput = document.querySelector('#fileInput');
    p5canvas = document.querySelector('#myP5canvas1');
}, 1000)

fileInput.onchange = function (e) {
    onFileChange(e, fileInput.files);
};

function onFileChange(e, files) {
    console.log("onFileChange...");
    console.log("fileInput.files: ", files);

    var ctx0 = p5canvas.getContext("2d");
    newFace = new Image();
    
    newFace.onload = function() { 

        // addition shinji 27 july
        if (newFace.width && newFace.height < 601) {
            // ctx0.drawImage(newFace, 0, 0, newFace.width, newFace.height);
            ctx0.drawImage(newFace, 0, 0, 600, 600);

            // https://stackoverflow.com/questions/39619967/js-center-image-inside-canvas-element/39620144
            // var wrh = newFace.width / newFace.height;
            // var newWidth = p5canvas.width;
            // var newHeight = newWidth / wrh;
            // if (newHeight > p5canvas.height) {
            //             newHeight = p5canvas.height;
            //     newWidth = newHeight * wrh;
            //   }
            // var xOffset = newWidth < p5canvas.width ? ((p5canvas.width - newWidth) / 2) : 0;
            // var yOffset = newHeight < p5canvas.height ? ((p5canvas.height - newHeight) / 2) : 0;
    
            // ctx0.drawImage(newFace, xOffset, yOffset, newWidth, newHeight);

  

        } 
        else {
            // resizeCanvas(600, 600);
            ctx0.drawImage(newFace, 0, 0, 600, 600);
            
            ////////// cropping and centreing an image
            // https://stackoverflow.com/questions/39794009/crop-the-exact-center-of-a-canvas-image-source
            // ctx0.drawImage(newFace, 
            //     (newFace.width - 600) / 2,   // sx, 200 pixels to the left from center
            //     (newFace.height - 600) / 2,  // sy, 175 pixels above center
            //     newFace.width, newFace.height, 0, 0, 600, 600);  // sw, sh, dx, dy, dw, dh
        }

        // face = loadImage(newFace);
    };

    newFace.src = './img/' + files[0].name;
    console.log(newFace.src);
    // face.src = newFace.src;
    // console.log("face is" + face.src);
    
    faceURL = newFace.src;
    window.faceURL = faceURL;
    reloading();
    resetSketch();

    // the following lines are never executed but the max width and height should be implemented above
    var reader = new FileReader(files[0]);
    reader.onload = function (event) {
        console.log("reader.onLoad running...")
        img = new Image();
        img.onload = function () {
            if (img.width < 2500 && img.height < 2500) {
                canvasScale = 1;
            } else {
                canvasScale = Math.min(2500 / img.width, 2500 / img.height);
            }

            p5canvas.width = img.width * canvasScale;
            p5canvas.height = img.height * canvasScale;

            face = loadImage(img);
            resetSketch();

        };
        img.src = event.target.result;
    };

}

