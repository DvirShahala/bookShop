import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularPageComponent } from './regular-page.component';

describe('RegularPageComponent', () => {
  let component: RegularPageComponent;
  let fixture: ComponentFixture<RegularPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
