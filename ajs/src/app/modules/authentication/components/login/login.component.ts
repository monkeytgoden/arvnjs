import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services/i18n.service';
import { NotifyService } from 'src/app/core/services/notify.service';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  returnUrl: string;
  loading = false;
  public localStorage = localStorage;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public i18nService: I18nService,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    if (this.authService.isAuthenticated()) {
      // TODO navigate to this.returnUrl after implement canActive
      this.router.navigate(['home']);
    }
  }

  login() {
    if (this.userName.invalid || this.password.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.userName.value, this.password.value, this.returnUrl)
      .pipe(first())
      .subscribe(
        data => {
          this.userName.reset();
          this.password.reset();
          this.router.navigate(['/home']);
        },
        error => {
          if (error.error.code !== undefined &&
            error.error.message !== undefined &&
            error.error.code === 'OP_EXCEPTION') {
            this.notifyService.openSnackBar(error.error.message);
          } else {
            this.notifyService.openSnackBar(this.i18nService.getTranslateService().instant('LOGIN.incorrectUserNameOrPassword'));
          }
          this.loading = false;
        }
      );
  }
}
