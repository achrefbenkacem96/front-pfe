import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddUserComponent } from './add/add.component';
import { UsersService } from '../services/users.service';



export interface User {
  userId: number;
  username: string;
  password: string;
  enable: boolean;
  email: string;
  roles: string;
}

@Component({
  templateUrl: './user.component.html',
})
export class AppUserComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  users: User[] = [];
  role: any = localStorage.getItem('role');
  displayedColumns: string[] = [
    '#',
    'username',
    'enable',
    'email',
    'roles',
    'action'

  ];

  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe, public serviceUser: UsersService) { }

  ngAfterViewInit(): void {
    if(this.role === 'ROLE_ADMIN' || this.role === 'ROLE_MANAGER'){
      this.loadUsers()
    }
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.serviceUser.getAll().subscribe({
      next: (res: any) => { // Specify the type of 'res' as 'any[]'
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ res:", res);
        this.users = this.parseResponseToUser(res).flat(); // Parse the response
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~  this.users:",  this.users)
        this.dataSource.data = this.parseResponseToUser(res).flat(); // Update the dataSource with the new data
      },
      error: (err) => {
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ err:", err);
      }
    });
  }
  private parseResponseToUser(response: any[]): User[] {
    //@ts-ignore
    return response.map(user => {
      let rolesString = user.roles.map((role: any) => role.name).join(', ');
   
      // Check if the current user has the role "ROLE_MANAGER" and if rolesString contains only "ROLE_ADMIN"
      if (this.role === "ROLE_MANAGER" && rolesString === "ROLE_ADMIN") {
        // Return an empty array if the conditions are met
        return [];
      }
  
      // Otherwise, return the user object as it is
      return {
        userId: user.id,
        username: user.username,
        password: user.password,
        enable: user.enable,
        email: user.email,
        roles: rolesString
      };
      //@ts-ignore
    }); 
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppUserDialogContentComponent, {
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
  addRowData(row_obj: User): void {
    console.log("🚀 ~ AppUserComponent ~ addRowData ~ row_obj:", row_obj)
    const userAddRequest: UserAddRequest = {
 
        username: row_obj.username,
        password: row_obj.password,
        email: row_obj.email,
        enable: row_obj.enable || false, // Assuming enable defaults to false if not provided
      role: [row_obj.roles] || ['ROLE_USER'] // Assuming default role is 'ROLE_USER' if not provided
    };

    // Call your addUser service passing the transformed userAddRequest
    this.serviceUser.addUser(userAddRequest).subscribe({
      next: (response) => {
        console.log("User added successfully:", response);
        this.loadUsers()
      },
      error: (error) => {
        console.error("Error adding user:", error);
        // Optionally handle error response here
      }
    });

    // Open your dialog and render rows as needed
    this.dialog.open(AppAddUserComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: User): void {
    const userAddRequest: any = {
      user: {
        username: row_obj.username,
        password: row_obj.password,
        email: row_obj.email,
        enable: row_obj.enable || false, // Assuming enable defaults to false if not provided
      },
      role: row_obj.roles || 'ROLE_USER' // Assuming default role is 'ROLE_USER' if not provided
    };
    this.serviceUser.update(userAddRequest, row_obj.userId).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);

        this.loadUsers()
      },
      error: (error) => {
        console.error('Error updating user:', error);
        // You may handle any error message or other actions here
      }
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: User): void {
    this.serviceUser.delete(row_obj.userId).subscribe({
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
  templateUrl: 'user-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppUserDialogContentComponent {
  role: string |null = localStorage.getItem('role');
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppUserDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User,
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

interface UserAddRequest {
 
    username: string;
    password: string;
    email: string;
    enable: boolean;
  
  role: any;
}