import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/services/account.service';
import { Account } from 'app/models/account.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  texts: string[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account;
        this.animateTitle();
      });

    this.animateTitle();
  }

  animateTitle(): void {
    forkJoin([this.translateService.getTranslation('fr'), this.translateService.getTranslation('en')]).subscribe(res => {
      this.texts = [];
      this.texts.push(
        (this.translateService.getParsedResult(res[0], 'home.title') as string) + (this.account ? ' ' + this.account.login : '')
      );
      this.texts.push(
        (this.translateService.getParsedResult(res[1], 'home.title') as string) + (this.account ? ' ' + this.account.login : '')
      );
    });
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
