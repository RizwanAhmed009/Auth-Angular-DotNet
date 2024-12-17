import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public fullNmae: string = '';
  public role!: string;
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private userStore: UserStoreService
  ) {}
  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
    // we did it because we want name instance b/c we refresh it local stoarge got clear
    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullNmae = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      const rolefromtoken = this.auth.getfullRoleFromToken();
      this.role = val || rolefromtoken;
    });
  }
  logout() {
    this.auth.SignOut();
  }
}
