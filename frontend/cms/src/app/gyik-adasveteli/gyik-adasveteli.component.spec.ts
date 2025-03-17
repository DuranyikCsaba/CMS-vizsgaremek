import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyikAdasveteliComponent } from './gyik-adasveteli.component';

describe('GyikAdasveteliComponent', () => {
  let component: GyikAdasveteliComponent;
  let fixture: ComponentFixture<GyikAdasveteliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GyikAdasveteliComponent]
    });
    fixture = TestBed.createComponent(GyikAdasveteliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
