import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { SharedModule } from '../shared/shared.module';
import { ExpenseModule } from '../expense/expense.module';
import { CookieService } from 'ngx-cookie-service';
import { IncomeModule } from '../income/income.module';
import { InsightsComponent } from './insights/insights.component';



@NgModule({
  declarations: [
    HeroComponent,
    InsightsComponent
  ],
  imports: [
    CommonModule, 
    AppRoutingModule,
    RouterModule,
    SharedModule,
    ExpenseModule,
    IncomeModule
  ],
  exports:[
    HeroComponent,InsightsComponent
  ]
})
export class HomeModule { }
