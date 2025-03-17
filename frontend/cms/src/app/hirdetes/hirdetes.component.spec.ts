import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HirdetesComponent } from './hirdetes.component';

describe('HirdetesComponent', () => {
  let component: HirdetesComponent;
  let fixture: ComponentFixture<HirdetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HirdetesComponent]
    });
    fixture = TestBed.createComponent(HirdetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
