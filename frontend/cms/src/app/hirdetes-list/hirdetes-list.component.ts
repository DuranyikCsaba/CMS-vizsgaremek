import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    this.http.get<any>('http://localhost:5000/hirdetesek').subscribe(response => {
      console.log('Kapott adatok:', response);
      this.hirdetesek = response.hirdetes;
    }, error => {
      console.error('Hiba a hirdetések lekérése során:', error);
      this.errorMessage = 'Hiba történt a hirdetések lekérése során.';
    });
  }
  

  viewHirdetesDetails(content: any, id: number): void {
    this.http.get<any>(`http://localhost:5000/hirdetesek/${id}`).subscribe(data => {
      this.selectedHirdetes = data;
      this.modalService.open(content, { size: 'lg' });
    }, error => {
      console.error('Hiba a hirdetés részleteinek lekérése során:', error);
    });
  }
}
