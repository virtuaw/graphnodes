import { BaseNode, NodeInput } from '../base';

export class MidiNote {
  constructor(
    public value: number = 32,
    public velocity: number = 64,
    public status: 'on' | 'off' = 'off'
  ) { }

  get active() {
    return this.status === 'on';
  }
}

interface NoteListDiff {
  list: MidiNote[];
  attack: MidiNote[];
  release: MidiNote[];
}

const noteListInputs = [ new NodeInput('Notes', [], 'notes', false) ];

export class NoteListDiffNode extends BaseNode<MidiNote[], NoteListDiff> {
  public notes: MidiNote[];
  constructor() {
    super(noteListInputs, null, 'Note List');
    const midiValues = [...Array(128).keys()];
    this.notes = midiValues.map((val) => new MidiNote(val));
  }

  /**
   * changes active and inactive notes as well as the velocity
   * and returns an array of newly activated notes.
   */
  public handleNotes(notes: MidiNote | MidiNote[]): NoteListDiff {
    const cachedNotes = [...this.notes];

    for (const note of Array.isArray(notes) ? notes : [notes]) {
      this.notes[note.value] = note;
    }

    const diffNotes = this.notes.filter((note, idx) => note.active !== !cachedNotes[idx].active);

    const diffActive = diffNotes.filter((note) => note.active);
    const diffInactive = diffNotes.filter((note) => !note.active);
    return { list: this.notes, attack: diffActive, release: diffInactive };
  }

  get activeNotes() {
    return this.notes.filter((note) => note.active);
  }
}

const getDiffInputs = () => [
  new NodeInput('Note List Diff', { list: [], attack: [], release: [] }, null, false)
];

export class AttackListNode extends BaseNode<NoteListDiff, MidiNote[]> {
  constructor() {
    super(getDiffInputs(), null, 'Note Attack List');
  }

  public calc(noteDiff) {
    return noteDiff.attack;
  }
}

export class ReleaseListNode extends BaseNode<NoteListDiff, MidiNote[]> {
  constructor() {
    super(getDiffInputs(), null, 'Note Release List');
  }

  public calc(noteDiff) {
    return noteDiff.release;
  }
}

export class NoteListNode extends BaseNode<NoteListDiff, MidiNote[]> {
  constructor() {
    super(getDiffInputs(), null, 'Complete Note List');
  }

  public calc(noteDiff) {
    return noteDiff.list;
  }
}
