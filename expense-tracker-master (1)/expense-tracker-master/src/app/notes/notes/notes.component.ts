import { Component } from '@angular/core';
import { NotesService } from '../notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes :any 

  constructor(private noteesService : NotesService , private activatedRoute: ActivatedRoute){}
  ngOnInit():void{
 
    console.log('notes component');
    this.getAllNotes();
  }
  getAllNotes():void{
    this.noteesService.getNotes().subscribe((res)=>{
      console.log(res);
      this.notes = res;
      console.log(this.notes);
    });
  }

}
