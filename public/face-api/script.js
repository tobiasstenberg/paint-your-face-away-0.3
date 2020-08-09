const fapiButton = document.getElementById('fapi_button')
const input = document.getElementById('myP5canvas1')


Promise.all([
  // faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  // faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(detect)

// function startVideo() {
//   navigator.getUserMedia(
//     { video: {} },
//     stream => video.srcObject = stream,
//     err => console.error(err)
//   )
// }

async function detect() {
  const detection = await faceapi.detectSingleFace(input)
  // const detections = await faceapi.detectAllFaces(p5canvas, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks()
  console.log(detection);
}

fapiButton.addEventListener('click', () => {
  // const canvas = faceapi.createCanvasFromMedia(p5canvas)
  const canvas = faceapi.createCanvasFromMedia(document.getElementById('myP5canvas1'))
  document.body.append(canvas)
  const displaySize = { width: p5canvas.width, height: p5canvas.height }
  faceapi.matchDimensions(canvas, displaySize)
  
  setInterval(async () => {
    // const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
    const detections = await faceapi.detectAllFaces(p5canvas, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks()
    // const detections1 = await faceapi.detectAllFaces(input, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 333)
})
// interval use to be 200