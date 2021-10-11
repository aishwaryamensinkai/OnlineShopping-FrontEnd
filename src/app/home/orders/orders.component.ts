import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { AddressService } from 'src/app/services/address.service';
import { OrderService } from 'src/app/services/order.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  userId: any;
  isVisible: boolean = false;
  order = new Order();
  orderList: any = [];
  tempArray: any;
  orderObj: any = [];
  arraylist: any = [];
  productArray: any = [];
  userObj: any

  constructor(private orderService: OrderService,
    private registrationService: RegistrationService,
    private addressService: AddressService) { }

  ngOnInit(): void {
    this.getAlltheOrders();
  }

  deleteOrder(orderId: number, idx: number) {
    this.orderService.deleteOrderById(orderId).subscribe((data) => {
      console.log(data);
      this.orderList.splice(idx, 1);
    });
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 1000);
  }

  async getAlltheOrders() {
    this.userId = localStorage.getItem("userId");
    let id = parseInt(this.userId);
    this.registrationService.getUserDetailsById(this.userId).subscribe(async (details) => {
      this.userObj = await details;
    });
    this.orderService.getAllOrders().subscribe(async (data) => {
      this.tempArray = await data;
      this.tempArray.forEach((order: { userId: any; addressId: number; productId: number[] }) => {
        if (order.userId == this.userId) {
          this.addressService.getAddressById(order.addressId).subscribe(async (data1) => {
            this.orderObj = { ...await this.userObj, ...order, ...data1 };
            this.orderList.push(this.orderObj);
          });
        }
      });
      // console.log(this.orderList)
    });
  }

}
