import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}