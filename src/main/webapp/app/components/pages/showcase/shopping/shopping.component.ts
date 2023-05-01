import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingService} from "../../../../services/showcase/shopping.service";
import {ShoppingFilter} from "../../../../models/shopping/shopping.filter";
import {FormBuilder, FormGroup} from "@angular/forms";
import {forkJoin, Subject} from "rxjs";
import {convertToBase64} from "../../../../utils/image.utils";
import {Article} from "../../../../models/shopping/article.model";
import {DeliveryOption} from "../../../../models/shopping/delivery-option.enum";
import {HttpClient} from "@angular/common/http";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'jhi-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent implements OnInit, OnDestroy {

  articles: Article[] = [];
  filteredArticles: Article[] = [];

  showFilters = false;
  screenWidth = 0;

  filterForm: FormGroup;

  private destroySubject = new Subject<void>();

  constructor(private http: HttpClient,
              private shoppingService: ShoppingService,
              private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.handleScreenSize();

    forkJoin([
      this.http.get('/content/images/showcase/shopping/articles/acer-1.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/acer-2.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/acer-3.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/asus-1.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/asus-2.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/asus-3.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/asus-4.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/dell-1.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/lenovo-1.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/medion-1.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/medion-2.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/shopping/articles/msi-1.png', {responseType: 'blob'}),
    ]).subscribe(imgs => {
      Promise.all([
        convertToBase64(imgs[0]),
        convertToBase64(imgs[1]),
        convertToBase64(imgs[2]),
        convertToBase64(imgs[3]),
        convertToBase64(imgs[4]),
        convertToBase64(imgs[5]),
        convertToBase64(imgs[6]),
        convertToBase64(imgs[7]),
        convertToBase64(imgs[8]),
        convertToBase64(imgs[9]),
        convertToBase64(imgs[10]),
        convertToBase64(imgs[11]),
      ]).then(base64Img => {
        this.articles.push(new Article(1, 'Acer Aspire 3 (A317-33-P9DS) Gris', 800.95, 'Acer', 4, 12, 50, DeliveryOption.Home, 'Gamer, 15.6", QHD, 240 Hz, Core i9-12900H, RTX 3080 Ti Max-Q, RAM 32 Go, SSD 2 To, Windows 11, 2,34 kg', base64Img[0]));
        this.articles.push(new Article(2, 'Acer Nitro 5 (AN515-58-591R)\n', 599.99, 'Acer', 5, 27, 3, DeliveryOption.Home, 'Gamer, 17", Full HD, 480 Hz, Core i9-12900HK, RTX 3080 Ti Max-Q, RAM 32 Go, SSD 1 To, Windows 11, 3,20 kg', base64Img[1]));
        this.articles.push(new Article(3, 'Acer Swift 3 (SF316-51-52ED)\n', 1199.99, 'Acer', 5, 1, 50, DeliveryOption.Home, 'Gamer, 17", QHD, 165 Hz, Core i7-12700H, RTX 3070 Ti Max-Q, RAM 32 Go, SSD 1 To, Windows 11, 3,20 kg', base64Img[2]));
        this.articles.push(new Article(4, 'ASUS A15 (TUF507RE-HN012W)', 699.95, 'Asus', 0, 0, 50, DeliveryOption.Home, 'Multimédia, 16", IPS, 3K, 16:10, Core i7-12700H, RTX 3050 Max-Q, RAM 16 Go, SSD 512 Go, Windows 11, 2,05 kg', base64Img[3]));
        this.articles.push(new Article(5, 'ASUS A15 (TUF507RM-HQ083W)', 1799.99, 'Asus', 5, 3, 50, DeliveryOption.Home, 'Gamer, 17.3", IPS, Full HD, 144 Hz, Core i7-12650H, RTX 3060 Max-Q, RAM 16 Go, SSD 512 Go, Windows 11, 2,30 kg', base64Img[4]));
        this.articles.push(new Article(6, 'Asus VivoBook 15 (S1502IA-EJ002W)', 399.99, 'Asus', 3, 1, 50, DeliveryOption.PickupPoint, 'Bureautique, 16", Full HD+, Core i7-1255U, RAM 16 Go, SSD 512 Go, Windows 11, 1,87 kg', base64Img[5]));
        this.articles.push(new Article(7, 'Asus Vivobook 15 (R515JA-EJ4126)', 800, 'Asus', 4, 9, 5, DeliveryOption.Drive2h, 'Multimédia, 16", IPS, 3K, 16:10, Core i7-12700H, RTX 3060 Max-Q, RAM 32 Go, SSD 1 To, Windows 11 Pro, 2,05 kg', base64Img[6]));
        this.articles.push(new Article(8, 'DELL G15 5511-410', 599.95, 'Dell', 5, 3, 0, DeliveryOption.Home, 'Bureautique, 15", Full HD, Core i3-1115G4, RAM 8 Go, SSD 256 Go, Windows 11 en mode S, 1,73 kg', base64Img[7]));
        this.articles.push(new Article(9, 'Lenovo ThinkPad E15 Gen 2 (20TD00HAFR)', 1199.99, 'Lenovo', 5, 10, 2, DeliveryOption.Drive2h, 'Gamer, 15.6", IPS, QHD, 165 Hz, Ryzen 7 6800H, RTX 3060 Max-Q, RAM 16 Go, SSD 512 Go, Windows 11, 2,20 kg', base64Img[8]));
        this.articles.push(new Article(10, 'Medion Akoya E15307 (MD62369 FR)', 699.95, 'Medion', 4, 14, 0, DeliveryOption.Home, 'Gamer, 15.6", Full HD, 120 Hz, Core i5-11400H, RTX 3050 Ti, RAM 16 Go, SSD 512 Go, Linux Ubuntu, 2,65 kg', base64Img[9]));
      });
    });
    this.filteredArticles = this.articles;

    this.shoppingService.filtersSubject
      .pipe(takeUntil(this.destroySubject))
      .subscribe((filters: ShoppingFilter) => {
        this.applyFilters(filters);
      });

    this.shoppingService.sortSubject
      .pipe(takeUntil(this.destroySubject))
      .subscribe((sortingMode: string) => {
        this.applySort(sortingMode);
      });

    this.shoppingService.closeFixedFiltersSubject
      .pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
        this.closeFilters();
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  closeFilters(): void {
    this.showFilters = false;
  }

  applyFilters(filters: ShoppingFilter): void {
    this.shoppingService.spinnerSubject.next(true);

    // Pour faire genre que ça charge un peu
    const timeout = Math.floor(Math.random() * 200) + 200;
    setTimeout(() => {
      this.filteredArticles = this.articles.filter(article => {
        return article.price >= filters.priceMin && article.price <= filters.priceMax
          && article.rating >= filters.rating
          && (filters.brands.length === 0 || filters.brands.includes(article.brand))
          && (filters.deliveryOptions.length === 0 || filters.deliveryOptions.includes(article.deliveryOption));
      });
      this.shoppingService.spinnerSubject.next(false);
    }, timeout);
  }

  applySort(sortingMode: string): void {
    if (sortingMode === 'Prix croissant') {
      this.filteredArticles.sort((a, b) => a.price - b.price);
    } else if (sortingMode === 'Prix décroissant') {
      this.filteredArticles.sort((a, b) => b.price - a.price);
    } else if (sortingMode === 'Meilleures notes') {
      this.filteredArticles.sort((a, b) => b.rating - a.rating);
    } else if (sortingMode === 'Pertinence') {
      this.filteredArticles.sort((a, b) => a.id - b.id);
    }
  }

  private handleScreenSize(): void {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 600) {
        this.showFilters = false;
      }
    };
  }
}
