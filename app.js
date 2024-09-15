// Initialize variables
let video;
let model;
const statusElement = document.getElementById("status");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

// Set up the webcam video stream
async function setupWebcam() {
    video = document.getElementById("webcam");

    return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }
        }).then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                resolve(video);
            };
        }).catch(err => {
            reject(err);
        });
    });
}

// Load BlazeFace model for face detection
async function loadBlazeFaceModel() {
    model = await blazeface.load();
    statusElement.textContent = "Model loaded!";
    detectFaces();
}

// Detect faces in the video feed
async function detectFaces() {
    const predictions = await model.estimateFaces(video, false);

    // Clear the canvas before drawing new predictions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (predictions.length > 0) {
        predictions.forEach((prediction) => {
            const start = prediction.topLeft;
            const end = prediction.bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];

            // Draw a rectangle around the face
            ctx.beginPath();
            ctx.rect(start[0], start[1], size[0], size[1]);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "red";
            ctx.stroke();

            // Optionally draw facial landmarks (eyes, nose, mouth)
            if (prediction.landmarks) {
                prediction.landmarks.forEach((landmark) => {
                    ctx.beginPath();
                    ctx.arc(landmark[0], landmark[1], 5, 0, 2 * Math.PI);
                    ctx.fillStyle = "blue";
                    ctx.fill();
                });
            }
        });
    }

    // Keep calling the function to create a loop
    requestAnimationFrame(detectFaces);
}

// Start the webcam and load the model
async function main() {
    await setupWebcam();
    await loadBlazeFaceModel();
}

// Call the main function to start everything
main();
