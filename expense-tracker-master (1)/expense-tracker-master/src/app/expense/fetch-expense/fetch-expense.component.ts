import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import Expense from 'src/app/shared/interfaces/expense.interface';

@Component({
  selector: 'app-fetch-expense',
  templateUrl: './fetch-expense.component.html',
  styleUrls: ['./fetch-expense.component.css'],
})
export class FetchExpenseComponent {
  predictionResults: any = null;
  expense!: Expense;
  expenses!: Expense[];
  pageSize = 5;
  page = 1;
  expensesCategory: any;
  userId!: string;
  expense_name: string = 'expense_name';
  expense_amount: string = 'expense_amount';
  category_name: string = 'category_name';
  total_sum = 'total_sum';

  constructor(
    private activatedRoute: ActivatedRoute,
    private expenseService: ExpenseService,
    private cookieService: CookieService
  ) {
    // console.log(this.userId);
    // this.activatedRoute.params.subscribe((params) => {
    //   this.userId = params['userId'];
    //   console.log(this.userId);
    // });
  }
  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    console.log('fetch expense component');
    this.getExpenses();
  }
  getExpenses(): any {
    this.expenseService.getExpenses(this.userId).subscribe((data) => {
      console.log(data);
      console.log(this.userId);
      this.expenses = data;
    });
    this.expenseService
      .getExpensesCategoryWise(this.userId)
      .subscribe((data) => {
        console.log(data);
        console.log(this.userId);
        this.expensesCategory = data;
      });
  }
}
