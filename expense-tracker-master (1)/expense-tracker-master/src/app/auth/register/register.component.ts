import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  incomeData!:any
  selectedIncome!:any;

  ngOnInit(): void {
    this.createForm();
    this.fetchIncomeTypes();
  }
  fetchIncomeTypes(): void {
    this.authService.fetchIncomeTypes().subscribe((res) => {
      console.log(res);
      this.incomeData = res;
    }), (err:any)=>{console.log(err)};
  }
  selectIncome(income:any) {
    this.selectedIncome = income.income_type_name;
    console.log(this.selectedIncome);
    this.registerForm.patchValue({
      incomeType: income.income_type_id,
    });
  }
  createForm(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      mobile: new FormControl(),
      incomeType:new FormControl(),
      email: new FormControl(),
      fullname: new FormControl(),
      dob : new FormControl(),
    });
  }
  constructor(private authService: AuthService, private router: Router) {}
  submit(): void {
    let registeredOrNot!: boolean; // Declare the variable
    console.log(this.registerForm.value);
    this.authService.registerUser(this.registerForm.value).subscribe((res) => {
      console.log(res);
      if(res.status === "successful"){
        this.router.navigate(['/login']);
      } else {
        alert(
          'Oops! Something went wrong. Please try again. Maybe u r already registered try logging in '
        );
      }
      
    });
   
  }
}
