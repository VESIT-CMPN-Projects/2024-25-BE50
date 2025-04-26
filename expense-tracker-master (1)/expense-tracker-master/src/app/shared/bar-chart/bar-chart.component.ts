import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BudgetService } from 'src/app/budget/budget.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  budget: any;
  public options: any;
  constructor(
    private budgetService: BudgetService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.getData()
  }
  getData(): any {
    this.budgetService
      .getBudgets(this.cookieService.get('userId'))
      .subscribe((data) => {
        console.log(data);
        this.budget = data;
        console.log(this.budget );
        this.drawBarCharts()
      });
    return this.budget;
  }
  drawBarCharts() {
    this.options = {
      title: {
        text: "Budget Category and Percentage Achieved out of 100",
      },
      data: this.budget,
      series: [
        {
          type: 'bar',
          xKey: 'budget_name',
          yKey: 'percent_achieved',
          yName: 'target_achieved',
          stacked: true,
          // normalizedTo: 100 
        },
        
        
      ],

    };
  }
}
