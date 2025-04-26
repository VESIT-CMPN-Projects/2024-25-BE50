import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../shared/interfaces/category.interface';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private apiUrl1 = 'https://fcd2-35-194-186-33.ngrok-free.app/extract-expense/';
  fetchCategories(): Observable<any> {
    return this.http.get<Category[]>('http://localhost:8080/api/categories');
  }
  addExpense(expense: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/add-expense', expense);
  }
  
  uploadReceipt(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl1, formData);
  }

  predictExpense(expense:any):Observable<any>{
    return this.http.post('http://localhost:8080/api/predict', expense);
  }

  getExpenses(userId: any): Observable<any> {
    console.log('http://localhost:8080/api/expenses/' + userId);
    return this.http.get('http://localhost:8080/api/expenses/' + userId);
  }
  getExpensesCategoryWise(userId: any): Observable<any> {
    console.log('http://localhost:8080/api/expense-category/' + userId);
    return this.http.get(
      'http://localhost:8080/api/expense-category/' + userId
    );
  }
  getTotalMonthlyExpense(userId: any): Observable<any> {
    return this.http.get(
      'http://localhost:8080/api/monthly-total-expense/' + userId
    );
  }
  // uploadReceipt(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post<any>('http://localhost:8080/api/upload-receipt', formData);
  // }
}
