import { Route } from "@angular/router";
import { HomeRoute } from "./home/home.route";
import { IndexRoute } from "./index/index.route";

export const routes: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    ...IndexRoute, ...HomeRoute
];
