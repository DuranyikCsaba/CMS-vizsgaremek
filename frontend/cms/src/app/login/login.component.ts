import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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
    this.serverErrorMessage = ''; // Korábbi hibaüzenet törlése
    if (this.validateForm()) {
      this.login();
    }
  }

  validateForm(): boolean {
    this.usernameError = '';
    this.passwordError = '';

    // Üres felhasználónév ellenőrzése
    if (!this.username.trim()) {
      this.usernameError = 'Felhasználónév megadása kötelező!';
    } else if (!/^[a-zA-Z0-9áéíóöőúüÁÉÍÓÖŐÚÜ]+$/.test(this.username)) {
      this.usernameError = 'A felhasználónév csak betűket, számokat és ékezetes karaktereket tartalmazhat!';
  }

    // Üres vagy túl rövid jelszó ellenőrzése
    if (!this.password.trim()) {
      this.passwordError = 'Jelszó megadása kötelező!';
    } else if (this.password.length < 8) {
      this.passwordError = 'A jelszónak legalább 8 karakter hosszúnak kell lennie!';
    }

    return !this.usernameError && !this.passwordError;
  }

  login() {
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
        console.error('Login error:', error);

        if (error.status === 401) {
          this.serverErrorMessage = 'Hibás felhasználónév vagy jelszó!';
        } else if (error.status === 500) {
          this.serverErrorMessage = 'Szerverhiba! Kérjük, próbálja újra később.';
        } else {
          this.serverErrorMessage = 'Hiba történt a bejelentkezés során.';
        }
      }
    );
  }
}
