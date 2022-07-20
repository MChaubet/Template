import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from '../../pipes/find-language-from-key.pipe';
import { TranslateDirective } from '../../directives/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from '../../directives/has-any-authority.directive';
import { DurationPipe } from '../../pipes/duration.pipe';
import { FormatMediumDatetimePipe } from '../../pipes/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from '../../pipes/format-medium-date.pipe';
import { SortByDirective } from '../../directives/sort-by.directive';
import { SortDirective } from '../../directives/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';
import { IntersectionObserverDirective } from 'app/directives/intersection-observer.directive';
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';
import { DateFormatDirective } from '../../directives/date-format.directive';
import { TextAnimationDirective } from 'app/directives/text-animation.directive';
import { MaskDirective } from 'app/directives/mask.directive';
import { CurrencyMaskDirective } from 'app/directives/currency-mask.directive';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    IntersectionObserverDirective,
    NumbersOnlyDirective,
    DateFormatDirective,
    TextAnimationDirective,
    MaskDirective,
    CurrencyMaskDirective,
  ],
  exports: [
    SharedLibsModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    IntersectionObserverDirective,
    NumbersOnlyDirective,
    DateFormatDirective,
    TextAnimationDirective,
    MaskDirective,
    CurrencyMaskDirective,
  ],
})
export class SharedModule {}
