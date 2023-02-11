import 'zone.js';
import '@angular/localize/init';
import 'event-source-polyfill/src/eventsource.min.js';

// Fix needed for SockJS, see https://github.com/sockjs/sockjs-client/issues/439
(window as any).global = window;
