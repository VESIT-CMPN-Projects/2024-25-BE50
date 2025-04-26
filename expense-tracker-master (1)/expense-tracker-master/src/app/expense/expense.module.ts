import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FetchExpenseComponent } from './fetch-expense/fetch-expense.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { SingleExpenseComponent } from './single-expense/single-expense.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { SharedModule } from '../shared/shared.module';
import { TotalExpenseComponent } from './total-expense/total-expense.component';
import { AddReceiptComponent } from './add-receipt/add-receipt.component';
import { IncomeModule } from '../income/income.module';
import { SplitExpenseComponent } from './split-expense/split-expense.component';

@NgModule({
  declarations: [AddExpenseComponent, FetchExpenseComponent, SingleExpenseComponent, BulkUploadComponent, TotalExpenseComponent, AddReceiptComponent, SplitExpenseComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, AppRoutingModule , RouterModule , SharedModule, IncomeModule ],
  exports: [AddExpenseComponent, FetchExpenseComponent , SingleExpenseComponent , BulkUploadComponent,TotalExpenseComponent,AddReceiptComponent,SplitExpenseComponent],
})
export class ExpenseModule {}
