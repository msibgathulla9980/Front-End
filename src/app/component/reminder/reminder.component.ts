import { Component, OnInit } from '@angular/core';
import { Note } from '../../../core/model/note/note';
import { NoteService } from '../../../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelperKeepService } from '../../../core/service/helper-keep.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  public notes: Note[] = [];
  public grid = false;

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
              public dialog: MatDialog, private helperService: HelperKeepService) { }

  ngOnInit() {

    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
  }
  public onUpdateNote(data) {
    this.updateMethod(data.note);
  }

  updateMethod(note) {
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      this.getNotes();
    },
      error => {
        console.log('error');
      });
  }

  public getNotes() {
    this.noteService.retrieveNote().subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open('error', 'error to retrieve notes', { duration: 2000 });
    }
    );
  }
}
