import { async, TestBed } from '@angular/core/testing';
import { ClientLoginModule } from './client-login.module';

describe('ClientLoginModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientLoginModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientLoginModule).toBeDefined();
  });
});
