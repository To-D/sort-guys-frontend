import { Component } from '@angular/core';
import { UserService } from '../app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username!: string | null;
  dialogVisible = false;
  isCollapsed = false;

  constructor(private userService: UserService, private router: Router) {}

  isLogin() {
    this.username = localStorage.getItem('username');
    return this.userService.isLogin();
  }

  logout() {
    this.dialogVisible = true;
  }

  handleOk() {
    this.dialogVisible = false;
    this.userService.logout();
    this.router.navigate(['/welcome']);
  }

  handleCancel() {
    this.dialogVisible = false;
  }
}
