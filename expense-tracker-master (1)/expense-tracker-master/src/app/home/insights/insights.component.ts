import { Component } from '@angular/core';
import { TotalExpenseComponent } from 'src/app/expense/total-expense/total-expense.component';
import { FetchIncomeComponent } from 'src/app/income/fetch-income/fetch-income.component';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css'],
})
export class InsightsComponent {
  constructor(
  
  ) {}
  results!: number;
  incomeX!:any
  ngOnInit() {
    console.log(this.incomeX);
    
  }
}
