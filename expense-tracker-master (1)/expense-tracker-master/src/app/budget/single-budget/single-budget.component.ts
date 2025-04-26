import { Component, Input, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { ActivatedRoute } from '@angular/router';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions, AgCharts } from 'ag-charts-community';

@Component({
  selector: 'app-single-budget',
  templateUrl: './single-budget.component.html',
  styleUrls: ['./single-budget.component.css'],
})
export class SingleBudgetComponent implements OnInit {
  slug!: string;
  budget: any;
  showAmountInput: boolean = false;
  amountSaved: number = 0;
  budgetId: any;
  singleBudgetData!: any;
  constructor(
    private budgetService: BudgetService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Lifecycle hook called after component initialized
    console.log('Single Budget Component Initialized');
    // Retrieve slug from route parameters and fetch single budget
    this.activatedRoute.params.subscribe((params) => {
      this.slug = params['slug'];
      console.log('Slug:', this.slug);
      this.getSingleBudget(this.slug);
    });
  }


  // Function to fetch single budget
  getSingleBudget(slug: string): void {
    this.budgetService.getSingleBudget(slug).subscribe((data) => {
      console.log('Single Budget Data:', data);
      this.budget = data;
      this.budgetId = data.budget_id;
      console.log(this.budgetId);
      this.budgetSingleTrack();
    });
  }

  // Function to toggle amount input field visibility
  toggleAmountInput(): void {
    this.showAmountInput = !this.showAmountInput;
  }

  // Function to save entered amount
  saveAmount(): void {
    console.log('Amount Saved:', this.amountSaved);
    // You can also reset the input and hide it after saving
    console.log('Amount Saved:', this.amountSaved);
    this.showAmountInput = false;
    // Call function to update budget amount
    this.enterAmountSaved(this.amountSaved);
  }

  // Function to update budget amount
  enterAmountSaved(amount: number): void {
    console.log('Entered Amount:', amount);

    this.budgetService
      .updateBudgetAmount(amount, this.budget.slug)
      .subscribe((data) => {
        console.log('Updated Budget:', data);
      });
  }
  budgetSingleTrack() {
    this.budgetService
      .viewSingleBudgetTrack(this.budgetId)
      .subscribe((data) => {
        console.log('Single Budget Track Data:', data);
        // this.displayBudgetInLineChart(data);
        this.singleBudgetData = data;
        this.displayBudgetInLineChart(this.singleBudgetData);
      });
  }
  options!: AgChartOptions;
  displayBudgetInLineChart(singleBudgetData: any) {
    this.options = {
      title: {
        text: 'Single Budget Track',
      },
      data: singleBudgetData,
      series: [
        {
          type: 'line',
          xKey: 'updated_date',
          yKey: 'updated_amount',
          yName: 'updated_amount',
        },
        
      ],
    };
  }
}
