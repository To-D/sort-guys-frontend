import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  username!: string | null;
  rooms!: any;
  currRoom!: any;
  roomForm!: FormGroup;
  isRoomFormSpinning = false;
  newRoomForm!: FormGroup;
  isNewRoomFormSpinning = false;
  currPageIndex = 1;
  pageSize = 6;

  submitRoomForm(): void {
    this.isRoomFormSpinning = true;
    for (const i in this.roomForm.controls) {
      this.roomForm.controls[i].markAsDirty();
      this.roomForm.controls[i].updateValueAndValidity();
    }
    this.http
      .get('/api/room/' + this.roomForm.value.roomId)
      .subscribe((resp) => {
        if (resp) {
          this.currRoom = resp;
        } else {
          this.message.error('ID为 '+this.roomForm.value.roomId+' 的房间不存在！');
        }
      });
    this.isRoomFormSpinning = false;
  }

  submitNewRoomForm(): void {
    this.isNewRoomFormSpinning = true;
    for (const i in this.newRoomForm.controls) {
      this.newRoomForm.controls[i].markAsDirty();
      this.newRoomForm.controls[i].updateValueAndValidity();
    }
    this.roomService.newRoom(this.newRoomForm);
    this.isNewRoomFormSpinning = false;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roomService: RoomService,
    private message: NzMessageService,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.currRoom = {
      roomId: -1,
      roomOwner: '',
      playerInfos: [],
      status: -1,
    };
    this.roomForm = this.fb.group({
      roomId: [null, [Validators.required]],
    });
    this.newRoomForm = this.fb.group({
      sid: [null, [Validators.required]],
      hintsNum: [null, [Validators.required]],
    });
    this.http.get('/api/room',{
      headers: this.auth.getHeader()
    }).subscribe((resp) => {
      if (!(resp instanceof Array)) {
        resp = [];
      } else {
        this.rooms = resp;
      }
    },
    error => {
      // this.message.info("请先登录");
      // this.router
    }
    );
  }

  isLogin() {
    return this.userService.isLogin();
  }

  joinRoom(roomId: number) {
    this.roomService.joinRoom(roomId);
  }

  parseStatus(status: number) {
    switch (status) {
      case 1:
        return '准备中';
      case 2:
        return '游戏中';
      case 3:
        return '暂停';
      default:
        return '未知错误';
    }
  }
}
