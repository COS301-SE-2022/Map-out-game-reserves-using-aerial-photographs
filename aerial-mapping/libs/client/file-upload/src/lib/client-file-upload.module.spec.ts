import { async, TestBed } from '@angular/core/testing';
import { ClientFileUploadModule } from './client-file-upload.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClientFileUploadModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ClientFileUploadModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientFileUploadModule).toBeDefined();
  });
});
