import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User, UserResponse, DemoteResponse} from '../models/user.model';

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.css']
})
export class ModeratorsComponent implements OnInit {
  users: User[] = []; // Felhasználók tárolása

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers(); // Felhasználók lekérése az indításkor
  }

  fetchUsers(): void {
    const token = this.authService.getToken(); // Token lekérése az AuthService-ből
    this.http.get<UserResponse>('http://localhost:5000/api/auth/moderators', {
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

  demoteModerator(userId: number): void {
    const token = this.authService.getToken(); // Token lekérése az AuthService-ből
    this.http.post<DemoteResponse>(`http://localhost:5000/api/auth/moderatorD/${userId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}` // Token hozzáadása a kéréshez
      }
    }).subscribe({
      next: (response) => {
        console.log('Sikeres demótálás:', response.message);
        this.fetchUsers();
      },
      error: (error) => {
        console.error('Hiba a felhasználó demótálása során:', error);
      }
    });
  }
}