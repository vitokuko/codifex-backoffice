import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavillonComponent } from './pavillon.component';

describe('PavillonComponent', () => {
  let component: PavillonComponent;
  let fixture: ComponentFixture<PavillonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavillonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
