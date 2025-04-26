import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css'],
})
export class AddBudgetComponent {
  budgetForm!: FormGroup;
  categoryData!: Category[];
  selectedCategory!: string | null;
  constructor(
    private budgetService: BudgetService, // Inject BudgetService
    private cookieService: CookieService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.budgetService.fetchCategories().subscribe((data) => {
      // Use BudgetService to fetch categories
      this.categoryData = data;
      console.log(data);
    });
  }

  selectCategory(category: Category) {
    this.selectedCategory = category.category_name;
    console.log(this.selectedCategory);
    this.budgetForm.patchValue({
      categoryId: category.category_id.toString(),
    });
    console.log(typeof category.category_id);
  }

  createForm(): void {
    this.budgetForm = new FormGroup({
      userId: new FormControl(this.cookieService.get('userId')),
      budgetName: new FormControl('', Validators.required), // Add validators as needed
      budgetDescription: new FormControl(''),
      targetAmount: new FormControl('', Validators.required),
      dateToAchieve: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      tags: new FormControl(''),
    });
  }

  submitBudgetForm() {
    console.log(this.budgetForm.value);
    this.budgetService.addBudget(this.budgetForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['/budget']);
        console.log('Budget added successfully');
      },
      error: (error: any) => {
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
