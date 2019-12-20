const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();
let net;

async function app() {
    console.log('Loading mobilenet..');

    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');

    // Create an object from Tensorflow.js data API which could capture image
    // from the web camera as Tensor.
    const webcam = await tf.data.webcam(webcamElement);

    // Reads an image from the webcam and associates it with a specific class
    // index.
    async function addExample(classId) {
        console.log(classId);
        // Capture an image from the web camera.
        const img = await webcam.capture();

        // Get the intermediate activation of MobileNet 'conv_preds' and pass that
        // to the KNN classifier.
        const activation = net.infer(img, 'conv_preds');

        // Pass the intermediate activation to the classifier.
        classifier.addExample(activation, classId);

        // Dispose the tensor to release the memory.
        img.dispose();
    };

    // Add buttons
    for (let i = 0; i < 26; i++) {
        await $("#buttons").append("<button id='class-" + (i + 10).toString(36) + "'>" + (i + 10).toString(36).toUpperCase() + "</button>");
        document.getElementById('class-' + (i + 10).toString(36)).addEventListener('click', () => addExample(i));
    }

    while (true) {
        if (classifier.getNumClasses() > 0) {
            const img = await webcam.capture();

            // Get the activation from mobilenet from the webcam.
            const activation = net.infer(img, 'conv_preds');
            // Get the most likely class and confidences from the classifier module.
            const result = await classifier.predictClass(activation);

            const classes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            document.getElementById('console').innerText = `${classes[result.label]}`;

            // probability: ${result.confidences[result.label]}

            // Dispose the tensor to release the memory.
            img.dispose();
        }

        await tf.nextFrame();
    }
}

app();
