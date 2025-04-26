import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  addNote(body: any): Observable<any> {
    return this.http.post(APP_CONSTANTS.BACKEND_URL + 'note', body);
  }
  getNote(noteId: any): Observable<any> {
    return this.http.get(
      APP_CONSTANTS.BACKEND_URL +
        'note/' +
        this.cookieService.get('userId') +
        '/' +
        noteId
    );
  }
  getNotes(): Observable<any> {
    return this.http.get(
      APP_CONSTANTS.BACKEND_URL + 'notes/' + this.cookieService.get('userId')
    );
  }
}
