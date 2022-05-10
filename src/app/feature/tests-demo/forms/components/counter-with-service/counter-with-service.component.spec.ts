import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { expectText, click, setFieldValue } from '../../../spec-helpers/element.spec-helper';
import { CounterService } from '../../services/counter-counter.service';
import { ServiceCounterComponent } from './counter-with-service.component';


// tests related to component displaying correct data
describe('ServiceCounterComponent: integration test', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [CounterService],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', '0');
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '1');
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '-1');
  });

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectText(fixture, 'count', String(newCount));
  });
});


// test regardin service and its methods
describe('ServiceCounterComponent: unit test with minimal Service logic', () => {
  const newCount = 456;

  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  let fakeCount$: BehaviorSubject<number>;
  let fakeCounterService: Pick<CounterService, keyof CounterService>;

  beforeEach(async () => {
    fakeCount$ = new BehaviorSubject(0);

    fakeCounterService = {
      getCount: fakeCount$,
      increment(): void {
        fakeCount$.next(1);
      },
      decrement(): void {
        fakeCount$.next(-1);
      },
      reset(): void {
        fakeCount$.next(Number(newCount));
      },
    };
    // create spys on service
    spyOn(fakeCounterService, 'increment').and.callThrough();
    spyOn(fakeCounterService, 'decrement').and.callThrough();
    spyOn(fakeCounterService, 'reset').and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [{ provide: CounterService, useValue: fakeCounterService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();

    expectText(fixture, 'count', '1');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();

    expectText(fixture, 'count', '-1');
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();

    expectText(fixture, 'count', String(newCount));
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');

    expect(fakeCounterService.reset).not.toHaveBeenCalled();
  });
});
