// My sound synthesizer
function AudioSynth(audioContext) {

    // init oscillator node
    this.oscillator = audioContext.createOscillator();
    this.oscGain = audioContext.createGain(); // création du noeud de gain 
    this.gain = 0.5;
    this.offset = 1;
    this.frequency = 440;

    // debug
    this.oscillator.start(0);
    this.oscGain.gain.value = 0;

    console.log('audio synth!!');

    this.connect = function (node) {
        console.log("connect synth!");
        this.oscillator.connect(node);
    }
    this.setWaveForm = function (type) {
        console.log("set synth osc type!");
        this.oscillator.type = type;
    }
    this.setFilterType = function (type) {
        console.log("set filter type!");
        this.BiquadFilterNode.type = filterType;
    }
    this.setFrequency = function (freq) {
        console.log("set synth osc freq!");
        this.frequency = freq;
        this.oscillator.frequency.value = this.frequency * this.offset;
    }

    this.notestart = function () {
        console.log("set gain 1");
        this.oscGain.gain.value = this.gain;
    }

    this.notestop = function () {
        console.log("set gain 0");
        this.oscGain.gain.value = 0;
    }

    this.setgain = function (gain) {
        console.log("set gain to val");
        this.gain = gain;
    }
    this.setoffset = function (offset) {
        console.log("set gain to val");
        this.offset = offset;
        this.oscillator.frequency.value = this.frequency * this.offset;
    }

    this.envGenOn = function (a, d, s) {
        var now = audioContext.currentTime;
        this.oscGain.gain.cancelScheduledValues(0);
        this.oscGain.gain.setValueAtTime(0, now);
        this.oscGain.gain.linearRampToValueAtTime(this.gain, now + a);
        this.oscGain.gain.linearRampToValueAtTime(s * this.gain, now + a + d);
    }
    
    this.envGenOff = function (r) {
        var now = audioContext.currentTime;

        this.oscGain.gain.cancelScheduledValues(0);
        this.oscGain.gain.linearRampToValueAtTime(0, now + r);
    }
}
