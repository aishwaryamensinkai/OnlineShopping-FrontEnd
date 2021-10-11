import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: any = [];
  total: number = 0;
  cartNumber: number = 0;
  isVisible: boolean = false;
  orderTotal: any;

  constructor(private service: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.cartDetails();
    this.loadTotal();
  }
  homePage() {
    this.router.navigate(['../dashboard']);
  }

  cartNumberFunction() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '{}');
    this.cartNumber = cartValue.length;
    this.service.cartSubject.next(this.cartNumber);
  }

  cartDetails() {
    if (localStorage.getItem('localCart')) {
      this.cartList = JSON.parse(localStorage.getItem('localCart') || '{}');
    }
  }

  removeFromCart(productId: number) {
    if (localStorage.getItem('localCart')) {
      this.cartList = JSON.parse(localStorage.getItem('localCart') || '{}');
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].productId === productId) {
          this.cartList.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.cartList));
          this.loadTotal();
          this.cartNumberFunction();
          if (this.isVisible) {
            return;
          }
          this.isVisible = true;
          setTimeout(() => this.isVisible = false, 1000);
        }
      }
    }
  }

  increaseQuantity(productId: any, quantity: any) {
    for (let i = 0; i < this.cartList.length; i++) {
      if (this.cartList[i].productId === productId) {
        if (quantity != 12)
          this.cartList[i].quantity = parseInt(quantity) + 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.cartList));
    this.loadTotal();
  }

  decreaseQuantity(productId: any, quantity: any) {
    for (let i = 0; i < this.cartList.length; i++) {
      if (this.cartList[i].productId === productId) {
        if (quantity != 1)
          this.cartList[i].quantity = parseInt(quantity) - 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.cartList));
    this.loadTotal();
  }

  loadTotal() {
    if (localStorage.getItem('localCart')) {
      this.cartList = JSON.parse(localStorage.getItem('localCart') || '{}');
      this.total = this.cartList.reduce((acc: number, val: { price: number; quantity: number; }) => {
        this.orderTotal = acc + (val.price * val.quantity);
        return acc + (val.price * val.quantity);
      }, 0);
    }
  }

  checkout() {
    localStorage.setItem("OrderTotal", this.orderTotal);
    this.router.navigate(['/address']);
  }
}
