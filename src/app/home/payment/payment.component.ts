import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalAmt!: any;
  cartItem: number = 0;
  userId!: any;
  addressId!: any;
  productIds!: any;
  localcart: any;
  orderObj: any;
  constructor(private router: Router,
    private registrationService: RegistrationService,
    private orderService: OrderService) {
    this.totalAmt = localStorage.getItem("OrderTotal");
  }
  ngOnInit(): void {
    // this.saveOrder();
  }
  placeOrder() {
    this.saveOrder();
    this.router.navigate(['../ordertracking']);
    this.cartNumberMethod();
    localStorage.removeItem("localCart");
  }
  cartNumberMethod() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '{}');
    this.registrationService.cartSubject.next(this.cartItem);
  }
  saveOrder() {
    this.userId = localStorage.getItem("userId");
    this.addressId = localStorage.getItem("addressId");
    this.localcart = JSON.parse(localStorage.getItem('localCart') || '{}')
    this.productIds = this.localcart.map((productid: { productId: any; }) => productid.productId);
    let value = "Processed";
    this.orderObj = {
      addressId: this.addressId,
      userId: this.userId,
      noOfProducts: this.localcart.length,
      orderStatus: value,
      productId: this.productIds
    }
    this.orderService.saveOrderTodb(this.orderObj).subscribe(async (data) => {
      let Data = await data;
      const orderId = data.orderId;
      localStorage.setItem("orderId", orderId);
    });
  }

}
