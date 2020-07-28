///////////////////////
// keybindings for the main program - mainly for testing purposes
function keyPressed() {

    // for testing purposes every key is logged - remove all the logs before production
    console.log("key pressed: ", key);

    switch (key) {
        case 'c':
            console.log("changing to color...");
            changeGlobalComposite('color');
            break;
        case 'l':
            console.log("changing to luminosity...");
            changeGlobalComposite('luminosity');
            break;
        case 's':
            console.log("changing to source in...");
            changeGlobalComposite('source-in');
            break;
        case 'r':
            console.log("resetting...");
            resetSketch();
            break;
        case '0':
            console.log("changing to brush 0...");
            switchBrushType(0);
            break;
        case '1':
            console.log("changing to brush 1...");
            switchBrushType(1);
            break;
        case '2':
            console.log("changing to brush 2...");
            switchBrushType(2);
            break;
        case 'ArrowLeft': 
            changeGlobalComposite('destination-out');
            break;
        case 'ArrowUp': 
            changeGlobalComposite('source-over');
            break;
        case 'ArrowDown': 
            changeGlobalComposite('xor');
            break;
        case 'ArrowRight': 
            changeGlobalComposite('source-over');
            break;
        default:
            console.log('the key pressed has no functionality...');
    }
  
}