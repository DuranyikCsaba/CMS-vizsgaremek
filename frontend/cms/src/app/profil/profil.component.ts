import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;
  passwordForm: FormGroup;
  deleteForm: FormGroup;
  userDataForm: FormGroup;
  showUserDataForm: boolean = false;
  showPasswordForm: boolean = false;
  showDeleteForm: boolean = false;
  feedbackMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder, private userService: UserService) {
    this.passwordForm = this.fb.group({
      previousPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.deleteForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

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

  updateUserData(): void {
    if (this.userDataForm.invalid) {
      return;
    }
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.post(`http://localhost:5000/api/auth/user`, this.userDataForm.value, { headers })
      .subscribe({
        next: (response) => {
          console.log('Felhasználói adatok sikeresen frissítve:', response);
          this.feedbackMessage = 'A felhasználói adatok sikeresen frissítve!';
          this.userService.notifyUserUpdate();
            setTimeout(function() {
              window.location.reload();
              }, 2000);
        },
        error: (error) => {
          console.error('Hiba a felhasználói adatok frissítése során:', error);
          this.feedbackMessage = 'Hiba történt a felhasználói adatok frissítése során.';
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