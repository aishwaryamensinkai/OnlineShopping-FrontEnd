import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  userId: any;
  message: String = "";
  private _userform!: UntypedFormGroup;

  public get userform(): UntypedFormGroup {
    return this._userform;
  }
  public set userform(value: UntypedFormGroup) {
    this._userform = value;
  }
  isVisible: boolean = false;


  constructor(private formBuilder: UntypedFormBuilder, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.initForm();
    this.getUserDetails();
  }
  initForm() {
    // this.userform = this.formBuilder.group({
    //   name: new FormControl([this.user ? this.user.name : '']),
    //   emailId: new FormControl([this.user ? this.user.emailId : '']),
    //   password: new FormControl([this.user ? this.user.password : '']),
    //   userName: new FormControl([this.user ? this.user.userName : ''])
    // })
    this.userform = this.formBuilder.group({
      name: new UntypedFormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z\\s]*$')]),
      emailId: new UntypedFormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      userName: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{5,}')])
    })

  }

  getUserDetails() {
    this.userId = localStorage.getItem("userId");
    this.registrationService.getUserDetailsById(this.userId).subscribe(
      async (data) => {
        this.user = await data;
        this.userform.setValue({
          name: this.user ? this.user.name : '',
          emailId: this.user ? this.user.emailId : '',
          userName: this.user ? this.user.userName : '',
          password: this.user ? this.user.password : ''
        })
      },
      (error) => {
        this.message = "Unable to Update Details"
      }
    );
  }
  updateUser(formValue: any) {
    this.registrationService.updateUserById(this.userId, formValue).subscribe((data) => {
      if (this.isVisible) {
        return;
      }
      this.isVisible = true;
      setTimeout(() => this.isVisible = false, 1000);
    });
  }
}
