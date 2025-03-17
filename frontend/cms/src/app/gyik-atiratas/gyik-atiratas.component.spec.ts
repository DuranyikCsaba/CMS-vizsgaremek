import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyikAtiratasComponent } from './gyik-atiratas.component';

describe('GyikAtiratasComponent', () => {
  let component: GyikAtiratasComponent;
  let fixture: ComponentFixture<GyikAtiratasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GyikAtiratasComponent]
    });
    fixture = TestBed.createComponent(GyikAtiratasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
