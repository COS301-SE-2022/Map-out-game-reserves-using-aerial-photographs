import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { APIService, CreateImagesMutation } from 'src/app/API.service';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let apiService: APIService;

  const controllerServiceMock: any = jasmine.createSpyObj('ControllerService', ['']);
  const apiServiceMock: any = jasmine.createSpyObj('APIService', ['CreateImages']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadComponent ],
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
      ],
      providers: [ HttpClient, APIService ]
    })
    .compileComponents();

    apiService = TestBed.get(APIService);
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have as title 'file-upload-component'", () => {
    // const app = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('file-upload-component');
  });

  it("testing uploadImages() function with no files", (done) => {
    component.makeThumbnails = jasmine.createSpy();


    const result: Promise<any> = component.uploadImages("thisisthecollectionid");
    result.then((resp: any) => {
      expect(component.makeThumbnails).toHaveBeenCalled();
      expect(resp);
      done();
    }).catch((error) => {
      done.fail(error);
    });
  });

  it("testing uploadImages() function with 2 mock files", (done) => {
    //apiServiceMock.CreateImages.and.returnValue(Promise.resolve(true));
    const resp: CreateImagesMutation = {
      __typename: 'Images',
      imageID: 'sdsd',
      createdAt: '',
      updatedAt: ''
    }
    spyOn(apiService, 'CreateImages').and.returnValue(Promise.resolve(resp));
    component.makeThumbnails = jasmine.createSpy();
    component.uploadToS3 = jasmine.createSpy();
    spyOn(component, 'resizeImage').and.returnValue(Promise.resolve(new Blob(["content"])));
    console.log = jasmine.createSpy();
    //const promisesSpy = jasmine.createSpy('promises',  );

    const str = 'testblobcontent';
    const blob = new Blob([str])
    const file1 = new File([blob], 'pic1.png', {
      type: 'image/png',
    });
    const file2 = new File([blob], 'pic2.png', {
      type: 'image/png',
    });
    component.files.push(file1);
    component.files.push(file2);

    const result: Promise<any> = component.uploadImages("thisisthecollectionid");
    result.then((resp: any) => {
      expect(apiService.CreateImages).toHaveBeenCalled();
      expect(component.resizeImage).toHaveBeenCalled();
      expect(component.makeThumbnails).toHaveBeenCalled();
      expect(component.uploadToS3).toHaveBeenCalled();
      expect(resp);
      done();
    }).catch(() => {
      done.fail('The promise was rejected.');
    });
  });
});
