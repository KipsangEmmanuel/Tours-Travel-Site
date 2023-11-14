import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {

  }

  loggedInTrue = localStorage.getItem('loggedIn');
  loggedIn = this.loggedInTrue;

  // loggedIn=true

  logOut() {
    this.router.navigate([''])
    localStorage.clear()
  }
}
