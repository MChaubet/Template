import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Databases } from 'app/models/metrics.model';
import { filterNaN } from 'app/utils/operators.utils';

@Component({
  selector: 'jhi-metrics-datasource',
  templateUrl: './metrics-datasource.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsDatasourceComponent {
  /**
   * object containing all datasource related metrics
   */
  @Input() datasourceMetrics?: Databases;

  /**
   * boolean field saying if the metrics are in the process of being updated
   */
  @Input() updating?: boolean;

  filterNaN = (input: number): number => filterNaN(input);
}
