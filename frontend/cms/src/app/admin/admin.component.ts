import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User, UserResponse, PromoteResponse } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = []; // Felhasználók tárolása
  showUserDataForm: boolean = false; // Űrlap megjelenítése
  userDataForm: FormGroup; // Felhasználói adatok űrlapja
  selectedUser: User | null = null; // Kiválasztott felhasználó

  constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder) {
    // Űrlap inicializálása
    this.userDataForm = this.fb.group({
      nev: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      jelszo: [''] // Jelszó mező
    });
  }

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

 editUser (user: User): void {
    this.selectedUser  = user; // Kiválasztott felhasználó beállítása
    this.userDataForm.patchValue(user); // Űrlap kitöltése a kiválasztott felhasználó adataival
    this.showUserDataForm = true; // Űrlap megjelenítése

    // Gördülés a űrlaphoz
    setTimeout(() => {
      const element = document.getElementById('userDataForm');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  updateUserData(): void {
    const token = this.authService.getToken(); // Token lekérése az AuthService-ből
    if (this.selectedUser ) {
      const updatedUser  = { ...this.selectedUser , ...this.userDataForm.value }; // Frissített felhasználói adatok

      this.http.post(`http://localhost:5000/api/auth/aUpdate`, updatedUser , {
        headers: {
          'Authorization': `Bearer ${token}` // Token hozzáadása a kéréshez
        }
      }).subscribe({
        next: (response) => {
          console.log('Felhasználói adatok sikeresen frissítve:', response);
          this.fetchUsers(); // Frissítjük a felhasználók listáját
          this.showUserDataForm = false; // Űrlap elrejtése
          alert('Felhasználói adatok sikeresen frissítve!');
        },
        error: (error) => {
          console.error('Hiba a felhasználói adatok frissítése során:', error);
          alert('Hiba történt a felhasználói adatok frissítése során.');
        }
      });
    }
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

  promoteModerator(userId: number): void {
    const token = this.authService.getToken(); // Token lekérése az AuthService-ből
    this.http.post<PromoteResponse>(`http://localhost:5000/api/auth/moderatorP/${userId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}` // Token hozzáadása a kéréshez
      }
    }).subscribe({
      next: (response) => {
        console.log('Sikeres promóció:', response.message);
        this.fetchUsers();
      },
      error: (error) => {
        console.error('Hiba a felhasználó promóciója során:', error);
      }
    });
  }
}