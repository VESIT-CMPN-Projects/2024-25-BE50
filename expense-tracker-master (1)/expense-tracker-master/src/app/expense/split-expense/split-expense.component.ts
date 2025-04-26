import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-split-expense',
  templateUrl: './split-expense.component.html',
  styleUrls: ['./split-expense.component.css']
})
export class SplitExpenseComponent implements OnInit {
  splitExpenseForm!: FormGroup;
  categoryData!: Category[];
  selectedCategory!: string | null;
  numberOfPeople: number = 0; // Default to 1
  userShare: number = 0;

  constructor(private expenseService: ExpenseService, private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.createForm();
    this.expenseService.fetchCategories().subscribe((data) => {
      this.categoryData = data;
      console.log(data);
    });
  }

  selectCategory(category: Category) {
    this.selectedCategory = category.category_name;
    console.log("Selected Category:", this.selectedCategory);
  
    // Ensure categoryNameID is set correctly
    this.splitExpenseForm.patchValue({
      categoryNameID: category.category_id.toString(),
    });
  
    // Debugging logs
    console.log("Category ID in Form:", this.splitExpenseForm.value.categoryNameID);
    console.log("Category ID Type:", typeof this.splitExpenseForm.value.categoryNameID);
  }
  


  createForm(): void {
    this.splitExpenseForm = new FormGroup({
      userId: new FormControl(this.cookieService.get('userId')),
      income_Expense: new FormControl("Expense"), // Default set correctly
      expenseName: new FormControl('', Validators.required),
      expenseAmount: new FormControl('', Validators.required),
      expenseDescription: new FormControl(),
      expenseDate: new FormControl(),
      categoryNameID: new FormControl(),
      tags: new FormControl(),
      numberOfPeople: new FormControl(1, Validators.required), // Default set to 1
    });
  }

  updateUserShare(): void {
    const totalAmount = this.splitExpenseForm.value.expenseAmount || 0;
    const numPeople = this.splitExpenseForm.value.numberOfPeople || 1;
    this.userShare = Math.round(totalAmount / numPeople); // Ensure integer
    console.log("Total Amount:", totalAmount, "Number of People:", numPeople, "User Share:", this.userShare);
  }

  submitForm() {
    const expenseData = {
      userId: this.splitExpenseForm.value.userId,
      income_Expense: "Expense",
      expenseName: this.splitExpenseForm.value.expenseName,
      expenseAmount: this.userShare, // Save only user's share
      expenseDescription: this.splitExpenseForm.value.expenseDescription,
      expenseDate: this.splitExpenseForm.value.expenseDate,
      categoryNameID: this.splitExpenseForm.value.categoryNameID,
      tags: this.splitExpenseForm.value.tags,
    };
    
    //  expenseData.categoryNameID = Number(expenseData.categoryNameID);
    console.log("Submitting Expense Data:", expenseData);
    console.log("Category ID Type:", typeof expenseData.categoryNameID); 
    this.expenseService.addExpense(expenseData).subscribe({
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
