// get common audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

//______________________________________________________create master output
var masterGain = audioContext.createGain();
masterGain.gain.value = 0.1;
masterGain.connect(audioContext.destination);
//______________________________________________________Filter 
var filter = audioContext.createBiquadFilter();
// var filterType = this.type
// // BiquadFilterNode.type();

filter.type = "lowPass";
filter.connect(masterGain);
filter.frequency.value = 20000;

//______________________________________________________create osc 1
var audioSynth = new AudioSynth(audioContext);
console.log(audioSynth);
var osc1Gain = audioSynth.oscGain;
osc1Gain.gain.value = 0.0;
audioSynth.connect(osc1Gain);
osc1Gain.connect(filter);

//______________________________________________________create osc 2
var audioSynth2 = new AudioSynth(audioContext);
console.log(audioSynth2);
var osc2Gain = audioSynth2.oscGain;
osc2Gain.gain.value = 0.0;
audioSynth2.connect(osc2Gain);
osc2Gain.connect(filter);

//______________________________________________________create osc 3
var audioSynth3 = new AudioSynth(audioContext);
console.log(audioSynth3);
var osc3Gain = audioSynth3.oscGain;
osc3Gain.gain.value = 0.0;
audioSynth3.connect(osc3Gain);
osc3Gain.connect(filter);

//______________________________________________________White Noise Generator
var bufferSize = 2 * audioContext.sampleRate,
  noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
  output = noiseBuffer.getChannelData(0);
for (var i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1;
}
var whiteNoise = audioContext.createBufferSource();
whiteNoise.buffer = noiseBuffer;
whiteNoise.loop = true;
whiteNoise.start(0);

//var noiseGain = whiteNoise;
var noiseGain = audioContext.createGain();
noiseGain.gain.value = 0.0;
//var gainNode = whiteNoise.createGain();
//noiseGain.gain.value = 0.6;
whiteNoise.connect(noiseGain);
//noiseGain.connect(masterGain);
noiseGain.connect(filter);

//______________________________________________________LFO
var lfoGain = audioContext.createGain();
var lfo = audioContext.createOscillator();
// Connect LFO

// Set LFO frequency, amplitude, and waveform
lfo.type = "triangle";
lfo.frequency.value = 1;
lfoGain.gain.value = 1;
lfo.connect(lfoGain);
lfoGain.connect(masterGain.gain);
lfo.start(0);

//______________________________________________________Keyboard (Qwerty Hancock)

var context = new AudioContext();
var ampAttack = 0;
var ampDecay =  1;
var ampSustain = 0.2;
var ampRelease = 2;
var filterAttack = 0;
var filterDecay =  1;
var filterSustain = 0.2;
var filterRelease = 2;

keyboard.keyDown = function (note, frequency) {
  //var osc = context.createOscillator();
  //osc.connect(context.destination);
  //var audioSynth = new AudioSynth(audioContext);
  //audioSynth.connect(osc1Gain);
  //osc1Gain.connect(masterGain);
  // audioSynth.notestart();
  audioSynth.envGenOn(ampAttack, ampDecay, ampSustain);
  audioSynth2.envGenOn(ampAttack, ampDecay, ampSustain);
  audioSynth3.envGenOn(ampAttack, ampDecay, ampSustain);

  // filter.envFilterGenOn(filterAttack, filterDecay, filterSustain);
  // filter2.envFilterGenOn(filterAttack, filterDecay, filterSustain);
  // filter3.envFilterGenOn(filterAttack, filterDecay, filterSustain);

  audioSynth.setFrequency(frequency)
  audioSynth2.setFrequency(frequency)
  audioSynth3.setFrequency(frequency)
  noiseGain.gain.value = GainDuNoise;

  var now = audioContext.currentTime;
  //a *= egMode;
  //d *= egMode;
  noiseGain.gain.cancelScheduledValues(0);
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(GainDuNoise, now + ampAttack);
  noiseGain.gain.linearRampToValueAtTime(ampSustain*GainDuNoise, now + ampAttack + ampDecay);
};

keyboard.keyUp = function (note, frequency) {
  //console.log('Note', note, 'has been released');
  //console.log('Its frequency was', frequency);

  audioSynth.envGenOff(ampRelease);
  audioSynth2.envGenOff(ampRelease);
  audioSynth3.envGenOff(ampRelease);

  // audioSynth.envFilterGenOff(filterRelease);
  // audioSynth2.envFilterGenOff(filterRelease);
  // audioSynth3.envFilterGenOff(filterRelease);

  //noiseGain.gain.value = 0;
  var now = audioContext.currentTime;
  //a *= egMode;
  //d *= egMode;
  noiseGain.gain.cancelScheduledValues(0);
  noiseGain.gain.linearRampToValueAtTime(0, now+ampRelease);

  // whiteNoise.notestop();
};
