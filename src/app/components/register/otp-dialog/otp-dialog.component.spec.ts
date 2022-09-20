import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OtpDialogComponent } from './otp-dialog.component';

describe('OtpDialogComponent', () => {
  let component: OtpDialogComponent;
  let fixture: ComponentFixture<OtpDialogComponent>;

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpDialogComponent ],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onSubmit() with mock empty values', () => {
    component.data.otp = 0;
    expect(component.onSubmit()).toBeUndefined();
  });

  it('dialog should be closed after onNoClick()', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

  it('dialog should be closed after onSubmit()', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });
});
