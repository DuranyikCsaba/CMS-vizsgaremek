import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  validateForm() {
    let isValid = true;

    if (!this.username) {
      this.usernameError = 'A felhasználónév megadása kötelező!';
      isValid = false;
    } else {
      this.usernameError = '';
    }

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

    const phonePattern = /^[0-9]{10,12}$/;
    if (!this.phone) {
      this.phoneError = 'A telefonszám megadása kötelező!';
      isValid = false;
    } else if (!phonePattern.test(this.phone)) {
      this.phoneError = 'Helytelen telefonszám formátum!';
      isValid = false;
    } else {
      this.phoneError = '';
    }

    if (!this.password) {
      this.passwordError = 'A jelszó megadása kötelező!';
      isValid = false;
    } else if (this.password.length < 6) {
      this.passwordError = 'A jelszónak legalább 6 karakter hosszúnak kell lennie!';
      isValid = false;
    } else {
      this.passwordError = '';
    }

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
      console.log('Felhasználónév:', this.username);
      console.log('E-mail:', this.email);
      console.log('Telefonszám:', this.phone);
      console.log('Jelszó:', this.password);
      console.log('Jelszó mégegyszer:', this.confirmPassword);

      const formData = {
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      this.http.post('https://your-backend-api-url/register', formData)
        .subscribe(response => {
          console.log('Sikeres regisztráció:', response);
        }, error => {
          console.error('Hiba történt:', error);
        });
    } else {
      console.error('A form kitöltése hibás.');
    }
  }
}
