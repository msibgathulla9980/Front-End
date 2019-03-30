import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  postService(url, object) {
    return this.http.post<any>(url, object, { observe: 'response' });
  }


  getService(url, header) {
    return this.http.get<any>(url, header);
  }

  deleteService(url, header) {
    return this.http.delete<any>(url, header);
  }

  postServiceWithParam(url, params) {
    return this.http.post<any>(url, null, params);
  }

  deleteServiceWithParams(url, params) {
    return this.http.delete(url, params);
  }

  postServiceForCreateNote(url, header, object) {
    return this.http.post<any>(url, object, header);
  }

  putServiceForUpdateNote(url, header, object) {
    return this.http.put<any>(url, object, header);
  }
  putService(url, object, header) {
    return this.http.put<any>(url, object, header);
  }

  deleteServiceForDeleteNote(url, header) {
    return this.http.delete<any>(url, header);
  }
  getServiceForArchiveNotes(url, header) {
    return this.http.get<any>(url, header);
  }
  postServiceForCreateLabel(url, header, object) {
    return this.http.post<any>(url, object, header);
  }

  AddLabelByNote(url, object) {
    console.log('3333');
    return this.http.put<any>(url, object, { observe: 'response' });
  }
  postServiceUploadImage(url, object, header) {
    return this.http.post<any>(url, object, header);
  }
  getUserEmail(url, header) {
    return this.http.get<any>(url, header);
  }

  postForCollaborator(url, header) {
    return this.http.post<any>(url, {}, header);
  }

  getCollaborateUser(url) {
    return this.http.get<any>(url, {});
  }

  removeCollaborateUser(url) {
    return this.http.delete<any>(url, {});
  }
  postServiceUploadNoteImage(url, object, header) {
    return this.http.post<any>(url, object, header);
  }

  postForAddImage(url, param, header) {
    return this.http.post<any>(url, param, header);
  }

  removeImage(url) {
    return this.http.delete<any>(url, {});
  }
}

