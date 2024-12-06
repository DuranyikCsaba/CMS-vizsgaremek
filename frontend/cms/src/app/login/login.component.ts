import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  usernameError: string = '';
  passwordError: string = '';

  successMessage: string = '';
  serverErrorMessage: string = '';

  constructor(private http: HttpClient) {}

  validateForm() {
    let isValid = true;

    // Felhasználónév ellenőrzése
    if (!this.username) {
      this.usernameError = 'A felhasználónév megadása kötelező!';
      isValid = false;
    } else {
      this.usernameError = '';
    }

    // Jelszó ellenőrzése
    if (!this.password) {
      this.passwordError = 'A jelszó megadása kötelező!';
      isValid = false;
    } else {
      this.passwordError = '';
    }

    return isValid;
  }

  onSubmit() {
    if (this.validateForm()) {
      this.successMessage = ''; // Reset success üzenet
      this.serverErrorMessage = ''; // Reset server hibaüzenet

      console.log('Felhasználónév:', this.username);
      console.log('Jelszó:', this.password);

      // Backendnek küldött adatok objektuma
      const formData = {
        nev: this.username, // Backend `nev` mezőt vár
        jelszo: this.password // Backend `jelszo` mezőt vár
      };

      // HTTP POST kérés küldése
      this.http.post('http://localhost:5000/api/auth/login', formData)
        .subscribe({
          next: (response) => {
            console.log('Sikeres bejelentkezés:', response);
            this.successMessage = 'Sikeres bejelentkezés!';
            alert(`A bejelentkezés sikeres! Üdv ${this.username}!`);
          },
          error: (error) => {
            console.error('Hiba történt:', error);
            this.serverErrorMessage = 'Helytelen felhasználónév vagy jelszó!';
            alert('Helytelen felhasználónév vagy jelszó!')
          }
        });
    } else {
      console.error('A form kitöltése hibás.');
    }
  }
}
