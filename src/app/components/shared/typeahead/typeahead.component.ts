import { Component, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'jhi-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent {
  @Input() values: string[] = [
    'Paris',
    'Marseille',
    'Lyon',
    'Toulouse',
    'Nice',
    'Nantes',
    'Montpellier',
    'Strasbourg',
    'Bordeaux',
    'Lille',
    'Rennes',
    'Reims',
    'Toulon',
    'Saint-Étienne',
    'Le Havre',
    'Grenoble',
    'Dijon',
    'Angers',
    'Saint-Denis',
    'Villeurbanne',
  ];

  @Input() debounceTime = 250;
  @Input() startSearch = 2;
  @Input() nbResult = 10;

  @Input() model = '';

  search: OperatorFunction<string, readonly string[]> = (text: Observable<string>) =>
    text.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      map(term =>
        term.length < this.startSearch
          ? []
          : this.values.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, this.nbResult)
      )
    );
}
