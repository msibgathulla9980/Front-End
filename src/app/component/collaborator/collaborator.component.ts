import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../core/service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Note } from '../../../core/model/note/note';
import { FormControl } from '@angular/forms';
import { User } from '../../../core/model/user/user';
import { NoteService } from '../../../core/service/note.service';


interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})

export class CollaboratorComponent implements OnInit {

  public user: any;
  public emailId = '';
  public myControl = new FormControl();
  public users: User[] = [];
  public imageData = {} as ImageData;
  public collabUsers: User[] = [];
  constructor(private userService: UserService, public dialogRef: MatDialogRef<CollaboratorComponent>,
              @Inject(MAT_DIALOG_DATA) public note: Note, private noteService: NoteService,
              private snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.getImage();
    this.getUsers();
    this.getCollaborateUser();
  //   this.getNoteOwner();
  }


  // public getNoteOwner() {
  //   this.userService.getCollaborateUser(this.note.userId).subscribe(
  //     user => this.user = user);
  // }

  public getUsers() {
    this.userService.getUsers().subscribe(({ body }) => {
      this.users = body;
      console.log(this.users);
    }
      , error => console.log('error'));
  }

  collaborate(emailId) {
    this.userService.verifyEmail(emailId).subscribe(user => {
      if (user.id === this.note.userId) {
        this.snackBar.open('Cannot add the owner', 'ERROR', { duration: 2000 });
        return;
      }
      this.snackBar.open('emailId verified', 'ok', { duration: 2000 });
      this.noteService.createCollaborator(this.note.noteId, user.id).subscribe(resp => {
        this.dialogRef.close();
        this.snackBar.open('added to collaborator', 'ok', { duration: 2000 });
      }
      );
    }, error => {
      this.snackBar.open('email not present or collaborator already present', 'error', { duration: 2000 });
    });

  }


  removeCollaborator(collabUser) {
    this.noteService.removeCollaborator(this.note.noteId, collabUser.id).subscribe(resp => {
      console.log(resp);
      this.snackBar.open('Collaborator removed', 'OK', { duration: 2000 });
      this.dialogRef.close();
    }, error =>
        this.snackBar.open('Collaborator cannot be removed', 'ERROR', { duration: 2000 })
    );
  }

  getCollaborateUser() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.note.collaborators.length; i++) {
      // tslint:disable-next-line: no-var-keyword
      var k = 0;
      console.log(this.note.collaborators[i].userId);
      this.userService.getCollaborateUser(this.note.collaborators[i].userId).subscribe(
        user => {
          this.collabUsers[k] = user;
          k++;
        }
        , error => console.log(error));
    }
  }

  closeClick() {
    this.dialogRef.close();
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
    }, () => {
      this.snackBar.open('error to download image', 'error', { duration: 2000 });
    }
    );
  }
}
