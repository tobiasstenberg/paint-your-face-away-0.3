// just working with the paint blob function
    // v0.6 - entire js file


function throwPaint() {

    // image(blob, detectX / dpr , detectY / dpr , detectWidth / dpr, detectHeight / dpr) ; 
    
    let boxX = detectX / dpr;
    let boxY = detectY / dpr;
    let boxWidth = detectWidth / dpr;
    let boxHeight = detectHeight / dpr;

    image(blob, 
        boxX + (boxWidth * 0.05) 
        // + random(- boxWidth / 50, boxHeight / 50)
        , 
        boxY + (boxHeight * 0.05) 
        // + random(- boxWidth / 50, boxHeight / 50)
        , 
        boxWidth * 0.9, boxHeight * 0.9) ; 

    // image(blob, boxX + random(- boxWidth / 50, boxHeight / 50), boxY + random(- boxWidth / 50, boxHeight / 50), boxWidth , boxHeight) ; 

    shuffleBlob();
}

// function mousePressed(){
//     image(blob, mouseX - width/4 + random(-50, 50), mouseY - width/4 + random(-50, 50), width/2 , height/2) ; 

// }


// copied from method js random shuffling of the source for the paint blobs
// <!-- You MUST give your sources tags individual ID's for the solution to work. -->
var lastIndexBlob;
var sourceURLblob;

// click to randomly change the image1 source
function shuffleBlob() {
    // execute the random number
    let randNumBlob = Math.floor(Math.random() * 244) + 1;

    if (randNumBlob === lastIndexBlob) {
        // if the random num is same as the last time shuffle again
        console.log("again" );

        shuffleBlob();
    }
    else {
        //// change the img if the random number is not duplicated
        sourceURLblob = "img/blobs/blob" + randNumBlob + ".png";
        reloadBlob();
    }

    console.log("last index:" + lastIndexBlob);

    // rewrite the last index as the new random number
    lastIndexBlob = randNumBlob;

    console.log (" random blob " + randNumBlob + " src:" + sourceURLblob);

}

function reloadBlob () {
    // reloading the blob with the new src
    blob = loadImage(sourceURLblob);
}

function enableBlob(){
    document.querySelector("#div_blob_buttons").style.display = "block"
}

let timeoutEnableBlob;

function timeoutToEnableBlob() {
    timeoutEnableBlob = setTimeout(function(){ 
        enableBlob();
        console.log("timeoutEnableBlob");
    }, 60000);
}

