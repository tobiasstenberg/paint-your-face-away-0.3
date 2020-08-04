///////////////////
// created 7 july shinji

// var msgWidth = 180;


// document.querySelector('#messageWin').style.width = msgWidth + "px" ;


// window.addEventListener("resize", changeMsgWidth);
// window.addEventListener("resize", changeMsgWidth1);


// function changeMsgWidth() {
//     var width1 = window.innerWidth;
//     console.log("width " + width1);
//     // make the var width1 into a golab variable
//     // https://stackoverflow.com/questions/27887884/how-to-make-a-local-variable-into-global-javascript#:~:text=In%20pure%20javascript%20if%20you,be%20global%20with%20same%20value.%20%7D
//     globWidth1 = width1;
// }

// function changeMsgWidth1() {
//     var calcMsgWidth = (globWidth1 - 600) / 2;
//     console.log("msg width " + calcMsgWidth);
// }


//////////////////////

// blinking texts
// http://jsfiddle.net/umz8t/458/
// v0.6 class changed
function blinker() {
    $('#msgTxt1_1').fadeOut(500);
    $('#msgTxt1_1').fadeIn(500);
}

var blinking = setInterval(blinker, 1000);

// v0.6 blinker shorter span
function timeBlinker() {
    setTimeout(function(){ 
        clearInterval(blinking);
     }, 3000);
}

// v0.6 added
function clearBlinker() {
    clearInterval(blinking);
}


////////////////////////////////

// load a text/html into the main html
// https://stackoverflow.com/questions/17636528/how-do-i-load-an-html-page-in-a-div-using-javascript
function loadTxt_1 (e) {
    (e || window.event).preventDefault();

    fetch("txts/txt_msg1.html" /*, options */)
    .then((response) => response.text())
    .then((html) => {
        document.getElementById("msgTxt1").innerHTML = html;
    })
    .catch((error) => {
        console.warn(error);
    });
} 

// select and hide all the navigation messages
function hideAllNaviMsg() {
  var allNaviMsg = document.getElementsByClassName("navi_msg");
  var i;

  for (i = 0; i < allNaviMsg.length; i++) {

    allNaviMsg[i].style.display = 'none';
    console.log (i);
  }
}


// v0.6
function selectNaviMsg1() {
    hideAllNaviMsg();
    document.querySelector("#msgTxt1_1").style.display = "block"
    document.querySelector("#messageWin").style.display = "block";
    timeBlinker(); 
    showDetectButtons();

}

function selectNaviMsg2() {
    clearBlinker();
    hideAllNaviMsg();
    document.querySelector("#msgTxt1_2").style.display = "block";
    // document.querySelector("#messageWin").style.display = "block";

}

function selectNaviMsg3() {
    clearBlinker();
    hideAllNaviMsg();
    document.querySelector('#msgTxt1_3_no_detect').style.display = 'block';
    document.querySelector("#messageWin").style.display = "block";
}

// v0.6 load the popup messages in html
function loadTxt_2 (e) {
    (e || window.event).preventDefault();

    fetch("txts/txt_msg2.html" /*, options */)
    .then((response) => response.text())
    .then((html) => {
        document.getElementById("msgTxt2").innerHTML = html;
    })
    .catch((error) => {
        console.warn(error);
    });
} 

// select and hide all the popup paragraphs
function hideAllPopMsg() {
    var allPopMsg = document.getElementsByClassName("pop_msg");
    var i;
  
    for (i = 0; i < allPopMsg.length; i++) {
  
        allPopMsg[i].style.display = 'none';
    //   console.log ([i]);
    }
  }

/////////////////////////////////

// v0.6 shinji name changed
function showPopDiv() {
    blurAll();
    disableDraw();
    document.querySelector('#div_info').style.display = 'block';
    document.querySelector('#pop_window').style.display = 'block';
}

function closePopDiv() {
    enableDraw();
    removeBlurAll();
    document.querySelector('#div_info').style.display = 'none';
    document.querySelector('#pop_window').style.display = 'none';
}

function selectPopMessage1() {
    hideAllPopMsg();
    document.querySelector('#pop_save_message1').style.display = 'block';
}

function selectPopMessage2() {
    hideAllPopMsg();
    document.querySelector('#pop_no_face_msg1').style.display = 'block';
}

