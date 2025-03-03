import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hirdetes } from '../models/hirdetes.model';

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

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchHirdetesek();
  }

  fetchHirdetesek(): void {
    this.loading = true;
    this.http.get<{ hirdetesek: Hirdetes[] }>('http://localhost:5000/hirdetesek')
      .subscribe({
        next: (response) => {
          this.hirdetesek = response.hirdetesek.map(hirdetes => ({
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
}