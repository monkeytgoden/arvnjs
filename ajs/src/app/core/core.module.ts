import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatOptionModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { I18nService } from './services/i18n.service';
import { UploadFileService } from './services/upload-file.service';
import { HeaderComponent } from './components/header/header.component';

const MatModules = [
  MatButtonModule,
  MatSelectModule,
  MatOptionModule,
  MatSnackBarModule
];
@NgModule({
  imports: [
    CommonModule,
    MatModules,
    TranslateModule,
    HttpClientModule
  ],
  declarations: [
    PageNotFoundComponent,
    HeaderComponent
  ],
  providers: [
    UploadFileService,
    I18nService
  ],
  exports: [
    PageNotFoundComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
