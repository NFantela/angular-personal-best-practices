import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
/** Totaly simple child component that accepts input and emits output + has only 1 input field  */
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent implements OnChanges {
  @Input()
  public startCount = 0;

  @Output()
  public countChange = new EventEmitter<number>();

  public count = 0;

  public ngOnChanges(): void {
    this.count = this.startCount;
  }

  public increment(): void {
    this.count++;
    this.notify();
  }

  public decrement(): void {
    this.count--;
    this.notify();
  }

  public reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.count = count;
      this.notify();
    }
  }

  private notify(): void {
    this.countChange.emit(this.count);
  }
}
