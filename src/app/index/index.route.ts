import { Route } from "@angular/router";
import { LoginGuard } from "../gaurds/login.guard";
import { IndexComponent } from "./index.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

export const IndexRoute: Route[] = [
    {
        path: '',
        component: IndexComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent
            }, {
                path: 'signup',
                component: SignupComponent
            }
        ]
    }
];
