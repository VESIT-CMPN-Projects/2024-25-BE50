import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../budget.service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { formatPrefix } from 'd3';

@Component({
  selector: 'app-goal-amount',
  templateUrl: './goal-amount.component.html',
  styleUrls: ['./goal-amount.component.css']
})
export class GoalAmountComponent {
  expenseForm!: FormGroup;
    predictionResults: any = null;
    constructor(
      private budgetService: BudgetService,
      private cookieService: CookieService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.createForm();
    }

    createForm(): void {
      this.expenseForm = new FormGroup({
        monthly_salary:new FormControl(),
        goalAmount: new FormControl(),
        years_to_achieve:new FormControl()
      });
    }


    giveResult() {
      const monthly_salary=Number(this.expenseForm.value.monthly_salary);
      const goalAmount = Number(this.expenseForm.value.goalAmount);
      const years_to_achieve = Number(this.expenseForm.value.years_to_achieve);
      
      if (isNaN(monthly_salary)) {
        console.error("Invalid monthly salary:", this.expenseForm.value.monthly_salary);
        return;
      }
      if (isNaN(goalAmount)) {
        console.error("Invalid goal amount:", this.expenseForm.value.goalAmount);
        return;
      }
      if (isNaN(years_to_achieve)) {
        console.error("Invalid years:", this.expenseForm.value.years_to_achieve);
        return;
      }
    
      const requestBody = {
        monthly_salary: Number(this.expenseForm.value.monthly_salary),
        goal_amount: Number(this.expenseForm.value.goalAmount),
        years_to_achieve: Number(this.expenseForm.value.years_to_achieve)
      }; 
    
      this.budgetService.getPrediction(requestBody).subscribe({
        next: (data:any) => {
          this.predictionResults = data;
        },
        error: (error:any) => {
          console.error("Prediction error:", error);
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          if (error.status === 500) {
            this.router.navigate(['/contact-us']);
          }
        },
      });
    }  
}


