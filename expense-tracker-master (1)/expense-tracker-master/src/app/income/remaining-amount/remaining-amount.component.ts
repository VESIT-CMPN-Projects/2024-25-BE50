import { Component } from '@angular/core';
import { IncomeService } from '../income.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-remaining-amount',
  templateUrl: './remaining-amount.component.html',
  styleUrls: ['./remaining-amount.component.css']
})
export class RemainingAmountComponent {

  constructor(private incomeService : IncomeService , private cookieService : CookieService){
  }
  amount !:any;

  ngOnInit(){
    this.getRemainingAmount();
  }
    userId = this.cookieService.get("userId");
    getRemainingAmount(){
      this.incomeService.getRemainingAmount(this.userId).subscribe((res)=>{
        console.log(res);
        console.log("console :"+this.userId)

        this.amount = res.remaining_amount
        console.log("amount:"+this.amount)
      }), (err:any)=>{console.log(err)
    }
  }

}
