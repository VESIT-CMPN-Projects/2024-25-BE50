import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { BudgetModule } from './budget/budget.module';
import { NotesModule } from './notes/notes.module';
import { IncomeModule } from './income/income.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ExpenseModule,
    AuthModule,
    SharedModule,
    HomeModule,
    BudgetModule,
    NotesModule,
    IncomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
