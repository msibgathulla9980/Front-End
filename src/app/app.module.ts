import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { NoteBodyComponent } from './component/notebody/notebody.component';
import { HomePageComponent } from './component/homepage/homepage.component';
import { ForgotPasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './component/resetpassword/resetpassword.component';
import { MainNoteComponent } from './component/main-note/main-note.component';
import { UpdateNoteComponent } from './component/updatenote/updatenote.component';
import { ArchivenotesComponent } from './component/archivenotes/archivenotes.component';
import { RetainNavbarComponent } from './component/retain-navbar/retain-navbar.component';
import { TrashNotesComponent } from './component//trash-notes/trash-notes.component';
import { UpdateLabelComponent } from './component/update-label/update-label.component';
import { CreateLabelsComponent } from './component/create-labels/create-labels.component';
import { EditLabelsComponent } from './component/edit-labels/edit-labels.component';
import { PinNoteComponent } from './component/pin-note/pin-note.component';
import { FilterNotePipe } from '../app/pipe/note-filter.pipe';
import { AddLabelNoteComponent } from './component/add-label-note/add-label-note.component';
import { SearchPipe } from './pipe/search-pipe';
import { NoteSearchPipe } from '../app/pipe/note-search.pipe';
import { SearchNotesComponent } from './component/search-notes/search-notes.component';
import { ImageComponent } from './component/image/image.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { ColorPickerComponent } from './component/color-picker/color-picker.component';
import { SearchUserPipe } from './pipe/search-user.pipe';
import { ReminderComponent } from './component/reminder/reminder.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomePageComponent,
    NoteBodyComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    MainNoteComponent,
    UpdateNoteComponent,
     ArchivenotesComponent,
     RetainNavbarComponent,
     TrashNotesComponent,
     UpdateLabelComponent,
     CreateLabelsComponent,
     EditLabelsComponent,
    PinNoteComponent,
    FilterNotePipe,
    AddLabelNoteComponent,
    SearchPipe,
    NoteSearchPipe,
    SearchNotesComponent,
    ImageComponent,
    CollaboratorComponent,
    ColorPickerComponent,
    SearchUserPipe,
    ReminderComponent    // DataService
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
