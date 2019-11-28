import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  constructor(
    public translateService: TranslateService
  ) { }

  public changeLang(lang) {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
  }

  getTranslateService() {
    return this.translateService;
  }
}
