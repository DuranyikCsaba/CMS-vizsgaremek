import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User, UserResponse } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = []; // Felhasználók tárolása

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers(); // Felhasználók lekérése az indításkor
  }

  fetchUsers(): void {
    const token = this.authService.getToken(); // Token lekérése az AuthService-ből
    this.http.get<UserResponse>('http://localhost:5000/api/auth/users', {
      headers: {
        'Authorization': `Bearer ${token}` // Token hozzáadása a kéréshez
      }
    }).subscribe({
      next: (response) => {
        this.users = response.users; // Felhasználók tárolása
      },
      error: (error) => {
        console.error('Hiba a felhasználók lekérése során:', error);
      }
    });
  }

  deleteUser (id: number): void {
    if (confirm('Biztosan törölni szeretnéd ezt a felhasználót?')) {
      const token = this.authService.getToken(); // Token lekérése az AuthService-ből
      this.http.delete(`http://localhost:5000/api/auth/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Token hozzáadása a kéréshez
        }
      }).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id); // Felhasználó eltávolítása a listából
          alert('Felhasználó törölve.');
        },
        error: (error) => {
          console.error('Hiba a felhasználó törlése során:', error);
          alert('Hiba történt a felhasználó törlése során.');
        }
      });
    }
  }
}