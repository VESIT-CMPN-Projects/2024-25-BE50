import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { FetchNotesComponent } from './fetch-notes/fetch-notes.component';

import { NgxSimpleTextEditorModule } from 'ngx-simple-text-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesComponent } from './notes/notes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddNotesComponent, FetchNotesComponent, NotesComponent],
  imports: [
    CommonModule,
    NgxSimpleTextEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
     
  ],
  exports: [AddNotesComponent, FetchNotesComponent, NotesComponent],
})
export class NotesModule {}