function selectPopMessage3() {
    hideAllPopMsg();
    document.querySelector('#pop_paint_thoroughly1').style.display = 'block';
}


// v0.6
// below stamp essages

function fadeOutStamp1(){ $("#stamp").fadeOut(2000); }
function fadeOutStamp2(){ $("#stamp2").fadeOut(3000); }


function timeoutToFadeStamp1() {
    document.querySelector('#stamp').style.display = 'block';
    setTimeout(fadeOutStamp1, 2500);
}

// v0.6
// fade stamp 2 for the paint blob
function timeoutToFadeStamp2() {
    document.querySelector('#stamp2').style.display = 'block';
    setTimeout(fadeOutStamp2, 2500);
}

// go into the no detection mode
function setupNoDetectionMode() {
    selectNaviMsg3();
    enableSave();
    document.querySelector("#face_buttons").style.display = "none";
}

// <- v0.6

//////////////// added 21 july

// prevent dragging the images
// https://stackoverflow.com/questions/7439042/css-js-to-prevent-dragging-of-ghost-image#:~:text=You%20can%20set%20the%20draggable,the%20markup%20or%20JavaScript%20code.&text=You%20can%20use%20a%20CSS%20property%20to%20disable%20images%20in%20webkit%20browsers.&text=This%20will%20disable%20dragging%20for,such%20as%20click%20and%20hover.

document.getElementById('btn_b_Type1').setAttribute('draggable', false);
document.getElementById('btn_b_Type2').setAttribute('draggable', false);


/////////////// added 28 july

function hideSpinner() {
    document.querySelector(".lds-spinner").style.display = "none";
}

function showSpinner() {
    document.querySelector(".lds-spinner").style.display = "inline-block";
}

// shinji added v0.6
function showImgButton() {
    document.querySelector(".inputWrapper").style.display = "block";
    document.querySelector("#webcam_button").style.display = "block";
}

function hideImgButton() {
    document.querySelector(".inputWrapper").style.display = "none";
    document.querySelector("#webcam_button").style.display = "none";
}

function showPaintPanel() {
    document.querySelector(".div_panel").style.display = "block";
}

function hidePaintPanel() {
    document.querySelector(".div_panel").style.display = "none";
}

function showDetectButtons() {
    document.querySelector("#face_buttons").style.display = "flex";
}

// change the save buttons

function enableSave() {
    document.querySelector("#save_button").style.background = "#0f0ce7";
    document.querySelector("#save_button").style.opacity = 1;
    document.querySelector("#save_button").style.display = "block";
    document.querySelector("#save_button").addEventListener("click", savingCanvas);
    document.querySelector("#save_button").addEventListener("click", selectPopMessage1);
    document.querySelector("#save_button").addEventListener("click", showPopDiv);
    console.log("enabled");
}

function disableSave() {
    document.querySelector("#save_button").style.background = "#b0b0b0";
    document.querySelector("#save_button").style.opacity = 0.0;
    document.querySelector("#save_button").style.display = "none";
    document.querySelector("#save_button").removeEventListener("click", savingCanvas);
    document.querySelector("#save_button").removeEventListener("click", selectPopMessage1);
    document.querySelector("#save_button").removeEventListener("click", showPopDiv);
    
    console.log("disabled");
}

let timing;

function timeoutToSave() {
    enableSave();
    timing = setTimeout(disableSave, 10000);
    // console.log("timed");
}

function stopTimeout() {
    clearTimeout(timing);
}


// v0.6
function reloadThePage() {
    location.reload();
    return false;
}


// v0.6 handling the dpi adapt here alone (moved from ml5faceapi js

// ////////
// https://stackoverflow.com/questions/35820750/understanding-html-retina-canvas-support
// Returns: 1 on 'normal' screens, 2 on retina displays
var pixelRatio = (function () {
    // var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        // bsr = canvas.webkitBackingStorePixelRatio ||
        //     canvas.mozBackingStorePixelRatio ||
        //     canvas.msBackingStorePixelRatio ||
        //     canvas.oBackingStorePixelRatio ||
        //     canvas.backingStorePixelRatio || 1;

            console.log("dpr " + dpr);

    // return dpr / bsr;
    return dpr ;
})();
///////////
console.log("pixel ratio" +pixelRatio);
