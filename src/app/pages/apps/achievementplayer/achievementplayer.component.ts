import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddAchievementPlayerComponent } from './add/add.component';



export interface Achivment {
  idAchievementPlayer: number;
  playerName: string;
  trophie: string[];
  dateAchievement: Date;
  clausesSpecifiques: string;
  status: boolean;
  leagalefullname?: string;
}

const achivments = [
  {
    idAchievementPlayer: 1,
    playerName: 'John Doe',
    trophie: ['First Place Trophy', 'Second Place Trophy'],
    dateAchievement: new Date('2023-01-15'),
    clausesSpecifiques: 'Specific clauses 1',
    status: true,
    leagalefullname: 'John Doe Jr.'
  },
  {
    idAchievementPlayer: 2,
    playerName: 'Alice Smith',
    trophie: ['Best Team Player Trophy'],
    dateAchievement: new Date('2023-05-20'),
    clausesSpecifiques: 'Specific clauses 2',
    status: false
  },
  // Add more instances with different data as needed
  {
    idAchievementPlayer: 3,
    playerName: 'Bob Johnson',
    trophie: ['Most Improved Player Trophy'],
    dateAchievement: new Date('2023-09-10'),
    clausesSpecifiques: 'Specific clauses 3',
    status: true,
    leagalefullname: 'Robert Johnson'
  },
  // Repeat similar structures with different data
  {
    idAchievementPlayer: 4,
    playerName: 'Emily Davis',
    trophie: ['Team Spirit Award'],
    dateAchievement: new Date('2023-11-25'),
    clausesSpecifiques: 'Specific clauses 4',
    status: true
  },
  {
    idAchievementPlayer: 5,
    playerName: 'Michael Wilson',
    trophie: ['Best Offensive Player Trophy'],
    dateAchievement: new Date('2023-08-03'),
    clausesSpecifiques: 'Specific clauses 5',
    status: false
  },
  {
    idAchievementPlayer: 6,
    playerName: 'Sophia Brown',
    trophie: ['Most Valuable Player Trophy'],
    dateAchievement: new Date('2023-03-18'),
    clausesSpecifiques: 'Specific clauses 6',
    status: true
  },
  {
    idAchievementPlayer: 7,
    playerName: 'James Taylor',
    trophie: ['Outstanding Leadership Trophy'],
    dateAchievement: new Date('2023-12-12'),
    clausesSpecifiques: 'Specific clauses 7',
    status: false
  },
  {
    idAchievementPlayer: 8,
    playerName: 'Olivia Martinez',
    trophie: ['Best Defensive Player Trophy'],
    dateAchievement: new Date('2023-07-29'),
    clausesSpecifiques: 'Specific clauses 8',
    status: true
  },
  {
    idAchievementPlayer: 9,
    playerName: 'William Garcia',
    trophie: ['Rookie of the Year Trophy'],
    dateAchievement: new Date('2023-04-05'),
    clausesSpecifiques: 'Specific clauses 9',
    status: false
  }
];

@Component({
  templateUrl: './achievementplayer.component.html',
})
export class AppAchievementPlayerComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'playerName',
    'trophie',
    'dateAchievement',
    'status',
    'action'

  ];
  dataSource = new MatTableDataSource(achivments);
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
    const dialogRef = this.dialog.open(AppAchievementPlayerDialogContentComponent, {
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
  addRowData(row_obj: Achivment): void {
    this.dataSource.data.unshift({
      idAchievementPlayer: achivments.length + 1,
      playerName: row_obj.playerName,
      trophie: row_obj.trophie,
      clausesSpecifiques: row_obj.clausesSpecifiques,
      dateAchievement: new Date(),
      status: row_obj.status,
     
    });
    this.dialog.open(AppAddAchievementPlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Achivment): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idAchievementPlayer === row_obj.idAchievementPlayer) {
        value.playerName = row_obj.playerName;
        value.trophie = row_obj.trophie;
        value.dateAchievement = row_obj.dateAchievement;
        value.status = row_obj.status;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Achivment): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idAchievementPlayer !== row_obj.idAchievementPlayer;
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'achievementplayer-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppAchievementPlayerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppAchievementPlayerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Achivment,
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
