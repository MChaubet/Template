import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  possibilities: { logo: string; name: string; desc: string; pricing: string }[] = [
    {
      logo: 'fa-shop',
      name: 'Site vitrine',
      desc: "Création d'un site vitrine pour artisan, description de l'activité et des produits",
      pricing: '750€ - 1500€',
    },
    {
      logo: 'fa-shop-lock',
      name: 'Site vitrine + Réservation / Connexion',
      desc: "Création d'un site vitrine pour artisan, description de l'activité et des produits + mise en place d'un système de réservation/connexion",
      pricing: '1500€ - 5000€',
    },
    {
      logo: 'fa-blog',
      name: 'Blog',
      desc: "Création d'un blog",
      pricing: 'Pricing',
    },
    {
      logo: 'fa-palette',
      name: 'Charte graphique',
      desc: "Création d'une charte graphique pour l'homogéïnité de l'application",
      pricing: '50€ - 200€',
    },
    {
      logo: 'fa-wand-magic-sparkles',
      name: 'Designer',
      desc: "Ajout d'un concepteur visuel de solutions de communication, réalisation d'une maquette visuelle combinant image et texte",
      pricing: '100€ - 1000€',
    },
    {
      logo: 'fa-language',
      name: 'Langues',
      desc: 'Gestion des langues pour les écrans souhaités',
      pricing: '100€ - 500€ par langue',
    },
    {
      logo: 'fa-file-image',
      name: 'Maquettage',
      desc: 'Création de maquette des écrans dans le site afin de visualiser plus rapidement ce qui va être produit',
      pricing: 'Pricing',
    },
    {
      logo: 'fa-sitemap',
      name: 'Monitoring',
      desc:
        "L'indispensable pour s’assurer qu’il est bien accessible et navigable à tout instant par ses visiteurs. " +
        'Contrôlez régulièrement votre site et vous alerte en cas de problème afin que vous puissiez réagir au plus vite.',
      pricing: 'Pricing',
    },
    {
      logo: 'fa-tablet-screen-button',
      name: 'Réactivité mobile',
      desc: "Optimisation de l'affichage de votre site sur tous les écrans, ordinateur, tablette ou mobile",
      pricing: 'Pricing',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
