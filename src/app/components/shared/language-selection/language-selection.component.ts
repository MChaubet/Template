import { Component, OnInit } from '@angular/core';
import { LANGUAGES } from '../../../constants/language.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss'],
})
export class LanguageSelectionComponent implements OnInit {
  flags: Lang[] = [];

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.flags = LANGUAGES.map(lang => new Lang('Français', lang));
  }

  changeLanguage(flag: Lang): void {
    this.translateService.use(flag.shortName);
  }
}

export class Lang {
  constructor(public country: string, public shortName: string) {}
}
