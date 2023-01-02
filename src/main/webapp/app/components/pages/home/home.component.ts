import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/services/account.service';
import { Account } from 'app/models/account.model';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDemarrerComponent } from '../../shared/contact/modal-demarrer/modal-demarrer.component';
import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Window', {
  providedIn: 'root',
  factory: () => window,
});

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  texts: string[] = [];
  buttonDemarrerFixed = false;

  scrollSubscription = fromEvent(this.window, 'scroll');

  developers: DeveloperDesc[] = [];

  private readonly destroy$ = new Subject<void>();

  // add the modalService to the constructor
  constructor(
    private accountService: AccountService,
    private router: Router,
    private translateService: TranslateService,
    private modalService: NgbModal,
    @Inject(WINDOW) private window: Window
  ) {
    this.addDevelopers();
    // this.handleScroll();
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

  openModalContact(): void {
    const modalRef = this.modalService.open(ModalDemarrerComponent, { size: 'lg', centered: true, windowClass: 'modal-contact' });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = (event.target as Window).scrollY;
    console.log(`La position de la barre de défilement est ${scrollPosition} pixels.`);
    // console.log(event);
    // console.log(window.scrollY);
    // console.log(document.body.clientHeight / 2);
  }

  handleScroll() {
    console.log(window.scrollY);
    console.log(document.body.clientHeight / 2);

    // this.window.onscroll = () => {
    //   console.log('eirierj');
    //   if (window.scrollY > document.body.clientHeight / 2) {
    //     console.log('Vous êtes à mi-chemin !');
    //     this.buttonDemarrerFixed = true;
    //   } else {
    //     this.buttonDemarrerFixed = false;
    //   }
    // }
  }

  private addDevelopers() {
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
}

class DeveloperDesc {
  constructor(public name: string, public photoPath: string, public jobName: string, public diploma: string[], public project: string[]) {}
}
