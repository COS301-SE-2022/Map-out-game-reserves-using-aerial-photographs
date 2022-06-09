import { async, TestBed } from '@angular/core/testing';
import { ClientDashboardModule } from './client-dashboard.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClientDashboardModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ClientDashboardModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientDashboardModule).toBeDefined();
  });
});
