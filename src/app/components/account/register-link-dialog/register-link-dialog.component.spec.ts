import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterLinkDialogComponent } from './register-link-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterLinkDialogComponent', () => {
  let component: RegisterLinkDialogComponent;
  let fixture: ComponentFixture<RegisterLinkDialogComponent>;

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLinkDialogComponent ],
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
          provide: MatDialogRef, useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onSubmit() with mock empty recipient', () => {
    component.data.recipient  = '';
    expect(component.onSubmit(true)).toBeUndefined();
  });

  it('dialog should be closed after onNoClick()', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

  it('dialog should be closed after onSubmit()', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onSubmit(true);
    expect(spy).toHaveBeenCalled();
  });
});
