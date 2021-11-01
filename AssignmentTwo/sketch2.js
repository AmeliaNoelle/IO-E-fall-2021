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
  text("Touch your nose!", 10, 30);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

      const wrist = pose.rightWrist;
      const nose = pose.nose;

      fill(wrist.x, 0, wrist.y);
      ellipse(wrist.x, wrist.y, 50, 50);
      
    // Create a pink ellipse for the nose
    if((wrist.x >= nose.x -100 && wrist.x <= nose.x+100)&&(wrist.y >= nose.y -100 && wrist.y <= nose.y +100) ){
        fill(0,0,0);
        text("you did it!", 10, 60);
    }
    
    

  }

  
}