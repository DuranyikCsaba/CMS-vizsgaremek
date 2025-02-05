import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private loggedIn: boolean = false;

  updateNavbar(status: boolean) {
    this.loggedIn = status;
    // Logic to update the navbar buttons
    if (this.loggedIn) {
      // Change login and register buttons to profile and logout
    } else {
      // Change profile and logout buttons to login and register
    }
  }
}