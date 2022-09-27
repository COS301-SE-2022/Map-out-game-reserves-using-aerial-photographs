import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'aerial-mapping-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit, AfterViewInit {
  style = 'mapbox://styles/mapbox/satellite-streets-v11';
  lat = -25.8825;
  lng = 28.2639;
  mapContainer: HTMLElement | undefined;

  //returns points of interest to the mapbox
  getMarkers() {
    const geoJson = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: ['-25.8825', '28.2639'],
        },
        properties: {
          message: 'Reit Vlei Nature Reserve',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: ['77.350048', '12.953847'],
        },
        properties: {
          message: 'bangulare',
        },
      },
    ];
    return geoJson;
  }

  constructor() {}
  ngOnInit(): void {}

  //loads the mapbox with points of interest
  ngAfterViewInit() {
    this.mapContainer = <HTMLElement>document.getElementById('map');
    (mapboxgl as typeof mapboxgl).accessToken =
      'pk.eyJ1IjoiY2dvbmNhbHZlczA5MSIsImEiOiJjbDdvdjB4NnUxMTgxM29uYjB0djEwYWw4In0.Yazsev1lNiyqs-qyUD6-Pg';
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.style,
      zoom: 11,
      center: [this.lng, this.lat],
    });
    map.addControl(new mapboxgl.NavigationControl());
    const markers = this.getMarkers();
    const data = {
      type: 'FeatureCollection',
      features: markers,
    };

    map.on('load', () => {
      map.addSource('marker', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [25.88089319102171, -28.263810842208677],
              },
              properties: {
                message: 'Reit Vlei Nature Reserve',
              },
            },
          ],
        },
      });
      map.addLayer({
        id: 'customMarketid',
        source: 'marker',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-image': 'marker-15',
          'text-offset': [0, 1.5],
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2,
        },
      });
    });
  }
}
