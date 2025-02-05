import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hirdetes-list',
  templateUrl: './hirdetes-list.component.html',
  styleUrls: ['./hirdetes-list.component.css']
})
export class HirdetesListComponent implements OnInit {
  hirdetesek: any[] = [];
  selectedHirdetes: any = null;
  errorMessage: string = '';

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchHirdetesek();
  }

  fetchHirdetesek(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any[]>('http://localhost:5000/hirdetesek', { headers }).subscribe(data => {
      this.hirdetesek = data;
    }, error => {
      console.error('Hiba a hirdetések lekérése során:', error);
      this.errorMessage = 'Hiba történt a hirdetések lekérése során. Kérjük, próbálja meg később.';
    });
  }

  viewHirdetesDetails(content: any, id: number): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any>(`http://localhost:5000/hirdetesek/${id}`, { headers }).subscribe(data => {
      this.selectedHirdetes = data;
      this.modalService.open(content, { size: 'lg' });
    }, error => {
      console.error('Hiba a hirdetés részleteinek lekérése során:', error);
    });
  }
}
