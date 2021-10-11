import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }
  saveOrderTodb(order: Order) {
    // console.log(user);
    return this.http.post<any>("http://localhost:8000/saveOrder", order);
  }
  getOrderOfOrderById(userId: number) {
    return this.http.get("http://localhost:8000/getOrder/" + userId);
  }
  getAllOrders() {
    return this.http.get("http://localhost:8000/getAllOrders");
  }
  deleteOrderById(orderId: number) {
    return this.http.delete("http://localhost:8000/deleteOrder/" + orderId);
  }
  updateOrder(orderId: number, orderobj: any) {
    return this.http.put("http://localhost:8000/updateOrder/" + orderId, orderobj);
  }
}
