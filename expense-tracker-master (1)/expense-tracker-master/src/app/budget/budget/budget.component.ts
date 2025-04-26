import { Component } from '@angular/core';
import { BudgetService } from '../budget.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent {
  userId!: string | null;
  budgetList!: any;
  constructor(
    private budgetService: BudgetService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.getBudgets();
  }
  getBudgets() {
    this.budgetService.getBudgets(this.userId).subscribe((data) => {
      console.log(data);
      this.budgetList = data;
    });
  }
}
