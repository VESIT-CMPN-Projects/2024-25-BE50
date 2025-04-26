import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ExpenseService } from 'src/app/expense/expense.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  expenses: any;
  expensesCategory: any;
  userId!: string;
  expense_name = 'expense_name';
  expense_amount = 'expense_amount';
  category_name = 'category_name';
  total_sum = 'total_sum';

  constructor(
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
      .subscribe((data: any) => {
        console.log(data);
        console.log(this.userId);
        this.expensesCategory = data;
      });
  }
}
