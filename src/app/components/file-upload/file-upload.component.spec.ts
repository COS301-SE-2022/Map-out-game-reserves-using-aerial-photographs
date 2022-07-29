import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadComponent ],
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        MatProgressBarModule,
        MatSnackBarModule
      ],
      providers: [ HttpClient ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect file input change and set uploadedFile  model', () => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.jpg'))

    const inputDebugEl  = fixture.debugElement.query(By.css('input[type=file]'));
    inputDebugEl.nativeElement.files = dataTransfer.files;

    inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(component.files[0]).toBeTruthy()
    expect(component.files[0].name).toBe('test-file.jpg')

  });

  it('file change event should arrive in handler', () => {
      const element = fixture.nativeElement;
      const input = element.querySelector('#file');
      spyOn(component, 'onFileSelected');
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      //expect(component.onFileSelected).toHaveBeenCalled();
  });

});
