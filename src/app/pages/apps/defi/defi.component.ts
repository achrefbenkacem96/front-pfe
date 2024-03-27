import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddDefiComponent } from './add/add.component';




export interface Defi {
  idMatch: number;
  matchName: string;
  dateStart: Date;
  result: string;
}

const defis = [
  {
    idMatch: 1,
    matchName: ' valo',
    dateStart:new Date('04-2-2020'),
    result:   "win",
  },
 
  {
    idMatch: 2,
    matchName: ' lol',
    dateStart:new Date('04-2-2020'),
    result:   "win",
  },
  {
    idMatch: 3,
    matchName: ' csgo',
    dateStart:new Date('04-2-2020'),
    result:   "win",
  },
  {
    idMatch: 4,
    matchName: ' wow',
    dateStart:new Date('04-2-2020'),
    result:   "win",
  },
];

@Component({
  templateUrl: './defi.component.html',
})
export class AppDefiComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'matchName',
    'dateStart',
    'result',
    'action'

  ];
  dataSource = new MatTableDataSource(defis);
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
    const dialogRef = this.dialog.open(AppDefiDialogContentComponent, {
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
  addRowData(row_obj: Defi): void {
    this.dataSource.data.unshift({
      idMatch: defis.length + 1,
      matchName: row_obj.matchName,
      dateStart: row_obj.dateStart,
      result: row_obj.result,
    });
    this.dialog.open(AppAddDefiComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Defi): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idMatch === row_obj.idMatch) {
        value.matchName = row_obj.matchName;
        value.dateStart = row_obj.dateStart;
        value.result = row_obj.result;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Defi ): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idMatch !== row_obj.idMatch;
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'defi-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppDefiDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppDefiDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Defi,
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
