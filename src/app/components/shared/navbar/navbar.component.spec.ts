import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Might be untestable

  // it('test onClick()', () => {
  //   Object.defineProperty(window.location, 'reload', { configurable: true, });
  //   let spy = spyOn(window.location, 'reload');
  //   jasmine.clock().install();
  //   component.onClick('test');
  //   jasmine.clock().tick(1);
  //   expect(spy).toHaveBeenCalled();
  //   jasmine.clock().uninstall();
  // });
});
