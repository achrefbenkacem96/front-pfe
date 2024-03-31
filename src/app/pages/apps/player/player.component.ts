import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddPlayerComponent } from './add/add.component';
import { Player } from 'src/app/models/Player';
import { UsersService } from '../services/users.service';
import { PlayerService } from '../services/player.service';


 


 
@Component({
  templateUrl: './player.component.html',
})
export class AppPlayerComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'fullName',
    'dateOfBirth',
    'countryOfResidence',
    'whatsappPhoneNumber',
    'discordId',
    'mailAddress',
    'contractStart',
    'contractEnd',
    'salary',
    'jerseySize',
    'socialMediaLinkFollowers',
    'action',
  ];
  players: Player[] = [];
  role: any = localStorage.getItem('role');
  userId: any = localStorage.getItem('userId');
  dataSource = new MatTableDataSource(this.players);
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe, public servicePlayer: PlayerService) { }

  ngAfterViewInit(): void {
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }
  loadData(){
    if ( this.role == "ROLE_ADMIN" || this.role == "ROLE_MANAGER") {
      this.loadPlayers()
      
    } else if ( this.role == "ROLE_PLAYER" ){
      
      this.getPlayerById() 
    }
  }
  getPlayerById(){
    this.servicePlayer.getPlayerById(this.userId).subscribe({
      next: (res: any) => {  
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ res:", res);
        this.players =[res];  
        this.dataSource.data = this.players;  
      },
      error: (err) => {
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ err:", err);
      }
    });
  }
  loadPlayers() {
    this.servicePlayer.getAllPlayers().subscribe({
      next: (res: any) => { // Specify the type of 'res' as 'any[]'
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ res:", res);
        this.players = res; // Parse the response
        this.dataSource.data = res; // Update the dataSource with the new data
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
    const dialogRef = this.dialog.open(AppPlayerDialogContentComponent, {
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
  addRowData(row_obj: Player): void {
    this.servicePlayer.addPlayer(row_obj).subscribe({
      next: (response) => {
        console.log("User added successfully:", response);
        this.loadData()
      },
      error: (error) => {
        console.error("Error adding user:", error);
        // Optionally handle error response here
      }
    });
    this.dialog.open(AppAddPlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Player): boolean | any {
    this.servicePlayer.updatePlayer(row_obj.id,row_obj).subscribe({
      next: (response) => {
        console.log("User added successfully:", response);
        this.loadData()
      },
      error: (error) => {
        console.error("Error adding user:", error);
        // Optionally handle error response here
      }
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Player): boolean | any {
    this.servicePlayer.deletePlayer(row_obj.id).subscribe({
      next: () => {
        this.loadData()
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
  templateUrl: 'player-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppPlayerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppPlayerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Player,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.dateOfBirth !== undefined) {
      this.local_data.dateOfBirth = this.datePipe.transform(
        new Date(this.local_data.dateOfBirth),
        'yyyy-MM-dd',
      );
    }
    if (this.local_data.contractStart !== undefined) {
      this.local_data.contractStart = this.datePipe.transform(
        new Date(this.local_data.contractStart),
        'yyyy-MM-dd',
      );
    }
    if (this.local_data.contractEnd !== undefined) {
       this.local_data.contractEnd= this.datePipe.transform(
        new Date(this.local_data.contractEnd),
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
