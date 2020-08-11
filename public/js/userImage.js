// THIS FILE HANDLES UPLOADING AND RESIZING OF P5 CANVAS

// we need to fist grab the file input and all the canvases in the program
// then we can set the new size for the p5 canvas and hopefully just use resetSketch() so that p5 handles resizing of graphics elements

var p5canvas;
var newFace;

// v0.75 ali
let vidstream;
// const vidSrc = document.getElementById('vid-src');
const vidSrc = document.getElementById('vid-src');


function idingCanvas() {
    var fileInput = document.querySelector('#fileInput');
    p5canvas = document.querySelector('#myP5canvas1');
    console.log("p5canv id'ed");
    // showImgButton();
    window.p5canvas = p5canvas;
}

// https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
window.addEventListener('load', function() {
    //  v0.4 shinji 30jul 

    document.querySelector('#fileInput').addEventListener('change', function() {
        if (this.files && this.files[0]) {

            var newFace = new Image();
            newFace.src = URL.createObjectURL(this.files[0]); // set src to blob url

            var ctx0 = p5canvas.getContext("2d");


            // convert the newFace src here
            faceURL = newFace.src;
            // and make it global
            window.faceURL = faceURL;
            // create a globa var for newFace
            window.newFace = newFace;

            newFace.onload = function() { 
        
                unborder = p5canvas.style.border = "0px";

                // addition shinji 27 july
                if (newFace.width < 1200 && newFace.height < 1200) {

                    canvasScale = 1;

                    resizeLoadedImage();


                } 
                else {
                    // p5canvas.width = img.width * canvasScale;
                    // p5canvas.height = img.height * canvasScale;
                    canvasScale = Math.min(900 / newFace.width, 900 / newFace.height);

                    resizeLoadedImage();

                }
        
            };

            // reflect the change to the global 
            window.ctx0 = ctx0;
        

            resetSketch2();
            // v0.6 update
            disableSave();

            // moved from the index html
            enableDraw();

            hideImgButton();
            
            showSpinner();

            // v0.7
            context.clearRect(0, 0, width * dpr, height * dpr);

            setTimeout(function(){ 
                // v0.6 moved the  showDetectButtons();

                // timeoutDetect();
                // swapped for the initial detection

                timeoutInitDetect();

                // v0.7 no hidespinner()
            }, 1000);

            // v0.6 activate paint blob
            // v0.65 temp disable below
            timeoutToEnableBlob();

        }
    });
  });


  function resizeLoadedImage() {        
        // // https://stackoverflow.com/questions/39619967/js-center-image-inside-canvas-element/39620144
        var scale = Math.min(p5canvas.width / newFace.width, p5canvas.height / newFace.height);
        var w = newFace.width * scale;
        var h = newFace.height * scale;
        var left = p5canvas.width / 2 - w / 2;
        var top = p5canvas.height / 2 - h / 2;

        ctx0.clearRect(0, 0, width, height);
        ctx0.drawImage(newFace, left / dpr, top / dpr, w / dpr, h / dpr);
        
  }

//   0.7 disabled
//   function resizeLoadedImageWinResize() {
//     // // https://stackoverflow.com/questions/39619967/js-center-image-inside-canvas-element/39620144
//     var scale = Math.min(p5canvas.width / newFace.width, p5canvas.height / newFace.height);
//     var w = newFace.width * scale;
//     var h = newFace.height * scale;
//     var left = p5canvas.width / 2 - w / 2;
//     var top = p5canvas.height / 2 - h / 2;

//     ctx0.clearRect(0, 0, width, height);
//     ctx0.drawImage(newFace, left , top , w , h );

// }



    // v0.75 ali /////
      // turn on webcam on for user to take image. 
    // how does it work? Well you have to request permission from the 
    // user first, and also request a track. In this case just video, no audio.
    // from there we handle the operation through a series of callbacks, with a 
    // catch error statement. 
    // As well once permission is granted by the user, we remove the div and 
    // DOM elements that live within the empty canvas.
    document.querySelector('#webcam_button').addEventListener('click', function() {

        if(navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ 
                video: true
            })
            .then(function(stream) {
    
                vidstream = stream; 
                vidSrc.srcObject = stream;
                console.log(vidSrc)

                // here resize the video src and the container div
                resizeVideoContainerDiv();

                hideImgButton();
                unborder = p5canvas.style.border = "0px";
                showWebcamInterface();

            }).catch(function (err0r) {
                console.log(err0r)
                console.log("Something went wrong!");
            });
        }
    });


