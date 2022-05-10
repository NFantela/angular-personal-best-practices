import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from '../../services/counter-counter.service';
/** Counter component with state like service */

@Component({
  selector: 'app-service-counter',
  templateUrl: './counter-with-service.component.html',
})
export class ServiceCounterComponent {

  public count$: Observable<number>;

  constructor(private readonly counterService: CounterService) {
    this.count$ = this.counterService.getCount;
  }

  public increment(): void {
    this.counterService.increment();
  }

  public decrement(): void {
    this.counterService.decrement();
  }

  public reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.counterService.reset(count);
    }
  }
}
