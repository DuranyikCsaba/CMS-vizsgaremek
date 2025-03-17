import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyikCascoComponent } from './gyik-casco.component';

describe('GyikCascoComponent', () => {
  let component: GyikCascoComponent;
  let fixture: ComponentFixture<GyikCascoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GyikCascoComponent]
    });
    fixture = TestBed.createComponent(GyikCascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
