import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Expense from 'src/app/shared/interfaces/expense.interface';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
  expenseForm!: FormGroup;
  categoryData!: Category[];
  selectedCategory!: string | null;
  selectedIncomeExpense!: string|null;
  predictionResults: any = null;
  constructor(
    private expenseService: ExpenseService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createForm();

    this.expenseService.fetchCategories().subscribe((data) => {
      this.categoryData = data;
      console.log(data);
    });
  }
  selectCategory(category: Category) {
    this.selectedCategory = category.category_name;
    console.log(this.selectedCategory);
    this.expenseForm.patchValue({
      categoryNameID: category.category_id.toString(),
    });
    console.log(typeof category.category_id);
    // change type to string
  }


  createForm(): void {
    this.expenseForm = new FormGroup({
      userId: new FormControl(this.cookieService.get('userId')),
      income_Expense: new FormControl(),
      expenseName: new FormControl(),
      expenseAmount: new FormControl(),
      expenseDescription: new FormControl(),
      expenseDate: new FormControl(),
      tags: new FormControl(),
      categoryNameID: new FormControl(),
      goalAmount: new FormControl()
    });
  }
  submitForm() {
    console.log(this.expenseForm.value);
    this.expenseService.addExpense(this.expenseForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/expense']);
      },
      error: (error) => {
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
