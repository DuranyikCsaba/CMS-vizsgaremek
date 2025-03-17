import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHirdetesComponent } from './create-hirdetes.component';

describe('CreateHirdetesComponent', () => {
  let component: CreateHirdetesComponent;
  let fixture: ComponentFixture<CreateHirdetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHirdetesComponent]
    });
    fixture = TestBed.createComponent(CreateHirdetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
