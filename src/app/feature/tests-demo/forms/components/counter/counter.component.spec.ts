import { ComponentFixture, TestBed } from '@angular/core/testing';
import { take, toArray } from 'rxjs/operators';
import { click, expectText, setFieldValue } from '../../../spec-helpers/element.spec-helper';

import { CounterComponent } from './counter.component';

const startCount = 123;
const newCount = 456;

/** Totaly simple child component that accepts input and emits output + has only 1 input field  */

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  // helper fn
  function expectCount(count: number): void {
    expectText(fixture, 'count', String(count));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    // set initial @Input()
    component.startCount = startCount;
    // the component has logic in ngOnChanges so we need to run it
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('shows the start count', () => {
    expectCount(startCount);
  });

  it('increments the count', () => {
    // helper for : find el create fake click event and run triggerEventHandler on current el
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectCount(startCount + 1);
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectCount(startCount - 1);
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectCount(newCount);
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectCount(startCount);
  });

  it('emits countChange events', () => {
    let actualCounts: number[] | undefined;
    component.countChange.pipe(take(3), toArray()).subscribe((counts) => {
      actualCounts = counts;
    });

    click(fixture, 'increment-button');
    click(fixture, 'decrement-button');
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');

    expect(actualCounts).toEqual([startCount + 1, startCount, newCount]);
  });

});
