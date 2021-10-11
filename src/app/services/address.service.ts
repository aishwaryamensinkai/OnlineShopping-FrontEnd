import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) { }

  saveAddressTodb(address: Address) {
    // console.log(user);
    return this.http.post<any>("http://localhost:8000/saveAddress", address);
  }

  getAddressById(userId: number) {
    return this.http.get("http://localhost:8000/getAddress/" + userId);
  }

  getAllAddressOfUserById() {
    return this.http.get("http://localhost:8000/getAll");
  }

  deleteAddressById(addressId: number) {
    return this.http.delete("http://localhost:8000/deleteAddress/" + addressId);
  }
}
