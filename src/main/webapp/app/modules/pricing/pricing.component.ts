import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
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
    {
      name: 'Charte graphique',
      desc: "Création d'une charte graphique pour l'homogéïnité de l'application",
      pricing: '50€ - 200€',
    },
    {
      name: 'Designer',
      desc: "Ajout d'un concepteur visuel de solutions de communication, réalisation d'une maquette visuelle combinant image et texte",
      pricing: '100€ - 1000€',
    },
    {
      name: 'Langues',
      desc: 'Gestion des langues pour les écrans souhaités',
      pricing: '100€ - 500€ par langue',
    },
    {
      name: 'Title',
      desc: 'Description',
      pricing: 'Pricing',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
