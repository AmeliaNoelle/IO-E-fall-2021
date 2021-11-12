// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

/*
This sketch creates an ellipse based on the users nose position.
Turning the potentiometer on the Arduino shield allows the user to
change the background transparency, which gives a different effect
to the moving ellipse.
*/

let video;
let poseNet;
let poses = [];
let serial;
let pot = 0;
let transparency = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);


//serial connection code from 3 circles example by Doug Whitton 2019
  serial = new p5.SerialPort();
  serial.list();
  console.log("serial.list()   ", serial.list());
  serial.open("/dev/tty.usbmodem14501");
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);

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

//this section from 3 circles example by Doug Whitton 2019
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
 
  //diameter0 = splitter[0];                 //put the first sensor's data into a variable
  pot = splitter[1];
  //diameter2 = splitter[2]; 
}
//end of code section from 3 circles example

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {
  transparency = map(pot, 0, 100, 0, 255);
  background(0,0,0, transparency);
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

    // Create a pink ellipse for the nose
    noStroke();
    const wrist = pose.nose;
    fill(wrist.x, 0, wrist.y);
    ellipse(wrist.x, wrist.y, 75, 75);

  }
}