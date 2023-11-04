import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordZonalesComponent } from './coord-zonales.component';

describe('CoordZonalesComponent', () => {
  let component: CoordZonalesComponent;
  let fixture: ComponentFixture<CoordZonalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordZonalesComponent]
    });
    fixture = TestBed.createComponent(CoordZonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
