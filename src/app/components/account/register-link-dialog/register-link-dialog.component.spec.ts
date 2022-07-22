import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLinkDialogComponent } from './register-link-dialog.component';

describe('RegisterLinkDialogComponent', () => {
  let component: RegisterLinkDialogComponent;
  let fixture: ComponentFixture<RegisterLinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLinkDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
