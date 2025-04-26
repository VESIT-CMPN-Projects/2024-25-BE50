import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../shared/constants/app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) {}

  addIncome(incomeData: any): Observable<any> {
    return this.http.post<any>(`${APP_CONSTANTS.BACKEND_URL}add-income`, incomeData);
  }
  getTotalMonthlyIncome(userId:any):Observable<any>{
    return this.http.get(`${APP_CONSTANTS.BACKEND_URL}monthly-total-income/`+userId);
  }
  getRemainingAmount(userId:any):Observable<any>{
    return this.http.get(`${APP_CONSTANTS.BACKEND_URL}remaining-amount/`+userId);
  }
}
