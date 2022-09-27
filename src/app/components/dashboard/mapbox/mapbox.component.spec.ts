import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapboxComponent } from './mapbox.component';

describe('MapboxComponent', () => {
  let component: MapboxComponent;
  let fixture: ComponentFixture<MapboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should set selectedCluster when clicked', () => {
  //   spyOn(component,'selectCluster').and.callThrough();
  //   fixture.debugElement.query(By.css('.marker-cluster')).nativeElement.click();
  //   fixture.detectChanges();
  //   expect(component.selectCluster).toHaveBeenCalled();
  //   expect(component.selectedCluster).toBe('whatever you are expecting')
  // });

  // const jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  //   GeolocateControl: jest.fn(),
  //   Map: jest.fn(() => ({
  //     addControl: jest.fn(),
  //     on: jest.fn(),
  //     remove: jest.fn(),
  //   })),
  //   NavigationControl: jest.fn(),
  // }));
});
