import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

import { UserService } from '../../user.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['avatar', 'user_name', 'full_name', 'email', 'status', 'created_date', 'controls'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private notifyService: NotifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(type, user, e): void {
    switch (type) {
      case 'add':
        const addDialogRef = this.dialog.open(AddUserComponent, {
          width: 'auto',
          data: {
            type: 'add'
          }
        });
        addDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.addUser({...result, user_name: result.user_name.toLowerCase()});
          }
        });
        break;
      case 'edit':
        e.stopPropagation();
        const editDialogRef = this.dialog.open(AddUserComponent, {
          width: 'auto',
          data: { type: 'edit', ...user }
        });
        editDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.updateUser({...result, user_name: result.user_name.toLowerCase()});
          }
        });
        break;
      case 'delete':
        e.stopPropagation();
        const deleteDialogRef = this.dialog.open(ConfirmPopupComponent, {
          width: 'auto',
          data: { message: 'Are you sure you want to delete this user?' }
        });
        deleteDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.deleteUser(user);
          }
        });
        break;
      default:
        break;
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  addUser(user) {
    this.userService.addUser(user).subscribe(
      data => {
        this.notifyService.openSnackBar(data.message);
        this.getUsers();
      },
      error => {
        this.notifyService.openSnackBar('An error occurred, please try again?');
      });
  }

  updateUser(user) {
    this.userService.updateUser(user).subscribe(
      data => {
        this.notifyService.openSnackBar(data.message);
        this.getUsers();
      },
      error => {
        this.notifyService.openSnackBar('An error occurred, please try again?');
      });
  }

  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      data => {
        this.notifyService.openSnackBar(data.message);
        this.getUsers();
      },
      error => {
        this.notifyService.openSnackBar('An error occurred, please try again?');
      });
  }

  openUserDetail(user) {
    this.router.navigate(['user', user.user_name, user._id]);
  }

}
