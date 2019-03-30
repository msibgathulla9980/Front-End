import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatRippleModule, MatSelectModule, MatInputModule, MatTooltipModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatDividerModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    MatIconModule,
    BrowserAnimationsModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    NgMatSearchBarModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule

  ],

  exports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    NgMatSearchBarModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule

  ]


})
export class AppMaterialModule { }
