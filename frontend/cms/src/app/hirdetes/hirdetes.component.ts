import { Component, Input } from '@angular/core';
import { Hirdetes } from '../models/hirdetes.model';

@Component({
  selector: 'app-hirdetes',
  templateUrl: './hirdetes.component.html',
  styleUrls: ['./hirdetes.component.css']
})
export class HirdetesComponent {
  @Input() selectedHirdetes: Hirdetes | null = null;
  @Input() adatok: string = '';
  @Input() modell: string = '';
  @Input() marka: string = '';
  @Input() ajtok_szama: number = 0;
  @Input() hengerurtartalom: number = 0;
  @Input() uzemanyag: string = '';
  @Input() evjarat: number = 0;
  @Input() futott_kilometer: number = 0; 
  @Input() szin: string = ''; 
  @Input() sebessegvalto_tipus: string = ''; 
  @Input() kiegeszitok: string = ''; 
  @Input() muszaki_vizsga_ervenyes: Date | null = null; 
  @Input() baleseti_elozmenyek: string = ''; 
  @Input() kepek: string[] = [];
}