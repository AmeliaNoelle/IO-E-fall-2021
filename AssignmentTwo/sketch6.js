// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

let img;
let img2;
let img3;


function preload(){
    img = loadImage('images/glasses.png');
    img2 = loadImage('images/glasses2.png');
    img3 = loadImage('images/glasses3.png');

}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, 480);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

}

function modelReady() {
  select('#status').html('Model Loaded');
  
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {
  
  strokeWeight(2);

  

  image(video, 0, 0, width, height);
   text('Hover your wrist over a rectangle to try on glasses', 20, 20);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

      const rightEye = pose.rightEye;
      const leftEye = pose.leftEye;
      const wrist = pose.rightWrist;

     
  
     
        
    
        fill(255, 255, 255);
        let rectA =rect(120, 370, 100, 75);
        let rectB =rect(280, 370, 100, 75);
        let rectC =rect(430, 370, 100, 75);

        if((wrist.x>120 && wrist.x <220) && (wrist.y>370 && wrist.y <445)){
            image(img, rightEye.x-60, rightEye.y-25, 150, 60);
        } else if((wrist.x>280 && wrist.x <380) && (wrist.y>370 && wrist.y <445)){
            image(img2, rightEye.x-60, rightEye.y-25, 180, 90);
        }else if((wrist.x>430 && wrist.x <530) && (wrist.y>370 && wrist.y <445)){
            image(img3, rightEye.x-60, rightEye.y-25, 150, 50);
        }
  }

  
}