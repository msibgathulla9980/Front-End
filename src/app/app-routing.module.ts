import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildActivationEnd } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { HomePageComponent } from './component/homepage/homepage.component';
// import { NoteBodyComponent } from './component/notebody/notebody.component';
import { ForgotPasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './component/resetpassword/resetpassword.component';
import { MainNoteComponent } from './component/main-note/main-note.component';
import { UpdateNoteComponent } from './component/updatenote/updatenote.component';
import { ArchivenotesComponent } from './component/archivenotes/archivenotes.component';
import { TrashNotesComponent } from './component/trash-notes/trash-notes.component';
import { AuthGuard } from '../app/guard/auth.guard';
import { UpdateLabelComponent } from './component/update-label/update-label.component';
import { CreateLabelsComponent } from './component/create-labels/create-labels.component';
import { EditLabelsComponent } from './component/edit-labels/edit-labels.component';
import { RetainNavbarComponent } from './component/retain-navbar/retain-navbar.component';
import {SearchNotesComponent} from './component/search-notes/search-notes.component';
import { ImageComponent } from './component/image/image.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { ColorPickerComponent } from './component/color-picker/color-picker.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { NoteWithLabelComponent } from './component/note-with-label/note-with-label.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'registration',
    component: RegistrationComponent
  },

  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },

  // {
  //   path: 'my-component',
  //   component: MyComponentComponent
  // },



  {
    path: 'homepage', component: HomePageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'main-note',
        component: MainNoteComponent
      },
      {
        path: 'updatenote',
        component: UpdateNoteComponent
      },

       {
        path: 'search-notes',
        component: SearchNotesComponent
      },
      {
        path: 'archivenotes',
        component: ArchivenotesComponent
      },

      {
        path: 'trash-notes',
        component: TrashNotesComponent
      },

      {
        path: 'update-label',
        component: UpdateLabelComponent
      },
      {
        path: 'create-labels',
        component: CreateLabelsComponent
      },
      {
        path: 'edit-labels',
        component: EditLabelsComponent
      },

      {
        path: 'retain-navbar',
        component: RetainNavbarComponent
      },

      {
        path: 'image',
        component: ImageComponent
      },

      {
        path: 'collaborator',
        component: CollaboratorComponent
      },

      {
        path: 'color-picker',
        component: ColorPickerComponent
      },

      {
        path: 'app-reminder',
        component: ReminderComponent
      },

      {
        path: 'app-note-with-label/:id',
        component: NoteWithLabelComponent
      },


      {
        path: '',
        redirectTo: 'main-note',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: 'resetpassword/:id',
    component: ResetPasswordComponent
  },

  {
    path: '**',
    redirectTo: 'login'

  }];




@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

