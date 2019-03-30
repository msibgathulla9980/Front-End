import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { NoteService } from '../../../core/service/note.service';
import { Note } from '../../../core/model/note/note';
import { Label } from '../../../core/model/label/label';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { UserService } from '../../../core/service/user.service';
import { ImageComponent } from '../../component/image/image.component';
import { DomSanitizer } from '@angular/platform-browser';

interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdateNoteComponent implements OnInit {
  @Output() updateEventNote = new EventEmitter();
 public notes: Note[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedMoment = new Date();
  public min = new Date();
  public labels: Label[] = [];
  public newLabels: Label[] = [];
  public imageData = {} as ImageData;
  selectedFiles: File;

  // public user;
  constructor(public dialogRef: MatDialogRef<UpdateNoteComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: Note,
              private noteService: NoteService, private sanitizer: DomSanitizer,
              private snackBar: MatSnackBar, public userService: UserService) { }


  ngOnInit() {
    // this.getImageNote();
  }

  public getImages(image, note): any {
    const url = `data:${note.contentType};base64,${image.image}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public onFileChanged(event, note) {
    this.selectedFiles = event.target.files[0];
    this.uploadImage(note);
  }

  public uploadImage(note) {
    this.noteService.addImage(this.selectedFiles, note.noteId).subscribe((resp) => {
      console.log('image added');
      const data = { note };
      this.updateEventNote.emit(data);
    }
    );
  }


  // openDialogForImage(): void {
  //   const dialogRef = this.dialog.open(ImageComponent, {
  //     width: '500px',
  //     data: ''
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getImageNote();
  //     console.log('The dialog was closed');
  //   });
  // }

  // getImageNote() {
  //   this.userService.downloadImage().subscribe(resp => {
  //     this.user = resp;
  //     console.log(this.user);
  //     if (this.user.image != null) {
  //       const url = `data:${this.user.contentType};base64,${this.user.image}`;
  //       this.imageData = {
  //         imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
  //       };
  //     } else {
  //       this.imageData.imageSrc = null;
  //     }
  //   }, error => {
  //     this.snackBar.open('error to download note image or note image data is not present ', 'ERROR', { duration: 2000 });
  //   }
  //   );
  // }

  closeClick(newNote) {
    console.log(newNote.title);
    console.log(newNote.description);
    this.noteService.updateNote(newNote, newNote.noteId).subscribe(response => {
      this.snackBar.open('Note updated successfully', 'OK', { duration: 2000 });
      console.log(response);
    },

      error => {

        console.log(error);
      });
    this.dialogRef.close();
  }
  deleteNote(note) {
    console.log(note.noteId);
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.snackBar.open('Note deleted successfully', 'OK', { duration: 2000 });
    }),
      // tslint:disable-next-line: no-unused-expression
      error => {
        console.log(error);
        this.snackBar.open('Unable to delete the notes', 'Notes retrieval error',
          { duration: 2000 });
      };
  }
  pinnedNote(value, note) {
    note.pinned = value === 'pinned' ? 1 : 0;
    this.dialogRef.close();
    const data = { value, note };
    this.updateEventNote.emit(data);
  }
  changeColor(data) {
    this.updateMethod(data.note, data.note.noteId);
    // this.updateEventNote.emit(data);
  }

  updateMethod(note, noteId) {

    this.noteService.retrieveArchiveNotes();
    console.log(note);
    this.noteService.updateNote(note, noteId).subscribe(response => {
      const data = { note };
      this.updateEventNote.emit(data);
      console.log(response);
    },
      error => {
        console.log(error);
      });
  }

  public saveReminder(selectedMoment, data) {
    data.reminder = selectedMoment;
    // console.log(data.reminder);
    // // const data = { data };
    // this.updateEventNote.emit(data);
    this.updateMethod(data, data.noteId);
  }

  public removeReminder(data) {
    data.reminder = null;
    // console.log(data.reminder);
    // // const data = { note };
    // this.updateEventNote.emit(data);
    this.updateMethod(data, data.noteId);
  }

  removeLabelNote(label, data) {
    this.noteService.removeLabelFromNote(data.noteId, label.labelId).subscribe(response => {
      this.snackBar.open('Label removed from note', 'OK', { duration: 2000 });
      // const data = { note };
      this.updateMethod(data, data.noteId);
      this.dialogRef.close();
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
  collaborator(data) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
// tslint:disable-next-line: object-literal-shorthand
       data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateEventNote.emit(data);
      console.log('The dialog was closed');
    });
  }


  pushToTrash(note) {
    note.inTrash = 1;
    this.snackBar.open('Moved to trash', 'OK', { duration: 2000 });
    const data = { note };
    this.updateEventNote.emit(data);
    // this.updateMethod(note, note.noteId);
    this.dialogRef.close();
  }
  archiveNote(note) {
    note.archive = 1;
    note.pinned = 0;
    this.snackBar.open('Note archived', 'OK', { duration: 2000 });
    this.updateMethod(note, note.noteId);
    this.dialogRef.close();
  }
}
