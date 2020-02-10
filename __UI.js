// define GUI preferences
Nexus.colors.accent = "firebrick"
Nexus.colors.fill = "grey"


//______________________________________________________OSCILLATOR 1

// oscillator 1 waveform select
var select = new Nexus.Select('#waveformRadio', {
  'size': [70, 30],
  'options': ["sine", "square", "sawtooth", "triangle"]
})

select.on('change', function (v) {
  audioSynth.setWaveForm(v.value);
})

//oscillator 1 pitch
var dial = new Nexus.Dial('#pitch', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0.004,
  'value': 0.5
})
dial.on('change', function (v) {
  console.log(v);
  //audioSynth.setFrequency(65.41 + v * (1046.65 - 65.41));
  audioSynth.setoffset(2 ** (- 1 + 2 * v));
})

//oscillator 1 gain
var osc1GainDial = new Nexus.Dial('#osc1Gain', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0.004,
  'value': 0.5
})
osc1GainDial.on('change', function (v) {
  console.log(v);
  osc1Gain.gain.value = v;
  audioSynth.setgain(v);
  audioSynth.notestop();
})


//______________________________________________________OSCILLATOR 2

//oscillator 2 Waveform
var select2 = new Nexus.Select('#waveformRadio2', {
  'size': [70, 30],
  'options': ["sine", "square", "sawtooth", "triangle"]
})

select2.on('change', function (v) {
  audioSynth2.setWaveForm(v.value);
})

//oscillator 2 pitch
var dial2 = new Nexus.Dial('#pitch2', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0.004,
  'value': 0.5
})
dial2.on('change', function (v) {
  console.log(v);
  audioSynth2.setoffset(2 ** (- 1 + 2 * v));
})

//oscillator 2 Gain
var osc2GainDial = new Nexus.Dial('#osc2Gain', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0.004,
  'value': 0.5
})
osc2GainDial.on('change', function (v) {
  console.log(v);
  osc2Gain.gain.value = v;
  audioSynth2.setgain(v);
  audioSynth2.notestop();
})

//______________________________________________________OSCILLATOR 3

//oscillator 3 Waveform
var select3 = new Nexus.Select('#waveformRadio3', {
  'size': [70, 30],
  'options': ["sine", "square", "sawtooth", "triangle"]
})

select3.on('change', function (v) {
  audioSynth3.setWaveForm(v.value);
})

//oscillator 3 pitch
var dial3 = new Nexus.Dial('#pitch3', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0.004,
  'value': 0.5
})
dial3.on('change', function (v) {
  console.log(v);
  audioSynth3.setoffset(2 ** (- 1 + 2 * v));
})

//oscillator 3 gain
var osc3GainDial = new Nexus.Dial('#osc3Gain', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0.004,
  'value': 0.5
})
osc3GainDial.on('change', function (v) {
  // console.log(v);
  osc3Gain.gain.value = v;
  audioSynth3.setgain(v);
  audioSynth3.notestop();
})

//______________________________________________________Noise Oscillator Gain
var noiseGainDial = new Nexus.Dial('#noiseGain', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0.004,
  'value': 0.0
})

var GainDuNoise = 0;

noiseGainDial.on('change', function (v) {
  console.log(v);
  GainDuNoise = v;
  //noiseGain.gain.value = v;
  // audioSynth3.setgain(v);
  // audioSynth3.notestop();
})
//______________________________________________________filterRadio
var radiobutton = new Nexus.RadioButton('#filterRadio', {
  'size': [120, 25],
  'numberOfButtons': 3,
  'active': 0
})
radiobutton.on('change', function (v) {
  console.log(v);
  if (v === 0) {
    // console.log("yey 0");
    return filter.type = "lowpass";
  } else if (v === 1) {
    // console.log("yey 1")
    return filter.type = "bandpass";
  } else if (v === 2) {
    // console.log("yey 2")
   return filter.type = "highpass";
  }
})

//______________________________________________________LFO radio
var radiobutton = new Nexus.RadioButton('#lfoRadio',{
  'size': [120,25],
  'numberOfButtons': 3,
  'active': 0
})
radiobutton.on('change',function(v) {
  console.log(v);
  if (v === 0) {
    console.log("yey 0");
    return lfo.type = "triangle";
  } else if (v === 1) {
    console.log("yey 1")
    return lfo.type = "sawtooth";
  } else if (v === 2) {
    console.log("yey 2")
   return lfo.type = "square";
  }
})

//______________________________________________________FILTER
var filterFreqDial = new Nexus.Dial('#filterFreq', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 20,
  'max': 20000,
  'step': 1.0,
  'value': 20000
})

var filterFreq = 400;

filterFreqDial.on('change', function (v) {
  console.log(v);
  filterFreq = v;
})
var filterResDial = new Nexus.Dial('#filterRes', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 1,
  'max': 80,
  'step': 0.004,
  'value': 0.0
})
filterResDial.on('change', function (v) {
  console.log(v);
  filter.Q.value = v;
})
//______________________________________________________Amplitude Enveloppes

var dial = new Nexus.Dial('#ampAttack', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})
dial.on('change', function (v) {
  console.log(v);
  ampAttack = v;
})
var dial = new Nexus.Dial('#ampDecay', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 1
})
dial.on('change', function (v) {
  console.log(v);
  ampDecay = v;
})
var dial = new Nexus.Dial('#ampSustain', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 1
})
dial.on('change', function (v) {
  console.log(v);
  ampSustain = v;
})
var dial = new Nexus.Dial('#ampRelease', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 1
})
dial.on('change', function (v) {
  console.log(v);
  ampRelease = v;
})
//______________________________________________________Filter Enveloppes
var dial = new Nexus.Dial('#filterAttack', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})
dial.on('change', function (v) {
  console.log(v);
  filterAttack = v;
})
var dial = new Nexus.Dial('#filterDecay', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 1
})
dial.on('change', function (v) {
  console.log(v);
  filterDecay = v;
})
var dial = new Nexus.Dial('#filterSustain', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 1
})
dial.on('change', function (v) {
  console.log(v);
  filterSustain = v;
})
var dial = new Nexus.Dial('#filterRelease', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 1
})
dial.on('change', function (v) {
  console.log(v);
  filterRelease = v;
})


var dial = new Nexus.Dial('#lfoFreq', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 500,
  'step': 0,
  'value': 0
})
dial.on('change', function (v) {
  console.log(v);
  lfo.frequency.value = v;
})
var dial = new Nexus.Dial('#lfoGain', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 1
})
dial.on('change', function (v) {
  console.log(v);
  lfoGain.gain.value = v;
})

//______________________________________________________Master Volume
var dialMasterGain = new Nexus.Dial('#masterGain', {
  'size': [55, 55],
  'interaction': 'vertical', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0.004,
  'value': 0.1
})
dialMasterGain.on('change', function (v) {
  // console.log(v);
  masterGain.gain.value = v;
})

//______________________________________________________Keyboard (Qwerty Hancock)
var keyboard = new QwertyHancock({
  id: 'keyboard',
  width: 710,
  height: 80,
  octaves: 4,
  startNote: 'C2',
  whiteNotesColour: 'white',
  blackNotesColour: 'black',
  hoverColour: '#f3e939'
});