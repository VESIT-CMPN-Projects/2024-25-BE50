import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { BudgetComponent } from './budget/budget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SingleBudgetComponent } from './single-budget/single-budget.component';
import { AgChartsAngular } from 'ag-charts-angular';
import { IncomeModule } from '../income/income.module';
import { GoalAmountComponent } from './goal-amount/goal-amount.component';

@NgModule({
  declarations: [AddBudgetComponent, BudgetComponent, SingleBudgetComponent, GoalAmountComponent],
  imports: [
  
    CommonModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    AgChartsAngular,
    ReactiveFormsModule,
    IncomeModule
  ],
  exports: [AddBudgetComponent, BudgetComponent],
})
export class BudgetModule {}
