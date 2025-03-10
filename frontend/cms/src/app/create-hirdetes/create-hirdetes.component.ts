import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-hirdetes',
  templateUrl: './create-hirdetes.component.html',
  styleUrls: ['./create-hirdetes.component.css']
})
export class CreateHirdetesComponent implements OnInit {
  hirdetesForm: FormGroup;
  isLoggedIn$: Observable<boolean>;
  selectedFiles: File[] = [];
  imageUrls: (string | ArrayBuffer)[] = [];
  currentYear: number; 

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.currentYear = new Date().getFullYear(); // Az aktuális év inicializálása

    // Űrlap inicializálása
    this.hirdetesForm = this.fb.group({
      adatok: ['', Validators.required],
      modell: ['', Validators.required],
      marka: ['', Validators.required],
      ajtok_szama: ['', [Validators.required, Validators.min(1)]],
      hengerurtartalom: ['', [Validators.required, Validators.min(0)]],
      uzemanyag: ['', Validators.required],
      evjarat: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      futott_kilometer: ['', [Validators.required, Validators.min(0)]],
      szin: ['', Validators.required],
      sebessegvalto_tipus: ['', Validators.required],
      kiegeszitok: ['', Validators.required],
      muszaki_vizsga_ervenyes: [''],
      baleseti_elozmenyek: [''],
      ert_telszam: ['', Validators.required],
      ar: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  // Fájlok kiválasztásának kezelése
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files); // Fájlok hozzáadása a tömbhöz
      this.imageUrls = []; // Tömb ürítése új fájlokhoz

      // Minden kiválasztott fájl beolvasása és előnézetének létrehozása
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageUrls.push(reader.result as string); // URL hozzáadása a tömbhöz
        };

        reader.readAsDataURL(file); // Fájl olvasása Data URL-ként
      }
    }
  }

  // Űrlap elküldése
  onSubmit(): void {
    if (this.hirdetesForm.valid && this.selectedFiles.length > 0) {
      // Felhasználó ID lekérése a tokenből
      const currentUser  = this.authService.getCurrentUser ();
      if (!currentUser ) {
        console.error('Felhasználó nincs bejelentkezve!');
        return;
      }

      // FormData létrehozása
      const formData = new FormData();

      // Űrlap adatainak hozzáadása a FormData-hoz
      Object.keys(this.hirdetesForm.controls).forEach(key => {
        formData.append(key, this.hirdetesForm.get(key)?.value);
      });

      // Felhasználó ID hozzáadása
      formData.append('felhasznalo_id', currentUser .id.toString());

      // Képek hozzáadása a FormData-hoz
      this.selectedFiles.forEach((file) => {
        formData.append('kepek', file, file.name);
      });

      // Feltöltés a szerverre FormData formátumban
      this.http.post('http://localhost:5000/hirdetesek', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).subscribe(
        response => {
          console.log('Hirdetés sikeresen feladva!', response);
          // Űrlap resetelése
          this.hirdetesForm.reset();
          this.selectedFiles = [];
          this.imageUrls = [];
          this.router.navigate(['/hirdetes-list']);
          
        },
        error => {
          console.error('Hiba a hirdetés feladása során:', error);
          if (error.error) {
            console.error('Szerver válasza:', error.error);
          }
        }
      );
    } else {
      console.error('Kérem, töltse ki az összes mezőt és válasszon ki legalább egy képet!');
    }
  }
}