import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoteService } from '../../../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from '../../../core/model/note/note';
import { UpdateNoteComponent } from '../../component/updatenote/updatenote.component';
import { Label } from '../../../core/model/label/label';
import { HelperKeepService } from '../../../core/service/helper-keep.service';
import { DataService } from '../../../core/service/search.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-archivenotes',
  templateUrl: './archivenotes.component.html',
  styleUrls: ['./archivenotes.component.scss']
})
export class ArchivenotesComponent implements OnInit {
  public notes: Note[] = [];
  @Output() updateEventNote = new EventEmitter();
  @Input() grid = false;
  //  @Input() notes;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedMoment = new Date();
  public min = new Date();
  public labels: Label[] = [];
  public newLabels: Label[] = [];
  selectedFiles: File;

  constructor(private noteService: NoteService, private helperService: HelperKeepService,
              private snackBar: MatSnackBar, private sanitizer: DomSanitizer, public dialog: MatDialog, public data: DataService) { }
  ngOnInit() {
    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
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

  addLabelNote(data) {
    this.updateFunction(data.note);
  }
  getNotes() {
    this.noteService.retrieveNote().subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open('error', 'error to retrieve notes', { duration: 2000 });
    }
    );
  }

  // openDialog(note): void {
  //   const dialogRef = this.dialog.open(UpdateNoteComponent, {
  //     width: '500px',
  //     data: note
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.noteService.updateNote(note, note.noteId).subscribe(response => {
  //       console.log(response);
  //     },
  //       error => {
  //         console.log('error');
  //       });
  //     console.log('The dialog was closed');
  //   });
  // }

  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '600px',
      data: note

    });
    dialogRef.afterClosed().subscribe(result => {

      this.noteService.updateNote(note, note.noteId).subscribe(response => {
        console.log(response);
      },
        error => {
          console.log(error);
        });
      console.log('The dialog was closed');
      // const data = { note };
      // this.updateEventNote.emit(data);
      // console.log('The dialog was closed');
    });
  }

  updateArchiveNote(note) {
    note.archive = 0;
    this.snackBar.open('Note Unarchived', 'OK', { duration: 2000 });
    // const data = { note };
    // this.updateEventNote.emit(data);
    this.updateFunction(note);
  }

  // pushToTrash(value, note) {
  //   note.inTrash = 1;
  //   this.snackBar.open('Note Trashed', 'OK', { duration: 2000 });
  //   const data = { value, note };
  //   this.updateEventNote.emit(data);
  // }


  pushToTrash(note) {
    note.inTrash = 1;
    this.snackBar.open('Moved to trash', 'OK', { duration: 2000 });
    // const data = { note };
    // this.updateEventNote.emit(data);
    this.updateFunction(note);
  }

  pin(note) {
    note.archive = 0;
    note.pinned = 1;
    this.snackBar.open('Note Pinned', 'OK', { duration: 2000 });
    // const data = { note };
    // this.updateEventNote.emit(data);
    this.updateFunction(note);
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


  changeColor(data) {

    this.updateFunction(data.note);

  }

  public saveReminder(selectedMoment, note) {
    note.reminder = selectedMoment;
    console.log(note.reminder);
    const data = { note };
    this.updateFunction(data.note);
  }

  public removeReminder(note) {
    note.reminder = null;
    console.log(note.reminder);
    const data = { note };
    this.updateFunction(data.note);
  }

  removeLabelNote(label, note) {
    this.getLabels();
    this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
      this.snackBar.open('Label deleted from note', 'OK', { duration: 2000 });
      const data = { note };
      this.updateFunction(data.note);
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

}
