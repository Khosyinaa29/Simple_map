import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point'; // Import Point

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public basemapOptions: string[] = ['topo-vector', 'satellite', 'streets', 'dark-gray', 'hybrid']; // Array of basemap options
  public selectedBasemap: string = 'topo-vector'; // Default basemap

  private mapView: MapView | any;
  public latitude: number | any;
  public longitude: number | any;
  
  constructor() { }
  // public latitude: number | any;
  // public longitude: number | any;

  public async ngOnInit() {
    try {
      // Get the current position using Capacitor Geolocation
      const position = await Geolocation.getCurrentPosition();

      //Setting koordinat
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      //Penambahan koordinat sesuai lokasi
      console.log('Current Latitude:', this.latitude);
      console.log('Current Longitude:', this.longitude);

      //Membuat peta background
      const map = new Map({
        basemap: this.selectedBasemap
        // basemap: 'dark-gray-vector'
      });

      this.mapView = new MapView({
        container: 'container',
        map: map,
        zoom: 15,
        center: [this.longitude, this.latitude]
      });

      // Create the view and use the fetched latitude and longitude for the center point
      // const view = new MapView({
      //   container: 'container',
      //   map: map,
      //   zoom: 15,
      //   center: [this.longitude, this.latitude]
      // });

     // Mendefinisikan geometri titik menggunakan ArcGIS Point Class
     const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });

      // Define the symbol for the point (marker)
      const markerSymbol = {
         type: "picture-marker",
        url: 'assets/icon/markerr.png',
        color: [238, 75, 43],
        outline: {
          color: [],
          width: '100px',
          height: '100px'
        }
      };

      // Create a graphic for the point
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      this.mapView.graphics.add(pointGraphic);

      //Menambahkan marker ke map view
      // view.graphics.add(pointGraphic);

    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  public changeBasemap(basemap: string) {
    if (this.mapView) {
      this.mapView.map.basemap = basemap;
  }
}
}


