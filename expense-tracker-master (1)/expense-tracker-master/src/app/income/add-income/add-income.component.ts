import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { IncomeService } from '../income.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AddIncomeComponent {
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private incomeService: IncomeService,
    private cookieService : CookieService,
    private authService : AuthService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
    this.createForm();
    this.fetchIncomeTypes();
  }

  open(content: any) {
    this.modalService.open(content);
  }
  incomeForm!: FormGroup;
  createForm() {
    this.incomeForm = this.fb.group({
      userId: this.cookieService.get("userId"),
      incomeAmount: ['', Validators.required],
    });
  }
  incomeData!:any;
  selectedIncome!:any;
  fetchIncomeTypes(): void {
    this.authService.fetchIncomeTypes().subscribe((res) => {
      console.log(res);
      this.incomeData = res;
    }), (err:any)=>{console.log(err)};
  }
  selectedTypeId!:any
  selectIncome(income:any) {
    console.log(income);
    
    this.selectedIncome = income.income_type_name;
    console.log(this.selectedIncome);
    this.selectedTypeId = income.income_type_id;
  }

  onSubmit(): void {
    if (this.incomeForm.valid) {
      const incomeData = {
        userId: parseInt(this.incomeForm.value.userId, 10),
        incomeAmount: parseInt(this.incomeForm.value.incomeAmount, 10),
        incomeType: this.selectedTypeId
      };
      console.log(incomeData);
      
      this.incomeService.addIncome(incomeData).subscribe(
        (response) => {
          console.log('Income added successfully!', response);
          this.incomeForm.reset();
        },
        (error) => {
          console.error('Error adding income', error);
        }
      );
    }
  }
}
