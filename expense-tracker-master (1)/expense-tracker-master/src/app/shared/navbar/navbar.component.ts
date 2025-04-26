import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  isLoggedIn() {
    return this.authService.isLoggedIn;}
  logout() {
    this.cookieService.deleteAll();
    this.authService.isLoggedIn = false;
  }
  open(content: any) {
    this.modalService.open(content);
  }
  isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

closeDropdown() {
  this.isDropdownOpen = false;
}


}
