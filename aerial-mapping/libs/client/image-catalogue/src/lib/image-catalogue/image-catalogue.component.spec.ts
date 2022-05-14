import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageCatalogueComponent } from './image-catalogue.component';

describe('ImageCatalogueComponent', () => {
  let component: ImageCatalogueComponent;
  let fixture: ComponentFixture<ImageCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsNavbarModule, RouterTestingModule],
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
