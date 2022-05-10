import { async, TestBed } from '@angular/core/testing';
import { ComponentsNavbarModule } from './client-shared-components-navbar.module';

describe('ClientSharedComponentsNavbarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsNavbarModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ComponentsNavbarModule).toBeDefined();
  });
});
