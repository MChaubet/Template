import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  possibilities: { name: string; desc: string; pricing: string }[] = [
    {
      name: 'Site vitrine',
      desc: "Création d'un site vitrine pour artisan, description de l'activité et des produits",
      pricing: '750€ - 1500€',
    },
    {
      name: 'Site vitrine + Réservation/Connexion',
      desc: "Création d'un site vitrine pour artisan, description de l'activité et des produits + mise en place d'un système de réservation/connexion",
      pricing: '1500€ - 5000€',
    },
    { name: 'Charte graphique', desc: "Création d'une charte graphique pour l'homogéïnité de l'application", pricing: '50€ - 200€' },
    {
      name: 'Designer',
      desc: "Ajout d'un concepteur visuel de solutions de communication, réalisation d'une maquette visuelle combinant image et texte",
      pricing: '100€ - 1000€',
    },
    { name: 'Langues', desc: 'Gestion des langues pour les écrans souhaités', pricing: '100€ - 500€ par langue' },
    { name: 'Title', desc: 'Description', pricing: 'Pricing' },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
