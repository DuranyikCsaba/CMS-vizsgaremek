import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HirdetesListComponent } from './hirdetes-list.component';

describe('HirdetesListComponent', () => {
  let component: HirdetesListComponent;
  let fixture: ComponentFixture<HirdetesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HirdetesListComponent]
    });
    fixture = TestBed.createComponent(HirdetesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
