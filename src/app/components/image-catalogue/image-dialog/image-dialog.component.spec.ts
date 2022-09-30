import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ImageDialogComponent } from './image-dialog.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ImageDialogComponent', () => {
  let component: ImageDialogComponent;
  let fixture: ComponentFixture<ImageDialogComponent>;

  const dialogMock = {
    close: () => {},
  };

  const routerSpy = jasmine.createSpyObj('Router', [
    'navigateByUrl',
    'navigate',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageDialogComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        HttpClientModule,
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
        {
          provide: Router,
          useValue: routerSpy,
        },
        HttpClient,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onSubmit() with mock taskID', () => {
    let router = fixture.debugElement.injector.get(Router);
    let spyRouter = router.navigateByUrl as jasmine.Spy;
    let spyClose = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onSubmit('tid');
    expect(spyRouter).toHaveBeenCalled();
    expect(spyClose).toHaveBeenCalled();
    expect(component.onSubmit('tid')).toBeUndefined();
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
