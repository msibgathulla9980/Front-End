import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Label } from '../../../core/model/label/label';
import { NoteService } from '../../../core/service/note.service';

@Component({
  selector: 'app-update-label',
  templateUrl: './update-label.component.html',
  styleUrls: ['./update-label.component.scss']
})
export class UpdateLabelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateLabelComponent>, @Inject(MAT_DIALOG_DATA) public data: Label,
              private noteService: NoteService, private snackBar: MatSnackBar) { }
              public labels: Label[] = [];

  ngOnInit() {
    this.getLabels();
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

  closeClick(newLabel) {
    console.log(newLabel.labelId);
    console.log(newLabel.labelName);
    this.noteService.updateLabel(newLabel, newLabel.labelId).subscribe(response => {
      this.snackBar.open('Label updated successfully', 'OK', { duration: 2000 });
      console.log(response);
    },

      error => {

        console.log(error);
      });
    this.dialogRef.close();
  }


}
