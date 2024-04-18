import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.route';
import { LoginGuard } from './gaurds/login.guard';
import { RegistrationGuard } from './gaurds/registration.guard';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { IndexComponent } from './index/index.component';
import { IndexModule } from './index/index.module';
import { RegistrationService } from './services/registration.service';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    // SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    IndexModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RegistrationGuard, RegistrationService, LoginGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],

  bootstrap: [AppComponent]
})
export class AppModule { }
