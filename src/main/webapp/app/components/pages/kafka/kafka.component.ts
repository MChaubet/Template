import { Component, OnDestroy } from '@angular/core';
import { SseService } from './sse-service.service';
import { EventSourcePolyfill } from 'event-source-polyfill';

@Component({
  selector: 'jhi-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.scss'],
})
export class KafkaComponent implements OnDestroy {
  private eventSource: EventSourcePolyfill;

  constructor(private sseService: SseService) {
    this.eventSource = this.sseService.register();
    this.eventSource.onmessage = messageEvent => {
      console.log(messageEvent);
    };
  }

  ngOnDestroy(): void {
    this.sseService.unregister();
  }
}
