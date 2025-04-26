import { Component, Injectable, Output } from '@angular/core';
import { IncomeService } from '../income.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-fetch-income',
  templateUrl: './fetch-income.component.html',
  styleUrls: ['./fetch-income.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class FetchIncomeComponent {
constructor(private incomeService : IncomeService , private cookieService : CookieService){
}
income !:any;
  ngOnInit(){

    this.getTotalMonthlyIncome();
  }
  userId = this.cookieService.get("userId");
  getTotalMonthlyIncome(){
    this.incomeService.getTotalMonthlyIncome(this.userId).subscribe((res)=>{
      console.log(res);
      this.income = res.total_income
    }), (err:any)=>{console.log(err)
  }
}

}
