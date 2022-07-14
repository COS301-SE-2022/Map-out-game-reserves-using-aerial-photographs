import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCatalogueComponent } from './image-catalogue.component';

describe('ImageCatalogueComponent', () => {
  let component: ImageCatalogueComponent;
  let fixture: ComponentFixture<ImageCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCatalogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
