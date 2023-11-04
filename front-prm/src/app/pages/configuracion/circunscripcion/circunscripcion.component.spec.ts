import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircunscripcionComponent } from './circunscripcion.component';

describe('CircunscripcionComponent', () => {
  let component: CircunscripcionComponent;
  let fixture: ComponentFixture<CircunscripcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircunscripcionComponent]
    });
    fixture = TestBed.createComponent(CircunscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
