import {Component, OnInit} from '@angular/core';
import {Article} from "../../../../../models/article.model";
import {forkJoin} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {convertToBase64} from "../../../../../utils/image.utils";

@Component({
  selector: 'jhi-shopping-articles',
  templateUrl: './shopping-articles.component.html',
  styleUrls: ['./shopping-articles.component.scss']
})
export class ShoppingArticlesComponent implements OnInit {

  articles: Article[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

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
        this.articles.push(new Article(1, 'Acer Aspire 3 (A317-33-P9DS) Gris', 800.95, false, 'Gamer, 15.6", QHD, 240 Hz, Core i9-12900H, RTX 3080 Ti Max-Q, RAM 32 Go, SSD 2 To, Windows 11, 2,34 kg', base64Img[0], 4));
        this.articles.push(new Article(2, 'Acer Nitro 5 (AN515-58-591R)\n', 599.99, false, 'Gamer, 17", Full HD, 480 Hz, Core i9-12900HK, RTX 3080 Ti Max-Q, RAM 32 Go, SSD 1 To, Windows 11, 3,20 kg', base64Img[1], 5));
        this.articles.push(new Article(3, 'Acer Swift 3 (SF316-51-52ED)\n', 1199.99, false, 'Gamer, 17", QHD, 165 Hz, Core i7-12700H, RTX 3070 Ti Max-Q, RAM 32 Go, SSD 1 To, Windows 11, 3,20 kg', base64Img[2], 5));
        this.articles.push(new Article(4, 'ASUS A15 (TUF507RE-HN012W)', 699.95, false, 'Multimédia, 16", IPS, 3K, 16:10, Core i7-12700H, RTX 3050 Max-Q, RAM 16 Go, SSD 512 Go, Windows 11, 2,05 kg', base64Img[3], 4));
        this.articles.push(new Article(5, 'ASUS A15 (TUF507RM-HQ083W)', 1799.99, false, 'Gamer, 17.3", IPS, Full HD, 144 Hz, Core i7-12650H, RTX 3060 Max-Q, RAM 16 Go, SSD 512 Go, Windows 11, 2,30 kg', base64Img[4], 5));
        this.articles.push(new Article(6, 'Asus VivoBook 15 (S1502IA-EJ002W)', 399.99, false, 'Bureautique, 16", Full HD+, Core i7-1255U, RAM 16 Go, SSD 512 Go, Windows 11, 1,87 kg', base64Img[5], 3));
        this.articles.push(new Article(7, 'Asus Vivobook 15 (R515JA-EJ4126)', 800, false, 'Multimédia, 16", IPS, 3K, 16:10, Core i7-12700H, RTX 3060 Max-Q, RAM 32 Go, SSD 1 To, Windows 11 Pro, 2,05 kg', base64Img[6], 4));
        this.articles.push(new Article(8, 'DELL G15 5511-410', 599.95, false, 'Bureautique, 15", Full HD, Core i3-1115G4, RAM 8 Go, SSD 256 Go, Windows 11 en mode S, 1,73 kg', base64Img[7], 3));
        this.articles.push(new Article(9, 'Lenovo ThinkPad E15 Gen 2 (20TD00HAFR)', 1199.99, false, 'Gamer, 15.6", IPS, QHD, 165 Hz, Ryzen 7 6800H, RTX 3060 Max-Q, RAM 16 Go, SSD 512 Go, Windows 11, 2,20 kg', base64Img[8], 5));
        this.articles.push(new Article(10, 'Medion Akoya E15307 (MD62369 FR)', 699.95, false, 'Gamer, 15.6", Full HD, 120 Hz, Core i5-11400H, RTX 3050 Ti, RAM 16 Go, SSD 512 Go, Linux Ubuntu, 2,65 kg', base64Img[9], 4));
        // ne pas recopier ces données dans la bdd, elles ne sont pas cohérentes
      });
    });
  }

  toggleFavorite(id: number): void {
    const article = this.articles.find(a => a.id === id);
    if (article) {
      article.favorite = !article.favorite;
    }
  }
}
