import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;
  passwordForm: FormGroup;
  deleteForm: FormGroup;
  userDataForm: FormGroup; // Új űrlap a felhasználói adatokhoz
  showPasswordForm: boolean = false; // Jelszó módosító űrlap láthatósága
  showDeleteForm: boolean = false; // Felhasználó törlő űrlap láthatósága
  feedbackMessage: string = ''; // Visszajelzés szövege

  constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder, private userService: UserService) {
    // FormGroup inicializálása
    this.passwordForm = this.fb.group({
      previousPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.deleteForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    // Felhasználói adatok űrlap inicializálása
    this.userDataForm = this.fb.group({
      nev: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required]
    });
  }

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
          // Az űrlap kitöltése a felhasználói adatokkal
          this.userDataForm.patchValue({
            nev: this.user.nev,
            email: this.user.email,
            tel: this.user.tel
          });
        },
        error: (error) => {
          console.error('Hiba a felhasználói adatok lekérdezésekor:', error);
        }
      });
  }

  showUserDataForm: boolean = false;

  updateUserData(): void {
    if (this.userDataForm.invalid) {
      return;
    }
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // A felhasználói adatok frissítése
    this.http.post(`http://localhost:5000/api/auth/user`, this.userDataForm.value, { headers })
      .subscribe({
        next: (response) => {
          console.log('Felhasználói adatok sikeresen frissítve:', response);
          this.feedbackMessage = 'A felhasználói adatok sikeresen frissítve!'; // Visszajelzés
          this.userService.notifyUserUpdate();
          window.location.reload();
        },
        error: (error) => {
          console.error('Hiba a felhasználói adatok frissítése során:', error);
          this.feedbackMessage = 'Hiba történt a felhasználói adatok frissítése során.'; // Hiba visszajelzés
        }
      });
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }
  
    const { previousPassword, newPassword, confirmPassword } = this.passwordForm.value;
  
    if (newPassword !== confirmPassword) {
      this.feedbackMessage = 'Az új jelszavak nem egyeznek.';
      return;
    }
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // A jelszó frissítése
    this.http.post(`http://localhost:5000/api/auth/user/password`, {
      jelszo: previousPassword,
      ujJelszo: newPassword,
      ujJelszoMegint: confirmPassword
    }, { headers })
    .subscribe({
      next: (response) => {
        console.log('Jelszó sikeresen frissítve:', response);
        this.feedbackMessage = 'A jelszó sikeresen módosítva!'; // Visszajelzés
        this.passwordForm.reset(); // Űrlap törlése
        this.showPasswordForm = false; // Űrlap elrejtése
      },
      error: (error) => {
        console.error('Hiba a jelszó módosítása során:', error);
        this.feedbackMessage = 'Hiba történt a jelszó módosítása során.'; // Hiba visszajelzés
      }
    });
  }
  
  deleteUser  (): void {
    if (this.deleteForm.invalid) {
      return;
    }
  
    const { password, confirmPassword } = this.deleteForm.value;
  
    if (password !== confirmPassword) {
      this.feedbackMessage = 'A jelszavak nem egyeznek.';
      return;
    }
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.delete('http://localhost:5000/api/auth/user', {
      headers,
      body: {
        jelszo: password,
        jelszoMegint: confirmPassword
      }
    })
    .subscribe({
      next: (response) => {
        console.log('Felhasználó sikeresen törölve:', response);
        this.feedbackMessage = 'A profil sikeresen törölve!'; // Visszajelzés
        this.authService.logout(); // Kijelentkeztetés
      },
      error: (error) => {
        console.error('Hiba a felhasználó törlésekor:', error);
        this.feedbackMessage = 'Hiba történt a profil törlése során.'; // Hiba visszajelzés
      }
    });
  }
}