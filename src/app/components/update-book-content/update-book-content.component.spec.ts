import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookContentComponent } from './update-book-content.component';

describe('UpdateBookContentComponent', () => {
  let component: UpdateBookContentComponent;
  let fixture: ComponentFixture<UpdateBookContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBookContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
