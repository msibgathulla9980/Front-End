import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../../core/service/note.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../core/service/user.service';
import { HelperKeepService } from '../../../core/service/helper-keep.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private router: Router,
              private userService: UserService,
              private helperService: HelperKeepService,
              public dialogRef: MatDialogRef<ImageComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSelectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.uploadImage(this.currentFileUpload).subscribe(event => {
      this.snackBar.open('Image uploaded successfully', 'OK', { duration: 2000 });
      this.dialogRef.close();
    });
  }
  close() {
    this.dialogRef.close();
  }

  removeImage() {
    this.userService.removeImage().subscribe(event => {
      this.snackBar.open('Image removed successfully', 'OK', { duration: 2000 });
      this.dialogRef.close();
    });
  }

}
