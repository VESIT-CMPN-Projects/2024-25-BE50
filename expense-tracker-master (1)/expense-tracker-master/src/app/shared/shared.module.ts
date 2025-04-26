import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { AgChartsAngular, AgChartsAngularModule } from 'ag-charts-angular';
import { SuccessComponent } from './success/success.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BudgetModule } from '../budget/budget.module';
import { IncomeModule } from '../income/income.module';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ContactUsComponent,
    ChartComponent,
    SuccessComponent,
    NotFoundComponent,
    BarChartComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    AgChartsAngularModule,
    IncomeModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ContactUsComponent,
    ChartComponent,
    SuccessComponent,
    NotFoundComponent,
    BarChartComponent,
  ],
})
export class SharedModule {}
