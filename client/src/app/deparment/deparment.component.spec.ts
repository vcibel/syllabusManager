import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmentComponent } from './deparment.component';

describe('DeparmentComponent', () => {
  let component: DeparmentComponent;
  let fixture: ComponentFixture<DeparmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
