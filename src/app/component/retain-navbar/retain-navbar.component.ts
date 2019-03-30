import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditLabelsComponent } from '../../component/edit-labels/edit-labels.component';
import { Subject } from 'rxjs';
import { Label } from '../../../core/model/label/label';
import { NoteService } from '../../../core/service/note.service';

@Component({
  selector: 'app-retain-navbar',
  templateUrl: './retain-navbar.component.html',
  styleUrls: ['./retain-navbar.component.scss']
})
export class RetainNavbarComponent implements OnInit {
  @ViewChild('drawer') public drawer;
  @Input() public toggleSidebar: Subject<any>;
  public labels: Label[] = [];
  constructor(private formBuilder: FormBuilder,
              private noteService: NoteService,
              private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getLabels();
    this.toggleSidebar.subscribe(event => {
        if (this.drawer) {
          this.drawer.toggle();
        }
      });
    }


  archive() {
    this.router.navigate(['homepage/archivenotes']);
}


notes() {
  this.router.navigate(['homepage/main-note']);
  // this.goBack();
}

reminder() {
  this.router.navigate(['homepage/app-reminder']);
  // this.goBack();
}

trashnote() {

  this.router.navigate(['homepage/trash-notes']);
}

logout() {
 // localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

registration() {
  // localStorage.getItem('token');
  this.router.navigate(['/registration']);
}
  // get f() { return this.Form.controls; }

  labelEdit(): void {
    this.getLabels();
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

  public getLabels() {
    this.noteService.retrieveLabels().subscribe(newLabel => {
      this.labels = newLabel;
    }, error => {
      this.snackBar.open('Cannot retrieve labels or labels are empty', 'ERROR', { duration: 2000 });
    }
    );
  }
}
