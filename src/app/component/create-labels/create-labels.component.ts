import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Label } from '../../../core/model/label/label';
import { NoteService } from '../../../core/service/note.service';
@Component({
  selector: 'app-create-labels',
  templateUrl: './create-labels.component.html',
  styleUrls: ['./create-labels.component.scss']
})

export class CreateLabelsComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CreateLabelsComponent>, @Inject(MAT_DIALOG_DATA) public data: Label,
              private noteService: NoteService, private snackBar: MatSnackBar) { }
              public labels: Label[] = [];
  ngOnInit() {

  }

  closeClick(newLabel) {
    console.log(newLabel.labelId);
    console.log(newLabel.labelName);
    this.getLabels();
    this.noteService.createLabel(newLabel).subscribe(response => {
      this.snackBar.open('Label created successfully', 'OK', { duration: 2000 });
      console.log(response);
      this.dialogRef.close();
    },

      error => {

        console.log(error);
      });
  }

  public getLabels() {
    this.noteService.retrieveLabels().subscribe(newLabel => {
      this.labels = newLabel;
    }, error => {
      this.snackBar.open('Unable to retrieve the label or labels are empty ', 'ERROR', { duration: 2000 });
    }
    );
  }


}
