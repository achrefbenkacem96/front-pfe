import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddClubComponent } from './add/add.component';




export interface Club {
  idClub: number;
  clubName: string;
  description: string;
  dateCreation: Date;
}

const clubs = [
  {
    idClub: 1,
    clubName: ' Gark',
    description: "Gark description",
    dateCreation:  new Date('04-2-2020'),
  },
 
  {
    idClub: 2,
    clubName: ' Gark',
    description: "Gark description",
    dateCreation:  new Date('04-2-2020'),
  },
  {
    idClub: 3,
    clubName: ' Gark',
    description: "Gark description",
    dateCreation:  new Date('04-2-2020'),
  },
  {
    idClub: 4,
    clubName: ' Gark',
    description: "Gark description",
    dateCreation:  new Date('04-2-2020'),
  },
  {
    idClub: 5,
    clubName: ' Gark',
    description: "Gark description",
    dateCreation:  new Date('04-2-2020'),
  },
];

@Component({
  templateUrl: './club.component.html',
})
export class AppClubComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'clubName',
    'description',
    'dateCreation',
    'action'

  ];
  dataSource = new MatTableDataSource(clubs);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppClubDialogContentComponent, {
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
  addRowData(row_obj: Club): void {
    this.dataSource.data.unshift({
      idClub: clubs.length + 1,
      clubName: row_obj.clubName,
      description: row_obj.description,
      dateCreation: row_obj.dateCreation,
    });
    this.dialog.open(AppAddClubComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Club): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idClub === row_obj.idClub) {
        value.clubName = row_obj.clubName;
        value.description = row_obj.description;
        value.dateCreation = row_obj.dateCreation;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Club): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idClub !== row_obj.idClub;
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'club-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppClubDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppClubDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Club,
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
