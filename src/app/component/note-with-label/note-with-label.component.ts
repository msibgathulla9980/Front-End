import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from '../../../core/model/note/note';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../../../core/service/note.service';
import { MatSnackBar } from '@angular/material';
import { HelperKeepService } from '../../../core/service/helper-keep.service';

@Component({
  selector: 'app-note-with-label',
  templateUrl: './note-with-label.component.html',
  styleUrls: ['./note-with-label.component.scss']
})
export class NoteWithLabelComponent implements OnInit {

  @Output() updateEventNote = new EventEmitter();
  public notes: Note[] = [];
  labelName: string;
  labelNotes: Note[] = [];
  public grid = false;
  constructor(private router: ActivatedRoute,
              private noteService: NoteService,
              private snackBar: MatSnackBar,
              private helper: HelperKeepService) { }

  ngOnInit() {

    this.router.params.subscribe((params) => {
// tslint:disable-next-line: no-string-literal
      this.labelName = params['id'];
      this.helper.getTheme().subscribe((response) => {
        this.grid = response;
      });
      this.getNotes();
    });
  }

  public refresh(event) {
    this.updateEventNote.emit(event.note);
  }

  private getNoteWithLabel(notes) {
    this.labelNotes.length = 0;
    notes.filter((note) => {
      note.labels.filter((label) => {
        if (this.labelName === label.labelName && !note.trashed) {
          this.labelNotes.push(note);
        }
      });
    });
    return this.labelNotes;
  }

public getNotes() {
  this.noteService.retrieveNote().subscribe(newNote => {
    this.notes = newNote;
    console.log(this.notes);
    this.getNoteWithLabel(this.notes);
  }, error => {
    this.snackBar.open('Error in note retrieval', 'OK', { duration: 2000 });
    console.log('Error', error);
  }
  );
}
}
