import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { NoteService } from '../../../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Label } from '../../../core/model/label/label';

@Component({
  selector: 'app-add-label-note',
  templateUrl: './add-label-note.component.html',
  styleUrls: ['./add-label-note.component.scss']
})
export class AddLabelNoteComponent implements OnInit {
  @Input() note;
  @Output() eventAddLabelNote = new EventEmitter();
  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  public labels: Label[] = [];
  public newLabels: Label[] = [];
  filter: '';

  ngOnInit() {
    this.getLabels();
  }

  public onClickedCheckbox(event, label, note) {
    event.stopPropagation();
    this.noteService.addLabelNote(note.noteId, label).subscribe(response => {
      this.getLabels();
      this.snackBar.open('Label added to the note', 'OK', { duration: 2000 });
      this.getLabels();
      const data = { note };
      this.eventAddLabelNote.emit(data);
    }, (error) => console.log(error));
  }
  public getLabels() {
    this.noteService.retrieveLabels().subscribe(newLabel => {
      this.labels = newLabel;
      // console.log(this.labels);
    }, error => {
      this.snackBar.open('Cannot retrieve labels or labels are empty', 'ERROR', { duration: 2000 });
    }
    );
  }

  public labelFilter(event, noteLabels) {
    event.stopPropagation();
    this.newLabels.length = 0;
    let n = 0;
// tslint:disable-next-line: prefer-for-of
    for (let l = 0; l < this.labels.length; l++) {
      let present = 0;
// tslint:disable-next-line: prefer-for-of
      for (let m = 0; m < noteLabels.length; m++) {
        if (this.labels[l].labelId === noteLabels[m].labelId && present === 0) {
          present = 1;
        }
      }
      if (present === 0) {
        this.newLabels[n] = this.labels[l];
        n++;
      }
    }
  }

  public createNewLabel(filter, note) {
    this.getLabels();
    const var1 = note.labels.some((label) => label.labelName === filter);
    const var2 = this.newLabels.some((label) => label.labelName === filter);
    if (var1 && var2) {
      this.snackBar.open('Label already exists', 'Cannot create a new label with the same name', { duration : 2000});
      return;
     }
    const newLabel = {
        labelName : filter
     };
    this.noteService.createLabel(newLabel).subscribe(label => {
      this.getLabels();
      this.snackBar.open('Label created successfully', 'OK', {duration: 2000});
      this.noteService.addLabelNote(note.noteId, label).subscribe(response => {
        console.log('Good');
        const data = { note };
        this.eventAddLabelNote.emit(data);
        this.getLabels();
       });
     }, error => {
      this.snackBar.open('Please create a label with a different name', 'OK', {duration: 2000});
     }
      );
  }
}
