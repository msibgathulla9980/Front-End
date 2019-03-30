
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { HttpService } from '../../../core/service/http.service';
import { NoteService } from '../../../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from '../../../core/model/note/note';
import { Label } from '../../../core/model/label/label';
import { HelperKeepService } from '../../../core/service/helper-keep.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';


@Component({
  selector: 'app-notebody',
  templateUrl: './notebody.component.html',
  styleUrls: ['./notebody.component.scss']
})
export class NoteBodyComponent implements OnInit {
  public note: Note[] = [];
  @Input() notes;
  @Output() eventToCreate = new EventEmitter();
  @Output() updateEventNote = new EventEmitter();
  selectedMoment = new Date();
  public min = new Date();
  // public labels: Label[] = [];
  // public newLabels: Label[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  public showHeader = true;
  createNoteForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  @Input() grid = false;
  public mytoken = localStorage.getItem('token');

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpService,
              private userService: UserService, private router: Router, private helperService: HelperKeepService,
              private noteService: NoteService, private snackBar: MatSnackBar, public dialog: MatDialog
  ) {

  }

  ngOnInit() {

    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
    this.createNoteForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });
  }
  get f() { return this.createNoteForm.controls; }

  addLabelNote(data) {
    this.updateFunction(data.labels);
    // this.updateMethod();
  }
  onSubmit(note) {
    this.submitted = true;

    if (this.createNoteForm.invalid) {
      return;
    }
    if (this.createNoteForm.value.title === '' && this.createNoteForm.value.description === '') {
      return;
    }
    console.log(this.mytoken);

    this.noteService.createNote(note).subscribe(response => {
      this.eventToCreate.emit(true);
      this.snackBar.open('Note has been created successfully', 'OK', {
        duration: 2000
      });
    }),
      // tslint:disable-next-line: no-unused-expression
      error => {
        console.log(error);
        this.snackBar.open('Note cannot be created', 'Error in note retrieval', { duration: 2000 });
      };
  }



  pinnedNote(note) {
    const newNote = {
      ...note,
      pinned: true
    };
    console.log(newNote.pinned);
    this.onSubmit(newNote);
  }

  archiveNoteSave(note) {
    const newNote = {
      ...note,
      archive: true
    };

    console.log(newNote.archive);
    this.onSubmit(newNote);

  }

  changeColor(data) {

    this.updateEventNote.emit(data.note);

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
      this.snackBar.open('error', 'error to retrieve notes', { duration: 2000 });
    }
    );
  }

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


