import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; // Ensure this path is correct

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  successMessage: string = '';
  serverErrorMessage: string = '';
  usernameError: string = '';
  passwordError: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService 
  ) {}

  onSubmit() {
    this.login();
  }

  validateForm(): boolean {
    this.usernameError = '';
    this.passwordError = '';

    if (!this.username) {
      this.usernameError = 'Felhasználónév szükséges';
    }

    if (!this.password) {
      this.passwordError = 'Jelszó szükséges';
    }

    return !this.usernameError && !this.passwordError;
  }

  login() {
    if (this.validateForm()) {
      const payload = { nev: this.username, jelszo: this.password };
      console.log('Login payload:', payload); 

      this.http.post('http://localhost:5000/api/auth/login', payload, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        (response: any) => {
          
          this.successMessage = 'Sikeres bejelentkezés!';
          this.authService.login(response.token); 
          this.router.navigate(['/']);
        },
        (error) => {
          
          this.serverErrorMessage = 'Hiba történt a bejelentkezés során!';
          console.error('Login error:', error); 
        }
      );
    }
  }
}