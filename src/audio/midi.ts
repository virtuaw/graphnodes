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
