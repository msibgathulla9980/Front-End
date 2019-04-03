import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoteService } from '../../../core/service/note.service';
import { MatDialog, MatSnackBar, MatChipInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { UpdateNoteComponent } from '../../component/updatenote/updatenote.component';
import { Label } from '../../../core/model/label/label';
import { CollaboratorComponent } from '../../component/collaborator/collaborator.component';
import { DataService } from '../../../core/service/search.service';
import { UserService } from '../../../core/service/user.service';
import { DomSanitizer } from '@angular/platform-browser';



interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-pin-note',
  templateUrl: './pin-note.component.html',
  styleUrls: ['./pin-note.component.scss']
})
export class PinNoteComponent implements OnInit {
  constructor(private noteService: NoteService, public dialog: MatDialog, private router: Router,
              public snackBar: MatSnackBar, private sanitizer: DomSanitizer, public userService: UserService, public data: DataService) { }
  @Input() notes;
  @Input() grid = false;
  @Output() updateEventNote = new EventEmitter();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedMoment = new Date();
  public min = new Date();
  public labels: Label[] = [];
  public newLabels: Label[] = [];
  public imageData = {} as ImageData;
  //  public user;
  selectedFiles: File;


  ngOnInit() {
    // this.getImageNote();
    // this.getNotes();
    // this.changeColor(this.data);
  }
  addLabelNote(data) {
    console.log('1212');
    this.updateEventNote.emit(data);
    // this.updateMethod();
  }

  public getImage(image, note) {
    const url = `data:${note.contentType};base64,${image.image}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public onFileChanged(event, note) {
    this.selectedFiles = event.target.files[0];
    this.uploadImage(note);
  }

  public uploadImage(note) {
    this.noteService.addImage(this.selectedFiles, note.noteId).subscribe((resp) => {
      this.snackBar.open('Image added successfully', 'OK', { duration: 2000 });
      const data = { note };
      this.updateEventNote.emit(data);
    }
    );
  }

  public removeImage(image, note) {
    this.noteService.removeImage(image.imageId).subscribe((resp) => {
      this.snackBar.open('Image removed successfully', 'OK', { duration: 2000 });
      const data = { note };
      this.updateEventNote.emit(data);
    }
    );
  }


  updateFunction(note) {

    // this.noteService.retrieveArchiveNotes();
    // console.log(note);
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      this.getNotes();
      console.log(response);
    },
      error => {
        console.log(error);
      });
  }

  getNotes() {
    this.noteService.retrieveNote().subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open('Error in note retrieval', 'OK', { duration: 2000 });
      console.log('Error', error);
    }
    );
  }
  /**
   * @description details of the notes on which it is click
   *  open a popup after click on note
   */
  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '600px',
      data: note

    });
    dialogRef.afterClosed().subscribe(result => {

      // this.noteService.updateNote(note, note.noteId).subscribe(response => {
      //   console.log(response);
      // },
      //   error => {
      //     console.log(error);
      //   });
      // console.log('The dialog was closed');
      const data = { note };
      this.updateEventNote.emit(data);
      console.log('The dialog was closed');
    });
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

  updateNoteArchive(value, note) {
    note.archive = 1;
    note.pinned = 0;
    this.snackBar.open('Note archived', 'OK', { duration: 2000 });
    const data = { value, note };
    this.updateEventNote.emit(data);
  }
  // pinnedNote(note) {
  //   note.pinned = 1;
  //   // this.getNotes();
  //   this.snackBar.open('Note Pinned', 'OK', { duration: 2000 });
  //   const data = { note };
  //   this.updateEventNote.emit(data);
  // }
  pinnedNote(value, note) {
    note.pinned = value === 'pinned' ? 1 : 0;
    const data = { value, note };
    this.updateEventNote.emit(data);
  }

  pushToTrash(value, note) {
    note.inTrash = 1;
    this.snackBar.open('Note Trashed', 'OK', { duration: 2000 });
    const data = { value, note };
    this.updateEventNote.emit(data);
  }
  // updateMethod(note) {

  //   // this.noteService.retrieveArchiveNotes();
  //   // console.log(note);
  //   this.noteService.updateNote(note, note.noteId).subscribe(response => {
  //     this.updateEventNote.emit(data);
  //     console.log(response);
  //   },
  //     error => {
  //       console.log(error);
  //     });
  // }


  // openDialogForAddLabel(): void {
  //   const dialogRef = this.dialog.open(CreateLabelsComponent, {
  //     width: '300px',
  //     data: { labelId: '', labelName: '' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   }
  //   );

  // }

  removeLabelNote(label, note) {
    this.getLabels();
    this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
      this.snackBar.open('Label removed from note', 'OK', { duration: 2000 });
      const data = { note };
      this.updateEventNote.emit(data);
    }, (error) => console.log(error));
  }
  // public getNotes() {
  //   this.noteService.retrieveNote().subscribe(newNote => {
  //     this.notes = newNote;
  //   }, error => {
  //     this.snackBar.open('Cannot retrieve notes', 'ERROR', { duration: 2000 });
  //   }
  //   );
  // }
  //   updateMethod(note) {

  //     // this.noteService.retrieveArchiveNotes();
  //     // console.log(note);
  //     this.noteService.updateNote(note, note.noteId).subscribe(response => {
  //       const data = { note };
  //       this.updateEventNote.emit(data);
  //       console.log(response);
  //     },
  //       error => {
  //         console.log(error);
  //       });
  // }

  collaborator(note) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = { note };
      this.updateEventNote.emit(data);
      console.log('The dialog was closed');
    });
  }


  changeColor(data) {
    this.updateEventNote.emit(data);
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

  // public reminder(note) {
  //   event.stopPropagation();
  //   const dialogRef = this.dialog.open(ReminderComponent, {
  //     width: '600px',
  //     data: note

  //   });
  //   dialogRef.afterClosed().subscribe(result => {

  //     // this.noteService.updateNote(note, note.noteId).subscribe(response => {
  //     //   console.log(response);
  //     // },
  //     //   error => {
  //     //     console.log(error);
  //     //   });
  //     // console.log('The dialog was closed');
  //     const data = { note };
  //     this.updateEventNote.emit(data);
  //     console.log('The dialog was closed');
  //   });

  // }
  public addReminder(selectedMoment, note) {
    note.reminder = selectedMoment;
    console.log(note.reminder);
    const data = { note };
    this.updateEventNote.emit(data);
  }

  public removeReminder(note) {
    note.reminder = null;
    console.log(note.reminder);
    const data = { note };
    this.updateEventNote.emit(data);
  }
}



