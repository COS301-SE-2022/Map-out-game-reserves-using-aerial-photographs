import { async, TestBed } from '@angular/core/testing';
import { DashboardViewModule } from './dashboard-view.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, DashboardViewModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DashboardViewModule).toBeDefined();
  });
});
