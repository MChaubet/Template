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

  developers: DeveloperDesc[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router, private translateService: TranslateService) {
    const mathieuDiploma = ['IUT Informatique', 'Licence informatique', 'Master génie logiciel'];

    const mathieuProject = [
      "Consultant développeur ERP Cloud, réalisation du SI d'Orange",
      "Développeur senior FullStack Spring + Angular, réalisation de l'application de gestion des investissements et productions de Total Energies",
      'Tech-Lead FullStack Spring + EmberJS, réalisation du SI de Leclerc',
    ];

    const mathieu = new DeveloperDesc('Mathieu CHAUBET', '', 'Tech-lead Full Stack', mathieuDiploma, mathieuProject);

    const jordanDiploma = ['IUT Informatique', 'Licence informatique', 'Master génie logiciel'];

    const jordanProjecta = [
      "Consultant développeur ERP Cloud, réalisation du SI d'Orange",
      "Développeur senior FullStack Spring + Angular, réalisation de l'application de gestion des investissements et productions de Total Energies",
      'Tech-Lead FullStack Spring + EmberJS, réalisation du SI de Leclerc',
    ];

    const jordan = new DeveloperDesc('Jordan NOËL', '', 'Développeur senior Full Stack', jordanDiploma, jordanProjecta);

    this.developers.push(mathieu);
    this.developers.push(jordan);
  }

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

class DeveloperDesc {
  constructor(public name: string, public photoPath: string, public jobName: string, public diploma: string[], public project: string[]) {}
}
