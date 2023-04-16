let mobilenet;
let video;
let features;
let knn;
let labelP;
let ready = false;

//Start webcam
//load ML5 
// load KNN
function setup() {
    createCanvas(500, 405);
    video = createCapture(VIDEO);
    video.size(500, 405);
    video.hide();
    features = ml5.featureExtractor("MobileNet", modelReady);
    // knn = ml5.KNNClassifier();
    labelP = createP("Need training data!");
    labelP.style("font-size", "20pt");
    labelP.style("background-color", "black");
    labelP.style("color", "white");
    labelP.style("align", "center");
}

// predict the direction
function goClassify() {
    const logits = features.infer(video);
        knn.classify(logits, function (error, result){
            if (error) {
                console.error(error);
            } else{
                labelP.html(result.label);
                // labelP.html(result.confidences);
                goClassify();
                
            //  console.log(result);
            }
        });
}



// function mousePressed(){
//     if(knn.getNumLabels() > 0){
//     const logits = features.infer(video);
//     knn.classify(logits, gotResult);
// }
// }

// Train + save the model
function keyPressed() {
    const logits = features.infer(video);
    if (key == "l"){
        knn.addExample(logits, "left");
        console.log("left");
    } else if(key == "r"){
        knn.addExample(logits, "right");
        console.log("right");
    }else if(key == "u"){
        knn.addExample(logits, "up");
        console.log("up");
    }else if(key == "d"){
        knn.addExample(logits, "down");
        console.log("down");
    } else if (key == "s") {
        knn.save("model.json");
    }
    // console.log(logits.dataSync());
}

function modelReady() {
    console.log("model ready");
    console.log("MobelNet loaded");
    knn = ml5.KNNClassifier();
    knn.load("model.json", function(){
        console.log("KNN Data loaded");
        goClassify();
    });
}

function draw() {
    image(video, 0, 0);

    // if(!ready && knn.getNumLabels() > 0){
    //     goClassify();
    //     ready = true;
    // }
}