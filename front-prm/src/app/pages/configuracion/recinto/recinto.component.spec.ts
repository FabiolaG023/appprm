import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecintoComponent } from './recinto.component';

describe('RecintoComponent', () => {
  let component: RecintoComponent;
  let fixture: ComponentFixture<RecintoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecintoComponent]
    });
    fixture = TestBed.createComponent(RecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
