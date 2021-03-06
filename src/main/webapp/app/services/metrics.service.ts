import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/services/application-config.service';
import { Metrics, ThreadDump } from '../models/metrics.model';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getMetrics(): Observable<Metrics> {
    return this.http.get<Metrics>(this.applicationConfigService.getEndpointFor('management/jhimetrics'));
  }

  threadDump(): Observable<ThreadDump> {
    return this.http.get<ThreadDump>(this.applicationConfigService.getEndpointFor('management/threaddump'));
  }
}
