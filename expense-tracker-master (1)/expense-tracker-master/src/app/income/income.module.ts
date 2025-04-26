import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIncomeComponent } from './add-income/add-income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FetchIncomeComponent } from './fetch-income/fetch-income.component';
import { RemainingAmountComponent } from './remaining-amount/remaining-amount.component';

@NgModule({
  declarations: [AddIncomeComponent, FetchIncomeComponent, RemainingAmountComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,

  ],
  exports: [AddIncomeComponent , FetchIncomeComponent, RemainingAmountComponent],
})
export class IncomeModule {}
