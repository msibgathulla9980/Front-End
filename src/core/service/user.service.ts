import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpEvent } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpService,
    private router: Router
  ) { }
  public token = localStorage.getItem('token');
  public httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      token: this.token
    })
  };

  login(user) {
    return this.http.postService(`${environment.base_url}login`, user);
  }
  register(user) {

    return this.http.postService(`${environment.base_url}register`, user);
  }

  getNoteData(note = {}): Observable<any> {
    return this.http.postService(`${environment.base_url}createNote`, note);
  }

  forgotPassword(user) {
    return this.http.postService(`${environment.base_url}forgotpassword`, user);
  }

  resetPassword(user, id) {

    return this.http.putService(`${environment.base_url}resetpassword/` + id, user, id);
  }

  retrieveUser(token): Observable<any> {
    const httpheaders = {
      headers: new HttpHeaders({

        'Content-Type': 'application/x-www-form-urlencoded',
        // tslint:disable-next-line: object-literal-key-quotes
        'token': token
      })
    };
    return this.http.getService(`${environment.base_url}retrieveuser`, httpheaders);
  }

  // fileUpload(file: File): Observable<HttpEvent<{}>> {
  //   const formdata: FormData = new FormData();
  //   formdata.append('file', file);
  //   return this.http.postServiceWithParam(`${environment.base_url}uploadfile/`, {
  //     params: {
  //       file
  //     },
  //     observe: 'response'
  //   }
  //   );
  // }

  // removeLabelFromNote(noteId, labelId) {
  //   return this.http.deleteService(`${environment.note_url}removenotebylabel/`, {
  //     params: {
  //       noteId,
  //       labelId,
  //     },
  //     observe: 'response'
  //   }
  //   );
  uploadImage(file): Observable<any> {
    const formdata = new FormData();
    formdata.append('file', file);
    return this.http.postServiceUploadImage(`${environment.base_url}photo/` + this.token, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
  }

  downloadImage(): Observable<any> {
    return this.http.getService(`${environment.base_url}photo`, this.httpheaders);
  }

  removeImage() {
    return this.http.deleteService(`${environment.base_url}photo`, this.httpheaders);
  }

  getUsers(): Observable<any> {
    return this.http.getService(environment.base_url + 'allusers', { observe: 'response' });
  }

  verifyEmail(email): Observable<any> {
    return this.http.getUserEmail(environment.base_url + 'verifyemail/' + email, this.httpheaders);
  }

  getCollaborateUser(userId): Observable<any> {
    return this.http.getCollaborateUser(environment.base_url + 'getcollaborateduser/' + userId);
  }
}


