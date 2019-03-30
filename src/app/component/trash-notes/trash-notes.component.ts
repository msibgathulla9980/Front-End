import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../../../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from '../../../core/model/note/note';
import { UpdateNoteComponent } from '../updatenote/updatenote.component';
import { HelperKeepService } from '../../../core/service/helper-keep.service';
import { Label } from '../../../core/model/label/label';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trash-notes',
  templateUrl: './trash-notes.component.html',
  styleUrls: ['./trash-notes.component.scss']
})
export class TrashNotesComponent implements OnInit {
  public notes: Note[] = [];
  @Input() grid = false;
  @Output() updateEventNote = new EventEmitter();
  public labels: Label[] = [];
  public newLabels: Label[] = [];
  selectedFiles: File;
  constructor(private noteService: NoteService, private sanitizer: DomSanitizer, private snackBar: MatSnackBar,
              private helperService: HelperKeepService, public dialog: MatDialog) { }

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
      console.log('image added');
      const data = { note };
      this.updateEventNote.emit(data);
    }
    );
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
  deleteNote(note) {
    console.log(note.noteId);
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.getNotes();
      this.snackBar.open('Note deleted Permanently', 'OK', { duration: 2000 });
      // tslint:disable-next-line: no-unused-expression
    }), error => {
      this.snackBar.open('Unable to delete the note', 'error', { duration: 2000 });
    };
  }

  restoreNote(note) {
    note.inTrash = 0;
    console.log(note);
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      this.getNotes();
      console.log(response);
      this.snackBar.open('Note restored successfully', 'OK', { duration: 2000 });
    },
      error => {
        console.log(error);
      });
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(note, note.noteId).subscribe(response => {
        console.log(response);
      },
        error => {
          console.log('error');
        });
      console.log('The dialog was closed');
    });
  }
  changeColor(data) {

    this.updateFunction(data.note);

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
}
