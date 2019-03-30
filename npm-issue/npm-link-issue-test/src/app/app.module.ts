import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { DataTableModule } from 'ng2-datatable-bootstrap4';
import {DataTablesModule} from "angular-datatables";

import { DataTableDemo1 } from './demo1/data-table-demo1';

@NgModule({
  declarations: [
    AppComponent, DataTableDemo1
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    DataTablesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
