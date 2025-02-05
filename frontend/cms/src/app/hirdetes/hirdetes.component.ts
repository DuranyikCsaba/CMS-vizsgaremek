import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hirdetes',
  templateUrl: './hirdetes.component.html',
  styleUrls: ['./hirdetes.component.css']
})
export class HirdetesComponent {
  @Input() adatok: string = '';
  @Input() modell: string = '';
  @Input() marka: string = '';
  @Input() ajtok_szama: number = 0;
  @Input() hengerurtartalom: number = 0;
  @Input() uzemanyag: string = '';
  @Input() evjarat: number = 0;
  @Input() kepek: string[] = [];
}
