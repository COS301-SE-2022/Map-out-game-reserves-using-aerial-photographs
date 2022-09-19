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
        HttpClientModule
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
        HttpClient
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Attempt at setTimeout test
  // it('test setTimeout() for spinners', () => {
  //   jasmine.clock().uninstall();

  //   component.spinners = [
  //     document.createElement(
  //       '<mat-progress-spinner mode="indeterminate" class = "spinner" diameter = "50" style = "z-index: 1;"></mat-progress-spinner>'
  //     ),
  //     document.createElement(
  //       '<mat-progress-spinner mode="indeterminate" class = "spinner" diameter = "50" style = "z-index: 1;"></mat-progress-spinner>'
  //     ),
  //   ];
  //   jasmine.clock().install();
  //   jasmine.clock().tick(4000);
  //   expect(component.spinners[0].style.display).toBe('none');
  //   expect(component.spinners[1].style.display).toBe('none');
  //   jasmine.clock().uninstall();
  // });

  // it('test onDeleteClick() with mock try again', () => {
  //   let router = fixture.debugElement.injector.get(Router);
  //   let spy = router.navigateByUrl as jasmine.Spy;
  //   component.onDeleteClick(true);
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('dialog should be closed after onDeleteClick()', () => {
  //   let spy = spyOn(component.dialogRef, 'close').and.callThrough();
  //   component.onDeleteClick(false);
  //   expect(spy).toHaveBeenCalled();
  // });

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
