import { async, TestBed } from '@angular/core/testing';
import { ComponentsTooltipModule } from './client-shared-components-tooltip.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClientSharedComponentsTooltipModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ComponentsTooltipModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ComponentsTooltipModule).toBeDefined();
  });
});
