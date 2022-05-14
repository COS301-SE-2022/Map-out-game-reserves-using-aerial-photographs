import { async, TestBed } from '@angular/core/testing';
import { ClientImageCatalogueModule } from './client-image-catalogue.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClientImageCatalogueModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ClientImageCatalogueModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientImageCatalogueModule).toBeDefined();
  });
});
