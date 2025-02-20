import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void { 
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:5000/api/auth/user', { headers })
      .subscribe({
        next: (response: any) => {
          this.user = response.user;
        },
        error: (error) => {
          console.error('Hiba a felhasználói adatok lekérdezésekor:', error);
        }
      });
  }

  updatePassword(): void {
    
  }

  deleteUser (): void {
    
  }
}