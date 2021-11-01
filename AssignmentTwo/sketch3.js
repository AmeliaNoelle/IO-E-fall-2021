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

let img1;
let img2;
let img3;

function preload(){
    img1 = loadImage('images/faces-01.png');
    img2 = loadImage('images/faces-02.png');
    img3 = loadImage('images/faces-03.png');
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

  textSize(32);
  fill(0,0,0);
  text('How are you feeling today?', 120, 30);
  text(":)", 10, 30);
  text(":(", 610, 30);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

      const wrist = pose.rightWrist;
      const nose = pose.nose;

  
      
    // Create a pink ellipse for the nose
    if(wrist.x >= 0 && wrist.x <= 200){
        image(img1, wrist.x, wrist.y, 70, 70);
    }else if(wrist.x > 200 && wrist.x<=400){
        image(img3, wrist.x, wrist.y, 70, 70);
    }else if(wrist.x > 400 && wrist.x <=620){
        image(img2, wrist.x, wrist.y, 70, 70);
    }
    
    

  }

  
}