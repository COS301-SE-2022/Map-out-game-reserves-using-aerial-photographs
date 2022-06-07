import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGridComponent } from './map-grid.component';

describe('MapGridComponent', () => {
  let component: MapGridComponent;
  let fixture: ComponentFixture<MapGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
