import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hirdetes } from '../models/hirdetes.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-hirdetes-list',
  templateUrl: './hirdetes-list.component.html',
  styleUrls: ['./hirdetes-list.component.css']
})
export class HirdetesListComponent implements OnInit {
  hirdetesek: Hirdetes[] = [];
  selectedHirdetes: Hirdetes | null = null;
  errorMessage: string = '';
  loading: boolean = false;
  maxChars: number = 30;

  constructor(private http: HttpClient, private modalService: NgbModal, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchHirdetesek();
  }

  fetchHirdetesek(): void {
    this.loading = true;
    this.http.get<{ hirdetesek: Hirdetes[] }>('http://localhost:5000/hirdetesek')
      .subscribe({
        next: (response) => {
          const ketHetElott = new Date();
          ketHetElott.setDate(ketHetElott.getDate() - 14); // 14 nappal korábbi dátum

          this.hirdetesek = response.hirdetesek
            .filter(hirdetes => new Date(hirdetes.createdAt) >= ketHetElott) // Szűrés
            .map(hirdetes => ({
              ...hirdetes,
              kepek: hirdetes.kepek ? hirdetes.kepek.map(kep => ({
                file_path: `${kep.file_path}`
              })) : []
            }));
          this.loading = false;
        },
        error: (error) => {
          console.error('Hiba a hirdetések lekérése során:', error);
          this.errorMessage = 'Hiba történt a hirdetések lekérése során.';
          this.loading = false;
        }
      });
  }

  viewHirdetesDetails(content: any, id: number): void {
    this.http.get<Hirdetes>(`http://localhost:5000/hirdetesek/${id}`)
      .subscribe({
        next: (data) => {
          this.selectedHirdetes = {
            ...data,
            kepek: data.kepek ? data.kepek.map(kep => ({
              file_path: `${kep.file_path}`
            })) : []
          };
          this.modalService.open(content, { size: 'lg' });
        },
        error: (error) => {
          console.error('Hiba a hirdetés részleteinek lekérése során:', error);
        }
      });
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  getTruncatedAdatok(adatok: string): string {
    if (adatok.length > this.maxChars) {
      return adatok.substring(0, this.maxChars) + '...';
    }
    return adatok;
  }

  deleteHirdetes(id: number): void {
    if (confirm('Biztosan törölni szeretnéd ezt a hirdetést?')) {
      const token = this.authService.getToken(); // Token lekérése az AuthService-ből
      this.http.delete(`http://localhost:5000/hirdetesek/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Token hozzáadása a kéréshez
        }
      })
      .subscribe({
        next: () => {
          this.hirdetesek = this.hirdetesek.filter(hirdetes => hirdetes.id !== id);
          alert('Hirdetés törölve.');
          this.closeModal();
        },
        error: (error) => {
          console.error('Hiba a hirdetés törlése során:', error);
          alert('Hiba történt a hirdetés törlése során.');
        }
      });
    }
  }

  canEditOrDelete(hirdetes: Hirdetes): boolean {
    const user = this.authService.getCurrentUser ();
    return user !== null && (hirdetes.felhasznalo_id === user.id || user.tipus === 0 || user.tipus === 2);
  }
}