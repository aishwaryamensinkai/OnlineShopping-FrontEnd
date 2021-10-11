import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  message = '';
  responseData: any;

  constructor(private registrationService: RegistrationService,
    private router: Router) { }

  ngOnInit(): void {
  }
  routerRegister() {
    this.router.navigate(['/signup']);
  }
  loginUser() {
    // console.log(this.user);
    if (Object.keys(this.user).length != 0)
      this.registrationService.loginUserFromRemote(this.user).subscribe(
        (data) => {
          // console.log("Response recieved");
          // console.log(data);
          sessionStorage.setItem('userId', data.id);
          localStorage.setItem('userId', data.id);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // console.log("Exception recieved");
          this.message = "Wrong EmailId and Password.";
        });
    else
      this.message = "Please Enter the details.";

  }
}
