import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    // A form adatok kiírása konzolra
    console.log('Felhasználónév:', this.username);
    console.log('E-mail:', this.email);
    console.log('Telefonszám:', this.phone);
    console.log('Jelszó:', this.password);
    console.log('Jelszó mégegyszer:', this.confirmPassword);

    // Backendnek való küldés
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
  }
}
