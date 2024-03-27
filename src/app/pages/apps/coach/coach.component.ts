import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddCoachComponent } from './add/add.component';






export interface Coach {
  idCoach: number;
  nameCoach: string;
  password: string;
  email: string;
  Rapport: string;
}

const coachs = [
  {
    idCoach: 1,
    nameCoach: 'John Doe',
    email: 'coach@gmail.com',
    Rapport:'rapport',
   
  },
  {
    idCoach: 2,
    nameCoach: 'John Doe',
    email: 'coach@gmail.com',
    Rapport:'rapport',
   
  },
  {
    idCoach: 3,
    nameCoach: 'John Doe',
    email: 'coach@gmail.com',
    Rapport:'rapport',
   
  },
  {
    idCoach: 4,
    nameCoach: 'John Doe',
    email: 'coach@gmail.com',
    Rapport:'rapport',
   
  },
  {
    idCoach: 5,
    nameCoach: 'John Doe',
    email: 'coach@gmail.com',
    Rapport:'rapport',
   
  },
  {
    idCoach: 6,
    nameCoach: 'John Doe',
    email: 'coach@gmail.com',
    Rapport:'rapport',
   
  },
  {
    idCoach: 7,
    nameCoach: 'John Doe',
    email: 'coach@gmail.com',
    Rapport:'rapport',
   
  },

];

@Component({
  templateUrl: './coach.component.html',
})
export class AppCoachComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'nameCoach',
    'email',
    'Rapport',
    'action'

  ];
  dataSource = new MatTableDataSource(coachs);
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
    this.dataSource.data.unshift({
      idCoach: coachs.length + 1,
      nameCoach: row_obj.nameCoach,
      email: row_obj.email,
      Rapport: row_obj.Rapport,
  
     
    });
    this.dialog.open(AppAddCoachComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Coach): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idCoach === row_obj.idCoach) {
        value.nameCoach = row_obj.nameCoach;
        value.email = row_obj.email;
        value.Rapport = row_obj.Rapport;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Coach): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idCoach !== row_obj.idCoach;
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
