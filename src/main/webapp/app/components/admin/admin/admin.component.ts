import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AccountService } from '../../../services/account.service';
import { adminDataJson } from './admin-data';

@Component({
  selector: 'jhi-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  inProduction?: boolean;
  openAPIEnabled?: boolean;

  adminData = adminDataJson;

  constructor(private accountService: AccountService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });
  }
}
