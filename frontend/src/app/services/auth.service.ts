import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  createUser(user: UserDetails) {
    return this.http.post('http://localhost:9500/user/register', user).subscribe(res => {
      console.log(res);
      
    })
  }
}
