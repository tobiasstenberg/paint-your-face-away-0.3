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
function blinker() {
    $('.message').fadeOut(500);
    $('.message').fadeIn(500);
}

var blinking = setInterval(blinker, 1000);

function timeBlinker() {
    setTimeout(function(){ 
        clearInterval(blinking);
     }, 5000);
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

// function loadTxt_1 (e) {
//     (e || window.event).preventDefault();

//     fetch("txts/txt_msg1.html" /*, options */)
//     .then((response) => response.text())
//     .then((html) => {
//         document.getElementById("msgTxt1").innerHTML = html;
//     })
//     .catch((error) => {
//         console.warn(error);
//     });
// } 

/////////////////////////////////

function showInfoDiv() {
    blurCnv();
    disableDraw();
    document.querySelector('#div_info').style.display = 'block';
}

function closeInfoDiv() {
    enableDraw();
    removeBlurCnv();
    document.querySelector('#div_info').style.display = 'none';
}


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


// change the save buttons

function enableSave() {
    document.querySelector("#save_button").style.background = "#0f0ce7";
    document.querySelector("#save_button").style.opacity = 1;
    document.querySelector("#save_button").addEventListener("click", savingCanvas);
    console.log("enabled");
}

function disableSave() {
    document.querySelector("#save_button").style.background = "#b0b0b0";
    document.querySelector("#save_button").style.opacity = 0.2;
    document.querySelector("#save_button").removeEventListener("click", savingCanvas);
    console.log("disabled");
}

let timing;

function timeoutToSave() {
    enableSave();
    timing = setTimeout(disableSave, 5000);
    console.log("timed");
}

function stopTimeout() {
    clearTimeout(timing);
}