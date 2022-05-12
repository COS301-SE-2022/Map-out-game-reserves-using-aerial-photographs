import { async, TestBed } from '@angular/core/testing';
import { BarChartModule } from './bar-chart.module';

describe('BarChartModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BarChartModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(BarChartModule).toBeDefined();
  });
});
