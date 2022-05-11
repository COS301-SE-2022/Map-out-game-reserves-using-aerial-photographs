import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapcollectionComponent } from './mapcollection.component';

describe('MapcollectionComponent', () => {
  let component: MapcollectionComponent;
  let fixture: ComponentFixture<MapcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapcollectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
