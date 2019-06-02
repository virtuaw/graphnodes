import { BaseNode, NodeInput } from '../base';
import Wad from 'web-audio-daw';
import { Envelope, getDefaultEnvelope } from './envelope';
import { Filter, getDefaultFilter } from './filter';
import { Reverb } from './reverb';
import { Delay, getDefaultDelay } from './delay';
import { Vibrato, getDefaultVibrato } from './vibrato';
import { Tremolo, getDefaultTremolo } from './tremolo';
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
  const defaultEnvelope = getDefaultEnvelope();
  const defaultFilter = getDefaultFilter();
  const defaultDelay = getDefaultDelay();
  const defaultVibrato = getDefaultVibrato();
  const defaultTremolo = getDefaultTremolo();

  return {
    source: 'sine',
    volume: 0.1,
    pitch: 'A4',
    detune: 0,
    panning: 0,
    env: defaultEnvelope,
    filter: defaultFilter,
    // reverb: defaultReverb,
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
  detuneInput,
  envelopeInput,
  filterInput,
  delayInput,
  vibratoInput,
  tremoloInput
];

type SynthInput = number | Source | Envelope | Filter | Reverb | Delay | Vibrato | Tremolo;

export default class SynthesizerNode extends BaseNode<SynthInput, Synthesizer> {
  public wad: Wad;
  constructor() {
    super(inputs, null, 'Synthesizer');
    this.wad = new Wad({...getDefaultSynthesizer()});
  }
  public calc(
    notes: number|number[]|string|string[],
    source: Source,
    volume: number,
    pitch: string,
    detune: number,
    env: Envelope,
    filter: Filter,
    delay: Delay,
    vibrato: Vibrato,
    tremolo: Tremolo,
  ) {
    const update = {
      source,
      volume,
      pitch,
      detune,
      // panning,
      env,
      filter,
      delay,
      vibrato,
      tremolo
    };
    for (const key of Object.keys(update)) {
      this.wad[key] = update[key];
    }
    // this.wad = new Wad({ ...update });
    console.log(this.wad);
    for (const note of [notes].flat()) {
      const playPitch = typeof(note) === 'string' ? note : convertMidi(note);
      console.log(playPitch);
      this.wad.play({ env, pitch: playPitch });
    }
    return update;
  }
}
