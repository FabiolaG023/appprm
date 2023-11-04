import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordMunicipalComponent } from './coord-municipal.component';

describe('CoordMunicipalComponent', () => {
  let component: CoordMunicipalComponent;
  let fixture: ComponentFixture<CoordMunicipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordMunicipalComponent]
    });
    fixture = TestBed.createComponent(CoordMunicipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
