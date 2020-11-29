import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarryRegisterComponent } from './quarry-register.component';

describe('QuarryRegisterComponent', () => {
  let component: QuarryRegisterComponent;
  let fixture: ComponentFixture<QuarryRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarryRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
