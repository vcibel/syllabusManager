import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePensumComponent } from './create-pensum.component';

describe('CreatePensumComponent', () => {
  let component: CreatePensumComponent;
  let fixture: ComponentFixture<CreatePensumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePensumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePensumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
