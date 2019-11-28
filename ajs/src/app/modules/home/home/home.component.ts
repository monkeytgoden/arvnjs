import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  centerPoint = new google.maps.LatLng(0, 0);
  mapOptions: google.maps.MapOptions = {
    center: this.centerPoint,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP, // https://www.w3schools.com/graphics/google_maps_types.asp
    // disableDefaultUI: true,
    // rotateControl: true,
    // mapTypeControl: true,
    // mapTypeControlOptions: {
    //   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    //   position: google.maps.ControlPosition.TOP_CENTER
    // }
  };


  constructor() { }

  ngAfterViewInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({ map: this.map });

    // this.executeMarker(new google.maps.LatLng(21.0322705, 105.7823487));
    this.placeUserLocation();
    // this.executePolyline();
    // this.executePolygon();
    // this.executeCircle();
    this.calculateAndDisplayRoute(directionsService, directionsDisplay);

    google.maps.event.addListener(this.map, 'click', (event) => {
      this.placeMarker(this.map, event.latLng);
    });

    this.drawClock();
  }

  executeMarker(location) {
    this.map.setCenter(location);
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.BOUNCE
    });
    // marker.setMap(this.map);

    const infowindow = new google.maps.InfoWindow({
      content: 'Hello World!'
    });

    // infowindow.open(this.map, marker);

    google.maps.event.addListener(marker, 'click', () => {
      this.map.setZoom(18);
      this.map.setCenter(marker.getPosition());
      infowindow.open(this.map, marker);
    });
  }

  placeMarker($map, location) {
    const marker = new google.maps.Marker({
      position: location,
      map: $map
    });
    const infowindow = new google.maps.InfoWindow({
      content: location.lat() +
        ', ' + location.lng()
    });
    infowindow.open($map, marker);
  }

  executePolyline() {
    const myTrip = [
      new google.maps.LatLng(21.0306189, 105.7839384),
      new google.maps.LatLng(21.0348047664461, 105.78741454288331)
    ];

    const polyline = new google.maps.Polyline({
      path: myTrip,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2
    });
    polyline.setMap(this.map);
  }

  executePolygon() {
    const myTrip = [
      new google.maps.LatLng(21.0306189, 105.7839384),
      new google.maps.LatLng(21.0284297, 105.7782687),
      new google.maps.LatLng(21.0168067, 105.791855)
    ];

    const polygon = new google.maps.Polygon({
      paths: myTrip,
      strokeColor: 'green',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.4
    });
    polygon.setMap(this.map);
  }

  executeCircle() {
    const centerPoint = new google.maps.LatLng(21.0348047664461, 105.78741454288331);

    const circle = new google.maps.Circle({
      center: centerPoint,
      radius: 500,
      strokeColor: 'blue',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: 'orange',
      fillOpacity: 0.4
    });
    circle.setMap(this.map);
  }

  placeUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.executeMarker(location);
      });
    }
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: new google.maps.LatLng(21.0168067, 105.791855),
      destination: new google.maps.LatLng(21.0348047664461, 105.78741454288331),
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        const distance = response.routes[0].legs[0].distance;
      } else {
      }
    });
  }

  drawClock() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    setInterval(() => {
      this.drawFace(ctx, radius);
      this.drawNumbers(ctx, radius);
      this.drawTime(ctx, radius);
    }, 1000);
  }

  drawFace(ctx, radius) {
    let grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }

  drawNumbers(ctx, radius) {
    let ang;
    let num;
    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (num = 1; num < 13; num++) {
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    // hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    // minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
  }

  drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}
