import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  getCurrentUser (): { id: number; name: string } | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { id: number; name: string };
        return decodedToken;
      } catch (error) {
        console.error('Hiba a token dekódolása során:', error);
        return null;
      }
    }
    return null;
  }

  getUserName(): string | null {
    const user = this.getCurrentUser ();
    return user ? user.name : "Profil";
  }
}