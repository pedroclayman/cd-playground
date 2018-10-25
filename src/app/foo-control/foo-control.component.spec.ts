import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooControlComponent } from './foo-control.component';

describe('FooControlComponent', () => {
  let component: FooControlComponent;
  let fixture: ComponentFixture<FooControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
