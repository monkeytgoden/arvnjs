import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services/i18n.service';
import { AuthService } from 'src/app/modules/authentication/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  langs = ['en', 'vi'];
  localStorage;
  constructor(
    private authService: AuthService,
    private router: Router,
    public i18nService: I18nService
  ) { }

  ngOnInit() {
    this.localStorage = localStorage;
  }

  logout() {
    this.authService.logout()
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        }
      );
  }

}
