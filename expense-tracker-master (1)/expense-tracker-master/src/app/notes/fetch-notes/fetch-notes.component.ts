import { Component } from '@angular/core';
import { NotesService } from '../notes.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fetch-notes',
  templateUrl: './fetch-notes.component.html',
  styleUrls: ['./fetch-notes.component.css'],
})
export class FetchNotesComponent {
  constructor(
    private notesService: NotesService,
    private cookieService: CookieService,
    private activatedRoute : ActivatedRoute
  ) {}
  notes: any;
  title!: HTMLElement | null;
  description!: HTMLElement | null;
noteId : any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.noteId = params['noteId'];
this,this.getNotes(this.noteId)
    });

  }
  showNotes() {
    this.title = document.getElementById('title');
    if (this.title) this.title.innerHTML = this.notes.note_title;
    this.description = document.getElementById('description');
    if (this.description)
      this.description.innerHTML = this.notes.note_description;
  }
  getNotes(noteId:any) {
    this.notesService.getNote(noteId).subscribe((res) => {
      this.notes = res;
      console.log(this.notes);

      this.showNotes();
    });
  }
}
