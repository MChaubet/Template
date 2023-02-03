import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from 'app/services/account.service';
import { Account } from 'app/models/account.model';
import { LANGUAGES } from 'app/constants/language.constants';

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  account!: Account;
  success = false;
  languages = LANGUAGES;
  settingsForm = this.fb.group({
    firstName: new FormControl<string|null>(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    lastName: new FormControl<string|null>(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    email: new FormControl<string|null>(null, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]),
    langKey: new FormControl<string|null>(null),
  });

  constructor(private accountService: AccountService, private fb: FormBuilder, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.settingsForm.patchValue({
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
          langKey: account.langKey,
        });

        this.account = account;
      }
    });
  }

  save(): void {
    this.success = false;

    this.account.firstName = this.settingsForm.get('firstName')!.value;
    this.account.lastName = this.settingsForm.get('lastName')!.value;
    this.account.email = this.settingsForm.get('email')!.value ?? '';
    this.account.langKey = this.settingsForm.get('langKey')!.value ?? '';

    this.accountService.save(this.account).subscribe(() => {
      this.success = true;

      this.accountService.authenticate(this.account);

      if (this.account.langKey !== this.translateService.currentLang) {
        this.translateService.use(this.account.langKey);
      }
    });
  }
}
