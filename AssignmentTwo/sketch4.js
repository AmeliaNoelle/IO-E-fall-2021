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


function preload(){
    img = loadImage('images/glasses.png');

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


  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

      const rightEye = pose.rightEye;


      //var glassesWidth = rightEye.x-Eye.x*1.75;
        image(img, rightEye.x-60, rightEye.y-25, 175, 80);
    

  }

  
}