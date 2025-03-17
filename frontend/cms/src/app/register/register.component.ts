import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  usernameError: string = '';
  emailError: string = '';
  phoneError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';


  successMessage: string = '';
  serverErrorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}


  validateForm() {
    let isValid = true;

    // Felhasználónév ellenőrzése

    if (!this.username) {
      this.usernameError = 'A felhasználónév megadása kötelező!';
      isValid = false;
    } else {
      this.usernameError = '';
    }


    // E-mail ellenőrzése
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!this.email) {
      this.emailError = 'Az e-mail megadása kötelező!';
      isValid = false;
    } else if (!emailPattern.test(this.email)) {
      this.emailError = 'Helytelen e-mail formátum!';
      isValid = false;
    } else {
      this.emailError = '';
    }

    // Telefonszám ellenőrzése
    const phonePattern = /^\+36[0-9]{9}$/;

    if (!this.phone) {
      this.phoneError = 'A telefonszám megadása kötelező!';
      isValid = false;
    } else if (!phonePattern.test(this.phone)) {
      this.phoneError = 'Helytelen telefonszám formátum! A helyes formátum: +36nnnnnnnnn';
      isValid = false;
    } else {
      this.phoneError = '';
    }

    // Jelszó ellenőrzése
    if (!this.password) {
      this.passwordError = 'A jelszó megadása kötelező!';
      isValid = false;
    } else if (this.password.length < 8 && this.password.length > 32) {
      this.passwordError = 'Min. karakterhossz: 8 karakter. Max. karakterhossz: 32 karakter';
      isValid = false;
    } else {
      this.passwordError = '';
    }


    // Jelszó megerősítésének ellenőrzése
    
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'A jelszavak nem egyeznek!';
      isValid = false;
    } else {
      this.confirmPasswordError = '';
    }

    return isValid;
  }
  
  onSubmit() {
    if (this.validateForm()) {
      this.successMessage = ''; // Reset success üzenet
      this.serverErrorMessage = ''; // Reset server hibaüzenet

      console.log('Felhasználónév:', this.username);
      console.log('E-mail:', this.email);
      console.log('Telefonszám:', this.phone);
      console.log('Jelszó:', this.password);
      console.log('Jelszó mégegyszer:', this.confirmPassword);


      // Backendnek küldött adatok objektuma
      const formData = {
        nev: this.username, // A backend `nev` mezőt vár
        email: this.email,
        tel: this.phone, // Telefonszám mező: `tel`
        jelszo: this.password, // Jelszó mező: `jelszo`
      };

      // HTTP POST kérés küldése
      this.http.post('http://localhost:5000/api/auth/register', formData)
        .subscribe({
          next: (response) => {
            console.log('Sikeres regisztráció:', response);
            this.successMessage = 'Sikeres regisztráció!';
            this.router.navigate(['/login'])
          },
          error: (error) => {
            console.error('Hiba történt:', error);
            this.serverErrorMessage = 'Hiba történt a regisztráció során! Kérjük próbálja újra.';
          }
        });
    } else {
      console.error('A form kitöltése hibás.');
    }
  }
}
