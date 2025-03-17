import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyikKotelezoComponent } from './gyik-kotelezo.component';

describe('GyikKotelezoComponent', () => {
  let component: GyikKotelezoComponent;
  let fixture: ComponentFixture<GyikKotelezoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GyikKotelezoComponent]
    });
    fixture = TestBed.createComponent(GyikKotelezoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
