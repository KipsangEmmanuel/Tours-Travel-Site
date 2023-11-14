import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {
    console.log(this.loggedInTrue);
    
  }

  loggedInTrue = localStorage.getItem('loggedIn');
  loggedIn = this.loggedInTrue;

  // loggedIn=true

  logOut() {
    localStorage.clear()
    this.router.navigate([''])
  }
}
