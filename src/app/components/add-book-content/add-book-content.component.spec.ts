import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookContentComponent } from './add-book-content.component';

describe('AddBookContentComponent', () => {
  let component: AddBookContentComponent;
  let fixture: ComponentFixture<AddBookContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
