import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../../../core/service/note.service';
import { Label } from '../../../core/model/label/label';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss']
})
export class EditLabelsComponent implements OnInit {
  public labels: Label[] = [];
  constructor(private noteService: NoteService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditLabelsComponent>,
              @Inject(MAT_DIALOG_DATA) public data ) { }

  ngOnInit() {

    this.getLabels();
  }

  public getLabels() {
    this.noteService.retrieveLabels().subscribe(newLabel => {
      this.labels = newLabel;
    }, error => {
      this.snackBar.open('Unable to retrieve the label or labels are empty ', 'ERROR', { duration: 2000 });
    }
    );
  }

  public createLabel(label) {
    // const name = labelName.innerHTML;
    console.log(label);
    const data = {
      labelName: label
    };
    this.noteService.createLabel(data).subscribe(response => {
      this.snackBar.open('Label created successfully', 'OK', { duration: 2000 });
    }, error => {
      this.snackBar.open('Cannot create label', 'ERROR', { duration: 2000 });
    }
    );
  }
  public deleteLabel(label) {
    this.getLabels();
    this.noteService.deleteLabel(label.labelId).subscribe(response => {
      this.snackBar.open('Label deleted', 'Ok', { duration: 2000 });
    }, error => {
      this.snackBar.open('Cannot delete label', 'ERROR', { duration: 2000 });
    }
    );
  }

  public labelUpdate(label, labelName) {
    const name = labelName.innerHTML;
    console.log(name);
    const newLabel = {
      ...label,
      labelName: name
    };
    this.noteService.updateLabel(newLabel, newLabel.labelId).subscribe(response => {
      this.getLabels();
      this.snackBar.open('Updated label', 'OK', { duration: 2000 });
    }, error => {
      this.snackBar.open('Cannot update label', 'ERROR', { duration: 2000 });
    }
    );
  }

  public closeDialog() {
    this.dialogRef.close();
  }

}
