// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

/*
This sketch creates a line between the users wrists
Turing the potentionmeter changes the hue of the line
Pressing the button on the Arduino shield takes a screenshot of the
current canvas
*/

let video;
let poseNet;
let poses = [];
let serial;
let pot, buttonStatus = 0;
let transparency = 0;


function setup() {

createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);


//serial connection code from 3 circles example by Doug Whitton 2019
  serial = new p5.SerialPort();
  serial.list();
  console.log("serial.list()   ", serial.list());
  serial.open("/dev/tty.usbmodem14101");
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
 
  //diameter0 = splitter[0];  
  buttonStatus = splitter[0];                //put the first sensor's data into a variable
  pot = splitter[1];
 
}
//end of code section from 3 circles example

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}
function saveToFile(){
  saveCanvas('myCanvas', 'jpg');
}

function draw() {
  transparency = map(pot, 0, 100, 0, 255);
  background(0,0,0, 0.1);
  colorMode(HSB);


  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

    // Create a pink ellipse for the nose
  
    const rightWrist = pose.rightWrist;
    const leftWrist = pose.leftWrist;

    stroke(pot, 100, 75);
    strokeWeight(4);
    line(rightWrist.x, rightWrist.y, leftWrist.x, leftWrist.y);
  

    if(buttonStatus == 1){
      saveToFile();
    }
  }

  
}