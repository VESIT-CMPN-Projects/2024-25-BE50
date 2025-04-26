import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { FetchExpenseComponent } from './expense/fetch-expense/fetch-expense.component';
import { BulkUploadComponent } from './expense/bulk-upload/bulk-upload.component';
import { ContactUsComponent } from './shared/contact-us/contact-us.component';
import { HeroComponent } from './home/hero/hero.component';
import { AddBudgetComponent } from './budget/add-budget/add-budget.component';
import { BudgetComponent } from './budget/budget/budget.component';
import { SingleBudgetComponent } from './budget/single-budget/single-budget.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SuccessComponent } from './shared/success/success.component';
import { AddNotesComponent } from './notes/add-notes/add-notes.component';
import { FetchNotesComponent } from './notes/fetch-notes/fetch-notes.component';
import { NotesComponent } from './notes/notes/notes.component';
import { AddIncomeComponent } from './income/add-income/add-income.component';
import { AddReceiptComponent } from './expense/add-receipt/add-receipt.component';
import { GoalAmountComponent } from './budget/goal-amount/goal-amount.component';
import { SplitExpenseComponent } from './expense/split-expense/split-expense.component';


const routes: Routes = [
  {
    path: 'add-expense',
    component: AddExpenseComponent,
  },
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'expense',
    component: FetchExpenseComponent,
  },
  {
    path: 'bulk-upload',
    component: BulkUploadComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'home',
    component: HeroComponent,
  },
  {
    path: 'add-budget',
    component: AddBudgetComponent,
  },
  {
    path: 'budget',
    component: BudgetComponent,
  },
  {
    path: 'budget/:slug',
    component: SingleBudgetComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path:'add-note',
    component: AddNotesComponent
  },
  {
    path:'fetch-note/:noteId',
    component:FetchNotesComponent
  }, {
    path: 'notes',
    component:NotesComponent
  },
  {
    path: 'add-receipt',
    component:AddReceiptComponent
  },
  {
    path : 'income',
    component:AddIncomeComponent
  },
  {
    path:'goal-amount',
    component:GoalAmountComponent
  },
  {
    path:'split',
    component:SplitExpenseComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
