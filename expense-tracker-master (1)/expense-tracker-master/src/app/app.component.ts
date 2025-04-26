import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'expense-tracker';
  constructor(private cookieService: CookieService) {}
  ngOnInit(): void {

  }    
  isLoggedIn(): boolean {
    return this.cookieService.get('isLoggedIn') === '1';
  }
}
