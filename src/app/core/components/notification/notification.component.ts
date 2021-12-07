import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input } from '@angular/core';
import { fromEvent, Observable, Observer, timer } from 'rxjs';
import { repeatWhen, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent<T> {

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>
  ) { }

  @Input()
  observer: Observer<T> | null = null;

  readonly mouseenter$ = fromEvent(this.elementRef.nativeElement, 'mouseenter');

  readonly mouseleave$ = fromEvent(this.elementRef.nativeElement, 'mouseleave');

  /** Close stream subscribed in template that completes Observer */
  readonly close$: Observable<0> = timer(3000).pipe(
    takeUntil(this.mouseenter$),
    repeatWhen(() => this.mouseleave$),
    tap(this.close.bind(this))
  );

  close() {
    this.observer?.complete();
  }
}
