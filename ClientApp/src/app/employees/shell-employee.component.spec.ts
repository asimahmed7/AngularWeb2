import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellEmployeeComponent } from './shell-employee.component';

describe('ShellEmployeeComponent', () => {
  let component: ShellEmployeeComponent;
  let fixture: ComponentFixture<ShellEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
