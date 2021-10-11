import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  cartSubject = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  async logout() {
    await sessionStorage.removeItem("userId");
    await sessionStorage.clear();
    await localStorage.clear();
    return true;
  }

  isAuthenticatedFunction(): boolean {
    const userData = sessionStorage.getItem("userId");
    if (userData) {
      return true;
    }
    else {
      return false;
    }
  }

  loginUserFromRemote(user: User) {
    return this.http.post<any>("http://localhost:8000/login", user);
  }

  registerUserFromRemote(user: User) {
    return this.http.post<any>("http://localhost:8000/registeruser", user);
  }

  getUserDetailsById(userId: number) {
    return this.http.get("http://localhost:8000/getUser/" + userId);
  }

  updateUserById(userId: number, userobj: any) {
    return this.http.put("http://localhost:8000/updateUser/" + userId, userobj);
  }
}
