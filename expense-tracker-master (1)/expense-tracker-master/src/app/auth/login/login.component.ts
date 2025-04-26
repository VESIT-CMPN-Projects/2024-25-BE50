import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.createForm();
    // console.log(
    //   this.activatedRoute.url.subscribe((val) => {
    //     console.log(val[0].path);
    //     this.auth.isLoginPage = val[0].path;
    //   })

    // );
  }

  createForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  submit(): void {
    console.log(this.loginForm.value);
    this.authService.loginUser(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      if (res.validYN === 1) {
        this.cookieService.set('username', res.username);
        this.cookieService.set('userId', res.user_id);
        this.cookieService.set('token', res.token);
        this.cookieService.set('isLoggedIn', '1');
        this.authService.isLoggedIn = true;
        console.log(this.authService.isLoggedIn);

        alert('Login Success');
        this.router.navigate(['/home']);
      } else {
        alert('Login Failed');
      }
    });
  }
}
