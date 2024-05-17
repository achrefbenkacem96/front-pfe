import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AppAddTeamComponent } from './add/add.component';
import { Team } from 'src/app/models/Team';
import { TeamService } from '../services/team.service';
import { ClubService } from '../services/club.service';
import { Observable, map, startWith } from 'rxjs';
import { Club } from 'src/app/models/Club';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


 

@Component({
  templateUrl: './team.component.html',
 
})
export class AppTeamComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  teams: Team[] = [];
  role: any = localStorage.getItem('role');
  displayedColumns: string[] = [
    '#',
    'teamName',
    'description',
    'dateCreation',
    'action'

  ];

  dataSource = new MatTableDataSource(this.teams);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe, public serviceTeam : TeamService, public serviceClub: ClubService) { }

  ngAfterViewInit(): void {
    this.loadTeams();
 
 
    this.dataSource.paginator = this.paginator;
  }


  

  loadTeams() {
    this.serviceTeam.getAllTeams().subscribe({
      next: (res: any) => {  
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ res:", res);
        this.teams = res;  
        this.dataSource.data = this.teams; 
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
    const dialogRef = this.dialog.open(AppTeamDialogContentComponent, {
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
  addRowData(row_obj: Team): void {
    this.serviceTeam.addTeam(row_obj).subscribe({
      next: (response) => {
        console.log("User added successfully:", response);
        this.loadTeams()
      },
      error: (error) => {
        console.error("Error adding user:", error);
        // Optionally handle error response here
      }
    });
    this.dialog.open(AppAddTeamComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Team): boolean | any {
    this.serviceTeam.updateTeam(row_obj.id,row_obj).subscribe({
      next: (response) => {
        console.log("User added successfully:", response);
        this.loadTeams()
      },
      error: (error) => {
        console.error("Error adding user:", error);
        // Optionally handle error response here
      }
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Team): boolean | any {
    this.serviceTeam.deleteTeam(row_obj.id).subscribe({
      next: () => {
        this.loadTeams()
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
  templateUrl: 'team-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppTeamDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  filteredClubs: Observable<Club[]>;
  myControl = new FormControl('');
  clubs: Club[] = [];

  constructor(
    public datePipe: DatePipe,
    public serviceClub: ClubService,
    public dialogRef: MatDialogRef<AppTeamDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Team,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.dateCreation !== undefined) {
      this.local_data.dateCreation = this.datePipe.transform(
        new Date(this.local_data.dateCreation),
        'yyyy-MM-dd',
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    }
    this.serviceClub.getAllClubs().subscribe({
      next: (res: any[]) => { // Specify the type of 'res' as 'any[]'
        return this.clubs = res

      },
      error: (err) => {
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ err:", err);
      }
    });
    this.filteredClubs = this.myControl.valueChanges.pipe(
      startWith(''),
      map(club =>  (club ? this._filterClubs(club) : this.clubs.slice())),
    );
  }
  private _filterClubs(value: string): any[] {
    const filterValue = value.toLowerCase();
 
    return  this.clubs.filter((option:any) => option.name.toLowerCase().includes(filterValue));
      
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
