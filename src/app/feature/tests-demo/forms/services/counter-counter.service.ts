
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/** Counter component with state like service */

@Injectable()
export class CounterService {
  // Technically, this property is not necessary since the BehaviorSubject
  // below already holds the current count. We are keeping it for clarity.
  private count = 0;

  private readonly subject: BehaviorSubject<number> = new BehaviorSubject(this.count);

  // Every BehaviorSubject is an Observable and Observer.
  // We do not want to expose the Observer trait to the outside,
  // so we downcast the BehaviorSubject to a simple Observable only.
  readonly getCount: Observable<number> = this.subject.asObservable();

  public increment(): void {
    this.count++;
    this.notify();
  }

  public decrement(): void {
    this.count--;
    this.notify();
  }

  public reset(newCount: number): void {
    this.count = newCount;
    this.notify();
  }

  private notify(): void {
    this.subject.next(this.count);
  }
}
