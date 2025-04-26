import { Component, Input } from '@angular/core';
import { EditorConfig, ST_BUTTONS } from 'ngx-simple-text-editor';
import { NotesService } from '../notes.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css'],
})
export class AddNotesComponent {
  constructor(
    private notesService: NotesService,
    private cookieService: CookieService
  ) {}
  content = '';
  title = '';
  config2: EditorConfig = {
    placeholder: 'enter your title...',
  };
  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: ST_BUTTONS,
  };
  userId = this.cookieService.get('userId');
  addNote(): void {
    console.log(this.content);
    this.notesService
      .addNote({
        note_description: this.content,
        user_id: this.userId,
        note_title: this.title,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
