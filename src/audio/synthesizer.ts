import { BaseNode, NodeInput } from '../base';
import Wad from 'web-audio-daw';
import { Envelope } from './envelope';
import { Filter } from './filter';
import { Reverb } from './reverb';
import { Delay } from './delay';
import { Vibrato } from './vibrato';
import { Tremolo } from './tremolo';
import { convertMidi } from './midinote';

type Source = 'sine' | 'triangle' | 'square' | 'sawtooth';

interface Synthesizer {
  source: Source;
  volume: number;
  pitch: string;
  detune: number;
  panning: number;

  env: Envelope;
  filter: Filter;
  reverb: Reverb;
  delay: Delay;
  vibrato: Vibrato;
  tremolo: Tremolo;
}

function getDefaultSynthesizer() {
  const defaultEnvelope = {
    attack: 0.0,
    decay: 0.0,
    sustain: 1.0,
    hold: 3.14,
    release: 0.0
  } as Envelope;

  const defaultFilter = {
    type: 'lowpass',
    frequency: 600,
    q: 1,
    env: {
      frequency: 800,
      attack: 0.5
    }
  } as Filter;

  const defaultReverb = {
    wet: 0.0
  } as Reverb;

  const defaultDelay = {
    delayTime: 0.0,
    wet: 0.0,
    feedback: 0.0
  } as Delay;

  const defaultVibrato = {
    shape: 'sine',
    magnitude: 0,
    speed: 2,
    attack: 0
  } as Vibrato;

  const defaultTremolo = {
    shape: 'sine',
    magnitude: 0,
    speed: 4,
    attack: 0
  } as Tremolo;

  return {
    source: 'sine',
    volume: 1.0,
    pitch: 'A4',
    detune: 0,
    panning: 0,
    env: defaultEnvelope,
    filter: defaultFilter,
    reverb: defaultReverb,
    delay: defaultDelay,
    vibrato: defaultVibrato,
    tremolo: defaultTremolo
  } as Synthesizer;
}

const defaultSynthesizer = getDefaultSynthesizer();

const notesInput = new NodeInput('Notes', [], 'notes', true, true);
const sourceInput = new NodeInput('Source', defaultSynthesizer.source, 'source', true, true);
const volumeInput = new NodeInput('Volume', defaultSynthesizer.volume, 'volume', true, true);
const pitchInput = new NodeInput('Pitch', defaultSynthesizer.pitch, 'pitch', false, true);
const detuneInput = new NodeInput('Detune', defaultSynthesizer.detune, 'detune', false, true);
const panningInput = new NodeInput('Panning', defaultSynthesizer.panning, 'panning', false, true);
const envelopeInput = new NodeInput('Envelope', defaultSynthesizer.env, 'env', false, true);
const filterInput = new NodeInput('Filter', defaultSynthesizer.filter, 'filter', false, true);
const reverbInput = new NodeInput('Reverb', defaultSynthesizer.reverb, 'reverb', false, true);
const delayInput = new NodeInput('Delay', defaultSynthesizer.delay, 'delay', true, true);
const vibratoInput = new NodeInput('Vibrato', defaultSynthesizer.vibrato, 'vibrato', false, true);
const tremoloInput = new NodeInput('Tremolo', defaultSynthesizer.tremolo, 'tremolo', false, true);

const inputs = [
  notesInput,
  sourceInput,
  volumeInput,
  pitchInput,
  envelopeInput,
  filterInput,
  reverbInput,
  delayInput,
  vibratoInput,
  tremoloInput
];

type SynthInput = number | Source | Envelope | Filter | Reverb | Delay | Vibrato | Tremolo;

export default class SynthesizerNode extends BaseNode<SynthInput, Synthesizer> {
  public wad: Wad;
  constructor() {
    super(inputs, null, 'Synthesizer');
    // const {
    //   source,
    //   volume,
    //   pitch,
    //   detune,
    //   panning,
    //   env,
    //   filter,
    //   reverb,
    //   delay,
    //   vibrato,
    //   tremolo
    // } = getDefaultSynthesizer();
    this.wad = new Wad({...getDefaultSynthesizer()});
  }
  public calc(
    notes: number|number[]|string|string[],
    source: Source,
    volume: number,
    pitch: string,
    detune: number,
    panning: number,
    env: Envelope,
    filter: Filter,
    reverb: Reverb,
    delay: Delay,
    vibrato: Vibrato,
    tremolo: Tremolo,
  ): Synthesizer {
    const update = {
      source,
      volume,
      pitch,
      detune,
      panning,
      env,
      filter,
      reverb,
      delay,
      vibrato,
      tremolo
    };
    for (const key of Object.keys(update)) {
      this.wad[key] = update[key];
    }
    // this.wad = { ...this.wad, ...update };
    for (const note of [notes].flat()) {
      const playPitch = typeof(note) === 'string' ? note : convertMidi(note);
      this.wad.play({ pitch: playPitch });
    }
    return update;
  }
}
