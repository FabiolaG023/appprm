import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComitesComponent } from './comites.component';

describe('ComitesComponent', () => {
  let component: ComitesComponent;
  let fixture: ComponentFixture<ComitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComitesComponent]
    });
    fixture = TestBed.createComponent(ComitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