// v0.75 ali //////////SNAP /////////////
        /**
     * Take take image from webcam and draw it onto canvas. This can only be done when the
     * webcam is off as the snap button is hidden.
     */
    document.querySelector('#snap').addEventListener('click', function() {
        var ctx0 = p5canvas.getContext("2d");
        ctx0.clearRect(0, 0, width , height );
        // ctx0.drawImage(vidSrc, 0, 0, vidSrc.clientWidth , vidSrc.clientHeight );
        var aspectRatioVid = vidSrc.clientWidth / vidSrc.clientHeight;

        // v0.75 -------below webcam clip v1: prev ver with the image not cropped but just reisized to fit the canv-----
        // ctx0.drawImage(vidSrc, 0, 
        //     (p5canvas.height - (p5canvas.width / aspectRatioVid)) / 2 / dpr , 
        //     p5canvas.width / dpr, 
        //     (p5canvas.width / aspectRatioVid) / dpr 
        //     );
        // ----------------------

        // // v0.75 ---------below webcam clip v2: draw image to the p5 canvas / centres and crops
        ctx0.drawImage(vidSrc, 
            - ((p5canvas.width * aspectRatioVid) - p5canvas.width) / 2 / dpr, 
            0, 
            (p5canvas.width * aspectRatioVid) / dpr, 
            p5canvas.height  / dpr 
            );
            // -----------------

        var p5canv_x = (windowWidth - p5canv_width) / 2;
        var p5canv_y = (windowHeight - p5canv_height) / 2;
        document.querySelector("#vid-container").style.left = p5canv_x * dpr;
        document.querySelector("#vid-container").style.top = p5canv_y * dpr;


        window.ctx0 = ctx0;

        // below v0.75 shinji
        hideWebcamInterface();

        // moved from the index html
        // v0.75 shinji 
        showSpinner();

        /**
         * The below section is the options of hidding or displaying opbjects. 
         * Customise to suite platform UX and UI design.
         */


        /**
         * Stop video stream. We can not just stop the track, first with have to query the
         * video stream object "vidSrc" in this case and get all the stream track (this includes audio)
         * into an array that we can iterate over. from there we can call the MediaStreamTrack.stop() 
         * method.
         */
        vidstream.getTracks().forEach(function(track) {
            track.stop()
        });

        // v0.75 shinji 

        setTimeout(function(){ 
            // hide the reupload button up uploading an image
            document.querySelector("#inputButton2").style.display = "none";

            timeoutInitDetect();

            // v0.7 no hidespinner()
        }, 1000);

        // do i need the two functios below here?
        enableDraw();
        reInitPaint();
        // timeout to show the "paint blobs" option
        timeoutToEnableBlob();

        //////////////////////////////
        // Below storing the url and blob of the webcam image snapped for resetting the sketch
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
        p5canvas.toBlob(function(blob) {
            // var newFace = document.createElement('img'),
            var newFace = new Image();
            newFace.src = URL.createObjectURL(blob);
            
            // convert the newFace src here
            faceURL = newFace.src;
            // and make it global
            window.faceURL = faceURL;
            // create a globa var for newFace
            window.newFace = newFace;

            newFace.onload = function() {
                console.log("newface onload");
            };
            
            console.log("newFace is"+ newFace);
            console.log("url is" + faceURL);
            console.log("blob is" + blob);

        });
        ////////////////////////////
    });


    // function copyTheWebcamCanv() {
    //     var WebcamData = ctx0.getImageData(10, 10, 50, 50);
    //     ctx0.putImageData(WebcamData, 400, 70);
    //     }



    // v0.75 shinji 
    function hideWebcamInterface() {
        // Turn vid source and snap button to hidden DOM elements
        document.querySelector("#vid-container").style.display = "none";
        document.querySelector("#vid-src").style.display = "none";
        document.querySelector("#snap").style.display = "none";
    }

    function showWebcamInterface() {
        // Turn vid source and snap button to hidden DOM elements
        document.querySelector("#vid-container").style.display = "block";
        document.querySelector("#vid-src").style.display = "block";
        document.querySelector("#snap").style.display = "block";
    }



///////////////////////////////

// // -------- below backup prev ver for loading images
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