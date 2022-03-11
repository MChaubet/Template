import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { combineLatest, interval, startWith, Subscription, switchMap } from 'rxjs';

import { MetricsService } from './metrics.service';
import { Metrics, Thread } from './metrics.model';

@Component({
  selector: 'jhi-metrics',
  templateUrl: './metrics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsComponent implements OnInit, OnDestroy {
  metrics?: Metrics;
  threads?: Thread[];
  updatingMetrics = true;

  subscription?: Subscription;

  constructor(private metricsService: MetricsService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  refresh(): void {
    this.subscription = interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => {
          this.updatingMetrics = true;
          return combineLatest([this.metricsService.getMetrics(), this.metricsService.threadDump()]);
        })
      )
      .subscribe(([metrics, threadDump]) => {
        this.metrics = metrics;
        this.threads = threadDump.threads;
        this.updatingMetrics = false;
        this.changeDetector.markForCheck();
      });
  }

  metricsKeyExists(key: keyof Metrics): boolean {
    return Boolean(this.metrics?.[key]);
  }

  metricsKeyExistsAndObjectNotEmpty(key: keyof Metrics): boolean {
    return Boolean(this.metrics?.[key] && JSON.stringify(this.metrics[key]) !== '{}');
  }
}
