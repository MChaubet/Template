import { LOCALE_ID, NgModule } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/fr';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import dayjs from 'dayjs/esm';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationConfigService } from 'app/services/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/components/shared/shared.module';
import { TranslationModule } from 'app/components/shared/language/translation.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './components/home/home.module';
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { MainComponent } from './components/layouts/main/main.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { PageRibbonComponent } from './components/layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './directives/active-menu.directive';
import { ErrorComponent } from './components/layouts/error/error.component';
import { ModulesModule } from 'app/components/pages/modules.module';
import { StoreModule } from '@ngrx/store';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './interceptor/error-handler.interceptor';
import { NotificationInterceptor } from './interceptor/notification.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { KafkaComponent } from './modules/kafka/kafka.component';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NotificationInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    HomeModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
    TranslationModule,
    StoreModule.forRoot({}),
    ModulesModule,
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    CurrencyPipe,
    httpInterceptorProviders,
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    TypeaheadComponent,
    KafkaComponent,
  ],
  bootstrap: [MainComponent],
  exports: [NumbersOnlyDirective],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
