import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServiceCounterComponent } from './components/counter-with-service/counter-with-service.component';
import { CounterComponent } from './components/counter/counter.component';
import { CounterService } from './services/counter-counter.service';

@NgModule({
  imports: [CommonModule],
  declarations: [CounterComponent, ServiceCounterComponent],
  exports: [CounterComponent, ServiceCounterComponent],
  providers: [CounterService]
})
export class TestingFormsDemoModule { }
