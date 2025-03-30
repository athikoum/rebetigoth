///*
// * @name Preload SoundFile
// * @description Call loadSound() during preload() to ensure that the
// * sound is completely loaded before setup() is called. It's best to always
// * call loadSound() in preload(), otherwise sounds won't necessarily be loaded
// * by the time you want to play them in your sketch.
// *
// * <br><br><em><span class="small"> To run this example locally, you will need the
// * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
// * a sound file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em>
// */
//let delaySlider, reverbSlider, timeSlider;
//let  reverb;
//let song;
//let input;
//let analyzer;
//let delay;
//let fft;
//let amp;
//let pg;
////let gainSlider
////let volume;

//function preload() {
//  //song = loadSound('data/aggela.mp3');
//}

//function setup() {
//  createCanvas(1500,900);
////  song.loop(); 
//  //song.volume(1);
// //song.volume(1.0);// song is ready to play during setup() because it was loaded during preload
//  background(0,0,0);
  
//  input = new p5.AudioIn();
//  input.start();
//  reverb = new p5.Reverb();
//  delay = new p5.Delay();
// reverb.process(input, 6, 0.2);
//  reverb.amp(0.4);

//  delay.process(input, 0.25 ,0.8, 300);
//  amp = new p5.Amplitude();
//  //delay.amp(8);
//  amp.setInput(input);
  

  
  
//  //revb.amp(0);
//  fft = new p5.FFT(0.0); 
  
//gainSlider = createSlider(-60, 12, 0, 1); //volume slider
//  gainSlider.position(100, 350);
  
//  delaySlider = createSlider(0, 1, 0.5, 0.01);
//  reverbSlider = createSlider(0, 6, 3, 0.1);
//  timeSlider = createSlider(1, 10, 5, 1);



//}
//function positionSliders() {
//  let startY = height / 4;
//  let gap = 60; // Gap between each slider

//  delaySlider.position((width - delaySlider.width) / 2, startY);
//  reverbSlider.position((width - reverbSlider.width) / 2, startY + gap);
//  timeSlider.position((width - timeSlider.width) / 2, startY + gap * 2);
//}

//function drawLabels() {
//  fill(0);
//  textAlign(CENTER);
//  text('Delay: ' + delaySlider.value(), delaySlider.x + delaySlider.width / 2, delaySlider.y - 10);
//  text('Reverb: ' + reverbSlider.value(), reverbSlider.x + reverbSlider.width / 2, reverbSlider.y - 10);
//  text('Time Interval: ' + timeSlider.value() + ' s', timeSlider.x + timeSlider.width / 2, timeSlider.y - 10);
//}


//function draw() {
//  let volume = input.getLevel();
// let threshold = 0.04;
// let col1 = map(volume,0,0.1,0,255);
//  //song.play();
//  //if (volume< threshold){ 
//    //song.pause();}
//pg=createGraphics();

////let srt1 =' *Headphones/earphones recommended. Clap to begin!* This a story about Aggela the witch , as narrated by Pantelis, Roulas’s husband, in an August night. And the narration begins: Once, I had a terrible pain in my lower back. The pain was not joking, it was getting a toll on me. I was in despair, because I had so much work to do, carrying packages for the shop, working in construction, plus the work in the mastic trees. The doctor told me to take a rest. I laughed at his advice, and left. Then, my mother came up with this idea: “And why aren’t you going to Aggela, our cousin, to enchant the pain?” In the beginning I was hesitant. All those magic things are not of my taste. But in the end, I had nothing to lose. Even if it meant I would go to hell, the pain I was feeling that moment was greater than any torment any hell could cause. I went to her house and told her: “Aggela, devil is living on my waist!” and she told me: “You will stand here, and I will be behind you. When I poke you on the leg, you will say, “what are you doing to me?” Agreed?” This was a shady and uncomfortable place to be in, but I agreed. And she has me standing there, and gently hitting me with a small hammer on my back. And as she is hitting me, she pokes me on the leg. And I ask her :”What are you doing to me?” and she replies “I am taking the meat-biting demon out of you!” So, she was taking out of me the bad spirit that was biting my flesh, and I was in pain. When she finished, she told me “Go rest. Until tomorrow you will be fine”.  I left still being in pain. I went home, boiled a coffee, and the pain was gone. ';
////  text(srt1, 100,100,900,900,900);
//////textSize(12);
////  fill(200);
////  //let srt2 = 'Clap to begin story';
////  //text(srt2, windowWidth*1.1/4,50,300,300);
//// textSize(20);
////  fill(300,300,300);
////  //function volume() { //volume corresponds to the lsider
//// // song.volume.value = gainSlider.value();


//}
let mic, reverb, delay, gainSlider, reverbSlider, delaySlider;
let isRecording = false;
let playPauseButton;

function setup() {
  createCanvas(400, 200);
  
  // Initialize microphone input with lower sensitivity
  mic = new p5.AudioIn();
  mic.start();  // Start capturing audio
  
  // Create reverb and delay objects
  reverb = new p5.Reverb();
  delay = new p5.Delay();

  // Set up the reverb and delay with more subtle effects
  reverb.process(mic, 3, 1.5);  // Set more subtle reverb (Decay: 3, Dry/Wet mix: 1.5)
  delay.process(mic, 0.2, 0.5, 200);  // Lower delay time and feedback
  
  // Create sliders to control volume (gain), reverb, and delay
  gainSlider = createSlider(0, 1, 0.5, 0.01);  // Volume control slider
  reverbSlider = createSlider(0, 6, 2, 0.1);  // Reverb control slider
  delaySlider = createSlider(0, 1, 0.5, 0.01);  // Delay control slider
  
  // Position sliders
  gainSlider.position(20, height + 20);
  reverbSlider.position(20, height + 60);
  delaySlider.position(20, height + 100);
  
  // Create play/pause button to control microphone input
  playPauseButton = createButton('Pause');
  playPauseButton.position(20, height + 140);
  playPauseButton.mousePressed(toggleRecording);
}

function toggleRecording() {
  if (isRecording) {
    mic.stop();  // Stop microphone input
    isRecording = false;
    playPauseButton.html('Start');
  } else {
    mic.start();  // Start microphone input
    isRecording = true;
    playPauseButton.html('Pause');
  }
}

function draw() {
  background(0);
  
  // Update reverb, delay, and volume according to slider values
  reverb.set(reverbSlider.value(), 0.2);  // Apply reverb with updated settings
  delay.delayTime(delaySlider.value());   // Apply delay with updated settings
  mic.amp(gainSlider.value());  // Apply the volume (gain) from slider

  // Display slider values and control info
  fill(255);
  textSize(14);
  text('Delay: ' + delaySlider.value(), delaySlider.x * 2 + delaySlider.width, delaySlider.y);
  text('Reverb: ' + reverbSlider.value(), reverbSlider.x * 2 + reverbSlider.width, reverbSlider.y);
  text('Gain (Volume): ' + gainSlider.value(), gainSlider.x * 2 + gainSlider.width, gainSlider.y);
}
