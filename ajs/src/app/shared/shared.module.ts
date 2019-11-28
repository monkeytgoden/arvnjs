import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { ImgUploadComponent } from './components/img-upload/img-upload.component';
import { InputFormatDirective } from './directives/input-format.directive';
import { DateFormatPipe } from './pipes/date-format.pipe';

const MAT_MODULES = [
  MatDialogModule,
  MatButtonModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MAT_MODULES,
    TranslateModule
  ],
  declarations: [
    ConfirmPopupComponent,
    DateFormatPipe,
    InputFormatDirective,
    ImgUploadComponent
  ],
  exports: [
    DateFormatPipe,
    InputFormatDirective,
    ImgUploadComponent
  ],
  entryComponents: [
    ConfirmPopupComponent
  ]
})
export class SharedModule { }
