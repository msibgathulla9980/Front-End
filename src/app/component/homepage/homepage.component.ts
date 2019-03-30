
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperKeepService } from '../../../core/service/helper-keep.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditLabelsComponent } from '../../component/edit-labels/edit-labels.component';
import { Subject } from 'rxjs';
import { Note } from '../../../core/model/note/note';
import { DataService } from '../../../core/service/search.service';
import { NoteService } from '../../../core/service/note.service';
import { UserService } from '../../../core/service/user.service';
import { User } from '../../../core/model/user/user';
import { HttpService } from '../../../core/service/http.service';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageComponent } from '../../component/image/image.component';

interface ImageData {
  imageSrc: any;
}



@Component({
  selector: 'app-login',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomePageComponent implements OnInit {

  grid = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  public searchString = '';
  public toggleNav: Subject<any> = new Subject();
  public user;

  public imageData = {} as ImageData;
  // selectedFiles: FileList;
  // currentFileUpload: File;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router, public snackBar: MatSnackBar, private data: DataService,
              public dialog: MatDialog, private helperService: HelperKeepService, public noteService: NoteService,
              public userService: UserService, private http: HttpService, private sanitizer: DomSanitizer) {

  }
  public hideButton() {
    this.grid = !this.grid;
    this.helperService.setTheme(this.grid);
  }
  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.userService.downloadImage().subscribe(resp => {
      this.user = resp;
      console.log(this.user);
      if (this.user.image != null) {
        const url = `data:${this.user.contentType};base64,${this.user.image}`;
        this.imageData = {
          imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
        };
      } else {
        this.imageData.imageSrc = null;
      }
    }, error => {
      this.snackBar.open('error to download image or image data is not present', 'ERROR', { duration: 2000 });
    }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImageComponent, {
      width: '500px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getImage();
      console.log('The dialog was closed');
    });
  }
  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  // }


  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  // onUpload() {
  //   event.stopPropagation();
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   console.log('6666');
  //   this.userService.fileUpload(this.currentFileUpload).subscribe(response => {
  //     console.log('6666');
  //     if (event instanceof HttpResponse) {
  //       this.snackBar.open('File is uploaded successfully', 'OK', {
  //         duration: 2000,
  //       });
  //       }
  //     });

  //   this.selectedFiles = undefined;
  //     }

  // onUpload() {
  //   // this.http is the injected HttpClient
  //   event.stopPropagation();
  //   const file = new FormData();
  //   file.append('myFile', this.selectedFile, this.selectedFile.name);
  //   this.userService.fileUpload(file).subscribe(response => {
  //         console.log('File Uploaded');
  //         this.snackBar.open('File uploaded', 'OK', {
  //           duration: 2000,
  //         });
  //         localStorage.setItem('token', response.headers.get('token'));
  //       },
  //         (error) => {
  //           console.log(error);
  //           this.snackBar.open('Unable to upload the file', 'ERROR', {
  //             duration: 2000,
  //           });
  //         });
  //     }
  public toggle() {
    this.toggleNav.next();
  }

  archive() {
    this.router.navigate(['homepage/archivenotes']);
  }


  notes() {
    this.router.navigate(['homepage/main-note']);
    // this.goBack();
  }

  trashnote() {

    this.router.navigate(['homepage/trash-notes']);
  }

  logout() {
     localStorage.removeItem('token');
     this.router.navigate(['/login']);
  }

  registration() {
    // localStorage.getItem('token');
    this.router.navigate(['/registration']);
  }

  refresh() {
    this.router.navigate(['/homepage']);
  }

  homepage() {
    this.router.navigate(['/homepage']);
  }
  // get f() { return this.Form.controls; }

  labelEdit(): void {
    {
      const dialogRef = this.dialog.open(EditLabelsComponent, {
        width: '500px',
        data: ''
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        console.log('The dialog was closed');
      });
    }
  }
  public searchTest() {
    this.helperService.setSearch(this.searchString);
    this.router.navigate(['homepage/search-notes']);
  }

  clearSearch() {
    this.searchString = '';
    this.router.navigate(['homepage/main-note']);
  }
}


