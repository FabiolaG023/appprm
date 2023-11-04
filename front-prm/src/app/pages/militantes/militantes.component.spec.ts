import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilitantesComponent } from './militantes.component';

describe('MilitantesComponent', () => {
  let component: MilitantesComponent;
  let fixture: ComponentFixture<MilitantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MilitantesComponent]
    });
    fixture = TestBed.createComponent(MilitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
