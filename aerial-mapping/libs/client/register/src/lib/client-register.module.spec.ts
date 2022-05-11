import { async, TestBed } from '@angular/core/testing';
import { ClientRegisterModule } from './client-register.module';
// import { MaterialModule } from './materials/material.module';

describe('ClientRegisterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientRegisterModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientRegisterModule).toBeDefined();
  });
});
