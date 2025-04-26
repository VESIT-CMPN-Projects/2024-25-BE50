import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  expense_name = 'expense_name';
  expense_amount = 'expense_amount';
  category_name = 'category_name';
  total_sum = 'total_sum';
}
