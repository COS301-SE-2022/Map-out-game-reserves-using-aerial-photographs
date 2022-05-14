import { async, TestBed } from '@angular/core/testing';
import { ClientSharedComponentsFooterModule } from './client-shared-components-footer.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClientSharedComponentsFooterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ClientSharedComponentsFooterModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientSharedComponentsFooterModule).toBeDefined();
  });
});
