import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Category } from '../shared/interfaces/category.interface';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  private apiUrl = 'https://a88f-35-199-27-35.ngrok-free.app/predict';
  fetchCategories(): Observable<any> {
    return this.http.get<Category[]>(APP_CONSTANTS.BACKEND_URL + 'categories');
  }
  addBudget(budget: any): Observable<any> {
    return this.http.post(APP_CONSTANTS.BACKEND_URL + 'add-budget', budget);
  }
  getBudgets(userId: any): Observable<any> {
    console.log(APP_CONSTANTS.BACKEND_URL + 'budget/' + userId);
    return this.http.get(APP_CONSTANTS.BACKEND_URL + 'budget/' + userId);
  }
  getSingleBudget(slug: string): Observable<any> {
    return this.http.get(APP_CONSTANTS.BACKEND_URL + 'view-budget/' + slug);
  }
  updateBudgetAmount(amount: number, slug: any): Observable<any> {
    console.log({ amount: amount, slug: slug });
    return this.http.post(APP_CONSTANTS.BACKEND_URL + 'update-budget-amount', {
      amount: amount,
      slug: slug,
    });
  }
  viewSingleBudgetTrack(budgetId:any):Observable<any>{
    return this.http.get(APP_CONSTANTS.BACKEND_URL + 'view-single-budget-track/' + budgetId);
  }
  getPrediction(requestBody: { monthly_salary: number; goal_amount: number; years_to_achieve: number }): Observable<any> {
    // Ensure numbers are valid
    const parsedRequestBody = {
      monthly_salary: Number(requestBody.monthly_salary),
      goal_amount: Number(requestBody.goal_amount),
      years_to_achieve: Number(requestBody.years_to_achieve),
    };
  
    if (isNaN(parsedRequestBody.monthly_salary) || isNaN(parsedRequestBody.goal_amount) || isNaN(parsedRequestBody.years_to_achieve)) {
      console.error("Invalid request parameters:", requestBody);
      throw new Error("Invalid input provided");
    }
  
    return this.http.post<any>(this.apiUrl, parsedRequestBody);
  }  
}
