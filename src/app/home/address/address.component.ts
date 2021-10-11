import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  userId: any;
  user = new User();
  address = new Address();
  addressObj: any;
  userAddressData: any;
  message!: string;
  addressList: any = [];
  tempArray: any;
  isVisible: boolean = false;

  constructor(private registrationService: RegistrationService,
    private addressService: AddressService,
    private router: Router) {
    this.getUserDetailsFunction();
  }

  ngOnInit(): void {
    this.getUserDetailsFunction();
    this.getAddressOfUserById();
  }
  saveAddress() {
    if (Object.keys(this.address).length >= 7) {
      this.userId = localStorage.getItem("userId");
      this.addressObj = { ...this.address, userId: this.userId }
      // console.log(this.addressObj)
      this.addressService.saveAddressTodb(this.addressObj).subscribe(
        (data) => {
          this.message = "Saved Address Successfully!";
          localStorage.setItem("addressId", data.addressId);
          this.router.navigate(['../payment']);
        },
        (error) => {
          // console.log("Exception recieved");
          this.message = "Server Error Unable to save the address";
        });
    }
    else
      this.message = "Please Enter the details.";
  }

  getUserDetailsFunction() {
    this.userId = localStorage.getItem("userId");
    // console.log(userId);
    this.registrationService.getUserDetailsById(this.userId).subscribe(
      (data) => {
        // console.log(data);
        const userData = data;
      }
    );
  }

  payment(addressId: any) {
    // console.log(addressId)
    localStorage.setItem("addressId", addressId);
    this.router.navigate(['../payment']);
  }

  async getAddressOfUserById() {
    this.userId = localStorage.getItem("userId");
    let id = parseInt(this.userId);
    this.addressService.getAllAddressOfUserById().subscribe(
      async (data) => {
        this.tempArray = await data;
        this.tempArray.forEach((address: { userId: any; }) => {
          if (address.userId == this.userId) {
            this.addressList.push(address);
          }
        });
        // await console.log(this.addressList)
      });
  }

  deleteAddress(addressId: number, idx: number) {
    // console.log(addressId)
    this.addressService.deleteAddressById(addressId).subscribe((data) => {
      this.addressList.splice(idx, 1);
      if (this.isVisible) {
        return;
      }
      this.isVisible = true;
      setTimeout(() => this.isVisible = false, 1000);
    });
  }

}
