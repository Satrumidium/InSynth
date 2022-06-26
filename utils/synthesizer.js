import * as Tone from 'tone';
import { WebMidi } from 'webmidi';

export default class Synthesizer {
synth;

#controller;

#input;

#channel;

attack = 0.05;

decay = 0.1;

sustain = 0.7;

release = 1;

// Effects

BitCrusher;

Chorus;

Distortion;

Reverb;

Filter;

Compressor;

// Sets input and channel and adds listeners to synth
constructor(input, channel) {
  WebMidi.enable().then(() => {
  });
  this.setInput(input);
  this.setChannel(channel);
  this.synthInit();
}

// Removes current listeners first before re-adding listeners
reInit(synth) {
  const noteonCallback = this.getController().channels[this.getChannel()].getListeners('noteon');
  const noteoffCallback = this.getController().channels[this.getChannel()].getListeners('noteoff');
  const pitchbendCallback = this.getController().channels[this.getChannel()].getListeners('pitchbend');
  const controlchangeCallback = this.getController().channels[this.getChannel()].getListeners('controlchange');
  this.getController().channels[this.getChannel()].removeListener('noteon', noteonCallback[1].callback);
  this.getController().channels[this.getChannel()].removeListener('noteoff', noteoffCallback[0].callback);
  this.getController().channels[this.getChannel()].removeListener('pitchbend', pitchbendCallback[1].callback);
  this.getController().channels[this.getChannel()].removeListener('controlchange', controlchangeCallback[1].callback);
  this.synthInit(synth);
  this.synthListeners();
}

// Create new synth and initialise effects
synthInit(synthName) {
  switch (synthName) {
    case 'AMSynth':
      this.synth = new Tone.PolySynth(Tone.AMSynth);
      break;
    case 'FMSynth':
      this.synth = new Tone.PolySynth(Tone.FMSynth);
      break;
    case 'DuoSynth':
      this.synth = new Tone.PolySynth(Tone.DuoSynth);
      break;
    default:
      this.synth = new Tone.PolySynth(Tone.AMSynth);
      break;
  }
  // this.synth.maxPolyphony = 256;
  this.synth.volume.value = -20;
  this.effectInit();
}

// Set Input, run set controller for WebMidi
setInput(input) {
  this.#input = input;
  this.setController();
}

// Get Input
getInput() {
  return this.#input;
}

// Set channel, run set controller for WebMidi
setChannel(channel) {
  this.#channel = channel;
  this.setController();
}

// Get channel
getChannel() {
  return (this.#channel);
}

// Set controller for WebMidi
setController() {
  this.#controller = WebMidi.getInputByName(this.#input);
}

// Get controller
getController() {
  return (this.#controller);
}

// Add listeners to synth and trigger callbacks
synthListeners() {
  this.getController().channels[this.getChannel()].addListener('noteon', (e) => {
    this.triggerAttackCallback(e);
  });
  this.getController().channels[this.getChannel()].addListener('noteoff', (e) => {
    this.triggerReleaseCallback(e);
  });
  this.getController().channels[this.getChannel()].addListener('pitchbend', (e) => {
    this.setDetuneCallback(e);
  });
  this.getController().channels[this.getChannel()].addListener('controlchange', (e) => {
    this.setVolumeCallback(e);
  });
}

// Trigger synth noteon
triggerAttackCallback(e) {
  this.setEffects();
  this.synth.triggerAttack(e.note.identifier, '+0', e.velocity);
}

// Trigger synth noteoff
triggerReleaseCallback(e) {
  this.setEffects();
  this.synth.triggerRelease(e.note.identifier);
}

// Detune synth
setDetuneCallback(e) {
  this.setEffects();
  this.synth.set({ detune: e.value * 400 });
}

// Volume synth
setVolumeCallback(e) {
  this.setEffects();
  this.synth.volume.value = Math.log(e.value) * 20;
}

// Set ADSR and chain effects
setEffects() {
  this.synth.set({
    envelope: {
      attack: this.attack,
      decay: this.decay,
      sustain: this.sustain,
      release: this.release,
    },
  });
  this.chainEffects();
}

// Set attack
setAttack(attack) {
  this.attack = attack * 2;
  this.setEffects();
}

// Set decay
setDecay(decay) {
  this.decay = decay * 2;
  this.setEffects();
}

// Set sustain
setSustain(sustain) {
  this.sustain = sustain;
  this.setEffects();
}

// Set release
setRelease(release) {
  this.release = release * 20;
  this.setEffects();
}

/*
FOR ALL EFFECTS
---------------
Dispose when setting effects to prevent overstacking
*/

// Set bit crusher effect,
setBitCrusherEffect(wet, value) {
  if (this.BitCrusher != null) {
    this.BitCrusher.dispose();
  }

  this.BitCrusher = new Tone.BitCrusher(value);
  this.BitCrusher.set({
    wet,
  });
}

// Set chorus effect
setChorusEffect(wet, freq, delay, depth) {
  if (this.Chorus != null) {
    this.Chorus.dispose();
  }
  this.Chorus = new Tone.Chorus(freq, delay, depth).toDestination().start();
  this.Chorus.set({
    wet,
  });
}

// Set distortion effect
setDistortionEffect(wet, value) {
  if (this.Distortion != null) {
    this.Distortion.dispose();
  }
  this.Distortion = new Tone.Distortion(value).toDestination();
  this.Distortion.set({
    wet,
  });
}

// Set reverb effect
setReverbEffect(wet, decay) {
  if (this.Reverb != null) {
    this.Reverb.dispose();
  }
  this.Reverb = new Tone.Reverb(decay).toDestination();
  this.Reverb.set({
    wet,
  });
}

// Set filter effect
setFilterEffect(wet, frequency, type, rolloff) {
  if (this.Filter != null) {
    this.Filter.dispose();
  }
  this.Filter = new Tone.Filter(frequency, type, rolloff).toDestination();
  this.Filter.set({
    wet,
  });
}

// Set compressor effect
setCompressorEffect(wet, thres, ratio) {
  if (this.Compressor != null) {
    this.Compressor.dispose();
  }

  if (wet === 0) {
    this.Compressor = new Tone.Compressor(-24, 12).toDestination();
  } else {
    this.Compressor = new Tone.Compressor(thres, ratio).toDestination();
  }
}

// Create dry effects for chaining
effectInit() {
  this.setBitCrusherEffect(0);
  this.setChorusEffect(0, 0, 0, 0);
  this.setDistortionEffect(0);
  this.setReverbEffect(0, 0.1);
  this.setFilterEffect(0);
  this.setCompressorEffect(0);
  this.chainEffects();
}

// Chain effects to Tone.Destination
chainEffects(compress) {
  this.synth.chain(
    this.BitCrusher,
    this.Chorus,
    this.Distortion,
    this.Reverb,
    this.Filter,
    () => {
      if (compress) return this.Compressor;
      return null;
    },
    Tone.Destination,
  );
}
}