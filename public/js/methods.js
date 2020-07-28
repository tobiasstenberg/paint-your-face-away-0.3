////////////////////////
// oneline for changing the global composite operation
function changeGlobalComposite(operation) { p5.instance.drawingContext.globalCompositeOperation = operation; }

///////////////////////
// // function for shuffling and introduces randomness to the painting
// function shuffleVar() {
//     // changed 5 july shinji
//     let val = floor(random(0, 2) + 1);
//     document.getElementById("shuffleNo").innerHTML = "random " + val; 
// }
//     // change ends here

// shinji the size calc changed
function switchSmlBrush() { 
    brushSize = 600 / 40; 
    // brushSize = 15; 
    // document.querySelector('#brushMed').classList.toggle('toggled');
    // document.querySelector('#brushSml').classList.toggle('toggled');
}

function switchMedBrush() { 
    brushSize = 38; 
    // document.querySelector('#brushMed').classList.toggle('toggled');
    // document.querySelector('#brushSml').classList.toggle('toggled');
}

// shinji new size added
function switchLrgBrush() { 
    brushSize = 64; 
    // document.querySelector('#brushMed').classList.toggle('toggled');
    // document.querySelector('#brushSml').classList.toggle('toggled');
}

function switchBrushSize(size) { 
    brushSize = size; 

    // --- below shinji: add the "active" class to the selected button
    // https://www.w3schools.com/howto/howto_js_active_element.asp
    // switch between the brush button
    var selectBrushSizeButton = document.getElementsByClassName("button button_paint_square btn_brush_size");
    for (var i = 0; i < selectBrushSizeButton.length; i++) {
        selectBrushSizeButton[i].addEventListener("click", function() {
            var current2 = document.getElementsByClassName("active2");
            current2[0].className = current2[0].className.replace(" active2", "");
            this.className += " active2";
            });
    }
}

function switchBrushType(type) {
    brushType = type;
    // document.querySelector('#brushType1').classList.toggle('toggled');
    // document.querySelector('#brushType2').classList.toggle('toggled');
    
    // brushType needs to be incremented with 1 to convert the array number to regular number
    // document.querySelector('#paintType').innerHTML = "Brushtype: " + (brushType + 1);  
    
    // --- below shinji: add the "active" class to the selected button
    // https://www.w3schools.com/howto/howto_js_active_element.asp
    // switch between the brush button
    var selectBrushTypeButton = document.getElementsByClassName("button button_paint_square btn_brush_type");
    
    for (var i = 0; i < selectBrushTypeButton.length; i++) {
        selectBrushTypeButton[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active1");
            current[0].className = current[0].className.replace(" active1", "");
            this.className += " active1";
            });
    }
}


// --- addition 5 july shinji

let drawingOnOff
drawingOnOff = 1;
let tempDrawOnOff
tempDrawOnOff = 1;

function disableDraw() {
    drawingOnOff = 0;
    // document.querySelector('#myP5canvas1').style.display = "none";
    console.log("disabling the drawing");
}

function enableDraw() {
    drawingOnOff = 1;
    // document.querySelector('#myP5canvas1').style.display = "block";
    console.log("enabling the drawing");
}

function tempDisableDraw() {
    tempDrawOnOff = 0;
    console.log("tempDrawOnOff = 0");
}

function tempEnableDraw() {
    tempDrawOnOff = 1;
    console.log("tempDrawOnOff = 1");
}


// --------- below shuffle paint pngs

// <!-- You MUST give your sources tags individual ID's for the solution to work. -->
// var currentImg = document.querySelector('#mp4Source');
var lastIndexImg1;
var sourceURLimg1;
var lastIndexImg2;
var sourceURLimg2;

// click to randomly change the image1 source
function shufflePaint1() {
    // execute the random number
    let randNumP1 = Math.floor(Math.random() * 13) + 1;

    if (randNumP1 === lastIndexImg1) {
        console.log ("once again");
        shufflePaint1();
    }
    else {
        //// change the img if the random number is not duplicated
        // switch(randNumP1) {
        //   case 1:
            sourceURLimg1 = "img/paint" + randNumP1 + ".png";
            reloadPaint1();
          // break;
          // case 2:
          //   sourceURLimg1 = "img/paint1_1.png";
          //   reloadPaint1();
          // break;

          // default:
          //   sourceURLimg1 = "img/paint1.png";
          //   reloadPaint1();
        // }
    }

    console.log ("last index:" + lastIndexImg1);

    // rewrite the last index as the new random number
    lastIndexImg1 = randNumP1;

    console.log (" / Random:" + randNumP1 + " / src:" + sourceURLimg1);

}

// click to randomly change the image2 source
function shufflePaint2() {
    // execute the random number
    let randNumP2 = Math.floor(Math.random() * 13) + 1;

    if (randNumP2 === lastIndexImg2) {
        shufflePaint2();
    }
    else {
        sourceURLimg2 = "img/paint2_" + randNumP2 + ".png";
        reloadPaint2();
    }

    // console.log ("last index:" + lastIndexImg2);

    // rewrite the last index as the new random number
    lastIndexImg2 = randNumP2;

    // console.log (" / Random:" + randNumP2 + " / src:" + sourceURLimg2);
}

function reloadPaint1 () {
    // reloading the paint 1 with the new src
    paint1 = loadImage(sourceURLimg1);

    paint1Changed = 1;
    // then this variable enables the auto-update of the draw 
}

function reloadPaint2 () {
    // reloading the paint 2 with the new src
    paint2 = loadImage(sourceURLimg2);

    paint2Changed = 1;
    // then this variable enables the auto-update of the draw 
}

// shinji select highlight
var TempSelectButton = document.getElementsByClassName("tempSelect");
for (var i = 0; i < TempSelectButton.length; i++) {
    TempSelectButton[i].addEventListener("click", function() {
            this.classList.add("selected");
            element = this;
            setTimeout(function(){ 
                element.classList.remove("selected");
        }, 800);
        });
}

// function selectButtonTemp() {
//     var element = document.querySelector('#shuffleButton');
//     element.classList.add("selected");
//     setTimeout(function(){ 
//         element.classList.remove("selected");
//     }, 800);
// }

// document.querySelector(".button_paint_long").addEventListener("click", function() {
//     this.classList.add("selected");
//     element = this;
//         setTimeout(function(){ 
//             element.classList.remove("selected");
//         }, 800);
//  });


// ////////////// 

// update 27 july shinji
function savingCanvas() {
    saveCanvas(sketch, 'yourportrait', 'png');
}

