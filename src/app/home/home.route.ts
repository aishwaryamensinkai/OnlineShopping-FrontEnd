import { Route } from "@angular/router";
import { RegistrationGuard } from "../gaurds/registration.guard";
import { AddressComponent } from "./address/address.component";
import { CartComponent } from "./cart/cart.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home.component";
import { OrderTrackingComponent } from "./order-tracking/order-tracking.component";
import { OrdersComponent } from "./orders/orders.component";
import { PaymentComponent } from "./payment/payment.component";
import { ProfileComponent } from "./profile/profile.component";

export const HomeRoute: Route[] = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [RegistrationGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }, {
                path: 'cart',
                component: CartComponent
            }, {
                path: 'address',
                component: AddressComponent
            }, {
                path: 'ordertracking',
                component: OrderTrackingComponent
            }, {
                path: 'payment',
                component: PaymentComponent
            }, {
                path: 'orders',
                component: OrdersComponent
            }, {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    }
];
