// THIS FILE HANDLES UPLOADING AND RESIZING OF P5 CANVAS

// we need to fist grab the file input and all the canvases in the program
// then we can set the new size for the p5 canvas and hopefully just use resetSketch() so that p5 handles resizing of graphics elements

var p5canvas;
var newFace;


// // this function needs to be an async callback!
// setTimeout(function(){
//     var fileInput = document.querySelector('#fileInput');
//     p5canvas = document.querySelector('#myP5canvas1');
//     console.log("timeout p5canv id'ed");
//     showImgButton();
// }, 2500)

// setTimeout(function(){
//     console.log("timeout p5canv id'ed");
//     idingCanvas();
// }, 10000)

function idingCanvas() {
    var fileInput = document.querySelector('#fileInput');
    p5canvas = document.querySelector('#myP5canvas1');
    console.log("p5canv id'ed");
    // showImgButton();
}

// https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
window.addEventListener('load', function() {
    //  v0.4 shinji 30jul 

    document.querySelector('#fileInput').addEventListener('change', function() {
        if (this.files && this.files[0]) {

            var newFace = new Image();
            newFace.src = URL.createObjectURL(this.files[0]); // set src to blob url

            var ctx0 = p5canvas.getContext("2d");
            // shinji show image upload button here so that the ctx0 won't be empty
            // showImgButton();


            // convert the newFace src here
            faceURL = newFace.src;
            // and make it global
            window.faceURL = faceURL;
            // create a globa var for newFace
            window.newFace = newFace;

            newFace.onload = function() { 
        
                // v0.4 shinji 30 jul 
                unborder = p5canvas.style.border = "0px";

                // addition shinji 27 july
                if (newFace.width < 1200 && newFace.height < 1200) {

                    canvasScale = 1;

                    resizeLoadedImage();


                } 
                else {
                    // resizeCanvas(600, 600);
                    //
                    // p5canvas.width = img.width * canvasScale;
                    // p5canvas.height = img.height * canvasScale;
                    //
                    canvasScale = Math.min(900 / newFace.width, 900 / newFace.height);

                    resizeLoadedImage();

                }
        
            };

            // reflect the change to the global ?
            window.ctx0 = ctx0;
        
            reloading();

            // resetSketch();
            resetSketch2();
            // v0.6 update
            disableSave();

            // moved from the index html
            enableDraw();

            hideImgButton();
            
            showSpinner();

            setTimeout(function(){ 
                showPaintPanel();
                // v0.6 moved the  showDetectButtons();

                // timeoutDetect();
                // swapped for the initial detection
                // v0.6
                timeoutInitDetect();

                hideSpinner();

            }, 1000);

            // v0.6 activate paint blob
            timeoutToEnableBlob();

        }
    });
  });


  function resizeLoadedImage() {
        // face = loadImage(faceURL);   
        // face = newFace; 

        
        // // https://stackoverflow.com/questions/39619967/js-center-image-inside-canvas-element/39620144
        var scale = Math.min(p5canvas.width / newFace.width, p5canvas.height / newFace.height);
        var w = newFace.width * scale;
        var h = newFace.height * scale;
        var left = p5canvas.width / 2 - w / 2;
        var top = p5canvas.height / 2 - h / 2;

        ctx0.clearRect(0, 0, width, height);
        ctx0.drawImage(newFace, left / dpr, top / dpr, w / dpr, h / dpr);

        // ctx0.resize(width, height);
        // image(face, left, top , w, h);
  }

// // -------- below backup prev ver
// function resizeLoadedImage() {
//     // https://stackoverflow.com/questions/39619967/js-center-image-inside-canvas-element/39620144
//     var scale = Math.min(p5canvas.width / newFace.width, p5canvas.height / newFace.height);
//     var w = newFace.width * scale;
//     var h = newFace.height * scale;
//     var left = p5canvas.width / 2 - w / 2;
//     var top = p5canvas.height / 2 - h / 2;

//     ctx0.clearRect(0, 0, width, height);

//     // ctx0.drawImage(newFace, left, top , w, h);

//     // ctx0.resize(width, height);
//     image(face, left, top , w, h);
// }


    // // // tobias the following lines are never executed but the max width and height should be implemented above
    // var reader = new FileReader(files[0]);
    // reader.onload = function (event) {
    //     console.log("reader.onLoad running...")
    //     img = new Image();
    //     img.onload = function () {
    //         if (img.width < 2500 && img.height < 2500) {
    //             canvasScale = 1;
    //         } else {
    //             canvasScale = Math.min(2500 / img.width, 2500 / img.height);
    //         }

    //         p5canvas.width = img.width * canvasScale;
    //         p5canvas.height = img.height * canvasScale;

    //         face = loadImage(img);
    //         resetSketch();

    //     };
    //     img.src = event.target.result;
    // };


        
                    // // https://stackoverflow.com/questions/39619967/js-center-image-inside-canvas-element/39620144
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

                    // // https://stackoverflow.com/questions/39619967/js-center-image-inside-canvas-element/39620144
                    // var scale = Math.min(p5canvas.width / newFace.width, p5canvas.height / newFace.height);
                    // var w = newFace.width * scale;
                    // var h = newFace.height * scale;
                    // var left = p5canvas.width / 2 - w / 2;
                    // var top = p5canvas.height / 2 - h / 2;


                    // ctx0.clearRect(0, 0, width, height);
                    // ctx0.drawImage(newFace, left, top , w, h);

                                        
                    ////////// cropping and centreing an image
                    // https://stackoverflow.com/questions/39794009/crop-the-exact-center-of-a-canvas-image-source
                    // ctx0.drawImage(newFace, 
                    //     (newFace.width - 600) / 2,   // sx, 200 pixels to the left from center
                    //     (newFace.height - 600) / 2,  // sy, 175 pixels above center
                    //     newFace.width, newFace.height, 0, 0, 600, 600);  // sw, sh, dx, dy, dw, dh