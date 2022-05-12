import { async, TestBed } from '@angular/core/testing';
import { ClientMapcollectionModule } from './client-mapcollection.module';
// import { MaterialModule } from './materials/material.module';

describe('ClientMapcollectionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientMapcollectionModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientMapcollectionModule).toBeDefined();
  });
});
