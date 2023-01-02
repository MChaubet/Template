import { Component, OnInit, RendererFactory2, Renderer2, HostListener, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import dayjs from 'dayjs/esm';
import { EventEmitter } from '@angular/core';

import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  @Output() scrollChange = new EventEmitter<number>();
  scrollPosition = 0;
  private renderer: Renderer2;

  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private translateService: TranslateService,
    rootRenderer: RendererFactory2
  ) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);

    this.scrollChange.subscribe(scrollPosition => {
      this.scrollPosition = scrollPosition;
      console.log(`Scroll position: ${scrollPosition}`);
    });
  }

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
    });

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.updateTitle();
      dayjs.locale(langChangeEvent.lang);
      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });
  }

  handleScroll(event: any) {
    this.scrollChange.emit(event.target.scrollTop);
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    const title: string = routeSnapshot.data['pageTitle'] ?? '';
    if (routeSnapshot.firstChild) {
      return this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }
}
