let song;
let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let diameter0 = 0, diameter1 = 0, diameter2 = 0;

function setup() {
  song = loadSound('assets/assets_sounds_squiggle.mp3');
  createCanvas(720, 200);
  background(255, 0, 0);

  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
  console.log("serial.list()   ", serial.list());

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/tty.usbmodem14601");
 /////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////
  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
  
 
}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////


// We are connected and ready to go
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
  //console.log("splitter[0]" + splitter[0]); 
  diameter0 = splitter[0];                 //put the first sensor's data into a variable
  diameter1 = splitter[1];
  diameter2 = splitter[2]; 



}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

function draw(){

  colorMode(HSB);

  background(200,50, 100);
  outputVolume(diameter2/100);

for(let i=1; i<9; i++){
 
  fill(diameter1*2.75,50,100);
  noStroke();
  ellipse(i*diameter1, diameter2*4, 20, 20);
}

  song.play();
  if(diameter0 == 1){
  song.stop();

  }
}


