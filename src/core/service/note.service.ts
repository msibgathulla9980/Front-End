import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public token = localStorage.getItem('token');
  public httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      token: this.token
    })
  };
  constructor(private http: HttpService, private router: Router, public snackBar: MatSnackBar) { }

  retrieveNote(): Observable<any> {
    return this.http.getService(`${environment.note_url}retrievenote`, this.httpheaders);
  }

  createNote(note): Observable<any> {
    return this.http.postServiceForCreateNote(`${environment.note_url}createnote`, this.httpheaders, note);
  }

  updateNote(note, id) {
    return this.http.putServiceForUpdateNote(`${environment.note_url}updatenote/` + id, this.httpheaders, note);
  }


  deleteNote(id) {
    return this.http.deleteServiceForDeleteNote(`${environment.note_url}deletenote/` + id, this.httpheaders);
  }

  retrieveArchiveNotes() {
    return this.http.getServiceForArchiveNotes(`${environment.note_url}archivenote`, this.httpheaders);
  }

  retrieveLabels(): Observable<any> {
    return this.http.getService(`${environment.note_url}retrievelabel`, this.httpheaders);
  }

  updateLabel(label, id) {
    return this.http.putService(`${environment.note_url}updatelabel/` + id, this.httpheaders, label);
  }

  deleteLabel(id) {
    return this.http.deleteService(`${environment.note_url}deletelabel/` + id, this.httpheaders);
  }

  createLabel(label): Observable<any> {
    return this.http.postServiceForCreateLabel(`${environment.note_url}createlabel`, this.httpheaders, label);
  }

  removeLabelFromNote(noteId, labelId) {
    return this.http.deleteServiceWithParams(`${environment.note_url}removenotebylabel/`, {
      params: {
        noteId,
        labelId,
      },
      observe: 'response'
    }
    );

  }

  addLabelNote(noteId, label): Observable<any> {
    console.log('2222');
    return this.http.AddLabelByNote(`${environment.note_url}addnotebylabel/` + noteId, label);
  }
  createCollaborator(noteId, userId) {
    return this.http.postForCollaborator(`${environment.note_url}createcollaborator/` + noteId + '/' + userId, this.httpheaders
    );
  }

  removeCollaborator(noteId, userId) {
    return this.http.removeCollaborateUser(`${environment.note_url}removecollaborator/` + userId + '/' + noteId);
  }

  // uploadImage(file): Observable<any> {
  //   const formdata = new FormData();
  //   formdata.append('file', file);
  //   return this.http.postServiceUploadNoteImage(`${environment.note_url}photo/` + this.token, formdata, {
  //     reportProgress: true,
  //     responseType: 'text'
  //   }
  //   );
  // }

  // downloadImage(): Observable<any> {
  //   return this.http.getService(`${environment.note_url}photo`, this.httpheaders);
  // }

  // removeImage() {
  //   return this.http.deleteService(`${environment.note_url}photo`, this.httpheaders);
  // }

  addImage(file, noteId) {
    const formdata = new FormData();
    formdata.append('file', file);
    return this.http.postForAddImage(environment.note_url + 'photo/' + noteId, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
  }

  removeImage(imageId) {
    return this.http.removeImage(environment.note_url + 'photo/' + imageId);
  }
}
