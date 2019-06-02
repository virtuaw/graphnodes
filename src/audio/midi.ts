import { BaseNode, NodeInput, NodeOutput } from '../base';
import WebMidi from 'webmidi';

export class MidiInputDevicesNode extends BaseNode<string, any> {
  public devices: string[] = [];
  constructor() {
    super([new NodeInput('Input Device Name', '', 'inputDeviceName')], null, 'Midi Input Devices');
    this.updateMidiDevices();
  }

  public calc(inputDevice: string) {
    if (this.devices.length > 0) {
      return WebMidi.getInputByName(inputDevice);
    }
    return null;
  }

  public trigger() {
    this.updateMidiDevices();
    if (this.output.connections.length > 0) {
      this.output.trigger();
    } else {
      return this.calc(this.inputValues[0]);
    }
  }

  private updateMidiDevices() {
    WebMidi.enable(function(err) {
      this.devices = WebMidi.inputs.map((input) => input.name);
      this.inputs[0].defaultValue = this.devices.length > 0
        ? this.devices[this.devices.length - 1]
        : null;
    }.bind(this), true);
  }
}

export class MidiDeviceInputNode extends BaseNode<any, any> {
  private midiInput;
  private activeNotes: string[] = [];
  constructor() {
    super([new NodeInput('Input Midi Device', null, 'inputDevice')], null, 'Midi Device Input');
  }

  public trigger() {
    this.midiInput = this.inputs[0].connection.value;
    console.log(this.midiInput);
    this.midiInput.addListener('noteon', 'all', this.noteOnHandler.bind(this));
    this.midiInput.addListener('noteoff', 'all', this.noteOffHandler.bind(this));
    console.log(this.midiInput);
    this.call();
  }

  public noteOnHandler(e) {
    this.activeNotes.push(e.note.number);
    this.output.trigger();
  }

  public noteOffHandler(e) {
    this.activeNotes = this.activeNotes.filter((n) => n !== e.note.number);
    // this.trigger();
  }

  public calc() {
    return this.activeNotes.length > 0 ? this.activeNotes[0] : null;
  }
}

// export class Note {
//   private _midinote: number;
//   private _velocity: number;

//   get midinote(): number {
//     return this._midinote;
//   }
//   set midinote(value: number) {
//     this._midinote = this.toSevenBitInt(value);
//   }

//   get velocity(): number {
//     return this._velocity;
//   }
//   set velocity(value: number) {
//     this._velocity = this.toSevenBitInt(value);
//   }

//   get octave() {
//     return Math.trunc(this.midinote / 12);
//   }

//   get noteName() {
//     return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][this.midinote % 12];
//   }

//   constructor(midinote: number, velocity: number = 127) {
//     this.midinote = midinote;
//     this.velocity = velocity;
//   }

//   public toString = function(): string {
//     return `${this.noteName}${this.octave}`;
//   };

//   /**
//    * Make sure that the value stays between 0 - 127
//    */
//   private toSevenBitInt(value: number): number {
//     const roundedValue = Math.round(value);
//     if (!Number.isInteger(roundedValue)) {
//       return 0;
//     }
//     return Math.min(Math.max(roundedValue, 0), 127);
//   }
// }

// export class MidiMessage extends Note {
//   private _status: 'on' | 'off';
//   get status(): 'on' | 'off' {
//     return this._status;
//   }
//   set status(value: 'on' | 'off') {
//     if (value !== 'on' && value !== 'off') {
//       this._status = 'off';
//       return;
//     }
//     this._status = value;
//   }
//   constructor(midinote: number, velocity: number = 127, status: 'on' | 'off' = 'on' ) {
//     super(midinote, velocity);
//   }
// }
