import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/components/shared/shared.module';
import { PasswordStrengthBarComponent } from './password/password-strength-bar/password-strength-bar.component';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { PasswordComponent } from './password/password.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { SettingsComponent } from './settings/settings.component';
import { ACCOUNT_ROUTES } from './account.route';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ACCOUNT_ROUTES)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    SignInComponent,
  ],
  exports: [
    SignInComponent
  ]
})
export class AccountModule {}
