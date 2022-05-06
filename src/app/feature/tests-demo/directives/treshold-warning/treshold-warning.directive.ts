import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: 'input[tresholdLimit]',
})
export class ThresholdWarningDirective {

  @Input()
  public tresholdLimit: number | null = null;

  @HostBinding('class.error')
  public overThreshold = false;

  @HostListener('input')
  public inputHandler(): void {
    this.overThreshold = this.tresholdLimit !== null &&
      this.elementRef.nativeElement.valueAsNumber > this.tresholdLimit;
  }

  constructor(private elementRef: ElementRef<HTMLInputElement>) { }
}
