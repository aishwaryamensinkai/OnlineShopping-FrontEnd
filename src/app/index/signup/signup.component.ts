import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = new User();
  message = '';
  constructor(private registrationService: RegistrationService,
    private router: Router) { }

  ngOnInit(): void {
  }
  routerLogin() {
    this.router.navigate(['/login']);
  }

  registerUser() {
    if (Object.keys(this.user).length != 0)
      this.registrationService.registerUserFromRemote(this.user).subscribe(
        (data) => {
          // console.log("Response recieved");
          this.message = "Registration Successful";
          this.router.navigate(['/login']);
        },
        (error) => {
          // console.log("Exception recieved");
          this.message = "Server Error or User with the EmailId ";
        });
    else
      this.message = "Please Enter the details.";
  }
}
