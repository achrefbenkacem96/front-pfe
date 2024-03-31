import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddCoachComponent } from './add/add.component';
import { Coach } from 'src/app/models/Coach';
import { CoachService } from '../services/coach.service';





 

@Component({
  templateUrl: './coach.component.html',
})
export class AppCoachComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  coachs: Coach[] = [];
  role: any = localStorage.getItem('role');
  displayedColumns: string[] = [
    '#',
    'email' ,
    'username' ,
    'rapport' ,
    'action'
  ];
  dataSource = new MatTableDataSource(this.coachs);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe, public servicCoach: CoachService) { }

  ngAfterViewInit(): void {
    this.loadUsers()

    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.servicCoach.getAllCoaches().subscribe({
      next: (res: any) => {  
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ res:", res);
        this.coachs =res;  
        this.dataSource.data = this.coachs;  
      },
      error: (err) => {
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ err:", err);
      }
    });
  }
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppCoachDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Coach): void {
    this.servicCoach.addCoach(row_obj).subscribe({
      next: (response) => {
        console.log("User added successfully:", response);
        this.loadUsers()
      },
      error: (error) => {
        console.error("Error adding user:", error);
        // Optionally handle error response here
      }
    });
    this.dialog.open(AppAddCoachComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Coach): boolean | any {
    this.servicCoach.updateCoach(row_obj.id,row_obj).subscribe({
      next: (response) => {
        console.log("User added successfully:", response);
        this.loadUsers()
      },
      error: (error) => {
        console.error("Error adding user:", error);
        // Optionally handle error response here
      }
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Coach): boolean | any {
    this.servicCoach.deleteCoach(row_obj.id).subscribe({
      next: () => {
        this.loadUsers()
        console.log('User deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'coach-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppCoachDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppCoachDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Coach,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd',
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    }
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }
}
