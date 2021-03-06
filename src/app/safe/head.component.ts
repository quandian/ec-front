import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { config, IQiniuItem, IProfile, IUserInfo, UserService } from '../core';

@Component({
  templateUrl: './head.html',
  styleUrls: ['./head.css'],
})
export class SetHeadComponent {

  profile: IProfile;
  user: IUserInfo;
  key: string;

  error: string;
  showErr = config.showErr;

  private requesting: boolean;
  private hasFile: boolean;
  private fileChanged: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  get uploadActive() { return !this.requesting && this.hasFile && this.fileChanged; }

  ngOnInit() {
    let data = <{ profile: IProfile, user: IUserInfo }>this.route.snapshot.data;
    this.profile = data.profile;
    this.user = data.user;
    this.key = `${this.profile.HeadPrefix}${this.user.ID}`;
  }

  onSuccess(res: IQiniuItem) {
    this.error = '';
    this.userService.refreshHead();
    this.requesting = false;
    this.fileChanged = false;
  }

  onFail(err) {
    this.error = err.toString() || 'Upload failed';
    this.requesting = false;
  }

  onAdded() {
    this.error = '';
    this.hasFile = true;
    this.fileChanged = true;
  }

  onRemoved() {
    this.error = '';
    this.hasFile = false;
  }

  upload(uploader) {
    if (this.uploadActive) {
      this.error = '';
      this.requesting = true;
      uploader.upload(this.key);
    }
  }

}
