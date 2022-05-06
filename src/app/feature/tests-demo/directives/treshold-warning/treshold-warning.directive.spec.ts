import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findEl, setFieldValue } from '../../spec-helpers/element.spec-helper';
import { ThresholdWarningDirective } from './treshold-warning.directive';


@Component({
  template: `
    <input type="number" [tresholdLimit]="10" data-testid="input" />
  `,
})
class HostComponent { }

describe('ThresholdWarningDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let input: HTMLInputElement;

  // before create host dummy component and directive
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThresholdWarningDirective, HostComponent],
    }).compileComponents();
  });

  // fill declared variables
  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    input = findEl(fixture, 'input').nativeElement;
  });

  /**
   * 3 tests below check for input element having correct CSS class depending on values inside it
   */
  it('does not set the class initially', () => {
    expect(input.classList.contains('error')).toBe(false);
  });

  // setFieldValue matches data-testid -> input inside fake component
  it('adds the class if the number is over the threshold', () => {
    setFieldValue(fixture, 'input', '11');
    fixture.detectChanges();
    expect(input.classList.contains('error')).toBe(true);
  });

  it('removes the class if the number is at the threshold', () => {
    setFieldValue(fixture, 'input', '10');
    fixture.detectChanges();
    expect(input.classList.contains('error')).toBe(false);
  });
});
