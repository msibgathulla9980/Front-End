import { Component, OnInit } from '@angular/core';
import { Note } from '../../../core/model/note/note';
import { NoteService } from '../../../core/service/note.service';
import { MatSnackBar } from '@angular/material';
import { HelperKeepService } from '../../../core/service/helper-keep.service';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.css']
})
export class SearchNotesComponent implements OnInit {
  public notes: Note[] = [];
  public searchString = '';
  public grid: false;
  constructor(private noteService: NoteService, public snackBar: MatSnackBar, public helperService: HelperKeepService, ) { }

  ngOnInit() {
    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>
    this.grid = resp
    );
    this.helperService.getSearch().subscribe((resp) =>
      this.searchString = resp);
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
    this.snackBar.open('Cannot retrieve notes', 'ERROR', { duration: 2000 });
  }
  );
}
}
