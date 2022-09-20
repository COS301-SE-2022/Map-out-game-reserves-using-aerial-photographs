import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PasswordDialogComponent } from './password-dialog.component';

describe('PasswordDialogComponent', () => {
  let component: PasswordDialogComponent;
  let fixture: ComponentFixture<PasswordDialogComponent>;

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordDialogComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onSubmit() with mock empty password', () => {
    component.data.newPassword = '';
    component.data.confirmedPassword = '';
    expect(component.onSubmit()).toBeUndefined();
  });

  it('test onSubmit() with mock mismatch password', () => {
    component.data.newPassword = 'test5678';
    component.data.confirmedPassword = 'differant';
    expect(component.onSubmit()).toBeUndefined();
  });

  it('test onSubmit() with mock short password', () => {
    component.data.newPassword = 'test';
    component.data.confirmedPassword = 'test';
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
