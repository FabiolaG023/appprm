import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordComitesComponent } from './coord-comites.component';

describe('CoordComitesComponent', () => {
  let component: CoordComitesComponent;
  let fixture: ComponentFixture<CoordComitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordComitesComponent]
    });
    fixture = TestBed.createComponent(CoordComitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
