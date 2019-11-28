import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NotifyService } from 'src/app/core/services/notify.service';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user;
  @ViewChild('userAddress', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.userService.getUserById(params.userId);
      })
    ).subscribe(user => {
      this.user = user;
      this.showLocation(user);
    });
  }

  showLocation(user) {
    if (!user || !user.address || !user.address.latitude || !user.address.longitude) {
      return;
    }
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    const location = new google.maps.LatLng(user.address.latitude, user.address.longitude);
    this.map.setCenter(location);
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.BOUNCE
    });
  }

  activeDeactive(status) {
    this.user.status = status;
    this.userService.updateUser(this.user).subscribe(
      data => {
        this.notifyService.openSnackBar(data.message);
      },
      error => {
        this.notifyService.openSnackBar('An error occurred, please try again?');
      });
  }
}
