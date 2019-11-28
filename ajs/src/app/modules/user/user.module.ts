import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserComponent } from './components/user/user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';

const MAT_MODULES = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
];

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MAT_MODULES,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    AddUserComponent,
    UserDetailComponent
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    AddUserComponent
  ]
})
export class UserModule { }
