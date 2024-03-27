import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddPlayerComponent } from './add/add.component';


export interface Player {
  idPlayer: number;
  contratStart: Date;
  contratEnd: Date;
  countryOfResidence:string;
  dateOfBirth: Date;
  discordId: string;
  inGameName: string;
  jerseySize: string;
  leagalefullname: string;
  mailAdress: string;
  salary: number;
  socialMediaLinks:string;
  whatsappPhone:string;
  imagePath:string;
}


const players = [
  {
    idPlayer: 1,
    contratStart:  new Date('04-2-2020'),
    contratEnd:  new Date('04-2-2020'),
    countryOfResidence:"tunisia",
    dateOfBirth:  new Date('04-2-2020'),
    discordId:"1233#qddqs",
    inGameName: "macgyver",
    jerseySize: "xl",
    leagalefullname: "fray khalil",
    mailAdress: "fray.khalil.200@gmail.com",
    salary: 5000000000000000000000000000,
    socialMediaLinks:"khalilfacebook.com",
    whatsappPhone:"53665566",
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    idPlayer: 2,
    contratStart:  new Date('04-2-2020'),
    contratEnd:  new Date('04-2-2020'),
    countryOfResidence:"tunisia",
    dateOfBirth:  new Date('04-2-2020'),
    discordId:"1233#qddqs",
    inGameName: "macgyver",
    jerseySize: "xl",
    leagalefullname: " khalil",
    mailAdress: "fray.khalil.200@gmail.com",
    salary: 5000000000000000000000000000,
    socialMediaLinks:"khalilfacebook.com",
    whatsappPhone:"53665566",
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    idPlayer: 3,
    contratStart:  new Date('04-2-2020'),
    contratEnd:  new Date('04-2-2020'),
    countryOfResidence:"tunisia",
    dateOfBirth:  new Date('04-2-2020'),
    discordId:"1233#qddqs",
    inGameName: "macgyver",
    jerseySize: "xl",
    leagalefullname: "sam smith",
    mailAdress: "fray.khalil.200@gmail.com",
    salary: 5000000000000000000000000000,
    socialMediaLinks:"khalilfacebook.com",
    whatsappPhone:"53665566",
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    idPlayer: 4,
    contratStart:  new Date('04-2-2020'),
    contratEnd:  new Date('04-2-2020'),
    countryOfResidence:"tunisia",
    dateOfBirth:  new Date('04-2-2020'),
    discordId:"1233#qddqs",
    inGameName: "macgyver",
    jerseySize: "xl",
    leagalefullname: "jhon",
    mailAdress: "fray.khalil.200@gmail.com",
    salary: 5000000000000000000000000000,
    socialMediaLinks:"khalilfacebook.com",
    whatsappPhone:"53665566",
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    idPlayer: 5,
    contratStart:  new Date('04-2-2020'),
    contratEnd:  new Date('04-2-2020'),
    countryOfResidence:"tunisia",
    dateOfBirth:  new Date('04-2-2020'),
    discordId:"1233#qddqs",
    inGameName: "macgyver",
    jerseySize: "xl",
    leagalefullname: "moahmed ",
    mailAdress: "fray.khalil.200@gmail.com",
    salary: 5000000000000000000000000000,
    socialMediaLinks:"khalilfacebook.com",
    whatsappPhone:"53665566",
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    idPlayer: 6,
    contratStart:  new Date('04-2-2020'),
    contratEnd:  new Date('04-2-2020'),
    countryOfResidence:"tunisia",
    dateOfBirth:  new Date('04-2-2020'),
    discordId:"1233#qddqs",
    inGameName: "macgyver",
    jerseySize: "xl",
    leagalefullname: "ghaith ",
    mailAdress: "fray.khalil.200@gmail.com",
    salary: 5000000000000000000000000000,
    socialMediaLinks:"khalilfacebook.com",
    whatsappPhone:"53665566",
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    idPlayer: 7,
    contratStart:  new Date('04-2-2020'),
    contratEnd:  new Date('04-2-2020'),
    countryOfResidence:"tunisia",
    dateOfBirth:  new Date('04-2-2020'),
    discordId:"1233#qddqs",
    inGameName: "macgyver",
    jerseySize: "xl",
    leagalefullname: "haithem",
    mailAdress: "fray.khalil.200@gmail.com",
    salary: 5000000000000000000000000000,
    socialMediaLinks:"khalilfacebook.com",
    whatsappPhone:"53665566",
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    idPlayer: 8,
    contratStart:  new Date('04-2-2020'),
    contratEnd:  new Date('04-2-2020'),
    countryOfResidence:"tunisia",
    dateOfBirth:  new Date('04-2-2020'),
    discordId:"1233#qddqs",
    inGameName: "macgyver",
    jerseySize: "xl",
    leagalefullname: "Malek ",
    mailAdress: "fray.khalil.200@gmail.com",
    salary: 5000000000000000000000000000,
    socialMediaLinks:"khalilfacebook.com",
    whatsappPhone:"53665566",
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    idPlayer: 9,
    contratStart:  new Date('04-2-2020'),
    contratEnd:  new Date('04-2-2020'),
    countryOfResidence:"tunisia",
    dateOfBirth:  new Date('04-2-2020'),
    discordId:"1233#qddqs",
    inGameName: "macgyver",
    jerseySize: "xl",
    leagalefullname: "salma ",
    mailAdress: "fray.khalil.200@gmail.com",
    salary: 5000000000000000000000000000,
    socialMediaLinks:"khalilfacebook.com",
    whatsappPhone:"53665566",
    imagePath: 'assets/images/profile/user-3.jpg',
  },
];

@Component({
  templateUrl: './player.component.html',
})
export class AppPlayerComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'name',
    'dateOfBirth',
    'countryOfResidence',
    'whatsappPhone',
    'discordId',
    'mailAdress',
    'contratStart',
    'contratEnd',
    'salary',
    'jerseySize',
    'socialMediaLinks',
    'action',
  ];
  dataSource = new MatTableDataSource(players);
  role: any = localStorage.getItem('role');

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
    this.dataSource.data.unshift({
      idPlayer: players.length + 1,
      contratStart: row_obj.contratStart,
      contratEnd:  row_obj.contratEnd,
      countryOfResidence: row_obj.countryOfResidence,
      dateOfBirth: row_obj.dateOfBirth,
      discordId: row_obj.discordId,
      inGameName: row_obj.inGameName,
      jerseySize: row_obj.jerseySize,
      leagalefullname: row_obj.leagalefullname,
      mailAdress:row_obj.mailAdress,
      salary:row_obj.salary,
      socialMediaLinks:row_obj.socialMediaLinks,
      whatsappPhone:row_obj.whatsappPhone,
      imagePath:row_obj.imagePath
    });
    this.dialog.open(AppAddPlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Player): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idPlayer === row_obj.idPlayer) {
        value.contratStart= row_obj.contratStart;
        value.contratEnd= row_obj.contratEnd;
        value.countryOfResidence= row_obj.countryOfResidence;
        value.dateOfBirth= row_obj.dateOfBirth;
        value.discordId= row_obj.discordId;
        value.inGameName= row_obj.inGameName;
        value.jerseySize= row_obj.jerseySize;
        value.leagalefullname= row_obj.leagalefullname;
        value.mailAdress=row_obj.mailAdress;
        value.salary=row_obj.salary;
        value.socialMediaLinks=row_obj.socialMediaLinks;
        value.whatsappPhone=row_obj.whatsappPhone;
        value.imagePath=row_obj.imagePath;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Player): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idPlayer !== row_obj.idPlayer;
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
