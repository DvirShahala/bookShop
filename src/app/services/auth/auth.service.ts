import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CurrentUser, UserAttr, UserDoc } from '../../models/interfaces';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private rouetr: Router) { }

  // Check authenticate user
  checkAuthenticated(userDetails: UserAttr): Promise<UserDoc> {
    return this.http.post<UserDoc>(`${environment.BE_ENDPOINT}/api/users/signin`, userDetails, { withCredentials: true }).toPromise();
  }

  // Current user
  currentUser(): Promise<any> {
    return this.http.get<CurrentUser>(`${environment.BE_ENDPOINT}/api/users/currentuser`, { withCredentials: true }).pipe(pluck("currentUser")).toPromise();
  }

  // Sign up user
  createAccount(user: UserAttr): Promise<UserDoc> {
    return this.http.post<UserDoc>(`${environment.BE_ENDPOINT}/api/users/signup`,
      {
        email: user.email,
        password: user.password
      }).toPromise();
  }

  // Sign out user
  signOut() {
    return this.http.post(`${environment.BE_ENDPOINT}/api/users/signout`, { withCredentials: true }).toPromise();
  }
}
