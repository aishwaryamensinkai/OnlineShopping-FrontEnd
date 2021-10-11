import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cartItem: number = 0;
  constructor(public router: Router, public registrationService: RegistrationService) {
    registrationService.cartSubject.subscribe((data) => {
      this.cartItem = data;
    });
  }

  ngOnInit(): void {
    this.cartItems();
  }

  cartItems() {
    if (localStorage.getItem('localCart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('localCart') || '{}');
      this.cartItem = cartCount.length;
    }
  }
  async LogoutAction() {
    const data = this.registrationService.logout();
    if (await data)
      this.router.navigate(['/login']);
  }
}
