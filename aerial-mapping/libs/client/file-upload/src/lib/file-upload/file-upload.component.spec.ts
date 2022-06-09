import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FileUploadComponent } from './file-upload.component';
import { ClientApiService } from '@aerial-mapping/client/shared/services';


describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsNavbarModule, HttpClientModule, RouterTestingModule],
      declarations: [FileUploadComponent],
      providers: [HttpClient, ClientApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
