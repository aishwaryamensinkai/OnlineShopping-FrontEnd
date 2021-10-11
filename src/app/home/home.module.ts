import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AddressComponent,
    CartComponent,
    OrderTrackingComponent,
    PaymentComponent,
    DashboardComponent,
    OrdersComponent,
    SearchFilterPipe,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
