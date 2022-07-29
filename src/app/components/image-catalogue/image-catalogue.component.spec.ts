import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Images, FlightDetails, ImageCollection, GamePark, Map } from 'src/app/API.service';

import { ImageCatalogueComponent } from './image-catalogue.component';

describe('ImageCatalogueComponent', () => {
  let component: ImageCatalogueComponent;
  let fixture: ComponentFixture<ImageCatalogueComponent>;

  //Z is trying tests

  const park: GamePark = {
    __typename: 'GamePark',
    parkID: '004a9009-6512-4dd9-a82c-157a247175b6',
    park_name: 'Rietvlei Nature Reserve',
    park_location: '25.8825° S, 28.2639° E',
    park_address: '4 Game Reserve Ave, Rietvallei 377-Jr, Pretoria, 0181',
    createdAt: '',
    updatedAt: '',
    _version: 1,
    _lastChangedAt: 1
  };

  const flight: FlightDetails = {
    __typename: 'FlightDetails',
    flightID: 'c2d1ade5-9a62-464f-8a7f-dc27768d48c2',
    flight_height: 300,
    flight_type: 'drone',
    pilotID: 'jaksdjkasjd',
    createdAt: '',
    updatedAt: '',
    _version: 1,
    _lastChangedAt: 1,
  };

  const image: Images = {
    __typename: "Images",
    imageID: 'jaksdjkasjd',
    collectionID: 'b12f8e2b-5636-439e-8971-23054e1109de',
    bucket_name: 'dylpickles-image-bucket',
    file_name: '27e72e28-cca7-46c4-a762-7277ab52186d-frame-161.png',
    createdAt: '',
    updatedAt: '',
    _version: 1,
    _lastChangedAt: 1
  }

  const collec: ImageCollection = {
    __typename: 'ImageCollection',
    collectionID: 'b12f8e2b-5636-439e-8971-23054e1109de',
    parkID: '004a9009-6512-4dd9-a82c-157a247175b6',
    completed: false,
    error: false,
    pending: false,
    flightID: 'c2d1ade5-9a62-464f-8a7f-dc27768d48c2',
    createdAt: '',
    updatedAt: '',
    _version: 1,
    _lastChangedAt: 1
  };

  const map: Map = {
    __typename: 'Map',
    mapID: 'drhdthdth',
    bucket_name: 'dylpickles-image-bucket',
    collectionID: 'b12f8e2b-5636-439e-8971-23054e1109de',
    createdAt: '',
    updatedAt: '',
    _version: 1,
    _lastChangedAt: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCatalogueComponent ],
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule
       ],
      providers: [ HttpClient ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // spyOn(component.mat-card,"open").and.callThrough();
    expect(component).toBeTruthy();
  });

});
