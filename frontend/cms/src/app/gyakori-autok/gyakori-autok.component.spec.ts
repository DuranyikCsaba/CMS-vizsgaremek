import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyakoriAutokComponent } from './gyakori-autok.component';

describe('GyakoriAutokComponent', () => {
  let component: GyakoriAutokComponent;
  let fixture: ComponentFixture<GyakoriAutokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GyakoriAutokComponent]
    });
    fixture = TestBed.createComponent(GyakoriAutokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
