import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-hirdetes',
  templateUrl: './create-hirdetes.component.html',
  styleUrls: ['./create-hirdetes.component.css']
})
export class CreateHirdetesComponent implements OnInit {
  hirdetesForm: FormGroup;
  isLoggedIn$: Observable<boolean>;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.hirdetesForm = this.fb.group({
      adatok: ['', Validators.required],
      modell: ['', Validators.required],
      marka: ['', Validators.required],
      ajtok_szama: ['', Validators.required],
      hengerurtartalom: ['', Validators.required],
      uzemanyag: ['', Validators.required],
      evjarat: ['', Validators.required],
      kepek: this.fb.array([this.createImageUrlField()])
    });
  }

  ngOnInit(): void {}

  get kepekArray(): FormArray {
    return this.hirdetesForm.get('kepek') as FormArray;
  }

  createImageUrlField(): FormGroup {
    return this.fb.group({
      url: ['', Validators.required]
    });
  }

  addImageUrl(index: number): void {
    if (this.kepekArray.length < 10 && this.kepekArray.at(index).get('url')?.value) {
      this.kepekArray.push(this.createImageUrlField());
    }
  }

  get kepekUrls(): string[] {
    return this.kepekArray.controls.map(control => control.get('url')?.value);
  }

  onSubmit(): void {
    if (this.hirdetesForm.valid) {
      this.http.post('http://localhost:5000/hirdetesek', this.hirdetesForm.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).subscribe(response => {
        console.log('Hirdetés sikeresen feladva!', response);
      }, error => {
        console.error('Hiba a hirdetés feladása során:', error);
      });
    }
  }
}
