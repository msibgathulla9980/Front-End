import { Component, OnInit, Output, EventEmitter, Input, Pipe } from '@angular/core';
import { NoteService } from '../../../core/service/note.service';
import { Note } from '../../../core/model/note/note';
import { MatSnackBar } from '@angular/material';
import { HelperKeepService } from '../../../core/service/helper-keep.service';




@Component({
  selector: 'app-main-note',
  templateUrl: './main-note.component.html',
  styleUrls: ['./main-note.component.scss']
})

export class MainNoteComponent implements OnInit {
  public mytoken = '';
  public notes: Note[] = [];
  public grid = false;
  constructor(private noteService: NoteService, public snackBar: MatSnackBar, private helperService: HelperKeepService) { }
  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
  }

  onSubmit() {
  }

  public refresh(event) {
    if (event) {
      this.getNotes();
    }
  }
  public onUpdateNote(data) {
    console.log(data.note);
    this.updateMethod(data.note);
  }

  updateMethod(note) {
    console.log();
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
      this.snackBar.open('Cannot retrieve notes or notes are empty', 'ERROR', { duration: 2000 });
    }
    );
  }
  }


