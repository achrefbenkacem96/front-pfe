import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddContractPlayerComponent } from './add/add.component';


export interface Contract {
  idContractPlayer: number;
  detailsContractuels: string;
  termesFinanciers: string;
  clausesSpecifiques: string;
  objectifs: string[];
  datecontract: Date;
  leagalefullname?: string;
}

const contracts = [
  {
    idContractPlayer: 1,
    detailsContractuels: 'detailsContractuels1,detailsContractuels2',
    termesFinanciers: 'Seo termesFinanciers1; termesFinanciers2',
    clausesSpecifiques: 'clausesSpecifiques1,clausesSpecifiques2',
    objectifs:  ["Apprendre TypeScript", "Construire une application web", "Maîtriser Node.js"],
    datecontract: new Date('01-2-2020'),
  },
  {
    idContractPlayer: 2,
    detailsContractuels: 'detailsContractuels1,detailsContractuels2',
    termesFinanciers: 'Seo termesFinanciers1; termesFinanciers2',
    clausesSpecifiques: 'clausesSpecifiques1,clausesSpecifiques2',
    objectifs:  ["Apprendre TypeScript", "Construire une application web", "Maîtriser Node.js"],
    datecontract: new Date('01-2-2020'),
  },
  {
    idContractPlayer: 3,
    detailsContractuels: 'detailsContractuels1,detailsContractuels2',
    termesFinanciers: 'Seo termesFinanciers1; termesFinanciers2',
    clausesSpecifiques: 'clausesSpecifiques1,clausesSpecifiques2',
    objectifs:  ["Apprendre TypeScript", "Construire une application web", "Maîtriser Node.js"],
    datecontract: new Date('01-2-2020'),
  },
  {
    idContractPlayer: 4,
    detailsContractuels: 'detailsContractuels1,detailsContractuels2',
    termesFinanciers: 'Seo termesFinanciers1; termesFinanciers2',
    clausesSpecifiques: 'clausesSpecifiques1,clausesSpecifiques2',
    objectifs:  ["Apprendre TypeScript", "Construire une application web", "Maîtriser Node.js"],
    datecontract: new Date('01-2-2020'),
  },
  {
    idContractPlayer: 5,
    detailsContractuels: 'detailsContractuels1,detailsContractuels2',
    termesFinanciers: 'Seo termesFinanciers1; termesFinanciers2',
    clausesSpecifiques: 'clausesSpecifiques1,clausesSpecifiques2',
    objectifs:  ["Apprendre TypeScript", "Construire une application web", "Maîtriser Node.js"],
    datecontract: new Date('01-2-2020'),
  },
  {
    idContractPlayer: 6,
    detailsContractuels: 'detailsContractuels1,detailsContractuels2',
    termesFinanciers: 'Seo termesFinanciers1; termesFinanciers2',
    clausesSpecifiques: 'clausesSpecifiques1,clausesSpecifiques2',
    objectifs:  ["Apprendre TypeScript", "Construire une application web", "Maîtriser Node.js"],
    datecontract: new Date('01-2-2020'),
  },
  {
    idContractPlayer: 7,
    detailsContractuels: 'detailsContractuels1,detailsContractuels2',
    termesFinanciers: 'Seo termesFinanciers1; termesFinanciers2',
    clausesSpecifiques: 'clausesSpecifiques1,clausesSpecifiques2',
    objectifs:  ["Apprendre TypeScript", "Construire une application web", "Maîtriser Node.js"],
    datecontract: new Date('01-2-2020'),
  },
  {
    idContractPlayer: 8,
    detailsContractuels: 'detailsContractuels1,detailsContractuels2',
    termesFinanciers: 'Seo termesFinanciers1; termesFinanciers2',
    clausesSpecifiques: 'clausesSpecifiques1,clausesSpecifiques2',
    objectifs:  ["Apprendre TypeScript", "Construire une application web", "Maîtriser Node.js"],
    datecontract: new Date('01-2-2020'),
  },
  {
    idContractPlayer: 9,
    detailsContractuels: 'detailsContractuels1,detailsContractuels2',
    termesFinanciers: 'Seo termesFinanciers1; termesFinanciers2',
    clausesSpecifiques: 'clausesSpecifiques1,clausesSpecifiques2',
    objectifs:  ["Apprendre TypeScript", "Construire une application web", "Maîtriser Node.js"],
    datecontract: new Date('01-2-2020'),
  },
];

@Component({
  templateUrl: './contractplayer.component.html',
})
export class AppContractPlayerComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'detailsContractuels',
    'termesFinanciers',
    'clausesSpecifiques',
    'objectifs',
    'datecontract',
    'action'

  ];
  dataSource = new MatTableDataSource(contracts);
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
    const dialogRef = this.dialog.open(AppContractPlayerDialogContentComponent, {
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
  addRowData(row_obj: Contract): void {
    this.dataSource.data.unshift({
      idContractPlayer: contracts.length + 1,
      detailsContractuels: row_obj.detailsContractuels,
      termesFinanciers: row_obj.termesFinanciers,
      clausesSpecifiques: row_obj.clausesSpecifiques,
      objectifs: row_obj.objectifs,
      datecontract: new Date(),
    });
    this.dialog.open(AppAddContractPlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Contract): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idContractPlayer === row_obj.idContractPlayer) {
        value.detailsContractuels = row_obj.detailsContractuels;
        value.termesFinanciers = row_obj.termesFinanciers;
        value.clausesSpecifiques = row_obj.clausesSpecifiques;
        value.objectifs = row_obj.objectifs;
        value.datecontract = row_obj.datecontract;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Contract): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idContractPlayer !== row_obj.idContractPlayer;
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'contractplayer-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppContractPlayerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppContractPlayerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Contract,
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
