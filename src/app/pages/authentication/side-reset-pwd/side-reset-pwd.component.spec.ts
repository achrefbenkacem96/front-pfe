import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideResetPwdComponent } from './side-reset-pwd.component';

describe('SideResetPwdComponent', () => {
  let component: SideResetPwdComponent;
  let fixture: ComponentFixture<SideResetPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideResetPwdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
