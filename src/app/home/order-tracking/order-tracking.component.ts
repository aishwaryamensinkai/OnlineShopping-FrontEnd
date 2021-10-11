import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { OrderService } from 'src/app/services/order.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  popup: boolean = false;
  cartItem: number = 0;
  orderid: any;
  orderDetails: any;
  addressid: any;
  addressDetails: any;
  orderTotal!: number;
  shipping = 100;
  final!: number;
  taxAmt!: number;
  orderId!: number;
  orderObj!: Object;

  public counts = ["Processed", "Shipped", "Enroute", "Arrived"];
  public orderStatus: any = "Processed";
  total!: any;

  constructor(public router: Router,
    public registrationService: RegistrationService,
    private orderService: OrderService,
    private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.getOrderDetails();
    this.getAddressDetails();
    this.getOrderTotal();
    this.changeOrderStatus();
  }

  changeOrderStatus() {
    setTimeout(() => this.updateOrderStatus(this.counts[1]), 1000 * 20);
    setTimeout(() => this.updateOrderStatus(this.counts[2]), 1000 * 40);
    setTimeout(() => this.updateOrderStatus(this.counts[3]), 1000 * 60);
  }

  updateOrderStatus(value: any) {
    this.orderStatus = value;
    this.orderid = localStorage.getItem("orderId");
    this.orderId = parseInt(this.orderid);
    this.orderService.getOrderOfOrderById(this.orderId).subscribe(async (data) => {
      this.orderDetails = await data;
      if (this.orderDetails.orderStatus != "Arrived") {
        this.orderObj = {
          orderId: this.orderDetails.orderId,
          addressId: this.orderDetails.addressId,
          userId: this.orderDetails.userId,
          productId: this.orderDetails.productId,
          noOfProducts: this.orderDetails.noOfProducts,
          orderStatus: this.orderStatus
        }
      }
      else {
        this.orderObj = {
          orderId: this.orderDetails.orderId,
          addressId: this.orderDetails.addressId,
          userId: this.orderDetails.userId,
          productId: this.orderDetails.productId,
          noOfProducts: this.orderDetails.noOfProducts,
          orderStatus: this.orderDetails.orderStatus
        }
      }
      this.orderService.updateOrder(this.orderId, this.orderObj).subscribe((response) => { });
    });
  }

  getOrderTotal() {
    this.total = localStorage.getItem("OrderTotal");
    this.orderTotal = parseInt(this.total);
    this.taxAmt = this.orderTotal * 0.1;
    this.final = this.orderTotal + this.shipping + this.taxAmt;
  }

  getAddressDetails() {
    this.addressid = localStorage.getItem("addressId");
    const addressId = parseInt(this.addressid);
    this.addressService.getAddressById(addressId).subscribe(async (data) => {
      this.addressDetails = await data;
    })
  }

  getOrderDetails() {
    this.orderid = localStorage.getItem("orderId");
    this.orderId = parseInt(this.orderid);
    this.orderService.getOrderOfOrderById(this.orderId).subscribe(async (data) => {
      this.orderDetails = await data;
      this.orderObj = {
        orderId: this.orderDetails.orderId,
        addressId: this.orderDetails.addressId,
        userId: this.orderDetails.userId,
        productId: this.orderDetails.productId,
        noOfProducts: this.orderDetails.noOfProducts,
        orderStatus: this.orderDetails.orderStatus
      }
    });
  }
}
