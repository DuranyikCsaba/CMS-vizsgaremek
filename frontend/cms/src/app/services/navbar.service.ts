import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private loggedIn: boolean = false;

  updateNavbar(status: boolean) {
    this.loggedIn = status;
    if (this.loggedIn) {
    } else {
      
    }
  }
}