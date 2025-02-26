import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyikBetetlapComponent } from './gyik-betetlap.component';

describe('GyikBetetlapComponent', () => {
  let component: GyikBetetlapComponent;
  let fixture: ComponentFixture<GyikBetetlapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GyikBetetlapComponent]
    });
    fixture = TestBed.createComponent(GyikBetetlapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
