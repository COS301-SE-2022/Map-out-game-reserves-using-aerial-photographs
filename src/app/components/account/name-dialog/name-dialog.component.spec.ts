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

import { NameDialogComponent } from './name-dialog.component';

describe('NameDialogComponent', () => {
  let component: NameDialogComponent;
  let fixture: ComponentFixture<NameDialogComponent>;

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameDialogComponent ],
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

    fixture = TestBed.createComponent(NameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onSubmit() with mock empty name', () => {
    component.data.newName = '';
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
