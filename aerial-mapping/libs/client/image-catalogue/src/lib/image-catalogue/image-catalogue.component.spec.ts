import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { ClientApiService } from '@aerial-mapping/client/shared/services';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageCatalogueComponent } from './image-catalogue.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

describe('ImageCatalogueComponent', () => {
  let component: ImageCatalogueComponent;
  let fixture: ComponentFixture<ImageCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ComponentsNavbarModule, RouterTestingModule, HttpClientModule, MatIconModule, MatFormFieldModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule],
      providers: [ClientApiService],
      declarations: [ImageCatalogueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
