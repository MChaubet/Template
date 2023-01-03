import { Injectable } from '@angular/core';
import { EventSourcePolyfill, EventSourcePolyfillInit } from 'event-source-polyfill';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../../../services/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private sseEndpoint = this.applicationConfigService.getEndpointFor('api/kafka');
  private eventSource?: EventSourcePolyfill;

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {}

  register(): EventSourcePolyfill {
    const token: string | null =
      this.localStorageService.retrieve('authenticationToken') ?? this.sessionStorageService.retrieve('authenticationToken');

    const options = {
      heartbeatTimeout: 18000000,
      headers: { Authorization: `Bearer ${token ?? ''}` },
    } as EventSourcePolyfillInit;

    this.eventSource = new EventSourcePolyfill(`${this.sseEndpoint}/register`, options);
    this.eventSource.onopen = (ev: any) => console.log(ev);
    this.eventSource.onerror = (ev: any) => console.error(ev);

    return this.eventSource;
  }

  unregister(): void {
    this.eventSource?.close();
    this.http.get<void>(`${this.sseEndpoint}/unregister`).subscribe();
  }
}
