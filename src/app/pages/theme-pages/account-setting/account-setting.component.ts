import { AfterViewInit, Component } from '@angular/core';
import { UsersService } from '../../apps/services/users.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
})
export class AppAccountSettingComponent implements AfterViewInit {
  userId:any = localStorage.getItem('userId');
  accessToken:any = localStorage.getItem('accessToken');
  dataUser : any;
  user : User;
  constructor(private serviceUser: UsersService) {}
  ngAfterViewInit(): void {
       this.loadUser()
 
   }

  loadUser() {
    this.serviceUser.getUserById(this.userId).subscribe({
      next: (res: any) => { // Specify the type of 'res' as 'any[]'
         this.user = res;  
       },
      error: (err) => {
        console.log("🚀 ~ AppUserComponent ~ this.serviceUser.getAll ~ err:", err);
      }
    });
  }
}
