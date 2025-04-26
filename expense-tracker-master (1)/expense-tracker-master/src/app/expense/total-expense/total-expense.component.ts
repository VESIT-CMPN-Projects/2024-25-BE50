import { Component, Injectable } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-total-expense',
  templateUrl: './total-expense.component.html',
  styleUrls: ['./total-expense.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class TotalExpenseComponent {
  constructor(private expenseService : ExpenseService , private cookieService : CookieService){
  }
  expense !:any;
    ngOnInit(){
  
      this.getTotalMonthlyExpense();
    }
    userId = this.cookieService.get("userId");
    getTotalMonthlyExpense(){
      this.expenseService.getTotalMonthlyExpense(this.userId).subscribe((res)=>{
        console.log(res);
        this.expense = res.total_expense
      }), (err:any)=>{console.log(err)
    }
  
  
  }
}
