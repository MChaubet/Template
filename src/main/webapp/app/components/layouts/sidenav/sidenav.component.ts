import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { LANGUAGES } from '../../../constants/language.constants';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { VERSION } from '../../../constants/app.constants';
import { LoginService } from '../../../services/login.service';
import { AccountService } from '../../../services/account.service';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';
import { Account } from '../../../models/account.model';
import {SignInService} from "../../pages/account/sign-in/sign-in.service";

interface SideNavToggle {
  screenWidth: number;
  open: boolean;
}

@Component({
  selector: 'jhi-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('100ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Output() toggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  open = false;
  screenWidth = 0;
  navData = navbarData;
  languages = LANGUAGES;
  version = '';
  account: Account | null = null;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private signInService: SignInService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.open = false;
      this.toggleSideNav.emit({ open: this.open, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
  }

  toggleCollapse(): void {
    this.open = !this.open;
    this.toggleSideNav.emit({ open: this.open, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.open = false;
    this.toggleSideNav.emit({ open: this.open, screenWidth: this.screenWidth });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']).then(r => r);
    this.closeSidenav();
  }

  openSignIn(): void {
    this.signInService.openSignIn();
  }
}
