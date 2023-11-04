import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaComponent } from './zona.component';

describe('ZonaComponent', () => {
  let component: ZonaComponent;
  let fixture: ComponentFixture<ZonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZonaComponent]
    });
    fixture = TestBed.createComponent(ZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
